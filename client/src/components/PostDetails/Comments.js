import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Typography';


const Comments = ({ comments }) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer>
        {
          comments && comments.map((item, index) => {
            return (
              <Table aria-label="custom pagination table" className={classes.table}>
                <TableRow key={index} >
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    <div className={classes.divStyle}>
                      <b>{item.name}</b>
                      <div>
                        <Typography href="#" className={classes.typographyStyle}>
                          <Link variant="body2" color="primary" underline='always' ><u>{item.email}</u></Link>
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <p>{item.body}</p>
                    </div>
                  </TableCell>
                </TableRow>
              </Table>
            )
          })
        }
      </TableContainer>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  table: {
    borderCollapse: 'separate', 
    borderSpacing: '10px', 
    marginTop: -10
  },
  tableCell: {
    border: '2px solid black'
  },
  divStyle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  typographyStyle: {
    padding: 0
  }
}));

export default Comments