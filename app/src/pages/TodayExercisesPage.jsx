import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';
import ExerciseCard from '../components/ExerciseCard'
import Timer from '../components/Timer'
import { Title, SubTitle } from '../components/texts'
import Return from '../components/Return'
import Feedback from '../components/Feedback'
import { withRouter, useHistory, useParams } from 'react-router-dom';


import { ExerciseFullService, SporterService } from '../api'
import { getUserIdFromJWT } from '../utils/jwt'

let TodayExercisesPage = (props) => {

    let { workoutsessionId } = useParams()

    let exercisesV2 = [{
        title: "1 0titltes",
        imagePath: "/images/test.jpg",
        videoPath: "/videos/test.mp4",
        cardioLevel: "1",
        muscleLevel: "4",
        type: "reps",
        mainInfo: { sets: 3, reps: 8, kg: 16 },
        done: false,
        description: "ttest descirption is fun but leuk lksdflk sdn dlsknfl ksdlfkj j jds flis  klmlk"
    }
        , {
        trainerId: 1,
        title: "Stair Run",
        type: "time",
        muscleLevel: 2,
        cardioLevel: 4,
        imagePath: 'test.jpg',
        videoPath: 'test.mp4',
        description: 'Description lorem ipsom lk lkj lkf nI here  odn nneren len nwang tnedar tnaw isc ocool',
        mainInfo: {
            time: 22
        }
    }, {
        title: "2 Title",
        imagePath: "/images/test.jpg",
        videoPath: "/videos/test.mp4",
        cardioLevel: "4",
        muscleLevel: "2", type: "time",
        mainInfo: { time: 20 },
        description: "ttest descirption is fun but leuk lksdflk sdn dlsknfl ksdlfkj j jds flis  klmlk",
        done: false,
    }, {
        title: "Running",
        done: true,
        imagePath: "/images/test.jpg",
        videoPath: "/videos/test.mp4",
        cardioLevel: "4",
        muscleLevel: "2", type: "time",
        mainInfo: { time: 20 },
        description: "ttest descirption is fun but leuk lksdflk sdn dlsknfl ksdlfkj j jds flis  klmlk"
    }]

    const [isRated, setIsRated] = useState(false)
    const [almostDone, setAlmostDone] = useState(false)
    const [exercises, setExercises] = useState([])

    const [sporter, setSporter] = useState({})

    const [unfinishedExercises, setUnfinishedExercises] = useState([])
    const [finishedExercises, setFinishedExercises] = useState([])

    useEffect(() => {
        SporterService.getSporterByUserId(getUserIdFromJWT())
            .then((res) => {
                setSporter(res)
            }).catch((e) => console.log('sporter not found'))
    }, [])

    useEffect(() => {

        console.log(workoutsessionId)
        ExerciseFullService.getExerciseFullsByWorkoutSession(workoutsessionId)
            .then((res) => {
                console.log(res)
                setExercises([...res])
            })
            .catch((e) => console.log(e))

    }, [workoutsessionId])





    useEffect(() => {

        if (unfinishedExercises.length === 0) {
            setAlmostDone(true)
        } else {
            setAlmostDone(false)
        }


    }, [unfinishedExercises])


    useEffect(() => {

        let unfinished = exercises.filter((exercise) => {
            return exercise.done === false
        })

        let finished = exercises.filter((exercise) => {
            return exercise.done === true
        })
        console.log(unfinished)
        setUnfinishedExercises(unfinished)
        setFinishedExercises(finished)
    }, [exercises])

    useEffect(() => {

        let header = document.getElementById('main__header')

        header.scrollIntoView({ behavior: "smooth" })

    }, [])

    return (
        <div className="today__exercises">
            {/* <div className="today__timer">
                <Timer />
            </div> */}
            <SubTitle text="Today's exercises" />
            {unfinishedExercises.length !== 0 ?
                (unfinishedExercises.map((data, i) => ((!data.done) ? <ExerciseCard key={i} data={data} /> : null)))
                :
                ("Nicely done, you are all done for today!")
            }

            {almostDone &&
                <Feedback data={{ workoutSessionId: workoutsessionId, sporter: sporter }} />
            }
            <SubTitle text="Completed exercises" />
            {finishedExercises.map((data, i) => ((data.done) ? <ExerciseCard key={i} data={data} /> : null))}
        </div>
    )
}

export default withRouter(TodayExercisesPage)
