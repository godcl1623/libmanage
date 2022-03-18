import { StyleSet, SetSize } from '../../../../custom_modules/commonUtils';

// 파라미터 타입 체크 필요
export const headerModalStyles = (styles: StyleSet, condition: boolean) => {
  const { sizes, flex } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    padding: calc(var(--gap-standard) * 2) var(--gap-standard);
    ${(sizes as StyleSet).full}
    ${flexSet.vertical}
    align-items: flex-start;
    position: relative;

    h1 {
      margin-left: calc(var(--gap-standard) * 2);
      margin-bottom: calc(var(--gap-standard) / 2);
      font-size: calc(var(--font-size-normal) * 2);
    }

    h2,
    button {
      font-size: 1.563vw;
    }

    hr {
      margin-bottom: calc(var(--gap-standard) * 2);
      ${setSize.free('100%')};
    }

    p {
      bottom: 1.563vw;
      font-size: var(--font-size-standard);
      width: 100%;
      text-align: center;
    }

    .store_container {
      margin-bottom: 5.208vw;
      padding: 0 4.167vw;
      padding-bottom: calc(var(--gap-standard) / 2);
      ${(flexSet.horizontal as StyleSet).center}
      ${setSize.free('100%')};
      justify-content: space-between;

      button {
        padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
        background: ${condition ? 'none' : 'var(--btn-alert)'};
        color: ${condition ? 'var(--grey-dark)' : 'var(--white)'};
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        h2,
        button {
          font-size: ${1.563 * 1.778}vw;
        }

        p {
          bottom: ${1.563 * 1.778}vw;
        }

        .store_container {
          padding: 0 ${4.167 * 1.778}vw;
        }
      }

      @media (max-width: 599px) {
        padding: calc(var(--gap-standard) * 2) var(--gap-standard);

        h1 {
          margin: 0;
          margin-bottom: 15px;
          font-size: 32px;
          width: 100%;
          text-align: center;
        }

        h2 {
          font-size: 16px;
        }

        hr {
          margin-bottom: calc(var(--gap-standard) * 2);
          ${setSize.free('100%')};
        }

        p {
          font-size: 14px;
        }

        .store_container {
          margin-bottom: 100px;
          padding: 0 15px;
          padding-bottom: 20px;

          button {
            padding: 5px 10px;
            font-size: 12px;
          }
        }
      }
    }
  `);
};

export const metaModalStyles = (styles: StyleSet) => {
  const { sizes, flex } = styles;
  const setSize = sizes as unknown as SetSize;
  const flexSet = flex as StyleSet;
  const sizeSet = sizes as StyleSet;

  return (`
    padding: calc(var(--gap-standard) * 2);
    ${sizeSet.full}
    ${flexSet.vertical}
    position: relative;

    @media (orientation: portrait) and (max-width: 599px) {
      padding: 10px;
    }

    span.modal-close {
      border-radius: 50%;
      position: absolute;
      top: -1.667vw;
      right: -1.667vw;
      cursor: pointer;
      background: white;
      ${flexSet.vertical}
      ${setSize.free('1.667vw', '1.667vw')}

      svg {
        font-size: 1.667vw;
      }

      @media (max-width: 720px) {
        top: 0;
        right: -20px;
        ${setSize.free('16px', '16px')}

        svg {
          font-size: 32px;
        }
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          top: -${1.667 * 1.778}vw;
          right: -${1.667 * 1.778}vw;
          ${setSize.free(`${1.667 * 1.778}vw`, `${1.667 * 1.778}vw`)}

          svg {
            font-size: ${1.667 * 1.778}vw;
          }
        }

        @media (max-width: 599px) {
          top: 10px;
          right: 50%;
          transform: translateX(50%);
          ${setSize.free('32px', '32px')}
          opacity: 50%;
          z-index: 9;

          svg {
            font-size: 32px;
          }
        }
      }
    }

    div.contents-wrapper {
      ${sizeSet.full}

      img {
        ${sizeSet.full}
        color: white;
      }

      div.btn-wrapper {
        ${setSize.free('calc(100% - 4.167vw)', 'calc(100% - 4.167vw)')}
        ${(flexSet.horizontal as StyleSet).center}
        justify-content: space-between;
        position: absolute;
        top: calc(var(--gap-standard) * 2);
        left: calc(var(--gap-standard) * 2);

        span {
          ${flexSet.vertical}
          ${setSize.free('15%', '100%')}
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          color: white;
          font-size: 5.208vw;
          text-weight: 900;
          transition: all 0.3s;

          * {
            color: white;
          }

          :hover {
            opacity: 100%;
            cursor: pointer;
          }

          :active {
            -webkit-filter: brightness(0.3);
            filter: brightness(0.3);
          }
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            ${setSize.free(
              `calc(100% - ${4.167 * 1.778}vw)`,
              `calc(100% - ${4.167 * 1.778}vw)`
            )}

            span {
              font-size: ${5.208 * 1.778}vw;
            }
          }

          @media (max-width: 599px) {
            ${setSize.free('calc(100% - 20px)', 'calc(100% - 20px)')}
            top: 10px;
            left: 10px;

            span {
              ${setSize.free('15%', '100%')}
              font-size: 50px;
            }
          }
        }
      }
    }
  `);
};

export const defaultContentsStyle = (styles: StyleSet) => {
  const { flex, sizes } = styles;

  return (`
    margin: 10.417vw;
    pointer-events: none;
    ${(flex as StyleSet).vertical}
    ${(sizes as StyleSet).full}

    @media (orientation: portrait) and (max-width: 599px) {
      margin: 70px 0;
    }
  `);
};

// 파라미터 타입 체크 필요
export const offlineHeaderModalStyle = (styles: StyleSet, condition: string) => {
  const { flex, sizes, border } = styles;
  const flexSet = flex as StyleSet;
  const sizeSet = sizes as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    #offline-contents-wrapper {
      ${sizeSet.full}

      #offline-tab-wrapper {
        ${setSize.free('100%', 'max-content')}
        ${(flexSet.horizontal as StyleSet).center}
        justify-content: flex-start;

        button {
          ${border}
          border-bottom: none;
          padding: 5px 20px;
          ${setSize.free('auto', '100%')}
          font-size: var(--font-size-standard);
          box-shadow: none;

          :hover {
            -webkit-filter: brightness(90%);
            filter: brightness(90%);
          }

          :active {
            -webkit-filter: brightness(60%);
            filter: brightness(60%);
          }
        }

        button:first-of-type {
          border-right: none;
          border-radius: var(--border-rad-normal) 0 0 0;
          background: ${condition === 'import' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
        }

        button:last-of-type {
          border-radius: 0 var(--border-rad-normal) 0 0;
          background: ${condition === 'export' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
        }
      }

      #offline-form-wrapper {
        ${sizeSet.full}
        // ${border}

        #offline-import-wrapper {
          ${sizeSet.full}
        }

        #offline-export-wrapper {
          ${setSize.free('100%', '200px')}
          ${flexSet.vertical}
        }
      }
    }

    form {
      ${sizeSet.full}
      ${flexSet.vertical}
      justify-content: space-around;
    }

    .input-wrapper {
      margin-top: calc(var(--gap-standard) * 1.5);
      padding: 0 var(--gap-standard);
      ${(flexSet.horizontal as StyleSet).center}
      width: 100%;

      label {
        width: 20%;
        text-align: center;
      }

      select, input[type=text] {
        width: 80%;
        font-size: var(--font-size-standard);
      }

      option {
        font-size: var(--font-size-standard);
      }

      @media (orientation: landscape) and (max-width: 799px) {
        label {
          font-size: 12px;
        }

        select, input[type=text] {
          font-size: 12px;
        }
      }

      @media (orientation: portrait) and (max-width: 599px) {
        padding: 0;

        label {
          font-size: 14px;
          width: 30%;
        }

        select, input[type=text] {
          padding: 5px 10px;
          width: 60%;
          font-size: 12px;
        }
      }
    }

    .submit-wrapper {
      margin-top: calc(var(--gap-standard) * 1.5);
      width: 100%;
      ${(flexSet.horizontal as StyleSet).center}

      button {
        ${border}
        font-size: var(--font-size-normal);
        box-shadow: none;
      }
    }

    .submit-wrapper button:first-of-type {
      margin-right: var(--gap-multiply-small);
    }

    .submit-wrapper button:last-of-type {
      margin-left: var(--gap-multiply-small);
    }
  `);
};