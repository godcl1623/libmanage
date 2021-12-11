import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';
import { sizes, flex } from '../../../../../styles';
import signin from '../../../../../assets/sits_large_noborder.png';
import { headerModalStyles } from '../../../styles/modals/ModalContentsStyles';

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
    <article css={css`${headerModalStyles({ sizes, flex }, condition)}`}>
      <h1>스토어 목록</h1>
      <hr />
      <section className="store_container">
        <h2>Steam</h2>
        {
          condition
            ?
              (
                <a
                  // href="http://localhost:3001/auth/steam"
                  href={`https://${sendTo}/auth/steam`}
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
                        // 'http://localhost:3001/disconnect',
                        `https://${sendTo}/disconnect`,
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
