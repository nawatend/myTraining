import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from '../pages/index'
import ExerciseDetailPage from '../pages/ExerciseDetailPage'
import ProfilePage from '../pages/ProfilePage'
import ProgressPage from '../pages/ProgressPage'
import TodayExercisesPage from '../pages/TodayExercisesPage'
import WorkoutsPage from '../pages/WorkoutsPage'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register';

import BaseLayout from '../layouts/base';
import { default as RouteWithLayout } from '../components/RouteWithLayout';

let router = () => {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/auth/login" component={LoginPage} />
                <Route exact path="/auth/register" component={RegisterPage} />
                <RouteWithLayout path="/" component={HomePage} exact layout={BaseLayout} />
                <RouteWithLayout exact layout={BaseLayout} path="/exercisedetail/:exerciseId" component={ExerciseDetailPage} />

                <RouteWithLayout exact layout={BaseLayout} path="/today/:workoutsessionId" component={TodayExercisesPage} />
                <RouteWithLayout exact layout={BaseLayout} path="/workouts" component={WorkoutsPage} />
                <RouteWithLayout exact layout={BaseLayout} path="/progress" component={ProgressPage} />
                <RouteWithLayout exact layout={BaseLayout} path="/profile" component={ProfilePage} />
            </Switch>
        </Router>
    )
}

export default router