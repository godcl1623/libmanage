/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import Balloon from '../Modal/Balloon';
import SearchField from './utils/Header/SearchField';
import HeaderOptions from './utils/Header/HeaderOptions';
import MemberStatus from './utils/Header/MemberStatus';
import {
  loginStatusCreator,
  logoutClickedCreator,
  modalStateCreator,
  balloonStateCreator,
  balloonOriginCreator,
  userStateCreator,
  comparisonStateCreator,
  modalOriginCreator,
  librarySearchCreator,
  selectedItemCreator,
  selectedItemDataCreator,
  selectedMediaIdCreator,
  selectedMediaListCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';

const Header = ({ headerRef, setHeight, currHeight }) => {
  const loginStatus = useSelector(state => state.loginStatus);
  const userState = useSelector(state => state.userState);
  const modalState = useSelector(state => state.modalState);
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const librarySearch = useSelector(state => state.librarySearch);
  const isMobile = useSelector(state => state.isMobile);
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
    const detector = () => {
      if (window.matchMedia('(orientation: portrait)').matches) {
        setHeight(headerRef.current.getBoundingClientRect().height);
      } else {
        setHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    detector();
    window.addEventListener('resize', detector);
    return () => window.removeEventListener('resize', detector);
  }, []);

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
    ${flex.vertical}
    ${sizes.free('15.625vw', '5.208vw')}
    position: absolute;
    top: ${
      selectedBtn.current === optionRef.current
        ? // ? `calc(${btnCoords.topCoord}px)`
          // : `calc(${btnCoords.botCoord}px + 40px)`
          `calc(${btnCoords.topCoord / 19.2}vw)`
        : `calc(${btnCoords.botCoord}px + 3.703vh)`
    };
    left: ${
      selectedBtn.current === optionRef.current
        ? // ? `calc(${btnCoords.leftCoord}px + 100px)`
          // : `calc(${btnCoords.leftCoord}px - 100px)`
          `calc(${btnCoords.leftCoord / 19.2}vw + 5.208vw)`
        : `calc(${btnCoords.leftCoord}px)`
    };
    background: var(--btn-active);
    z-index: 2;

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        ${sizes.free(`${15.625 * 1.778}vw`, `${5.208 * 1.778}vw`)}
        top: ${
          selectedBtn.current === optionRef.current
            ? // ? `calc(${btnCoords.topCoord}px)`
              // : `calc(${btnCoords.botCoord}px + 40px)`
              `calc(${(btnCoords.topCoord / 19.2) * 1.778}vw)`
            : `calc(${btnCoords.botCoord}px + ${3.703 / 1.778}vh)`
        };
        left: ${
          selectedBtn.current === optionRef.current
            ? // ? `calc(${btnCoords.leftCoord}px + 100px)`
              // : `calc(${btnCoords.leftCoord}px - 100px)`
              `calc(${(btnCoords.leftCoord / 19.2) * 1.778}vw + ${5.208 * 1.778}vw)`
            : `calc(${btnCoords.leftCoord}px - 50px)`
        };
      }

      @media (max-width: 599px) {
        padding: var(--gap-standard);
        ${sizes.free('100vw', '100px')}
        justify-content: space-between;
        top: 47px;
        left: 0;
      }
    }
  `;

  const hand = `
    border-top: ${
      selectedBtn.current === optionRef.current
        ? // ? 20px solid transparent
          '1.042vw solid transparent'
        : 'none'
    }; 
    border-bottom: ${
      selectedBtn.current === optionRef.current
        ? // ? 20px solid transparent
          '1.042vw solid transparent'
        : // : 40px solid var(--btn-active);
          '2.083vw solid var(--btn-active)'
    };
    border-right: ${
      selectedBtn.current === optionRef.current
        ? // ? 40px solid var(--btn-active)
          '2.083vw solid var(--btn-active)'
        : // : 20px solid transparent;
          '1.042vw solid transparent'
    };
    border-left: ${
      selectedBtn.current === optionRef.current
        ? 'none'
        : // : 20px solid transparent;
          '1.042vw solid transparent'
    };
    position: absolute;
    top: ${
      selectedBtn.current === optionRef.current
        ? // ? `calc(${btnCoords.topCoord}px)`
          // : `calc(${btnCoords.botCoord}px + 10px)`
          `calc(${btnCoords.topCoord / 19.2}vw)`
        : `calc(${btnCoords.botCoord}px + 0.926vh)`
    };
    left: ${
      selectedBtn.current === optionRef.current
        ? // ? `calc(${btnCoords.leftCoord}px + 80px)`
          // : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
          `calc(${btnCoords.leftCoord / 19.2}vw + 4.271vw)`
        : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
    };
    transform: translate(-50%);
    display: ${balloonOrigin === 'Header' ? balloonState : 'none'};

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        border-top: ${
          selectedBtn.current === optionRef.current
            ? // ? 20px solid transparent
              'var(--gap-standard) solid transparent'
            : 'none'
        }; 
        border-bottom: ${
          selectedBtn.current === optionRef.current
            ? // ? 20px solid transparent
              'var(--gap-standard) solid transparent'
            : // : 40px solid var(--btn-active);
              'calc(var(--gap-standard) * 2) solid var(--btn-active)'
        };
        border-right: ${
          selectedBtn.current === optionRef.current
            ? // ? 40px solid var(--btn-active)
              'calc(var(--gap-standard) * 2) solid var(--btn-active)'
            : // : 20px solid transparent;
              'var(--gap-standard) solid transparent'
        };
        border-left: ${
          selectedBtn.current === optionRef.current
            ? 'none'
            : // : 20px solid transparent;
              'var(--gap-standard) solid transparent'
        };
        top: ${
          selectedBtn.current === optionRef.current
            ? // ? `calc(${btnCoords.topCoord}px)`
              // : `calc(${btnCoords.botCoord}px + 10px)`
              `calc(${(btnCoords.topCoord / 19.2) * 1.778}vw)`
            : `calc(${btnCoords.botCoord}px + ${0.926 / 1.778}vh)`
        };
        left: ${
          selectedBtn.current === optionRef.current
            ? // ? `calc(${btnCoords.leftCoord}px + 80px)`
              // : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
              `calc(${(btnCoords.leftCoord / 19.2) * 1.778}vw + ${4.271 * 1.778}vw)`
            : `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
        };
      }

      @media (max-width: 599px) {
        display: none;
      }
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
        min-height: 35px;
        background: white;

        button {
          ${border}
          border-color: transparent;
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

        @media (max-width: 720px) and (orientation: landscape) {
          ${sizes.free('100%', '25px')}
          min-height: 25px;
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            border-bottom: ${0.052 * 1.778}vw solid var(--grey-dark);
            ${sizes.free('100%', `${2.604 * 1.778}vw`)}
          }

          @media (max-width: 599px) {
            border: none;
            padding: var(--gap-multiply-small) 0;
            ${sizes.free('100%', '50px')}

            button {
              padding: 5px calc(var(--gap-multiply-small) * 1.2);
              box-shadow: 0 0 3px 1px var(--grey-dark);
            }

            button#delete-input {
              padding: 0;
            }
          }
        }
      `}
    >
      <div
        className="space-divider"
        css={css`
          padding-left: 1.042vw;
          flex: 1;

          @media (orientation: portrait) {
            @media (min-width: 600px) {
              padding-left: ${1.042 * 1.778}vw;
            }

            @media (max-width: 599px) {
              padding-left: 20px;
            }
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
              @media (min-width: 600px) {
                ${sizes.free('auto', `${1.823 * 1.778}vw`)}
              }

              @media (max-width: 599px) {
                ${sizes.free('auto', `25px`)}
                font-size: 12px;
              }
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
        <Balloon
          contents={
            <HeaderOptions
              setStates={{
                dispatch,
                modalOriginCreator,
                modalStateCreator,
                balloonStateCreator,
                modalState
              }}
              states={{
                selectedBtn,
                optionRef,
                isMobile,
              }}
              components={[
                <SearchField
                  dispatch={dispatch}
                  setState={librarySearchCreator}
                  fieldVal={librarySearch}
                />,
                <MemberStatus
                  loginStatus={loginStatus}
                  functions={{
                    dispatch,
                    logoutClickedCreator,
                    userStateCreator,
                    comparisonStateCreator,
                    loginStatusCreator,
                    history,
                    axios,
                    selectedItemCreator,
                    selectedItemDataCreator,
                    selectedMediaIdCreator,
                    selectedMediaListCreator,
                    modalStateCreator
                  }}
                />
              ]}
            />
          }
          display={wrapper}
          style={style}
          hand={hand}
        />
      </div>
      <div
        className="space-divider"
        css={css`
          flex: 1.2;
        `}
      >
        {
          isMobile
            ?
              <></>
            :
              <SearchField
                dispatch={dispatch}
                setState={librarySearchCreator}
                fieldVal={librarySearch}
              />
        }
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

          @media (orientation: portrait) and (max-width: 599px) {
            margin-right: 20px;
            flex-direction: row-reverse;
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

              @media (orientation: portrait) and (max-width: 599px) {
                ${sizes.free('max-content', `25px`)}
                font-size: 12px;
              }
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
          {
            isMobile
              ?
                ''
              :
              <MemberStatus
                loginStatus={loginStatus}
                functions={{
                  dispatch,
                  logoutClickedCreator,
                  userStateCreator,
                  comparisonStateCreator,
                  loginStatusCreator,
                  history,
                  axios
                }}
              />
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
