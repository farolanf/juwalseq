import axios from 'axios'
import { API_BASE } from '$src/const'

export const fetchDepartments = () => {
  return axios.get(API_BASE + '/Departments')
}

export const fetchCategories = (...ids) => {
  return axios.get(API_BASE + '/Categories', {
    params: {
      DepartmentId: ids
    }
  })
}