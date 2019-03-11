const _ = require('lodash')
const { Product, Tag, File } = require('../../../sequelize')
const { truncate } = require('../../helpers/db')

describe('Product', () => {

  beforeEach(() => truncate())

  it('query with tags', async () => {
    const tag = await Tag.create({ name: 'Laptop' })
    const product = await Product.create({
      name: 'Jual laptop',
      description: 'jual',
      price: 0,
    })
    await product.addTag(tag)
    const _product = await Product.findOne({
      where: { id: product.id },
    })
    assert.isOk(_product)
    assert.lengthOf(_product.Tags, 1)
    assert.deepEqual(_.pick(_product.Tags[0], ['id', 'name']), tag.dataValues)
  })

  it('query with images', async () => {
    const image = await File.create({ storage: 's3', name: 'name', url: 'url' })
    const product = await Product.create({
      name: 'Jual laptop',
      description: 'jual',
      price: 0,
    })
    await product.addImage(image)
    const _product = await Product.findOne({
      where: { id: product.id },
    })
    assert.isOk(_product)
    assert.lengthOf(_product.Images, 1)
    assert.deepEqual(
      _.pick(_product.Images[0], ['id', 'storage', 'name', 'url']), 
      image.dataValues)
  })
})