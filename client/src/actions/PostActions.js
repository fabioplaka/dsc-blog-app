import axios from 'axios';
import { url, localUrl } from '../URL/url';
import {
  GET_AUTHORS,
  LOADING,
  CREATE_POST,
  GET_POSTS,
  CREATE_POST_FAILURE,
  GET_POSTS_FAILURE,
  DELETE_POST,
  DELETE_POST_FAILURE
} from './types';


export const getAuthors = () => {
  return (dispatch) => {
    axios.get(`${url}/users`)
      .then((response) => {
        dispatch(getAuthorsSuccess(response.data))
      })
      .catch((error) => console.log(error))
  }
}

export const getPosts = () => {
  return (dispatch) => {
    dispatch({ type: LOADING })
    axios.get(`${localUrl}/posts`)
      .then((response) => {
        dispatch(getPostsSuccess(response.data))
      })
      .catch((error) => dispatch(getPostsFailure(error)))
  }
}

export const addPost = ({ title, author, body }) => {
  return (dispatch) => {
    axios.post(`${localUrl}/posts`, {
      title: title,
      author: author,
      body: body
    })
      .then(response => {
        if (response.status === 201)
          dispatch(createPostSuccess(response.data))
      })
      .catch(error => dispatch(createPostFailure(error)));
  }
}

export const deletePost = (id) => {
  return (dispatch) => {
    axios.delete(`${localUrl}/posts/` + id)
    .then((response) => {
      dispatch(deletePostSuccess(response))
    })
    .catch((error) => dispatch(deletePostFailure(error)))
  }
}

export const deletePostSuccess = (data) => {
  return {
    type: DELETE_POST,
    payload: data
  }
}

export const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE,
    payload: error
  }
}

export const getAuthorsSuccess = (data) => {
  return {
    type: GET_AUTHORS,
    payload: data
  }
}

export const getPostsSuccess = (data) => {
  return {
    type: GET_POSTS,
    payload: data
  }
}

export const createPostSuccess = (data) => {
  return {
    type: CREATE_POST,
    payload: {
      title: data.title,
      author: data.author,
      body: data.body
    }
  }
}

export const createPostFailure = (error) => {
  return {
    type: CREATE_POST_FAILURE,
    payload: error
  }
}

export const getPostsFailure = (error) => {
  return {
    type: GET_POSTS_FAILURE,
    payload: error
  }
}
