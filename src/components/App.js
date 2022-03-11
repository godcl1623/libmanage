import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import OfflineWrapper from './Main/utils/Main/NetworkStatus/OfflineWrapper';
import MainContents from './Main/utils/Main/MainContents';

const App = () => (
  <div
    id="App"
  >
    <Global styles={css`${globalStyles({ sizes, flex, border })}`}/>
    <Router>
      <Routes>
        <Route path="/" element={ navigator.onLine ? <Login /> : <Main /> } />
        <Route path="/offline" element={ () => <OfflineWrapper Contents={ MainContents } /> } />
        <Route path="/main" element={ Main } />
        <Route path="/member/register" element={ Register } />
        <Route
          path="/member/find"
          element={ <Navigate replace to="/member/find/id" /> }
        />
        <Route path="/member/find/id" element={ () => <Find mode='id' /> } />
        <Route path="/member/find/pwd" element={ () => <Find mode='pwd' /> } />
        <Route path="/member/reset/:token" element={<Reset />} />
        <Route path="/api/progress" element={ <Progress /> } />
        <Route path="/member/test" element={<Reset />} />
        <Route element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  </div>
);

export default App;