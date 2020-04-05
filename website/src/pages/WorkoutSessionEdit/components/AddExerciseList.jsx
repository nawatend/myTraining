import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Card
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import {Check,Delete, Timer,FitnessCenter} from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function AddExerciseList(props) {

  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(true);


  return (
    <Grid container
      spacing={3} >
      <Grid item xs={12} md={12}>
        <Typography variant="h6" className={classes.title}>
          Added Exercis List
          </Typography>
        <div className={classes.demo}>
          <List dense={dense}>

            {props.exercises.map((exercise, id) => {


              if (exercise.type === "time") {
                return (
                  <ListItem key={id}>
                    <ListItemAvatar>


                      <Timer />

                    </ListItemAvatar>
                    <ListItemText
                      primary={exercise.title}
                    />
                    <ListItemText
                      primary="Time"
                      secondary={secondary ? `${exercise.time} min` : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={(e) => props.deleteExercise(e, exercise.id)} edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              } else {
                return (
                  <ListItem key={id}>
                    <ListItemAvatar>

                      <FitnessCenter />

                    </ListItemAvatar>
                    <ListItemText
                      primary={exercise.title}
                    />
                    <ListItemText
                      primary="Sets"
                      secondary={secondary ? exercise.set : null}
                    />
                    <ListItemText
                      primary="Repetition"
                      secondary={secondary ? exercise.repetition : null}
                    />
                    <ListItemText
                      primary="Kilogram"
                      secondary={secondary ? exercise.kg : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={(e) => props.deleteExercise(e, exercise.id)} edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              }
            })

            }
            {/* {generate(
              <ListItem>
                <ListItemAvatar>

                  <Check />

                </ListItemAvatar>
                <ListItemText
                  primary="Title of ex"
                />
                <ListItemText
                  primary="Sets"
                  secondary={secondary ? '3' : null}
                />
                <ListItemText
                  primary="Repetition"
                  secondary={secondary ? '6' : null}
                />
                <ListItemText
                  primary="Kilogram"
                  secondary={secondary ? '12' : null}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )} */}
          </List>
        </div>
      </Grid>
    </Grid>
  )
}
