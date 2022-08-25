const TabBtn = ({ setState, stateVal, children}: any) => (
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