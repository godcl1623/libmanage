import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes, flex, border } from '../../../../styles';
import { searchStyleForm, searchStyleBtn } from '../../styles/HeaderStyles';

const SearchField = ({dispatch, setState, fieldVal}) => {
  React.useEffect(() => {
    let timer;
    const debouncedDispatch = e => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        dispatch(setState(e.target.value));
      }, 500);
    };
    const searchField = document.querySelector('input#search_field');
    searchField.addEventListener('input', debouncedDispatch);
    return () => searchField.removeEventListener('input', debouncedDispatch);
  }, []);

  return (
    <form
      css={css`${searchStyleForm({ border, flex, sizes })}`}
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
        css={css`${searchStyleBtn({ sizes }, { fieldVal })}`}
        onClick={e => {
          e.preventDefault();
          e.target.parentNode.libraryFilter.value = '';
          dispatch(setState(''));
        }}
      >
        ×
      </button>
    </form>
  )
};

export default SearchField;