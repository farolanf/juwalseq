const path = require('path')

module.exports = {
  // app options
  app: {
    port: process.env.PORT || 3000,
    apiBase: '/api/v1',
  },

  email: process.env.EMAIL_FROM,
  templatesDir: path.resolve(__dirname, '../templates'),

  // specify modules to load and their order
  modules: [
    'sequelize',
    'data',
    'auth',
    'finale',
    'email',
    'elasticsearch',
    'uploadfs',
    // 'order',
    // 'customer',
    // 'checkout',
  ],

  // module options

  auth: {
    jwtSecret: process.env.JWT_SECRET,

    // new customers will be assigned to these groups
    defaultGroups: ['public', 'member'],

    groups: {
      public: {
        // routes white list
        //
        // e.g:
        //   '/products'
        //   is the same as
        //   { path: '/products', method: 'GET' }
        //
        //   multiple methods
        //   { path: '/products', method: ['GET', 'POST'] }
        //
        // path can be a RegExp or pattern
        routes: [
          { path: '/(?:\\.html)?', method: 'GET' },

          { path: '/auth/local', method: 'POST' },
          { path: '/auth/google', method: 'GET' },
          { path: '/auth/facebook', method: 'GET' },
          { path: '/auth/register', method: 'POST' },
          { path: '/auth/logout', method: 'GET' },
          { path: '/auth/verify', method: 'GET' },
          { path: '/auth/unique-email', method: 'GET' },

          { path: '/search/.*', method: 'GET' },

          // public resources
          { path: '/Departments(/.*)?', method: 'GET' },
          { path: '/Categories(/.*)?', method: 'GET' },
          { path: '/Attributes(/.*)?', method: 'GET' },
          { path: '/AttributeValues(/.*)?', method: 'GET' },
          { path: '/Products(/.*)?', method: 'GET' },
          { path: '/ProductTypes(/.*)?', method: 'GET' },
          { path: '/ProductTypeCategories(/.*)?', method: 'GET' },
          { path: '/Comments(/.*)?', method: 'GET' },
        ]
      },
      member: {
        routes: [
          // { path: '/paypal/.*', method: ['GET', 'POST']},
        ]
      },
      // admin passed all checks
      admin: true
    },

    // permissions bypass these methods
    publicMethods: ['HEAD', 'OPTIONS'],
  },

  elasticsearch: {
    index: 'juwal',
    maxCount: 100
  },
  
  uploadfs: {
    storage: 'local',
    uploadsPath: path.resolve(__dirname, '../uploads'),
    uploadsUrl: 'http://localhost:3000',
    tempPath: path.resolve(__dirname, '../tmp'),
    imageSizes: [
      {
        name: 'xs',
        width: 128,
        height: 128,
      },
      {
        name: 'sm',
        width: 320,
        height: 320,
      },
      {
        name: 'md',
        width: 640,
        height: 640,
      },
      {
        name: 'lg',
        width: 1280,
        height: 1280,
      }
    ],
    parallel: 4,
  },
}