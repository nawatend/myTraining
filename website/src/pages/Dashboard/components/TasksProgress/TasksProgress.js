import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import RecentActors from '@material-ui/icons/RecentActors';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TotalWorkoutProgram = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              WORKOUT PROGRAMS
            </Typography>
            <Typography variant="h3"> {props.total}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <RecentActors className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <LinearProgress
          className={classes.progress}
          value={75.5}
          variant="determinate"
        /> */}
         <Typography
            className={classes.caption}
            variant="caption"
          >
           Add more workout programs
          </Typography>
      </CardContent>
    </Card>
  );
};

TotalWorkoutProgram.propTypes = {
  className: PropTypes.string
};

export default TotalWorkoutProgram;
