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
                  border-radius: var(--border-rad-normal);
                  box-shadow: 0 0 0.052vw 0.052vw var(--grey-dark);
                  ${sizes.free('calc(var(--gap-multiply-big) * 2)', 'var(--gap-multiply-big)')}
                  display: inline-block;
                  text-align: center;
                  font-size: var(--font-size-standard);
                  cursor: pointer;

                  :hover {
                    -webkit-filter: brightness(90%);
                            filter: brightness(90%);
                  }
                
                  :active {
                    -webkit-transform: scale(0.95);
                        -ms-transform: scale(0.95);
                            transform: scale(0.95);
                  }

                  @media (orientation: portrait) and (max-width: 599px) {
                    box-shadow: 0 0 1px 1px var(--grey-dark);
                    ${sizes.free('60px', '20px')}
                    font-size: 10px;
                  }
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
                css={css`
                  cursor: pointer;
                  background: white;
                  :hover {
                    -webkit-filter: brightness(90%);
                            filter: brightness(90%);
                  }
                
                  :active {
                    -webkit-filter: brightness(70%);
                            filter: brightness(70%);
                  }
                `}
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
        padding: var(--gap-standard);
        flex: 1;
        ${sizes.full}
        background: white;

        .category {
          margin-bottom: calc(var(--gap-multiply-big) * 2);
        }

        .category-header {
          border: 0.208vw solid black;
          padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 2);
          ${flex.horizontal}
          ${sizes.full}
        }

        h2 {
          width: 100%;
        }

        p {
          ${border}
          padding: var(--gap-multiply-small);
          font-size: var(--font-size-normal);
          padding-left: var(--gap-standard);
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            .category-header {
              border: ${0.208 * 1.778}vw solid black;
            }
          }

          @media (max-width: 599px) {
            padding: var(--gap-standard);
            ${sizes.full}
            background: white;

            * {
              font-size: 16px;
            }

            .category-header {
              border: 2px solid black;
            }

            .category {
              margin-bottom: calc(var(--gap-multiply-big) * 2);
            }

            p {
              ${border}
              padding: var(--gap-multiply-small);
              font-size: 14px;
              padding-left: var(--gap-standard);
            }

            button {
              font-size: 12px;
            }
          }
        }
      `}
    >
      <select
        name="content-type"
        className="dropdown"
        value={selectedCategory}
        onChange={e => dispatch(selectedCategoryCreator(e.target.value))}
        css={css`
          margin-bottom: var(--gap-standard);
          ${border}
          border-color: transparent;
          box-shadow: 0 0 0.156vw 0.052vw var(--grey-dark);
          padding: 0.156vw 0.781vw;
          font-size: var(--font-size-normal);
          ${sizes.free('100%')}
          background: var(--white);
          cursor: pointer;

          option {
            font-size: var(--font-size-standard);
          }

          @media (orientation: portrait) {
            padding: ${0.156 * 1.778}vw ${0.781 * 1.778}vw;
            box-shadow: 0 0 ${0.156 * 1.778}vw ${0.052 * 1.778}vw var(--grey-dark);

            @media (max-width: 599px) {
              box-shadow: 0 0 2px 1px var(--grey-dark);
              font-size: 16px;

              option {
                font-size: 16px;
              }
            }
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
