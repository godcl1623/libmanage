const progressStyles = styles => {
  const { flex, sizes } = styles;

  return (`
    ${sizes.full}
    ${flex.vertical}

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
      ${sizes.free('40%', '50%')}
      background: white;
      ${flex.vertical}
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
          ${sizes.free('60%', '35%')}
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
          ${sizes.free('90%', '50%')}
        }
      }
    }
  `);
};

export default progressStyles;