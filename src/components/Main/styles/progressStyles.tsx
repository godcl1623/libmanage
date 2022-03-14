import { StyleSet, SetSize } from '../../../custom_modules/commonUtils';

const progressStyles = (styles: StyleSet) => {
  const { flex, sizes } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;
  const sizeSet = sizes as StyleSet;

  return (`
    ${sizeSet.full}
    ${flexSet.vertical}

    h1 {
      margin-bottom: 5.208vw;
      font-size: 5.208vw;
    }

    p {
      font-size: 1.25vw;
      font-weight: bold;
    }

    .contents-wrapper {
      border-radius: var(--border-rad-normal);
      ${setSize.free('40%', '50%')}
      background: white;
      ${flexSet.vertical}
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        h1 {
          margin-bottom: ${5.208 * 1.778}vw;
          font-size: ${5.208 * 1.778}vw;
        }

        p {
          font-size: ${1.25 * 1.778}vw;
          font-weight: bold;
        }

        .contents-wrapper {
          ${setSize.free('60%', '35%')}
        }
      }

      @media (max-width: 599px) {
        h1 {
          margin-bottom: 40px;
          font-size: 40px;
        }

        p {
          font-size: 16px;
          text-align: center;
        }

        .contents-wrapper {
          border-radius: 7px;
          padding: 20px;
          ${setSize.free('90%', '50%')}
        }
      }
    }
  `);
};

export default progressStyles;