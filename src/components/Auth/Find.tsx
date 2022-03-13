/* eslint-disable no-alert */
import React, { useState, useEffect, memo } from 'react';
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
import style from './module/styles/FindStyles';
import { StyleSet } from '../../custom_modules/commonUtils';

const MemoedSubmit = memo(FormSubmit);
const MemoedFindReq = memo(FindRequested);
const MemoedLink = memo(Link);

const Find = ({ mode }: any) => {
  const [tabState, setTabState] = useState(mode);

  const tabHandler = (str: string) => setTabState(str);
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
        ${style(({ border, flex, sizes } as StyleSet), ({ tabState } as StyleSet))}
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
              type FormCheck = {
                id?: string;
                nick?: string;
                email?: string;
              }
              const inputs = Array.from(document.querySelectorAll('input'));
              const emptyInputCheck = inputs.filter(input => input.value === '');
              const formData: FormCheck = {};
              const verifyForm = (...args: string[]) => {
                // 타입 체크 필요
                let result: boolean | (number | null)[] = false;
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
              const infoCheck = async (infoObj: FormCheck) => {
              // await axios.post(`http://localhost:3003/member/find/${tabState}`, { infoObj: encryptor(infoObj, process.env.REACT_APP_TRACER as string) }, { withCredentials: true })
              await axios.post(`https://${sendTo}/member/find/${tabState}`, { infoObj: encryptor(infoObj, process.env.REACT_APP_TRACER as string) }, { withCredentials: true })
                  .then(res => alert(res.data))
                  .catch(err => alert(err));
              };
              if (tabState === 'id') {
                // 타입 작동 확인 필요
                const nickVal = (e.target as any).nickname.value;
                const emailVal = (e.target as any).email.value;
                const verifyResult = verifyForm(nickVal, emailVal);
                if (emptyInputCheck.length !== 0) {
                  alert('정보를 입력해주세요.')
                } else if (typeof verifyResult !== 'object') {
                  formData.nick = nickVal;
                  formData.email = emailVal;
                  infoCheck(formData);
                } else {
                  const targetList = ['별명', '이메일 주소']
                  const alertMsg = verifyResult.map(idx => targetList[idx as number]).join(', ');
                  alert(`다음 항목이 올바르지 않습니다: ${alertMsg}`);
                }
              } else {
                // 타입 확인 필요
                const idVal = (e.target as any).ID.value;
                const nickVal = (e.target as any).nickname.value;
                const emailVal = (e.target as any).email.value;
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
                  const alertMsg = verifyResult.map(idx => targetList[idx as number]).join(', ');
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