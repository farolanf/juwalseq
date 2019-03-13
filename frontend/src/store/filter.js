import { observable, action } from 'mobx'

class FilterStore {
  @observable departments = []
  @observable categories = []
  @observable attributes = []
  
  @action
  setDepartment (name) {

  }
}

export default FilterStore