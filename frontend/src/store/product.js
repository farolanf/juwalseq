import _ from 'lodash'
import { observable, action, flow, computed, reaction, toJS } from 'mobx'
import { searchProducts, fetchDepartments, fetchCategories } from '$api/product'

class ProductStore {
  @observable.ref departments
  @observable.ref categories

  @observable pageSize = 15
  @observable page = 1
  @observable q = ''
  @observable filters = {
    priceMin: undefined,
    priceMax: undefined,
    nego: undefined,
    provinsi: [],
    kabupaten: [],
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
      ...toJS(this.filters),
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
    this.filters.nego = typeof query.nego !== 'undefined' ? query.nego === 'true' : undefined
    this.filters.priceMin = +query.priceMin || undefined
    this.filters.priceMax = +query.priceMax || undefined
    this.filters.provinsi = query.provinsi || []
    this.filters.kabupaten = query.kabupaten || []
    this.filters.departments = query.departments || []
    this.filters.categories = query.categories || []
    this.filters.attributes = query.attributes || []
  }

  @action
  resetFilters () {
    this.filters = {
      priceMin: undefined,
      priceMax: undefined,
      nego: undefined,
      provinsi: [],
      kabupaten: [],
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
  setNego (enable) {
    this.filters.nego = enable
  }

  @action
  setPriceMin (val) {
    this.filters.priceMin = val
  }

  @action
  setPriceMax (val) {
    this.filters.priceMax = val
  }

  addProvinsi (id) { this.addFilter(this.filters.provinsi, id) }
  removeProvinsi (id) { this.removeFilter(this.filters.provinsi, id) }

  addKabupaten (id) { this.addFilter(this.filters.kabupaten, id) }
  removeKabupaten (id) { this.removeFilter(this.filters.kabupaten, id) }

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