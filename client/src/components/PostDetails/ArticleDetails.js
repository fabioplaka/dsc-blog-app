import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Typography';
import Comments from './Comments.js'
import AddComment from './AddCommentModal.js';
import PostHeader from './PostHeader.js';
import { addComment, getComments } from '../../actions/commentAction';


class ArticleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      comments: false,
      commentText: "Show Comment",
      addComment: "Add Comment",
      email: '',
      body: '',
      name: '',
      helperText: {
        nameErrorText: '',
        emailErrorText: '',
        bodyErrorText: ''
      },
      otherData:''
    }
  }

  componentDidMount() {
    this.props.getComments()
  }

  handleBack = () => {
    this.props.history.push("/")
  }

  showComments = () => {
    if (!this.state.comments) {
      this.setState({
        commentText: "Hide Comments",
        comments: true
      })
    } else {
      this.setState({
        commentText: "Show Comments",
        comments: false
      })
    }
  }

  handleOpen = () => {
    this.setState({
      show: true
    })
  }

  closeModal = () => {
    this.setState({
      show: false,
      name: '',
      email: '',
      body: ''
    });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validate = () => {
    let isError = false;
    const errors = this.state.helperText;
    // eslint-disable-next-line
    const emailRegex = /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/


    if (this.state.name.length < 1 || this.state.name === null) {
      isError = true;
      errors.nameErrorText = "This field is required!"
    }

    if (!emailRegex.test(this.state.email)) {
      isError = true;
      errors.emailErrorText = "Please enter a valid email"
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
        name: this.state.name,
        email: this.state.email,
        body: this.state.body,
        postId: this.props.location.state.data.id
      }
      this.props.addComment(body);
      this.closeModal();
      this.setState({
        name: '',
        email: '',
        body: ''
      })
      setTimeout(() => {
        this.props.getComments();
      }, 1000)
    }
  }

  goToProfile = () => {
    this.props.history.push({
      pathname: '/authorDetails',
      state: {sendAuthorName: this.props.location.state.data}
    })
  }

  render() {
    return (
      <div>
        
        
          <PostHeader 
            handleBack={this.handleBack}
            title={this.props.location.state.data.title}
          />
          <Container>
          <Typography href="#">
            <Link onClick={this.goToProfile} variant="body2" color="primary" underline='always' ><u>by {this.props.location.state.data.author}</u></Link>
          </Typography>
          <Typography style={{ marginTop: 20 }}>{this.props.location.state.data.body}</Typography>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <Typography href="#">
                    <Link
                      variant="body2"
                      color="primary"
                      underline='always'
                      onClick={this.showComments}
                    > <u>{this.state.commentText}</u> </Link>
                  </Typography>
                </TableCell>
                {
                  this.state.comments ? <TableCell align="right">
                  <Typography href="#">
                    <Link
                      variant="body2"
                      color="primary"
                      underline='always'
                      onClick={this.handleOpen}
                    > <u>{this.state.addComment}</u> </Link>
                  </Typography>
                </TableCell> : ""
                }
              </TableRow>
            </Table>
          </TableContainer>
          <div style={{border: 0}}>
            {
              this.state.comments && this.props.comments.map((item) => {
                if (item.postId === this.props.location.state.data.id) {
                  return <Comments comments={[item]} />
                } else {
                  return ""
                }
              }
              )}
          </div>
          <AddComment
            open={this.state.show}
            handleClose={this.closeModal}
            handleSubmit={this.handleSubmit}
            emailValue={this.state.email}
            nameValue={this.state.name}
            bodyValue={this.state.body}
            handleInputChange={this.handleInputChange}
            helperText={this.state.helperText}
            error={this.state.error}
          />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    id: state.comments.comments,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  addComment: addComment,
  getComments: getComments
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);
