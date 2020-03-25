import {combineReducers} from 'redux';
import authorName from './authorNameReducer';
import postReducer from './addPostReducer';
import getPosts from './getPostsReducer'
import comments from './getCommentsReducer';

export default combineReducers({
    authorName: authorName,
    posts: postReducer,
    allPosts: getPosts,
    comments: comments
});
