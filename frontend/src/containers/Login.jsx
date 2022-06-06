import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// api
import { login } from '../apis/sessions';
// constants
import { HTTP_STATUS_CODE, LOGIN_STATE } from '../constants';

// styled
const LoginForm = styled.form`
`
const PasswordInput = styled.input`
`
const LoginButton = styled.button`
`
const ErrorMessage = styled.div`
`

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    login({
      password: password
    }).then(() => {
      navigate("/mng");
      props.handleLogin(LOGIN_STATE.LOGIN);
    }).catch((e) => {
      if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        setErrorMsg("パスワードが違います。");
        props.handleLogin(LOGIN_STATE.NOT_LOGIN);
      }
    });
    e.preventDefault();
  }

  return (
    <Fragment>
      <h1>Login</h1>
      {
        errorMsg ?
          <ErrorMessage>
            {errorMsg}
          </ErrorMessage>
          : ""
      }
      <LoginForm onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <LoginButton>login</LoginButton>
      </LoginForm>
    </Fragment>
  )
}

export default Login
