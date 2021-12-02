const registerStyles = (styles, vars) => {
  const { sizes, flex, border } = styles;
  const { idState } = vars;
  return (
    `
      margin: var(--gap-standard) 0;
      padding: var(--gap-standard) 2.083vw;
      border-radius: var(--border-rad-big);
      ${flex.vertical}
      ${sizes.free('40vw', 'max-content')}
      background: white;

      #register-form {
        ${flex.vertical}
        justify-content: space-around;
        ${sizes.full}
      }

      #register-form .input-wrapper {
        ${flex.vertical}
        align-items: flex-start;
        ${sizes.free('100%')}
        font-size: var(--font-size-normal);
      }

      #register-form .input-wrapper * {
        ${sizes.free('100%')}
      }

      #register-form .input-wrapper input {
        margin: calc(var(--gap-multiply-small) * 2) 0;
        ${border}
        border-color: var(--grey-dark);
      }

      #register-form .input-wrapper .verify-error {
        color: red;
        font-weight: bold;
        opacity: ${idState !== 1 && idState !== 'wrong' ? '0' : '100%'}
      }

      #register-form .input-wrapper #input-email label {
        ${sizes.free('100%')}
        display: block;
      }

      #register-form .input-wrapper #input-email input {
        ${sizes.free('48%')}
        display: inline-block;
      }

      #register-form .input-wrapper #input-email p {
        ${sizes.free('4%')}
        display: inline-block;
        text-align: center;
      }

      #register-form .input-wrapper #input-email select {
        ${border}
        border-color: var(--grey-dark);
        border-radius: 0.365vw;
        padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
        ${sizes.free('48%')}
        display: inline-block;
        font-size: var(--font-size-normal);
        background: white;
      }

      #register-form .submit-wrapper {
        ${flex.horizontal.center}
        ${sizes.free('100%', '2.604vw')}
      }

      #register-form .submit-wrapper button:first-of-type {
        margin-right: var(--gap-multiply-small);
        background: var(--btn-active);
      }

      #register-form .submit-wrapper button:last-of-type {
        margin-left: var(--gap-multiply-small);
        background: var(--btn-active);
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          padding: var(--gap-standard) ${2.083 * 1.778}vw;
          ${sizes.free(`${40 * 1.778}vw`, 'max-content')}

          #register-form .input-wrapper #input-email select {
            border-radius: ${0.365 * 1.778}vw;
          }

          #register-form .submit-wrapper {
            ${sizes.free('100%', `${2.604 * 1.778}vw`)}
          }
        }

        @media (max-width: 599px) {
          margin: 0;
          padding: var(--gap-standard) 20px;
          border-radius: 0;
          ${sizes.full}

          #register-form {
            justify-content: center;
            height: 85%;
          }

          #register-form .input-wrapper {
            margin-bottom: 20px;
            font-size: 12px;
          }

          #register-form .input-wrapper input {
            margin: calc(var(--gap-multiply-small)) 0;
            padding: 5px calc(var(--gap-multiply-small) * 1.2);
            min-height: 30px;
          }

          #register-form .input-wrapper #input-email input {
            ${sizes.free('47%')}
            min-height: 30px;
            display: inline-block;
          }

          #register-form .input-wrapper #input-email p {
            margin: 0 2.4px;
          }

          #register-form .input-wrapper #input-email select {
            padding: 5px calc(var(--gap-multiply-small) * 1.2);
            ${sizes.free('47%')}
            min-height: 30px;
            font-size: 12px;
          }

          #register-form .submit-wrapper {
            ${sizes.free('100%', '30px')}
          }
        }
      }
    `
  );
}

export default registerStyles;