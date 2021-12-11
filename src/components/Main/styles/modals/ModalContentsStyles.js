export const headerModalStyles = (styles, condition) => {
  const { sizes, flex } = styles;

  return (`
    padding: calc(var(--gap-standard) * 2) var(--gap-standard);
    ${sizes.full}
    ${flex.vertical}
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
      ${sizes.free('100%')};
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
      ${flex.horizontal.center}
      ${sizes.free('100%')};
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
          ${sizes.free('100%')};
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

export const metaModalStyles = styles => {
  const { sizes, flex } = styles;

  return (`
    padding: calc(var(--gap-standard) * 2);
    ${sizes.full}
    ${flex.vertical}
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
      ${flex.vertical}
      ${sizes.free('1.667vw', '1.667vw')}

      svg {
        font-size: 1.667vw;
      }

      @media (max-width: 720px) {
        top: 0;
        right: -20px;
        ${sizes.free('16px', '16px')}

        svg {
          font-size: 32px;
        }
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          top: -${1.667 * 1.778}vw;
          right: -${1.667 * 1.778}vw;
          ${sizes.free(`${1.667 * 1.778}vw`, `${1.667 * 1.778}vw`)}

          svg {
            font-size: ${1.667 * 1.778}vw;
          }
        }

        @media (max-width: 599px) {
          top: 10px;
          right: 50%;
          transform: translateX(50%);
          ${sizes.free('32px', '32px')}
          opacity: 50%;
          z-index: 9;

          svg {
            font-size: 32px;
          }
        }
      }
    }

    div.contents-wrapper {
      ${sizes.full}

      img {
        ${sizes.full}
        color: white;
      }

      div.btn-wrapper {
        ${sizes.free('calc(100% - 4.167vw)', 'calc(100% - 4.167vw)')}
        ${flex.horizontal.center}
        justify-content: space-between;
        position: absolute;
        top: calc(var(--gap-standard) * 2);
        left: calc(var(--gap-standard) * 2);

        span {
          ${flex.vertical}
          ${sizes.free('15%', '100%')}
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
            ${sizes.free(
              `calc(100% - ${4.167 * 1.778}vw)`,
              `calc(100% - ${4.167 * 1.778}vw)`
            )}

            span {
              font-size: ${5.208 * 1.778}vw;
            }
          }

          @media (max-width: 599px) {
            ${sizes.free('calc(100% - 20px)', 'calc(100% - 20px)')}
            top: 10px;
            left: 10px;

            span {
              ${sizes.free('15%', '100%')}
              font-size: 50px;
            }
          }
        }
      }
    }
  `);
};

export const defaultContentsStyle = styles => {
  const { flex, sizes } = styles;

  return (`
    margin: 10.417vw;
    pointer-events: none;
    ${flex.vertical}
    ${sizes.full}

    @media (orientation: portrait) and (max-width: 599px) {
      margin: 70px 0;
    }
  `);
}