import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavigateFunction } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../custom_modules/address';
import { flex, sizes } from '../../styles';
import progressStyles from './styles/progressStyles';
import { StyleSet } from '../../custom_modules/commonUtils';
// 테스트
import { useAppDispatch, useAppSelector, setCompareState } from '../../slices';

const Progress = () => {
  const comparisonState = useAppSelector(state => state.sliceReducers.comparisonState);
  const [count, setCount] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('1');
  const [userInfo, setUserInfo] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [maxApiCall, setMaxApiCall] = useState<number>(0);
  const [currApiCall, setCurrApiCall] = useState<string | number>('');
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const abortCon = new AbortController();
  const additionalString = `(${(currApiCall as number) + 1}회차 / 전체 ${maxApiCall}회)`;
  const forceAbort = (aborter: AbortController, navigate: NavigateFunction) => setTimeout(() => {
    aborter.abort();
    navigate('/main');
  }, 30000);
  // 타입 확인 필요
  const statusText = (status: string, addStr: string) => {
    switch (status) {
      case '1':
        return `보유 중인 라이브러리를 IGDB 서비스에 검색 중입니다.`;
      case '2':
        return `누락된 항목을 IGDB 서비스에 재검색 중입니다. ${addStr}`;
      case '3':
        return `IGDB 서비스로부터 메타데이터를 수신하는 중입니다. ${addStr}`;
      case '4':
        return `수신한 메타데이터를 가공하는 중입니다. ${addStr}`;
      case '5':
        return `메타데이터의 저장이 완료됐습니다.`;
      default:
        return `오류가 발생했습니다.`;
    }
  };
  useEffect(() => {
    const message = {
      comparisonState,
      million: localStorage.getItem('frog')
    };
    const timer = forceAbort(abortCon, navigate);
    axios
      .post('http://localhost:3003/check_login', { message }, { withCredentials: true })
      // .post(`https://${sendTo}/check_login`, { message }, { withCredentials: true })
      .then(res => {
        const reqUserInfo = res.data;
        clearTimeout(timer);
        setUserInfo(reqUserInfo);
      })
      .catch(err => console.log('err occured', err));
    return () => abortCon.abort();
  }, []);
  useEffect(() => {
    if (userInfo !== '') {
      const timer = forceAbort(abortCon, navigate);
      axios
        .get('http://localhost:3003/storeLib', { withCredentials: true })
        // .get(`https://${sendTo}/storeLib`, { withCredentials: true })
        .then(res => {
          clearTimeout(timer);
          setApiKey(res.data.apiKey);
          setMaxApiCall(Math.ceil(res.data.maxGames/25));
          setCurrApiCall(0);
        })
        .catch(err => console.log(err));
    }
    return () => abortCon.abort();
  }, [userInfo]);
  useEffect(() => {
    if (currApiCall !== '' && currApiCall !== 'done') {
      const pack = {
        apiCred: apiKey,
        maxApiCall,
        currApiCall,
        userInfo
      }
      const timer = forceAbort(abortCon, navigate);
      axios
        .post('http://localhost:3003/meta/search', { pack }, { withCredentials: true })
        // .post(`https://${sendTo}/meta/search`, { pack }, { withCredentials: true })
        .then(res => {
          clearTimeout(timer);
          if (res.data === 'done') {
            setCurrApiCall('done');
          } else {
            setCurrApiCall(currApiCall => (currApiCall as number) + Number(res.data));
          }
        })
        .catch(err => console.log(err));
    }
      return () => abortCon.abort();
  }, [currApiCall]);
  useEffect(() => {
    if (currApiCall === 'done') {
      const timer = forceAbort(abortCon, navigate);
      axios
        .post('http://localhost:3003/api/search', { reqUserInfo: userInfo }, { withCredentials: true })
        // .post(`https://${sendTo}/api/search`, { reqUserInfo: userInfo }, { withCredentials: true })
        .then(res => {
          if (res.data.result) {
            clearTimeout(timer);
            appDispatch(setCompareState(res.data.newInfo));
            setTimeout(() => navigate('/main'), 1500);
          }
        })
        .catch(err => console.log(err));
    }
    return () => abortCon.abort();
  }, [currApiCall]);
  useEffect(() => {
    const requestStatus = setInterval(() => {
      axios.post('http://localhost:3003/stat/track', {}, { withCredentials: true }).then(res => {
      // axios.post(`https://${sendTo}/stat/track`, {}, { withCredentials: true }).then(res => {
        if (res.data.status === status) {
          setCount(res.data.count);
          setTotal(res.data.total);
        } else {
          setCount(res.data.count);
          setTotal(res.data.total);
          setStatus(res.data.status);
        }
        if (status === '5') {
          clearInterval(requestStatus);
        }
      });
    }, 1000);
    return () => {
      clearInterval(requestStatus);
      abortCon.abort();
    };
  }, [count]);
  return (
    <article
      css={css`${progressStyles({ flex, sizes } as StyleSet)}`}
    >
      <div className="contents-wrapper">
        <h1>Progress</h1>
        <p>{`${statusText(status, additionalString)} (${count}/${total})`}</p>
      </div>
    </article>
  );
};

export default Progress;
