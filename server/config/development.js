const path = require('path')
const common = require('./common')

common.modules.unshift('devel')

common.auth.groups.public.routes.push({
  path: '/devel/.*',
  method: '*',
})

common.uploadfs = {
  storage: 'local',
  uploadsPath: path.resolve(__dirname, '../uploads'),
  uploadsUrl: 'http://localhost:3000',
  tempPath: path.resolve(__dirname, '../tmp'),
  imageSizes: [
    {
      name: 'small',
      width: 320,
      height: 320,
    },
    {
      name: 'medium',
      width: 640,
      height: 640,
    },
    {
      name: 'large',
      width: 1140,
      height: 1140,
    }
  ],
  parallel: 4,
}

module.exports = {
  ...common
}