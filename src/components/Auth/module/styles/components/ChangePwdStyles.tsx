import { StyleSet, SetSize } from '../../../../../custom_modules/commonUtils';

const changePwdStyles = (styles: StyleSet, vars: Record<string, boolean>) => {
  const { sizes, flex, border } = styles;
  const { isValid, pwdMatch } = vars;
  const setSize = sizes as unknown as SetSize;
  const flexSet = flex as StyleSet;

  return (
    `
      border-radius: var(--border-rad-big);
      padding: calc(var(--gap-standard) * 2);
      background: white;
      ${setSize.free('40%', 'max-content')}
      ${flexSet.vertical}
      justify-content: space-between;

      .input-wrapper {
        ${flexSet.vertical}
        align-items: flex-start;
        ${setSize.free('100%')}
        font-size: var(--font-size-normal);

        * {
          ${setSize.free('100%')}
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
        ${(flexSet.horizontal as StyleSet).center}
        ${setSize.free('100%', '2.604vw')}

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
          ${setSize.free('60%', 'max-content')}

          .submit-wrapper {
            ${setSize.free('100%', `${2.604 * 1.778}vw`)}

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
          ${setSize.free('90%', 'max-content')}

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
            ${setSize.free('100%', '30px')}
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