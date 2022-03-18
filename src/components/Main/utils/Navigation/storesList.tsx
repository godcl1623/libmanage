/* eslint-disable no-else-return */
import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';
import { storesListStyle } from '../../styles/NavStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

// props 타입 설정 필요
const StoresList = ({ props }: any) => {
  const game = <h2>Game</h2>;
  const music = <h2>Music</h2>;
  const series = <h2>Series</h2>;
  const movie = <h2>Movie</h2>;
  const { selectedCategory, storesList, dispatch, selectedStoresCreator } = props;
  // params 타입 설정 필요
  const displayMenu = (...params: any[]) =>
    params.map((param, index) => {
      const eachCategoriesStores = storesList[param.props.children.toLowerCase()];
      if (eachCategoriesStores !== undefined) {
        return (
          <div
            key={`category ${index}`}
            className="category"
            css={css`${storesListStyle({ sizes } as StyleSet)}`}
          >
            <div
              key={`category-header ${index}`}
              className="category-header"
            >
              {param}
              <button
                className="select-all-btn"
                onClick={e => {
                  dispatch(selectedStoresCreator('all'));
                }}
              >
                ALL
              </button>
            </div>
            {// store 타입 설정 필요
            eachCategoriesStores.map((store: any) => (
              <p
                key={store}
                className="store-list-item"
                onClick={e => {
                  dispatch(selectedStoresCreator(store));
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

  // 기본 return 필요
  /* 임시 주석 조치 */
  // switch (selectedCategory) {
  //   case 'game':
  //     return displayMenu(game);
  //   case 'music':
  //     return displayMenu(music);
  //   case 'series':
  //     return displayMenu(series);
  //   case 'movie':
  //     return displayMenu(movie);
  //   default:
  //     return displayMenu(game, music, series, movie);
  // }
  if (selectedCategory === 'game') {
    return <>{ displayMenu(game) }</>;
  } else if (selectedCategory === 'music') {
    return <>{ displayMenu(music) }</>;
  } else if (selectedCategory === 'series') {
    return <>{ displayMenu(series) }</>;
  } else if (selectedCategory === 'movie') {
    return <>{ displayMenu(movie) }</>;
  }
  return <>{ displayMenu(game, music, series, movie) }</>;
};

export default StoresList;