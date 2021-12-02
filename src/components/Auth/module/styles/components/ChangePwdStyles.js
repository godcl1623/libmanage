const changePwdStyles = (styles, vars) => {
  const { sizes, flex, border } = styles;
  const { isValid, pwdMatch } = vars;

  return (
    `
      border-radius: var(--border-rad-big);
      padding: calc(var(--gap-standard) * 2);
      background: white;
      ${sizes.free('40%', 'max-content')}
      ${flex.vertical}
      justify-content: space-between;

      .input-wrapper {
        ${flex.vertical}
        align-items: flex-start;
        ${sizes.free('100%')}
        font-size: var(--font-size-normal);

        * {
          ${sizes.free('100%')}
        }

        input {
          margin: calc(var(--gap-multiply-small) * 2) 0;
          ${border}
          border-color: var(--grey-dark);
        }

        .verify-error {
          margin-bottom: calc(var(--gap-multiply-big) * 2);
          color: red;
          font-weight: bold;
        }

        .verify-error#input-pwd {
          opacity: ${isValid ? '0' : '100%'};
        }

        .verify-error#input-pwd-check {
          opacity: ${pwdMatch ? '0' : '100%'};
        }
      }

      .submit-wrapper {
        ${flex.horizontal.center}
        ${sizes.free('100%', '2.604vw')}

        button:first-of-type {
          margin-right: var(--gap-multiply-small);
          background: var(--btn-active);
        }

        button:last-of-type {
          margin-left: var(--gap-multiply-small);
          background: var(--btn-active);
        }
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          ${sizes.free('60%', 'max-content')}

          .submit-wrapper {
            ${sizes.free('100%', `${2.604 * 1.778}vw`)}

            button:first-of-type {
              margin-right: calc(var(--gap-multiply-small) * 2);
            }

            button:last-of-type {
              margin-left: calc(var(--gap-multiply-small) * 2);
            }
          }
        }

        @media (max-width: 599px) {
          border-radius: 10px;
          padding: 20px;
          ${sizes.free('90%', 'max-content')}

          .input-wrapper {
            font-size: 16px;

            input {
              margin: 20px 0;;
              padding: 5px 10px;
              font-size: 14px;
            }

            .verify-error {
              margin-bottom: 20px;
              font-size: 14px;
            }
          }

          .submit-wrapper {
            ${sizes.free('100%', '30px')}
            button {
              font-size: 13px;
            }

            button:first-of-type {
              margin-right: var(--gap-multiply-small);
            }

            button:last-of-type {
              margin-left: var(--gap-multiply-small);
            }
          }
        }
      }
    `
  );
};

export default changePwdStyles;