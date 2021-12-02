/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { encryptor, decryptor } from '../../custom_modules/aeser';
import { hasher } from '../../custom_modules/hasher';
import FormSubmit from './module/components/FormSubmit';
import InputTemplate from './module/components/InputTemplate';
import { verifyId, verifyPwd, verifyNick, verifyEmail } from './module/utils';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';
import style from './module/styles/RegisterStyles';

const Register = () => {
  const [pwdMatch, setPwdMatch] = useState(true);
  const [emailState, setEmailState] = useState('');
  const [idState, setIdState] = useState('');
  const [pwdState, setPwdState] = useState('');
  const [nickState, setNickState] = useState('');
  const [emailAuth, setEmailAuth] = useState('');
  const history = useHistory();
  const customOption = (state, func) => {
    if (state === 'others') {
      return <input type="text" name="email_provider" onChange={() => setEmailAuth('')}/>
    }
    return (
      <select name="email_provider" onChange={e => func(e.target.value)} >
        <option value="">선택</option>
        <option value="gmail.com">gmail.com</option>
        <option value="naver.com">naver.com</option>
        <option value="hanmail.net">hanmail.net</option>
        <option value="others">직접 입력</option>
      </select>
    );
  };

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
  }

  return (
    <article
      id="register"
      css={css`
        ${style({ sizes, flex, border }, { idState })}
      `}
    >
      <h1>Register</h1>
      <form
        id="register-form"
        onSubmit={e => {
          e.preventDefault();
          if (e.target.PWD.value !== e.target.PWD_check.value) {
            setPwdMatch(false);
          }
          if (e.target.email_provider.value[0] === '@') {
            const temp = Array.from(e.target.email_provider.value);
            temp.shift();
            e.target.email_provider.value = temp.join('');
          }
          const inputs = Array.from(document.querySelectorAll('input'));
          const isEmpty = inputs.filter(input => input.value === '');
          const select = document.querySelector('select');
          const formData = {
            id: e.target.ID.value,
            pwd: e.target.PWD.value,
            nick: e.target.nickname.value,
            email: `${e.target.email_id.value}@${e.target.email_provider.value}`
          }
          const sofo = {}
          const checkInputVal = (id, pwd, nick, email) => {
            let isValid = true;
            if (verifyId(id) && verifyPwd(pwd) && verifyNick(nick) && verifyEmail(email)) {
              setIdState('');
              setPwdState('');
              setNickState('');
              setEmailAuth('');
              isValid=true;
            }
            if (!verifyId(id)) {
              setIdState('wrong');
              isValid=false;
            }
            if (!verifyPwd(pwd)) {
              setPwdState('wrong');
              isValid=false;
            }
            if (!verifyNick(nick)) {
              setNickState('wrong');
              isValid=false;
            }
            if (!verifyEmail(email)) {
              setEmailAuth('wrong');
              isValid=false;
            }
            return isValid;
          };
          const existCheck = async sofo => {
            await axios.post(
              // 'http://localhost:3001/member/register',
              `https://${sendTo}/member/register`,
              {foo: encryptor(sofo, process.env.REACT_APP_TRACER)},
              { withCredentials: true })
            .then(res => {
              if (res.data === 'success') {
                alert('회원가입이 완료되었습니다.\n로그인해 주세요.');
                history.push('/');
              } else {
                const tempObj = decryptor(res.data, process.env.REACT_APP_TRACER);
                setIdState(tempObj.id);
                setNickState(tempObj.nick);
                setEmailAuth(tempObj.email);
              }
            })
            .catch(err => alert(err));
          }
          if (select) {
            if (isEmpty[0] === undefined && select.value !== '') {
              if (checkInputVal(formData.id, formData.pwd, formData.nick, formData.email)) {
                sofo.id = formData.id;
                sofo.pwd = hasher(formData.pwd);
                sofo.nick = formData.nick;
                sofo.email = formData.email;
                existCheck(sofo);
              }
            } else {
              alert('정보를 전부 입력해주세요');
            }
          } else if (isEmpty[0] === undefined) {
            if (checkInputVal(formData.id, formData.pwd, formData.nick, formData.email)) {
              sofo.id = formData.id;
              sofo.pwd = hasher(formData.pwd);
              sofo.nick = formData.nick;
              sofo.email = formData.email;
              existCheck(sofo);
            }
          } else {
            alert('정보를 전부 입력해주세요');
          }
        }}
      >
        <div className="input-wrapper">
          <InputTemplate
            inputType="text"
            labelText="아이디"
            inputFor="ID"
            handler={() => setIdState('')}
            placeholder='아이디 (6~12자 이내, 영문, 숫자 사용)'
          />
          <p className="verify-error">{verifyTest('ID', idState)}</p>
        </div>
        <div className="input-wrapper">
          <InputTemplate
            inputType="password"
            labelText="비밀번호"
            inputFor="PWD"
            handler={() => {
              setPwdMatch(true);
              setPwdState('');
            }}
            placeholder='비밀번호 (8~16자 이내, 영문, 숫자, 기호(!,@,#,$,%,^,&,*) 사용)'
          />
          <p className="verify-error">{verifyTest('비밀번호', pwdState)}</p>
        </div>
        <div className="input-wrapper">
          <InputTemplate
            inputType="password"
            labelText="비밀번호 확인"
            inputFor="PWD_check"
            handler={() => setPwdMatch(true)}
            placeholder='비밀번호를 한 번 더 입력해주세요.'
          />
          <p className="verify-error">※ 비밀번호가 일치하지 않습니다.</p>
        </div>
        <div className="input-wrapper">
          <InputTemplate
            inputType="text"
            labelText="별명"
            inputFor="nickname"
            handler={() => setNickState('')}
            placeholder='별명 (2~10자 이내, 한글,영문, 숫자 사용)'
          />
          <p className="verify-error">{ verifyTest('별명', nickState) }</p>
        </div>
        <div className="input-wrapper">
          <div id="input-email">
            <InputTemplate
              inputType="text"
              labelText="이메일"
              inputFor="email_id"
              handler={() => setEmailAuth('')}
            />
            <p>@</p>
            { customOption(emailState, setEmailState) }
          </div>
          <p className="verify-error">{ verifyTest('이메일 주소', emailAuth) }</p>
        </div>
        <div className="submit-wrapper">
          <FormSubmit />
        </div>
      </form>
    </article>
  );
};

export default Register;