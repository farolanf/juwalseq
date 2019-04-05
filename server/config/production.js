const common = require('./common')

common.uploadfs = {
  storage: 's3',
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION,
  tempPath: '/tmp',
  cdn: {
    enabled: true,
    url: process.env.CDN_URL
  },
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
  parallel: process.env.UPLOADFS_PARALLEL || 4,
}

module.exports = {
  ...common
}