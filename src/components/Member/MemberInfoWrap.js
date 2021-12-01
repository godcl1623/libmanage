import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TabBtn from './parts/TabBtn';
import ModMemInfo from './comps/ModMemInfo';
import CheckMemInfo from './comps/CheckMemInfo';
import DelMemInfo from './comps/DelMemInfo';
import { border, sizes } from '../../styles';

const MemberInfoWrap = () => {
  const modalState = useSelector(state => state.modalState);
  const userState = useSelector(state => state.userState);
  const [tabState, setTabState] = useState('modify');
  const [verifyState, setVerifyState] = useState(false);
  useEffect(() => {
    if (!modalState) setTabState('modify');
  }, [modalState]);
  return (
    <article
      id='member-info-wrap'
      css={css`
        ${sizes.full}
      `}
    >
      <div
        className='member-info-contents-wrap'
        css={css`
          padding: calc(var(--gap-standard) * 2) var(--gap-standard);
          ${sizes.full}

          .member-info-contents {
            ${sizes.free('100%', 'calc(100% - calc(var(--gap-standard) * 2))')}
          }

          @media (orientation: portrait) and (max-width: 599px) {
            padding: 40px 20px;
  
            .member-info-contents {
              ${sizes.free('100%', 'calc(100% - 40px)')}
            }
          }
        `}
      >
        {
          verifyState
            ?
              <>
                <div
                  className='member-info-contents-tab-wrap'
                  css={css`
                    button {
                      padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
                      ${border}
                      border-bottom: none;
                      box-shadow: none;
                      cursor: pointer;

                      :hover {
                        -webkit-filter: brightness(90%);
                                filter: brightness(90%);
                      }
                    
                      :active {
                        -webkit-transform: scale(0.95);
                            -ms-transform: scale(0.95);
                                transform: scale(0.95);
                      }
                    }

                    button:first-of-type {
                      border-radius: var(--border-rad-normal) 0 0 0;
                      border-right: none;
                      background: ${tabState === 'modify' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                    }

                    button:last-of-type {
                      border-radius: 0 var(--border-rad-normal) 0 0;
                      background: ${tabState === 'modify' ? 'var(--btn-disable)' : 'var(--highlight-light)'};
                    }

                    @media (orientation: portrait) and (max-width: 599px) {
                      button {
                        padding: 5px 15px;
                        font-size: 12px;
                      }
  
                      button:first-of-type {
                        border-radius: 10px 0 0 0;
                      }
  
                      button:last-of-type {
                        border-radius: 0 10px 0 0;
                      }
                    }
                  `}
                >
                  <TabBtn
                    setState={ setTabState }
                    stateVal={ ['modify', 'withdraw'] }
                  >
                    { ['정보 변경', '회원 탈퇴'] }
                  </TabBtn>
                </div>
                <div
                  className='member-info-contents'
                >
                  {
                    tabState === 'modify'
                      ? <ModMemInfo userState={userState} />
                      : <DelMemInfo userState={userState} />
                  }
                </div>
              </>
            :
              <CheckMemInfo userState={userState} setState={setVerifyState} />
        }
      </div>
    </article>
  );
}

export default MemberInfoWrap;