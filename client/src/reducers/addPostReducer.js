import { CREATE_POST } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return  [...state, action.payload] 
    default:
      return state;
  }
}