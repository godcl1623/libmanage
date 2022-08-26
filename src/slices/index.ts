import { combineReducers } from 'redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const loginStatus = createSlice({
  name: 'LOGIN_STATUS',
  initialState: false,
  reducers: {
    setLoginStat(state, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

const logoutClicked = createSlice({
  name: 'LOGOUT_CLICKED',
  initialState: false,
  reducers: {
    setLogoutClickStat(state, action: PayloadAction<boolean>) {
      return action.payload
    }
  }
});

const tokenState = createSlice({
  name: 'TOKEN_STATE',
  initialState: '' as string | boolean,
  reducers: {
    setTokenStat(state, action: PayloadAction<string | boolean>) {
      return action.payload;
    }
  }
});

const userState = createSlice({
  name: 'USER_STATE',
  initialState: {} as any,
  reducers: {
    setUserState(state, action: PayloadAction<any>) {
      if (action.payload !== null) {
        return {
          ...action.payload
        }
      // eslint-disable-next-line no-else-return
      } else {
        return {}
      }
    }
  }
});

const modalState = createSlice({
  name: 'MODAL_STATE',
  initialState: false,
  reducers: {
    setModalState(state, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

const balloonState = createSlice({
  name: 'BALLOON_STATE',
  initialState: 'none',
  reducers: {
    setBalloonState(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const balloonOrigin = createSlice({
  name: 'BALLOON_ORIGIN',
  initialState: '',
  reducers: {
    setBalloonOrigin(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const comparisonState = createSlice({
  name: 'COMPARE_STATE',
  initialState: '',
  reducers: {
    setCompareState(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const libDisplay = createSlice({
  name: 'LIBRARY_DISPLAY',
  initialState: 'list',
  reducers: {
    setLibDisplay(state, action: PayloadAction<string>) {
      return action.payload
    }
  }
});

const selectedCategory = createSlice({
  name: 'SELECTED_CATEGORY',
  initialState: 'all',
  reducers: {
    setSelCategory(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const selectedStores = createSlice({
  name: 'SELECTED_STORES',
  initialState: ['all'] as string | string[],
  reducers: {
    setSelStores(state, action: PayloadAction<any>) {
      const result = [...state];
    if (action.payload !== 'all') {
      if (action.payload === '') {
        const temp = [...result.filter(ele => ele !== 'all'), action.payload];
        return [...temp.filter(ele => ele === action.payload)];
      // eslint-disable-next-line no-else-return
      } else if (!result.includes(action.payload as string)) {
        return [...result.filter(ele => ele !== 'all' && ele !== ''), action.payload];
      } else {
        const temp = [...result.filter(ele => ele !== action.payload)];
        if (temp.length !== 0) {
          return temp;
        }
        return [...temp.filter(ele => ele !== action.payload), ''];
      }
    } else {
      const temp = [...result];
      if (temp.length === 1 && temp[0] === 'all') {
        return [...result.filter(ele => ele !== 'all'), ''];
      // eslint-disable-next-line no-else-return
      } else if (temp.length === 1 && temp[0] === '') {
        return [...result.filter(ele => ele === 'all'), action.payload];
      } else {
        return [...result.filter(ele => ele === 'superCaliFragilisticEspialiDocious'), action.payload];
      }
    }
    }
  }
});

const extCredState = createSlice({
  name: 'EXT_CRED',
  initialState: {},
  reducers: {
    setExtCredStat(state, action: PayloadAction<any>) {
      return { ...state, ...action.payload };
    }
  }
});

const selectedItem = createSlice({
  name: 'SELECTED_ITEM',
  initialState: '',
  reducers: {
    setSelItem(state, action: PayloadAction<any>) {
      return action.payload;
    }
  }
});

const selectedItemData = createSlice({
  name: 'SELECTED_ITEM_DATA',
  initialState: {} as any,
  reducers: {
    setSelItemData(state, action: PayloadAction<any>) {
      return action.payload;
    }
  }
});

const modalOrigin = createSlice({
  name: 'MODAL_ORIGIN',
  initialState: '',
  reducers: {
    setModalOrigin(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const librarySearch = createSlice({
  name: 'LIBRARY_SEARCH',
  initialState: '',
  reducers: {
    setLibSearch(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const selectedMediaId = createSlice({
  name: 'SELECTED_MEDIA_ID',
  initialState: '',
  reducers: {
    setSelMediaId(state, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

const selectedMediaList = createSlice({
  name: 'SELECTED_MEDIA_LIST',
  initialState: [] as string[],
  reducers: {
    setSelMediaList(state, action: PayloadAction<string[]>) {
      return action.payload;
    }
  }
});

const isMobile = createSlice({
  name: 'IS_MOBILE',
  initialState: false,
  reducers: {
    checkIfMobile(state, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

const isReorderActivated = createSlice({
  name: 'ACTIVATE_REORDER',
  initialState: false,
  reducers: {
    activateReorder(state, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

const catDropResult = createSlice({
  name: 'UPDATE_DROP_RESULT',
  initialState: [] as string[],
  reducers: {
    updateDropRes(state, action: PayloadAction<string[]>) {
      return action.payload;
    }
  }
})

const sliceReducers = combineReducers({
  loginStatus: loginStatus.reducer,
  logoutClicked: logoutClicked.reducer,
  tokenState: tokenState.reducer,
  userState: userState.reducer,
  modalState: modalState.reducer,
  balloonState: balloonState.reducer,
  balloonOrigin: balloonOrigin.reducer,
  comparisonState: comparisonState.reducer,
  libDisplay: libDisplay.reducer,
  selectedCategory: selectedCategory.reducer,
  selectedStores: selectedStores.reducer,
  extCredState: extCredState.reducer,
  selectedItem: selectedItem.reducer,
  selectedItemData: selectedItemData.reducer,
  modalOrigin: modalOrigin.reducer,
  librarySearch: librarySearch.reducer,
  selectedMediaId: selectedMediaId.reducer,
  selectedMediaList: selectedMediaList.reducer,
  isMobile: isMobile.reducer,
  isReorderActivated: isReorderActivated.reducer,
  catDropResult: catDropResult.reducer
});

const store = configureStore({
  reducer: {
    sliceReducers
  }
});

export default store;

export const { setLoginStat } = loginStatus.actions;
export const { setLogoutClickStat } = logoutClicked.actions;
export const { setTokenStat } = tokenState.actions;
export const { setUserState } = userState.actions;
export const { setModalState } = modalState.actions;
export const { setBalloonState } = balloonState.actions;
export const { setBalloonOrigin } = balloonOrigin.actions;
export const { setCompareState } = comparisonState.actions;
export const { setLibDisplay } = libDisplay.actions;
export const { setSelCategory } = selectedCategory.actions;
export const { setSelStores } = selectedStores.actions;
export const { setExtCredStat } = extCredState.actions;
export const { setSelItem } = selectedItem.actions;
export const { setSelItemData } = selectedItemData.actions;
export const { setModalOrigin } = modalOrigin.actions;
export const { setLibSearch } = librarySearch.actions;
export const { setSelMediaId } = selectedMediaId.actions;
export const { setSelMediaList } = selectedMediaList.actions;
export const { checkIfMobile } = isMobile.actions;
export const { activateReorder } = isReorderActivated.actions;
export const { updateDropRes } = catDropResult.actions;
type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();