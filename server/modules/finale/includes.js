const db = require('../../sequelize')

module.exports = {
  Product: [
    {
      model: db.AttributeValue,
      include: [
        {
          model: db.Attribute
        }
      ]
    }
  ],
}