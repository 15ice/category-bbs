import React, { Fragment, useReducer, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import './App.css';
import { AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';

import Posts from './containers/Posts.jsx';
import Login from './containers/Login.jsx';
import Mng from './containers/Mng.jsx';

// api
import { loggedIn, logout } from './apis/sessions';
// reducers
import {
  initLoginState,
  sessionsActionTypes,
  sessionsReducer,
} from './reducers/sessions';
// constants
import { COLORS, DefaultMain } from './style_constants';
import { LOGIN_STATE } from './constants';

const Nabvar = styled.nav`
  background: ${COLORS.PRIMARY_BACK};
  min-height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Logo = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  letter-spacing: 3px;
  color: ${COLORS.TEXT};
  padding-left: 20px;
  text-decoration-line: none;
`
const NavItems = styled.ul`
  margin: 10px;
  display: flex;
  width: 200px;
  max-width: 40%;
  justify-content: end;
  list-style: none;
`
const NavItem = styled.li`
  font-size: 1.3rem;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`
const EditButton = styled.span`
  display: inline-block;
  width: 40px;
  height: 37px;
  border-radius: 50%;
  background-color: ${COLORS.ACCENT};
  text-align:center;
  line-height: 40px;
  margin-right: 20px;
`

const App = () => {
  const [loginState, sessionsDispatch] = useReducer(sessionsReducer, initLoginState);

  useEffect(() => {
    checkLoginStatus()
  });

  const checkLoginStatus = () => {
    loggedIn().then(() => {
      sessionsDispatch({ type: sessionsActionTypes.LOGIN });
    }).catch((e) => {
      sessionsDispatch({ type: sessionsActionTypes.LOGOUT });
    });
  }

  const handleLogout = () => {
    logout().then(() => {
      sessionsDispatch({ type: sessionsActionTypes.LOGOUT });
    });
  };

  return (
    <Fragment>
      <React.StrictMode>
        <BrowserRouter>
          <Nabvar>
            <Link to="/" style={{ textDecoration: 'none' }} >
              <Logo>
                ????????????BBS
              </Logo>
            </Link>
            <NavItems>
              <NavItem>
                {
                  loginState === LOGIN_STATE.LOGIN ?
                    <Link to="/mng">
                      <EditButton>
                        <AiOutlineSetting />
                      </EditButton>
                    </Link>
                    :
                    <Link to="/login">
                      <EditButton>
                        <AiOutlineSetting />
                      </EditButton>
                    </Link>
                }
              </NavItem>
              {
                loginState === LOGIN_STATE.LOGIN ?
                  <NavItem>
                    <EditButton onClick={handleLogout}>
                      <AiOutlineLogout />
                    </EditButton>
                  </NavItem>
                  :
                  ""
              }
            </NavItems>
          </Nabvar>
          <DefaultMain>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/login" element={<Login loginState={loginState} sessionsDispatch={sessionsDispatch} />} />
              <Route path="/mng/*" element={<Mng loginState={loginState} sessionsDispatch={sessionsDispatch} />} />
            </Routes>
          </DefaultMain>
        </BrowserRouter>
      </React.StrictMode>
    </Fragment>
  )
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
