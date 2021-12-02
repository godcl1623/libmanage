import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes, flex, border } from '../../../../styles';

const SearchField = ({dispatch, setState, fieldVal}) => (
  <form
    css={css`
      ${sizes.full}
      ${flex.horizontal}
      position: relative;

      input {
        ${border}
        border-color: var(--grey-dark);
      }

      @media (max-width: 599px) {
        padding: 0;
        ${sizes.free('80%', `25px`)}
      }
    `}
  >
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      name="libraryFilter"
      css={css`
        padding: 5px calc(var(--gap-multiply-small) * 1.5);
        ${sizes.free('100%')}
      `}
      onChange={e => {
        dispatch(setState(e.target.value));
      }}
    />
    <button
      name="delete-input"
      id="delete-input"
      css={css`
        border: none;
        ${sizes.free('1.563vw')};
        position: absolute;
        right: calc(var(--gap-multiply-small) * 3);
        display: ${fieldVal === '' ? 'none' : 'block'};
        background: var(--white);
        color: var(--grey-dark);
        font-size: calc(var(--font-size-normal));

        :hover {
          background: none;
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            ${sizes.free(`${1.563 * 1.778}vw`)};
          }

          @media (max-width: 599px) {
            ${sizes.free(`20px`, '20px')};
            font-size: 12px;
            right: var(--gap-multiply-small);
          }
        }
      `}
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