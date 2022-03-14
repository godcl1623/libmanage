/* eslint-disable no-else-return */
// state, 반환 타입 체크 필요
import { ReturnAction } from '../actions';

const loginStatusReducer = (status = false, action: ReturnAction<boolean>) => {
  if (action.type === 'LOGIN_STATUS') {
    return action.payload;
  }
  return status;
};

const logoutClickedReducer = (status = false, action: ReturnAction<boolean>) => {
  if (action.type === 'LOGOUT_CLICKED') {
    return action.payload;
  }
  return status;
};

const tokenStateReducer = (status = '', action: ReturnAction<string | boolean>) => {
  if (action.type === 'TOKEN_STATE') {
    return action.payload;
  }
  return status;
};

// 타입 수정 필요
const userStateReducer = (status = {}, action: ReturnAction<any>) => {
  if (action.type === 'USER_STATE' && action.payload !== null) {
    return {
      // ...status,
      ...action.payload
    };
    // eslint-disable-next-line no-else-return
  } else if (action.type === 'USER_STATE' && action.payload === null) {
    return {};
  }
  return status;
};

const modalStateReducer = (status = false, action: ReturnAction<boolean>) => {
  if (action.type === 'MODAL_STATE') {
    return action.payload;
  }
  return status;
};

const balloonStateReducer = (state = 'none', action: ReturnAction<string>) => {
  if (action.type === 'BALLOON_STATE') {
    return action.payload;
  }
  return state;
};

const balloonOriginReducer = (state = '', action: ReturnAction<string>) => {
  if (action.type === 'BALLOON_ORIGIN') {
    return action.payload;
  }
  return state;
};

const comparisonStateReducer = (state = '', action: ReturnAction<string>) => {
  if (action.type === 'COMPARE_STATE') {
    return action.payload;
  }
  return state;
};

const libDisplayStateReducer = (state = 'list', action: ReturnAction<string>) => {
  if (action.type === 'LIBRARY_DISPLAY') {
    return action.payload;
  }
  return state;
};

const selectedCategoryReducer = (state = 'all', action: ReturnAction<string>) => {
  if (action.type === 'SELECTED_CATEGORY') {
    return action.payload;
  }
  return state;
};

// 작동 확인 필요
const selectedStoresReducer = (state = ['all'], action: ReturnAction<string | string[]>) => {
  if (action.type === 'SELECTED_STORES') {
    const result = [...state];
    if (action.payload !== 'all') {
      if (action.payload === '') {
        const temp = [...result.filter(ele => ele !== 'all'), action.payload];
        return [...temp.filter(ele => ele === action.payload)];
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
      } else if (temp.length === 1 && temp[0] === '') {
        return [...result.filter(ele => ele === 'all'), action.payload];
      } else {
        return [...result.filter(ele => ele === 'superCaliFragilisticEspialiDocious'), action.payload];
      }
    }
  }
  return state;
};

// 타입 수정 필요
const extCredStateReducer = (state = {}, action: ReturnAction<any>) => {
  if (action.type === 'EXT_CRED') {
    return { ...state, ...action.payload };
  }
  return state;
};

const selectedItemReducer = (state = '', action: ReturnAction<any>) => {
  if (action.type === 'SELECTED_ITEM') {
    return action.payload;
  }
  return state;
};

const selectedItemDataReducer = (state = {}, action: ReturnAction<any>) => {
  if (action.type === 'SELECTED_ITEM_DATA') {
    return action.payload;
  }
  return state;
};

const modalOriginReducer = (state = '', action: ReturnAction<string>) => {
  if (action.type === 'MODAL_ORIGIN') {
    return action.payload;
  }
  return state;
};

const librarySearchReducer = (state = '', action: ReturnAction<string>) => {
  if (action.type === 'LIBRARY_SEARCH') {
    return action.payload;
  }
  return state;
};

const selectedMediaIdReducer = (state = '', action: ReturnAction<string>) => {
  if (action.type === 'SELECTED_MEDIA_ID') {
    return action.payload;
  }
  return state;
}

const selectedMediaListReducer = (state = [], action: ReturnAction<string[]>) => {
  if (action.type === 'SELECTED_MEDIA_LIST') {
    return action.payload;
  }
  return state;
}

const mobileStateReducer = (state = false, action: ReturnAction<boolean>) => {
  if (action.type === 'IS_MOBILE') {
    return action.payload;
  }
  return state;
}

const _TESTREDUCER = (state = '', action: ReturnAction<string>) => {
  if (action.type === '__TEST__') {
    return action.payload;
  }
  return state;
};

const tempStore = {
  loginStatusReducer,
  logoutClickedReducer,
  tokenStateReducer,
  userStateReducer,
  modalStateReducer,
  balloonStateReducer,
  balloonOriginReducer,
  comparisonStateReducer,
  libDisplayStateReducer,
  selectedCategoryReducer,
  selectedStoresReducer,
  extCredStateReducer,
  selectedItemReducer,
  selectedItemDataReducer,
  modalOriginReducer,
  librarySearchReducer,
  selectedMediaIdReducer,
  selectedMediaListReducer,
  mobileStateReducer,
  _TESTREDUCER
};

export default tempStore;
