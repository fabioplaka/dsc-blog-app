import {POST_COMMENTS} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_COMMENTS:
          return  [...state, action.payload] 
        default:
          return state;
      }
}