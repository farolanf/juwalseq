import { observable, action } from 'mobx'

class UserStore {
  @observable user = null
  @observable loggedIn = false
    
  @action
  setUser (user) {
    this.user = user
    this.loggedIn = !!user
  }
}

export default UserStore