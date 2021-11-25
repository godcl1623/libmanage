/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FormSubmit from './module/components/FormSubmit';
import FindRequested from './module/components/FindRequested';
import { encryptor } from '../../custom_modules/aeser';
import { sendTo } from '../../custom_modules/address';
import { border, flex, sizes } from '../../styles';
import { verifyId, verifyNick, verifyEmail } from './module/utils';

const Find = ({ mode }) => {
  const [tabState, setTabState] = useState(mode);

  const tabHandler = str => setTabState(str);

  useEffect(() => {
    const abortCon = new AbortController();
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {input.value = ''});
    return () => abortCon.abort();
  }, [tabState]);

  return (
    <article
      id="find"
      css={css`
        margin: var(--gap-standard) 0;
        padding: var(--gap-standard);
        border-radius: var(--border-rad-big);
        ${flex.vertical}
        ${sizes.free('40vw', '100%')}
        background: white;
        // box-shadow: 0 0 10px 1px var(--grey-dark);
        box-shadow: 0 0 0.521vw 0.052vw var(--grey-dark);

        .contents-wrapper {
          ${flex.vertical}
          ${sizes.full}
        }

        .tab-wrapper {
          ${flex.horizontal}
          justify-content: flex-start;
          ${sizes.free('100%')}
        }

        .tab-wrapper a {
          ${border}
          border-bottom: none;
          // border-radius: 7px;
          border-radius: 0.365vw;
          ${sizes.free('20%', '1.563vw')}
          // font-size: 18px;
          font-size: 0.938vw;
          ${flex.horizontal}
          text-decoration: none;
        
          :hover {
            -webkit-filter: brightness(90%);
                    filter: brightness(90%);
          }
        
          :active {
            -webkit-transform: scale(0.98);
                -ms-transform: scale(0.98);
                    transform: scale(0.98);
          }
        }

        .tab-wrapper a#find_id {
          border-right: none;
          border-radius: var(--border-rad-big) 0 0 0;
          background: ${tabState === 'id' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
        }
        
        .tab-wrapper a#find_pwd {
          border-radius: 0 var(--border-rad-big) 0 0;
          background: ${tabState === 'pwd' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
        }

        .form-wrapper {
          border-radius: 0 var(--border-rad-big) var(--border-rad-big);
          ${flex.vertical}
          ${sizes.free('100%', '50%')}
        }

        .form-wrapper form {
          ${sizes.full}
        }
        
        .form-wrapper .input-wrapper {
          // margin-bottom: 50px;
          margin-bottom: 2.604vw;
          ${border}
          // padding: 20px 10px;
          padding: 1.042vw 0.521vw;
          ${flex.vertical}
          ${sizes.free('100%', 'calc(100% - 2.604vw)')}
          font-size: var(--font-size-normal);
        }
        
        .form-wrapper .input-wrapper > div {
          // margin-bottom: 40px;
          margin-bottom: 2.083vw;
          ${flex.vertical}
          align-items: flex-start;
          ${sizes.free('100%')}
        }

        .form-wrapper .input-wrapper > div label {
          // margin-bottom: 10px;
          margin-bottom: 0.521vw;
          ${sizes.free('30%')}
        }

        .form-wrapper .input-wrapper > div input {
          ${sizes.free('100%')}
        }

        .form-wrapper .submit-wrapper {
          ${flex.horizontal}
          ${sizes.free('100%', '2.604vw')}
        }

        .form-wrapper .submit-wrapper button:first-of-type {
          // margin-right: 5px;
          margin-right: 0.26vw;
          background: var(--btn-active);
        }

        .form-wrapper .submit-wrapper button:last-of-type {
          // margin-left: 5px;
          margin-left: 0.26vw;
          background: var(--btn-active);
        }
      `}
    >
      <section
        className="contents-wrapper"
      >
        <div className="tab-wrapper">
          <Link to="/member/find/id" id="find_id" onClick={() => tabHandler('id')}>아이디 찾기</Link>
          <Link to="/member/find/pwd" id="find_pwd" onClick={() => tabHandler('pwd')}>비밀번호 찾기</Link>
        </div>
        <div className="form-wrapper">
          <form
            onSubmit={e => {
              e.preventDefault();
              const inputs = Array.from(document.querySelectorAll('input'));
              const emptyInputCheck = inputs.filter(input => input.value === '');
              const formData = {};
              const verifyForm = (...args) => {
                let result = false;
                if (args.length === 2) {
                  const verifyFuncs = [verifyNick, verifyEmail];
                  const verifyResult = args
                    .map((arg, idx) => verifyFuncs[idx](arg) ? null : idx)
                    .filter(ele => ele !== null);
                  if (verifyResult.length === 0) {
                    result = true;
                  } else {
                    result = verifyResult;
                  }
                } else if (args.length === 3) {
                  const verifyFuncs = [verifyId, verifyNick, verifyEmail];
                  const verifyResult = args
                    .map((arg, idx) => verifyFuncs[idx](arg) ? null : idx)
                    .filter(ele => ele !== null);
                  if (verifyResult.length === 0) {
                    result = true;
                  } else {
                    result = verifyResult;
                  }
                }
                return result;
              };
              const infoCheck = async infoObj => {
              // await axios.post(`http://localhost:3001/member/find/${tabState}`, { infoObj: encryptor(infoObj, process.env.REACT_APP_TRACER) }, { withCredentials: true })
              await axios.post(`https://${sendTo}/member/find/${tabState}`, { infoObj: encryptor(infoObj, process.env.REACT_APP_TRACER) }, { withCredentials: true })
                  .then(res => alert(res.data))
                  .catch(err => alert(err));
              };
              if (tabState === 'id') {
                const nickVal = e.target.nickname.value;
                const emailVal = e.target.email.value;
                const verifyResult = verifyForm(nickVal, emailVal);
                if (emptyInputCheck.length !== 0) {
                  alert('정보를 입력해주세요.')
                } else if (typeof verifyResult !== 'object') {
                  formData.nick = nickVal;
                  formData.email = emailVal;
                  infoCheck(formData);
                } else {
                  const targetList = ['별명', '이메일 주소']
                  const alertMsg = verifyResult.map(idx => targetList[idx]).join(', ');
                  alert(`다음 항목이 올바르지 않습니다: ${alertMsg}`);
                }
              } else {
                const idVal = e.target.ID.value;
                const nickVal = e.target.nickname.value;
                const emailVal = e.target.email.value;
                const verifyResult = verifyForm(idVal, nickVal, emailVal);
                if (emptyInputCheck.length !== 0) {
                  alert('정보를 입력해주세요.')
                } else if (typeof verifyResult !== 'object') {
                  formData.id = idVal;
                  formData.nick = nickVal;
                  formData.email = emailVal;
                  infoCheck(formData);
                } else {
                  const targetList = ['아이디', '별명', '이메일 주소']
                  const alertMsg = verifyResult.map(idx => targetList[idx]).join(', ');
                  alert(`다음 항목이 올바르지 않습니다: ${alertMsg}`);
                }
              }
            }}
          >
            <div className="input-wrapper">
              <FindRequested mode={mode} />
            </div>
            <div className="submit-wrapper">
              <FormSubmit />
            </div>
          </form>
        </div>
      </section>
    </article>
  );
};

export default Find;