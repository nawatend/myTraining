import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';

import WorkoutCard from '../components/WorkoutCard'
import HorizontalContainer from '../components/HorizontalContainer'
import { Subtitle } from '../components/texts'



let WorkoutsPage = () => {

    useEffect(() => {
    }, [])

    return (
        <div className="workouts">
                <Subtitle text="Yours trainer's workout programs" />
                <HorizontalContainer>
                    <WorkoutCard />
                    <WorkoutCard />
                    <WorkoutCard />
                </HorizontalContainer>

                <Subtitle text="Free workout programs" />
                <HorizontalContainer>
                    <WorkoutCard />
                    <WorkoutCard />
                    <WorkoutCard />
                </HorizontalContainer>
        </div>
    )
}

export default BaseLayout(WorkoutsPage)
