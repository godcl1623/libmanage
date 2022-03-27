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
  const [currentHover, setCurrentHover] = React.useState<HTMLElement>();
  const game = <h2>Game</h2>;
  const music = <h2>Music</h2>;
  const series = <h2>Series</h2>;
  const movie = <h2>Movie</h2>;
  const { useDropClone } = cloneDnd;
  const dropOption: DropOption = {
    currentItemCategory: {
      level0: ['nav_category']
    },
    applyToChildren: false
  };
  const [dropRef] = useDropClone(dropOption);
  const {
    selectedCategory,
    storesList,
    dispatch,
    selectedStoresCreator,
    isReorderActivated,
    dragRef,
    setDragTarget,
    dragInfo,
    makeDraggable
  } = props;
  React.useEffect(() => {
    if (isReorderActivated) {
      makeDraggable(true);
    } else {
      makeDraggable(false);
    }
  }, [isReorderActivated]);
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
              display: ${category === param.props.children.toLowerCase() || category === 'all'
                ? 'block'
                : 'none'};
            `}
          >
            <div key={`category-header ${index}`} className="category-header">
              {param}
              <button
                className="select-all-btn"
                onClick={e => {
                  dispatch(selectedStoresCreator('all'));
                }}
                css={css`
                  pointer-events: ${isReorderActivated ? 'none' : 'auto'}
                `}
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
                  css={css`
                    pointer-events: ${isReorderActivated ? 'none' : 'auto'}
                  `}
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
              display: ${category === param.props.children.toLowerCase() || category === 'all'
                ? 'block'
                : 'none'};
            `}
          >
            <div key={`category-header ${index}`} className="category-header">
              {param}
            </div>
          </div>
        );
      }
    });

  const reorderList = (e: React.DragEvent): void => {
    const HTMLEventTarget = e.target! as HTMLElement;
    const parent = HTMLEventTarget.parentNode;
    const list = Array.from((parent! as HTMLElement).childNodes);
    const currentIdx = list.indexOf(HTMLEventTarget);
    const { startInfo, lastInfo } = dragInfo;
    const { startEleInfo, startCoords } = startInfo;
    const { lastEleInfo, lastCoords } = lastInfo;
    const computedStyle = window.getComputedStyle(HTMLEventTarget);
    const targetMargin =
      parseInt(computedStyle.marginTop, 10) + parseInt(computedStyle.marginBottom, 10);
    if (lastEleInfo) {
      const targetHeight = lastEleInfo.height;
      const minNextEleTop = targetMargin + targetHeight;
      const targetMovedDistance = lastCoords.clientY - startCoords.clientY;
      if (targetMovedDistance > minNextEleTop) {
        const distanceToIdx = Math.floor(targetMovedDistance / minNextEleTop);
        const idxToAdd = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit =
          currentIdx + idxToAdd + 1 > list.length ? list.length : currentIdx + idxToAdd + 1;
        parent?.removeChild(HTMLEventTarget);
        parent?.insertBefore(HTMLEventTarget, list[insertCrit]);
      } else if (targetMovedDistance * -1 > minNextEleTop) {
        const distanceToIdx = Math.floor((targetMovedDistance * -1) / minNextEleTop);
        const idxToSub = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit = currentIdx - idxToSub <= 0 ? 0 : currentIdx - idxToSub;
        parent?.removeChild(HTMLEventTarget);
        parent?.insertBefore(HTMLEventTarget, list[insertCrit]);
      }
      list.forEach(ele => {(ele as HTMLElement).style.boxShadow = 'none'});
    }
  };

  const dragHighlighter = (e: React.DragEvent): void => {
    const HTMLEventTarget = e.target! as HTMLElement;
    if (HTMLEventTarget.className === 'category-header') {
      const enterTargetRect = HTMLEventTarget.getBoundingClientRect();
      const enterTargetMiddle = Math.floor((enterTargetRect.top + enterTargetRect.bottom) / 2);
      const parent = HTMLEventTarget.parentElement as HTMLElement;
      const gParent = parent.parentElement as HTMLElement;
      const gpList = Array.from(gParent.children)
      if (parent === currentHover) {
        if (e.clientY - enterTargetMiddle < 0) {
          currentHover.style.boxShadow = '0 -10px 20px skyblue';
          currentHover.style.transition = 'all 0.3s';
        } else {
          currentHover.style.boxShadow = '0 10px 20px skyblue';
        }
      } else {
        setCurrentHover(parent);
      }
      gpList.forEach(cnt => {
        if (cnt !== currentHover) {
          (cnt as HTMLElement).style.boxShadow = 'none';
        }
      })
    }
  }

  return (
    <div
      id="drop-container"
      style={{
        height: '100%',
        paddingTop: 'var(--gap-standard)'
      }}
      ref={ref => {
        dropRef.current = ref;
        dragRef.current = ref;
      }}
      onDragStart={e => {
        setDragTarget(e.target);
        setCurrentHover(e.target as HTMLElement);
      }}
      onDragEnter={dragHighlighter}
      onDragEnd={reorderList}
    >
      {displayMenu(selectedCategory, game, music, series, movie)}
    </div>
  );
};

export default StoresList;
