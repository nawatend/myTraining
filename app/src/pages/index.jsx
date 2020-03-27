import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';



import WorkoutCard from '../components/WorkoutCard'
import ExerciseCard from '../components/ExerciseCard'
import HorizontalContainer from '../components/HorizontalContainer'
import { Paper, List } from '@material-ui/core'
import Timer from '../components/Timer'
import Bars from '../components/Bars'
import { Title, SubTitle } from '../components/texts'

let HomePage = () => {

    useEffect(() => {

    }, [])

    return (
        <div className="home">
            
            <SubTitle text="Choose today's session" />
            <HorizontalContainer>
                <WorkoutCard />
                <WorkoutCard />
                <WorkoutCard />
            </HorizontalContainer>

            <SubTitle text="Completed sessions" />
            <HorizontalContainer>
                <WorkoutCard />
                <WorkoutCard />
                <WorkoutCard />
            </HorizontalContainer>
        </div>
    )

}

export default BaseLayout(HomePage)