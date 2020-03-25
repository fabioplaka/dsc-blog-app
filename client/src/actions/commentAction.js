import axios from 'axios';
import { LOADING, POST_COMMENTS, POST_COMMENTS_FAILURE, GET_COMMENTS, GET_COMMENTS_FAILURE } from './types';
import { localUrl } from '../URL/url';

export const addComment = ({ name, email, body, postId }) => {
  return (dispatch) => {
    axios.post(`${localUrl}/comments`, {
      name: name,
      email: email,
      body: body,
      postId: postId,
    })
      .then(response => {
        if (response.status === 201) {
          dispatch(addCommentSuccess(response.data))
        }
      })
      .catch(error => dispatch(addPostFailure(error)));
  }
}

export const getComments = () => {
  return (dispatch) => {
    dispatch({ type: LOADING})
    axios.get(`${localUrl}/comments`)
    .then((response) => {
      dispatch(getCommentsSuccess(response.data))
    })
    .catch((error) => dispatch(getCommentsFailure(error)))
  }
}

export const addCommentSuccess = (data) => {
  return {
    type: POST_COMMENTS,
    payload: {
      name: data.name,
      email: data.email,
      body: data.body,
      postId: data.postId,
    }
  }
}

export const addPostFailure = (error) => {
  return {
    type: POST_COMMENTS_FAILURE,
    payload: error
  }
}

export const getCommentsSuccess = (data) => {
  return {
    type: GET_COMMENTS,
    payload: data
  }
}

export const getCommentsFailure = (error) => {
  return{
    type: GET_COMMENTS_FAILURE,
    payload: error
  }
}