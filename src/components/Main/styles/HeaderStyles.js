export const optionsStyle = styles => {
  const { sizes } = styles;

  return (`
    @media (orientation: landscape) {
      padding: 0.26vw 1.042vw;
      ${sizes.free('80%', '2.344vw')}
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        padding: ${0.26 * 1.778}vw ${1.042 * 1.778}vw;
        ${sizes.free('80%', `${2.344 * 1.778}vw`)}
      }

      @media (max-width: 599px) {
        padding: 5px 20px;
        ${sizes.free('80%', `25px`)}
      }
    }
  `);
};

export const memStatsStyle = (styles, vars) => {
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
                ${sizes.free('80%', `25px`)}
              }
            `
          :
            ''
      }
    }
  `);
};

export const searchStyleForm = styles => {
  const { border, flex, sizes } = styles;

  return (`
    ${sizes.full}
    ${flex.horizontal.center}
    position: relative;

    input {
      ${border}
      border-color: var(--grey-dark);
      padding: 5px calc(var(--gap-multiply-small) * 1.5);
      ${sizes.free('100%')}
    }

    @media (max-width: 599px) {
      padding: 0;
      ${sizes.free('80%', `25px`)}
    }
  `);
}

export const searchStyleBtn = (styles, vars) => {
  const { sizes } = styles;
  const { fieldVal } = vars;

  return (`
    border: none;
    ${sizes.free('1.563vw')};
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
        ${sizes.free(`${1.563 * 1.778}vw`)};
      }

      @media (max-width: 599px) {
        ${sizes.free(`20px`, '20px')};
        font-size: 12px;
        right: var(--gap-multiply-small);
      }
    }
  `);
}

export const headerStyle = styles => {
  const { border, flex, sizes } = styles;

  return(`
    border-bottom: 0.052vw solid var(--grey-dark);
    padding: var(--gap-multiply-small) 0;
    ${flex.horizontal.center}
    justify-content: space-between;
    ${sizes.free('100%', '2.604vw')}
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

    @media (max-width: 720px) and (orientation: landscape) {
      ${sizes.free('100%', '25px')}
      min-height: 25px;
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        border-bottom: ${0.052 * 1.778}vw solid var(--grey-dark);
        ${sizes.free('100%', `${2.604 * 1.778}vw`)}
      }

      @media (max-width: 599px) {
        border: none;
        padding: var(--gap-multiply-small) 0;
        ${sizes.free('100%', '50px')}

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
        ${flex.vertical}
        ${sizes.free('auto', '1.823vw')}

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            ${sizes.free('auto', `${1.823 * 1.778}vw`)}
          }

          @media (max-width: 599px) {
            ${sizes.free('auto', `25px`)}
            font-size: 12px;
          }
        }
      }
    }

    .space-divider:nth-of-type(2) {
      flex: 1.2;
    }

    .space-divider:last-of-type {
      ${sizes.full}
      ${flex.horizontal.center}
      flex: 1;

      div {
        ${flex.horizontal.center}
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
            ${sizes.free('max-content', `25px`)}
            font-size: 12px;
          }
        }
      }

      .sub-divider:last-of-type {
        padding-right: var(--gap-standard);
        flex: 1;
      }
    }
  `);
}