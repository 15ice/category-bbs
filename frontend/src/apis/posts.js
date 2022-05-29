import axios from 'axios';
import { postsIndex } from './urls'

export const fetchPosts = () => {
  return axios.get(postsIndex)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
