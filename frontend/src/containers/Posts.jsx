import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

// apis
import { fetchPosts } from '../apis/posts';

const Posts = () => {

  useEffect(() => {
    fetchPosts()
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      <h1>掲示板画面</h1>
      <Link to="login">admin</Link>
    </Fragment>
  )
}

export default Posts
