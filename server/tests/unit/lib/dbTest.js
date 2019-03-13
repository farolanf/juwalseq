const db = require('../../../sequelize')
const { addIncludes } = require('../../../lib/db')

describe('db lib', () => {

  async function populate () {
    await db.Department.bulkCreate([
      { id: 1, name: 'Department 1', description: 'Department 1 description' },
      { id: 2, name: 'Department 2', description: 'Department 2 description' },
    ])
    await db.Category.bulkCreate([
      { id: 1, DepartmentId: 1, name: 'Category 1', description: 'Category 1 description' },
      { id: 2, DepartmentId: 2, name: 'Category 2', description: 'Category 2 description' },
    ])
    await db.Product.bulkCreate([
      { id: 1, name: 'Product 1', description: 'Product 1 desc', price: 10 },
      { id: 2, name: 'Product 2', description: 'Product 2 desc', price: 10 },
    ])
    await db.ProductCategory.bulkCreate([
      { id: 1, CategoryId: 1 },
      { id: 2, CategoryId: 2 },
    ])
  }

  describe('addIncludes', () => {

    beforeEach(async () => {
      await db.Department.destroy({ where: {} })
      await db.Category.destroy({ where: {} })
      await db.Product.destroy({ where: {} })
      await db.ProductCategory.destroy({ where: {} })
    })

    it('build include', async () => {
      const context = {}
      const expected = {
        include: [
          {
            model: db.Category,
            where: { name: 'Category 2' }
          }
        ]
      }
      await populate()
      await addIncludes(['category', 'name'], 'Category 2', context, db)
      assert.isArray(context.include)
      assert.equal(context.include[0].model, expected.include[0].model)
      assert.deepEqual(context.include[0].where, expected.include[0].where)
    })

    it('build include nested', async () => {
      const context = {}
      const expected = {
        include: [
          {
            model: db.Category,
            include: [
              {
                model: db.Department,
                where: { name: 'Department 2' },
              }
            ]
          }
        ]
      }
      await populate()
      await addIncludes(['category', 'department', 'name'], 'Department 2', context, db)

      assert.isArray(context.include)
      assert.equal(context.include[0].model, expected.include[0].model)

      assert.isArray(context.include[0].include)
      assert.equal(context.include[0].include[0].model, expected.include[0].include[0].model)
      assert.deepEqual(context.include[0].include[0].where, expected.include[0].include[0].where)
    })

    it('support multi query', async () => {
      const context = {}
      const expected = {
        include: [
          {
            model: db.Category,
            where: { name: 'Category 1' },
            include: [
              {
                model: db.Department,
                where: { name: 'Department 2' },
              }
            ]
          }
        ]
      }
      await populate()
      await addIncludes(['category', 'name'], 'Category 1', context, db)
      await addIncludes(['category', 'department', 'name'], 'Department 2', context, db)

      assert.isArray(context.include)
      assert.equal(context.include[0].model, expected.include[0].model)
      assert.deepEqual(context.include[0].where, expected.include[0].where)

      assert.isArray(context.include[0].include)
      assert.equal(context.include[0].include[0].model, expected.include[0].include[0].model)
      assert.deepEqual(context.include[0].include[0].where, expected.include[0].include[0].where)
    })
  })
})