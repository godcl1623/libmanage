import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loginStatusCreator } from '../../actions';

const Login = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const [formData, setFormData] = React.useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };

  const getCookie = () => {
    const { cookie } = document;
    const temp = {};
    const rawcookie = cookie.split('; ');
    const foo = rawcookie.map(cook => cook.split('='));
    foo.forEach(doh => {
      // eslint-disable-next-line prefer-destructuring
      temp[doh[0]] = doh[1];
    })
    return temp.id;
  };

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
          axios.post('http://localhost:3002/login_process', formData, { withCredentials: true })
          .then(res => {
            if (res.data.status) {
              dispatch(loginStatusCreator(getCookie()));
              // console.log(res.data)
              alert(res.data.msg);
              history.push('/main');
            }
          })
          .catch(err => alert(err));
        }}
      >
        <label htmlFor="ID">ID: </label>
        <input type="text" name="ID" onChange={handleChange} />
        <label htmlFor="PWD">PW: </label>
        <input type="password" name="PWD" onChange={handleChange} />
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