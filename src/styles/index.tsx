import { StyleSet, SetSize } from '../custom_modules/commonUtils';

export const flex: StyleSet = {
  vertical: `
    display: flex;
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
    align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
    justify-content: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
  `,

  horizontal: {
    center: `
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
      justify-content: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
    `
  },
};

export const sizes: StyleSet | SetSize = {
  full: `
    width: 100%;
    height: 100%;
  `,

  free: (width = '', height = '') => `
      width: ${width};
      height: ${height};
    `
};

export const animations: StyleSet = {
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

export const mediaQuery: StyleSet = {
  setMq: breakpoints.map(point => `@media (min-width: ${point}px)`),
  setMobile: `@media (max-width: 599px)`
}

export const border: string = `border: 0.052vw solid black;`;