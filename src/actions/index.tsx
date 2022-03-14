// unknown 타입 전부 정리할 것
import { BasicActionCreator } from '../custom_modules/commonUtils';

export type ReturnAction<T> = BasicActionCreator<T>;

export const loginStatusCreator = (boolean: boolean) => ({
  type: 'LOGIN_STATUS',
  payload: boolean
});

export const logoutClickedCreator = (boolean: boolean) => ({
  type: 'LOGOUT_CLICKED',
  payload: boolean
});

export const tokenStateCreator = (tokenState: boolean) => ({
  type: 'TOKEN_STATE',
  payload: tokenState
});

export const userStateCreator = (obj: unknown) => ({
  type: 'USER_STATE',
  payload: obj
});

export const modalStateCreator = (boolean: boolean) => ({
  type: 'MODAL_STATE',
  payload: boolean
});

export const balloonStateCreator = (string: string) => ({
  type: 'BALLOON_STATE',
  payload: string
});

export const balloonOriginCreator = (string: string) => ({
  type: 'BALLOON_ORIGIN',
  payload: string
});

export const comparisonStateCreator = (anything: unknown) => ({
  type: 'COMPARE_STATE',
  payload: anything
});

export const libDisplayStateCreator = (string: string) => ({
  type: 'LIBRARY_DISPLAY',
  payload: string
});

export const selectedCategoryCreator = (string: string) => ({
  type: 'SELECTED_CATEGORY',
  payload: string
});

export const selectedStoresCreator = (newArrayItem: unknown) => ({
  type: 'SELECTED_STORES',
  payload: newArrayItem
});

export const extCredStateCreator = (obj: unknown) => ({
  type: 'EXT_CRED',
  payload: obj
});

export const selectedItemCreator = (string: string) => ({
  type: 'SELECTED_ITEM',
  payload: string
});

export const selectedItemDataCreator = (obj: unknown) => ({
  type: 'SELECTED_ITEM_DATA',
  payload: obj
});

export const modalOriginCreator = (string: string) => ({
  type: 'MODAL_ORIGIN',
  payload: string
});

export const librarySearchCreator = (string: string) => ({
  type: 'LIBRARY_SEARCH',
  payload: string
})

export const selectedMediaIdCreator = (string: string) => ({
  type: 'SELECTED_MEDIA_ID',
  payload: string
})

export const selectedMediaListCreator = (array: unknown) => ({
  type: 'SELECTED_MEDIA_LIST',
  payload: array
})

export const isMobileCreator = (boolean: boolean) => ({
  type: 'IS_MOBILE',
  payload: boolean
})

export const _TESTCREATOR = (anything: unknown) => ({
  type: '__TEST__',
  payload: anything
});
