import { StyleSet, SetSize } from '../../../../custom_modules/commonUtils';

export const headerBalloonWrapper = (condition: string, state: string) => (`
  display: ${condition === 'Header' ? state : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`);

// states 타입 수정 필요
export const headerBalloonStyle = (styles: StyleSet, states: any, condition: string) => {
  const { flex, sizes } = styles;
  const { balloonState, selectedBtn, optionRef, btnCoords } = states;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    padding: var(--gap-standard);
    display: ${condition === 'Header' ? balloonState : 'none'};
    ${flexSet.vertical}
    /* ${setSize.free('15.625vw', '5.208vw')} */
    ${setSize.free('15.625vw', 'auto')}
    position: absolute;
    top: ${
      selectedBtn.current === optionRef.current
        ?
          `calc(${btnCoords.topCoord / 19.2}vw)`
        :
          `calc(${btnCoords.botCoord}px + 3.703vh)`
    };
    left: ${
      selectedBtn.current === optionRef.current
        ?
          `calc(${btnCoords.leftCoord / 19.2}vw + 5.208vw)`
        :
          `calc(${btnCoords.leftCoord}px)`
    };
    background: var(--btn-active);
    z-index: 2;

    @media (orientation: landscape) {
      @media (max-width: 800px) {
        ${setSize.free(`${15.625 * 1.778 * 0.8}vw`, `${5.208 * 1.778 * 0.8}vw`)}
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        ${setSize.free(`${15.625 * 1.778}vw`, `${5.208 * 1.778}vw`)}
        top: ${
          selectedBtn.current === optionRef.current
            ?
              `calc(${(btnCoords.topCoord / 19.2) * 1.778}vw)`
            :
              `calc(${btnCoords.botCoord}px + ${3.703 / 1.778}vh)`
        };
        left: ${
          selectedBtn.current === optionRef.current
            ?
              `calc(${(btnCoords.leftCoord / 19.2) * 1.778}vw + ${5.208 * 1.778}vw)`
            :
              `calc(${btnCoords.leftCoord}px - 50px)`
        };
      }

      @media (max-width: 599px) {
        padding: var(--gap-standard);
        ${setSize.free('100vw', '100px')}
        height: max-content;
        height: -webkit-max-content;
        justify-content: space-between;
        top: 47px;
        left: 0;
      }
    }
  `);
};

// states 타입 수정 필요
export const headerBalloonHand = (states: any, condition: string) => {
  const { balloonState, selectedBtn, optionRef, btnCoords } = states;

  return (`
    border-top: ${
      selectedBtn.current === optionRef.current
        ?
          '1.042vw solid transparent'
        :
          'none'
    }; 
    border-bottom: ${
      selectedBtn.current === optionRef.current
        ?
          '1.042vw solid transparent'
        :
          '2.083vw solid var(--btn-active)'
    };
    border-right: ${
      selectedBtn.current === optionRef.current
        ?
          '2.083vw solid var(--btn-active)'
        :
          '1.042vw solid transparent'
    };
    border-left: ${
      selectedBtn.current === optionRef.current
        ?
          'none'
        :
          '1.042vw solid transparent'
    };
    position: absolute;
    top: ${
      selectedBtn.current === optionRef.current
        ?
          `calc(${btnCoords.topCoord / 19.2}vw)`
        :
          `calc(${btnCoords.botCoord}px + 0.926vh)`
    };
    left: ${
      selectedBtn.current === optionRef.current
        ?
          `calc(${btnCoords.leftCoord / 19.2}vw + 4.271vw)`
        :
          `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
    };
    transform: translate(-50%);
    display: ${condition === 'Header' ? balloonState : 'none'};

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        border-top: ${
          selectedBtn.current === optionRef.current
            ?
              'var(--gap-standard) solid transparent'
            :
              'none'
        }; 
        border-bottom: ${
          selectedBtn.current === optionRef.current
            ?
              'var(--gap-standard) solid transparent'
            :
              'calc(var(--gap-standard) * 2) solid var(--btn-active)'
        };
        border-right: ${
          selectedBtn.current === optionRef.current
            ?
              'calc(var(--gap-standard) * 2) solid var(--btn-active)'
            :
              'var(--gap-standard) solid transparent'
        };
        border-left: ${
          selectedBtn.current === optionRef.current
            ?
              'none'
            :
              'var(--gap-standard) solid transparent'
        };
        top: ${
          selectedBtn.current === optionRef.current
            ?
              `calc(${(btnCoords.topCoord / 19.2) * 1.778}vw)`
            :
              `calc(${btnCoords.botCoord}px + ${0.926 / 1.778}vh)`
        };
        left: ${
          selectedBtn.current === optionRef.current
            ?
              `calc(${(btnCoords.leftCoord / 19.2) * 1.778}vw + ${4.271 * 1.778}vw)`
            :
              `calc(${btnCoords.leftCoord}px + ${btnCoords.btnWidth / 2}px)`
        };
      }

      @media (max-width: 599px) {
        display: none;
      }
    }
  `);
};