import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Balloon from '../Modal/Balloon';
import {
  loginStatusCreator,
  logoutClickedCreator,
  modalStateCreator,
  balloonStateCreator,
  balloonOriginCreator,
  userStateCreator,
  comparisonStateCreator,
  modalOriginCreator,
  _TESTCREATOR
} from '../../actions';
import { sendTo } from '../../custom_modules/address';

const Header = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const userState = useSelector(state => state.userState);
  const modalState = useSelector(state => state.modalState);
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const history = useHistory();
  const dispatch = useDispatch();

  const Options = () => (
    <>
      {/* <button
        style={{
          'width': '80%',
          'height': '50%'
        }}
        onClick={() => {
          if (!modalState) {
            dispatch(modalStateCreator(true))
          } else {
            dispatch(modalStateCreator(false))
          }
        }}
      >스토어 추가</button> */}
      <button
        style={{
          width: '80%',
          height: '50%'
        }}
        onClick={() => {
          dispatch(modalOriginCreator(''));
          if (!modalState) {
            dispatch(modalStateCreator(true));
            dispatch(balloonStateCreator('none'));
          } else {
            dispatch(modalStateCreator(false));
          }
        }}
      >
        라이브러리 추가
      </button>
    </>
  );

  const memberStatus =
    loginStatus === true ? (
      <button
        onClick={() => {
          const message = {
            reqMsg: 'logout',
            million: localStorage.getItem('frog')
          }
          axios
            .post(
              // 'http://localhost:3002/logout_process',
              // 'http://localhost:3001/logout_process',
              `https://${sendTo}/logout_process`,
              { message },
              { withCredentials: true }
            )
            .then(res => {
              dispatch(logoutClickedCreator(true));
              dispatch(userStateCreator(null));
              dispatch(comparisonStateCreator(''));
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              alert('로그아웃 했습니다.');
              history.push('/');
            })
            .catch(err => alert(err));
        }}
      >
        로그아웃
      </button>
    ) : (
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        로그인
      </button>
    );

  const wrapper = {
    display: balloonOrigin === 'Header' ? balloonState : 'none',
    position: 'absolute',
    top: '0',
    left: '0',
    // 'background': 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    zIndex: '1'
  };

  const style = {
    padding: '20px',
    display: balloonOrigin === 'Header' ? balloonState : 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '100px',
    position: 'absolute',
    top: '0',
    left: '200px',
    background: 'white',
    zIndex: 1
  };

  const hand = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    top: '0',
    left: '176px',
    transform: 'translate(-50%)',
    background: 'white',
    display: balloonOrigin === 'Header' ? balloonState : 'none'
  };

  return (
    <header
      id="header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        height: '30px',
        width: '100%'
      }}
    >
      <button
        onClick={() => {
          dispatch(balloonOriginCreator('Header'));
          if (balloonState === 'none') {
            dispatch(balloonStateCreator('flex'));
          } else if (balloonOrigin === 'Header') {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        옵션
      </button>
      <Balloon contents={<Options />} display={wrapper} style={style} hand={hand} />
      <form>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={e => {
            dispatch(_TESTCREATOR(e.target.value));
          }}
        />
        <button>검색</button>
        <button>검색옵션</button>
      </form>
      {/* <button>로그인</button> */}
      {userState.nickname}
      {memberStatus}
    </header>
  );
};

export default Header;
