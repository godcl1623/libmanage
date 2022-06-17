import React, { memo } from 'react';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { hasher, salter } from '../../../custom_modules/hasher';
import { encryptor } from '../../../custom_modules/aeser';
import FormSubmit from '../../Auth/module/components/FormSubmit';
import { sendTo } from '../../../custom_modules/address';
import { border, flex, sizes } from '../../../styles';
import { checkInfoStyle } from '../styles/memInfoStyle';
import { StyleSet } from '../../../custom_modules/commonUtils';

// const FormSubmit = memo(FormSubmit);

// props 타입 수정 필요
const CheckMemInfo = ({ userState, setState}: any) => (
  <form
    css={css`${checkInfoStyle({ flex, sizes, border } as StyleSet)}`}
    onSubmit={e => {
      e.preventDefault();
      const verificationData = {
        NICK: '',
        PWD: ''
      };
      if (e.currentTarget.PWD.value !== '') {
        verificationData.NICK = userState.nickname;
        verificationData.PWD = salter(hasher(e.currentTarget.PWD.value));
      }
      axios
        .post(
          // 'http://localhost:3003/verify',
          `https://${sendTo}/verify`,
          { sofo: encryptor(verificationData, process.env.REACT_APP_TRACER as string) },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data) {
            setState(res.data);
          } else {
            alert('비밀번호를 확인해주세요.');
          }
        })
        .catch(err => alert(err));
    }}
  >
    {
      window.innerWidth < 1024
      ?
      <h2>{`본인 인증을 위해\n비밀번호를 입력해주세요.`}</h2>
      :
      <h2>본인 인증을 위해 비밀번호를 입력해주세요.</h2>
    }
    <div
      className="input_container"
    >
      <label htmlFor="PWD">PW </label>
      <input type="password" name="PWD" />
    </div>
    <div
      className="submit_container"
    >
      <FormSubmit formOrigin="Main" />
    </div>
  </form>
);

export default CheckMemInfo;