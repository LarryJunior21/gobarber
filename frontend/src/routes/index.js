import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashBoard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={DashBoard} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}
