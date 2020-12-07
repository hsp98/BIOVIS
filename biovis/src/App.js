import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './auth/login';
import SignUp from './auth/signup';
import BuySell from './buysell/buysell';
import Admin from './admin/admin';
import AdminLogin from './auth/adminLogin';
import Payment from './buysell/payment';

const PrivateRoute = (path) => {
  console.log(localStorage.getItem('loggedIn'));
  return (
    <Route path={path}>
      {localStorage.getItem('loggedIn') === 'true' ? <BuySell /> : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  );
};

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <PrivateRoute path="/buysell" />
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/adminLogin">
            <AdminLogin />
          </Route>
          <Route path="/">
            <Redirect to={{ pathname: '/login' }} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
