import React, { useState } from 'react';
import InputTemplate from '../../Auth/module/components/InputTemplate';
import FormSubmit from '../../Auth/module/components/FormSubmit';

const verifyTest = (verifyValue, verifyState) => {
  if (verifyValue !== '비밀번호') {
    if (verifyState === 1) {
      return `※ 이미 사용 중인 ${verifyValue}입니다.`;
    }
    if (verifyState === 'wrong') {
      return `※ ${verifyValue} 형식과 맞지 않습니다.`;
    }
  } else if (verifyState === 'wrong') {
    return `※ ${verifyValue} 형식과 맞지 않습니다.`;
  }
  return '　';
};

const customOption = (state, func1, func2) => {
  if (state === 'others') {
    return <input type="text" name="email_provider" onChange={() => func2('')}/>
  }
  return (
    <select name="email_provider" onChange={e => func1(e.target.value)} >
      <option value="">선택</option>
      <option value="gmail.com">@gmail.com</option>
      <option value="naver.com">@naver.com</option>
      <option value="hanmail.net">@hanmail.net</option>
      <option value="others">직접 입력</option>
    </select>
  );
};

const ModMemInfo = () => {
  const [pwdMatch, setPwdMatch] = useState(true);
  const [emailState, setEmailState] = useState('');
  const [pwdState, setPwdState] = useState('');
  const [nickState, setNickState] = useState('');
  const [emailAuth, setEmailAuth] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        alert(e);
      }}
    >
      <InputTemplate
        inputType="text"
        labelText="별명: "
        inputFor="nickname"
        handler={() => setNickState('')}
        placeholder='별명 (2~10자 이내, 한글,영문, 숫자 사용)'
      />
      <p
        style={{
          'color': 'red',
          'fontWeight': 'bold',
          'opacity': (nickState !== 1 && nickState !== 'wrong') ? '0' : '100%'
        }}
      >{ verifyTest('별명', nickState) }</p>
      <InputTemplate
        inputType="password"
        labelText="비밀번호: "
        inputFor="PWD"
        handler={() => {
          setPwdMatch(true);
          setPwdState('');
        }}
        placeholder='비밀번호 (8~16자 이내, 영문, 숫자, 기호(!,@,#,$,%,^,&,*) 사용)'
      />
      <p
        style={{
          'color': 'red',
          'fontWeight': 'bold',
          'opacity': pwdState !== 'wrong' ? '0' : '100%'
        }}
      >{verifyTest('비밀번호', pwdState)}</p>
      <InputTemplate
        inputType="password"
        labelText="비밀번호 확인: "
        inputFor="PWD_check"
        handler={() => setPwdMatch(true)}
        placeholder='비밀번호를 한 번 더 입력해주세요.'
      />
      <p
        style={{
          'color': 'red',
          'fontWeight': 'bold',
          'opacity': pwdMatch ? '0' : '100%'
        }}
      >※ 비밀번호가 일치하지 않습니다.</p>
      <InputTemplate inputType="text" labelText="이메일: " inputFor="email_id" handler={() => setEmailAuth('')} />
      <p>@</p>
      { customOption(emailState, setEmailState, setEmailAuth) }
      <p
        style={{
          'color': 'red',
          'fontWeight': 'bold',
          'opacity': (emailAuth !== 1 && emailAuth !== 'wrong') ? '0' : '100%'
        }}
      >{ verifyTest('이메일 주소', emailAuth) }</p>
      <FormSubmit />
    </form>
  );
};

export default ModMemInfo;