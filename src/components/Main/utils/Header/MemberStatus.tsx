import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../custom_modules/address';
import { sizes } from '../../../../styles';
import { memStatsStyle } from '../../styles/HeaderStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

// props 타입 체크 필요
const MemberStatus = ({ loginStatus, functions }: any) => {
  const {
    dispatch,
    logoutClickedCreator,
    userStateCreator,
    comparisonStateCreator,
    loginStatusCreator,
    navigate,
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
        css={css`${memStatsStyle({ sizes } as StyleSet, 'logout')}`}
        onClick={() => {
          const message = {
            reqMsg: 'logout',
            million: localStorage.getItem('frog')
          };
          axios
            .post(
              'http://localhost:3003/logout_process',
              // `https://${sendTo}/logout_process`,
              { message },
              { withCredentials: true }
            )
            // res 타입 체크 필요
            .then((res: any) => {
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
              navigate('/');
            })
            // err 타입 체크 필요
            .catch((err: Error) => alert(err));
        }}
      >
        로그아웃
      </button>
    );
  }
  return (
    <button
      css={css`${memStatsStyle({ sizes } as StyleSet, 'signin')}`}
      onClick={() => {
        if (navigator.onLine) {
          navigate('/');
          dispatch(modalStateCreator(false));
          dispatch(selectedItemCreator(''));
          dispatch(selectedItemDataCreator({}));
          dispatch(selectedMediaIdCreator(''));
          dispatch(selectedMediaListCreator([]));
        } else {
          alert('오프라인 상태입니다.');
        }
      }}
    >
      로그인
    </button>
  );
};

export default MemberStatus;