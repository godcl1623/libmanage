import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import { sizes, flex, border } from '../../styles';

const Header = ({ headerRef, setHeight }) => {
  const loginStatus = useSelector(state => state.loginStatus);
  const userState = useSelector(state => state.userState);
  const modalState = useSelector(state => state.modalState);
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const [btnCoords, setBtnCoords] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const optionRef = useRef();
  const memberRef = useRef();
  const selectedBtn = useRef();
  const updateBtnCoords = (left, top) => {
    setBtnCoords(prevState => ({
      ...prevState,
      leftCoord: left,
      topCoord: top
    }));
  };

  useEffect(() => {
    setHeight(headerRef.current.getBoundingClientRect().height);
  }, []);

  const Options = () => (
    <>
      <button
        style={{
          width: '80%',
          height: '50%'
        }}
        onClick={() => {
          dispatch(modalOriginCreator(selectedBtn.current === optionRef.current ? 'Header_Option' : 'Header_MemInfo'));
          if (!modalState) {
            dispatch(modalStateCreator(true));
            dispatch(balloonStateCreator('none'));
          } else {
            dispatch(modalStateCreator(false));
          }
        }}
      >
        {selectedBtn.current === optionRef.current ? '라이브러리 추가' : '회원정보 관리'}
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
    zIndex: 2
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
    // top: '0',
    // left: '200px',
    top: `calc(${btnCoords.topCoord}px)`,
    left: `calc(${btnCoords.leftCoord}px + 100px)`,
    background: 'white',
    zIndex: 2
  };

  const hand = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    // top: '0',
    // left: '176px',
    top: `calc(${btnCoords.topCoord}px)`,
    left: `calc(${btnCoords.leftCoord}px + 100px)`,
    transform: 'translate(-50%)',
    background: 'white',
    display: balloonOrigin === 'Header' ? balloonState : 'none'
  };

  return (
    <header
      id="header"
      ref={headerRef}
      css={css`
        border-bottom: 1px solid black;
        padding: 0 20px;
        ${flex.horizontal}
        justify-content: space-between;
        width: 100%;
        height: 50px;

        * {
          ${border}
        }
      `}
    >
      <button
        id="option"
        ref={optionRef}
        onClick={() => {
          const { left, top } = optionRef.current.getBoundingClientRect();
          updateBtnCoords(left, top);
          selectedBtn.current = optionRef.current;
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
      <Balloon
        contents={<Options />}
        display={wrapper}
        style={style}
        hand={hand}
      />
      <form>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={e => {
            dispatch(_TESTCREATOR(e.target.value));
          }}
        />
      </form>
      {/* <button>로그인</button> */}
      <button
        id="member-info"
        ref={memberRef}
        onClick={() => {
          const { left, top } = memberRef.current.getBoundingClientRect();
          updateBtnCoords(left, top);
          selectedBtn.current = memberRef.current;
          dispatch(balloonOriginCreator('Header'));
          if (balloonState === 'none') {
            dispatch(balloonStateCreator('flex'));
          } else if (balloonOrigin === 'Header') {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        {userState.nickname}
      </button>
      {memberStatus}
    </header>
  );
};

export default Header;
