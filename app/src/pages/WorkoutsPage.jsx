import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';

import WorkoutCard from '../components/WorkoutCard'
import HorizontalContainer from '../components/HorizontalContainer'
import { SubTitle } from '../components/texts'
import { withRouter, useHistory } from 'react-router-dom';

//api
import { SporterService, WorkoutSessionService } from '../api'
import { getUserIdFromJWT } from '../utils/jwt'


let WorkoutsPage = () => {

    const [values, setValues] = useState({})

    const [workoutSessions, setWorkoutSessions] = useState([])
    const [freeWorkoutSessions, setFreeWorkoutSessions] = useState([])
    const [workoutProgramId, setWorkoutProgramId] = useState(null)

    useEffect(() => {
        SporterService.getSporterByUserId(getUserIdFromJWT())
            .then((res) => {
                console.log(res)
                setWorkoutProgramId(res.workoutProgram.id)
            }).catch((e) => console.log('sporter not found'))
    }, [values])

    useEffect(() => {
        WorkoutSessionService.getWorkoutSessionsByWorkoutProgram(workoutProgramId)
            .then((res) => {
                console.log(res)
                setWorkoutSessions([...res])
            }).catch((e) => console.log('sessions not found'))

    }, [workoutProgramId])



    useEffect(() => {
        WorkoutSessionService.getWorkoutSessionsByFree()
            .then((res) => {
                console.log(res)
                setFreeWorkoutSessions([...res])
            }).catch((e) => console.log('free sessions not found'))

    }, [workoutSessions])




    return (
        <div className="workouts">
            <SubTitle text="Yours trainer's workout programs" />
            <HorizontalContainer>
                {workoutSessions.map((workoutSession, id) => {
                    return <WorkoutCard key={id} workoutSession={workoutSession} />
                })
                }
            </HorizontalContainer>

            <SubTitle text="Free workout programs" />
            <HorizontalContainer>

            {freeWorkoutSessions.map((workoutSession, id) => {
                    return <WorkoutCard key={id} workoutSession={workoutSession} />
                })
                }
            </HorizontalContainer>
        </div>
    )
}

export default withRouter(WorkoutsPage)
