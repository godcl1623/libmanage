import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TabBtn from './parts/TabBtn';
import ModMemInfo from './comps/ModMemInfo';
import CheckMemInfo from './comps/CheckMemInfo';
import DelMemInfo from './comps/DelMemInfo';
import { border, sizes } from '../../styles';
import { memInfoStyle } from './styles/memInfoStyle';

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
      css={css`${memInfoStyle({ sizes, border }, tabState)}`}
    >
      <div className='member-info-contents-wrap'>
        {
          verifyState
            ?
              <>
                <div className='member-info-contents-tab-wrap'>
                  <TabBtn
                    setState={ setTabState }
                    stateVal={ ['modify', 'withdraw'] }
                  >
                    { ['정보 변경', '회원 탈퇴'] }
                  </TabBtn>
                </div>
                <div className='member-info-contents'>
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