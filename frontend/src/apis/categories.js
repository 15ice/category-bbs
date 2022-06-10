import axios from 'axios';
import { categoriesIndexUrl } from './urls'

export const fetchCategories = () => {
  return axios.get(
    categoriesIndexUrl,
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}
