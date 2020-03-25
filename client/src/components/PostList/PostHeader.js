import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const PostHeader = ({ handleOpen }) => {
  return (
    <div>
      <Card style={myTheme.cardStyle}>
        <CardHeader
          title="The News"
          titleTypographyProps={{ variant: 'h3' }}
          style={myTheme.cardHeaderStylePref}
          action={
            <IconButton onClick={handleOpen}>
              <Icon style={myTheme.iconStyle} id="addIcon">add_circle</Icon>
            </IconButton>
          }
        > </CardHeader>
      </Card>
    </div>
  )
}

const myTheme = {
  cardHeaderStylePref: {
    textAlign: 'center'
  },
  iconStyle: {
    color: 'black'
  },
  cardStyle: {
    boxShadow: "none"
  }
}

export default PostHeader;