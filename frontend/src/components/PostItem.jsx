import React, { Fragment } from 'react';
import { Card } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';

const PostItems = (props) => {
  const title = props.post.title ?? "(件名なし)";
  const useName = props.post.user_name ?? "(匿名)";
  const mail = props.post.mail ? (
    <a href={"mailto:" + props.post.mail}><AiOutlineMail /></a>
  ) : "";
  var createdAt = new Date(props.post.created_at);
  const createdAtStr = <time>{createdAt.toLocaleString()}</time>;
  console.log(props.post.detail);
  var detail = props.post.detail.split(/(\n)/).map((item, index) => {
    return (
      <Fragment key={index}>
        {item.match(/\n/) ? <br /> : item}
      </Fragment>
    )
  });

  return (
    <Card
      type="inner"
      title={title}
      extra={<span>{useName}{mail}</span>}
      style={{ width: '70vw', margin: 'auto' }}
    >
      <p>{detail}</p>
      <p><small>{createdAtStr}</small></p>
    </Card>
  )
}

export default PostItems
