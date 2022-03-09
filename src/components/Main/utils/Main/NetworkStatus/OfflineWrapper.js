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
import { sizes, flex } from '../../../../../styles';
import { mainStyle } from '../../../styles/MainStyles';

const OfflineWrapper = ({ Contents }) => {
  const balloonState = useSelector(state => state.balloonState);
  const userState = useSelector(state => state.userState);
  const selectedItem = useSelector(state => state.selectedItem);
  const selectedItemData = useSelector(state => state.selectedItemData);
  const modalOrigin = useSelector(state => state.modalOrigin);
  const modalState = useSelector(state => state.modalState);
  const selectedMediaId = useSelector(state => state.selectedMediaId);
  const selectedMediaList = useSelector(state => state.selectedMediaList);
  const isMobile = useSelector(state => state.isMobile);
  const selectedStores = useSelector(state => state.selectedStores);
  const [storesList, setStoresList] = React.useState('');
  const [userLibrary, setUserLibrary] = React.useState('');
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [selStoresListHeight, setSelStoresListHeight] = React.useState(0);
  const [isPortrait, setIsPortrait] = React.useState(false);
  const [coverSize, setCoverSize] = React.useState(10);
  const dispatch = useDispatch();
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  return <Contents props={{ states, setStates, actionCreators, refs, moduleHooks, styles }} />;
};

export default OfflineWrapper;