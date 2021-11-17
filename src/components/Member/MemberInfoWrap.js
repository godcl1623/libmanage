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
          padding: 40px 20px;
          ${sizes.full}
          .member-info-contents {
            ${sizes.free('100%', 'calc(100% - 40px)')}
          }
        `}
        f
      >
        {
          verifyState
            ?
              <>
                <div
                  className='member-info-contents-tab-wrap'
                  css={css`
                    button {
                      padding: 5px 15px;
                      border: none;
                      border-top: 1px solid black;
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
                      border-radius: 7px 0 0 0;
                      border-left: 1px solid black;
                      background: ${tabState === 'modify' ? 'white' : 'grey'};
                    }

                    button:last-of-type {
                      border-radius: 0 7px 0 0;
                      border-right: 1px solid black;
                      background: ${tabState === 'modify' ? 'grey' : 'white'};
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