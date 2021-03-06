import axios from 'axios';
import {
  categoriesIndexUrl,
  categoriesCreateUrl,
  categoriesUpdateUrl,
  categoriesDestroyUrl
} from './urls'

export const fetchCategories = () => {
  return axios.get(
    categoriesIndexUrl,
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}

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

export const updateCategories = (params) => {
  return axios.put(
    categoriesUpdateUrl(params.categoryId),
    {
      category: {
        name: params.name
      }
    },
    { withCredentials: true }
  ).catch((e) => { throw e; });
}

export const deleteCategories = (params) => {
  return axios.delete(
    categoriesDestroyUrl(params.categoryId),
    { withCredentials: true }
  ).catch((e) => { throw e; });
}
