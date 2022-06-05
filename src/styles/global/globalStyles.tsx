import { StyleSet, SetSize } from '../../custom_modules/commonUtils';

const globalStyles = (styles: StyleSet) => {
  const { sizes, flex, border } = styles;
  const setSize = sizes as unknown as SetSize;
  const flexSet = flex as StyleSet;
  const sizeSet = sizes as StyleSet;

  return (`
    :root {
      @media (orientation: landscape) {
        /* margin, padding sizes */
        --gap-multiply-big: 1.302vw;
        --gap-multiply-small: 0.26vw;
        --gap-standard: 1.042vw;
        /* border-sizes */
        --border-rad-big: 0.521vw;
        --border-rad-normal: 0.365vw;
        /* font-sizes */
        --font-size-normal: 1.042vw;
        --font-size-standard: 0.833vw;
      }
      @media (orientation: portrait) {
        @media (min-width: 600px) {
          /* margin, padding sizes */
          --gap-multiply-big: ${1.302 * 1.778}vw;
          --gap-multiply-small: ${0.26 * 1.778}vw;
          --gap-standard: ${1.042 * 1.778}vw;
          /* border-sizes */
          --border-rad-big: ${0.521 * 1.778}vw;
          --border-rad-normal: ${0.365 * 1.778}vw;
          /* font-sizes */
          --font-size-normal: ${1.042 * 1.778}vw;
          --font-size-standard: ${0.833 * 1.778}vw;
        }

        @media (max-width: 599px) {
          /* margin, padding sizes */
          --gap-multiply-big: 12.5px;
          --gap-multiply-small: ${5 * 1.778}px;
          --gap-standard: ${10 * 1.778}px;
          /* border-sizes */
          --border-rad-big: ${10 * 1.778}px;
          --border-rad-normal: ${7 * 1.778}px;
          /* font-sizes */
          --font-size-normal: ${20 * 1.778}px;
          --font-size-standard: ${16 * 1.778}px;
        }
      }
      /* colors */
      --btn-alert: #F26101;
      --btn-disable: #8AA8B0;
      --btn-active: #91BED4;
      --white: #FFFFFF;
      --grey-light: #DEDEDE;
      --grey-dark: #313732;
      --highlight-light: #D9E8F5;
      --graph: #304269;
    }

    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      color: var(--grey-dark);
      font-family: sans-serif;
    }

      html {
        ${sizeSet.full}
        position: relative;
      }
      
      body, #root {
        ${sizeSet.full}
      }
      
      body {
        touch-action: none;
      }

      #App {
        ${flexSet.vertical}
        ${sizeSet.full}
        background: var(--highlight-light);
        z-index: 0;
      }

      @media (orientation: landscape) {
        h1 {
          font-size: 3.125vw;
        }

        h2 {
          font-size: 1.25vw;
        }

        h3 {
          font-size: 0.99vw;
        }

        button, input, a {
          border-radius: 0.365vw;
          font-size: 1.042vw;
        }

        button {
          ${border}
          border-color: transparent;
          background: var(--highlight-light);
          color: var(--grey-dark);
          cursor: pointer;
          box-shadow: 0 0 0.156vw 0.052vw var(--grey-dark);

          @media (max-width: 720px) {
            box-shadow: 0 0 1px 1px var(--grey-dark);
          }
        }
        
      }

      input {
        padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
        background: var(--white);
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          h1 {
            font-size: ${3.125 * 1.778}vw;
          }

          h2 {
            font-size: ${1.25 * 1.778}vw;
          }

          h3 {
            font-size: ${0.99 * 1.778}vw;
          }

          button, input, a {
            border-radius: ${0.365 * 1.778}vw;
            font-size: ${1.042 * 1.778}vw;
          }

          button {
            border: none;
            background: var(--highlight-light);
            color: var(--grey-dark);
            cursor: pointer;
            box-shadow: 0 0 0.156vw 0.052vw var(--grey-dark);
          }
        }

        @media (max-width: 599px) {
          h1 {
            font-size: 35px;
          }

          h2 {
            font-size: ${1.25 * 1.778}vw;
          }

          h3 {
            font-size: ${0.99 * 1.778}vw;
          }

          button, input, a {
            border-radius: ${0.365 * 1.778}vw;
            font-size: 10px;
          }

          button {
            border: none;
            background: var(--highlight-light);
            color: var(--grey-dark);
            cursor: pointer;
            box-shadow: 0 0 3px 1px var(--grey-dark);
          }

          input {
            padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 1.5);
            background: var(--white);
          }
        }
      }
  `);
};

export default globalStyles;