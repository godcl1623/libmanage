/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
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
import { border, flex, sizes } from '../../styles';

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
    dispatch(setTokenState(false))
  }, [])

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
            ${sizes.full}
            height: max-content;
            ${flex.vertical}
          `}
        >
          <ChangePwd token={requestedToken} reqTime={now} />
        </div>
      );
    default:
      return(
        <div id="token-expired"
          css={css`
            border-radius: var(--border-rad-big);
            ${sizes.free('40%', '50%')}
            ${flex.vertical}
            background: white;
            box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);

            #to_home {
              margin-top: calc(var(--gap-multiply-big) * 4);
              ${flex.horizontal}
              font-size: calc(var(--font-size-normal) * 2);
              text-decoration: none;
              color: var(--grey-dark);

              :active {
                -webkit-transform: scale(0.98);
                    -ms-transform: scale(0.98);
                        transform: scale(0.98);
              }
            }

            @media (orientation: portrait) {
              ${sizes.free('70%', '35%')}
              box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);
            }
          `}
        >
          <h1>{errors(tokenState)}</h1>
          <a
            id="to_home"
            title="메인화면"
            href="https://godcl1623-libmanage.herokuapp.com"
          >
            <FaHome />
          </a>
        </div>
      );
  }
};

export default Reset;