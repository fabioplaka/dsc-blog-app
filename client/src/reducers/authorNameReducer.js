import { GET_AUTHORS } from '../actions/types';
 
const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTHORS:
            return [...state, action.payload]
        default:
            return state;
    }
}