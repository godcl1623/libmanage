import { combineReducers } from 'redux';
import tempStore from './reducer';

export const rootReducer = combineReducers({
  loginStatus: tempStore.loginStatusReducer,
  logoutClicked: tempStore.logoutClickedReducer,
  tokenState: tempStore.tokenStateReducer,
  userState: tempStore.userStateReducer,
  modalState: tempStore.modalStateReducer,
  balloonState: tempStore.balloonStateReducer,
  balloonOrigin: tempStore.balloonOriginReducer,
  comparisonState: tempStore.comparisonStateReducer,
  libDisplay: tempStore.libDisplayStateReducer,
  selectedCategory: tempStore.selectedCategoryReducer,
  selectedStores: tempStore.selectedStoresReducer,
  extCredState: tempStore.extCredStateReducer,
  selectedItem: tempStore.selectedItemReducer,
  selectedItemData: tempStore.selectedItemDataReducer,
  modalOrigin: tempStore.modalOriginReducer,
  librarySearch: tempStore.librarySearchReducer,
  selectedMediaId: tempStore.selectedMediaIdReducer,
  selectedMediaList: tempStore.selectedMediaListReducer,
  isMobile: tempStore.mobileStateReducer,
  _TEST: tempStore._TESTREDUCER
});

export type RootState = ReturnType<typeof rootReducer>;