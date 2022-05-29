import config from 'AppConfig';

const DEFAULT_API = `${config.API_URL}/api/v1`;

// posts
export const postsIndex = `${DEFAULT_API}/posts`;
export const postsCreate = `${DEFAULT_API}/posts`;
export const postsShow = (postId) =>
  `${DEFAULT_API}/posts/${postId}`;
export const postsUpdateDisplay = (postId) =>
  `${DEFAULT_API}/posts/update_display/${postId}`;
export const postsUpdateHidden = (postId) =>
  `${DEFAULT_API}/posts/update_hidden/${postId}`;
export const postsSearch = (categoryId) =>
  `${DEFAULT_API}/posts/search/${categoryId}`;

// categories
export const categoriesIndex = `${DEFAULT_API}/categories`;
export const categoriesCreate = `${DEFAULT_API}/categories`;
export const categoriesShow = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;
export const categoriesUpdate = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;
export const categoriesDestroy = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;

