import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FormSubmit from '../../Auth/module/components/FormSubmit';
import { encryptor } from '../../../custom_modules/aeser';
import { sendTo } from '../../../custom_modules/address';
import {
  loginStatusCreator,
  logoutClickedCreator,
  userStateCreator,
  comparisonStateCreator,
  modalStateCreator
} from '../../../actions';
import { border, flex, sizes } from '../../../styles';

const DelMemInfo = ({ userState }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <article
      id="Del-Mem-Info"
      css={css`
        ${sizes.full}
        ${flex.vertical}

        * {
          ${sizes.free('100%')}
        }

        h2, h3 {
          margin-bottom: var(--gap-standard);
        }

        #guidance {
          ${border}
          border-bottom: 0;
          padding: calc(var(--gap-standard) * 2);
          ${sizes.full}

          h1 {
            margin-bottom: var(--gap-standard);
            text-align: center;
            font-size: calc(var(--font-size-normal) * 2);
          }

          li {
            padding-left: var(--gap-standard);
            list-style: disc inside;
            font-size: var(--font-size-standard);
          }
        }

        form {
          ${sizes.full}
          ${flex.vertical}
          justify-content: space-between;
          text-align: center;
          
          h3, p, input {
            margin: var(--gap-standard) 0;
          }

          input {
            ${border}
            box-shadow: 0 0 0.052vw 0.052vw var(--grey-dark);
          }

          p {
            font-size: var(--font-size-standard);
          }

          span {
            color: #ff1515;
          }

          .check-delete {
            margin-bottom: calc(var(--gap-standard) * 2);
            ${border}
            border-top: 0;
            padding: 0 calc(var(--gap-standard) * 2);
            ${flex.vertical}
            ${sizes.free('100%', 'calc(100% - 4.688vw)')}
          }
        }


        .submit-wrapper {
          ${flex.horizontal}
          ${sizes.free('100%', 'calc(var(--gap-standard) * 2)')}

          button:first-of-type {
            margin-right: var(--gap-multiply-small);
          }

          button:last-of-type {
            margin-left: var(--gap-multiply-small);
          }
        }

        @media (orientation: portrait) {
          form {
            input {
              box-shadow: 0 0 ${0.052 * 1.778}vw ${0.052 * 1.778}vw var(--grey-dark);
            }

            .check-delete {
              ${sizes.free('100%', `calc(100% - ${4.688 * 1.778}vw)`)}
            }
          }

          .submit-wrapper {
            button:first-of-type {
              margin-right: calc(var(--gap-multiply-small) * 2);
            }
  
            button:last-of-type {
              margin-left: calc(var(--gap-multiply-small) * 2);
            }
          }
        }
      `}
    >
      <div id="guidance">
        <h1>탈퇴 안내</h1>
        <h3>회원탈퇴를 신청하기 전에 안내 사항을 확인해주시기 바랍니다.</h3>
        <section>
          <h2>탈퇴 후 삭제되는 개인 정보</h2>
          <ul>
            <li>사용자 아이디</li>
            <li>사용자 비밀번호</li>
            <li>사용자 닉네임</li>
            <li>사용자 이메일</li>
            <li>사용자 연동 스토어 및 라이브러리 정보</li>
          </ul>
        </section>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          const submittedText = e.target.del_info_check.value;
          if (submittedText !== '회원탈퇴') {
            alert('입력된 확인 문구가 올바르지 않습니다.')
          } else {
            const reqUser = encryptor(userState.nickname, process.env.REACT_APP_TRACER);
            axios.delete(
              // `http://localhost:3001/member`,
              `https://${sendTo}/member`,
              {
                headers: {
                  withCredentials: true
                },
                data: {
                  reqUser
                }
              },
            )
              .then(res => {
                if (res.data === 'success') {
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
                        alert('회원탈퇴가 완료됐습니다.');
                        history.push('/');
                      })
                      .catch(err => alert(err));
                } else {
                  alert('오류가 발생했습니다.');
                }
              })
          }
        }}
      >
        <div
          className="check-delete"
        >
          <h3>회원탈퇴를 희망하시는 경우 아래 입력창에 '<span>회원탈퇴</span>'를 입력하신 후 확인 버튼을 눌러주세요.</h3>
          <p>※ 탈퇴 신청이 접수된 계정은 복구가 불가합니다.</p>
          <input type="text" name="del_info_check" />
        </div>
        <div
          className="submit-wrapper"
        >
          <FormSubmit formOrigin='Main' />
        </div>
      </form>
    </article>
  );
}

export default DelMemInfo;