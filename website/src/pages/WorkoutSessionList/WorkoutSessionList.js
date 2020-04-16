import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { WorkoutSessionsToolbar, WorkoutSessionCard } from './components';
import mockData from './data';
//api
import { ExerciseBaseService, TrainerService, WorkoutSessionService } from '../../services/api'
//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../utils/jwt'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const WorkoutSessionList = () => {
  const classes = useStyles();

  const [workoutSessions, setWorkoutSessions] = useState([]);


  const [trainerId, setTrainerId] = useState(null)
  useEffect(() => {
    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))
  }, [trainerId])

  useEffect(() => {
    if (trainerId !== null) {
      WorkoutSessionService.getWorkoutSessionsByTrainer(trainerId)
        .then((res) => {
          setWorkoutSessions(res)
        }).catch((e) => console.log('workout session not found'))
    }
  }, [trainerId])

  return (
    <div className={classes.root}>
      <WorkoutSessionsToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {workoutSessions.map(workoutSession => (
            <Grid
              item
              key={workoutSession.id}
              xl={3}
              lg={4}
              md={6}
              xs={12}
            >
              <WorkoutSessionCard workoutSession={workoutSession} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
          <Typography variant="caption">6 of {workoutSessions.length}</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default WorkoutSessionList;
