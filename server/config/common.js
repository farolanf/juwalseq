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
    'data',
    'auth',
    'finale',
    'email',
    'elasticsearch',
    'uploadfs',
    'product',
    // 'order',
    // 'customer',
    // 'checkout',
  ],

  // module options

  auth: {
    jwtSecret: process.env.JWT_SECRET,

    // new customers will be assigned to these groups
    defaultGroups: ['public', 'member'],

    // how long the password reset token should be valid (in seconds)
    passwordResetTokenLife: 60 * 60 * 48,

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
          { path: '/auth/forgot-password', method: 'POST' },
          { path: '/auth/reset-password', method: 'POST' },

          { path: '/search/.*', method: 'GET' },

          // public resources
          { path: '/Provinsis(/.*)?', method: 'GET' },
          { path: '/Kabupatens(/.*)?', method: 'GET' },
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
          { path: '/products/add', method: ['POST']},
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
    uploadsPath: path.resolve(__dirname, '../static'),
    uploadsUrl: 'http://localhost:3000/static',
    tempPath: path.resolve(__dirname, '../tmp'),
    imageSizes: [
      {
        name: 'xs',
        width: 180,
        height: 180,
      },
      {
        name: 'sm',
        width: 320,
        height: 320,
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