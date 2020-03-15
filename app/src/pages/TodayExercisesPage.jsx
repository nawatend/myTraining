import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';
import ExerciseCard from '../components/ExerciseCard'
import Timer from '../components/Timer'
import { Title, Subtitle } from '../components/texts'
import Return from '../components/Return'


let TodayExercisesPage = () => {

    useEffect(() => {

    }, [])

    return (
        <div className="today__exercises">
            <Return />
            <div className="today__timer">
                <Timer />
            </div>
            <Subtitle text="Today's exercises" />
            <ExerciseCard />
            <ExerciseCard />
            <ExerciseCard />

            <Subtitle text="Completed exercises" />
            <ExerciseCard />
            <ExerciseCard />
        </div>
    )
}

export default BaseLayout(TodayExercisesPage)
