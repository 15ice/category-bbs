import React from 'react';
import { Card } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';
import { format } from 'date-fns';

const PostItems = (props) => {
  const title = props.post.title ?? "(件名なし)";
  const useName = props.post.user_name ?? "(匿名)";
  const mail = props.post.mail ? (
    <a href={"mailto:" + props.post.mail}><AiOutlineMail /></a>
  ) : "";
  const createdAt = <time>{format(new Date(props.post.created_at), "yyyy/MM/dd hh:mm")}</time>;

  return (
    <Card
      type="inner"
      title={title}
      extra={<span>{useName}{mail}</span>}
      style={{ width: '70vw', margin: 'auto' }}
    >
      <p>{props.post.detail}</p>
      <p><small>{createdAt}</small></p>
    </Card>
  )
}

export default PostItems
