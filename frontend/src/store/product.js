import _ from 'lodash'
import { observable, action, flow, computed } from 'mobx'
import { searchProducts as _searchProducts } from '$api/product'

class ProductStore {
  @observable pageSize = 15
  @observable page = 1
  @observable q = ''
  @observable filters = {
    departments: [],
    categories: [],
    attributes: [],
  }
  @observable.ref results = null

  @action
  setPage (num) {
    this.page = num
  }

  searchProducts = _.debounce(flow(function* searchProducts (params) {
    this.results = yield _searchProducts(params).then(res => res.data)
  }), 300)

  // we use computed instead of autorun/reaction so it will not run when not observed
  @computed
  get doSearchProducts () {
    return this.searchProducts({
      count: this.pageSize,
      offset: (this.page - 1) * this.pageSize,
      q: this.q,
      departments: [...this.filters.departments],
      categories: [...this.filters.categories],
      attributes: [...this.filters.attributes],
    })
  }

  @action
  clearFilters () {
    this.q = ''
    this.filters = {
      departments: [],
      categories: [],
      attributes: [],
    }
    this.results = null
  }

  @action
  setQuery (q) {
    this.q = q
  }

  @action
  addCategory (name) {
    const i = this.filters.categories.findIndex(val => val === name)
    i === -1 && this.filters.categories.push(name)
  }

  @action
  removeCategory (name) {
    const i = this.filters.categories.findIndex(val => val === name)
    i >= 0 && this.filters.categories.splice(i, 1)
  }

  @action
  addAttribute (name, value) {
    const i = this.filters.attributes.findIndex(attr => attr.name === name && attr.value === value)
    i === -1 && this.filters.attributes.push({ name, value })
  }

  @action
  removeAttribute (name, value) {
    const i = this.filters.attributes.findIndex(attr => attr.name === name && attr.value === value)
    i >= 0 && this.filters.attributes.splice(i, 1)
  }
}

export default ProductStore