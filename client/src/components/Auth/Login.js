/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loginStatusCreator } from '../../actions';
import { hasher, salter } from '../../custom_modules/hasher';
import { encryptor, decryptor } from '../../custom_modules/aeser';

const Login = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // axios.post('http://localhost:3002/check_login', {}, { withCredentials: true })
    // .then(res => {
    //   if (res.data.isLoginSuccessful) {
    //     dispatch(loginStatusCreator(res.data.isLoginSuccessful));
    //     history.push('/main');
    //   }
    // })
    // .catch(err => alert(err));
    axios.get('http://localhost:3002/test_get')
      .then(res => console.log(res));
  }, []);

  if (loginStatus) {
    return <></>;
  }

  return (
    <article
      id="login"
      style={{
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignContent': 'center'
      }}
    >
      <h2>libmanage</h2>
      <form
        // action="/test"
        style={{
          'display': 'flex',
          'flexDirection': 'column',
          'justifyContent': 'center',
          'alignContent': 'center'
        }}
        onSubmit={e => {
          e.preventDefault();
          const formData = {
            ID: e.target.ID.value,
            PWD: salter(hasher(e.target.PWD.value))
          }
          axios.post('http://localhost:3002/login_process', formData, { withCredentials: true })
          .then(res => {
            if (res.data.isLoginSuccessful) {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              alert('Login Successful !');
              history.push('/main');
            }
          })
          .catch(err => alert(err));
        }}
      >
        <label htmlFor="ID">ID: </label>
        <input type="text" name="ID" />
        <label htmlFor="PWD">PW: </label>
        <input type="password" name="PWD" />
        <button type="submit" name="login">LOGIN</button>
      </form>
      <div className="member">
        <button>회원가입</button>
        <button>ID/PW 찾기</button>
      </div>
      <button>오프라인으로 접속</button>
    </article>
    );
};

export default Login;