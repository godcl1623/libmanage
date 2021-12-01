import React from 'react';
import { useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrPrevious } from 'react-icons/gr';
import { flex, sizes } from '../../../../styles';
import { selectedItemCreator, selectedItemDataCreator } from '../../../../actions';

const ToBack = ({ heights }) => {
  const { headerHeight, selStoresListHeight } = heights;
  const dispatch = useDispatch();

  return (
    <button
      css={css`
        padding: 10px;
        position: fixed;
        top: 50px;
        top: ${headerHeight + selStoresListHeight}px;
        right: 0;
        ${sizes.free('2.604vw')}
        min-width: 50px;
        ${flex.vertical}
        cursor: pointer;
        z-index: 4;
        opacity: 0.7;
      `}
      onClick={e => {
        e.preventDefault();
        dispatch(selectedItemCreator(''));
        dispatch(selectedItemDataCreator({}));
      }}
    >
      <GrPrevious />
    </button>
  );
};

export default ToBack;