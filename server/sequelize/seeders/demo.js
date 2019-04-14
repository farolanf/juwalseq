'use strict';
const db = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const numProducts = 100
    const products = []
    const brands = ['Xiaomi', 'LG', 'ASUS', 'Samsung']
    
    for (let i = 0; i < numProducts; i++) {
      const kabupaten = await db.Kabupaten.findOne({
        order: [db.sequelize.fn('RAND')],
        limit: 1,
        include: db.Provinsi,
      })
      const brand = brands[Math.floor(Math.random() * brands.length)]
      let price = Math.random() * 2500000 + 350000
      price = Math.round(price / 10000) * 10000
      products.push({ name: `HP ${brand} - ${Date()}`, description: 'Seperti judul...', price, UserId: 1, ProvinsiId: kabupaten.Provinsi.id, KabupatenId: kabupaten.id })
    }

    await queryInterface.bulkInsert('Products', products)

    const url = process.env.NODE_ENV === 'production' ? 'https://d1vy0w68bm0zhd.cloudfront.net/users/2/img/1555221918214-5b2ef715ca48a4aba2e061195c2aa641-apple.xs.jpg' : 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.xs.jpg'

    await queryInterface.bulkInsert('Files', [
      { id: 1, url, UserId: 1},
    ])

    const entityFiles = []

    for (let i = 1; i <= numProducts; i++) {
      entityFiles.push(
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 1 },
      )
    }

    await queryInterface.bulkInsert('EntityFile', entityFiles)

    const attributes = []

    for (let i = 1; i <= numProducts; i++) {
      const attrs = {
        1: [1, 2, 3, 4],
        2: [5, 6, 7],
        4: [10, 11, 12, 13, 14]
      }
      Object.keys(attrs).forEach(attrId => {
        const j = Math.floor(Math.random() * attrs[attrId].length)
        const id = attrs[attrId][j]
        attributes.push({ AttributeValueId: id, ProductId: i })
      })
    }

    await queryInterface.bulkInsert('ProductAttribute', attributes)

    const categories = []
    for (let i = 1; i <= numProducts; i++) {
      const id = Math.ceil(Math.random() * 65)
      categories.push({ CategoryId: id, ProductId: i })
    }

    await queryInterface.bulkInsert('ProductCategory', categories)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EntityFile', null)
    await queryInterface.bulkDelete('Files', null)
    await queryInterface.bulkDelete('Products', null)
  }
};
