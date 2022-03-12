import { StyleSet } from '../custom_modules/commonUtils';

export const flex: StyleSet = {
  vertical: `
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  `,

  horizontal: {
    center: `
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    `
  },
};

export const sizes = {
  full: `
    width: 100%;
    height: 100%;
  `,

  free: (width = '', height = '') => `
      width: ${width};
      height: ${height};
    `
};

export const animations = {
  goingUp: `
    @-webkit-keyframes going-up {
      from {
        top: 6.25rem;
      } to {
        top: 0;
      }
    }
    @keyframes going-up {
      from {
        top: 6.25rem;
      } to {
        top: 0;
      }
    }
    -webkit-animation: going-up 1.5s forwards;
            animation: going-up 1.5s forwards;
  `,

  opaque: `
    @-webkit-keyframes opaque {
      from {
        opacity: 0;
      } to {
        opacity: 100%;
      }
    }
    @keyframes opaque {
      from {
        opacity: 0;
      } to {
        opacity: 100%;
      }
    }
    -webkit-animation: opaque 1.5s forwards;
            animation: opaque 1.5s forwards;
  `
}

const breakpoints: number[] = [600, 900, 1200, 1800, 2560];

export const mediaQuery = {
  setMq: breakpoints.map(point => `@media (min-width: ${point}px)`),
  setMobile: `@media (max-width: 599px)`
}

// export const border = `border: 1px solid black;`;
export const border: string = `border: 0.052vw solid black;`;