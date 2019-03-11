const _ = require('lodash')
const { Product, Tag, File, Reaction, Comment } = require('../../../sequelize')
const { truncate } = require('../../helpers/db')

describe('Product', () => {

  beforeEach(() => truncate())

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
      include: [{ model: File, as: 'Images' }],
    })
    assert.isOk(_product)
    assert.lengthOf(_product.Images, 1)
    assert.deepEqual(
      _.pick(_product.Images[0], ['id', 'storage', 'name', 'url']), 
      image.dataValues)
  })

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
      include: [Tag]
    })
    assert.isOk(_product)
    assert.lengthOf(_product.Tags, 1)
    assert.deepEqual(_.pick(_product.Tags[0], ['id', 'name']), tag.dataValues)
  })

  it('query with reactions', async () => {
    const reaction = await Reaction.create({ reaction: 'like' })
    const product = await Product.create({
      name: 'Jual laptop',
      description: 'jual',
      price: 0,
    })
    await product.addReaction(reaction)
    const _product = await Product.findOne({
      where: { id: product.id },
      include: [Reaction]
    })
    assert.isOk(_product)
    assert.lengthOf(_product.Reactions, 1)
    assert.deepEqual(
      _.pick(_product.Reactions[0], ['id', 'reaction']), reaction.dataValues)
  })

  it('query with comments', async () => {
    const comment = await Comment.create({ comment: 'good stuff', rating: 5 })
    const product = await Product.create({
      name: 'Jual laptop',
      description: 'jual',
      price: 0,
    })
    await product.addComment(comment)
    const _product = await Product.findOne({
      where: { id: product.id },
      include: [Comment]
    })
    assert.isOk(_product)
    assert.lengthOf(_product.Comments, 1)
    assert.deepEqual(
      _.pick(_product.Comments[0], ['id', 'comment', 'rating']), 
      _.pick(comment.dataValues, ['id', 'comment', 'rating']))
  })
})