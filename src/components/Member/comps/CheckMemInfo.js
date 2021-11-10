import React from 'react';
import axios from 'axios';
import { hasher, salter } from '../../../custom_modules/hasher';
import { encryptor } from '../../../custom_modules/aeser';
import FormSubmit from '../../Auth/module/components/FormSubmit';
import { sendTo } from '../../../custom_modules/address';

const CheckMemInfo = ({ userState, setState}) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      const verificationData = {
        NICK: '',
        PWD: ''
      };
      if (e.target.PWD.value !== '') {
        verificationData.NICK = userState.nickname;
        verificationData.PWD = salter(hasher(e.target.PWD.value));
      }
      axios
        .post(
          // 'http://localhost:3001/verify',
          `https://${sendTo}/verify`,
          { sofo: encryptor(verificationData, process.env.REACT_APP_TRACER) },
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
    <p>본인 인증을 위해 비밀번호를 입력해주세요.</p>
    <div
      className="input_container"
    >
      <label htmlFor="PWD">PW: </label>
      <input type="password" name="PWD" />
    </div>
    <FormSubmit formOrigin="Main" />
  </form>
);

export default CheckMemInfo;