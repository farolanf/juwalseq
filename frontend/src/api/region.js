import axios from 'axios'
import { API_BASE } from '$src/const'

export const fetchProvinsis = () => {
  return axios.get(API_BASE + '/Provinsis')
}

export const fetchKabupatens = (...ids) => {
  return axios.get(API_BASE + '/Kabupatens', {
    params: {
      ProvinsiId: ids
    }
  })
}