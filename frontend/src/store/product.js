import _ from 'lodash'
import { observable, action, flow } from 'mobx'
import { searchProducts as _searchProducts } from '$api/product'

class ProductStore {
  @observable.ref results = null
  @observable products = []

  @action
  fetchProducts = _.debounce(flow(function* fetchProducts () {
    yield Promise.resolve()
  }), 300)

  @action
  searchProducts = _.debounce(flow(function* searchProducts (filters) {
    this.results = yield _searchProducts(filters).then(res => res.data)
    console.log(this.results)
  }), 300)
}

export default ProductStore