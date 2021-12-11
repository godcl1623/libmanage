export const libBalloonDisplay = (styles, vars) => {
  const { flex, sizes } = styles;
  const { currDisplayType } = vars;

  return (`
    margin: calc(var(--gap-multiply-small) * 2);
    ${flex.horizontal.center}
    justify-content: space-between;
    ${sizes.free('100%')}

    * {
      margin: 0 var(--gap-multiply-small);
    }

    .balloon-header {
      flex: 1;
    }

    .btn-container {
      flex: 2;
      ${flex.horizontal.center}
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
        ${sizes.free('100%')}

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

export const libBalloonInput = styles => {
  const { flex, sizes } = styles;

  return (`
    ${flex.horizontal.center}
    ${sizes.free('100%')}
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

export const makeListStyle = (styles, vars) => {
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
    ${flex.horizontal.center}
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

export const libraryStyle = (styles, condition) => {
  const { flex, sizes } = styles;

  return (`
    border-left: 0.052vw solid black;
    border-right: 0.052vw solid black;
    padding: calc(var(--gap-standard) * 2) var(--gap-standard);
    flex: 2;
    overflow: hidden;
    ${sizes.full}
    position: relative;
    background: white;

    @media (orientation: portrait) {
      @media (max-width: 599px) {
        border: none;
        padding: calc(var(--gap-standard) * 1.5) 0;
      }
    }

    button.option {
      ${flex.vertical}
      position: absolute;
      right: 1.563vw;
      ${sizes.free('2.604vw', '1.823vw')}
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
          ${sizes.free(`${2.604 * 1.778}vw`, `${1.823 * 1.778}vw`)}
        }

        @media (max-width: 599px) {
          top: 0;
          right: 0;
          ${sizes.free('50px', '35px')}
          opacity: 70%;
        }
      }
    }

    ul#contents-lists {
      display: ${condition === 'cover' ? 'flex' : 'inline-block'};
      ${sizes.full}
      flex-wrap: wrap;
      overflow: scroll;

      @media (orientation: portrait) and (max-width: 599px) {
        ${flex.horizontal.center}
        justify-content: ${condition === 'list' ? 'flex-start' : 'center'};
      }
    }
  `);
};