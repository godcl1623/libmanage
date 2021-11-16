import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { selectedCategoryCreator, selectedStoresCreator } from '../../actions';
import { border, flex, sizes } from '../../styles';

const menu = (value, storeList, dispatch, filterStores) => {
  const game = <h2>Game</h2>;
  const music = <h2>Music</h2>;
  const series = <h2>Series</h2>;
  const movie = <h2>Movie</h2>;
  const displayMenu = (...params) =>
    params.map((param, index) => {
      const eachCategoriesStores = storeList[param.props.children.toLowerCase()];
      if (eachCategoriesStores !== undefined) {
        return (
          <div key={`category ${index}`} className="category">
            <div
              key={`category-header ${index}`}
              className="category-header"
            >
              {param}
              <button
                onClick={e => {
                  dispatch(filterStores('all'));
                }}
                css={css`
                  ${border}
                  border-radius: 7px;
                  ${sizes.free('50px', '25px')}
                  background: white;
                  display: inline-block;
                  text-align: center;
                  font-size: 16px;
                  cursor: pointer;
                `}
              >
                ALL
              </button>
            </div>
            {eachCategoriesStores.map(store => (
              <p
                key={store}
                onClick={e => {
                  dispatch(filterStores(store));
                }}
              >
                - {[store[0].toUpperCase()].concat(store.slice(1, store.length))}
              </p>
            ))}
          </div>
        );
        // eslint-disable-next-line no-else-return
      } else {
        return (
          <div key={`category ${index}`} className="category">
            <div key={`category-header ${index}`} className="category-header">
              {param}
            </div>
          </div>
        );
      }
    });
  switch (value) {
    case 'game':
      return displayMenu(game);
    case 'music':
      return displayMenu(music);
    case 'series':
      return displayMenu(series);
    case 'movie':
      return displayMenu(movie);
    default:
      return displayMenu(game, music, series, movie);
  }
};

const Navigation = ({ storesList }) => {
  const selectedCategory = useSelector(state => state.selectedCategory);
  const dispatch = useDispatch();

  return (
    <nav
      id="navigation"
      css={css`
        padding: 20px;
        flex: 1;
        ${sizes.full}

        .category {
          margin-bottom: 50px;
        }

        .category-header {
          border: 4px solid black;
          padding: 5px 10px;
          ${flex.horizontal}
          ${sizes.full}
        }

        h2 {
          width: 100%;
        }

        p {
          ${border}
          padding: 5px;
          font-size: var(--font-size-normal);
          padding-left: 20px;
        }
      `}
    >
      <select
        name="content-type"
        className="dropdown"
        value={selectedCategory}
        onChange={e => dispatch(selectedCategoryCreator(e.target.value))}
        css={css`
          margin-bottom: 20px;
          padding: 3px 15px;
          font-size: var(--font-size-normal);
          ${sizes.free('100%')}

          option {
            font-size: 16px;
          }
        `}
      >
        <option value="all">전체</option>
        <option value="game">게임</option>
        <option value="music">음악</option>
        <option value="series">드라마</option>
        <option value="movie">영화</option>
      </select>
      {menu(selectedCategory, storesList, dispatch, selectedStoresCreator)}
    </nav>
  );
};

export default Navigation;
