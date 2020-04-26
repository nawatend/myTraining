import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { AccountDetails, AccountProfile } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const Account = () => {
  const classes = useStyles();

  const [imageName, setImageName] = useState()
  const handleImage = (publicId) => {

    setImageName(publicId)
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile image={imageName} handleImage={handleImage} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails image={imageName} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
