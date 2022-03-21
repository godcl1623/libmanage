import React, { useState, useRef, memo, Dispatch } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputTemplate from '../../Auth/module/components/InputTemplate';
import FormSubmit from '../../Auth/module/components/FormSubmit';
import { verifyPwd, verifyNick, verifyEmail } from '../../Auth/module/utils';
import { encryptor } from '../../../custom_modules/aeser';
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
import { modInfoStyle } from '../styles/memInfoStyle';
import { StyleSet } from '../../../custom_modules/commonUtils';
// 테스트
import {
  useAppDispatch,
  setLoginStat,
  setLogoutClickStat,
  setUserState,
  setCompareState,
  setModalState
} from '../../../slices';

// const InputTemplate = memo(InputTemplate);
// const FormSubmit = memo(FormSubmit);

// 파라미터 타입 확인 필요
const verifyTest = (verifyValue: string, verifyState: string | number) => {
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

// 파라미터 타입 확인 필요
const customOption = (
  state: string,
  func1: (val: string) => void,
  func2: (val: string) => void
) => {
  if (state === 'others') {
    return <input type="text" name="email_provider" onChange={() => func2('')} />;
  }
  return (
    <select name="email_provider" onChange={e => func1(e.target.value)}>
      <option value="">선택</option>
      <option value="gmail.com">gmail.com</option>
      <option value="naver.com">naver.com</option>
      <option value="hanmail.net">hanmail.net</option>
      <option value="others">직접 입력</option>
    </select>
  );
};

// props 타입 수정 필요
const ModMemInfo = ({ userState }: any) => {
  const [pwdMatch, setPwdMatch] = useState(true);
  const [emailState, setEmailState] = useState('');
  const [pwdState, setPwdState] = useState<string | number>('');
  const [nickState, setNickState] = useState<string | number>('');
  const [emailAuth, setEmailAuth] = useState<string | number>('');
  const dispatch = useDispatch();
  // 테스트
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement | null>(null);
  return (
    <form
      ref={ref}
      css={css`
        ${modInfoStyle({ flex, sizes, border } as StyleSet)}
      `}
      onSubmit={e => {
        e.preventDefault();
        if (e.currentTarget.email_provider.value[0] === '@') {
          const temp = Array.from(e.currentTarget.email_provider.value);
          temp.shift();
          e.currentTarget.email_provider.value = temp.join('');
        }
        const inputs = Array.from((ref.current! as HTMLFormElement).querySelectorAll('input'));
        const typed = inputs.filter(input => input.value !== '');
        const select = document.querySelector('select');
        const formData = {
          pwd: e.currentTarget.PWD.value || '',
          nick: e.currentTarget.nickname.value || '',
          email: e.currentTarget.email_id.value
            ? `${e.currentTarget.email_id.value}@${e.currentTarget.email_provider.value}`
            : ''
        };
        const sofo: Record<string, string> = {};
        // 파라미터 타입 확인 필요
        const checkInputVal = (targetTxt: string, target: string) => {
          // 합수 타입 수정 필요
          type TempFuncType =
            | (() => void)
            | ((string: string) => boolean)
            | ((string: string) => string)
            | Dispatch<React.SetStateAction<string | number>>;
          const defaultFunc: TempFuncType = () => console.log();
          let verifyFunc: TempFuncType = defaultFunc;
          let setState: TempFuncType = defaultFunc;
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
        // 파라미터 타입 확인 필요
        const verifyLogic = async (typed: any[]) => {
          let result = false;
          const flags: Record<string, string | boolean> = {
            nickname: '',
            PWD: '',
            email_id: '',
            loop_done: false
          };
          // 파라미터 타입 확인 필요
          await typed.forEach((type: any, idx: number) => {
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
            }
          });
          // 각 파라미터 타입 확인 필요
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
        };
        // 파라미터 타입 확인 필요
        const existCheck = async (sofo: Record<string, string>) => {
          const pack = {
            sofo,
            reqUser: userState.nickname
          };
          await axios
            .put(
              'http://localhost:3003/member/update',
              // `https://${sendTo}/member/update`,
              { foo: encryptor(pack, process.env.REACT_APP_TRACER as string) },
              { withCredentials: true }
            )
            .then(res => {
              if (res.data.result === false) {
                if (res.data.repeatedData.length > 1) {
                  alert('중복되는 데이터가 있습니다. 다시 확인해주세요.');
                } else {
                  switch (res.data.repeatedData[0]) {
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
                };
                axios
                  .post(
                    'http://localhost:3003/logout_process',
                    // `https://${sendTo}/logout_process`,
                    { message },
                    { withCredentials: true }
                  )
                  .then(res => {
                    // dispatch(logoutClickedCreator(true));
                    appDispatch(setLogoutClickStat(true));
                    // dispatch(userStateCreator(null));
                    appDispatch(setUserState(null));
                    // dispatch(comparisonStateCreator(''));
                    appDispatch(setCompareState(''));
                    // dispatch(loginStatusCreator(res.data.isLoginSuccessful));
                    appDispatch(setLoginStat(res.data.isLoginSuccessful));
                    // dispatch(modalStateCreator(false));
                    appDispatch(setModalState(false));
                    alert('회원 정보 변경 내역이 성공적으로 반영됐습니다. 다시 로그인 해주세요.');
                    navigate('/');
                  })
                  .catch(err => alert(err));
              }
            })
            .catch(err => alert(err));
        };
        if (select) {
          if (typed[0] !== undefined && select.value !== '') {
            if (
              e.currentTarget.PWD.value &&
              e.currentTarget.PWD.value !== e.currentTarget.PWD_check.value
            ) {
              setPwdMatch(false);
              alert('비밀번호를 확인해주세요.');
            } else {
              verifyLogic(typed).then(res => {
                if (res) {
                  existCheck(sofo);
                }
              });
            }
          }
        } else if (typed[0] !== undefined) {
          if (
            e.currentTarget.PWD.value &&
            e.currentTarget.PWD.value !== e.currentTarget.PWD_check.value
          ) {
            setPwdMatch(false);
            alert('비밀번호를 확인해주세요.');
          } else {
            verifyLogic(typed).then(res => {
              if (res) {
                existCheck(sofo);
              }
            });
          }
        }
      }}
    >
      <div id="contents-divider">
        <div className="input_container">
          <InputTemplate
            inputType="text"
            labelText="별명"
            inputFor="nickname"
            handler={() => setNickState('')}
            placeholder="별명 (2~10자 이내, 한글,영문, 숫자 사용)"
          />
          <p
            style={{
              color: 'red',
              fontWeight: 'bold',
              opacity: nickState !== 1 && nickState !== 'wrong' ? '0' : '100%'
            }}
          >
            {verifyTest('별명', nickState)}
          </p>
        </div>
        <div className="input_container">
          <InputTemplate
            inputType="password"
            labelText="비밀번호"
            inputFor="PWD"
            handler={() => {
              setPwdMatch(true);
              setPwdState('');
            }}
            placeholder="비밀번호 (8~16자 이내, 영문, 숫자, 기호(!,@,#,$,%,^,&,*) 사용)"
          />
          <p
            style={{
              color: 'red',
              fontWeight: 'bold',
              opacity: pwdState !== 'wrong' ? '0' : '100%'
            }}
          >
            {verifyTest('비밀번호', pwdState)}
          </p>
        </div>
        <div className="input_container">
          <InputTemplate
            inputType="password"
            labelText="비밀번호 확인"
            inputFor="PWD_check"
            handler={() => setPwdMatch(true)}
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
          <p
            style={{
              color: 'red',
              fontWeight: 'bold',
              opacity: pwdMatch ? '0' : '100%'
            }}
          >
            ※ 비밀번호가 일치하지 않습니다.
          </p>
        </div>
        <div className="input_container">
          <div id="input-email">
            <InputTemplate
              inputType="text"
              labelText="이메일"
              inputFor="email_id"
              handler={() => setEmailAuth('')}
            />
            <p id="divider">@</p>
            {customOption(emailState, setEmailState, setEmailAuth)}
          </div>
          <p
            style={{
              color: 'red',
              fontWeight: 'bold',
              opacity: emailAuth !== 1 && emailAuth !== 'wrong' ? '0' : '100%'
            }}
          >
            {verifyTest('이메일 주소', emailAuth)}
          </p>
        </div>
      </div>
      <div className="submit-container">
        <FormSubmit formOrigin="Main" />
      </div>
    </form>
  );
};

export default ModMemInfo;
