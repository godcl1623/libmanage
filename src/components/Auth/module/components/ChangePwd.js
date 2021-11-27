/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputTemplate from './InputTemplate';
import FormSubmit from './FormSubmit';
import { tokenStateCreator } from '../../../../actions';
import { encryptor } from '../../../../custom_modules/aeser';
import { hasher } from '../../../../custom_modules/hasher';
import { verifyPwd } from '../utils';
import { sendTo } from '../../../../custom_modules/address';
import { flex, sizes } from '../../../../styles';

const ChangePwd = ({ token, reqTime }) => {
  const [pwdMatch, setPwdMatch] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId, ttl, tokenId, originTime } = token;
  const checkValidation = (pwd, pwdCheck, verifyFunc) => {
    let isReadyToSubmit;
    if (!verifyFunc(pwd) && pwd !== pwdCheck) {
      setIsValid(false);
      setPwdMatch(false);
      isReadyToSubmit = false;
    } else if (verifyFunc(pwd) && pwd !== pwdCheck) {
      setIsValid(true);
      setPwdMatch(false);
      isReadyToSubmit = false;
    } else if (!verifyFunc(pwd) && pwd === pwdCheck) {
      setIsValid(false);
      setPwdMatch(true);
      isReadyToSubmit = false;
    } else {
      setIsValid(true);
      setPwdMatch(true);
      isReadyToSubmit = true;
    }
    return isReadyToSubmit;
  };
  return (
    <form
      css={css`
        border-radius: var(--border-rad-big);
        padding: calc(var(--gap-standard) * 2);
        background: white;
        ${sizes.free('40%', 'max-content')}
        ${flex.vertical}
        justify-content: space-between;
        box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);

        .input-wrapper {
          ${flex.vertical}
          align-items: flex-start;
          ${sizes.free('100%')}
          font-size: var(--font-size-normal);

          * {
            ${sizes.free('100%')}
          }

          input {
            margin: calc(var(--gap-multiply-small) * 2) 0;
          }

          .verify-error {
            margin-bottom: calc(var(--gap-multiply-big) * 2);
            color: red;
            font-weight: bold;
          }

          .verify-error#input-pwd {
            opacity: ${isValid ? '0' : '100%'};
          }

          .verify-error#input-pwd-check {
            opacity: ${pwdMatch ? '0' : '100%'};
          }
        }

        .submit-wrapper {
          ${flex.horizontal}
          ${sizes.free('100%', '2.604vw')}

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
            background: var(--btn-active);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
            background: var(--btn-active);
          }
        }

        @media (orientation: portrait) {
          ${sizes.free('60%', 'max-content')}
          box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);

          .submit-wrapper {
            ${sizes.free('100%', `${2.604 * 1.778}vw`)}

            button:first-of-type {
              margin-right: calc(var(--gap-multiply-small) * 2);
            }

            button:last-of-type {
              margin-left: calc(var(--gap-multiply-small) * 2);
            }
          }
        }
      `}
      onSubmit={e => {
        e.preventDefault();
        const pwd = e.target.PWD.value;
        const pwdCheck = e.target.PWD_check.value;
        const inputs = Array.from(document.querySelectorAll('input'));
        const isEmpty = inputs.filter(input => input.value === '');
        const formData = {};
        if (isEmpty[0] !== undefined) {
          alert('정보를 전부 입력해주세요');
        } else if (checkValidation(pwd, pwdCheck, verifyPwd)) {
          formData.id = userId;
          formData.pwd = hasher(pwd);
          formData.tokenId = tokenId;
          formData.ttl = ttl;
          formData.reqTime = reqTime();
          formData.originTime = originTime;
          // axios.post('http://localhost:3001/member/reset/pwd', { formData: encryptor(formData, process.env.REACT_APP_TRACER) }, {withCredentials: true})
          axios.post(`https://${sendTo}/member/reset/pwd`, { formData: encryptor(formData, process.env.REACT_APP_TRACER) }, {withCredentials: true})
            .then(res => {
              if (res.data === 'complete') {
                alert('비밀번호가 변경되었습니다.\n다시 로그인해주세요.');
                history.push('/');
              } else if (res.data === 'expired') {
                dispatch(tokenStateCreator(false));
              }else {
                alert('오류가 발생했습니다.');
              }
            })
            .catch(err => alert(err));
        }
      }}
    >
      <div className="input-wrapper">
        <InputTemplate
          inputType="password"
          labelText="비밀번호"
          inputFor="PWD"
          handler={() => {
            setIsValid(true);
          }}
          placeholder='비밀번호 (8~16자 이내, 영문, 숫자, 기호(!,@,#,$,%,^,&,*) 사용)'
        />
        <p
          className="verify-error"
          id="input-pwd"
        >※ 비밀번호 형식과 맞지 않습니다.</p>
        <InputTemplate
          inputType="password"
          labelText="비밀번호 확인"
          inputFor="PWD_check"
          handler={() => setPwdMatch(true)}
          placeholder='비밀번호를 한 번 더 입력해주세요.'
        />
        <p
          className="verify-error"
          id="input-pwd-check"
        >※ 비밀번호가 일치하지 않습니다.</p>
      </div>
      <div className="submit-wrapper">
        <FormSubmit />
      </div>
    </form>
  );
};

export default ChangePwd;