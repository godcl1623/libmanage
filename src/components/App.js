import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import Main from './Main/Main';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Find from './Auth/Find';
import Reset from './Auth/Reset';
import Progress from './Progress';
import '../styles/temp.css';
import { sizes, flex } from '../styles';

const App = () => (
  <div
    id="App"
  >
    <Global
      styles={css`
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          // border: 1px solid black;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }

        html {
          ${sizes.full}
          position: relative;
        }

        body, #root {
          ${sizes.full}
        }

        #App {
          ${flex.vertical}
          ${sizes.full}
        }

        h1 {
          font-size: 60px;
        }
      `}
    />
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
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </div>
);

export default App;