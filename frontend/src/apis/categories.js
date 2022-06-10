import axios from 'axios';
import { categoriesIndexUrl, categoriesCreateUrl } from './urls'

export const addCategories = (params) => {
  return axios.post(
    categoriesCreateUrl,
    {
      category: {
        name: params.name
      }
    },
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}

export const fetchCategories = () => {
  return axios.get(
    categoriesIndexUrl,
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}
