import { StyleSet, SetSize } from '../../../custom_modules/commonUtils';

export const backBtnStyle = (styles: StyleSet, vars: any) => {
  const { flex, sizes } = styles;
  const { headerHeight, selStoresListHeight } = vars;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;

  return (`
    padding: 10px;
    position: fixed;
    top: 50px;
    top: ${headerHeight + selStoresListHeight}px;
    right: 0;
    ${setSize.free('2.604vw')}
    min-width: 50px;
    ${flexSet.vertical}
    cursor: pointer;
    z-index: 4;
    opacity: 0.7;
  `);
};

export const metaStyle = (styles: StyleSet, vars: any) => {
  const { flex, sizes, border } = styles;
  const { metaScore, selectedMedia, selectedItemData } = vars;
  const flexSet = flex as StyleSet;
  const setSize = sizes as unknown as SetSize;
  const sizeSet = sizes as StyleSet;

  if (selectedItemData.name === undefined) {
    return (`
      flex: 2;
      z-index: 1;
      ${sizeSet.full}
      position: relative;
      background: white;
    `);
  }

  return (`
    flex: 2;
    z-index: 1;
    ${sizeSet.full}
    position: relative;
    overflow-y: scroll;
    background: white;

    h2 {
      padding-top: var(--gap-standard);
      font-size: 1.823vw;
      text-align: center;
    }

    h3 {
      font-size: 1.563vw;
    }

    #background-cover {
      position: absolute;
      z-index: 0;
      ${sizeSet.full}
      filter: opacity(0.25) brightness(0.5);
    }

    .meta-wrapper-top {
      padding: var(--gap-standard) calc(var(--gap-standard) * 2);
      z-index: 1;
      position: relative;
      background: rgba(255, 255, 255, 0.6);
      height: 100%;
      overflow-y: scroll;

      .meta-wrapper-ratings {
        ${(flexSet.horizontal as StyleSet).center}
        ${sizeSet.full}
        max-height: 13.021vw;
        justify-content: flex-end;

        #game-cover {
          height: 13.021vw;
        }

        #title-and-numerical {
          ${sizeSet.full}
          ${flexSet.vertical}
          
          h4 {
            font-size: 0.938vw;
          }

          #numerical-data {
            ${sizeSet.full}
            ${(flexSet.horizontal as StyleSet).center}
            justify-content: space-around;

            #game-scores {
              padding: var(--gap-standard) 0;
              ${sizeSet.full}
              ${flexSet.vertical}

              .donut-boundary {
                position: relative;
                ${setSize.free(`6.25vw`, `6.25vw`)}
              }
              
              .donut-outline {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
              
              .donut-graph-border {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
              }

              .donut-text {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                ${setSize.free(`3.906vw`, `3.906vw`)}
                background: var(--white);
                position: absolute;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 3;
              }

              .instalment1 .donut-case {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--grey-dark);
                position: absolute;
                top: 0;
                left: 0;
                background-clip: border-box;
                overflow: hidden;
              }

              .instalment1 .donut-case::before {
                content: "";
                clip: rect(0 6.302vw 3.177vw 0);
                transform: rotate(${metaScore <= 50 ? `${450 - (metaScore)*3.6}deg` : '270deg'});
                background: var(--btn-active);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transition: transform 1s;
              }

              .instalment1 .donut-case::after {
                content: "";
                clip: rect(0 3.177vw 6.302vw 0);
                transform: rotate(${metaScore > 50 ? `${360 - (metaScore - 50)*3.6}deg` : '180deg'});
                background: ${metaScore > 50 ? 'var(--btn-active)' : 'var(--grey-dark)'};
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transition: transform 1s;
              }

              .instalment1 .donut-graph-border::before {
                content: "";
                width: 50%;
                height: 0.104vw;
                position: absolute;
                top: 50%;
                left: 0;
                background: var(--white);
                z-index: 2;
                transform: rotate(90deg);
                transform-origin: 100%;
              }

              .instalment1 .donut-graph-border::after {
                content: "";
                width: 50%;
                height: 0.104vw;
                position: absolute;
                top: 50%;
                left: 50%;
                background: var(--white);
                z-index: 2;
                transform: rotate(${270 - metaScore*3.6}deg);
                transform-origin: 0;
                transition: transform 1s;
              }
            }

            #age-rating-wrapper {
              padding: var(--gap-standard) 0;
              ${sizeSet.full}
              ${flexSet.vertical}

              #rating-imgs {
                ${sizeSet.full}
                ${(flexSet.horizontal as StyleSet).center}

                img {
                  height: 5.208vw;
                }

                img:first-of-type {
                  margin-right: var(--gap-standard);
                }
              }
            }
          }
        }
      }

      .meta-wrapper-contents {
        p#summary-container {
          margin: 1.563vw 0;
          padding: var(--gap-standard) calc(var(--gap-standard) * 2);
          font-size: var(--font-size-normal);

          button {
            border: none;
            background: none;
            text-decoration: underline;
            color: blue;
            cursor: pointer;
            box-shadow: none;
          }
        }

        .meta-wrapper-contents-media {
          margin-top: 1.563vw;
          margin-bottom: 2.604vw;

          .media-contents-wrapper {
            .media-tabs {
              button {
                ${border}
                border-color: var(--btn-disable);
                border-radius: 0;
                border-bottom: none;
                padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 2);
                cursor: pointer;
                box-shadow: none;

                :hover {
                  -webkit-filter: brightness(90%);
                  filter: brightness(90%);
                }

                :active {
                  -webkit-filter: brightness(60%);
                  filter: brightness(60%);
                }
              }

              button:first-of-type {
                border-radius: var(--border-rad-big) 0 0 0;
                background: ${selectedMedia === 'screenshots' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
              }

              button:nth-of-type(2) {
                background: ${selectedMedia === 'videos' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
              }

              button:last-of-type {
                border-radius: 0 var(--border-rad-big) 0 0;
                background: ${selectedMedia === 'artworks' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
              }
            }

            .media-contents {
              ${border}
              border-color: var(--btn-disable);
              padding: var(--gap-standard);
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(20%, auto));
              gap: calc(var(--gap-standard) * 1.5) var(--gap-standard);
              justify-items: center;

              .media-wrapper {
                position: relative;
                cursor: pointer;

                :active {
                  -webkit-transform: scale(0.98);
                  -ms-transform: scale(0.98);
                  transform: scale(0.98);
                }

                .player-btn-wrapper {
                  ${sizeSet.full}
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 2;

                  .player-btn {
                    display: none;
                    border: 0.781vw solid transparent;
                    border-left: 1.302vw solid white;
                    border-right: 0.26vw solid transparent;
                    position: absolute;
                    top: 50%;
                    left: calc(50% + 0.26vw);
                    transform: translate(-50%, -50%);
                    z-index: 1;
                  }

                  svg {
                    color: white;
                    ${setSize.free('1.563vw', '1.563vw')}
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;

                    * {
                      color: white;
                    }
                  }
                }

                img {
                  ${setSize.free('6.25vw', '4.688vw')}
                }
              }
            }
          }
        }

        .meta-wrapper-contents-info {
          display: grid;
          grid-template-rows: repeat(auto-fill, 1fr);
          ${border}
          border-bottom: none;

          div#grid-table {
            display: grid;
            grid-template-columns: repeat(1, 1fr 3fr);

            .table-title {
              border-bottom: 0.052vw solid black;
              border-right: 0.156vw double black;
              padding: var(--gap-standard) 0;
              ${flexSet.vertical}
              background: var(--btn-disable);
              color: var(--white);
              font-size: 0.938vw;
              font-weight: bold;

              @media (orientation: portrait) {
                @media (max-width: 599px) {
                  border-bottom: 1px solid black;
                  border-right: 3px double black;
                  padding: 20px 0;
                  font-size: 14px;
                }
              }
            }

            .table-contents {
              display: grid;
              grid-template-rows: repeat(auto-fill, 1fr);
              font-size: 0.833vw;

              div {
                border-bottom: 0.052vw solid black;
                padding: var(--gap-multiply-small) 0;
                ${sizeSet.full}
                ${flexSet.vertical}
              }

              @media (orientation: portrait) {
                @media (max-width: 599px) {
                  font-size: 12px;

                  div {
                    border-bottom: 1px solid black;
                    padding: 5px 0;
                  }
                }
              }
            }

            #sub-table-container {
              display: grid;
              grid-template-rows: repeat(auto-fill, 1fr);
            }

            .sub-table {
              display: grid;
              grid-template-columns: 2fr 1fr;

              .table-sub-title, .table-sub-contents {
                border-bottom: 0.052vw solid black;
                border-right: 0.052vw solid black;
                padding: var(--gap-multiply-small) 0;
                ${flexSet.vertical}
                font-size: 0.833vw;
                font-weight: bold;

                @media (orientation: portrait) {
                  @media (max-width: 599px) {
                    border-bottom: 1px solid black;
                    border-right: 1px solid black;
                    padding: 5px 0;
                    font-size: 12px;
                    text-align: center;
                  }
                }
              }

              .table-sub-contents {
                border-right: none;
                font-weight: normal;
              }
            }
          }
        }
      }
    }

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        h2 {
          font-size: ${1.823 * 1.778}vw;
        }

        h3 {
          font-size: ${1.563 * 1.778}vw;
        }

        .meta-wrapper-top {
          .meta-wrapper-ratings {
            max-height: ${13.021 * 1.778}vw;

            #game-cover {
              height: ${13.021 * 1.778}vw;
            }

            #title-and-numerical {
              h4 {
                font-size: ${0.938 * 1.778}vw;
              }

              #numerical-data {
                #game-scores {
                  .donut-boundary {
                    ${setSize.free(`${6.25 * 1.778}vw`, `${6.25 * 1.778}vw`)}
                  }

                  .donut-text {
                    ${setSize.free(`${3.906 * 1.778}vw`, `${3.906 * 1.778}vw`)}
                  }

                  .instalment1 .donut-case::before {
                    clip: rect(0 ${6.302 * 1.778}vw ${3.177 * 1.778}vw 0);
                  }

                  .instalment1 .donut-case::after {
                    clip: rect(0 ${3.177 * 1.778}vw ${6.302 * 1.778}vw 0);
                  }

                  .instalment1 .donut-graph-border::before {
                    height: ${0.104 * 1.778}vw;
                  }

                  .instalment1 .donut-graph-border::after {
                    height: ${0.104 * 1.778}vw;
                  }
                }

                #age-rating-wrapper {
                  #rating-imgs {
                    img {
                      height: ${5.208 * 1.778}vw;
                    }
                  }
                }
              }
            }
          }

          .meta-wrapper-contents {
            p#summary-container {
              margin: ${1.563 * 1.778}vw 0;

            .meta-wrapper-contents-media {
              margin-top: ${1.563 * 1.778}vw;
              margin-bottom: ${2.604 * 1.778}vw;

                .media-contents {
                  .media-wrapper {
                    .player-btn-wrapper {
                      .player-btn {
                        border: ${0.781 * 1.778}vw solid transparent;
                        border-left: ${1.302 * 1.778}vw solid white;
                        border-right: ${0.26 * 1.778}vw solid transparent;
                      }

                      svg {
                        ${setSize.free(`${1.563 * 1.778}vw`, `${1.563 * 1.778}vw`)}
                      }
                    }

                    img {
                      ${setSize.free(`${6.25 * 1.778}vw`, `${4.688 * 1.778}vw`)}
                    }
                  }
                }
              }
            }

            .meta-wrapper-contents-info {
              .table-title {
                border-bottom: ${0.052 * 1.778}vw solid black;
                border-right: ${0.156 * 1.778}vw double black;
                font-size: ${0.938 * 1.778}vw;
              }

              .table-contents {
                font-size: ${0.833 * 1.778}vw;

                div {
                  border-bottom: ${0.052 * 1.778}vw solid black;
                }
              }

              .table-sub-title, .table-sub-contents {
                border-bottom: ${0.052 * 1.778}vw solid black;
                border-right: ${0.052 * 1.778}vw solid black;
                font-size: ${0.833 * 1.778}vw;
              }
            }
          }
        }
      }
    }

    @media (orientation: portrait) and (max-width: 599px) {
      h2 {
        padding-top: 20px;
        font-size: 20px;
      }

      h3 {
        font-size: 18px;
      }

      .meta-wrapper-top {
        padding: var(--gap-standard);

        .meta-wrapper-ratings {
          ${sizeSet.full}
          max-height: 125px;

          #game-cover {
            display: none;
          }

          #title-and-numerical {
            h4 {
              font-size: 18px;
            }

            #numerical-data {
              #game-scores {
                .donut-boundary {
                  ${setSize.free(`80px`, `80px`)}
                }

                .donut-text {
                  ${setSize.free(`40px`, `40px`)}
                }

                .instalment1 .donut-case::before {
                  clip: rect(0 80px 40px 0);
                }

                .instalment1 .donut-case::after {
                  clip: rect(0 40px 80px 0);
                }

                .instalment1 .donut-graph-border::before {
                  height: 2px;
                }

                .instalment1 .donut-graph-border::after {
                  height: 2px;
                }
              }

              #age-rating-wrapper {
                #rating-imgs {
                  img {
                    height: 70px;
                  }

                  img:first-of-type {
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }

        .meta-wrapper-contents {
          p#summary-container {
            margin: 20px 0;
            padding: 20px;
            font-size: 14px;

            button {
              box-shadow: none;
            }
          }

          .meta-wrapper-contents-media {
            margin-top: 20px;
            margin-bottom: 50px;

            .media-contents-wrapper {
              .media-tabs {
                button {
                  padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 2);
                  box-shadow: none;
                }

                button:first-of-type {
                  border-radius: 10px 0 0 0;
                }

                button:last-of-type {
                  border-radius: 0 10px 0 0;
                }
              }

              .media-contents {
                padding: 20px;
                grid-template-columns: repeat(auto-fill, minmax(40%, auto));
                gap: 10px;

                .media-wrapper {
                  .player-btn-wrapper {
                    .player-btn {
                      border: 15px solid transparent;
                      border-left: 25px solid white;
                      border-right: 5px solid transparent;
                    }

                    svg {
                      color: white;
                      ${setSize.free('30px', '30px')}

                      * {
                        color: white;
                      }
                    }
                  }

                  img {
                    ${setSize.free('160px', '120px')}
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
};