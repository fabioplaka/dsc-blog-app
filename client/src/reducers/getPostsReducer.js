import { GET_POSTS, LOADING, GET_POSTS_FAILURE } from '../actions/types.js'

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        case GET_POSTS:
            return {...state, postsList: action.payload, loading: false};
        case GET_POSTS_FAILURE:
            return {...state, loading: true, errorMessage: action.payload.message}
        default:
            return state;
    }
}