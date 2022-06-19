import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// api
import { login } from '../apis/sessions';
// reducers
import {
  sessionsActionTypes,
} from '../reducers/sessions';
// constants
import { HTTP_STATUS_CODE, LOGIN_STATE } from '../constants';
import { COLORS } from '../style_constants';

// styled
const LoginArea = styled.div`
  margin: auto;
  width: 50vw;
  background-color: ${COLORS.LIGHT_PRIMARY_BACK};
  padding: 45px;
`
const LoginTitleText = styled.h1`
  color: ${COLORS.TEXT};
  text-shadow: 1px 2px 3px ${COLORS.DARK_PRIMARY_BACK};
`
const LoginForm = styled.form`
  text-align: center;
`
const PasswordInput = styled.input`
  outline: 0;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  font-size: 1.1rem;
`
const LoginButton = styled.button`
  width: 100%;
  border: 0;
  font-size: 1.1rem;
  background: ${COLORS.DARK_PRIMARY_BACK};
  color: ${COLORS.TEXT};
  padding: 15px;
  cursor: pointer;
`
const ErrorMessage = styled.div`
  color: red;
`

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    login({
      password: password
    }).then(() => {
      props.sessionsDispatch({ type: sessionsActionTypes.LOGIN });
      navigate("/mng");
    }).catch((e) => {
      props.sessionsDispatch({ type: sessionsActionTypes.LOGOUT });
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
      <LoginArea>
        <LoginTitleText>Admin</LoginTitleText>
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
          <LoginButton>LOGIN</LoginButton>
        </LoginForm>
      </LoginArea>
    </Fragment>
  )
}

export default Login
