const modalBgStyle = vars => {
  const { display, origin } = vars;

  return (`
    display: ${display};
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: ${origin === 'Library' ? 'none' : 'auto'};
  `);
};

export default modalBgStyle;