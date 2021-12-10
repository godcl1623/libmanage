import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes, flex, border } from '../../../../styles';
import { searchStyleForm, searchStyleBtn } from '../../styles/HeaderStyles';

const SearchField = ({dispatch, setState, fieldVal}) => (
  <form
    css={css`${searchStyleForm({ border, flex, sizes })}`}
  >
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      name="libraryFilter"
      onChange={e => {
        dispatch(setState(e.target.value));
      }}
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
);

export default SearchField;