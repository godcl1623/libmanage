/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  loginStatusCreator,
  userStateCreator,
  logoutClickedCreator,
  comparisonStateCreator
} from '../../actions';
import { hasher, salter } from '../../custom_modules/hasher';
import { encryptor } from '../../custom_modules/aeser';
import { sendTo } from '../../custom_modules/address';
import { flex, sizes, border } from '../../styles';
import { StyledLink, Button } from '../../styles/elementsPreset';
import { loginTop, hrStyle } from './module/styles/LoginStyles';
import { RootState } from '../../reducers';
import { StyleSet } from '../../custom_modules/commonUtils';

const MemoedLink = memo(StyledLink);
const MemoedBtn = memo(Button);

// 타입 확인 필요
const loginException = (dispatch: Dispatch, navigate: NavigateFunction) => {
  const formData = {
    mode: 'guest'
  };
  axios
    .post(
      'http://localhost:3003/login_process',
      // `https://${sendTo}/login_process`,
      { sofo: encryptor(formData, process.env.REACT_APP_TRACER as string) },
      { withCredentials: true }
    )
    .then(res => {
      // 임시로 작성
      dispatch(loginStatusCreator(true));
      dispatch(userStateCreator(res.data));
      localStorage.setItem('frog', encryptor(JSON.stringify(res.data), process.env.REACT_APP_TRACER as string));
      localStorage.setItem('flies', encryptor(hasher('pond plops'), process.env.REACT_APP_TRACER as string));
      alert('현재 게스트로 로그인했습니다.\n데이터 보존을 위해 회원으로 로그인해 주세요.');
      navigate('/main');
    })
    .catch(err => alert(err));
};

const Login = () => {
  const loginStatus = useSelector((state: RootState) => state.loginStatus);
  const userState = useSelector((state: RootState) => state.userState);
  const logoutClicked = useSelector((state: RootState) => state.logoutClicked);
  const comparisonState = useSelector((state: RootState) => state.comparisonState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const test = {
    currentItemCategory: {
      level0: ['test0'],
      level1: ['test1']
    }
  };
  // const [ dragRef ] = cloneDnd.useDragClone(test);
  useEffect(() => {
    const abortCon = new AbortController();
    const message = {
      comparisonState,
      million: localStorage.getItem('frog')
    }
    axios
      .post(
        'http://localhost:3003/check_login',
        // `https://${sendTo}/check_login`,
        { message },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.isLoginSuccessful) {
          if (!res.data.isGueset) {
            dispatch(loginStatusCreator(res.data.isLoginSuccessful));
            navigate('/main');
            if (userState.nickname === undefined) {
              dispatch(userStateCreator(res.data));
            } else {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              navigate('/main');
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
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

  if (!navigator.onLine) {
    console.log('foo')
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
          // 작동 확인 필요
          if (e.currentTarget.ID.value !== '' && e.currentTarget.PWD.value !== '') {
            formData.ID = e.currentTarget.ID.value;
            formData.PWD = salter(hasher(e.currentTarget.PWD.value));
          }
          axios
            .post(
              'http://localhost:3003/login_process',
              // `https://${sendTo}/login_process`,
              { sofo: encryptor(formData, process.env.REACT_APP_TRACER as string) },
              { withCredentials: true }
            )
            .then(res => {
              if (res.data.isLoginSuccessful && !res.data.isGuest) {
                dispatch(loginStatusCreator(res.data.isLoginSuccessful));
                dispatch(userStateCreator(res.data));
                localStorage.setItem('frog', encryptor(JSON.stringify(res.data), process.env.REACT_APP_TRACER as string));
                localStorage.setItem('flies', encryptor(hasher('pond plops'), process.env.REACT_APP_TRACER as string));
                alert(`${res.data.nickname}님, 로그인에 성공했습니다.`);
                navigate('/main');
              } else {
                alert(res.data);
              }
            })
            .catch(err => alert(err));
        }}
      >
        {/* <label htmlFor="ID">ID: </label> */}
        <input className="input-id" type="text" name="ID" placeholder="User ID"/>
        {/* <label htmlFor="PWD">PW: </label> */}
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
        <Button onClick={() => loginException(dispatch, navigate)}>게스트 로그인</Button>
        <Button onClick={() => navigate('/offline')}>오프라인으로 접속</Button>
      </div>
    </article>
  );
};

export default Login;
