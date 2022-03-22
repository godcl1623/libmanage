/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sendTo } from '../../../../../custom_modules/address';
import { sizes, flex } from '../../../../../styles';
import { mainStyle } from '../../../styles/MainStyles';
import {
  useAppDispatch,
  useAppSelector,
  setLoginStat,
  setUserState,
  setBalloonState,
  setCompareState,
  setModalState,
  setSelItem,
  setSelItemData,
  setSelMediaId,
  setSelStores,
  checkIfMobile
} from '../../../../../slices';

// props 타입 체크 필요
const OnlineWrapper = ({ Contents }: any) => {
  const loginStatus = useAppSelector(state => state.sliceReducers.loginStatus);
  const logoutClicked = useAppSelector(state => state.sliceReducers.logoutClicked);
  const balloonState = useAppSelector(state => state.sliceReducers.balloonState);
  const userState = useAppSelector(state => state.sliceReducers.userState);
  const comparisonState = useAppSelector(state => state.sliceReducers.comparisonState);
  const selectedItem = useAppSelector(state => state.sliceReducers.selectedItem);
  const selectedItemData = useAppSelector(state => state.sliceReducers.selectedItemData);
  const modalOrigin = useAppSelector(state => state.sliceReducers.modalOrigin);
  const modalState = useAppSelector(state => state.sliceReducers.modalState);
  const selectedMediaId = useAppSelector(state => state.sliceReducers.selectedMediaId);
  const selectedMediaList = useAppSelector(state => state.sliceReducers.selectedMediaList);
  const isMobile = useAppSelector(state => state.sliceReducers.isMobile);
  const selectedStores = useAppSelector(state => state.sliceReducers.selectedStores);
  // 타입 수정 필요
  const [storesList, setStoresList] = useState<any>('');
  const [userLibrary, setUserLibrary] = useState<any>('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [selStoresListHeight, setSelStoresListHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [coverSize, setCoverSize] = useState(10);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const headerRef = React.useRef();
  const listRef = React.useRef();

  const states = {
    balloonState,
    userState,
    selectedItemData,
    modalOrigin,
    modalState,
    selectedMediaId,
    selectedMediaList,
    isMobile,
    selectedStores,
    storesList,
    userLibrary,
    headerHeight,
    selStoresListHeight,
    isPortrait,
    coverSize
  };

  const setStates = {
    setUserLibrary,
    setHeaderHeight,
    setSelStoresListHeight,
    setCoverSize
  };

  const actionCreators = {
    balloonStateCreator: setBalloonState,
    comparisonStateCreator: setCompareState,
    modalStateCreator: setModalState,
    selectedItemCreator: setSelItem,
    selectedItemDataCreator: setSelItemData,
    selectedMediaIdCreator: setSelMediaId,
    selectedStoresCreator: setSelStores
  };

  const refs = { headerRef, listRef };
  const moduleHooks = { dispatch: appDispatch };
  const styles = { mainStyle, flex, sizes };

  useEffect(() => {
    const abortCon = new AbortController();
    const checkLogin = async () => {
      const message = {
        comparisonState,
        million: localStorage.getItem('frog')
      };
      await axios
        .post(
          'http://localhost:3003/check_login',
          // `https://${sendTo}/check_login`,
          { message },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data.isLoginSuccessful) {
            if (!res.data.isGuest) {
              appDispatch(setLoginStat(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                appDispatch(setUserState(res.data));
                appDispatch(setCompareState(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                appDispatch(setUserState(res.data));
              }
            } else {
              appDispatch(setLoginStat(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                appDispatch(setUserState(res.data));
                appDispatch(setCompareState(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                appDispatch(setUserState(res.data));
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
                  navigate('/');
                }
              }))();
          } else if (res.data === 'no_sessions') {
            alert('로그인이 필요합니다');
            navigate('/');
          }
        })
        .catch(err => console.log(err));
    };
    if (comparisonState !== '') {
      checkLogin();
    }
    checkLogin();
    return () => {
      abortCon.abort();
    }
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
        // 타입 체크 필요
        status.map((iTrue: any) => eachStoresOfCategories[index][iTrue])
      );
      // setStoresList(storesToDisplay);
      // 타입 체크 필요
      const testObj: Record<string, string | string[]> = {};
      categories.forEach((category, index) => {
        if (storesToDisplay[index] !== undefined) {
          testObj[category] = storesToDisplay[index];
        } else {
          testObj[category] = 'foo';
        }
      });
      // 타입 체크 필요
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
        .post('http://localhost:3003/get/db', { reqData: dataToSend }, { withCredentials: true })
        // .post(`https://${sendTo}/get/db`, { reqData: dataToSend }, { withCredentials: true })
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
        appDispatch(setModalState(true));
      } else {
        appDispatch(setModalState(false));
      }
    } else if (selectedItem) {
      appDispatch(setModalState(true));
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
          appDispatch(checkIfMobile(true));
        }
      } else {
        setIsPortrait(false);
        appDispatch(checkIfMobile(false));
      }
    };
    window.addEventListener('resize', detector);
    return () => window.removeEventListener('resize', detector);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      setIsPortrait(true);
      if (window.innerWidth < 600) {
        appDispatch(checkIfMobile(true));
        appDispatch(setSelStores(''));
      }
    } else {
      setIsPortrait(false);
      appDispatch(checkIfMobile(false));
    }
  }, []);

  if (loginStatus === false && logoutClicked === false) {
    return <></>;
  }

  return <Contents props={{ states, setStates, actionCreators, refs, moduleHooks, styles }} />;
};

export default OnlineWrapper;
