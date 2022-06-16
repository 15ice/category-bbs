import React, { Fragment, useEffect } from 'react';
import { useNavigate, Routes, Route } from "react-router-dom";
import styled from 'styled-components';

import MngMenu from './Mng/MngMenu.jsx';
import MngCategories from './Mng/MngCategories.jsx';
import MngPosts from './Mng/MngPosts.jsx';


// constants
import { LOGIN_STATE } from '../constants';
import { DefaultMain, PageTitle } from '../style_constants';

const Mng = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginState !== LOGIN_STATE.LOGIN) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <Fragment>
      <DefaultMain>
        <PageTitle>Settings</PageTitle>
        <MngMenu />
        <Routes>
          <Route index element={<MngPosts loginState={props.loginState} setLoginState={props.setLoginState} />} />
          <Route path="categories" element={<MngCategories loginState={props.loginState} setLoginState={props.setLoginState} />} />
        </Routes>
      </DefaultMain>
    </Fragment>
  );
}

export default Mng
