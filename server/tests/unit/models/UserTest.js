const { User, sequelize } = require('../../../sequelize')

const password = 'mypassword1234'

describe('User model', () => {

  beforeEach(async () => {
    await sequelize.truncate({ logging: false })
  })

  it('store password hash', () => {
    const user = new User()
    user.password = password
    assert.notEqual(user.password, password)
  })
  it('verify password', () => {
    const user = new User()
    user.password = password
    assert.isTrue(user.verifyPassword(password))
  })
})