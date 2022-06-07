import React, { Fragment, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";

// constants
import { LOGIN_STATE } from '../constants';

const Mng = (props) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (props.loginState !== LOGIN_STATE.LOGIN) {
      navigate("/");
    }
  });

  return (
    <Fragment>
      <h1>管理画面</h1>
    </Fragment>
  );
}

export default Mng
