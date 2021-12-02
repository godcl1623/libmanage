export const changePwdRoot = styles => {
  const { sizes, flex } = styles;
  return (
    `
      ${sizes.full}
      height: max-content;
      ${flex.vertical}
    `
  );
};

export const tokenExpired = styles => {
  const { sizes, flex } = styles;
  return (
    `
      border-radius: var(--border-rad-big);
      ${sizes.free('40%', '50%')}
      ${flex.vertical}
      background: white;

      #to_home {
        margin-top: calc(var(--gap-multiply-big) * 4);
        ${flex.horizontal.center}
        font-size: calc(var(--font-size-normal) * 2);
        text-decoration: none;
        color: var(--grey-dark);

        :active {
          -webkit-transform: scale(0.98);
              -ms-transform: scale(0.98);
                  transform: scale(0.98);
        }
      }

      @media (orientation: portrait) {
        @media (min-width: 600px) {
          ${sizes.free('70%', '35%')}
        }

        @media (max-width: 599px) {
          border-radius: 10px;
          padding: 20px;
          ${sizes.free('90%', '50%')}

          h1 {
            font-size: 32px;
            text-align: center;
          }

          #to_home {
            margin-top: 50px;
            font-size: 50px;
          }
        }
      }
    `
  );
};