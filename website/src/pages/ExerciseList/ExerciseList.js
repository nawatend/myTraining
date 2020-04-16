import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import { ExercisesToolbar, ExercisesTable } from './components'
import mockData from './data'
//api
import { ExerciseBaseService, TrainerService } from '../../services/api'
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

 
  const [exercises, setExercises] = useState([])

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
      ExerciseBaseService.getExerciseBasesByTrainer(trainerId)
        .then((res) => {
          console.log(res)
          setExercises(res)
        }).catch((e) => console.log('exercises not found'))
    }
  }, [trainerId])


  return (
    <div className={classes.root}>
      <ExercisesToolbar />
      <div className={classes.content}>
        <ExercisesTable exercises={exercises} />
      </div>
    </div>
  )
}

export default ExerciseList
