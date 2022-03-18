import { StyleSet, SetSize } from '../../../custom_modules/commonUtils';

export const libBalloonDisplay = (styles: StyleSet, vars: Record<string, string>) => {
  const { flex, sizes } = styles;
  const { currDisplayType } = vars;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    margin: calc(var(--gap-multiply-small) * 2);
    ${(flexSet.horizontal as StyleSet).center}
    justify-content: space-between;
    ${setSize.free('100%')}

    * {
      margin: 0 var(--gap-multiply-small);
    }

    .balloon-header {
      flex: 1;
    }

    .btn-container {
      flex: 2;
      ${(flexSet.horizontal as StyleSet).center}
      justify-content: space-around;

      .balloon-btn {
        padding: var(--gap-multiply-small);
        cursor: pointer;
        :hover {
          -webkit-filter: brightness(90%);
                  filter: brightness(90%);
        }
      
        :active {
          -webkit-transform: scale(0.95);
              -ms-transform: scale(0.95);
                  transform: scale(0.95);
        }
      }

      .balloon-btn:first-of-type {
        background: ${currDisplayType === 'list' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
      }

      .balloon-btn:last-of-type {
        background: ${currDisplayType === 'cover' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
      }
    }

    @media (orientation: portrait) {
      @media (max-width: 599px) {
        margin: calc(var(--gap-multiply-small));
        ${setSize.free('100%')}

        * {
          margin: 0 var(--gap-multiply-small);
          font-size: 12px;
        }

        .balloon-header {
          text-align: right;
        }

        .btn-container {
          .balloon-btn {
            padding: var(--gap-multiply-small);
          }
        }
      }
    }
  `);
};

export const libBalloonInput = (styles: StyleSet) => {
  const { flex, sizes } = styles;

  return (`
    ${((flex as StyleSet).horizontal as StyleSet).center}
    ${(sizes as unknown as SetSize).free('100%')}
    p {
      font-size: var(--font-size-standard);

      @media (orientation: portrait) and (max-width: 599px) {
        font-size: 16px;
      }
    }

    input.balloon-cover_size {
      margin: calc(var(--gap-multiply-small) * 2);
      padding: 0;
      width: 100%;
      cursor: pointer;
    }
  `);
};

// vars 타입 수정 필요
export const makeListStyle = (styles: StyleSet, vars: any) => {
  const { flex } = styles;
  const { libDisplay, coverSize } = vars;

  if (libDisplay === 'list') {
    return (`
      padding: calc(var(--gap-multiply-small) * 2) calc(var(--gap-multiply-small) * 6);
      font-size: var(--font-size-normal);
      cursor: pointer;
      background: white;
  
      @media (orientation: portrait) {
        @media (max-width: 599px) {
          padding: calc(var(--gap-multiply-small) * 1.2) calc(var(--gap-multiply-small) * 3);
          width: 100%;
          font-size: 16px;
        }
      }
    `);
  }

  return (`
    margin: calc(var(--gap-multiply-small) * 2);
    height: ${coverSize}vw;
    flex: 0 0 10%;
    ${((flex as StyleSet).horizontal as StyleSet).center}
    cursor: pointer;

    :active {
      -webkit-transform: scale(0.95);
          -ms-transform: scale(0.95);
              transform: scale(0.95);
    }

    @media (orientation: portrait) and (max-width: 599px) {
      margin: 10px;
      height: ${coverSize * 2}vh;
      flex: 0 0 10%;
    }
  `);
}

export const libraryStyle = (styles: StyleSet, condition: string) => {
  const { flex, sizes } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;
  const sizeSet = sizes as StyleSet;

  return (`
    border-left: 0.052vw solid black;
    border-right: 0.052vw solid black;
    padding: calc(var(--gap-standard) * 2) var(--gap-standard);
    flex: 2;
    overflow: hidden;
    ${sizeSet.full}
    position: relative;
    background: white;

    @media (orientation: portrait) {
      @media (max-width: 599px) {
        border: none;
        padding: calc(var(--gap-standard) * 1.5) 0;
      }
    }

    button.option {
      ${flexSet.vertical}
      position: absolute;
      right: 1.563vw;
      ${setSize.free('2.604vw', '1.823vw')}
      z-index: 1;
      cursor: pointer;
      :hover {
        -webkit-filter: brightness(90%);
                filter: brightness(90%);
      }
    
      :active {
        -webkit-transform: scale(0.98);
            -ms-transform: scale(0.98);
                transform: scale(0.98);
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          right: ${1.563 * 1.778}vw;
          ${setSize.free(`${2.604 * 1.778}vw`, `${1.823 * 1.778}vw`)}
        }

        @media (max-width: 599px) {
          top: 0;
          right: 0;
          ${setSize.free('50px', '35px')}
          opacity: 70%;
        }
      }
    }

    ul#contents-lists {
      display: ${condition === 'cover' ? 'flex' : 'inline-block'};
      ${sizeSet.full}
      flex-wrap: wrap;
      overflow-y: scroll;

      @media (orientation: portrait) and (max-width: 599px) {
        ${(flexSet.horizontal as StyleSet).center}
        justify-content: ${condition === 'list' ? 'flex-start' : 'center'};
      }
    }
  `);
};