import React, { useEffect, useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import BaseLayout from '../layouts/base';
import Button from '../components/Button'
import ExerciseMainInfo from '../components/ExerciseMainInfo'
import Nav from '../components/Nav'
import Return from '../components/Return'

let ExerciseDetailPage = () => {

    let exerciseDetailKg = {
        type: "kg",
        sets: 3,
        repetitions: "8 - 12",
        kg: "10 - 16",
        cardio: 1,
        muscle: 3,
        title: "Running",
        description: "This is description"
    }

    let exerciseDetailTime = {
        type: "kg",
        time: 20,
        cardio: 4,
        muscle: 2,
        title: "Running",
        description: "This is description"
    }
    const [exerciseInfo, setExerciseInfo] = useState(exerciseDetailTime)

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
                    <div className="exercise__detail__info">
                        <div className="exercise__detail__info__header">
                            <div className="exercise__detail__info__header--title">{exerciseInfo.title}</div>
                            <div className="exercise__detail__info__header--button">
                                <Button text="DONE" />
                            </div>
                        </div>

                        <ExerciseMainInfo mainInfo={exerciseInfo} />
                        <div className="exercise__detail__info__description">
                            {exerciseInfo.description}
                        </div>

                    </div>
                </div>
    )
}
export default BaseLayout(ExerciseDetailPage)