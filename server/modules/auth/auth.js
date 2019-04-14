const jwt = require('jsonwebtoken')
const passport = require('passport')
const yup = require('yup')
const { Op } = require('sequelize')

const { User, UserGroup, Token, sequelize } = require('../../sequelize')
const { publicUser, internalUser, userInclude } = require('../../lib/user')

const events = require('../../lib/events')

const generatePassword = require('generate-password')
const { passwordResetToken } = require('@server/const')

const { sendMail } = require('@lib/mail')

// TODO: implement jwtId. It invalidates existing token on change as user
// with the old jwtId will not be found.

const registerSchema = yup.object().shape({
  email: yup.string().email().max(100).required(),
  password: yup.string().min(5).max(100).required(),
})

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
})

const resetPasswordSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().min(5).required(),
})

function tokenFromRequest (req) {
  return (req.get('Authorization') || '').replace(/^Bearer /, '')
}

function generateToken (user, secret) {
  return jwt.sign({ userId: user.id, jwtId: user.jwtId }, secret)
}

function verifyToken (token, secret) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    // ignore
  }
}

module.exports = function (app, config) {
  events.on('userCreated', async user => {
    await UserGroup.bulkCreate(config.auth.defaultGroups.map(group => ({
      UserId: user.id,
      group
    })))
  })

  // decode token and set req.user
  app.use(async (req, res, next) => {
    const token = tokenFromRequest(req)
    if (token) {
      const payload = verifyToken(token, config.auth.jwtSecret)
      if (!payload) {
        return res.sendStatus(401)
      }
      const user = await User.findOne({
        where: { id: payload.userId },
        include: userInclude()
      })
      if (user) {
        req.user = internalUser(user)
      } else {
        return res.sendStatus(401)
      }
      next()
    } else {
      next()
    }
  })

  app.post(config.app.apiBase + '/auth/forgot-password', async (req, res, next) => {
    if (!forgotPasswordSchema.isValidSync(req.body)) {
      return next(new Error('invalid_email'))
    }
    const email = req.body.email
    const user = await User.findOne({ where: { email } })
    if (!user) return next(new Error('email_not_found'))

    const tokenId = generatePassword.generate({
      length: 80,
      numbers: true,
      uppercase: true,
      strict: true,
    })
    await Token.upsert({
      UserId: user.id, 
      name: passwordResetToken,
      token: tokenId,
    }, {
      where: {
        UserId: user.id,
        name: passwordResetToken,
      },
    })

    await sendMail({
      from: config.email,
      to: user.email,
      subject: 'Reset password'
    }, 'ForgotPassword', {
      url: process.env.FRONTEND_HOST + '/reset-password?token=' + tokenId
    })

    res.send({ message: 'check_email' })
  })

  app.post(config.app.apiBase + '/auth/reset-password', async (req, res, next) => {
    if (!resetPasswordSchema.isValidSync(req.body)) {
      return next(new Error('invalid_data'))
    }
    const token = await Token.findOne({ 
      where: { 
        token: req.body.token,
        updatedAt: {
          [Op.gt]: Date.now() - config.auth.passwordResetTokenLife * 1000,
        }
      } 
    })
    if (!token) return next(new Error('invalid_token'))

    await User.update({
      password: req.body.password,
    }, { 
      where: { id: token.UserId } 
    })
    await token.destroy()
    res.send({ message: 'password_changed' })
  })

  app.post(config.app.apiBase + '/auth/register', async (req, res) => {
    sequelize.transaction(async () => {
      if (!await registerSchema.isValid(req.body)) {
        return res.sendStatus(400)
      }
      const { email, password } = req.body
      const count = await User.count()
      const username = 'user' + (count + 1)
      const user = await User.create({ username, email, password })
      await events.emit('userCreated', user)
      const _user = await User.findOne({
        where: { id: user.id },
        include: userInclude()
      })
      sendUser(_user, res)
    })
  })

  app.get(config.app.apiBase + '/auth/verify', async (req, res) => {
    const token = tokenFromRequest(req)
    const payload = verifyToken(token, config.auth.jwtSecret)
    if (!payload) {
      return res.sendStatus(401)
    }
    const user = await User.findOne({
      where: { id: payload.userId },
      include: userInclude()
    })
    user ? sendUser(user, res) : res.sendStatus(401)
  })

  app.get(config.app.apiBase + '/auth/unique-email', async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.query.email
      }
    })
    res.send({ unique: !user })
  })

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
  }))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user, config.auth.jwtSecret)
    res.redirect(process.env.FRONTEND_AUTH_REDIRECT + `?token=${token}`)
  })

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }))

  app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user, config.auth.jwtSecret)
    res.redirect(process.env.FRONTEND_AUTH_REDIRECT + `?token=${token}`)
  })

  app.post(
    config.app.apiBase + '/auth/local',
    passport.authenticate('local', { session: false }),
    (req, res) => {
      sendUser(req.user, res)
    })

  function sendUser (user, res) {
    res.send({
      token: generateToken(user, config.auth.jwtSecret),
      user: publicUser(user)
    })
  }
}