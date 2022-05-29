import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
  return (
    <Fragment>
      <h1>掲示板画面</h1>
      <Link to="login">admin</Link>
    </Fragment>
  )
}

export default Posts
