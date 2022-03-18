import { StyleSet, SetSize } from '../../../custom_modules/commonUtils';

export const checkInfoStyle = (styles: StyleSet) => {
  const { flex, sizes, border } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    ${flexSet.vertical}
    ${(sizes as StyleSet).full}

    .input_container {
      margin: 4.167vw 0;

      label {
        font-size: var(--font-size-standard);
      }

      input {
        ${border}
        border-color: var(--grey-dark);
      }
    }

    .submit_container {
      ${setSize.free('60%')}
      ${(flexSet.horizontal as StyleSet).center}

      button {
        ${setSize.free('100%', 'calc(var(--gap-multiply-big) * 2)')}
        font-size: var(--font-size-normal);
      }

      button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }

      button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        .input_container {
          margin: ${4.167 * 1.778}vw 0;
        }

        .submit_container {
          button:first-of-type {
            margin-right: calc(var(--gap-multiply-small) * 2);
          }

          button:last-of-type {
            margin-left: calc(var(--gap-multiply-small) * 2);
          }
        }
      }

      @media (max-width: 599px) {
        h2 {
          font-size: 16px;
          text-align: center;
        }

        .input_container {
          margin: 40px 0;

          label {
            margin-right: 5px;
            font-size: 16px;
          }
        }

        .submit_container {
          button {
            ${setSize.free('100%', '30px')}
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
  `);
};

export const modInfoStyle = (styles: StyleSet) => {
  const { flex, sizes, border } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    ${(sizes as StyleSet).full}
    ${flexSet.vertical}
    justify-content: space-between;

    * {
      ${setSize.free('100%')}
    }

    #contents-divider {
      margin-bottom: calc(var(--gap-standard) * 2);
      ${border}
      border-color: var(--btn-disable);
    }

    .input_container {
      margin-top: var(--gap-standard);
      padding: 0 var(--gap-standard);
      ${flexSet.vertical}
      align-items: flex-start;

      label {
        padding-left: var(--gap-standard);
        font-size: var(--font-size-normal);
      }

      input {
        margin: calc(var(--gap-standard) / 2) 0;
        ${border}
        border-color: var(--grey-dark);
        ${setSize.free('100%')}
      }

      p {
        font-size: var(--font-size-normal);
      }
    }

    #input-email {
      ${setSize.free('100%')}

      label {
        ${setSize.free('100%')}
        display: block;
      }

      input {
        ${setSize.free('48%')}
        display: inline-block;
      }

      p#divider {
        ${setSize.free('4%')}
        display: inline-block;
        text-align: center;
      }

      select {
        ${border}
        border-color: var(--grey-dark);
        border-radius: var(--border-rad-normal);
        padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
        ${setSize.free('48%')}
        display: inline-block;
        background: var(--white);
        font-size: var(--font-size-normal);
      }
    }

    .submit-container {
      ${(flexSet.horizontal as StyleSet).center}
      ${setSize.free('100%', 'calc(var(--gap-multiply-big) * 2)')}

      button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }

      button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        #contents-divider {
        }

        #input-email {
          select {
          }
        }

        .submit-container {
          button:first-of-type {
            margin-right: calc(var(--gap-multiply-small) * 2);
          }

          button:last-of-type {
            margin-left: calc(var(--gap-multiply-small) * 2);
          }
        }
      }

      @media (max-width: 599px) {
        #contents-divider {
          margin-bottom: 40px;
        }

        .input_container {
          margin-top: 20px;
          padding: 0 10px;

          label {
            padding-left: 5px;
            font-size: 16px;
          }

          input {
            margin: 5px 0;
            padding: 5px 10px;
            min-height: 30px;
            font-size: 14px;
          }

          p {
            font-size: 12px;
          }
        }

        #input-email {
          input {
            ${setSize.free('40%')}
          }

          p#divider {
            ${setSize.free('10%')}
          }

          select {
            border-radius: 0;
            padding: 5px 10px;
            ${setSize.free('49%')}
            min-height: 30px;
            font-size: 14px;
          }
        }

        .submit-container {
          ${setSize.free('100%', '30px')}

          button {
            font-size: 14px;
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
  `);
};

export const delInfoStyle = (styles: StyleSet) => {
  const { flex, sizes, border } = styles;
  const flexSet = flex as StyleSet;
  const sizeSet = sizes as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    ${sizeSet.full}
    ${flexSet.vertical}

    * {
      ${setSize.free('100%')}
    }

    h2, h3 {
      margin-bottom: var(--gap-standard);
    }

    #guidance {
      ${border}
      border-bottom: 0;
      border-color: var(--btn-disable);
      padding: calc(var(--gap-standard) * 2);
      ${sizeSet.full}
      height: 70%;

      h1 {
        margin-bottom: var(--gap-standard);
        text-align: center;
        font-size: calc(var(--font-size-normal) * 2);
      }

      li {
        padding-left: var(--gap-standard);
        list-style: disc inside;
        font-size: var(--font-size-standard);
      }
    }

    form {
      ${sizeSet.full}
      ${flexSet.vertical}
      justify-content: space-between;
      text-align: center;
      
      h3, p, input {
        margin: var(--gap-standard) 0;
      }

      input {
        ${border}
        border-color: var(--grey-dark);
      }

      p {
        font-size: var(--font-size-standard);
      }

      span {
        color: #ff1515;
      }

      .check-delete {
        margin-bottom: calc(var(--gap-standard) * 2);
        ${border}
        border-top: 0;
        border-color: var(--btn-disable);
        padding: 0 calc(var(--gap-standard) * 2);
        ${flexSet.vertical}
        ${setSize.free('100%', '70%')}
      }
    }


    .submit-wrapper {
      ${(flexSet.horizontal as StyleSet).center}
      ${setSize.free('100%', 'calc(var(--gap-multiply-big) * 2)')}

      button:first-of-type {
        margin-right: var(--gap-multiply-small);
      }

      button:last-of-type {
        margin-left: var(--gap-multiply-small);
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {  
          .check-delete {
            ${setSize.free('100%', `50%`)}
          }
        }

        .submit-wrapper {
          button:first-of-type {
            margin-right: calc(var(--gap-multiply-small) * 2);
          }

          button:last-of-type {
            margin-left: calc(var(--gap-multiply-small) * 2);
          }
        }
      }

      @media (max-width: 599px) {
        h2, h3 {
          margin-bottom: 10px;
        }

        h2 {
          font-size: 16px;
        }

        h3 {
          font-size: 14px;
        }

        #guidance {
          padding: 10px;

          h1 {
            margin-bottom: 10px;
            font-size: 28px;
          }

          li {
            padding-left: 10px;
            font-size: 12px;
          }
        }

        form {
          h3, p, input {
            margin: 10px 0;
          }

          input {
          }

          p {
            font-size: 12px;
          }

          span {
            color: #ff1515;
          }

          .check-delete {
            margin-bottom: 20px;
            padding: 0 10px;
            ${flexSet.vertical}
            ${setSize.free('100%', '50%')}
          }
        }

        .submit-wrapper {
          ${setSize.free('100%', '30px')}

          button {
            font-size: 14px;
          }

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
          }
        }
      }

      @media (max-width: 299px) {
        form {
          .check-delete {
            ${setSize.free('100%', '70%')}
          }
        }
      }
    }
  `);
};

// 파라미터 타입 확인 필요
export const memInfoStyle = (styles: StyleSet, state: string) => {
  const { sizes, border } = styles;
  const sizeSet = sizes as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    ${sizeSet.full}

    .member-info-contents-wrap {
      padding: calc(var(--gap-standard) * 2) var(--gap-standard);
      ${sizeSet.full}

      .member-info-contents-tab-wrap {
        button {
          padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
          ${border}
          border-color: var(--btn-disable);
          border-bottom: none;
          cursor: pointer;
          box-shadow: none;

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

        button:first-of-type {
          border-radius: var(--border-rad-normal) 0 0 0;
          border-right: none;
          background: ${state === 'modify' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
        }

        button:last-of-type {
          border-radius: 0 var(--border-rad-normal) 0 0;
          background: ${state === 'modify' ? 'var(--btn-disable)' : 'var(--highlight-light)'};
        }
      }

      .member-info-contents {
        ${setSize.free('100%', 'calc(100% - calc(var(--gap-standard) * 2))')}
      }
    }

    @media (orientation: portrait) and (max-width: 599px) {
      .member-info-contents-wrap {
        padding: 40px 20px;

        .member-info-contents-tab-wrap {
          button {
            padding: 5px 15px;
            font-size: 12px;
          }

          button:first-of-type {
            border-radius: 10px 0 0 0;
          }

          button:last-of-type {
            border-radius: 0 10px 0 0;
          }
        }

        .member-info-contents {
          ${setSize.free('100%', 'calc(100% - 40px)')}
        }
      }
    }
  `);
}