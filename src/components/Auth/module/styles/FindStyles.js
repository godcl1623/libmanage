const findStyles = (styles, vars) => {
  const { border, flex, sizes } = styles;
  const { tabState } = vars;
  return (
    `
      margin: var(--gap-standard) 0;
      padding: var(--gap-standard);
      border-radius: var(--border-rad-big);
      ${flex.vertical}
      ${sizes.free('40vw', 'max-content')}
      background: white;

      .contents-wrapper {
        ${flex.vertical}
        ${sizes.full}
      }

      .tab-wrapper {
        ${flex.horizontal.center}
        justify-content: flex-start;
        ${sizes.free('100%')}
      }

      .tab-wrapper a {
        ${border}
        border-color: var(--btn-disable);
        border-bottom: none;
        border-radius: 0.365vw;
        ${sizes.free('20%', '1.563vw')}
        font-size: 0.938vw;
        ${flex.horizontal.center}
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
        ${flex.vertical}
        ${sizes.free('100%', 'max-content')}
      }

      .form-wrapper form {
        ${sizes.full}
      }
      
      .form-wrapper .input-wrapper {
        margin-bottom: 4.167vw;
        ${border}
        border-color: var(--btn-disable);
        padding: 1.042vw 0.521vw;
        ${flex.vertical}
        ${sizes.free('100%', 'max-content')}
        font-size: var(--font-size-normal);
      }
      
      .form-wrapper .input-wrapper > div {
        margin-bottom: 4.167vw;
        ${flex.vertical}
        align-items: flex-start;
        ${sizes.free('100%')}
      }

      .form-wrapper .input-wrapper > div:last-of-type {
        margin-bottom: 0;
      }

      .form-wrapper .input-wrapper > div label {
        margin-bottom: 0.521vw;
        ${sizes.free('30%')}
      }

      .form-wrapper .input-wrapper > div input {
        ${border}
        border-color: var(--grey-dark);
        ${sizes.free('100%')}
      }

      .form-wrapper .submit-wrapper {
        ${flex.horizontal.center}
        ${sizes.free('100%', '2.604vw')}
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
          ${sizes.free(`${40 * 1.778}vw`, 'max-content')}

          .tab-wrapper a {
            border-radius: ${0.365 * 1.778}vw;
            ${sizes.free('20%', `${1.563 * 1.778}vw`)}
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
            ${sizes.free('100%', `${2.604 * 1.778}vw`)}
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
          ${sizes.full}

          .tab-wrapper a {
            ${sizes.free('30%', '20px')}
            font-size: 12px;
          }

          .tab-wrapper a#find_id {
            border-radius: 10px 0 0 0;
          }
          
          .tab-wrapper a#find_pwd {
            border-radius: 0 10px 0 0;
          }

          .form-wrapper {
            ${sizes.free('100%', 'max-content')}
          }

          .form-wrapper form {
            ${sizes.full}
          }
          
          .form-wrapper .input-wrapper {
            margin-bottom: 40px;
            padding: 20px 10px;
            ${sizes.free('100%', 'max-content')}
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
            ${sizes.free('100%', '30px')}
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