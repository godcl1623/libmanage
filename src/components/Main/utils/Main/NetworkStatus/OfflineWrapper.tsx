import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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
import { RootState } from '../../../../../reducers';
import { sizes, flex } from '../../../../../styles';
import { mainStyle } from '../../../styles/MainStyles';
// 테스트
import {
  useAppSelector,
  useAppDispatch,
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
const OfflineWrapper = ({ Contents }: any) => {
  // const balloonState = useSelector((state: RootState) => state.balloonState);
  // const userState = useSelector((state: RootState) => state.userState);
  // const selectedItem = useSelector((state: RootState) => state.selectedItem);
  // const selectedItemData = useSelector((state: RootState) => state.selectedItemData);
  // const modalOrigin = useSelector((state: RootState) => state.modalOrigin);
  // const modalState = useSelector((state: RootState) => state.modalState);
  // const selectedMediaId = useSelector((state: RootState) => state.selectedMediaId);
  // const selectedMediaList = useSelector((state: RootState) => state.selectedMediaList);
  // const isMobile = useSelector((state: RootState) => state.isMobile);
  // const selectedStores = useSelector((state: RootState) => state.selectedStores);
  const [storesList, setStoresList] = React.useState('');
  const [userLibrary, setUserLibrary] = React.useState('');
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [selStoresListHeight, setSelStoresListHeight] = React.useState(0);
  const [isPortrait, setIsPortrait] = React.useState(false);
  const [coverSize, setCoverSize] = React.useState(10);
  const dispatch = useDispatch();
  // 테스트
  const balloonState = useAppSelector(state => state.sliceReducers.balloonState);
  const userState = useAppSelector(state => state.sliceReducers.userState);
  const selectedItem = useAppSelector(state => state.sliceReducers.selectedItem);
  const selectedItemData = useAppSelector(state => state.sliceReducers.selectedItemData);
  const modalOrigin = useAppSelector(state => state.sliceReducers.modalOrigin);
  const modalState = useAppSelector(state => state.sliceReducers.modalState);
  const selectedMediaId = useAppSelector(state => state.sliceReducers.selectedMediaId);
  const selectedMediaList = useAppSelector(state => state.sliceReducers.selectedMediaList);
  const isMobile = useAppSelector(state => state.sliceReducers.isMobile);
  const selectedStores = useAppSelector(state => state.sliceReducers.selectedStores);
  const appDispatch = useAppDispatch();
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
    setCoverSize,
    setStoresList
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

  React.useEffect(() => {
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

  React.useEffect(() => {
    const detector = () => {
      if (window.matchMedia('(orientation: portrait)').matches) {
        setIsPortrait(true);
        if (window.innerWidth < 600) {
          appDispatch(checkIfMobile(true));
          // dispatch(selectedStoresCreator(''));
        }
      } else {
        setIsPortrait(false);
        appDispatch(checkIfMobile(false));
        // dispatch(selectedStoresCreator('all'));
      }
    };
    window.addEventListener('resize', detector);
    return () => window.removeEventListener('resize', detector);
  }, []);

  React.useEffect(() => {
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

  return <Contents props={{ states, setStates, actionCreators, refs, moduleHooks, styles }} />;
};

export default OfflineWrapper;
