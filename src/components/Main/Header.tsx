/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { sizes, flex, border } from '../../styles';
import { headerStyle } from './styles/HeaderStyles';
import {
  headerBalloonWrapper,
  headerBalloonStyle,
  headerBalloonHand
} from './styles/balloons/HeaderBalloonStyle';
import { RootState } from '../../reducers';

const MemoedIco = memo(FaBars);
const MemoedBalloon = memo(Balloon);
const MemoedHeaderOpt = memo(HeaderOptions);
const MemoedSearch = memo(SearchField);
const MemoedMemStat = memo(MemberStatus);

type PropsType = {
  headerRef: React.MutableRefObject<HTMLElement>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  currHeight: number;
}

const Header = ({ headerRef, setHeight, currHeight }: PropsType) => {
  const loginStatus = useSelector((state: RootState) => state.loginStatus);
  const userState = useSelector((state: RootState) => state.userState);
  const modalState = useSelector((state: RootState) => state.modalState);
  const balloonState = useSelector((state: RootState) => state.balloonState);
  const balloonOrigin = useSelector((state: RootState) => state.balloonOrigin);
  const librarySearch = useSelector((state: RootState) => state.librarySearch);
  const isMobile = useSelector((state: RootState) => state.isMobile);
  const [btnCoords, setBtnCoords] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const optionRef = useRef<HTMLButtonElement | null>(null);
  const memberRef = useRef<HTMLButtonElement | null>(null);
  const selectedBtn = useRef<HTMLButtonElement | null>(null);
  const updateBtnCoords = (...args: number[]) => {
    const [ left, top, bottom, width ] = args;
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
        ${headerStyle({ border, flex, sizes })}
      `}
    >
      <div className="space-divider">
        <button
          id="option"
          ref={optionRef}
          onClick={e => {
            const { left, top, bottom } = (optionRef.current as HTMLElement).getBoundingClientRect();
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
                isMobile
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
                    navigate,
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
          display={headerBalloonWrapper(balloonOrigin, balloonState)}
          style={headerBalloonStyle(
            { flex, sizes },
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
            dispatch={dispatch}
            setState={librarySearchCreator}
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
                const { left, top, bottom, width } = (memberRef.current as HTMLElement).getBoundingClientRect();
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
                dispatch,
                logoutClickedCreator,
                userStateCreator,
                comparisonStateCreator,
                loginStatusCreator,
                navigate,
                axios,
                selectedItemCreator,
                selectedItemDataCreator,
                selectedMediaIdCreator,
                selectedMediaListCreator,
                modalStateCreator
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
