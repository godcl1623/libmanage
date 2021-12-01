import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes, flex } from '../../../../../styles';
import signin from '../../../../../assets/sits_large_noborder.png';

const ModalHeaderOption = ({ props }) => {
  const {
    userState,
    dispatch,
    comparisonStateCreator,
    modalStateCreator,
    setUserLibrary,
    selectedItemDataCreator,
    axios,
    caution
  } = props;

  const condition =
    userState.stores === undefined ||
    userState.stores.game === undefined ||
    userState.stores.game.steam === false;

  return (
    <article
      css={css`
        padding: calc(var(--gap-standard) * 2) var(--gap-standard);
        ${sizes.full}
        ${flex.vertical}
        align-items: flex-start;
        position: relative;

        h1 {
          margin-left: calc(var(--gap-standard) * 2);
          margin-bottom: calc(var(--gap-standard) / 2);
          font-size: calc(var(--font-size-normal) * 2);
        }

        h2,
        button {
          font-size: 1.563vw;
        }

        hr {
          margin-bottom: calc(var(--gap-standard) * 2);
          ${sizes.free('100%')};
        }

        p {
          bottom: 1.563vw;
          font-size: var(--font-size-standard);
          width: 100%;
          text-align: center;
        }

        .store_container {
          margin-bottom: 5.208vw;
          padding: 0 4.167vw;
          padding-bottom: calc(var(--gap-standard) / 2);
          ${flex.horizontal}
          ${sizes.free('100%')};
          justify-content: space-between;

          button {
            padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
            background: ${condition ? 'none' : 'var(--btn-alert)'};
            color: ${condition ? 'var(--grey-dark)' : 'var(--white)'};
          }
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            h2,
            button {
              font-size: ${1.563 * 1.778}vw;
            }
  
            p {
              bottom: ${1.563 * 1.778}vw;
            }
  
            .store_container {
              padding: 0 ${4.167 * 1.778}vw;
            }
          }

          @media (max-width: 599px) {
            padding: calc(var(--gap-standard) * 2) var(--gap-standard);

            h1 {
              margin: 0;
              margin-bottom: 15px;
              font-size: 32px;
              width: 100%;
              text-align: center;
            }

            h2 {
              font-size: 16px;
            }

            hr {
              margin-bottom: calc(var(--gap-standard) * 2);
              ${sizes.free('100%')};
            }

            p {
              font-size: 14px;
            }

            .store_container {
              margin-bottom: 100px;
              padding: 0 15px;
              padding-bottom: 20px;

              button {
                padding: 5px 10px;
                font-size: 12px;
              }
            }
          }
        }
      `}
    >
      <h1>스토어 목록</h1>
      <hr />
      <section className="store_container">
        <h2>Steam</h2>
        {
          condition
            ?
              (
                <a
                  href="http://localhost:3001/auth/steam"
                  // href={`https://${sendTo}/auth/steam`}
                >
                  <img
                    src={signin}
                    alt="sign_in_through_steam"
                    title="sign_in_through_steam"
                  />
                </a>
              )
            :
              (
                <button
                  onClick={e => {
                    const temp = userState;
                    temp.stores.game.steam = false;
                    // 반영을 위해서는 comparisonState 변경이 필요
                    axios
                      .post(
                        'http://localhost:3001/disconnect',
                        // `https://${sendTo}/disconnect`,
                        { reqUserInfo: JSON.stringify(temp) },
                        { withCredentials: true }
                      )
                      .then(res => {
                        if (res) {
                          dispatch(modalStateCreator(false));
                          setUserLibrary('');
                          dispatch(selectedItemDataCreator({}));
                          dispatch(comparisonStateCreator(temp));
                        }
                      });
                  }}
                >
                  연동 해제
                </button>
              )
        }
      </section>
      {caution}
    </article>
  );
};

export default ModalHeaderOption;
