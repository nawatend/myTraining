import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import BaseLayout from '../layouts/base';
import Button from '../components/Button'
import ExerciseMainInfo from '../components/ExerciseMainInfo'
import Nav from '../components/Nav'
import Return from '../components/Return'
import Timer from '../components/Timer'
import ExerciseDone from '../components/exercise/Done'
import { withRouter, useHistory, useParams } from 'react-router-dom';
import { ExerciseFullService, ProgressService, SporterService } from '../api'
import { getUserIdFromJWT } from '../utils/jwt'
import { msToTime, msToMinutes } from '../utils/msToTime'

let ExerciseDetailPage = () => {


    let testDatas = [{
        title: "1 0titltes",
        imagePath: "/images/test.jpg",
        videoPath: "/videos/test.mp4",
        cardioLevel: "1",
        muscleLevel: "4",
        type: "reps",
        mainInfo: { sets: 4, reps: 8, kg: 16 },
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

    const history = useHistory()
    const { workoutSessionId, exerciseFullId } = useParams()

    const [exerciseInfo, setExerciseInfo] = useState({ workoutSession: {}, exerciseBase: {} })

    const [isDone, setIsDone] = useState(false)
    const [finished, setFinished] = useState(false)
    const [elapseTime, setElapseTime] = useState(0)
    const [sporter, setSporter] = useState()
    const [results, setResults] = useState({ time: 0, sets: 0, reps: 0, kg: 0 })

    const handleChange = (prop) => (event, value) => {
        setResults({ ...results, [prop]: value })
    }

    useEffect(() => {
        SporterService.getSporterByUserId(getUserIdFromJWT())
            .then((res) => {
                setSporter(res)
            }).catch((e) => console.log('sporter not found'))
    }, [])


    useEffect(() => {
        setResults({ time: exerciseInfo.time, sets: exerciseInfo.sets, reps: exerciseInfo.reps, kg: exerciseInfo.kg })
    }, [exerciseInfo.kg, exerciseInfo.reps, exerciseInfo.sets, exerciseInfo.time])

    const handleDone = () => {
        console.log('done is cliekd ')


        setIsDone(true)
    }

    const handleBack = () => {
        console.log('back is cliekd ')
        setIsDone(false)
    }

    const handleFinished = () => {
        console.log('fisnihed is cliekd ')
        //TODO save result to db

        let performance = 0

        if (exerciseInfo.exerciseBase.type === "time") {
            performance = results.time / exerciseInfo.time

        } else {

            performance = ((results.reps / exerciseInfo.reps)
                + (results.sets / exerciseInfo.sets)
                + (results.kg / exerciseInfo.kg)) / 3
        }


        let body = {
            sporterId: sporter.id,
            exerciseFullId: exerciseInfo.id,
            sets: results.sets,
            reps: results.reps,
            kg: results.kg,
            time: results.time,
            performance: (performance * 100 >= 100) ? 100 : performance * 100
        }


        ProgressService.createProgress(body)
            .then((res) => {
                console.log(res)
            })
            .catch((e) => console.log(e))


        console.log(performance)

        ExerciseFullService.setDone({ exerciseFullId: exerciseFullId, done: true, performance: (performance * 100 >= 100) ? 100 : performance * 100 })
            .then((res) => {
                console.log(res)
                setFinished(true)
                history.push('/today/' + workoutSessionId)
            })


    }

    const handleTimer = (value) => {
        setElapseTime(value)
    }

    useEffect(() => {

        console.log(exerciseFullId)
        ExerciseFullService.getExerciseFullById(exerciseFullId)
            .then((res) => {
                console.log(res)
                setExerciseInfo({ ...res })
            })
            .catch((e) => console.log(e))

    }, [exerciseFullId])


    useEffect(() => {
        let btnFinish = document.getElementById('exercise__finish')
        let header = document.getElementById('main__header')
        if (btnFinish) {
            btnFinish.scrollIntoView({ behavior: "smooth" })
            console.log("scoorrll")
        } else {
            header.scrollIntoView({ behavior: "smooth" })
        }
    }, [isDone])

    return (

        <div className="exercise__detail">
            <div className="exercise__detail__media" id="exercise__video">
                <CardMedia
                    component="video"
                    controls
                    className="exercise__detail__media--video"
                    src={`http://res.cloudinary.com/filesmytraining/video/upload/v1/${exerciseInfo.exerciseBase.videoName}`}
                    title="Exercise Video"
                    aspectratio="wide"
                />
            </div>

            {isDone ? <ExerciseDone handleChange={handleChange} mainInfo={exerciseInfo} handleBack={handleBack} handleFinished={handleFinished} elapseTime={msToMinutes(elapseTime)} /> :
                (<div className="exercise__detail__info">
                    <div className="exercise__detail__info__header">
                        <div className="exercise__detail__info__header--title">{exerciseInfo.exerciseBase.title}</div>
                        <div className="exercise__detail__info__header--button" >
                            <Button onClick={handleDone} text="DONE" />
                        </div>
                    </div>
                    {exerciseInfo.exerciseBase.type === "time" &&
                        <div className="detail__timer">
                            <Timer handleTimer={handleTimer} />
                        </div>
                    }

                    <ExerciseMainInfo mainInfo={exerciseInfo} />
                    <div className="exercise__detail__info__description">
                        {exerciseInfo.exerciseBase.description}
                    </div>

                </div>)
            }
        </div>
    )
}
export default withRouter(ExerciseDetailPage)