import React, { useState } from 'react';

type FindCategory = HTMLElement | ((param: HTMLElement) => HTMLElement) | undefined;
// 터치 사용

type CoordsObject = Record<string, number>; // 터치 사용

type MoveResIdxs = {
  originalLists: (HTMLElement | null)[];
  insertCrit: number;
  tgtIdx: number;
  direction: string;
}; // 터치 사용

function findCategory(ele: HTMLElement, findTgt: string): FindCategory {
  if (ele.classList.contains(findTgt)) {
    return ele;
  } else if (ele.parentElement) {
    return findCategory(ele.parentElement, findTgt);
  }
} // 터치 사용

function sumAfterParse(...args: string[]): any {
  return args
    .map((size: string) => parseInt(size, 10))
    .reduce((init: number, add: number) => init + add, 0);
} // 터치 사용

function returnMoveRes(moveResIdxs: MoveResIdxs): string[] {
  const { originalLists, insertCrit, tgtIdx, direction } = moveResIdxs;
  const front = originalLists.slice(0, insertCrit);
  const back = originalLists.slice(insertCrit);
  const moveItem =
    direction === 'down'
      ? front.splice(front.indexOf(originalLists[tgtIdx]), 1)[0]
      : back.splice(back.indexOf(originalLists[tgtIdx]), 1)[0];
  back.unshift(moveItem);
  return [...front, ...back].map(ele => (ele as HTMLElement).classList[1]);
} // 터치 사용

export default function useTouchDnd(originalTouchElement: HTMLElement | null): any[] {
  return ['foo'];
}