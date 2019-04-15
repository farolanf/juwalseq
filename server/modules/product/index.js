const { promisify } = require('util')
const multer = require('multer')
const upload = multer({ dest: '/tmp' })

const { getURL } = require('@lib/upload')
const { File, Product, Kabupaten, sequelize } = require('@db')

module.exports = function (app, config) {
  const { modules: { uploadfs } } = app
  app.post(config.app.apiBase + '/products/add', upload.array('images', 8), (req, res) => {
    sequelize.transaction(async () => {
      const time = Date.now()
      const info = await Promise.all(
        req.files.map(file => {
          const dst = `/users/${req.user.id}/img/${time}-${file.filename}-${file.originalname}`
          const fn = uploadfs.copyImageIn.bind(app.modules.uploadfs)
          return promisify(fn)(file.path, dst, { copyOriginal: false })
        })
      )
      const images = await Promise.all(
        info.map(item => {
          const url = getURL(app.modules.uploadfs, item, 'xs')
          return { url: encodeURI(url), UserId: req.user.id }
        })
      )
      const kabupaten = await Kabupaten.findByPk(req.body.kabupatenId)
      await Product.create({
        UserId: req.user.id,
        name: req.body.title,
        description: req.body.description,
        price: req.body.price,
        nego: req.body.nego,
        ProvinsiId: kabupaten.ProvinsiId,
        KabupatenId: kabupaten.id,
        Images: images,
      }, {
        include: {
          model: File,
          as: 'Images',
        }
      })
      res.sendStatus(200)
    })
  })
}