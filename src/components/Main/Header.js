import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
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
  librarySearchCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';

const Header = ({ headerRef, setHeight }) => {
  const loginStatus = useSelector(state => state.loginStatus);
  const userState = useSelector(state => state.userState);
  const modalState = useSelector(state => state.modalState);
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const librarySearch = useSelector(state => state.librarySearch);
  const [btnCoords, setBtnCoords] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const optionRef = useRef();
  const memberRef = useRef();
  const selectedBtn = useRef();
  const updateBtnCoords = (left, top, bottom, width) => {
    setBtnCoords(prevState => ({
      ...prevState,
      leftCoord: left,
      topCoord: top,
      botCoord: bottom,
      btnWidth: width
    }));
  };

  useEffect(() => {
    setHeight(headerRef.current.getBoundingClientRect().height);
  }, []);

  const Options = () => (
    <>
      <button
        css={css`
          @media (orientation: landscape) {
            padding: 0.26vw 1.042vw;
            ${sizes.free('80%', '2.344vw')}
          }

          @media (orientation: portrait) {
            padding: ${0.26 * 1.778}vw ${1.042 * 1.778}vw;
            ${sizes.free('80%', `${2.344 * 1.778}vw`)}
          }
        `}
        onClick={() => {
          dispatch(
            modalOriginCreator(
              selectedBtn.current === optionRef.current ? 'Header_Option' : 'Header_MemInfo'
            )
          );
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
        css={css`
          background: var(--btn-alert);
          color: var(--white);
        `}
        onClick={() => {
          const message = {
            reqMsg: 'logout',
            million: localStorage.getItem('frog')
          };
          axios
            .post(
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
        css={css`
          background: var(--btn-active);
          color: var(--white);
        `}
        onClick={() => {
          history.push('/');
        }}
      >
        로그인
      </button>
    );

  const wrapper = `
    display: ${balloonOrigin === 'Header' ? balloonState : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  `;

  const style = `
    padding: var(--gap-standard);
    display: ${balloonOrigin === 'Header' ? balloonState : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${sizes.free('15.625vw', '5.208vw')}
    position: absolute;
    top: ${
      selectedBtn.current === optionRef.current
        // ? `calc(${btnCoords.topCoord}px)`
        // : `calc(${btnCoords.botCoord}px + 40px)`
        ? `calc(${btnCoords.topCoord / 19.2}vw)`
        : `calc(${btnCoords.botCoord}px + 3.703vh)`
    };
    left: ${
      selectedBtn.current === optionRef.current
        // ? `calc(${btnCoords.leftCoord}px + 100px)`
        // : `calc(${btnCoords.leftCoord}px - 100px)`
        ? `calc(${btnCoords.leftCoord / 19.2}vw + 5.208vw)`
        : `calc(${btnCoords.leftCoord}px)`
    };
    background: var(--btn-active);
    z-index: 2;

    @media (orientation: portrait) {
      ${sizes.free(`${15.625 * 1.778}vw`, `${5.208 * 1.778}vw`)}
      top: ${
        selectedBtn.current === optionRef.current
          // ? `calc(${btnCoords.topCoord}px)`
          // : `calc(${btnCoords.botCoord}px + 40px)`
          ? `calc(${(btnCoords.topCoord / 19.2) * 1.778}vw)`
          : `calc(${btnCoords.botCoord}px + ${3.703 / 1.778}vh)`
      };
      left: ${
        selectedBtn.current === optionRef.current
          // ? `calc(${btnCoords.leftCoord}px + 100px)`
          // : `calc(${btnCoords.leftCoord}px - 100px)`
          ? `calc(${(btnCoords.leftCoord / 19.2) * 1.778}vw + ${5.208 * 1.778}vw)`
          : `calc(${btnCoords.leftCoord}px - 50px)`
      };
    }
  `;

  const hand = `
    border-top: ${selectedBtn.current === optionRef.current
      // ? 20px solid transparent
      ? '1.042vw solid transparent'
      : 'none'}; 
    border-bottom: ${selectedBtn.current === optionRef.current
      // ? 20px solid transparent
      ? '1.042vw solid transparent'
      // : 40px solid var(--btn-active);
      : '2.083vw solid var(--btn-active)'};
    border-right: ${selectedBtn.current === optionRef.current
      // ? 40px solid var(--btn-active)
      ? '2.083vw solid var(--btn-active)'
      // : 20px solid transparent;
      : '1.042vw solid transparent'};
    border-left: ${selectedBtn.current === optionRef.current
      ? 'none'
      // : 20px solid transparent;
      : '1.042vw solid transparent'};
    position: absolute;
    top: ${
      selectedBtn.current === optionRef.current
        // ? `calc(${btnCoords.topCoord}px)`
        // : `calc(${btnCoords.botCoord}px + 10px)`
        ? `calc(${btnCoords.topCoord / 19.2}vw)`
        : `calc(${btnCoords.botCoord}px + 0.926vh)`
    };
    left: ${
      selectedBtn.current === optionRef.current
        // ? `calc(${btnCoords.leftCoord}px + 80px)`
        // : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
        ? `calc(${btnCoords.leftCoord / 19.2}vw + 4.271vw)`
        : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
    };
    transform: translate(-50%);
    display: ${balloonOrigin === 'Header' ? balloonState : 'none'};

    @media (orientation: portrait) {
      border-top: ${selectedBtn.current === optionRef.current
        // ? 20px solid transparent
        ? 'var(--gap-standard) solid transparent'
        : 'none'}; 
      border-bottom: ${selectedBtn.current === optionRef.current
        // ? 20px solid transparent
        ? 'var(--gap-standard) solid transparent'
        // : 40px solid var(--btn-active);
        : 'calc(var(--gap-standard) * 2) solid var(--btn-active)'};
      border-right: ${selectedBtn.current === optionRef.current
        // ? 40px solid var(--btn-active)
        ? 'calc(var(--gap-standard) * 2) solid var(--btn-active)'
        // : 20px solid transparent;
        : 'var(--gap-standard) solid transparent'};
      border-left: ${selectedBtn.current === optionRef.current
        ? 'none'
        // : 20px solid transparent;
        : 'var(--gap-standard) solid transparent'};
      top: ${
        selectedBtn.current === optionRef.current
          // ? `calc(${btnCoords.topCoord}px)`
          // : `calc(${btnCoords.botCoord}px + 10px)`
          ? `calc(${(btnCoords.topCoord / 19.2) * 1.778}vw)`
          : `calc(${btnCoords.botCoord}px + ${0.926 / 1.778}vh)`
      };
      left: ${
        selectedBtn.current === optionRef.current
          // ? `calc(${btnCoords.leftCoord}px + 80px)`
          // : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
          ? `calc(${(btnCoords.leftCoord / 19.2) * 1.778}vw + ${4.271 * 1.778}vw)`
          : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
      };
    }
  `;

  return (
    <header
      id="header"
      ref={headerRef}
      css={css`
        border-bottom: 0.052vw solid var(--grey-dark);
        padding: var(--gap-multiply-small) 0;
        ${flex.horizontal}
        justify-content: space-between;
        ${sizes.free('100%', '2.604vw')}
        background: white;

        button {
          padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
          cursor: pointer;

            :hover {
              -webkit-filter: brightness(90%);
                      filter: brightness(90%);
            }
          
            :active {
              -webkit-transform: scale(0.95);
                  -ms-transform: scale(0.95);
                      transform: scale(0.95);
            }
        }

        @media (orientation: portrait) {
          border-bottom: ${0.052 * 1.778}vw solid var(--grey-dark);
          ${sizes.free('100%', `${2.604 * 1.778}vw`)}
        }
      `}
    >
      <div
        className="space-divider"
        css={css`
          padding-left: 1.042vw;
          flex: 1;

          @media (orientation: portrait) {
            padding-left: ${1.042 * 1.778}vw;
          }
        `}
      >
        <button
          id="option"
          ref={optionRef}
          css={css`
            ${flex.vertical}
            ${sizes.free('auto', '1.823vw')}

            @media (orientation: portrait) {
              ${sizes.free('auto', `${1.823 * 1.778}vw`)}
            }
          `}
          onClick={e => {
            const { left, top, bottom } = optionRef.current.getBoundingClientRect();
            updateBtnCoords(left, top, bottom);
            selectedBtn.current = optionRef.current;
            dispatch(balloonOriginCreator('Header'));
            if (balloonState === 'none') {
              dispatch(balloonStateCreator('flex'));
            } else if (balloonOrigin === 'Header') {
              dispatch(balloonStateCreator('none'));
            }
          }}
        >
          {<FaBars />}
        </button>
        <Balloon contents={<Options />} display={wrapper} style={style} hand={hand} />
      </div>
      <div
        className="space-divider"
        css={css`
          flex: 1.2;
        `}
      >
      <form
        css={css`
          ${sizes.full}
          ${flex.horizontal}
          position: relative;

          input {
            ${border}
          }
        `}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          name="libraryFilter"
          css={css`
            ${sizes.free('100%')}
          `}
          onChange={e => {
            dispatch(librarySearchCreator(e.target.value));
          }}
        />
        <button
          css={css`
            border: none;
            box-shadow: none;
            ${sizes.free('1.563vw')};
            position: absolute;
            right: calc(var(--gap-multiply-small) * 3);
            display: ${librarySearch === '' ? 'none' : 'block'};
            background: var(--white);
            color: var(--grey-dark);
            font-size: calc(var(--font-size-normal));

            :hover {
              background: none;
            }

            @media (orientation: portrait) {
              ${sizes.free(`${1.563 * 1.778}vw`)};
            }
          `}
          onClick={e => {
            e.preventDefault();
            e.target.parentNode.libraryFilter.value = '';
            dispatch(librarySearchCreator(''));
          }}
        >
          ×
        </button>
      </form>
      </div>
      <div
        className="space-divider"
        css={css`
          ${sizes.full}
          ${flex.horizontal}
          flex: 1;

          div {
            ${flex.horizontal}
            justify-content: flex-end;
          }
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <button
            id="member-info"
            css={css`
              padding: 0 var(--gap-standard);
            `}
            ref={memberRef}
            onClick={() => {
              const { left, top, bottom, width } = memberRef.current.getBoundingClientRect();
              updateBtnCoords(left, top, bottom, width);
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
        </div>
        <div
          css={css`
            padding-right: var(--gap-standard);
            flex: 1;
          `}
        >
          {memberStatus}
        </div>
      </div>
    </header>
  );
};

export default Header;
