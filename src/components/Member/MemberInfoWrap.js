import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TabBtn from './parts/TabBtn';
import ModMemInfo from './comps/ModMemInfo';

const MemberInfoWrap = () => {
  const modalState = useSelector(state => state.modalState);
  const [tabState, setTabState] = useState('modify');
  useEffect(() => {
    if (!modalState) setTabState('modify');
  }, [modalState]);
  return (
    <article
      id='member-info-wrap'
    >
      <div
        className='member-info-contents-wrap'
      >
        <div
          className='member-info-contents-tab-wrap'
        >
          <TabBtn
            setState={ setTabState }
            stateVal={ ['modify', 'withdraw'] }
          >
            { ['회원 정보 변경', '회원 탈퇴'] }
          </TabBtn>
        </div>
        <div
          className='member-info-contents'
        >
          {tabState === 'modify' ? <ModMemInfo /> : <h1>차가운무</h1>}
        </div>
      </div>
    </article>
  );
}

export default MemberInfoWrap;