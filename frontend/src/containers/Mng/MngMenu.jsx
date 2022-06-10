import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const MenuItems = styled.ul`
  list-style: none;
`
const MenuItem = styled.li`
  padding-right: 10px;
  display: inline;
`

const MngMenu = () => {
  return (
    <div>
      <MenuItems>
        <MenuItem><Link to="/mng" style={{ textDecoration: 'none' }} >投稿編集</Link></MenuItem>
        <MenuItem><Link to="/mng/categories" style={{ textDecoration: 'none' }} >カテゴリ編集</Link></MenuItem>
      </MenuItems>
    </div>
  );
}

export default MngMenu
