import axios from 'axios'
import { API_BASE } from '$src/const'

export const forgotPassword = email => {
  return axios.post(API_BASE + '/auth/forgot-password', { email })
}

export const resetPassword = (token, password) => {
  return axios.post(API_BASE + '/auth/reset-password', { token, password })
}