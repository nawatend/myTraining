import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import BaseLayout from '../../layouts/base';
import Button from '../Button'
import ExerciseMainInfo from '../ExerciseMainInfo'
import Nav from '../Nav'
import Return from '../Return'
import Timer from '../Timer'
import Grid from '@material-ui/core/Grid';
//slider
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';


const marks = {
  sets: [
    {
      value: 1,
      label: '1 sets',
    },
    {
      value: 5,
      label: '5 sets',
    },
    {
      value: 10,
      label: '10 sets',
    }
  ],
  reps: [
    {
      value: 1,
      label: '1 reps',
    },
    {
      value: 30,
      label: '30 reps',
    }
  ],
  kg: [
    {
      value: 1,
      label: '1 kg',
    },
    {
      value: 190,
      label: '190 kg',
    }
  ]
};


export default function ExerciseDone(props) {
  let testDatas = [{
    title: "1 0titltes",
    imagePath: "/images/test.jpg",
    videoPath: "/videos/test.mp4",
    cardioLevel: "1",
    muscleLevel: "4",
    type: "reps",
    mainInfo: { sets: 3, reps: 8, kg: 16 },
    description: "ttest descirption is fun but leuk lksdflk sdn dlsknfl ksdlfkj j jds flis  klmlk"
  }
    , {
    title: "2 Title",
    imagePath: "/images/test.jpg",
    videoPath: "/videos/test.mp4",
    cardioLevel: "4",
    muscleLevel: "2",
    type: "time",
    mainInfo: { time: 20 },
    description: "ttest descirption is fun but leuk lksdflk sdn dlsknfl ksdlfkj j jds flis  klmlk"
  }, {
    title: "2 Title",
    imagePath: "/images/test.jpg",
    videoPath: "/videos/test.mp4",
    cardioLevel: "4",
    muscleLevel: "2", type: "time",
    mainInfo: { time: 20 },
    description: "ttest descirption is fun but leuk lksdflk sdn dlsknfl ksdlfkj j jds flis  klmlk"
  }]
  const [exerciseInfo, setExerciseInfo] = useState(testDatas[1])
  const [results, setResults] = useState({
    time: props.mainInfo.time
    , sets: props.mainInfo.sets
    , reps: props.mainInfo.reps
    , kg: props.mainInfo.kg
  })


  console.log(props.mainInfo)


  return (
    <div className="exercise__done">

      <div className="exercise__done--title">Great Job!
      <span> Fill In Your  Performance</span>
      </div>

      {props.mainInfo.exerciseBase.type === "time" ? (

        <div className="exercise__done--subtitle">Time: {results.time}
          <FormControl component="fieldset">
            <Slider
              defaultValue={props.elapseTime}
              //getAriaValueText={valuetext}
              onChange={props.handleChange('time')}
              //onChangeCommitted={handleChange('sets')}
              aria-labelledby="time"
              step={1}
              //marks={marks.sets}
              min={1}
              max={60}
              name='time'
              valueLabelDisplay='on'
            />
          </FormControl>
        </div>
      ) :
        (
          <div>

            <div className="exercise__done--subtitle">Sets: {results.sets}
              <FormControl component="fieldset">
                <Slider
                  defaultValue={props.mainInfo.sets}
                  //getAriaValueText={valuetext}
                  onChange={props.handleChange('sets')}
                  //onChangeCommitted={handleChange('sets')}
                  aria-labelledby="sets"
                  step={1}
                  //marks={marks.sets}
                  min={1}
                  max={12}
                  name='sets'
                  valueLabelDisplay='on'
                />
              </FormControl>
            </div>

            <div className="exercise__done--subtitle">Repetitions: {results.reps}
              <FormControl component="fieldset">

                <Slider
                  defaultValue={props.mainInfo.reps}
                  //getAriaValueText={valuetext}
                  onChange={props.handleChange('reps')}
                  //onChangeCommitted={handleChange('reps')}
                  aria-labelledby="reps"
                  step={1}
                  //marks={marks.reps}
                  min={1}
                  max={30}
                  name='reps'
                  valueLabelDisplay='on'
                />
              </FormControl>
            </div>
            <div className="exercise__done--subtitle">Kilogram: {results.kg}
              <FormControl component="fieldset">
                <Slider
                  defaultValue={props.mainInfo.kg}
                  //getAriaValueText={valuetext}
                  onChange={props.handleChange('kg')}
                  //onChangeCommitted={handleChange('kg')}
                  aria-labelledby="kg"
                  step={1}
                  //marks={marks.kg}
                  min={1}
                  max={200}
                  name='kg'
                  valueLabelDisplay='on'
                />
              </FormControl>
            </div>
          </div>
        )}
      <div className="exercise__done--actions">
        <Grid container spacing={2}>
          <Grid item xs={6} >
            <Button onClick={props.handleBack} variant="outlined" text="back" />
          </Grid>
          <Grid id="exercise__finish" item xs={6} >
            <Button onClick={props.handleFinished} text="Finish" />
          </Grid>
        </Grid>
      </div >
    </div >
  )
}
