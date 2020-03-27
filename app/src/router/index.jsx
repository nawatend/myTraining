import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from '../pages/index'
import ExerciseDetailPage from '../pages/ExerciseDetailPage'
import ProfilePage from '../pages/ProfilePage'
import ProgressPage from '../pages/ProgressPage'
import TodayExercisesPage from '../pages/TodayExercisesPage'
import WorkoutsPage from '../pages/WorkoutsPage'
let router = () => {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={HomePage} title={"Today!"} />
                <Route exact path="/exercisedetail/:exerciseId" component={ExerciseDetailPage} title={"Today!"} />

                <Route exact path="/today/:workoutsessionId" component={TodayExercisesPage} title={"Today!"} />
                <Route exact path="/workouts" component={WorkoutsPage} title={"Today!"} />
                <Route exact path="/progress" component={ProgressPage} title={"Today!"} />
                <Route exact path="/profile" component={ProfilePage} title={"Today!"} />
            </Switch>
        </Router>
    )
}

export default router