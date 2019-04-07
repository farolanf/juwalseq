const _ = require('lodash')
const db = require('@db')
const config = require('@config')

const ProductDoc = {
  model: db.Product,
  index: config.elasticsearch.index,
  type: 'products',
  mappings: {
    properties: {
      name: { type: 'text' },
      description: { type: 'text' },
      price: { type: 'float' },
      departments: {
        type: 'nested',
        properties: {
          name: { type: 'keyword' }
        }
      },
      categories: {
        type: 'nested',
        properties: {
          name: { type: 'keyword' }
        }
      },
      attributes: {
        type: 'nested',
        properties: {
          name: { type: 'keyword' },
          value: { type: 'keyword' },
        }
      }
    }
  },
  associations: {
    include: [
      {
        model: db.Category,
        include: db.Department,
      },
      {
        model: db.AttributeValue,
        include: db.Attribute
      },
      {
        model: db.File,
        as: 'Images',
      }
    ],
  },
  hooks: {
    Department: {
      include: department => [
        {
          model: db.Category,
          include: [
            {
              model: db.Department,
              where: { id: department.id }
            }
          ]
        },
      ],
    },
    Category: {
      include: category => [
        {
          model: db.Category,
          where: { id: category.id }
        },
      ],
    },
    ProductCategory: {
      include: productCategory => [
        {
          model: db.Category,
          where: { id: productCategory.ProductId }
        },
      ],
    },
    Attribute: {
      include: attribute => [
        {
          model: db.AttributeValue,
          include: [
            {
              model: db.Attribute,
              where: { id: attribute.id }
            }
          ]
        },
      ],
    },
    AttributeValue: {
      include: attributeValue => [
        {
          model: db.AttributeValue,
          where: { id: attributeValue.id },
        }
      ],
    }
  },
  getDoc: getDoc,
  buildQuery: buildQuery,
}

function getDoc (record) {
  const doc = _.pick(record.dataValues, [
    'id',
    'name',
    'description',
    'price',
  ])
  doc.departments = (record.Categories || []).map(c => ({
    name: c.Department.name
  }))
  doc.categories = (record.Categories || []).map(c => ({
    name: c.name
  }))
  doc.attributes = (record.AttributeValues || []).map(av => ({
    name: av.Attribute.name,
    value: av.value
  }))
  doc.images = (record.Images || []).map(c => ({
    url: c.url
  }))
  return doc
}

function buildQuery (params) {
  if (params.count) {
    params.count = +params.count
  }
  const search = {
    from: params.offset || 0,
    size: Math.min(
      !isNaN(params.count) ? params.count : 15,
      config.elasticsearch.maxCount
    ),
    query: {
      bool: {
        must: searchQuery(params.q),
        filter: {
          bool: { should: filterQuery(params) }
        }
      }
    },
    aggs: {
      all: {
        global: {},
        aggs: {
          search: {
            filter: {
              bool: {
                must: searchQuery(params.q),
              }
            },
            aggs: aggs()
          }
        }
      }
    }
  }
  return search
}

function searchQuery (q) {
  return {
    query_string: {
      query: q || '*'
    }
  }
}

function filterQuery (params) {
  return [].concat(
    (params.departments && [departmentsQuery(params.departments)] || []),
    (params.categories && [categoriesQuery(params.categories)] || []),
    (params.attributes && [attributesQuery(params.attributes)] || [])
  )
}

function departmentsQuery (departments) {
  return {
    nested: {
      path: 'departments',
      query: {
        terms: { 'departments.name': _.castArray(departments) }
      }
    }
  }
}

function categoriesQuery (categories) {
  return {
    nested: {
      path: 'categories',
      query: {
        terms: { 'categories.name': _.castArray(categories) }
      }
    }
  }
}

function attributesQuery (attributes) {
  return attributes.map(attr => ({
    nested: {
      path: 'attributes',
      query: {
        bool: {
          must: [
            {
              match: { 'attributes.name': attr.name }
            },
            {
              match: { 'attributes.value': attr.value }
            }
          ]
        }
      }
    }
  }))
}

function aggs () {
  return {
    departments: {
      nested: { path: 'departments' },
      aggs: {
        name: {
          terms: { field: 'departments.name' }
        }
      }
    },
    categories: {
      nested: { path: 'categories' },
      aggs: {
        name: {
          terms: { field: 'categories.name' }
        }
      }
    },
    attributes: {
      nested: { path: 'attributes' },
      aggs: {
        name: {
          terms: { field: 'attributes.name' },
          aggs: {
            value: {
              terms: { field: 'attributes.value' }
            }
          }
        }
      }
    }
  }
}

module.exports = ProductDoc