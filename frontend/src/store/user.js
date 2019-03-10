import { observable, action } from 'mobx'

class UserStore {
  @observable user = null
    
  @action
  setUser (user) {
    this.user = user
  }
}

export default UserStore