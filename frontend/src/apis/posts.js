import axios from 'axios';
import { postsIndexUrl } from './urls'

export const fetchPosts = () => {
  return axios.get(
    postsIndexUrl,
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}
