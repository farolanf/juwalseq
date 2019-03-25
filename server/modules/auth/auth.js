const jwt = require('jsonwebtoken')
const passport = require('passport')
const yup = require('yup')

const { User, UserGroup } = require('../../sequelize')
const { publicUser, internalUser, userInclude } = require('../../lib/user')

const events = require('../../lib/events')

// TODO: implement jwtId. It invalidates existing token on change as user
// with the old jwtId will not be found.

const registerSchema = yup.object().shape({
  email: yup.string().email().max(100).required(),
  password: yup.string().min(8).max(100).required(),
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

  app.post(config.app.apiBase + '/auth/register', async (req, res) => {
    if (!await registerSchema.isValid(req.body)) {
      return res.sendStatus(400)
    }
    const { email, password } = req.body
    const count = await User.count()
    const username = 'user' + (count + 1)
    const user = await User.create({ username, email, password })
    await events.emit('userCreated', user)
    await UserGroup.bulkCreate(config.auth.defaultGroups.map(group => ({
      UserId: user.id,
      group
    })))
    const _user = await User.findOne({
      where: { id: user.id },
      include: userInclude()
    })
    sendUser(_user, res)
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