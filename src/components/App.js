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
import { sizes, flex } from '../styles';

const App = () => (
  <div
    id="App"
  >
    <Global
      styles={css`
      :root {
        @media (orientation: landscape) {
          /* margin, padding sizes */
          --gap-multiply-big: 1.302vw;
          --gap-multiply-small: 0.26vw;
          --gap-standard: 1.042vw;
          /* border-sizes */
          --border-rad-big: 0.521vw;
          --border-rad-normal: 0.365vw;
          /* font-sizes */
          --font-size-normal: 1.042vw;
          --font-size-standard: 0.833vw;
        }
        @media (orientation: portrait) {
          /* margin, padding sizes */
          --gap-multiply-big: ${1.302 * 1.778}vw;
          --gap-multiply-small: ${0.26 * 1.778}vw;
          --gap-standard: ${1.042 * 1.778}vw;
          /* border-sizes */
          --border-rad-big: ${0.521 * 1.778}vw;
          --border-rad-normal: ${0.365 * 1.778}vw;
          /* font-sizes */
          --font-size-normal: ${1.042 * 1.778}vw;
          --font-size-standard: ${0.833 * 1.778}vw;
        }
        /* colors */
        --btn-alert: #F26101;
        --btn-disable: #8AA8B0;
        --btn-active: #91BED4;
        --white: #FFFFFF;
        --grey-light: #DEDEDE;
        --grey-dark: #313732;
        --highlight-light: #D9E8F5;
        --graph: #304269;
      }

      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        color: var(--grey-dark);
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
          background: var(--highlight-light);
          z-index: 0;
        }

        @media (orientation: landscape) {
          h1 {
            // font-size: 60px;
            font-size: 3.125vw;
          }
  
          h2 {
            font-size: 1.25vw;
          }
  
          h3 {
            font-size: 0.99vw;
          }
  
          button, input, a {
            // border-radius: 7px;
            border-radius: 0.365vw;
            font-size: 1.042vw;
          }
  
          button {
            border: none;
            // box-shadow: 0 0 2px 1px var(--grey-dark);
            box-shadow: 0 0 0.104vw 0.052vw var(--grey-dark);
            background: var(--highlight-light);
            color: var(--grey-dark);
            cursor: pointer;
          }
        }

        @media (orientation: portrait) {
          h1 {
            // font-size: 60px;
            font-size: ${3.125 * 1.778}vw;
          }
  
          h2 {
            font-size: ${1.25 * 1.778}vw;
          }
  
          h3 {
            font-size: ${0.99 * 1.778}vw;
          }
  
          button, input, a {
            // border-radius: 7px;
            border-radius: ${0.365 * 1.778}vw;
            font-size: ${1.042 * 1.778}vw;
          }
  
          button {
            border: none;
            // box-shadow: 0 0 2px 1px var(--grey-dark);
            box-shadow: 0 0 ${0.104 * 1.778}vw ${0.052 * 1.778}vw var(--grey-dark);
            background: var(--highlight-light);
            color: var(--grey-dark);
            cursor: pointer;
          }  
        }

        input {
          padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
          background: var(--white);
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
        <Route path="/member/test" exact component={Reset} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </div>
);

export default App;