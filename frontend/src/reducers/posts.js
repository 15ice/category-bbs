import { REQUEST_STATE } from '../constants';

export const initPostsState = {
  fetchState: REQUEST_STATE.INITIAL,
  postsList: [],
};

export const postsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
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
    default:
      throw new Error();
  }
}
