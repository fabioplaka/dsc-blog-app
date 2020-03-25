import { DELETE_POST, DELETE_POST_FAILURE } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POST:
            return { ...state, postsAterDelete: action.payload }
        case DELETE_POST_FAILURE:
            return { ...state, errorMessage: action.payload.message }
    }
}