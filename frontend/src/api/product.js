import axios from 'axios'
import { API_BASE } from '$src/const'

export const addProduct = formData => {
  return axios.post(API_BASE + '/products/add', formData)
}