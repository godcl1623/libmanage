import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrPrevious } from 'react-icons/gr';
import { flex, sizes } from '../../../../styles';
import { selectedItemCreator, selectedItemDataCreator } from '../../../../actions';
import { backBtnStyle } from '../../styles/MetaStyles';

const MemoedIco = memo(GrPrevious);

const ToBack = ({ heights }) => {
  const { headerHeight, selStoresListHeight } = heights;
  const dispatch = useDispatch();

  return (
    <button
      css={css`${backBtnStyle({ flex, sizes }, { headerHeight, selStoresListHeight })}`}
      onClick={e => {
        e.preventDefault();
        dispatch(selectedItemCreator(''));
        dispatch(selectedItemDataCreator({}));
      }}
    >
      <MemoedIco />
    </button>
  );
};

export default ToBack;