import { StyleSet, SetSize } from '../../../../custom_modules/commonUtils';

export const changePwdRoot = (styles: StyleSet) => {
  const { sizes, flex } = styles;
  return (
    `
      ${(sizes as StyleSet).full}
      height: max-content;
      ${(flex as StyleSet).vertical}
    `
  );
};

export const tokenExpired = (styles: StyleSet) => {
  const { sizes, flex } = styles;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (
    `
      border-radius: var(--border-rad-big);
      ${setSize.free('40%', '50%')}
      ${flexSet.vertical}
      background: white;

      #to_home {
        margin-top: calc(var(--gap-multiply-big) * 4);
        ${(flexSet.horizontal as StyleSet).center}
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
          ${setSize.free('70%', '35%')}
        }

        @media (max-width: 599px) {
          border-radius: 10px;
          padding: 20px;
          ${setSize.free('90%', '50%')}

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