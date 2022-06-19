import { REQUEST_STATE } from '../constants';

export const initPostsState = {
  fetchState: REQUEST_STATE.INITIAL,
  postsList: [],
};

export const postsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_TABLE: 'FETCH_TABLE'
}

const postTableFormat = (id, userName, mail, title, detail, isHidden, createdAt) => {
  return {
    'key': id,
    'userName': userName,
    'mail': mail,
    'title': title,
    'detail': detail,
    'isHidden': isHidden,
    'createdAt': createdAt
  }
}

export const postsReducer = (state, action) => {
  switch (action.type) {
    case postsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case postsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        postsList: action.payload.posts,
      };
    case postsActionTypes.FETCH_TABLE:
      return {
        fetchState: REQUEST_STATE.OK,
        postsList: action.payload.posts.map(r => postTableFormat(
          r.data.id,
          r.data.user_name,
          r.data.mail,
          r.data.title,
          r.data.detail,
          r.data.is_hidden,
          r.data.created_at))
      };
    default:
      throw new Error();
  }
}
