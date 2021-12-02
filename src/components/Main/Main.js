/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from './Header';
import Library from './Library';
import Meta from './Meta';
import Navigation from './Navigation';
import Modal from '../Modal/Modal';
import ModalContents from './utils/Main/ModalContents';
import SelectedStoresList from './utils/Main/SelectedStoresList';
import {
  loginStatusCreator,
  userStateCreator,
  balloonStateCreator,
  comparisonStateCreator,
  modalStateCreator,
  selectedItemCreator,
  selectedItemDataCreator,
  selectedMediaIdCreator,
  isMobileCreator,
  selectedStoresCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';

const modalOption = (origin, isMobile, isPortrait) => `
  box-shadow: 0 0 0.521vw 0.104vw var(--grey-dark);
  position: absolute;
  width: ${
    origin !== 'Header_MemInfo'
      ? origin.split('-')[0] === 'meta'
          ? '90vw'
          : '50%'
      : '45%'
  };
  height: ${
    origin !== 'Header_MemInfo'
      ? origin.split('-')[0] === 'meta'
        ? `${(90 * 9) / 16}vw`
        : '50%'
      : '70%'
  };
  ${flex.vertical}
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  @media (max-width: 1079px) {
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(70 * 9) / 16}vw`
          : '50%'
        : '95%'
    };
  }

  @media (max-width: 720px) and (min-height: 300px) {
    width: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
            ? '70vw'
            : '50%'
        : '45%'
    };
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(70 * 9) / 16}vw`
          : '50%'
        : '65%'
    };
  }

  @media (max-width: 720px) and (max-height: 299px) {
    width: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
            ? '70vw'
            : '50%'
        : '45%'
    };
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(70 * 9) / 16}vw`
          : '50%'
        : '95%'
    };
  }

  @media (orientation: portrait) {
    width: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
            ? '90vw'
            : '50%'
        : '45%'
    };
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(90 * 9) / 16}vw`
          : '30%'
        : '50%'
    };

    @media (max-width: 1079px) {
      width: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
              ? '90vw'
              : '50%'
          : '45%'
      };
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? `${(90 * 9) / 16}vw`
            : '30%'
          : '65%'
      };
    }

    @media (max-width: 720px) {
      width: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
              ? '70vw'
              : '50%'
          : '45%'
      };
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? `${(70 * 9) / 16}vw`
            : '30%'
          : '50%'
      };
    }

    @media (max-width: 599px) {
      box-shadow: 0 0 10px 2px var(--grey-dark);
      width: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
              ? isPortrait && isMobile
                  ? `${(90 * 16) / 9}vw`
                  : '70vw'
              : '90%'
          : '90%'
      };
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? isPortrait && isMobile
                ? '90vw'
                : `${(70 * 9) / 16}vw`
            : '50%'
          : '85%'
      };
      transform:
        translate(-50%, -50%)
        ${origin.split('-')[0] === 'meta' ? 'rotate(90deg)' : ''};
    }

    @media (max-width: 299px) {
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? isPortrait && isMobile
                ? '90vw'
                : `${(70 * 9) / 16}vw`
            : 'max-content'
          : '95%'
      };
    }
  }
`;

const Main = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const logoutClicked = useSelector(state => state.logoutClicked);
  const balloonState = useSelector(state => state.balloonState);
  const userState = useSelector(state => state.userState);
  const comparisonState = useSelector(state => state.comparisonState);
  const selectedItem = useSelector(state => state.selectedItem);
  const selectedItemData = useSelector(state => state.selectedItemData);
  const modalOrigin = useSelector(state => state.modalOrigin);
  const modalState = useSelector(state => state.modalState);
  const selectedMediaId = useSelector(state => state.selectedMediaId);
  const selectedMediaList = useSelector(state => state.selectedMediaList);
  const isMobile = useSelector(state => state.isMobile);
  const selectedStores = useSelector(state => state.selectedStores);
  const [storesList, setStoresList] = useState('');
  const [userLibrary, setUserLibrary] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [selStoresListHeight, setSelStoresListHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [coverSize, setCoverSize] = useState(10);
  const dispatch = useDispatch();
  const history = useHistory();
  const headerRef = React.useRef();
  const listRef = React.useRef();

  useEffect(() => {
    // const abortCon = new AbortController();
    const checkLogin = async () => {
      const message = {
        comparisonState,
        million: localStorage.getItem('frog')
      };
      await axios
        .post(
          // 'http://localhost:3001/check_login',
          `https://${sendTo}/check_login`,
          { message },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data.isLoginSuccessful) {
            if (!res.data.isGuest) {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
                dispatch(comparisonStateCreator(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                dispatch(userStateCreator(res.data));
              }
            } else {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
                dispatch(comparisonStateCreator(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                dispatch(userStateCreator(res.data));
              }
            }
          } else if (res.data === 'session_expired' || res.data === 'check_failed') {
            (() =>
              new Promise(resolve => {
                localStorage.removeItem('frog');
                localStorage.removeItem('flies');
                if (!localStorage.getItem('frog')) {
                  resolve(true);
                }
              }).then(res => {
                if (res) {
                  alert('로그인이 필요합니다');
                  history.push('/');
                }
              }))();
          } else if (res.data === 'no_sessions') {
            alert('로그인이 필요합니다');
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    };
    if (comparisonState !== '') {
      checkLogin();
    }
    checkLogin();
    // return () => {
    //   abortCon.abort();
    // }
  }, [comparisonState]);

  useEffect(() => {
    const abortCon = new AbortController();
    const { stores } = userState;
    if (stores !== undefined) {
      const categories = Object.keys(stores);
      const eachStoresOfCategories = categories.map(ele => Object.keys(stores[ele]));
      const eachStatusOfStoresOfCategories = categories.map(ele => Object.values(stores[ele]));
      const activatedStores = eachStatusOfStoresOfCategories.map(storeStat =>
        storeStat.map((ele, index) => (ele === true ? index : '')).filter(ele => ele !== '')
      );
      const storesToDisplay = activatedStores.map((status, index) =>
        status.map(iTrue => eachStoresOfCategories[index][iTrue])
      );
      // setStoresList(storesToDisplay);
      const testObj = {};
      categories.forEach((category, index) => {
        if (storesToDisplay[index] !== undefined) {
          testObj[category] = storesToDisplay[index];
        } else {
          testObj[category] = 'foo';
        }
      });
      setStoresList(testObj);
    }
    return () => {
      abortCon.abort();
    };
  }, [userState.stores]);

  useEffect(() => {
    const abortCon = new AbortController();
    const dataToSend = {
      reqUser: userState.nickname,
      // 임시로 작업 - 모든 카테고리 및 모든 스토어에 대응할 수 있도록 수정 필요
      reqLibs: storesList.game
    };
    if (dataToSend.reqLibs !== '') {
      axios
        // .post('http://localhost:3001/get/db', { reqData: dataToSend }, { withCredentials: true })
        .post(`https://${sendTo}/get/db`, { reqData: dataToSend }, { withCredentials: true })
        .then(res => {
          // 임시로 작업 - 모든 카테고리 및 모든 스토어에 대응할 수 있도록 수정 필요
          if (res.data !== 'no_result') {
            setUserLibrary({ steam: res.data });
          }
        });
      // .catch(err => alert(err));
    }
    return () => {
      abortCon.abort();
    };
  }, [storesList]);

  useEffect(() => {
    const abortCon = new AbortController();
    if (selectedItemData.name) {
      if (selectedItem !== selectedItemData.name) {
        dispatch(modalStateCreator(true));
      } else {
        dispatch(modalStateCreator(false));
      }
    } else if (selectedItem) {
      dispatch(modalStateCreator(true));
    }
    return () => {
      abortCon.abort();
    };
  }, [selectedItem, selectedItemData]);

  useEffect(() => {
    const detector = () => {
      if (window.matchMedia('(orientation: portrait)').matches) {
        setIsPortrait(true);
        if (window.innerWidth < 600) {
          dispatch(isMobileCreator(true));
          // dispatch(selectedStoresCreator(''));
        }
      } else {
        setIsPortrait(false);
        dispatch(isMobileCreator(false));
        // dispatch(selectedStoresCreator('all'));
      }
    };
    window.addEventListener('resize', detector);
    return () => window.removeEventListener('resize', detector);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      setIsPortrait(true);
      if (window.innerWidth < 600) {
        dispatch(isMobileCreator(true));
        dispatch(selectedStoresCreator(''));
      }
    } else {
      setIsPortrait(false);
      dispatch(isMobileCreator(false));
    }
  }, []);

  if (loginStatus === false && logoutClicked === false) {
    return <></>;
  }

  return (
    <>
      <main
        id="main"
        css={css`
          ${sizes.free('100%', '100vh')}
          ${flex.vertical}
          pointer-events: ${modalState && modalOrigin === 'Library' ? 'none' : 'auto'};
          z-index: 1;
          position: relative;
          overflow: hidden;
        `}
        onClick={e => {
          // e.preventDefault();
          if (!isMobile) {
            if (
              balloonState !== 'none' &&
              Array.from(e.target.className).slice(0, 7).join('') !== 'balloon'
            ) {
              dispatch(balloonStateCreator('none'));
            }
          } else if (
            balloonState !== 'none' &&
            Array.from(e.target.className).slice(0, 7).join('') !== 'balloon' &&
            e.target.name !== 'libraryFilter' &&
            e.target.name !== 'delete-input'
          ) {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        <Header
          headerRef={headerRef}
          setHeight={setHeaderHeight}
          currHeight={headerHeight}
        />
        <div
          id="main-contents"
          css={css`
            ${sizes.free('100%', `calc(100% - ${headerHeight}px)`)}
            ${flex.horizontal}

            @media (orientation: portrait) and (max-width: 599px) {
              ${flex.vertical}
            }
          `}
        >
          {isPortrait && isMobile ? (
            <SelectedStoresList
              listRef={listRef}
              setHeight={setSelStoresListHeight}
              selStores={selectedStores}
              funcs={{
                dispatch,
                selectedStoresCreator,
                selectedItemCreator,
                selectedItemDataCreator
              }}
            />
          ) : (
            ''
          )}
          {!isPortrait ? (
            <>
              <Navigation storesList={storesList} />
              <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              <Meta
                portrait={isPortrait}
                heights={{ headerHeight, selStoresListHeight }}
              />
            </>
          ) : isMobile ? (
            <>
              {selectedStores[0] === '' ? (
                <Navigation storesList={storesList} />
              ) : selectedItemData.name === undefined ? (
                <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              ) : (
                <Meta
                  portrait={isPortrait}
                  heights={{ headerHeight, selStoresListHeight }}
                />
              )}
            </>
          ) : (
            <>
              <Navigation storesList={storesList} />
              {selectedItemData.name === undefined ? (
                <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              ) : (
                <Meta
                  portrait={isPortrait}
                  heights={{ headerHeight, selStoresListHeight }}
                />
              )}
            </>
          )}
        </div>
      </main>
      <Modal
        style={modalOption(modalOrigin, isMobile, isPortrait)}
        contents={
          <ModalContents 
            args={{
              userState,
              dispatch,
              comparisonStateCreator,
              modalStateCreator,
              modalOrigin,
              setUserLibrary,
              selectedItemDataCreator,
              selectedMediaId,
              selectedMediaIdCreator,
              selectedMediaList,
            }}
          />
        }
        origin={modalOrigin}
      />
    </>
  );
};

export default Main;
