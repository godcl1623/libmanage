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

type CoordsObject = Record<string, number>;

type MoveResIdxs = {
  originalLists: (HTMLElement | null)[];
  insertCrit: number;
  tgtIdx: number;
  direction: string;
};

function findCategory(ele: HTMLElement): FindCategory {
  if (ele.classList.contains('category')) {
    return ele;
  } else if (ele.parentElement) {
    return findCategory(ele.parentElement);
  }
}

function returnMoveRes(moveResIdxs: MoveResIdxs): string[] {
  const { originalLists, insertCrit, tgtIdx, direction } = moveResIdxs;
  const front = originalLists.slice(0, insertCrit);
  const back = originalLists.slice(insertCrit);
  const moveItem = direction === 'down'
    ? front.splice(front.indexOf(originalLists[tgtIdx]), 1)[0]
    : back.splice(back.indexOf(originalLists[tgtIdx]), 1)[0];
  back.unshift(moveItem);
  return [...front, ...back].map(ele => (ele as HTMLElement).classList[1]);
}

function testFunc(crit: number, currVal: number, maxMultiplier: number):any {

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
  const originalCSS = useRef<CSSStyleDeclaration | null>(null);
  const originalTopCoord = useRef<number>(0);
  const originalProcCoords = useRef<CoordsObject>({});
  const endTopCoord = useRef<number>(0);
  const fooRef = useRef<number[] | null>(null);
  const barRef = useRef<number>(0);
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
    const originalLists: HTMLElement[] = Array.from(parent.children) as HTMLElement[];
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
        const result = returnMoveRes({ originalLists, insertCrit, tgtIdx: currentIdx, direction: 'down'});
        setListState(result);
        dispatch(updateDropRes(result));
      } else if (targetMovedDistance * -1 > minNextEleTop) {
        const distanceToIdx = Math.floor((targetMovedDistance * -1) / minNextEleTop);
        const idxToSub = distanceToIdx >= list.length ? list.length - 1 : distanceToIdx;
        const insertCrit = currentIdx - idxToSub <= 0 ? 0 : currentIdx - idxToSub;
        const result = returnMoveRes({ originalLists, insertCrit, tgtIdx: currentIdx, direction: 'up'});
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
        if (isReorderActivated) {
          if (e.target !== dropRef.current) {
            const touchTgt = findCategory(e.target as HTMLElement) as HTMLElement;
            originalTouchElement.current = touchTgt;
            const originalStyles = touchTgt.children[0].getBoundingClientRect();
            originalCSS.current = window.getComputedStyle(touchTgt);
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
            originalTopCoord.current = tTop;
            endTopCoord.current = tTop;
            originalProcCoords.current.top = tTop - top;
            originalProcCoords.current.left = tLeft - left;
            const foo = Array.from(dropRef.current.children).map(foo => {
              const bar = window.getComputedStyle(foo as Element);
              const { height, marginTop, marginBottom } = bar;
              const doh = [height, marginTop, marginBottom];
              return doh.reduce((crit, add) => crit + parseInt(add, 10), 0);
            });
            fooRef.current = foo;
            dropRef.current.appendChild(cloneTgt);
          }
        }
      }}
      onTouchMove={e => {
        if (isReorderActivated) {
          if (e.target !== dropRef.current) {
            const currHeightLists = fooRef.current;
            const faa = dropRef.current.children;
            const moveTgt: HTMLElement | null = clonedElement.current as HTMLElement;
            const idxOfCurrEleInLists = Array.from(faa).slice(0, faa.length - 1).indexOf(originalTouchElement.current);
            barRef.current = idxOfCurrEleInLists;
            const first = currHeightLists?.slice(0, idxOfCurrEleInLists);
            const second = currHeightLists?.slice(idxOfCurrEleInLists + 1);
            const left: number = e.touches[0].clientX;
            const top: number = e.touches[0].clientY;
            moveTgt.style.left = left - originalProcCoords.current.left + 'px';
            moveTgt.style.top = top - originalProcCoords.current.top + 'px';
            endTopCoord.current = top;
            const crit = originalTopCoord.current - top;
            if (crit > 0) {
              // console.log('going up: ', first, barRef.current)
              if (crit > first![barRef.current - 1]) {
                barRef.current -= 1;
              }
              console.log(barRef.current)
            } else if (crit < 0) {
              console.log('going down: ', second)
            }
          }
        }
      }}
      onTouchEnd={e => {
        if (isReorderActivated) {
          if (e.target !== dropRef.current) {
            clonedElement.current!.remove();
            clonedElement.current = null;
            const originalLists: (HTMLElement | null)[] = Array.from(dropRef.current.children);
            const tgtIdx: number = originalLists.indexOf(originalTouchElement.current);
            const touchTgtMovedDistance: number = originalTopCoord.current - endTopCoord.current;
            const touchTgtHeight: number = originalTouchElement.current!.clientHeight;
            const { marginTop, marginBottom } = originalCSS.current!;
            const touchTgtMargin: number = parseInt(marginTop, 10) + parseInt(marginBottom, 10);
            let distanceToIdx: number = 0;
            let insertCrit: number = 0;
            if (touchTgtMovedDistance < 0) {
              distanceToIdx = Math.ceil(touchTgtMovedDistance / (touchTgtHeight + touchTgtMargin))
              const idxToAdd: number = distanceToIdx * -1 >= originalLists.length - 1
                ? originalLists.length - 1
                : distanceToIdx * -1;
              insertCrit = tgtIdx + idxToAdd + 1 > originalLists.length - 1
                ? originalLists.length
                : tgtIdx + idxToAdd + 1;
              const result = returnMoveRes({ originalLists, insertCrit, tgtIdx, direction: 'down'});
              setListState(result);
              dispatch(updateDropRes(result));
            } else if (touchTgtMovedDistance > 0) {
              distanceToIdx = Math.floor(touchTgtMovedDistance / (touchTgtHeight + touchTgtMargin));
              const idxToSub: number = distanceToIdx >= originalLists.length - 1
                ? originalLists.length - 1
                : distanceToIdx;
              insertCrit = tgtIdx - idxToSub <= 0 ? 0 : tgtIdx - idxToSub;
              const result = returnMoveRes({ originalLists, insertCrit, tgtIdx, direction: 'up'});
              setListState(result);
              dispatch(updateDropRes(result));
            }
          }
        }
      }}
    >
      {displayMenu(selectedCategory, listState)}
    </div>
  );
};

export default StoresList;
