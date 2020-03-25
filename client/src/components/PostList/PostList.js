import React from 'react';
import { connect } from 'react-redux';
import AddPostModal from './AddPostModal';
import BlogList from './BlogList';
import { getAuthors, addPost, getPosts, deletePost } from '../../actions/PostActions';
import { bindActionCreators } from "redux";
import PostHeader from './PostHeader.js';
import '../../style/style.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      authorName: '',
      body: '',
      title: '',
      helperText: {
        titleErrorText: '',
        bodyErrorText: '',
        author: ''
      },
      error: false,
    }
  }

  componentDidMount() {
    this.props.getAuthors();
    this.props.getPosts();
  }

  handleOpen = () => {
    this.setState({
      show: true
    })
  }

  closeModal = () => {
    this.setState({
      show: false,
      title: '',
      authorName: '',
      body: ''
    })
  }

  handleChangeAuthor = (event) => {
    this.setState({
      authorName: event.target.value
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validate = () => {
    let isError = false;
    const errors = this.state.helperText;

    if (this.state.title.length < 1 || this.state.title === null) {
      isError = true;
      errors.titleErrorText = "This field is required!"
    }

    if (this.state.body.length < 1 || this.state.body === null) {
      isError = true;
      errors.bodyErrorText = "This field is required!"
    }

    if (this.state.authorName === undefined) {
      isError = true;
    }

    this.setState({ errors });
    return isError;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      let body = {
        title: this.state.title,
        author: this.state.authorName,
        body: this.state.body,
      }
      this.props.addPost(body);
      this.closeModal()
      this.setState({
        title: '',
        author: '',
        body: ''
      })
      setTimeout(() => {
        this.props.getPosts();
      }, 500)
    }
  }

  goToBlogDetail = (item) => {
    this.props.history.push({
      pathname: '/postDetails',
      state: { data: item }
    })
  }

  deletePost = (item) => {
    this.props.deletePostAction(item.id);
    setTimeout(() => {
      this.props.getPosts();
    }, 500)
  }

  render() {
    return (
      <div>
        <PostHeader handleOpen={this.handleOpen} />
        <AddPostModal
          open={this.state.show}
          handleClose={this.closeModal}
          authors={this.props.authors}
          authorName={this.state.authorName}
          titleValue={this.state.title}
          bodyValue={this.state.body}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          helperText={this.state.helperText}
          error={this.state.error}
          handleChangeAuthor={this.handleChangeAuthor}
        />
        <div>
          {
            this.props.loading ?
              <div style={{ position: 'relative' }} > <CircularProgress
                color="primary"
                style={{ marginLeft: '50%', marginTop: '10%' }}
                size={60} /> </div> :
              <Container>
                <BlogList
                  goToBlogDetail={this.goToBlogDetail}
                  deletePost={this.deletePost}
                  postTitle={this.props.posts}
                />
              </Container>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authors: state.authorName[0],
    posts: state.allPosts.postsList,
    loading: state.allPosts.loading
  };
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  getAuthors: getAuthors,
  addPost: addPost,
  getPosts: getPosts,
  deletePostAction: deletePost
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(PostList);