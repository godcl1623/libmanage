import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../custom_modules/address';
import { sizes } from '../../../../styles';

const MemberStatus = ({ loginStatus, functions }) => {
  const {
    dispatch,
    logoutClickedCreator,
    userStateCreator,
    comparisonStateCreator,
    loginStatusCreator,
    history,
    axios,
    selectedItemCreator,
    selectedItemDataCreator,
    selectedMediaIdCreator,
    selectedMediaListCreator,
    modalStateCreator
  } = functions;
  if (loginStatus === true) {
    return (
      <button
        css={css`
          margin-right: calc(var(--gap-standard) * 2);
          background: var(--btn-alert);
          color: var(--white);

          @media (orientation: portrait) {
            margin-right: var(--gap-standard);
            @media (max-width: 599px) {
              margin: 0;
              padding: 5px 20px;
              ${sizes.free('80%', `25px`)}
            }
          }
        `}
        onClick={() => {
          const message = {
            reqMsg: 'logout',
            million: localStorage.getItem('frog')
          };
          axios
            .post(
              // 'http://localhost:3001/logout_process',
              `https://${sendTo}/logout_process`,
              { message },
              { withCredentials: true }
            )
            .then(res => {
              dispatch(logoutClickedCreator(true));
              dispatch(userStateCreator(null));
              dispatch(comparisonStateCreator(''));
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              dispatch(selectedItemCreator(''));
              dispatch(selectedItemDataCreator(''));
              dispatch(selectedMediaIdCreator(''));
              dispatch(selectedMediaListCreator(''));
              dispatch(modalStateCreator(false));
              alert('로그아웃 했습니다.');
              history.push('/');
            })
            .catch(err => alert(err));
        }}
      >
        로그아웃
      </button>
    );
  }
  return (
    <button
      css={css`
        margin-right: calc(var(--gap-standard) * 2);
        background: var(--btn-active);
        color: var(--white);

        @media (orientation: portrait) {
          margin-right: var(--gap-standard);
        }
      `}
      onClick={() => {
        history.push('/');
      }}
    >
      로그인
    </button>
  );
};

export default MemberStatus;