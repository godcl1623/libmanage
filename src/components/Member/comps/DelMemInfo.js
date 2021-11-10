import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

const DelMemInfo = ({ userState }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <article
      id="Del-Mem-Info"
    >
      <h2>탈퇴 안내</h2>
      <h5>회원탈퇴를 신청하기 전에 안내 사항을 확인해주시기 바랍니다.</h5>
      <section>
        <h3>탈퇴 후 삭제되는 개인 정보</h3>
        <ul>
          <li>사용자 아이디</li>
          <li>사용자 비밀번호</li>
          <li>사용자 닉네임</li>
          <li>사용자 이메일</li>
          <li>사용자 연동 스토어 및 라이브러리 정보</li>
        </ul>
      </section>
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
        <p>회원탈퇴를 희망하시는 경우 아래 입력창에 '회원탈퇴'를 입력하신 후 확인 버튼을 눌러주세요.</p>
        <p>※ 탈퇴 신청이 접수된 계정은 복구가 불가합니다.</p>
        <input type="text" name="del_info_check" />
        <FormSubmit formOrigin='Main' />
      </form>
    </article>
  );
}

export default DelMemInfo;