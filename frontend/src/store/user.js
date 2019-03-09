import { observable, action } from 'mobx'

export default observable({
  user: null,
  
  @action
  setUser (user) {
    this.user = user
  },
})