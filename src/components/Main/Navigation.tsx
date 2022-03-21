/* eslint-disable import/no-relative-packages */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { selectedCategoryCreator, selectedStoresCreator } from '../../actions';
import { border, flex, sizes } from '../../styles';
import StoresList from './utils/Navigation/storesList';
import { navStyle } from './styles/NavStyles';
import { RootState } from '../../reducers';
import { StyleSet } from '../../custom_modules/commonUtils';
import cloneDnd, { DropOption, DragOption } from '../../clone-dnd';
// 테스트
import { useAppDispatch, useAppSelector, setSelCategory, setSelStores } from '../../slices';

// const MemoedStores = memo(StoresList);

// props 타입 설정 필요 - storesList 타입 설정 필요
const Navigation = ({ storesList }: any) => {
  // const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  const dispatch = useDispatch();
  // 테스트
  const selectedCategory = useAppSelector(state => state.sliceReducers.selectedCategory);
  const appDispatch = useAppDispatch();
  const { useDropClone, useDragClone } = cloneDnd;
  const dropOption: DropOption = {
    currentItemCategory: ['nav_list']
  }
  const dragOption: DragOption = {
    currentItemCategory: ['nav_list']
  }
  const [ dropRef, dropRes ] = useDropClone(dropOption);
  const [ dragRef, foo, bar, setRefresher ] = useDragClone(dragOption);

  return (
    <nav
      id="navigation"
      css={css`${navStyle({ sizes, flex, border } as StyleSet)}`}
      ref={dropRef}
    >
      <select
        name="content-type"
        id="category-type"
        value={selectedCategory}
        onChange={e => {
          // dispatch(selectedCategoryCreator(e.target.value));
          appDispatch(setSelCategory(e.target.value));
          setRefresher(e.target.value);
        }}
      >
        <option value="all">전체</option>
        <option value="game">게임</option>
        <option value="music">음악</option>
        <option value="series">드라마</option>
        <option value="movie">영화</option>
      </select>
      <StoresList
        props={{
          selectedCategory,
          storesList,
          dispatch: appDispatch,
          selectedStoresCreator: setSelCategory,
          dragRef
        }}
      />
    </nav>
  );
};

export default Navigation;
