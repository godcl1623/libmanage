import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputTemplate from '../../Auth/module/components/InputTemplate';
import FormSubmit from '../../Auth/module/components/FormSubmit';
import { verifyPwd, verifyNick, verifyEmail } from '../../Auth/module/utils';
import { encryptor, decryptor } from '../../../custom_modules/aeser';
import { hasher } from '../../../custom_modules/hasher';
import {
  loginStatusCreator,
  logoutClickedCreator,
  userStateCreator,
  comparisonStateCreator,
  modalStateCreator
} from '../../../actions';
import { sendTo } from '../../../custom_modules/address';
import { border, flex, sizes } from '../../../styles';

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
      <option value="gmail.com">gmail.com</option>
      <option value="naver.com">naver.com</option>
      <option value="hanmail.net">hanmail.net</option>
      <option value="others">직접 입력</option>
    </select>
  );
};

const ModMemInfo = ({ userState }) => {
  const [pwdMatch, setPwdMatch] = useState(true);
  const [emailState, setEmailState] = useState('');
  const [pwdState, setPwdState] = useState('');
  const [nickState, setNickState] = useState('');
  const [emailAuth, setEmailAuth] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();
  return (
    <form
      ref={ref}
      css={css`
        ${sizes.full}
        ${flex.vertical}
        justify-content: space-between;

        * {
          ${sizes.free('100%')}
        }

        #contents-divider {
          margin-bottom: calc(var(--gap-standard) * 2);
          ${border}
          border-color: var(--btn-disable);
        }

        .input_container {
          margin-top: var(--gap-standard);
          padding: 0 var(--gap-standard);
          ${flex.vertical}
          align-items: flex-start;

          label {
            padding-left: var(--gap-standard);
            font-size: var(--font-size-normal);
          }

          input {
            margin: calc(var(--gap-standard) / 2) 0;
            ${border}
            border-color: var(--grey-dark);
            ${sizes.free('100%')}
          }

          p {
            font-size: var(--font-size-normal);
          }
        }

        #input-email {
          ${sizes.free('100%')}

          label {
            ${sizes.free('100%')}
            display: block;
          }

          input {
            ${sizes.free('48%')}
            display: inline-block;
          }

          p#divider {
            ${sizes.free('4%')}
            display: inline-block;
            text-align: center;
          }

          select {
            ${border}
            border-color: var(--grey-dark);
            border-radius: var(--border-rad-normal);
            padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
            ${sizes.free('48%')}
            display: inline-block;
            background: var(--white);
            font-size: var(--font-size-normal);
          }
        }

        .submit-container {
          ${flex.horizontal}
          ${sizes.free('100%', 'calc(var(--gap-multiply-big) * 2)')}

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
          }
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            #contents-divider {
            }

            #input-email {
              select {
              }
            }

            .submit-container {
              button:first-of-type {
                margin-right: calc(var(--gap-multiply-small) * 2);
              }
    
              button:last-of-type {
                margin-left: calc(var(--gap-multiply-small) * 2);
              }
            }
          }

          @media (max-width: 599px) {
            #contents-divider {
              margin-bottom: 40px;
            }

            .input_container {
              margin-top: 20px;
              padding: 0 10px;

              label {
                padding-left: 5px;
                font-size: 16px;
              }

              input {
                margin: 5px 0;
                padding: 5px 10px;
                min-height: 30px;
                font-size: 14px;
              }

              p {
                font-size: 12px;
              }
            }

            #input-email {
              input {
                ${sizes.free('40%')}
              }
    
              p#divider {
                ${sizes.free('10%')}
              }

              select {
                border-radius: 0;
                padding: 5px 10px;
                ${sizes.free('49%')}
                min-height: 30px;
                font-size: 14px;
              }
            }

            .submit-container {
              ${sizes.free('100%', '30px')}

              button {
                font-size: 14px;
              }

              button:first-of-type {
                margin-right: var(--gap-multiply-small);
              }

              button:last-of-type {
                margin-left: var(--gap-multiply-small);
              }
            }
          }
        }
      `}
      onSubmit={e => {
        e.preventDefault();
        if (e.target.email_provider.value[0] === '@') {
          const temp = Array.from(e.target.email_provider.value);
          temp.shift();
          e.target.email_provider.value = temp.join('');
        }
        const inputs = Array.from(ref.current.querySelectorAll('input'));
        const typed = inputs.filter(input => input.value !== '');
        const select = document.querySelector('select');
        const formData = {
          pwd: e.target.PWD.value || '',
          nick: e.target.nickname.value || '',
          email: e.target.email_id.value
            ? `${e.target.email_id.value}@${e.target.email_provider.value}`
            : ''
        };
        const sofo = {}
        const checkInputVal = (targetTxt, target) => {
          const defaultFunc = () => console.log();
          let verifyFunc = defaultFunc;
          let setState = defaultFunc;
          switch (targetTxt) {
            case 'PWD':
              verifyFunc = verifyPwd;
              setState = setPwdState;
              break;
            case 'nickname':
              verifyFunc = verifyNick;
              setState = setNickState;
              break;
            case 'email_id':
              verifyFunc = verifyEmail;
              setState = setEmailAuth;
              break;
            default:
              verifyFunc = defaultFunc;
              setState = defaultFunc;
              break;
          }
          if (target !== '') {
            let isValid = true;
            if (verifyFunc(target)) {
              setState('');
              isValid = true;
            } else {
              setState('wrong');
              isValid = false;
            }
            return isValid;
          }
        };
        const verifyLogic = async typed => {
          let result = false;
          const flags = {
            nickname: '',
            PWD: '',
            email_id: '',
            loop_done: false
          }
          await typed.forEach((type, idx) => {
            if (type.name === 'nickname') {
              if (checkInputVal(type.name, formData.nick)) {
                sofo.nick = formData.nick;
                flags.nickname = true;
              } else {
                flags.nickname = false;
              }
            }
            if (type.name === 'PWD') {
              if (checkInputVal(type.name, formData.pwd)) {
                sofo.pwd = hasher(formData.pwd);
                flags.PWD = true;
              } else {
                flags.PWD = false;
              }
            }
            if (type.name === 'email_id') {
              if (checkInputVal(type.name, formData.email)) {
                sofo.email = formData.email;
                flags.email_id = true;
              } else {
                flags.email_id = false;
              }
            }
            if (idx === typed.length - 1) {
              flags.loop_done = true;
            } else {
              flags.loop_done = false;
            }
          });
          const flagsVal = Object.values(flags)
            .slice(0, 3)
            .filter(val => val !== '')
            .filter(val => val !== true);
          if (flags.loop_done) {
            if (flagsVal.length === 0) {
              result = true;
            } else {
              result = false;
            }
          }
          return result;
        }
        const existCheck = async sofo => {
          const pack = {
            sofo,
            reqUser: userState.nickname
          }
          await axios.put(
            // 'http://localhost:3001/member/update',
            `https://${sendTo}/member/update`,
            {foo: encryptor(pack, process.env.REACT_APP_TRACER)},
            { withCredentials: true })
          .then(res => {
            if (res.data.result === false) {
              if (res.data.repeatedData.length > 1) {
                alert('중복되는 데이터가 있습니다. 다시 확인해주세요.');
              } else {
                switch(res.data.repeatedData[0]) {
                  case 'nick':
                    alert('닉네임이 중복됩니다.');
                    break;
                  case 'email':
                    alert('이메일이 중복됩니다.');
                    break;
                  default:
                    alert('오류가 발생했습니다.');
                    break;
                }
              }
            } else if (res.data === 'ERR') {
              alert(`오류가 발생했습니다(${res.data})`);
            } else if (res.data === 'success') {
              const message = {
                reqMsg: 'logout',
                million: localStorage.getItem('frog')
              }
              axios
                .post(
                  // 'http://localhost:3001/logout_process',
                  `https://${sendTo}/logout_process`,
                  { message },
                  { withCredentials: true }
                )
                .then(res => {
                  dispatch(logoutClickedCreator(true));
                  dispatch(userStateCreator(null));
                  dispatch(comparisonStateCreator(''));
                  dispatch(loginStatusCreator(res.data.isLoginSuccessful));
                  dispatch(modalStateCreator(false));
                  alert('회원 정보 변경 내역이 성공적으로 반영됐습니다. 다시 로그인 해주세요.');
                  history.push('/');
                })
                .catch(err => alert(err));
            }
          })
          .catch(err => alert(err));
        }
        if (select) {
          if (typed[0] !== undefined && select.value !== '') {
            if (e.target.PWD.value && e.target.PWD.value !== e.target.PWD_check.value) {
              setPwdMatch(false);
              alert('비밀번호를 확인해주세요.');
            } else {
              verifyLogic(typed)
                .then(res => {
                  if (res) {
                    existCheck(sofo);
                  }
                });
            }
          }
        } else if (typed[0] !== undefined) {
          if (e.target.PWD.value && e.target.PWD.value !== e.target.PWD_check.value) {
            setPwdMatch(false);
            alert('비밀번호를 확인해주세요.');
          } else {
            verifyLogic(typed)
              .then(res => {
                if (res) {
                  existCheck(sofo);
                }
              });
          }
        }
      }}
    >
      <div id="contents-divider">
        <div
          className="input_container"
        >
          <InputTemplate
            inputType="text"
            labelText="별명"
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
        </div>
        <div
          className="input_container"
        >
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
          <p
            style={{
              'color': 'red',
              'fontWeight': 'bold',
              'opacity': pwdState !== 'wrong' ? '0' : '100%'
            }}
          >{verifyTest('비밀번호', pwdState)}</p>
        </div>
        <div
          className="input_container"
        >
          <InputTemplate
            inputType="password"
            labelText="비밀번호 확인"
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
        </div>
        <div
          className="input_container"
        >
          <div id="input-email">
            <InputTemplate inputType="text" labelText="이메일" inputFor="email_id" handler={() => setEmailAuth('')} />
            <p id="divider">@</p>
            { customOption(emailState, setEmailState, setEmailAuth) }
          </div>
          <p
            style={{
              'color': 'red',
              'fontWeight': 'bold',
              'opacity': (emailAuth !== 1 && emailAuth !== 'wrong') ? '0' : '100%'
            }}
          >{ verifyTest('이메일 주소', emailAuth) }</p>
        </div>
      </div>
      <div className="submit-container">
        <FormSubmit formOrigin="Main" />
      </div>
    </form>
  );
};

export default ModMemInfo;