import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Typography';

const ContactInformation = ({authors, authorName}) => {
  const classes = useStyles2();
  return(
    <div className={classes.divStyle}>
      {
        authors && authors.map((item) => {
          if (item.name === authorName) {
            return (
              <div>
                <div>
                  <div className={classes.addresStyle}>
                    <Typography>{item.address.street} Street</Typography>
                    <Typography >{item.address.suite}</Typography>
                    <Typography>{item.address.zipcode}{item.address.city}</Typography>
                  </div>
                  <Typography>
                    <Link variant="body2" color="primary" underline='always' ><u>{item.email}</u></Link>
                  </Typography>
                  <div className={classes.companyDetailsStyle}>
                    <Typography>{item.company.name}</Typography>
                    <Typography>{item.company.catchPhrase}</Typography>
                    <Typography>{item.company.bs}</Typography>
                  </div>
                  <Typography>Username: {item.username}</Typography>
                </div>
              </div>
            )
          } else{
            return(
              <div></div>
            )
          }
        })
      }
    </div>
  )
}

const useStyles2 = makeStyles({
  divStyle: {
    width: 300,
    border: '2px solid black',
    padding: '5px'
  },
  companyDetailsStyle: {
    marginTop: 10,
    marginBottom: 10
  },
  addresStyle: {
    marginBottom: 10
  }
});

export default ContactInformation;