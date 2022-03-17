import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrPrevious } from 'react-icons/gr';
import { flex, sizes } from '../../../../styles';
import { selectedItemCreator, selectedItemDataCreator } from '../../../../actions';
import { backBtnStyle } from '../../styles/MetaStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

const MemoedIco = memo(GrPrevious);

// props 타입 수정 필요
const ToBack = ({ heights }: any) => {
  const { headerHeight, selStoresListHeight } = heights;
  const dispatch = useDispatch();

  return (
    <button
      css={css`${backBtnStyle({ flex, sizes } as StyleSet, { headerHeight, selStoresListHeight })}`}
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