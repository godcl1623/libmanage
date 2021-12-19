import React, { memo } from 'react';
import InputTemplate from './InputTemplate';

const MemoedInput = memo(InputTemplate);

const FindRequested = ({ mode }) => {
  if (mode === 'pwd') {
    return (
      <>
        <div className="verify_id">
          <MemoedInput inputType="text" labelText="가입한 아이디" inputFor="ID" />
        </div>
        <div className="verify_nickname">
          <MemoedInput inputType="text" labelText="가입한 별명" inputFor="nickname" />
        </div>
        <div className="verify_email">
          <MemoedInput inputType="text" labelText="가입한 이메일 주소" inputFor="email" />
        </div>
      </>
    );
  } 
  return (
    <>
      <div className="verify_nickname">
        <MemoedInput inputType="text" labelText="가입한 별명" inputFor="nickname" />
      </div>
      <div className="verify_email">
        <MemoedInput inputType="text" labelText="가입한 이메일 주소" inputFor="email" />
      </div>
    </>
  );
}

export default FindRequested;