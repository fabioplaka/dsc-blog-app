import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';


const AddPostModal = ({error, helperText, handleInputChange, bodyValue, titleValue, authors, handleClose, open, authorName, handleChangeAuthor, handleSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper} in={open}>
          <form onSubmit={handleSubmit}>
            <h4 className={classes.headerStyle}>Add Post</h4>
              <div>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemText primary="Title*" />
                    <TextField 
                      className={classes.textFieldTitle}
                      InputProps={{ className: classes.input }}
                      value={titleValue}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      helperText={helperText.titleErrorText}
                      error={error}
                      name={"title"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Author*" />
                    <Select
                      error={error}
                      helperText={helperText.authorErrorText}
                      name={"author"}
                      native
                      value={authorName}
                      onChange={handleChangeAuthor}
                      className={classes.optionAuthors}>
                      <option value="" disabled>Choose Author</option>
                      {
                        authors && authors.map((author, index) => {
                          return <option key={index}> {author.name} </option>
                        })
                      }
                    </Select>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Body*" />
                    <TextField
                      multiline
                      rows={3}
                      rowsMax={3}
                      className={classes.textArea}
                      value={bodyValue}
                      onChange={handleInputChange}
                      variant="outlined"
                      helperText={helperText.bodyErrorText}
                      error={error}
                      name={"body"}
                    />
                    <div>
                    </div>
                  </ListItem>
                  <ListItem className={classes.listItemStyle} >
                    <div className={classes.buttonsDiv}>
                      <button className={classes.closeButton} onClick={handleClose}> Close </button>
                      <button type="submit" className={classes.submitButton}> Save </button>
                    </div>
                  </ListItem>
                </List>
              </div>
          </form>
        </div>
      </Modal>
    </div>
  );

}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    width: '20%',
    height: '35%'
  },
  textFieldTitle: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,

  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black'
  },
  optionAuthors: {
    width: '80%',
    fontColor: 'black'
  },
  textArea: {
    width: '80%'
  },
  button: {
    border: 1,
    borderRadius: 3,
  },
  listItemStyle: {
    display:'flex',
    justifyContent:'flex-end'
  },
  closeButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10 
  },
  submitButton: {
    borderColor: 'black',
    borderWidth: 1
  },
  headerStyle: {
    marginTop:-5
  },
  buttonsDiv: {
    position: 'relative'
  }
}));

export default AddPostModal;