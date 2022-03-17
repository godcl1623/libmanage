import React from 'react';

// props 타입 수정 필요
const TabBtn = ({ setState, stateVal, children}: any) => (
  // 파라미터 타입 확인 필요
  children.map((child: HTMLElement, childIdx: number) => (
    <button
      key={`tab_btn_${childIdx+1}`}
      onClick={e => {
        e.preventDefault();
        setState(stateVal[childIdx]);
      }}
    >
      {child}
    </button>
  ))
);

export default TabBtn;