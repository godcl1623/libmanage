import { StyleSet, SetSize } from '../../../../custom_modules/commonUtils';

const findStyles = (styles: StyleSet, vars: StyleSet): string => {
  const { border, flex, sizes } = styles;
  const { tabState } = vars;
  const setSize = sizes as unknown as SetSize;
  const flexSet = flex as StyleSet;
  const sizeSet = sizes as StyleSet;

  return (
    `
      margin: var(--gap-standard) 0;
      padding: var(--gap-standard);
      border-radius: var(--border-rad-big);
      ${flexSet.vertical}
      ${setSize.free('40vw', 'max-content')}
      background: white;

      .contents-wrapper {
        ${flexSet.vertical}
        ${sizeSet.full}
      }

      .tab-wrapper {
        ${(flexSet.horizontal as StyleSet).center}
        justify-content: flex-start;
        ${setSize.free('100%')}
      }

      .tab-wrapper a {
        ${border}
        border-color: var(--btn-disable);
        border-bottom: none;
        border-radius: 0.365vw;
        ${setSize.free('20%', '1.563vw')}
        font-size: 0.938vw;
        ${(flexSet.horizontal as StyleSet).center}
        text-decoration: none;
      
        :hover {
          -webkit-filter: brightness(90%);
                  filter: brightness(90%);
        }
      
        :active {
          -webkit-transform: scale(0.98);
              -ms-transform: scale(0.98);
                  transform: scale(0.98);
        }
      }

      .tab-wrapper a#find_id {
        border-right: none;
        border-radius: var(--border-rad-big) 0 0 0;
        background: ${tabState === 'id' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
      }
      
      .tab-wrapper a#find_pwd {
        border-radius: 0 var(--border-rad-big) 0 0;
        background: ${tabState === 'pwd' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
      }

      .form-wrapper {
        border-radius: 0 var(--border-rad-big) var(--border-rad-big);
        ${flexSet.vertical}
        ${setSize.free('100%', 'max-content')}
      }

      .form-wrapper form {
        ${sizeSet.full}
      }
      
      .form-wrapper .input-wrapper {
        margin-bottom: 4.167vw;
        ${border}
        border-color: var(--btn-disable);
        padding: 1.042vw 0.521vw;
        ${flexSet.vertical}
        ${setSize.free('100%', 'max-content')}
        font-size: var(--font-size-normal);
      }
      
      .form-wrapper .input-wrapper > div {
        margin-bottom: 4.167vw;
        ${flexSet.vertical}
        align-items: flex-start;
        ${setSize.free('100%')}
      }

      .form-wrapper .input-wrapper > div:last-of-type {
        margin-bottom: 0;
      }

      .form-wrapper .input-wrapper > div label {
        margin-bottom: 0.521vw;
        ${setSize.free('30%')}
      }

      .form-wrapper .input-wrapper > div input {
        ${border}
        border-color: var(--grey-dark);
        ${setSize.free('100%')}
      }

      .form-wrapper .submit-wrapper {
        ${(flexSet.horizontal as StyleSet).center}
        ${setSize.free('100%', '2.604vw')}
      }

      .form-wrapper .submit-wrapper button:first-of-type {
        margin-right: 0.26vw;
        background: var(--btn-active);
      }

      .form-wrapper .submit-wrapper button:last-of-type {
        margin-left: 0.26vw;
        background: var(--btn-active);
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          ${setSize.free(`${40 * 1.778}vw`, 'max-content')}

          .tab-wrapper a {
            border-radius: ${0.365 * 1.778}vw;
            ${setSize.free('20%', `${1.563 * 1.778}vw`)}
            font-size: ${0.938 * 1.778}vw;
          }

          .form-wrapper .input-wrapper {
            margin-bottom: ${4.167 * 1.778}vw;
            padding: ${1.042 * 1.778}vw ${0.521 * 1.778}vw;
          }
          
          .form-wrapper .input-wrapper > div {
            margin-bottom: ${4.167 * 1.778}vw;
          }

          .form-wrapper .input-wrapper > div label {
            margin-bottom: ${0.521 * 1.778}vw;
          }

          .form-wrapper .submit-wrapper {
            ${setSize.free('100%', `${2.604 * 1.778}vw`)}
          }

          .form-wrapper .submit-wrapper button:first-of-type {
            margin-right: ${0.26 * 1.778}vw;
          }

          .form-wrapper .submit-wrapper button:last-of-type {
            margin-left: ${0.26 * 1.778}vw;
          }
        }

        @media (max-width: 599px) {
          margin: 0;
          border-radius: 0;
          ${sizeSet.full}

          .tab-wrapper a {
            ${setSize.free('30%', '20px')}
            font-size: 12px;
          }

          .tab-wrapper a#find_id {
            border-radius: 10px 0 0 0;
          }
          
          .tab-wrapper a#find_pwd {
            border-radius: 0 10px 0 0;
          }

          .form-wrapper {
            ${setSize.free('100%', 'max-content')}
          }

          .form-wrapper form {
            ${sizeSet.full}
          }
          
          .form-wrapper .input-wrapper {
            margin-bottom: 40px;
            padding: 20px 10px;
            ${setSize.free('100%', 'max-content')}
            font-size: 14px;
          }

          .form-wrapper .input-wrapper > div {
            margin-bottom: 40px;
          }

          .form-wrapper .input-wrapper > div label {
            margin-bottom: 10px;
            width: 100%;
          }

          .form-wrapper .input-wrapper > div input {
            padding: 5px calc(var(--gap-multiply-small) * 1.2);
          }

          .form-wrapper .submit-wrapper {
            ${setSize.free('100%', '30px')}
            button {
              font-size: 14px;
            }
          }

          .form-wrapper .submit-wrapper button:first-of-type {
            margin-right: 5px;
          }

          .form-wrapper .submit-wrapper button:last-of-type {
            margin-left: 5px;
          }
        }
      }
    `
  );
};

export default findStyles;