import React, { Fragment, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Posts from './containers/Posts.jsx';
import Login from './containers/Login.jsx';
import Mng from './containers/Mng.jsx';

import { LOGIN_STATE } from './constants';

const App = () => {
  const [loginState, setLoginState] = useState(LOGIN_STATE.NOT_LOGIN);

  const handleLogin = (loginState) => {
    setLoginState(loginState);
  }

  return (
    <Fragment>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/login" element={<Login loginState={loginState} handleLogin={handleLogin} />} />
            <Route path="/mng" element={<Mng />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Fragment>
  )
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
