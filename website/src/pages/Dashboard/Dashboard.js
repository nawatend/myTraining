import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Budget, LatestOrders, LatestProducts, LatestSales, TasksProgress, TotalProfit, TotalUsers, UsersByDevice } from './components';


//api
import { SporterService, WorkoutProgramService, WorkoutSessionService, TrainerService, RateService } from '../../services/api'
import { filterArrayObjectByTwoKeys } from '../../utils/filter'

//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt'
import { SportersTable, SportersToolbar } from './components'
import ExerciseBase from 'services/api/exerciseBase';
import palette from 'theme/palette';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true)
  const [trainer, setTrainer] = useState({})
  const [sporterData, setSporterData] = useState()
  const [exerciseData, setExerciseData] = useState()
  const [workoutSessionData, setWorkoutSessionData] = useState()
  const [workoutProgramData, setWorkoutProgramData] = useState()

  const [rateData, setRateData] = useState({
    labels: ['Muscle', 'Stamina', 'Strength', 'Lose Fat'],
    datasets: [
      {
        label: 'By Workout Session Type',
        backgroundColor: palette.primary.main,
        data: [18, 5, 19, 27]
      }
    ]
  })

  const [values, setValues] = useState({
    sporter: 0,
    exercise: 0,
    workoutSession: 0,
    workoutProgram: 0
  })

  useEffect(() => {


    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)
        setTrainer(res)
      }).catch((e) => console.log('trainer not found'))


  }, [])


  useEffect(() => {
    ExerciseBase.getExerciseBasesByTrainer(trainer.id)
      .then((res) => {
        //console.log(res)
        setExerciseData(res.length)
      })
  }, [trainer])


  useEffect(() => {
    WorkoutSessionService.getWorkoutSessionsByTrainer(trainer.id)
      .then((res) => {
        // console.log(res)
        setWorkoutSessionData(res.length)
      })
  }, [trainer])


  useEffect(() => {
    WorkoutProgramService.getWorkoutProgramsByTrainer(trainer.id)
      .then((res) => {
        //console.log(res)
        setWorkoutProgramData(res.length)
      })
  }, [trainer])


  useEffect(() => {
    SporterService.getSportersByTrainer({ trainerId: trainer.id })
      .then((res) => {
        //console.log(res)
        setSporterData(res.length)
      })
  }, [trainer])

  useEffect(() => {
    RateService.getRates()
      .then((res) => {

        let trainerRate = []
        let totMuscle = { total: 0, times: 0 }
        let totStamina = { total: 0, times: 0 }
        let totStrength = { total: 0, times: 0 }
        let totFat = { total: 0, times: 0 }
        res.forEach(rate => {
          if (rate.workoutSession.trainer.id === trainer.id) {
            if (rate.workoutSession.type === "muscle") {
              totMuscle = { ...totMuscle, total: totMuscle.total + rate.rate, times: totMuscle.times + 1 }
             // console.log(totMuscle)
            }

            if (rate.workoutSession.type === "stamina") {
              totStamina = { ...totStamina, total: totStamina.total + rate.rate, times: totStamina.times + 1 }
              //console.log(totStamina)
            }

            if (rate.workoutSession.type === "strength") {
              totStrength = { ...totStrength, total: totStrength.total + rate.rate, times: totStrength.times + 1 }
             // console.log(totFat)
            }

            if (rate.workoutSession.type === "fat") {
              totFat = { ...totFat, total: totFat.total + rate.rate, times: totFat.times + 1 }
              //console.log(totFat)
            }
            trainerRate.push(rate)
          }

        });
        //  console.log(totFat)

        setRateData({
          ...rateData, datasets: [
            {
              label: 'Average rating of',
              backgroundColor: palette.primary.main,
              data: [totMuscle.total / totMuscle.times, totStamina.total / totStamina.times
                , totStrength.total / totStrength.times, totFat.total / totFat.times]
            }
          ]
        })
      })
  }, [trainer])


  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget total={exerciseData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers total={workoutSessionData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress total={workoutProgramData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit total={sporterData} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales data={rateData} />
        </Grid>
        {/* <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid> */}
        {/* <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid> */}
        {/* <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Dashboard;
