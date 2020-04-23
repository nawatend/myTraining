import React, { useEffect, useState } from 'react'
import BaseLayout from '../layouts/base';


import Button from '../components/Button'
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
    const [finishedWSs, setFinishedWSs] = useState([])
    const [unfinishedWSs, setUnfinishedWSs] = useState([])
    const [reset, setReset] = useState(false)

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

    }, [workoutProgramId, reset])


    useEffect(() => {

        let unfinished = workoutSessions.filter((ws) => {
            return ws.done === false
        })

        let finished = workoutSessions.filter((ws) => {
            return ws.done === true
        })
        console.log(unfinished)
        setUnfinishedWSs(unfinished)
        setFinishedWSs(finished)
    }, [workoutSessions])

    let resetWSs = () => {

        workoutSessions.forEach(ws => {

            WorkoutSessionService.setDone({ workoutSessionId: ws.id, done: false })
                .then((res) => {
                    setReset(true)
                })
        })


    }

    return (
        <div className="home">

            <SubTitle text="Choose today's session" />

            {(unfinishedWSs.length === 0) ? (

                <div className="reset">
                    <div className="reset__text"> "You have all of the sessions, please reset"
                        </div>
                    <Button onClick={() => { resetWSs() }} text="RESET" />
                </div>
            )
                :
                (
                    <HorizontalContainer>
                        {unfinishedWSs.map((workoutSession, id) => {
                            return <WorkoutCard key={id} workoutSession={workoutSession} />
                        })}
                    </HorizontalContainer>
                )
            }




            <SubTitle text="Completed sessions" />
            <HorizontalContainer>
                {finishedWSs.map((workoutSession, id) => {
                    return <WorkoutCard key={id} workoutSession={workoutSession} />
                })
                }
            </HorizontalContainer>
        </div>
    )

}

export default withRouter(HomePage)