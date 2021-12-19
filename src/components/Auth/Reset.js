/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, { useState, useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaHome } from "react-icons/fa";
import ChangePwd from './module/components/ChangePwd';
import { tokenStateCreator as setTokenState } from '../../actions';
import { encryptor } from '../../custom_modules/aeser';
import { sendTo } from '../../custom_modules/address';
import { flex, sizes } from '../../styles';
import { changePwdRoot, tokenExpired } from './module/styles/ResetStyles';

const MemoedIco = memo(FaHome);
const MemoedPwd = memo(ChangePwd);

const now = () => {
  const date = new Date();
  const year = date.getFullYear();
  const rawMonth = date.getMonth();
  const month = rawMonth + 1 < 10 ? `0${rawMonth + 1}` : rawMonth + 1;
  const rawDay = date.getDate();
  const day = rawDay < 10 ? `0${rawDay}` : rawDay;
  const rawHour = date.getHours();
  const hour = rawHour < 10 ? `0${rawHour}` : rawHour;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const Reset = () => {
  const [requestedToken, setRequestToken] = useState({});
  const tokenState = useSelector(state => state.tokenState);
  const dispatch = useDispatch();
  const history = useHistory();
  const tokenTail = history.location.pathname.slice(-7,);
  const requestedTime = now();

  useEffect(() => {
    const abortCon = new AbortController();
    const postData = {
      tokenTail,
      requestedTime
    }
    // axios.post('http://localhost:3001/member/reset', { postData: encryptor(postData, process.env.REACT_APP_TRACER) }, { withCredentials: true })
    axios.post(`https://${sendTo}/member/reset`, { postData: encryptor(postData, process.env.REACT_APP_TRACER) }, { withCredentials: true })
      .then(res => {
        dispatch(setTokenState(res.data.tokenState));
        setRequestToken(res.data.token);
      })
      .catch(err => alert(err));
    return () => abortCon.abort();
  }, []);

  const errors = tokenState => {
    switch(tokenState) {
      case false:
        return '요청이 만료되었습니다.';
      case 'no_token':
        return '요청이 존재하지 않습니다.';
      default:
        return '잘못된 접근입니다.';
    }
  }

  switch(tokenState) {
    case true:
      return (
        <div id="change-pwd"
          css={css`
            ${changePwdRoot({ sizes, flex })}
          `}
        >
          <MemoedPwd token={requestedToken} reqTime={now} />
        </div>
      );
    default:
      return(
        <div id="token-expired"
          css={css`
            ${tokenExpired({ sizes, flex })}
          `}
        >
          <h1>{errors(tokenState)}</h1>
          <a
            id="to_home"
            title="메인화면"
            href="https://godcl1623-libmanage.herokuapp.com"
          >
            <MemoedIco />
          </a>
        </div>
      );
  }
};

export default Reset;