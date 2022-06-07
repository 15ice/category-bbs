import React, { Fragment, useState, useLayoutEffect } from 'react';
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

  useLayoutEffect(() => {
    // ログイン済みのユーザはログイン画面をスキップする
    if (props.loginState === LOGIN_STATE.LOGIN) {
      navigate("/mng", { replace: true });
    }
  });

  const handleSubmit = (e) => {
    login({
      password: password
    }).then(() => {
      props.handleLogin(LOGIN_STATE.LOGIN);
      navigate("/mng");
    }).catch((e) => {
      props.handleLogin(LOGIN_STATE.NOT_LOGIN);
      if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        setErrorMsg("パスワードが違います。");
      } else {
        setErrorMsg("何らかの障害が発生しています。時間を置いて再度お試しください。");
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
  );
}

export default Login
