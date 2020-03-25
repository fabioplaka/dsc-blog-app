import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const AuthorPosts = ({ posts, authorName, deletePost }) => {
  const classes = useStyles2();
  return (
    <div>
      <TableContainer>
        <Table aria-label="custom pagination table" className={classes.table}>
          {posts && posts.map((item, index) => {
            if (item.author === authorName) {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                  <span className={classes.title}><b>{item.title}</b></span>
                    <div>
                      <IconButton className={classes.iconStyle} onClick={() => deletePost(item)}>
                        <Icon className={classes.deleteButton}>delete</Icon>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              )
            } else {
              return (
                <div></div>
              )
            }
          })}
        </Table>
      </TableContainer>
    </div>
  )
}

const useStyles2 = makeStyles({
  table: {
    borderCollapse: 'separate', 
    borderSpacing: '10px', 
    width: '800px', 
    marginTop: '-10px'
  },
  tableCell: {
    border: '2px solid black',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 5
  },
  title: {
    display: 'block', 
    width: '300px', 
    overflow: 'hidden', 
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  deleteButton: {
    fontSize: 30,
    color: 'black'
  },
  iconStyle: {
    padding: 0
  }
});

export default AuthorPosts;