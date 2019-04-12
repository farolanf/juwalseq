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
      const kabupaten = await Kabupaten.findByPk(req.body.kabupatenId)
      const product = await Product.create({
        UserId: req.user.id,
        name: req.body.title,
        description: req.body.description,
        price: req.body.price,
        ProvinsiId: kabupaten.ProvinsiId,
        KabupatenId: kabupaten.id,
      })
      const sizes = ['xs', 'sm', 'lg']
      await Promise.all(
        info.map(item => {
          return Promise.all(
            sizes.map(async size => {
              const url = getURL(app.modules.uploadfs, item, size)
              const file = await File.create({ url, UserId: req.user.id })
              product.addImage(file)
            })
          )
        })
      )
      res.sendStatus(200)
    })
  })
}