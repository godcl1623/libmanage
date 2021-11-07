import React from 'react';

const TabBtn = ({ setState, stateVal, children}) => (
  children.map((child, childIdx) => (
    <button
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