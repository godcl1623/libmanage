import React from 'react';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { hasher, salter } from '../../../custom_modules/hasher';
import { encryptor } from '../../../custom_modules/aeser';
import FormSubmit from '../../Auth/module/components/FormSubmit';
import { sendTo } from '../../../custom_modules/address';
import { flex, sizes } from '../../../styles';

const CheckMemInfo = ({ userState, setState}) => (
  <form
    css={css`
      ${flex.vertical}
      ${sizes.full}

      .input_container {
        // margin: 80px 0;
        margin: 4.167vw 0;
      }

      .submit_container {
        ${sizes.free('60%')}
        ${flex.horizontal}

        button {
          ${sizes.free('100%', '2.604vw')}
          // font-size: 20px;
          font-size: 1.042vw;
        }

        button:first-of-type {
          // margin-right: 5px;
          margin-right: 0.26vw;
        }

        button:last-of-type {
          // margin-left: 5px;
          margin-left: 0.26vw;
        }
      }
    `}
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
    <h2>본인 인증을 위해 비밀번호를 입력해주세요.</h2>
    <div
      className="input_container"
    >
      <label htmlFor="PWD">PW: </label>
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