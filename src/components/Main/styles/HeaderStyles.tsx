import { SetSize, StyleSet } from '../../../custom_modules/commonUtils';

export const optionsStyle = (styles: StyleSet) => {
  const { sizes } = styles;
  const setSize = sizes as unknown as SetSize;

  return (`
    @media (orientation: landscape) {
      padding: 0.26vw 1.042vw;
      ${setSize.free('80%', '2.344vw')}
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        padding: ${0.26 * 1.778}vw ${1.042 * 1.778}vw;
        ${setSize.free('80%', `${2.344 * 1.778}vw`)}
      }

      @media (max-width: 599px) {
        padding: 5px 20px;
        ${setSize.free('80%', `25px`)}
      }
    }
  `);
};

export const memStatsStyle = (styles: StyleSet, vars: string) => {
  const { sizes } = styles;

  return (`
    margin-right: calc(var(--gap-standard) * 2);
    background: var(--btn-alert);
    color: var(--white);

    @media (orientation: portrait) {
      margin-right: var(--gap-standard);
      ${
        vars === 'logout'
          ?
            `
              @media (max-width: 599px) {
                margin: 0;
                padding: 5px 20px;
                ${(sizes as unknown as SetSize).free('80%', `25px`)}
              }
            `
          :
            ''
      }
    }
  `);
};

export const searchStyleForm = (styles: StyleSet) => {
  const { border, flex, sizes } = styles;
  const setSize = sizes as unknown as SetSize;
  const flexSet = flex as StyleSet;

  return (`
    ${(sizes as StyleSet).full}
    ${(flexSet.horizontal as StyleSet).center}
    position: relative;

    input {
      ${border}
      border-color: var(--grey-dark);
      padding: 5px calc(var(--gap-multiply-small) * 1.5);
      ${setSize.free('100%')}
    }

    @media (max-width: 599px) {
      padding: 0;
      ${setSize.free('80%', `25px`)}
    }
  `);
}

export const searchStyleBtn = (styles: StyleSet, vars: Record<string, string>) => {
  const { sizes } = styles;
  const { fieldVal } = vars;
  const setSize = sizes as unknown as SetSize;

  return (`
    border: none;
    ${setSize.free('1.563vw')};
    position: absolute;
    right: calc(var(--gap-multiply-small) * 3);
    display: ${fieldVal === '' ? 'none' : 'block'};
    background: var(--white);
    color: var(--grey-dark);
    font-size: calc(var(--font-size-normal));

    :hover {
      background: none;
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        ${setSize.free(`${1.563 * 1.778}vw`)};
      }

      @media (max-width: 599px) {
        ${setSize.free(`20px`, '20px')};
        font-size: 12px;
        right: var(--gap-multiply-small);
      }
    }
  `);
}

export const headerStyle = (styles: StyleSet) => {
  const { border, flex, sizes } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return(`
    border-bottom: 0.052vw solid var(--grey-dark);
    padding: var(--gap-multiply-small) 0;
    ${(flexSet.horizontal as StyleSet).center}
    justify-content: space-between;
    ${setSize.free('100%', '2.604vw')}
    min-height: 35px;

    button {
      ${border}
      border-color: transparent;
      padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
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

    button#delete-input {
      padding: 0;
      box-shadow: none;
    }

    @media (max-width: 720px) and (orientation: landscape) {
      ${setSize.free('100%', '25px')}
      min-height: 25px;
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        border-bottom: ${0.052 * 1.778}vw solid var(--grey-dark);
        ${setSize.free('100%', `${2.604 * 1.778}vw`)}
      }

      @media (max-width: 599px) {
        border: none;
        padding: var(--gap-multiply-small) 0;
        ${setSize.free('100%', '50px')}

        button {
          padding: 5px calc(var(--gap-multiply-small) * 1.2);
          box-shadow: 0 0 3px 1px var(--grey-dark);
        }

        button#delete-input {
          padding: 0;
        }
      }
    }

    .space-divider:first-of-type {
      padding-left: 1.042vw;
      flex: 1;

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          padding-left: ${1.042 * 1.778}vw;
        }

        @media (max-width: 599px) {
          padding-left: 20px;
        }
      }

      #option {
        ${flexSet.vertical}
        ${setSize.free('auto', '1.823vw')}

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            ${setSize.free('auto', `${1.823 * 1.778}vw`)}
          }

          @media (max-width: 599px) {
            ${setSize.free('auto', `25px`)}
            font-size: 12px;
          }
        }
      }
    }

    .space-divider:nth-of-type(2) {
      flex: 1.2;
    }

    .space-divider:last-of-type {
      ${(sizes as StyleSet).full}
      ${(flexSet.horizontal as StyleSet).center}
      flex: 1;

      div {
        ${(flexSet.horizontal as StyleSet).center}
        justify-content: flex-end;
      }

      @media (orientation: portrait) and (max-width: 599px) {
        margin-right: 20px;
        flex-direction: row-reverse;
      }

      .sub-divider:first-of-type {
        flex: 1;

        button#member-info {
          // padding: 0 var(--gap-standard);

          @media (orientation: portrait) and (max-width: 599px) {
            ${setSize.free('max-content', `25px`)}
            font-size: 12px;
          }
        }
      }

      .sub-divider:last-of-type {
        padding-right: var(--gap-standard);
        flex: 1;
      }
    }

    .balloon-switch-container {
      margin-top: var(--gap-standard);
      border-radius: var(--border-rad-normal);
      box-shadow: 0 0 0.156vw 0.052vw var(--grey-dark);
      padding: calc(var(--gap-multiply-small) * 2) calc(var(--gap-multiply-small) * 3);
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--highlight-light);
      @media (orientation: portrait) and (max-width: 599px) {
        margin: calc(var(--gap-standard) / 2) 0;
        padding: 10px 20px;
        border-radius: 0.64897vw;
        ${setSize.free('80%', `30px`)}
      }

      .balloon-toggle-container {
        width: 2.865vw;
        height: 1.563vw;
        @media (orientation: portrait) and (max-width: 599px) {
          width: 30px;
          height: 15px;
        }
      }
      .balloon-toggle_button {
        width: 1.042vw;
        height: 1.042vw;
        @media (orientation: portrait) and (max-width: 599px) {
          width: 15px;
          height: 15px;
        }
      }
    }
  `);
}