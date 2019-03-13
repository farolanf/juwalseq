import _ from 'lodash'
import { observable, action, flow } from 'mobx'

class ProductStore {
  @observable products = []

  @action
  fetchProducts = _.debounce(flow(function* fetchProducts () {
    yield Promise.resolve()
  }), 300)
}

export default ProductStore