import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import '../../style/style.css';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '4px',

      },
    },
  },
});

const BlogList = ({ postTitle, goToBlogDetail, deletePost }) => {
  const classes = useStyles2();
  return (
    <div>
      <TableContainer>
        <ThemeProvider theme={theme}>
          <Table className={classes.table} aria-label="custom pagination table">
            {postTitle && postTitle.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" className={classes.blogTitle}>
                    <span className={classes.title}>{item.title}</span>
                    <div>
                      <IconButton onClick={() => goToBlogDetail(item)} className={classes.iconButton}>
                        <Icon className={classes.iconStyle}>chevron_right</Icon>
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell style={{ borderBottom: 0 }}>
                    <IconButton className={classes.iconButton} onClick={() => deletePost(item)}>
                      <Icon className={classes.iconStyle}>delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </Table>
        </ThemeProvider>
      </TableContainer>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    borderCollapse: 'separate',
    borderSpacing: '10px'
  },
  blogTitle: {
    fontSize: 20,
    border: '2px solid black', 
    display: 'flex', 
    justifyContent: 'space-between'
  },
  title: {
    display: 'block', 
    width: '300px', 
    overflow: 'hidden', 
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  iconButton: {
    padding: 0
  },
  iconStyle: {
    fontSize: 30,
    color: 'black'
  }
});

export default BlogList;