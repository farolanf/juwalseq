import { observable, action } from 'mobx'

class ScriptStore {
  @observable.ref paypal = null

  @action
  setScript (name, val) {
    this[name] = val
  }
}

export default new ScriptStore()