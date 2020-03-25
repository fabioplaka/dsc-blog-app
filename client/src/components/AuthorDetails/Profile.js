import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getAuthors, addPost, getPosts, deletePost } from '../../actions/PostActions';
import AddPost from './AddPost';
import ContactInformation from './ContactInformation.js';
import AuthorPosts from './AuthorPosts';
import AuthorDetailsHeader from './AuthorDetailsHeader';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      body: '',
      helperText: {
        titleErrorText: '',
        bodyErrorText: '',
        author: ''
      },
      error: false
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
      body: ''
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

    this.setState({ errors });
    return isError;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      let body = {
        title: this.state.title,
        author: this.props.location.state.sendAuthorName.author,
        body: this.state.body,
      }
      this.props.addPost(body);
      this.closeModal()
      this.setState({
        title: '',
        author: this.props.location.state.sendAuthorName.author,
        body: ''
      })
      setTimeout(() => {
        this.props.getPosts();
      }, 500)
    }
  }

  handleBack = () => {
    this.props.history.goBack()
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
        <AuthorDetailsHeader
          handleBack={this.handleBack}
          handleOpen={this.handleOpen}
          authorName={this.props.location.state.sendAuthorName.author}
        />
        <AddPost
          open={this.state.show}
          handleClose={this.closeModal}
          titleValue={this.state.title}
          bodyValue={this.state.body}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          helperText={this.state.helperText}
          error={this.state.error}
        />
        {
          this.props.loading ? <div style={{ position: 'relative' }} > <CircularProgress
            color="primary"
            style={{ marginLeft: '50%', marginTop: '10%' }}
            size={60} /> </div> :
            <Container>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ContactInformation
                  authors={this.props.authors}
                  authorName={this.props.location.state.sendAuthorName.author}

                />
                <AuthorPosts
                  posts={this.props.posts}
                  authorName={this.props.location.state.sendAuthorName.author}
                  deletePost={this.deletePost}
                />
              </div>
            </Container>

        }
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile);