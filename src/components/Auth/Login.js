/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  loginStatusCreator,
  userStateCreator,
  logoutClickedCreator,
  comparisonStateCreator
} from '../../actions';
import { hasher, salter } from '../../custom_modules/hasher';
import { encryptor } from '../../custom_modules/aeser';
import { sendTo } from '../../custom_modules/address';

const loginException = (dispatch, history) => {
  const formData = {
    mode: 'guest'
  };
  axios
    .post(
      // 'http://localhost:3002/login_process',
      // 'http://localhost:3001/login_process',
      `https://${sendTo}/login_process`,
      { sofo: encryptor(formData, process.env.REACT_APP_TRACER) },
      { withCredentials: true }
    )
    .then(res => {
      // 임시로 작성
      dispatch(loginStatusCreator(true));
      dispatch(userStateCreator(res.data));
      alert('현재 게스트로 로그인했습니다.\n데이터 보존을 위해 회원으로 로그인해 주세요.');
      history.push('/main');
    })
    .catch(err => alert(err));
};

const Login = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const userState = useSelector(state => state.userState);
  const logoutClicked = useSelector(state => state.logoutClicked);
  const comparisonState = useSelector(state => state.comparisonState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const abortCon = new AbortController();
    axios
      .post(
        // 'http://localhost:3002/check_login',
        // 'http://localhost:3001/check_login',
        `https://${sendTo}/check_login`,
        { message: comparisonState },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.isLoginSuccessful) {
          dispatch(loginStatusCreator(res.data.isLoginSuccessful));
          history.push('/main');
          if (userState.nickname === undefined) {
            dispatch(userStateCreator(res.data));
          }
        } else if (res.data.isGuest) {
          // 임시로 작성
          dispatch(loginStatusCreator(res.data.isLoginSuccessful));
          history.push('/main');
          if (userState.nickname === undefined) {
            dispatch(userStateCreator(res.data));
          }
        } else if (res.data.isLoginSuccessful === false) {
          // alert(res.data);
        }
      })
      .catch(err => alert(err));
      return () => {
        abortCon.abort();
      }
  }, []);

  useEffect(() => {
    const abortCon = new AbortController();
    if (logoutClicked) {
      dispatch(logoutClickedCreator(false));
    }
    if (comparisonState !== '') {
      dispatch(comparisonStateCreator(''));
    }
    return () => {
      abortCon.abort();
    }
  }, []);

  if (loginStatus) {
    return <></>;
  }

  return (
    <article
      id="login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <h2>libmanage</h2>
      <form
        // action="/test"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center'
        }}
        onSubmit={e => {
          e.preventDefault();
          const formData = {
            ID: '',
            PWD: ''
          };
          if (e.target.ID.value !== '' && e.target.PWD.value !== '') {
            formData.ID = e.target.ID.value;
            formData.PWD = salter(hasher(e.target.PWD.value));
          }
          axios
            .post(
              // 'http://localhost:3002/login_process',
              // 'http://localhost:3001/login_process',
              `https://${sendTo}/login_process`,
              { sofo: encryptor(formData, process.env.REACT_APP_TRACER) },
              { withCredentials: true }
            )
            .then(res => {
              if (res.data.isLoginSuccessful && !res.data.isGuest) {
                dispatch(loginStatusCreator(res.data.isLoginSuccessful));
                dispatch(userStateCreator(res.data));
                alert(`${res.data.nickname}님, 로그인에 성공했습니다.`);
                history.push('/main');
              } else {
                alert(res.data);
              }
            })
            .catch(err => alert(err));
        }}
      >
        <label htmlFor="ID">ID: </label>
        <input type="text" name="ID" />
        <label htmlFor="PWD">PW: </label>
        <input type="password" name="PWD" />
        <button type="submit" name="login">
          LOGIN
        </button>
      </form>
      <div className="member">
        <Link to="/member/register">회원가입</Link>
        <Link to="/member/find">ID/PW 찾기</Link>
      </div>
      <button onClick={() => loginException(dispatch, history)}>게스트 로그인</button>
      <button>오프라인으로 접속</button>
    </article>
  );
};

export default Login;
