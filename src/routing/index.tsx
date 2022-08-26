import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import Find from 'pages/Auth/Find';
import Reset from 'pages/Auth/Reset';
import Progress from 'components/Progress';
import Main from 'pages/Main';
import OfflineWrapper from '../pages/Main/components/Wrappers/OfflineWrapper';
import MainContents from '../pages/Main/components/MainContents';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ navigator.onLine ? <Login /> : <Main /> } />
        <Route path="/offline" element={ <OfflineWrapper Contents={ MainContents } /> } />
        <Route path="/main" element={ <Main /> } />
        <Route path="/member/register" element={ <Register /> } />
        <Route
          path="/member/find"
          element={ <Navigate replace to="/member/find/id" /> }
        />
        <Route path="/member/find/id" element={ <Find mode='id' /> } />
        <Route path="/member/find/pwd" element={ <Find mode='pwd' /> } />
        <Route path="/member/reset/:token" element={<Reset />} />
        <Route path="/api/progress" element={ <Progress /> } />
        <Route path="/member/test" element={<Reset />} />
        <Route element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
