const path = require('path')
const async = require('async')
const { sendMail } = require('../../lib/mail')
const { createFormatCurrency } = require('../../lib/format')
const { handleError } = require('../../lib/helpers')

module.exports = function (app, config) {
  app.use((req, res, next) => {
    let output = `${req.method.padEnd(7)} ${req.path}`
    next()
    const color = res.statusCode < 400
      ? '\x1b[32m'
      : '\x1b[31m'
    output += ` ${res.statusCode}`
    console.log(color + output + '\x1b[0m')
  })

  app.get('/devel/testmail', async (req, res) => {
    const currency = createFormatCurrency('USD')
    if (!req.query.to) {
      return res.status(400).send('Missing query param: to (destination address)')
    } 
    await sendMail(
      {
        from: config.email,
        to: req.query.to,
        subject: 'Test email'
      }, 
      'order-confirmation',
      {
        orderId: 3383,
        shippingCost: 20,
        items: [
          { product_name: 'Product 1', unit_cost: 34, quantity: 1 },
          { product_name: 'Product 2', unit_cost: 21, quantity: 3 },
          { product_name: 'Product 3', unit_cost: 13, quantity: 2 },
        ].map((item, i) => {
          item.index = i + 1
          return item 
        }),
        price () {
          return currency(this.unit_cost)
        },  
        amount () {
          return currency(this.unit_cost * this.quantity)
        },
        _subTotal () {
          return this.items.reduce((acc, item) => {
            return acc + (item.unit_cost * item.quantity)
          }, 0)
        },
        subTotal () {
          return currency(this._subTotal())
        },
        shipping () {
          return currency(this.shippingCost)
        },
        total () {
          return currency(this._subTotal() + this.shippingCost)
        }
      }
    )
    res.sendStatus(200)
  })

  app.get('/devel/testupload', (req, res) => {
    const filePath = path.resolve(__dirname, 'test.jpg')
    async.parallel([
      cb => app.modules.uploadfs.copyIn(filePath, '/assets/test.jpg', cb),
      cb => app.modules.uploadfs.copyImageIn(filePath, '/img/test.jpg', cb),
    ], (err, results) => {
      err ? handleError(err, res) : res.send({
        url: app.modules.uploadfs.getUrl(),
        results,
      })
    })
  })
}