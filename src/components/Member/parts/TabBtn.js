import React from 'react';

const TabBtn = ({ setState, stateVal, children}) => (
  children.map((child, childIdx) => (
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