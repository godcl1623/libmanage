/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';
import { storesListStyle } from '../../styles/NavStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';
// eslint-disable-next-line import/no-relative-packages
import cloneDnd, { DropOption } from '../../../../clone-dnd';
import { useAppSelector } from '../../../../slices';
import { decryptor } from '../../../../custom_modules/aeser';

type FindCategory = HTMLElement | ((param: HTMLElement) => HTMLElement) | undefined;

function findCategory(ele: HTMLElement): FindCategory {
  if (ele.classList.contains('category')) {
    return ele;
  } else if (ele.parentElement) {
    return findCategory(ele.parentElement);
  }
}

// props 타입 설정 필요
const StoresList = ({ props }: any) => {
  const { userState, catDropResult, isReorderActivated } = useAppSelector(state => state.sliceReducers);
  const [currentHover, setCurrentHover] = useState<HTMLElement>();
  const [dragStartEle, setDragStartEle] = useState<HTMLElement>();
  const [listState, setListState] = useState<string | string[]>('');
  const originalList = useRef<string | string[]>('');
  const originalTouchElement = useRef<HTMLElement | null>(null);
  const clonedElement = useRef<HTMLElement | null>(null);
  const originalLeftCoord = useRef<number>(0);
  const originalTopCoord = useRef<number>(0);
  const game = 'game';
  const music = 'music';
  const series = 'series';
  const movie = 'movie';
  const storagedList = localStorage.length !== 0 ? JSON.parse(decryptor(localStorage.getItem('frog'), process.env.REACT_APP_TRACER as string)).customCatOrder : null;
  const userSetList = storagedList === userState.customCatOrder ? userState.customCatOrder : storagedList;
  const { useDropClone } = cloneDnd;
  const dropOption: DropOption = {
    currentItemCategory: {
      level0: ['nav_category']
    },
    applyToChildren: false
  };
  const [dropRef, dropInfo] = useDropClone(dropOption);
  const {
    selectedCategory,
    storesList,
    dispatch,
    selectedStoresCreator,
    dragRef,
    dragInfo,
    makeDraggable,
    updateDropRes
  } = props;
  useEffect(() => {
    let currentList: string | string[] = '';
    if (!userState.customCatOrder || userState.customCatOrder === 'default') {
      currentList = [game, music, series, movie];
    } else {
      currentList = userSetList;
    }
    setListState(currentList);
    originalList.current = currentList;
  }, [userState.customCatOrder]);
  useEffect(() => {
    if (isReorderActivated) {
      makeDraggable(true);
    } else {
      makeDraggable(false);
      if (catDropResult[0] === 'cancel') {
        setListState(originalList.current);
      }
    }
  }, [isReorderActivated, catDropResult]);
  // params 타입 설정 필요
  const displayMenu = React.useCallback((category: string, ...params: any[]) => {
    const inputArr = typeof params[0] !== 'string' ? params[0] : params[0].split(',');
    return inputArr.map((param: any, index: number) => {
      const categoryVal = typeof param !== 'string' ? param.props.children.toLowerCase() : param;
      const eachCategoriesStores = storesList[categoryVal];
      const heading = param.charAt(0).toUpperCase() + param.slice(1);
      if (eachCategoriesStores !== undefined) {
        return (
          <div
            key={`category ${index}`}
            className={`category ${categoryVal} all`}
            css={css`
              ${storesListStyle({ sizes } as StyleSet)}
              display: ${category === categoryVal || category === 'all'
                ? 'block'
                : 'none'};
            `}
          >
            <div key={`category-header ${index}`} className="category-header">
              <h2>{heading}</h2>
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
            className={`category ${categoryVal} all`}
            css={css`
              display: ${category === categoryVal || category === 'all'
                ? 'block'
                : 'none'};
            `}
          >
            <div key={`category-header ${index}`} className="category-header">
              <h2>{heading}</h2>
            </div>
          </div>
        );
      }
    });
  }, [listState]);

  const reorderList = (e: React.DragEvent): void => {
    const dragTgt = dragStartEle as HTMLElement;
    const parent = dragTgt.parentNode as HTMLElement;
    const list = Array.from(parent.childNodes);
    const currentIdx = list.indexOf(dragTgt);
    const { startEleInfo, startCoords } = dragInfo;
    const { dropEleInfo, dropCoords } = dropInfo;
    const computedStyle = window.getComputedStyle(dragTgt);
    const targetMargin =
      parseInt(computedStyle.marginTop, 10) + parseInt(computedStyle.marginBottom, 10);
    if (dropEleInfo) {
      const targetHeight = startEleInfo.height;
      const minNextEleTop = targetMargin + targetHeight;
      const targetMovedDistance = dropCoords.clientY - startCoords.clientY;
      if (targetMovedDistance > minNextEleTop) {
        const distanceToIdx = Math.floor(targetMovedDistance / minNextEleTop);
        const idxToAdd = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit =
          currentIdx + idxToAdd + 1 > list.length ? list.length : currentIdx + idxToAdd + 1;
        const original = Array.from(parent.children);
        const front = original.slice(0, insertCrit);
        const back = original.slice(insertCrit);
        const moveItem = front.splice(front.indexOf(original[currentIdx]), 1)[0];
        back.unshift(moveItem);
        const result = [...front, ...back].map(ele => (ele as HTMLElement).classList[1]);
        setListState(result);
        dispatch(updateDropRes(result));
      } else if (targetMovedDistance * -1 > minNextEleTop) {
        const distanceToIdx = Math.floor((targetMovedDistance * -1) / minNextEleTop);
        const idxToSub = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit = currentIdx - idxToSub <= 0 ? 0 : currentIdx - idxToSub;
        const original = Array.from(parent.children);
        const front = original.slice(0, insertCrit);
        const back = original.slice(insertCrit);
        const moveItem = back.splice(back.indexOf(original[currentIdx]), 1)[0];
        back.unshift(moveItem);
        const result = [...front, ...back].map(ele => (ele as HTMLElement).classList[1]);
        setListState(result);
        dispatch(updateDropRes(result));
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
        setCurrentHover(e.target as HTMLElement);
        setDragStartEle(e.target as HTMLElement);
      }}
      onDragEnter={dragHighlighter}
      onDrop={reorderList}
      onTouchStart={e => {
        if (e.target !== dropRef.current) {
          const touchTgt = findCategory(e.target as HTMLElement) as HTMLElement;
          originalTouchElement.current = touchTgt;
          const originalStyles = touchTgt.children[0].getBoundingClientRect();
          const { width, height, left, top } = originalStyles;
          const { clientX: tLeft, clientY: tTop } = e.touches[0];
          const cloneTgt = touchTgt.cloneNode(true) as HTMLElement;
          cloneTgt.style.width = width + 'px';
          cloneTgt.style.height = height + 'px';
          cloneTgt.style.position = 'absolute';
          cloneTgt.style.left = left + 'px';
          cloneTgt.style.top = top + 'px';
          cloneTgt.style.opacity = '0.5';
          clonedElement.current = cloneTgt;
          originalLeftCoord.current = tLeft - left;
          originalTopCoord.current = tTop - top;
          dropRef.current.appendChild(cloneTgt);
        }
      }}
      onTouchMove={e => {
        const moveTgt = clonedElement.current as HTMLElement;
        const left = e.touches[0].clientX;
        const top = e.touches[0].clientY;
        moveTgt.style.left = left - originalLeftCoord.current + 'px';
        moveTgt.style.top = top - originalTopCoord.current + 'px';
      }}
      onTouchEnd={e => {
        const originalEleLists = Array.from(dropRef.current.children);
        console.log(originalEleLists.indexOf(clonedElement.current))
        clonedElement.current!.remove();
        clonedElement.current = null;
      }}
    >
      {displayMenu(selectedCategory, listState)}
    </div>
  );
};

export default StoresList;
