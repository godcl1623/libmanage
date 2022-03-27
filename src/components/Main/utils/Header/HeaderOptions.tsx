import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from '../../../../styles';
import { optionsStyle } from '../../styles/HeaderStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';
import { useAppDispatch, activateReorder, useAppSelector } from '../../../../slices';

// props 타입 설정 필요
const HeaderOptions = ({ setStates, states, components }: any) => {
  const isReorderActivated = useAppSelector(state => state.sliceReducers.isReorderActivated);
  const appDispatch = useAppDispatch();
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
        css={css`${optionsStyle({ sizes } as StyleSet)}`}
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
        selectedBtn.current === optionRef.current
          ?
            <div
              className="balloon-switch-container"
              style={{
                marginTop: 'var(--gap-standard)',
                borderRadius: 'var(--border-rad-normal)',
                boxShadow: '0 0 0.156vw 0.052vw var(--grey-dark)',
                padding: 'calc(var(--gap-multiply-small) * 2) calc(var(--gap-multiply-small) * 3)',
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--highlight-light)'
              }}
            >
              <p
                className="balloon"
                style={{
                  fontSize: '0.938vw',
                  whiteSpace: 'pre-line',
                  textAlign: 'center'
                }}
              >
                {'카테고리\n재정렬'}
              </p>
              <div
                className="balloon-toggle-container"
                style={{
                  borderRadius: '1.302vw 1.302vw',
                  boxShadow: '0 0 0.156vw 0.052vw var(--grey-dark)',
                  padding: '0.521vw 0.26vw',
                  width: '2.865vw',
                  height: '1.563vw',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  background: isReorderActivated ? 'white' : 'gray',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  appDispatch(activateReorder(!isReorderActivated));
                }}
              >
                <div
                  className='balloon-toggle_button'
                  style={{
                    borderRadius: '50%',
                    width: '1.042vw',
                    height: '1.042vw',
                    background: 'var(--highlight-light)',
                    transform: isReorderActivated ? 'translateX(1.302vw)' : 'unset',
                    transition: 'all 0.3s'
                  }}
                />
              </div>
            </div>
          : ''
      }
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