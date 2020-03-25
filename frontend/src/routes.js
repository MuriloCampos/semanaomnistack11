import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/cadastro" component={SignUp} />

        <Route path="/perfil" component={Profile} />
        <Route path="/casos/novo" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}
