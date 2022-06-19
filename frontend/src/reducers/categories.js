import { REQUEST_STATE } from '../constants';

export const initCategoriesState = {
  fetchState: REQUEST_STATE.INITIAL,
  categoriesList: [],
};

export const categoriesActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_LAVEL: 'FETCH_LAVEL',
  FETCH_TABLE: 'FETCH_TABLE'
}

const categoriesTableFormat = (id, name, postCount, activePostCount) => {
  return {
    'key': id,
    'name': name,
    'postCount': postCount,
    'activePostCount': activePostCount
  }
}

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case categoriesActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case categoriesActionTypes.FETCH_LAVEL:
      return {
        fetchState: REQUEST_STATE.OK,
        categoriesList: action.payload.categories.map(r => {
          return {
            value: r.data.id,
            label: r.data.name
          }
        })
      };
    case categoriesActionTypes.FETCH_TABLE:
      return {
        fetchState: REQUEST_STATE.OK,
        categoriesList: action.payload.categories.map(r => categoriesTableFormat(
          r.data.id,
          r.data.name,
          r.post_count,
          r.active_post_count))
      };
    default:
      throw new Error();
  }
}
