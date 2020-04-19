import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';
import ExerciseCard from '../components/ExerciseCard'
import Timer from '../components/Timer'
import { Title, SubTitle } from '../components/texts'
import Return from '../components/Return'
import Feedback from '../components/Feedback'
import {  withRouter, useHistory } from 'react-router-dom';
let TodayExercisesPage = (props) => {


    let testDatas = [{
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


    
    useEffect(() => {

        if (testDatas.length === 1 || testDatas.length === 0) {
            setAlmostDone(true)
        }

    }, [testDatas.length])

    return (
        <div className="today__exercises">
            {/* <div className="today__timer">
                <Timer />
            </div> */}
            <SubTitle text="Today's exercises" />
            {testDatas.map((data, i) => ((!data.done) ? <ExerciseCard key={i} data={data} /> : null))}
            {almostDone &&
                <Feedback />
            }
            <SubTitle text="Completed exercises" />
            {testDatas.map((data, i) => ((data.done) ? <ExerciseCard key={i} data={data} /> : null))}
        </div>
    )
}

export default withRouter(TodayExercisesPage)
