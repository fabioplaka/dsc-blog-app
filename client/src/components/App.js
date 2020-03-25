import React from 'react';
import {Router, Route } from 'react-router-dom'
import PostList from './PostList/PostList.js';
import ArticleDetail from './PostDetails/ArticleDetails'
import Profile from './AuthorDetails/Profile';

import history from '../history'

const App = () => {
    return (
            <Router history={history}>
                <div>
                    <Route path="/" exact component={PostList} />
                    <Route path="/postDetails" exact component={ArticleDetail} />
                    <Route path="/authorDetails" exact component={Profile} />
                </div>
            </Router>
    )
}

export default App;