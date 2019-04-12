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
    provinsi: undefined,
    kabupaten: undefined,
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

  fetchDepartments = _.debounce(flow(function* () {
    if (this.departments) return
    this.departments = yield fetchDepartments().then(res => res.data)
  }), 300)

  fetchCategories = _.debounce(flow(function* () {
    if (this.categories) return
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
      provinsi: this.filters.provinsi,
      kabupaten: this.filters.kabupaten,
      departments: [...this.filters.departments],
      categories: [...this.filters.categories],
      attributes: [...this.filters.attributes],
    })
  }

  // force changes
  @action
  tick () {
    this.ticks++
  }

  @action
  setPage (num) {
    this.page = num
  }

  @action
  initFromQuery (query) {
    this.q = query.q || ''
    this.filters.provinsi = query.provinsi || undefined
    this.filters.kabupaten = query.kabupaten || undefined
    this.filters.departments = query.departments || []
    this.filters.categories = query.categories || []
    this.filters.attributes = query.attributes || []
  }

  @action
  resetFilters () {
    this.filters = {
      provinsi: undefined,
      kabupaten: undefined,
      departments: [],
      categories: [],
      attributes: [],
    }
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
  setRegion (provinsi, kabupaten, enable) {
    this.filters.provinsi = enable && typeof kabupaten === 'undefined' ? provinsi : undefined
    this.filters.kabupaten = enable ? kabupaten : undefined
  }

  addCategory (id) { this.addFilter(this.filters.categories, id) }
  removeCategory (id) { this.removeFilter(this.filters.categories, id) }

  @action
  addFilter (filters, id) {
    const i = filters.findIndex(val => val == id)
    i === -1 && filters.push(id)
  }

  @action
  removeFilter (filters, id) {
    const i = filters.findIndex(val => val == id)
    i >= 0 && filters.splice(i, 1)
  }

  @action
  addAttribute (id, valueId) {
    const i = this.filters.attributes.findIndex(attr => attr.id == id && attr.valueId == valueId)
    i === -1 && this.filters.attributes.push({ id, valueId })
  }

  @action
  removeAttribute (id, valueId) {
    const i = this.filters.attributes.findIndex(attr => attr.id == id && attr.valueId == valueId)
    i >= 0 && this.filters.attributes.splice(i, 1)
  }
}

export default ProductStore