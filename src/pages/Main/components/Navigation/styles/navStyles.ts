import { StyleSet, SetSize } from 'custom_modules/commonUtils';

export const storesListStyle = (styles: StyleSet) => {
  const { sizes } = styles;
  const setSize = sizes as unknown as SetSize;

  return (`
    .select-all-btn {
      border-radius: var(--border-rad-normal);
      ${setSize.free('calc(var(--gap-multiply-big) * 2)', 'var(--gap-multiply-big)')}
      display: inline-block;
      text-align: center;
      font-size: var(--font-size-standard);
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

      @media (orientation: portrait) and (max-width: 599px) {
        ${setSize.free('60px', '20px')}
        font-size: 12px;
      }
    }

    .store-list-item {
      cursor: pointer;
      background: white;
      :hover {
        -webkit-filter: brightness(90%);
                filter: brightness(90%);
      }
    
      :active {
        -webkit-filter: brightness(70%);
                filter: brightness(70%);
      }
    }
  `);
};

export const navStyle = (styles: StyleSet) => {
  const { sizes, flex, border } = styles;
  const sizeSet = sizes as StyleSet;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    padding: var(--gap-standard);
    flex: 1;
    ${sizeSet.full}
    background: white;

    .category {
      margin-bottom: calc(var(--gap-multiply-big) * 2);
    }

    .category-header {
      border: 0.208vw solid var(--grey-dark);
      padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 2);
      ${(flexSet.horizontal as StyleSet).center}
      ${sizeSet.full}
    }

    h2 {
      width: 100%;
    }

    p {
      ${border}
      border-color: var(--grey-dark);
      padding: var(--gap-multiply-small);
      font-size: var(--font-size-normal);
      padding-left: var(--gap-standard);
    }

    #category-type {
      ${border}
      border-color: var(--grey-dark);
      padding: 0.156vw 0.781vw;
      font-size: var(--font-size-normal);
      ${setSize.free('100%')}
      background: var(--white);
      cursor: pointer;
      touch-action: none;

      option {
        font-size: var(--font-size-standard);
      }
    }

    @media (orientation: portrait) {
      #category-type {
        padding: ${0.156 * 1.778}vw ${0.781 * 1.778}vw;
      }

      @media (min-width: 600px) {
        .category-header {
          border: ${0.208 * 1.778}vw solid black;
        }
      }

      @media (max-width: 599px) {
        padding: var(--gap-standard);
        ${sizeSet.full}
        background: white;

        * {
          font-size: 16px;
        }

        .category-header {
          border: 2px solid black;
        }

        .category {
          margin-bottom: calc(var(--gap-multiply-big) * 2);
        }

        p {
          ${border}
          padding: var(--gap-multiply-small);
          font-size: 14px;
          padding-left: var(--gap-standard);
        }

        button {
          font-size: 12px;
        }

        #category-type {
          font-size: 16px;

          option {
            font-size: 16px;
          }
        }
      }
    }
  `);
};