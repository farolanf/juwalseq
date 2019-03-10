import { observable, flow } from 'mobx'
import axios from 'axios'
import { API_BASE } from '$const'

class DepartmentStore {
  @observable departments = []

  fetchDepartments = flow(function* fetchDepartments () {
    try {
      this.departments = yield axios.get(API_BASE + '/departments')
        .then(res => res.data)
        .then(data => {
          return new Promise(resolve => {
            setTimeout(() => resolve(data), 2000)
          })
        })
    } catch (err) {
      console.error(err)
    }
  })
}

export default new DepartmentStore()