import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FormSubmit from '../../Forms/FormSubmit';
import { encryptor } from '../../../custom_modules/aeser';
import { sendTo } from '../../../custom_modules/address';
import { border, flex, sizes } from '../../../styles';
import { delInfoStyle } from '../styles/memInfoStyle';
import { StyleSet } from '../../../custom_modules/commonUtils';
import {
  useAppDispatch,
  setLoginStat,
  setLogoutClickStat,
  setUserState,
  setCompareState,
  setModalState
} from '../../../slices';

const DelMemInfo = ({ userState }: any) => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <article
      id="Del-Mem-Info"
      css={css`
        ${delInfoStyle({ flex, sizes, border } as StyleSet)}
      `}
    >
      <div id="guidance">
        <h1>탈퇴 안내</h1>
        {
          window.innerWidth < 1024
          ?
            <h3>{`회원탈퇴를 신청하기 전에\n안내 사항을 확인해주시기 바랍니다.`}</h3>
          :
            <h3>회원탈퇴를 신청하기 전에 안내 사항을 확인해주시기 바랍니다.</h3>
        }
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
          const submittedText = e.currentTarget.del_info_check.value;
          if (submittedText !== '회원탈퇴') {
            alert('입력된 확인 문구가 올바르지 않습니다.');
          } else {
            const reqUser = encryptor(userState.nickname, process.env.REACT_APP_TRACER as string);
            axios
              .delete(
                `https://${sendTo}/member`,
                {
                  headers: {
                    withCredentials: true
                  },
                  data: {
                    reqUser
                  }
                }
              )
              .then(res => {
                if (res.data === 'success') {
                  const message = {
                    reqMsg: 'logout',
                    million: localStorage.getItem('frog')
                  };
                  axios
                    .post(
                      `https://${sendTo}/logout_process`,
                      { message },
                      { withCredentials: true }
                    )
                    .then(res => {
                      appDispatch(setLogoutClickStat(true));
                      appDispatch(setUserState(null));
                      appDispatch(setCompareState(''));
                      appDispatch(setLoginStat(res.data.isLoginSuccessful));
                      appDispatch(setModalState(false));
                      alert('회원탈퇴가 완료됐습니다.');
                      navigate('/');
                    })
                    .catch(err => alert(err));
                } else {
                  alert('오류가 발생했습니다.');
                }
              });
          }
        }}
      >
        <div className="check-delete">
          {
            window.innerWidth < 1024
            ?
              <h3>
                  회원탈퇴를 희망하시는 경우<br />
                  아래 입력창에 '<span>회원탈퇴</span>'를 입력하신 후<br />
                  확인 버튼을 눌러주세요.
              </h3>
            :
              <h3>
                회원탈퇴를 희망하시는 경우 아래 입력창에 '<span>회원탈퇴</span>'를 입력하신 후<br />
                확인 버튼을 눌러주세요.
              </h3>
          }
          <p>※ 탈퇴 신청이 접수된 계정은 복구가 불가합니다.</p>
          <input type="text" name="del_info_check" />
        </div>
        <div className="submit-wrapper">
          <FormSubmit formOrigin="Main" />
        </div>
      </form>
    </article>
  );
};

export default DelMemInfo;
