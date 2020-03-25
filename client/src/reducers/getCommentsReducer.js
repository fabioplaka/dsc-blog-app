import { LOADING, GET_COMMENTS, GET_COMMENTS_FAILURE } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case GET_COMMENTS:
      return { ...state, loading: false, comments: action.payload };
    case GET_COMMENTS_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload.message }
    default:
      return state;
  }
}