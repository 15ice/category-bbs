import React from 'react';
import { Space } from 'antd';

import PostItem from './PostItem.jsx';

const PostList = (props) => {
  const posts = props.posts.map(post => {
    return (
      <PostItem post={post} handlePostHidden={props.handlePostHidden} key={post.data.id} />
    );
  });

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex'
      }}
    >
      {posts}
    </Space>
  )
}

export default PostList
