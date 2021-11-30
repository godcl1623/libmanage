/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

const loginException = (dispatch, history) => {
  const formData = {
    mode: 'guest'
  };
  axios
    .post(
      'http://localhost:3001/login_process',
      // `https://${sendTo}/login_process`,
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
    const message = {
      comparisonState,
      million: localStorage.getItem('frog')
    }
    axios
      .post(
        'http://localhost:3001/check_login',
        // `https://${sendTo}/check_login`,
        { message },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.isLoginSuccessful) {
          if (!res.data.isGueset) {
            dispatch(loginStatusCreator(res.data.isLoginSuccessful));
            history.push('/main');
            if (userState.nickname === undefined) {
              dispatch(userStateCreator(res.data));
            } else {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              history.push('/main');
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

  return (
    <article
      id="login"
      css={css`
        margin: var(--gap-standard) 0;
        padding: calc(var(--gap-standard) + 2.604vw);
        border-radius: var(--border-rad-big);
        ${flex.vertical}
        width: 30vw;
        height: -webkit-max-content;
        height: -moz-max-content;
        height: max-content;
        background: white;
        box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);
        
        h1 {
          margin-bottom: calc(var(--gap-multiply-big) * 3);
        }
        
        button {
          background: var(--btn-active);
          color: var(--grey-dark);
        }
        
        #login-form, hr {
          margin-bottom: calc(var(--gap-multiply-big) * 2);
        }
        
        #login-form {
          ${sizes.free('100%')}
          ${flex.vertical}
        }
        
        #login-form * {
          margin: 0.833vw;
        }
        
        #login-form input {
          ${border}
          ${sizes.free('100%', '1.823vw')}
        }
        
        #login-form input:first-of-type {
          margin-top: 0;
        }
        
        #login-form button {
          margin-bottom: 0;
          height: 2.604vw;
        }
        
        .option {
          margin: var(--gap-multiply-big);
          ${flex.horizontal}
          justify-content: space-around;
          ${sizes.free('100%', '2.604vw')}
          
          button, a {
            height: 2.604vw;
          }
          
          a {
            background: var(--btn-active);
            box-shadow: 0 0 0.104vw 0.052vw var(--grey-dark);
            color: var(--grey-dark);
          }
        }
        
        .option:first-of-type {
          margin-top: 0;
        }
        
        .option a:first-of-type {
          margin-right: var(--gap-multiply-small);
        }
        
        .option a:last-of-type {
          margin-left: var(--gap-multiply-small);
        }
        
        .option button:first-of-type {
          margin-right: var(--gap-multiply-small);
        }
        
        .option button:last-of-type {
          margin-left: var(--gap-multiply-small);
        }
        
        @media (orientation: portrait) {
          @media (min-width: 600px) {
            width: ${30 * 1.778}vw;
            box-shadow: 0 0 ${0.521 * 1.778}vw ${0.052 * 1.778}vw var(--grey-dark);
  
            #login-form * {
              margin: ${0.833 * 1.778}vw;
            }
  
            #login-form input {
              ${sizes.free('100%', `${1.823 * 1.778}vw`)}
            }
  
            #login-form button {
              height: ${2.604 * 1.778}vw;
            }
  
            .option {
              ${sizes.free('100%', `${2.604 * 1.778}vw`)}
              
              button, a {
                height: ${2.604 * 1.778}vw;
              }
              
              a {
                box-shadow: 0 0 ${0.104 * 1.778}vw ${0.052 * 1.778}vw var(--grey-dark);
              }
            }
          }

          @media (orientation: portrait) and (max-width: 599px) {
            margin: 0;
            padding: calc(var(--gap-standard));
            border-radius: 0;
            ${flex.vertical}
            ${sizes.full}

            h1 {
              margin-bottom: calc(var(--gap-multiply-big) * 3);
            }

            #login-form, hr {
              margin-bottom: calc(var(--gap-multiply-big) * 2);
            }

            #login-form * {
              margin: 8px;
            }
            
            #login-form input {
              ${sizes.free('100%', '30px')}
            }

            #login-form button {
              height: 25px;
            }
            
            .option {
              ${sizes.free('100%', '30px')}
              
              button, a {
                height: 30px;
              }
              
              a {
                box-shadow: 0 0 2px 1px var(--grey-dark);
              }
            }
          }
        }
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
          if (e.target.ID.value !== '' && e.target.PWD.value !== '') {
            formData.ID = e.target.ID.value;
            formData.PWD = salter(hasher(e.target.PWD.value));
          }
          axios
            .post(
              'http://localhost:3001/login_process',
              // `https://${sendTo}/login_process`,
              { sofo: encryptor(formData, process.env.REACT_APP_TRACER) },
              { withCredentials: true }
            )
            .then(res => {
              if (res.data.isLoginSuccessful && !res.data.isGuest) {
                dispatch(loginStatusCreator(res.data.isLoginSuccessful));
                dispatch(userStateCreator(res.data));
                localStorage.setItem('frog', encryptor(JSON.stringify(res.data), process.env.REACT_APP_TRACER));
                localStorage.setItem('flies', encryptor(hasher('pond plops'), process.env.REACT_APP_TRACER));
                alert(`${res.data.nickname}님, 로그인에 성공했습니다.`);
                history.push('/main');
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
          width: 100%;
          border: 1px solid black;
        `}
      />
      <div className="option man-member">
        <StyledLink to="/member/register">회원가입</StyledLink>
        <StyledLink to="/member/find">ID/PW 찾기</StyledLink>
      </div>
      <div className="option other">
        <Button onClick={() => loginException(dispatch, history)}>게스트 로그인</Button>
        <Button>오프라인으로 접속</Button>
      </div>
    </article>
  );
};

export default Login;
