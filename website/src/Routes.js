import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  WorkoutSessionsList as WorkoutSessionsListView,
  UserList as UserListView,
  //Typography as TypographyView,
  //Icons as IconsView,
  Account as AccountView,
  //Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  //NotFound as NotFoundView

  ExerciseEdit as ExerciseEditView,
  WorkoutSessionEdit as WorkoutSessionEditView,
  WorkoutProgramEdit as WorkoutProgramEditView
} from './pages';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/sporters"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/feedbacks"
      />
      <RouteWithLayout
        component={WorkoutSessionsListView}
        exact
        layout={MainLayout}
        path="/workoutsessions"
      />
<RouteWithLayout
        component={WorkoutSessionEditView}
        exact
        layout={MainLayout}
        path="/workoutsession/create"
      />

      {/* exercises pages */}
      <RouteWithLayout
        component={WorkoutSessionsListView}
        exact
        layout={MainLayout}
        path="/exercises"
      />
      <RouteWithLayout
        component={ExerciseEditView}
        exact
        layout={MainLayout}
        path="/exercises/:id"
      />

<RouteWithLayout
        component={WorkoutSessionsListView}
        exact
        layout={MainLayout}
        path="/workoutprograms"
      />
<RouteWithLayout
        component={WorkoutProgramEditView}
        exact
        layout={MainLayout}
        path="/workoutprogram/create"
      />

      {/* <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      /> */}
      {/* <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      /> */}
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      {/* <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      /> */}
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      {/* <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      /> */}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
