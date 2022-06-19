import { REQUEST_STATE } from '../constants';

export const initCategoriesState = {
  fetchState: REQUEST_STATE.INITIAL,
  categoriesList: [],
};

export const categoriesActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_LAVEL: 'FETCH_LAVEL'
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
    default:
      throw new Error();
  }
}