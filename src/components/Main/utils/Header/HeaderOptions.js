import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';

const HeaderOptions = ({ setStates, states, components }) => {
  const {
    dispatch,
    modalOriginCreator,
    modalStateCreator,
    balloonStateCreator,
    modalState,
  } = setStates;
  const {
    selectedBtn,
    optionRef,
    isMobile,
  } = states;
  const [
    searchBar,
    memStat
  ] = components;
  return (
    <>
      <button
        css={css`
          @media (orientation: landscape) {
            padding: 0.26vw 1.042vw;
            ${sizes.free('80%', '2.344vw')}
          }

          @media (orientation: portrait) {
            @media (min-width: 600px) {
              padding: ${0.26 * 1.778}vw ${1.042 * 1.778}vw;
              ${sizes.free('80%', `${2.344 * 1.778}vw`)}
            }

            @media (max-width: 599px) {
              padding: 5px 20px;
              ${sizes.free('80%', `25px`)}
            }
          }
        `}
        onClick={() => {
          dispatch(
            modalOriginCreator(
              selectedBtn.current === optionRef.current ? 'Header_Option' : 'Header_MemInfo'
            )
          );
          if (!modalState) {
            dispatch(modalStateCreator(true));
            dispatch(balloonStateCreator('none'));
          } else {
            dispatch(modalStateCreator(false));
          }
        }}
      >
        {selectedBtn.current === optionRef.current ? '라이브러리 추가' : '회원정보 관리'}
      </button>
      {
        isMobile
          ?
            selectedBtn.current === optionRef.current
              ? searchBar
              : memStat
          :
            ''
      }
    </>
  )
};

export default HeaderOptions;