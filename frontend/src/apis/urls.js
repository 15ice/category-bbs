import config from 'AppConfig';

const DEFAULT_API = `${config.API_URL}/api/v1`;

// sessions
export const loginUrl = `${DEFAULT_API}/login`;
export const logoutUrl = `${DEFAULT_API}/logout`;
export const loggedInUrl = `${DEFAULT_API}/logged_in`;

// posts
export const postsIndexUrl = (category_id, skip, take) =>
  `${DEFAULT_API}/posts?category=${category_id}&$skip=${skip}&take=${take}`;
export const postsCreateUrl = `${DEFAULT_API}/posts`;
export const postsShowUrl = (postId) =>
  `${DEFAULT_API}/posts/${postId}`;
export const postsUpdateDisplayUrl = (postId) =>
  `${DEFAULT_API}/posts/update_display/${postId}`;
export const postsUpdateHiddenUrl = (postId) =>
  `${DEFAULT_API}/posts/update_hidden/${postId}`;

// categories
export const categoriesIndexUrl = `${DEFAULT_API}/categories`;
export const categoriesCreateUrl = `${DEFAULT_API}/categories`;
export const categoriesShowUrl = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;
export const categoriesUpdateUrl = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;
export const categoriesDestroyUrl = (categoryId) =>
  `${DEFAULT_API}/categories/${categoryId}`;

