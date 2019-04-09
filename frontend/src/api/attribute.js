import axios from 'axios'
import { API_BASE } from '$src/const'

export const fetchAttributes = () => {
  return axios.get(API_BASE + '/Attributes')
}

export const fetchAttributeValues = (attrId) => {
  return axios.get(API_BASE + '/AttributeValues', {
    params: {
      AttributeId: attrId
    }
  })
}