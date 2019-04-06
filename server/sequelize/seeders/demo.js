'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkInsert('Products', [
      { id: 1, name: 'Jual HP Xiaomi', description: 'Seperti judul...', price: 450000, UserId: 1 },
      { id: 2, name: 'Jual HP LG', description: 'Seperti judul...', price: 1250000, UserId: 1 },
      { id: 3, name: 'Jual HP Samsung', description: 'Seperti judul...', price: 1150000, UserId: 1 },
      { id: 4, name: 'Jual HP ASUS', description: 'Seperti judul...', price: 1850000, UserId: 1 },
    ])

    await queryInterface.bulkInsert('Files', [
      { id: 1, url: 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.xs.jpg', UserId: 1},
      { id: 2, url: 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.sm.jpg', UserId: 1},
      { id: 3, url: 'http://localhost:3000/static/users/2/img/1554518074701-0dd91fb599687e50cc5eac38177b65ac-apple.lg.jpg', UserId: 1},
      { id: 4, url: 'http://localhost:3000/static/users/2/img/1554518074701-0f031536202d0359cf68ce1e2fd80777-tomato.xs.jpg', UserId: 1},
      { id: 5, url: 'http://localhost:3000/static/users/2/img/1554518074701-0f031536202d0359cf68ce1e2fd80777-tomato.sm.jpg', UserId: 1},
      { id: 6, url: 'http://localhost:3000/static/users/2/img/1554518074701-0f031536202d0359cf68ce1e2fd80777-tomato.lg.jpg', UserId: 1},
    ])

    const entityFiles = []
    let id = 1

    for (let i = 1; i <= 4; i++) {
      entityFiles.push(
        { id: id++, entity: 'Product', meta: 'image', EntityId: i, FileId: 1 },
        { id: id++, entity: 'Product', meta: 'image', EntityId: i, FileId: 2 },
        { id: id++, entity: 'Product', meta: 'image', EntityId: i, FileId: 3 },
        { id: id++, entity: 'Product', meta: 'image', EntityId: i, FileId: 4 },
        { id: id++, entity: 'Product', meta: 'image', EntityId: i, FileId: 5 },
        { id: id++, entity: 'Product', meta: 'image', EntityId: i, FileId: 6 },
      )
    }

    await queryInterface.bulkInsert('EntityFile', entityFiles)
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Products', null)
  }
};
