import React, { useRef } from 'react';

type CoordsObject = Record<string, number>;

type MoveResIdxs = {
  originalLists: (HTMLElement | null)[];
  insertCrit: number;
  tgtIdx: number;
  direction: string;
};

const returnMoveRes = (moveResIdxs: MoveResIdxs): string[] => {
  const { originalLists, insertCrit, tgtIdx, direction } = moveResIdxs;
  const front = originalLists.slice(0, insertCrit);
  const back = originalLists.slice(insertCrit);
  const moveItem =
    direction === 'down'
      ? front.splice(front.indexOf(originalLists[tgtIdx]), 1)[0]
      : back.splice(back.indexOf(originalLists[tgtIdx]), 1)[0];
  back.unshift(moveItem);
  return [...front, ...back].map(ele => (ele as HTMLElement).classList[1]);
};

export default function useTouchDnd(styleOptions?: any): any[] {
  const originalTouchElement = useRef<HTMLElement | null>(null);
  const clonedElement = useRef<HTMLElement | null>(null);
  const originalCSS = useRef<CSSStyleDeclaration | null>(null);
  const originalTopCoord = useRef<number>(0);
  const originalProcCoords = useRef<CoordsObject>({});
  const endTopCoord = useRef<number>(0);
  const fooRef = useRef<number[] | null>(null);

  const sumAfterParse = (...args: string[]): any => {
    return args
      .map((size: string) => parseInt(size, 10))
      .reduce((init: number, add: number) => init + add, 0);
  };

  const makeTouchTgtClone = (
    touchEvt: React.TouchEvent,
    touchTgt: HTMLElement,
    dropTgt: HTMLElement
  ): void => {
    originalTouchElement.current = touchTgt;
    const originalStyles = originalTouchElement.current.children[0].getBoundingClientRect();
    originalCSS.current = window.getComputedStyle(originalTouchElement.current);
    const { left, top, height, width } = originalStyles;
    const { marginTop, marginBottom, background } = originalCSS.current;
    const { height: h } = window.getComputedStyle(originalTouchElement.current.children[0]);
    const { clientX: tLeft, clientY: tTop } = touchEvt.touches[0];
    const cloneTgt = originalTouchElement.current.cloneNode(true) as HTMLElement;
    if (
      styleOptions &&
      styleOptions.cloneTgtStyle &&
      Object.values(styleOptions.cloneTgtStyle).length !== 0
    ) {
      cloneTgt.style.width = styleOptions.width;
      cloneTgt.style.height = styleOptions.height;
      cloneTgt.style.position = styleOptions.position;
      cloneTgt.style.left = styleOptions.left;
      cloneTgt.style.top = styleOptions.top;
      cloneTgt.style.opacity = styleOptions.opacity;
      cloneTgt.style.background = styleOptions.background;
    } else {
      cloneTgt.style.width = width + 'px';
      cloneTgt.style.height = height + 'px';
      cloneTgt.style.position = 'absolute';
      cloneTgt.style.left = left + 'px';
      cloneTgt.style.top = top + 'px';
      cloneTgt.style.opacity = '0.5';
      cloneTgt.style.background = background;
    }
    clonedElement.current = cloneTgt;
    originalTopCoord.current = tTop;
    endTopCoord.current = tTop;
    originalProcCoords.current.top = tTop - top;
    originalProcCoords.current.left = tLeft - left;
    fooRef.current = [sumAfterParse(marginTop, marginBottom, h)];
    dropTgt.appendChild(cloneTgt);
  };

  const trackClonedTgt = (touchEvt: React.TouchEvent): void => {
    const moveTgt: HTMLElement | null = clonedElement.current as HTMLElement;
    const left: number = touchEvt.touches[0].clientX;
    const top: number = touchEvt.touches[0].clientY;
    moveTgt.style.left = left - originalProcCoords.current.left + 'px';
    moveTgt.style.top = top - originalProcCoords.current.top + 'px';
    endTopCoord.current = top;
  };

  const highlightDragItem = (touchEvt: React.TouchEvent, dropTgt: HTMLElement): void => {
    const draggableTgtLists = Array.from(dropTgt.children).slice(0, dropTgt.children.length - 1);
    const top: number = touchEvt.touches[0].clientY;
    const crit = originalTopCoord.current - top;
    const currIdx = draggableTgtLists.indexOf(originalTouchElement.current as HTMLElement);
    const styleConditions =
      styleOptions &&
      styleOptions.highlightStyles &&
      Object.values(styleOptions.highlightStyles).length !== 0;
    if (crit > 0) {
      const movedDistanceToIdx =
        Math.floor(crit / fooRef.current![0]) >= draggableTgtLists.length
          ? draggableTgtLists.length - 1
          : Math.floor(crit / fooRef.current![0]);
      draggableTgtLists
        .slice(0, currIdx + 1)
        .reverse()
        .forEach((currEle, idx) => {
          (currEle as HTMLElement).style.transition = styleConditions
            ? styleOptions.highlightStyles.transition
            : 'box-shadow 0.3s';
          if (idx === movedDistanceToIdx) {
            (currEle as HTMLElement).style.boxShadow = styleConditions
              ? styleOptions.highlightStyles.currEleBoxShadow
              : '0 0 20px 5px skyblue';
            (dropTgt.children[0] as HTMLElement).style.boxShadow = styleConditions
              ? styleOptions.highlightStyles.dropTgtBoxShadow
              : '0 0 20px 5px skyblue';
          } else {
            (currEle as HTMLElement).style.boxShadow = styleConditions
              ? styleOptions.highlightStyles.exceptionsBoxShadow
              : 'none';
          }
        });
    } else if (crit < 0) {
      const movedDistanceToIdx =
        Math.floor((crit * -1) / fooRef.current![0]) >= draggableTgtLists.length
          ? draggableTgtLists.length - 1
          : Math.floor((crit * -1) / fooRef.current![0]);
      draggableTgtLists.slice(currIdx).forEach((currEle, idx) => {
        (currEle as HTMLElement).style.transition = styleConditions
          ? styleOptions.highlightStyles.transition
          : 'box-shadow 0.3s';
        if (idx === movedDistanceToIdx) {
          (currEle as HTMLElement).style.boxShadow = styleConditions
            ? styleOptions.highlightStyles.currEleBoxShadow
            : '0 0 20px 5px skyblue';
          (dropTgt.children[dropTgt.children.length - 1] as HTMLElement).style.boxShadow =
            styleConditions
              ? styleOptions.highlightStyles.dropTgtBoxShadow
              : '0 0 20px 5px skyblue';
        } else {
          (currEle as HTMLElement).style.boxShadow = styleConditions
            ? styleOptions.highlightStyles.exceptionsBoxShadow
            : 'none';
        }
      });
    }
  };

  return [makeTouchTgtClone, trackClonedTgt, highlightDragItem];
}
