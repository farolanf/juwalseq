/* eslint-disable no-console */
const prompts = require('prompts')

const db = require('../../sequelize')
const cmd = require('../../lib/cmd')

const seed = require('@db/seeders/init')
const demo = require('@db/seeders/demo')

cmd.add('data', 'initdb', 'Initialize database', initDb)
cmd.add('data', 'sync-alter', 'Sync database with models', syncAlterDb)
cmd.add('data', 'populate', 'Populate database', populateDb)
cmd.add('data', 'demo', 'Populate database with demo products', populateDemoDb)
cmd.add('data', 'reset', 'Init and populate database', resetDb)
cmd.add('data', 'create-admin', 'Create admin user', createAdmin)
cmd.add('data', 'routes', 'Create admin user', dumpRoutes)

async function initDb(program, argv) {
  program.parse(argv)
  await db.sequelize.sync({ force: true })
}

async function syncAlterDb(program, argv) {
  program.parse(argv)
  await db.sequelize.sync({ alter: true })
}

async function populateDb(program, argv) {
  program.parse(argv)
  await seed.up(db.sequelize.getQueryInterface(), db.Sequelize)
}

async function populateDemoDb(program, argv) {
  program.parse(argv)
  await demo.up(db.sequelize.getQueryInterface(), db.Sequelize)
}

async function resetDb(program, argv) {
  program.parse(argv)
  await db.sequelize.sync({ force: true })
  await seed.up(db.sequelize.getQueryInterface(), db.Sequelize)
}

async function createAdmin(program, argv) {
  program
    .usage('<username> <email>')
    .parse(argv)

  const [username, email] = program.args

  if (!username || !email) {
    return program.outputHelp()
  }

  const inputs = await prompts([
    {
      type: 'password',
      name: 'password',
      message: 'Password'
    }
  ])

  await db.User
    .create({ email, username, password: inputs.password })
    .then(user => {
      return db.UserGroup.create({ UserId: user.id, group: 'admin' })
    })
}

function dumpRoutes(program, argv) {
  program.parse(argv)
  dump(global.app._router.stack)

  function dump(stack) {
    stack && stack.forEach(layer => {
      if (!layer.route) return
      const methods = Object.keys(layer.route.methods)
      console.log(methods.join(',').padEnd(7).toUpperCase(), layer.route.path)
      dump(layer.route.stack)
    })
  }
}