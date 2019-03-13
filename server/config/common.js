const path = require('path')

module.exports = {
  // app options
  app: {
    port: 3000,
    apiBase: '/api/v1',
  },

  email: process.env.EMAIL_FROM,
  templatesDir: path.resolve(__dirname, '../templates'),

  // specify modules to load and their order
  modules: [
    'data',
    'auth',
    'finale',
    'email',
    'elasticsearch',
    // 'order',
    // 'customer',
    // 'checkout',
  ],

  // module options

  auth: {
    jwtSecret: ']ZW%/tOrZ:PeI,y5~C|y4rWoPQtx%g',

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
  }
}