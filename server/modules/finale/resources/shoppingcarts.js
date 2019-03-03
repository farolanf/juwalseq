const { ShoppingCart } = require('../../../sequelize')
const { handleError } = require('../../../lib/helpers')
const schemas = require('../schemas/shoppingcarts')
const includes = require('../includes')

module.exports = function initResource (resource) {
  // list
  resource.list.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        // only allow listing current shopping cart items
        context.criteria = {
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.list.send.before(async (req, res, context) => {
    try {
      context.instance = context.instance.map(prepareInstance)
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  // create
  // params:
  //   product_id
  //   attributes: [{ name, value }, ...]
  //   quantity
  resource.create.write.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        const params = schemas.create.cast(req.body, { stripUnknown: true })

        if (!params || !await schemas.create.isValid(params)) {
          return res.sendStatus(400)
        }

        const attrs = JSON.stringify(params.attrs)

        // just add quantity if item exists
        const item = await ShoppingCart.findOne({
          where: {
            cart_id: req.user.Customer.cart_id,
            product_id: params.product_id,
            attrs
          },
          include: includes.shoppingcarts
        })

        if (item) {
          item.quantity += params.quantity
          await item.save()
          res.send(item)
          return context.stop
        }

        // create item in the current shopping cart
        context.attributes = {
          cart_id: req.user.Customer.cart_id,
          product_id: params.product_id,
          attrs,
          quantity: params.quantity,
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.create.send.before(prepareInstanceMilestone)

  // read
  resource.read.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        context.criteria = {
          item_id: req.params.item_id,
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.read.send.before(prepareInstanceMilestone)

  // update

  resource.update.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        context.criteria = {
          item_id: req.params.item_id,
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.update.write.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        const params = schemas.create.cast(req.body, { stripUnknown: true })

        if (!params || !await schemas.create.isValid(params)) {
          return res.sendStatus(400)
        }

        context.attributes = {
          product_id: params.product_id,
          attrs: JSON.stringify(params.attrs),
          quantity: params.quantity,
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  resource.update.send.before(prepareInstanceMilestone)

  // delete
  resource.delete.fetch.before(async (req, res, context) => {
    try {
      if (!req.user.admin) {
        context.criteria = {
          item_id: req.params.item_id,
          cart_id: req.user.Customer.cart_id
        }
      }
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  })

  function prepareInstance (instance) {
    instance.attrs = JSON.parse(instance.attrs)
    return instance
  }

  async function prepareInstanceMilestone (req, res, context) {
    try {
      prepareInstance(context.instance)
      return context.continue
    }
    catch (err) {
      handleError(err, res)
    }
  }
}