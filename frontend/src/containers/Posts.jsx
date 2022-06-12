import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

// apis
import { fetchPosts } from '../apis/posts';
// constants
import { LOGIN_STATE } from '../constants';
import { DefaultMain } from '../style_constants';

const Posts = () => {

  useEffect(() => {
  }, [])

  return (
    <Fragment>
      <DefaultMain>
        <h1>掲示板画面</h1>
      </DefaultMain>
    </Fragment>
  )
}

export default Posts
