import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import { WorkoutProgramToolbar, WorkoutProgramTable } from './components'
import mockData from './data'
//api
import { WorkoutProgramService, TrainerService } from '../../services/api'
//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../utils/jwt'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const ExerciseList = () => {
  const classes = useStyles()

 
  const [workoutPrograms, setWorkoutPrograms] = useState([])

  const [trainerId, setTrainerId] = useState(null)
  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))

  }, [trainerId])

  useEffect(() => {
    if (trainerId !== null) {


      WorkoutProgramService.getWorkoutProgramsByTrainer(trainerId)
        .then((res) => {
          console.log(res)
          setWorkoutPrograms(res)
        }).catch((e) => console.log('workoutPrograms not found'))
    }
  }, [trainerId])


  return (
    <div className={classes.root}>
      <WorkoutProgramToolbar />
      <div className={classes.content}>
        <WorkoutProgramTable workoutPrograms={workoutPrograms} />
      </div>
    </div>
  )
}

export default ExerciseList
