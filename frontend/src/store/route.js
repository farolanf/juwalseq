import { observable, action } from 'mobx'

class RouteStore {
  @observable location = {}

  @action
  setLocation (location) {
    this.location = location
  }
}

export default RouteStore