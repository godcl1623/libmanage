import { StyleSet, SetSize } from '../../../custom_modules/commonUtils';

export const selStoresListStyle = (styles: StyleSet) => {
  const { flex, sizes } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    height: 50px;
    ${(flexSet.horizontal as StyleSet).center}
    background: var(--btn-disable);
    ${setSize.free('100%', '50px')}

    button {
      padding: 2px 7px;
      ${(flexSet.horizontal as StyleSet).center}
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

export const mainStyle = (styles: StyleSet, vars: Record<string, string>) => {
  const { flex, sizes } = styles;
  const { modalState, modalOrigin, headerHeight } = vars;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    ${setSize.free('100%', '100vh')}
    ${flexSet.vertical}
    pointer-events: ${modalState && modalOrigin === 'Library' ? 'none' : 'auto'};
    z-index: 1;
    position: relative;
    overflow: hidden;

    div#main-contents {
      ${setSize.free('100%', `calc(100% - ${headerHeight}px)`)}
      ${(flexSet.horizontal as StyleSet).center}

      @media (orientation: portrait) and (max-width: 599px) {
        ${flexSet.vertical}
      }
    }
  `);
}