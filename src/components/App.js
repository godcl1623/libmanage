import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import Main from './Main/Main';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Find from './Auth/Find';
import Reset from './Auth/Reset';
import Progress from './Main/Progress';
import { sizes, flex, border } from '../styles';
import globalStyles from '../styles/global/globalStyles';

const App = () => (
  <div
    id="App"
  >
    <Global styles={css`${globalStyles({ sizes, flex, border })}`}/>
    <Router>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/main" exact component={ Main } />
        <Route path="/member/register" exact component={ Register } />
        <Route
          path="/member/find"
          exact
          component={ () => <Redirect to="/member/find/id" /> }
        />
        <Route path="/member/find/id" exact component={ () => <Find mode='id' /> } />
        <Route path="/member/find/pwd" exact component={ () => <Find mode='pwd' /> } />
        <Route path="/member/reset/:token" exact component={Reset} />
        <Route path="/api/progress" exact component={ Progress } />
        <Route path="/member/test" exact component={Reset} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </div>
);

export default App;