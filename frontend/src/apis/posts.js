import axios from 'axios';
import {
  postsIndexUrl,
  postsUpdateDisplayUrl,
  postsUpdateHiddenUrl
} from './urls'

export const fetchPosts = (params) => {
  return axios.get(
    postsIndexUrl(params.category, params.skip, params.take),
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}

export const updatePostDisplay = (params) => {
  return axios.put(
    postsUpdateDisplayUrl(params.id),
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}

export const updatePostHidden = (params) => {
  return axios.put(
    postsUpdateHiddenUrl(params.id),
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}
