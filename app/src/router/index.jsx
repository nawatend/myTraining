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
                <Route exact path="/" component={HomePage} />
                <Route exact path="/exercisedetail/:exerciseId" component={ExerciseDetailPage} />

                <Route exact path="/today" component={TodayExercisesPage} />
                <Route exact path="/workouts" component={WorkoutsPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/profile" component={ProfilePage} />
            </Switch>
        </Router>
    )
}

export default router