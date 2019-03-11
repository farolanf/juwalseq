import _ from 'lodash'
import axios from 'axios'
import { observable, flow } from 'mobx'
import { API_BASE } from '$const'

class DepartmentStore {
  @observable departments = []

  fetchDepartments = _.debounce(flow(function* fetchDepartments () {
    try {
      this.departments = yield axios
        .get(API_BASE + '/Departments', {
          params: { Category__: '' }
        })
        .then(res => res.data)
    } catch (err) {
      console.error(err)
    }
  }), 300)
}

export default DepartmentStore