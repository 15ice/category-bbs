import React, { Fragment, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// constants
import { LOGIN_STATE } from '../constants';
import { DefaultMain } from '../style_constants';

const Mng = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginState !== LOGIN_STATE.LOGIN) {
      navigate("/", { replace: true });
    }
  });

  return (
    <Fragment>
      <DefaultMain>
        <h1>管理画面</h1>
      </DefaultMain>
    </Fragment>
  );
}

export default Mng
