import _ from 'lodash'
import { observable, action, flow, computed, reaction, toJS } from 'mobx'
import { searchProducts } from '$api/product'

class ProductStore {
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

  _initFromQuery = false
  
  constructor () {
    reaction(
      () => [this.q, JSON.stringify(this.filters)],
      () => {
        !this._initFromQuery && this.setPage(1)
      }
    )
    reaction(
      () => this.q,
      () => this.resetFilters()
    )
  }

  searchProducts = _.debounce(flow(function* (params) {
    this.loading = true
    this.results = yield searchProducts(params).then(res => res.data)
    this.loading = false
  }), 300)

  // we use computed instead of autorun/reaction so it will not run when not observed
  @computed
  get doSearchProducts () {
    return this.searchProducts({
      count: this.pageSize,
      offset: (this.page - 1) * this.pageSize,
      q: this.q,
      ...toJS(this.filters),
    })
  }

  @computed
  get isEmpty () {
    return !this.results || this.results.hits && !this.results.hits.total
  }

  @action
  setPage (num) {
    this.page = num
  }

  @action
  initFromQuery (query) {
    this._initFromQuery = true
    setTimeout(() => { this._initFromQuery = false })
    this.q = query.q || ''
    this.page = +query.page || 1
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

  @computed
  get hasFilters () {
    return _.some(this.filters, x => typeof x !== 'undefined' && (!Array.isArray(x) || x.length))
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