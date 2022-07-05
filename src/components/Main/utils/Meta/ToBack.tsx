/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrPrevious } from 'react-icons/gr';
import { flex, sizes } from '../../../../styles';
import { backBtnStyle } from '../../styles/MetaStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';
import { useAppDispatch, setSelItem, setSelItemData } from '../../../../slices';

const ToBack = ({ heights }: any) => {
  const { headerHeight, selStoresListHeight } = heights;
  const appDispatch = useAppDispatch();

  return (
    <button
      css={css`${backBtnStyle({ flex, sizes } as StyleSet, { headerHeight, selStoresListHeight })}`}
      onClick={e => {
        e.preventDefault();
        appDispatch(setSelItem(''));
        appDispatch(setSelItemData({}));
      }}
    >
      <GrPrevious />
    </button>
  );
};

export default ToBack;