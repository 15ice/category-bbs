import config from 'AppConfig';

const DEFAULT_API = `${config.API_URL}/api/v1`;

// sessions
export const loginUrl = `${DEFAULT_API}/login`;
export const logoutUrl = `${DEFAULT_API}/logout`;
export const loggedInUrl = `${DEFAULT_API}/logged_in`;

// posts
export const postsIndexUrl = `${DEFAULT_API}/posts`;
export const postsCreateUrl = `${DEFAULT_API}/posts`;
export const postsShowUrl = (postId) =>
  `${DEFAULT_API}/posts/${postId}`;
export const postsUpdateDisplayUrl = (postId) =>
  `${DEFAULT_API}/posts/update_display/${postId}`;
export const postsUpdateHiddenUrl = (postId) =>
  `${DEFAULT_API}/posts/update_hidden/${postId}`;
export const postsSearchUrl = (categoryId) =>
  `${DEFAULT_API}/posts/search/${categoryId}`;

// categories
export const categoriesIndexUrl = `${DEFAULT_API}/categories`;
export const categoriesCreateUrl = `${DEFAULT_API}/categories`;
export const categoriesShowUrl = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;
export const categoriesUpdateUrl = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;
export const categoriesDestroyUrl = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;

