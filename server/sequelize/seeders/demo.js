'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const numProducts = 100
    const products = []
    const brands = ['Xiaomi', 'LG', 'ASUS', 'Samsung']
    
    for (let i = 0; i < numProducts; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)]
      let price = Math.random() * 2500000 + 350000
      price = Math.round(price / 10000) * 10000
      products.push({ name: 'Jual HP ' + brand, description: 'Seperti judul...', price, UserId: 1 })
    }

    await queryInterface.bulkInsert('Products', products)

    await queryInterface.bulkInsert('Files', [
      { id: 1, url: 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.xs.jpg', UserId: 1},
      { id: 2, url: 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.sm.jpg', UserId: 1},
      { id: 3, url: 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.lg.jpg', UserId: 1},
      { id: 4, url: 'http://localhost:3000/static/users/2/img/1554518074701-0f031536202d0359cf68ce1e2fd80777-tomato.xs.jpg', UserId: 1},
      { id: 5, url: 'http://localhost:3000/static/users/2/img/1554518074701-0f031536202d0359cf68ce1e2fd80777-tomato.sm.jpg', UserId: 1},
      { id: 6, url: 'http://localhost:3000/static/users/2/img/1554518074701-0f031536202d0359cf68ce1e2fd80777-tomato.lg.jpg', UserId: 1},
    ])

    const entityFiles = []

    for (let i = 1; i <= numProducts; i++) {
      entityFiles.push(
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 1 },
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 2 },
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 3 },
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 4 },
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 5 },
        { entity: 'Product', meta: 'image', EntityId: i, FileId: 6 },
      )
    }

    await queryInterface.bulkInsert('EntityFile', entityFiles)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EntityFile', null)
    await queryInterface.bulkDelete('Files', null)
    await queryInterface.bulkDelete('Products', null)
  }
};
