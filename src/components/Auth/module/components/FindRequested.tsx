import InputTemplate from './InputTemplate';

const FindRequested = ({ mode }: any) => {
  if (mode === 'pwd') {
    return (
      <>
        <div className="verify_id">
          <InputTemplate inputType="text" labelText="가입한 아이디" inputFor="ID" />
        </div>
        <div className="verify_nickname">
          <InputTemplate inputType="text" labelText="가입한 별명" inputFor="nickname" />
        </div>
        <div className="verify_email">
          <InputTemplate inputType="text" labelText="가입한 이메일 주소" inputFor="email" />
        </div>
      </>
    );
  } 
  return (
    <>
      <div className="verify_nickname">
        <InputTemplate inputType="text" labelText="가입한 별명" inputFor="nickname" />
      </div>
      <div className="verify_email">
        <InputTemplate inputType="text" labelText="가입한 이메일 주소" inputFor="email" />
      </div>
    </>
  );
}

export default FindRequested;