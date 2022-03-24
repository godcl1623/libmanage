/* eslint-disable no-else-return */
import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';
import { storesListStyle } from '../../styles/NavStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';
// eslint-disable-next-line import/no-relative-packages
import cloneDnd, { DropOption } from '../../../../clone-dnd';

// props 타입 설정 필요
const StoresList = ({ props }: any) => {
  const [dragDirection, setDragDirection] = React.useState<string>('none');
  const [lastIdx, setLastIdx] = React.useState<number>(0);
  const game = <h2>Game</h2>;
  const music = <h2>Music</h2>;
  const series = <h2>Series</h2>;
  const movie = <h2>Movie</h2>;
  const { useDropClone, useGlobalStates } = cloneDnd;
  const dropOption: DropOption = {
    currentItemCategory: {
      level0: ['nav_category']
    },
    applyToChildren: false
  };
  const [dropRef, dropRes] = useDropClone(dropOption);
  const {
    currentDropCategory,
    currentDropTarget,
    currentDragTarget,
    currentDragCategory,
    dropMap,
    isDropped
  } = useGlobalStates();
  const {
    selectedCategory,
    storesList,
    dispatch,
    selectedStoresCreator,
    dragRef,
    setDragTarget,
    dragInfo
  } = props;
  // params 타입 설정 필요
  const displayMenu = (category: string, ...params: any[]) =>
    params.map((param, index) => {
      const eachCategoriesStores = storesList[param.props.children.toLowerCase()];
      if (eachCategoriesStores !== undefined) {
        return (
          <div
            key={`category ${index}`}
            className={`category ${param.props.children.toLowerCase()} all`}
            css={css`
              ${storesListStyle({ sizes } as StyleSet)}
              display: ${
                category === param.props.children.toLowerCase() ||
                category === 'all' ? 'block' : 'none'
              };
            `}
          >
            <div key={`category-header ${index}`} className="category-header">
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
            {
              // store 타입 설정 필요
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
              ))
            }
          </div>
        );
        // eslint-disable-next-line no-else-return
      } else {
        return (
          <div
            key={`category ${index}`}
            className={`category ${param.props.children.toLowerCase()} all`}
            css={css`
              display: ${
                category === param.props.children.toLowerCase() ||
                category === 'all' ? 'block' : 'none'
              };
            `}
          >
            <div key={`category-header ${index}`} className="category-header">
              {param}
            </div>
          </div>
        );
      }
    });

  // const menuSwitch = (category: string): React.ReactElement[] => {
  //   const foo = 'bar';
  //   // switch (category) {
  //   //   case 'game':
  //   //     return displayMenu(game);
  //   //   case 'music':
  //   //     return displayMenu(music);
  //   //   case 'series':
  //   //     return displayMenu(series);
  //   //   case 'movie':
  //   //     return displayMenu(movie);
  //   //   default:
  //   //     return displayMenu(game, music, series, movie);
  //   // }
  //   return displayMenu(game, music, series, movie).filter(div => {
  //     const classList = div.props.className.split(' ');
  //     return classList.includes(category)
  //   });
  // };

  return (
    <div
      id="drop-container"
      style={{
        height: '100%',
        border: '1px solid black',
        paddingTop: 'var(--gap-standard)'
      }}
      ref={ref => {
        dropRef.current = ref;
        dragRef.current = ref;
      }}
      onDragStart={e => setDragTarget(e.target)}
      onDragEnd={e => {
        const HTMLEventTarget = e.target! as HTMLElement;
        const parent = HTMLEventTarget.parentNode;
        const list = Array.from((parent! as HTMLElement).childNodes);
        const currentIdx = list.indexOf(HTMLEventTarget);
        const { startInfo, lastInfo } = dragInfo;
        const { startEleInfo, startCoords } = startInfo;
        const { lastEleInfo, lastCoords } = lastInfo;
        const computedStyle = window.getComputedStyle(HTMLEventTarget);
        const targetMargin = parseInt(computedStyle.marginTop, 10) + parseInt(computedStyle.marginBottom, 10);
        if (lastEleInfo) {
          const targetHeight = lastEleInfo.height;
          const minNextEleTop = targetMargin + targetHeight;
          const targetMovedDistance = lastCoords.clientY - startCoords.clientY;
          if (targetMovedDistance > minNextEleTop) {
            const distanceToIdx = Math.floor(targetMovedDistance / minNextEleTop);
            const idxToAdd = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
            const insertCrit = currentIdx + idxToAdd + 1 > list.length ? list.length : currentIdx + idxToAdd + 1;
            parent?.removeChild(HTMLEventTarget);
            parent?.insertBefore(HTMLEventTarget, list[insertCrit]);
          } else if (targetMovedDistance * -1 > minNextEleTop) {
            const distanceToIdx = Math.floor(targetMovedDistance * -1 / minNextEleTop);
            const idxToSub = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
            const insertCrit = currentIdx - idxToSub <= 0 ? 0 : currentIdx - idxToSub;
            parent?.removeChild(HTMLEventTarget);
            parent?.insertBefore(HTMLEventTarget, list[insertCrit]);
          }
        }
      }}
    >
      {/* {menuSwitch(selectedCategory)} */}
      { displayMenu(selectedCategory, game, music, series, movie) }
    </div>
  );
};

export default StoresList;
