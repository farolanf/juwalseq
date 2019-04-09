import axios from 'axios'
import { API_BASE } from '$src/const'

export const addProduct = formData => {
  return axios.post(API_BASE + '/products/add', formData)
}

export const searchProducts = params => {
  return axios.get(API_BASE + '/search/products', { params })
}

export const fetchDepartments = () => {
  return axios.get(API_BASE + '/Departments')
}

export const fetchCategories = () => {
  return axios.get(API_BASE + '/Categories')
}