import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { selectedCategoryCreator, selectedStoresCreator } from '../../actions';
import { border, flex, sizes } from '../../styles';
import StoresList from './utils/Navigation/storesList';
import { navStyle } from './styles/NavStyles';

const MemoedStores = memo(StoresList);

const Navigation = ({ storesList }) => {
  const selectedCategory = useSelector(state => state.selectedCategory);
  const dispatch = useDispatch();

  return (
    <nav
      id="navigation"
      css={css`${navStyle({ sizes, flex, border })}`}
    >
      <select
        name="content-type"
        id="category-type"
        value={selectedCategory}
        onChange={e => dispatch(selectedCategoryCreator(e.target.value))}
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
          dispatch,
          selectedStoresCreator
        }}
      />
    </nav>
  );
};

export default Navigation;
