export const selStoresListStyle = styles => {
  const { flex, sizes } = styles;

  return (`
    height: 50px;
    ${flex.horizontal.center}
    background: var(--btn-disable);
    ${sizes.free('100%', '50px')}

    button {
      padding: 2px 7px;
      ${flex.horizontal.center}
      height: 20px;
      background: red;
      color: white;
      font-size: 14px;
    }

    button:after {
      content: '×';
      margin-left: 10px;
      color: white;
    }
  `);
}

export const mainStyle = (styles, vars) => {
  const { flex, sizes } = styles;
  const { modalState, modalOrigin, headerHeight } = vars;

  return (`
    ${sizes.free('100%', '100vh')}
    ${flex.vertical}
    pointer-events: ${modalState && modalOrigin === 'Library' ? 'none' : 'auto'};
    z-index: 1;
    position: relative;
    overflow: hidden;

    div#main-contents {
      ${sizes.free('100%', `calc(100% - ${headerHeight}px)`)}
      ${flex.horizontal.center}

      @media (orientation: portrait) and (max-width: 599px) {
        ${flex.vertical}
      }
    }
  `);
}