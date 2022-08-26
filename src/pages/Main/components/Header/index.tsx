/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import Balloon from 'components/Modal/Balloon';
import { sizes, flex, border } from 'styles';
import { StyleSet } from 'custom_modules/commonUtils';
import {
  useAppDispatch,
  useAppSelector,
  setLoginStat,
  setLogoutClickStat,
  setModalState,
  setBalloonState,
  setBalloonOrigin,
  setUserState,
  setCompareState,
  setModalOrigin,
  setLibSearch,
  setSelItem,
  setSelItemData,
  setSelMediaId,
  setSelMediaList
} from 'slices';
import SearchField from './components/SearchField';
import HeaderOptions from './components/HeaderOptions';
import MemberStatus from './components/MemberStatus';
import { headerStyle } from './styles/headerStyles';
import {
  headerBalloonWrapper,
  headerBalloonStyle,
  headerBalloonHand
} from '../../styles/balloons/HeaderBalloonStyle';

type PropsType = {
  headerRef: React.MutableRefObject<HTMLElement>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  currHeight: number;
};

const Header = ({ headerRef, setHeight, currHeight }: PropsType) => {
  const loginStatus = useAppSelector(state => state.sliceReducers.loginStatus);
  const userState = useAppSelector(state => state.sliceReducers.userState);
  const modalState = useAppSelector(state => state.sliceReducers.modalState);
  const balloonState = useAppSelector(state => state.sliceReducers.balloonState);
  const balloonOrigin = useAppSelector(state => state.sliceReducers.balloonOrigin);
  const librarySearch = useAppSelector(state => state.sliceReducers.librarySearch);
  const isMobile = useAppSelector(state => state.sliceReducers.isMobile);
  const [btnCoords, setBtnCoords] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const appDispatch = useAppDispatch();
  const optionRef = useRef<HTMLButtonElement | null>(null);
  const memberRef = useRef<HTMLButtonElement | null>(null);
  const selectedBtn = useRef<HTMLButtonElement | null>(null);
  const updateBtnCoords = (...args: number[]) => {
    const [left, top, bottom, width] = args;
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

  return (
    <header
      id="header"
      ref={headerRef}
      css={css`
        ${headerStyle({ border, flex, sizes } as StyleSet)}
      `}
    >
      <div className="space-divider">
        <button
          id="option"
          ref={optionRef}
          onClick={e => {
            const { left, top, bottom } = (
              optionRef.current as HTMLElement
            ).getBoundingClientRect();
            updateBtnCoords(left, top, bottom);
            selectedBtn.current = optionRef.current;
            appDispatch(setBalloonOrigin('Header'));
            if (balloonState === 'none') {
              appDispatch(setBalloonState('flex'));
            } else if (balloonOrigin === 'Header') {
              appDispatch(setBalloonState('none'));
            }
          }}
        >
          {<FaBars />}
        </button>
        <Balloon
          contents={
            <HeaderOptions
              setStates={{
                dispatch: appDispatch,
                modalOriginCreator: setModalOrigin,
                modalStateCreator: setModalState,
                balloonStateCreator: setBalloonState,
                modalState
              }}
              states={{
                selectedBtn,
                optionRef,
                isMobile
              }}
              components={[
                <SearchField
                  dispatch={appDispatch}
                  setState={setLibSearch}
                  fieldVal={librarySearch}
                />,
                <MemberStatus
                  loginStatus={loginStatus}
                  functions={{
                    dispatch: appDispatch,
                    logoutClickedCreator: setLogoutClickStat,
                    userStateCreator: setUserState,
                    comparisonStateCreator: setCompareState,
                    loginStatusCreator: setLoginStat,
                    navigate,
                    axios,
                    selectedItemCreator: setSelItem,
                    selectedItemDataCreator: setSelItemData,
                    selectedMediaIdCreator: setSelMediaId,
                    selectedMediaListCreator: setSelMediaList,
                    modalStateCreator: setModalState
                  }}
                />
              ]}
            />
          }
          display={headerBalloonWrapper(balloonOrigin, balloonState)}
          style={headerBalloonStyle(
            { flex, sizes } as StyleSet,
            { balloonState, selectedBtn, optionRef, btnCoords },
            balloonOrigin
          )}
          hand={headerBalloonHand(
            { balloonState, selectedBtn, optionRef, btnCoords },
            balloonOrigin
          )}
        />
      </div>
      <div className="space-divider">
        {isMobile ? (
          <></>
        ) : (
          <SearchField
            dispatch={appDispatch}
            setState={setLibSearch}
            fieldVal={librarySearch}
          />
        )}
      </div>
      <div className="space-divider">
        {location.pathname !== '/offline' || !navigator.onLine ? (
          <div className="sub-divider">
            <button
              id="member-info"
              ref={memberRef}
              onClick={() => {
                const { left, top, bottom, width } = (
                  memberRef.current as HTMLElement
                ).getBoundingClientRect();
                updateBtnCoords(left, top, bottom, width);
                selectedBtn.current = memberRef.current;
                appDispatch(setBalloonOrigin('Header'));
                if (balloonState === 'none') {
                  appDispatch(setBalloonState('flex'));
                } else if (balloonOrigin === 'Header') {
                  appDispatch(setBalloonState('none'));
                }
              }}
            >
              {userState.nickname}
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="sub-divider">
          {isMobile ? (
            ''
          ) : (
            <MemberStatus
              loginStatus={loginStatus}
              functions={{
                dispatch: appDispatch,
                logoutClickedCreator: setLogoutClickStat,
                userStateCreator: setUserState,
                comparisonStateCreator: setCompareState,
                loginStatusCreator: setLoginStat,
                navigate,
                axios,
                selectedItemCreator: setSelItem,
                selectedItemDataCreator: setSelItemData,
                selectedMediaIdCreator: setSelMediaId,
                selectedMediaListCreator: setSelMediaList,
                modalStateCreator: setModalState
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
