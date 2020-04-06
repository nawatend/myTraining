import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import BaseLayout from '../layouts/base';
import Button from '../components/Button'
import ExerciseMainInfo from '../components/ExerciseMainInfo'
import Nav from '../components/Nav'
import Return from '../components/Return'
import Timer from '../components/Timer'
import ExerciseDone from '../components/exercise/Done'
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
    const [exerciseInfo, setExerciseInfo] = useState(testDatas[0])

    const [isDone, setIsDone] = useState(false)
    const [finished, setFinished] = useState(false)


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
        setFinished(true)
    }


    useEffect(() => {


    }, [])

    return (

        <div className="exercise__detail">
            <div className="exercise__detail__media">
                <CardMedia
                    component="video"
                    controls
                    className="exercise__detail__media--video"
                    src={`${process.env.PUBLIC_URL}/videos/test.mp4`}
                    title="Exercise Video"
                    aspectratio="wide"
                />
            </div>

            {isDone ? <ExerciseDone mainInfo={exerciseInfo.mainInfo} handleBack={handleBack} handleFinished={handleFinished} /> :
                (<div className="exercise__detail__info">
                    <div className="exercise__detail__info__header">
                        <div className="exercise__detail__info__header--title">{exerciseInfo.title}</div>
                        <div className="exercise__detail__info__header--button">
                            <Button onClick={handleDone} text="DONE" />
                        </div>
                    </div>
                    <div className="detail__timer">
                        <Timer />
                    </div>

                    <ExerciseMainInfo mainInfo={exerciseInfo} />
                    <div className="exercise__detail__info__description">
                        {exerciseInfo.description}
                    </div>

                </div>)
            }
        </div>
    )
}
export default BaseLayout(ExerciseDetailPage)