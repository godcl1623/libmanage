import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes, flex, border } from '../../../../styles';
import { searchStyleForm, searchStyleBtn } from '../../styles/HeaderStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

// props 타입 체크 필요
const SearchField = ({dispatch, setState, fieldVal}: any) => {
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const debouncedDispatch = (e: Event) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // e.target 타입 체크 필요
        dispatch(setState((e.target as any).value));
      }, 500);
    };
    const searchField = document.querySelector('input#search_field') as HTMLInputElement;
    searchField.addEventListener('input', debouncedDispatch);
    return () => searchField.removeEventListener('input', debouncedDispatch);
  }, []);

  return (
    <form
      css={css`${searchStyleForm({ border, flex, sizes } as StyleSet)}`}
    >
      <input
        type="text"
        id="search_field"
        placeholder="검색어를 입력하세요"
        name="libraryFilter"
      />
      <button
        name="delete-input"
        id="delete-input"
        css={css`${searchStyleBtn({ sizes } as StyleSet, { fieldVal })}`}
        onClick={e => {
          e.preventDefault();
          // e.target 및 이하 타입 체크 필요
          (e.target as any).parentNode.libraryFilter.value = '';
          dispatch(setState(''));
        }}
      >
        ×
      </button>
    </form>
  )
};

export default SearchField;