import _ from 'lodash'
import { observable, action, flow, computed, reaction } from 'mobx'
import { searchProducts, fetchDepartments, fetchCategories } from '$api/product'

class ProductStore {
  @observable.ref departments
  @observable.ref categories

  @observable pageSize = 15
  @observable page = 1
  @observable q = ''
  @observable filters = {
    departments: [],
    categories: [],
    attributes: [],
  }
  
  @observable loading = false
  @observable.ref results
  
  @observable ticks = 0

  constructor () {
    reaction(
      () => [this.q, this.ticks],
      () => this.resetFilters() 
    )
  }

  // force changes
  @action
  tick () {
    this.ticks++
  }

  resetFilters () {
    this.filters = {
      departments: [],
      categories: [],
      attributes: [],
    }
  }

  fetchDepartments = _.debounce(flow(function* () {
    this.departments = yield fetchDepartments().then(res => res.data)
  }), 300)

  fetchCategories = _.debounce(flow(function* () {
    this.categories = yield fetchCategories().then(res => res.data)
  }), 300)

  searchProducts = _.debounce(flow(function* (params) {
    this.loading = true
    this.results = yield searchProducts(params).then(res => res.data)
    this.loading = false
  }), 300)

  // we use computed instead of autorun/reaction so it will not run when not observed
  @computed
  get doSearchProducts () {
    this.ticks
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
  setPage (num) {
    this.page = num
  }

  @action
  clearFilters () {
    this.q = ''
    this.resetFilters()
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