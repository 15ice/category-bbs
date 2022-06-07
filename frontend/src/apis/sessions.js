import axios from 'axios';
import { loginUrl, logoutUrl, loggedInUrl } from './urls'

export const login = (params) => {

  return axios.post(
    loginUrl,
    {
      session: {
        password: params.password
      }
    },
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}

export const logout = () => {
  return axios.delete(
    logoutUrl,
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}

export const loggedIn = () => {
  return axios.get(
    loggedInUrl,
    { withCredentials: true }
  ).then(res => {
    return res.data
  }).catch((e) => { throw e; });
}
