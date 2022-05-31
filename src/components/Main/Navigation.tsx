/* eslint-disable import/no-relative-packages */
import React, { memo } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { border, flex, sizes } from '../../styles';
import StoresList from './utils/Navigation/storesList';
import { navStyle } from './styles/NavStyles';
import { StyleSet } from '../../custom_modules/commonUtils';
import { useAppDispatch, useAppSelector, setSelCategory, setSelStores, updateDropRes } from '../../slices';
import cloneDnd, { DragOption } from '../../clone-dnd';

// const MemoedStores = memo(StoresList);

// props 타입 설정 필요 - storesList 타입 설정 필요
const Navigation = ({ storesList }: any) => {
  const selectedCategory = useAppSelector(state => state.sliceReducers.selectedCategory);
  const appDispatch = useAppDispatch();
  const { useDragClone } = cloneDnd;
  const dragOption: DragOption = {
    currentItemCategory: {
      level0: ['nav_category'],
      level1: ['nav_category']
    }
  };
  const [ dragRef, dragInfo, setSettings ] = useDragClone(dragOption);
  const { makeDraggable, setRefresher } = setSettings;

  return (
    <nav
      id="navigation"
      css={css`
        ${navStyle({ sizes, flex, border } as StyleSet)}
      `}
    >
      <select
        name="content-type"
        id="category-type"
        value={selectedCategory}
        onChange={e => {
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
          selectedStoresCreator: setSelStores,
          dragRef,
          dragInfo,
          makeDraggable,
          updateDropRes
        }}
      />
    </nav>
  );
};

export default Navigation;
