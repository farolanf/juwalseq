const { Product, Tag, EntityTag, File, EntityFile } = require('../../../sequelize')
const { truncate } = require('../../helpers/db')

describe('EntityTag', () => {
  
  beforeEach(() => {
    return truncate()
  })

  it('add product tag', async () => {
    const laptopTag = await Tag.create({ name: 'Laptop' })
    const product = await Product.create({ 
      name: 'Jual laptop', 
      description: 'blah',
      price: 0,
    })
    await product.addTag(laptopTag)
    const count = await EntityTag.count({
      where: {
        entity: 'Product',
        EntityId: product.id,
        TagId: laptopTag.id,
      }
    })
    assert.equal(count, 1)
  })

  it('add product image', async () => {
    const image = await File.create({
      storage: 'provider',
      name: 'imagename', 
      url: 'imageurl',
    })
    const product = await Product.create({ 
      name: 'Jual laptop', 
      description: 'blah',
      price: 0,
    })
    await product.addImage(image)
    const count = await EntityFile.count({
      where: {
        entity: 'Product',
        meta: 'image',
        EntityId: product.id,
        FileId: image.id,
      }
    })
    assert.equal(count, 1)
  })
})