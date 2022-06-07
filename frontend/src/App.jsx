import React, { Fragment, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Posts from './containers/Posts.jsx';
import Login from './containers/Login.jsx';
import Mng from './containers/Mng.jsx';

// api
import { loggedIn } from './apis/sessions';
// constants
import { LOGIN_STATE } from './constants';

const App = () => {
  const [loginState, setLoginState] = useState(LOGIN_STATE.NOT_LOGIN);

  const handleLogin = (loginState) => {
    setLoginState(loginState);
  };

  useEffect(() => {
    checkLoginStatus()
  });

  const checkLoginStatus = () => {
    loggedIn().then(() => {
      handleLogin(LOGIN_STATE.LOGIN);
    }).catch((e) => {
      handleLogin(LOGIN_STATE.NOT_LOGIN);
    });
  }

  return (
    <Fragment>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/login" element={<Login loginState={loginState} handleLogin={handleLogin} />} />
            <Route path="/mng" element={<Mng loginState={loginState} />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Fragment>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
