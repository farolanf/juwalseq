import axios from 'axios'
import qs from 'qs'
import { API_BASE } from '$src/const'

export const addProduct = formData => {
  return axios.post(API_BASE + '/products/add', formData)
}

export const searchProducts = filters => {
  return axios.get(API_BASE + '/search/products', {
    params: qs.stringify(filters)
  })
}