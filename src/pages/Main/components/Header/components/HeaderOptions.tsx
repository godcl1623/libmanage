import { useState } from 'react';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sizes } from 'styles';
import { StyleSet } from 'custom_modules/commonUtils';
import { useAppDispatch, activateReorder, useAppSelector, updateDropRes, setCompareState } from 'slices';
import { decryptor, encryptor } from 'custom_modules/aeser';
import { sendTo } from 'custom_modules/address';
import { optionsStyle } from '../styles/headerStyles';

const HeaderOptions = ({ setStates, states, components }: any) => {
  const isReorderActivated = useAppSelector(state => state.sliceReducers.isReorderActivated);
  const catDropRes = useAppSelector(state => state.sliceReducers.catDropResult);
  const [lastReorderState, setLast] = useState<boolean>(false);
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
            >
              <p
                className="balloon"
                css={css`
                  font-size: 0.938vw;
                  white-space: pre-line;
                  text-align: center;

                  @media (max-width: 599px) {
                    font-size: 12px;
                  }
                `}
              >
                {window.innerWidth > 599 ? '카테고리\n재정렬' : '카테고리 재정렬'}
              </p>
              <div
                className="balloon-toggle-container"
                style={{
                  boxShadow: '0 0 0.156vw 0.052vw var(--grey-dark)',
                  padding: '0.521vw 0.26vw',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  background: isReorderActivated ? 'white' : 'gray',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  appDispatch(activateReorder(!isReorderActivated));
                  setLast(true);
                  if (lastReorderState) {
                    setLast(false);
                    if (localStorage.getItem('frog')) {
                      const originalInfo = JSON.parse(decryptor(localStorage.getItem('frog'), process.env.REACT_APP_TRACER as string));
                      if (window.confirm(`현재 카테고리 정렬 상태를 저장하시겠습니까?`)) {
                        const updateOption = async ():Promise<boolean> => {
                          const newInfo = { ...originalInfo };
                          newInfo.customCatOrder = catDropRes.length === 0 ? 'default' : catDropRes.toString();
                          const modPackage = encryptor(JSON.stringify(newInfo), process.env.REACT_APP_TRACER as string);
                          localStorage.setItem('frog', modPackage);
                          const result = await axios
                            .put(
                                `https://${sendTo}/member/modify_option`,
                                { pack: modPackage },
                                { withCredentials: true }
                              )
                            .then(res => res.data);
                          return result;
                        };
                        const popupMsgs = (commRes: boolean): void => {
                          if (commRes) {
                            alert('저장되었습니다.');
                          } else {
                            alert('오류가 발생했습니다.')
                          }
                        }
                        if (originalInfo.customCatOrder) {
                          if (originalInfo.customCatOrder !== catDropRes) {
                            updateOption().then(res => popupMsgs(res));
                          }
                        } else {
                          updateOption().then(res => popupMsgs(res));
                        }
                      } else {
                        dispatch(updateDropRes(['cancel']));
                      }
                    }
                  }
                }}
              >
                <div
                  className='balloon-toggle_button'
                  css={css`
                    border-radius: 50%;
                    background: var(--highlight-light);
                    transform: ${isReorderActivated ? 'translateX(118%)' : 'unset'};
                    transition: all 0.3s;
                  `}
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