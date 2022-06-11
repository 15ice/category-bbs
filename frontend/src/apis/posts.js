import axios from 'axios';
import { postsIndexUrl } from './urls'

export const fetchPosts = (category, skip, take) => {
  return axios.get(
    postsIndexUrl(category, skip, take),
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}
