/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { hasher, salter } from '../../custom_modules/hasher';
import { encryptor } from '../../custom_modules/aeser';
import { sendTo } from '../../custom_modules/address';
import { flex, sizes, border } from '../../styles';
import { StyledLink, Button } from '../../styles/elementsPreset';
import { loginTop, hrStyle } from './module/styles/LoginStyles';
import { StyleSet } from '../../custom_modules/commonUtils';
import { useAppDispatch, useAppSelector, setLoginStat, setUserState, setLogoutClickStat, setCompareState } from '../../slices';

const loginException = (dispatch: Dispatch, navigate: NavigateFunction) => {
  const formData = {
    mode: 'guest'
  };
  axios
    .post(
      `https://${sendTo}/login_process`,
      { sofo: encryptor(formData, process.env.REACT_APP_TRACER as string) },
      { withCredentials: true }
    )
    .then(res => {
      dispatch(setLoginStat(true));
      dispatch(setUserState(res.data));
      localStorage.setItem('frog', encryptor(JSON.stringify(res.data), process.env.REACT_APP_TRACER as string));
      const dummy = 'O97cS0DlIfqGXGHDHwC7g44mWmCBOwkgErCSqtEHmN9OwOzImNqhObvaSmuUAGcUmaQgiN0P6jF32YY4Cm3V9TcBRfJGYEstFPz6P5akr0qeXPrIPJKlsCIGP2l1CvD4MaKkS8mWr7oHTCJDI3KqywGEvmkx7Tn4'
      localStorage.setItem('flies', encryptor(hasher(dummy), process.env.REACT_APP_TRACER as string));
      alert('현재 게스트로 로그인했습니다.\n데이터 보존을 위해 회원으로 로그인해 주세요.');
      navigate('/main');
    })
    .catch(err => alert(err));
};

const Login = () => {
  const loginStatus = useAppSelector(state => state.sliceReducers.loginStatus);
  const userState = useAppSelector(state => state.sliceReducers.userState);
  const logoutClicked = useAppSelector(state => state.sliceReducers.logoutClicked);
  const comparisonState = useAppSelector(state => state.sliceReducers.comparisonState);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const abortCon = new AbortController();
    const message = {
      comparisonState,
      million: localStorage.getItem('frog')
    }
    axios
      .post(
        `https://${sendTo}/check_login`,
        { message },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.isLoginSuccessful) {
          if (!res.data.isGueset) {
            appDispatch(setLoginStat(res.data.isLoginSuccessful));
            navigate('/main');
            if (userState.nickname === undefined) {
              appDispatch(setUserState(res.data));
            } else {
              appDispatch(setLoginStat(res.data.isLoginSuccessful));
              navigate('/main');
              if (userState.nickname === undefined) {
                appDispatch(setUserState(res.data));
              }
            }
          }
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
      appDispatch(setLogoutClickStat(false));
    }
    if (comparisonState !== '') {
      appDispatch(setCompareState(''));
    }
    return () => {
      abortCon.abort();
    }
  }, []);

  if (loginStatus) {
    return <></>;
  }

  if (!navigator.onLine) {
    console.log('current connection is offline')
  }

  return (
    <article
      id="login"
      css={css`
        ${loginTop({ sizes, flex, border } as StyleSet)}
      `}
    >
      <h1>libmanage</h1>
      <form
        id="login-form"
        onSubmit={e => {
          e.preventDefault();
          const formData = {
            ID: '',
            PWD: ''
          };
          if (e.currentTarget.ID.value !== '' && e.currentTarget.PWD.value !== '') {
            formData.ID = e.currentTarget.ID.value;
            formData.PWD = salter(hasher(e.currentTarget.PWD.value));
          }
          axios
            .post(
              `https://${sendTo}/login_process`,
              { sofo: encryptor(formData, process.env.REACT_APP_TRACER as string) },
              { withCredentials: true }
            )
            .then(res => {
              if (res.data.isLoginSuccessful && !res.data.isGuest) {
                appDispatch(setLoginStat(res.data.isLoginSuccessful));
                appDispatch(setUserState(res.data));
                localStorage.setItem('frog', encryptor(JSON.stringify(res.data), process.env.REACT_APP_TRACER as string));
                const dummy = 'O97cS0DlIfqGXGHDHwC7g44mWmCBOwkgErCSqtEHmN9OwOzImNqhObvaSmuUAGcUmaQgiN0P6jF32YY4Cm3V9TcBRfJGYEstFPz6P5akr0qeXPrIPJKlsCIGP2l1CvD4MaKkS8mWr7oHTCJDI3KqywGEvmkx7Tn4'
                localStorage.setItem('flies', encryptor(hasher(dummy), process.env.REACT_APP_TRACER as string));
                alert(`${res.data.nickname}님, 로그인에 성공했습니다.`);
                navigate('/main');
              } else {
                alert(res.data);
              }
            })
            .catch(err => alert(err));
        }}
      >
        <input className="input-id" type="text" name="ID" placeholder="User ID"/>
        <input className="input-pwd" type="password" name="PWD" placeholder="Password" />
        <Button type="submit" name="login">
          LOGIN
        </Button>
      </form>
      <hr
        css={css`
          ${hrStyle}
        `}
      />
      <div className="option man-member">
        <StyledLink to="/member/register">회원가입</StyledLink>
        <StyledLink to="/member/find">ID/PW 찾기</StyledLink>
      </div>
      <div className="option other">
        <Button onClick={() => loginException(appDispatch, navigate)}>게스트 로그인</Button>
        <Button onClick={() => navigate('/offline')}>오프라인으로 접속</Button>
      </div>
    </article>
  );
};

export default Login;
