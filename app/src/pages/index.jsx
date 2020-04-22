import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';



import WorkoutCard from '../components/WorkoutCard'
import ExerciseCard from '../components/ExerciseCard'
import HorizontalContainer from '../components/HorizontalContainer'
import { Paper, List } from '@material-ui/core'
import Timer from '../components/Timer'
import Bars from '../components/Bars'
import { Title, SubTitle } from '../components/texts'
import { withRouter } from 'react-router-dom';
//api
import { SporterService, WorkoutSessionService } from '../api'
import { getUserIdFromJWT } from '../utils/jwt'

let HomePage = (props) => {


    const [sporter, setSporter] = useState()
    const [values, setValues] = useState({})
    const [workoutSessions, setWorkoutSessions] = useState([])
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

    return (
        <div className="home">

            <SubTitle text="Choose today's session" />
            <HorizontalContainer>

                {workoutSessions.map((workoutSession,id) => {
                    return <WorkoutCard key={id} workoutSession={workoutSession} />
                })
                }

            </HorizontalContainer>

            <SubTitle text="Completed sessions" />
            <HorizontalContainer>
                
            </HorizontalContainer>
        </div>
    )

}

export default withRouter(HomePage)