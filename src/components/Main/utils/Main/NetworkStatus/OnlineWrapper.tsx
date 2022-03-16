/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
} from '../../../../../actions';
import { sendTo } from '../../../../../custom_modules/address';
import { sizes, flex } from '../../../../../styles';
import { mainStyle } from '../../../styles/MainStyles';
import { RootState } from '../../../../../reducers';

// props 타입 체크 필요
const OnlineWrapper = ({ Contents }: any) => {
  const loginStatus = useSelector((state: RootState) => state.loginStatus);
  const logoutClicked = useSelector((state: RootState) => state.logoutClicked);
  const balloonState = useSelector((state: RootState) => state.balloonState);
  const userState = useSelector((state: RootState) => state.userState);
  const comparisonState = useSelector((state: RootState) => state.comparisonState);
  const selectedItem = useSelector((state: RootState) => state.selectedItem);
  const selectedItemData = useSelector((state: RootState) => state.selectedItemData);
  const modalOrigin = useSelector((state: RootState) => state.modalOrigin);
  const modalState = useSelector((state: RootState) => state.modalState);
  const selectedMediaId = useSelector((state: RootState) => state.selectedMediaId);
  const selectedMediaList = useSelector((state: RootState) => state.selectedMediaList);
  const isMobile = useSelector((state: RootState) => state.isMobile);
  const selectedStores = useSelector((state: RootState) => state.selectedStores);
  // 타입 수정 필요
  const [storesList, setStoresList] = useState<any>('');
  const [userLibrary, setUserLibrary] = useState<any>('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [selStoresListHeight, setSelStoresListHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [coverSize, setCoverSize] = useState(10);
  const dispatch = useDispatch();
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
    balloonStateCreator,
    comparisonStateCreator,
    modalStateCreator,
    selectedItemCreator,
    selectedItemDataCreator,
    selectedMediaIdCreator,
    selectedStoresCreator
  };
  const refs = { headerRef, listRef };
  const moduleHooks = { dispatch };
  const styles = { mainStyle, flex, sizes };

  useEffect(() => {
    // const abortCon = new AbortController();
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

  return <Contents props={{ states, setStates, actionCreators, refs, moduleHooks, styles }} />;
};

export default OnlineWrapper;