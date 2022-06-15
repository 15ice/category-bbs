import React, { Fragment } from 'react';
import { Card, Popconfirm, Space } from 'antd';
import { AiOutlineMail, AiFillEyeInvisible } from 'react-icons/ai';
import styled from 'styled-components';

const HiddenDetail = styled.div`
  opacity: 0.5;
`

const PostItems = (props) => {
  const title = props.post.data.title ?? "(件名なし)";
  const useName = props.post.data.user_name ?? "(匿名)";
  const mail = props.post.data.mail ? (
    <a href={"mailto:" + props.post.data.mail}><AiOutlineMail /></a>
  ) : "";
  var createdAt = new Date(props.post.data.created_at);
  const createdAtStr = <time>{createdAt.toLocaleString()}</time>;
  var detail = props.post.data.detail.split(/(\n)/).map((item, index) => {
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
      {
        props.post.data.is_hidden ?
          <HiddenDetail>(非表示)</HiddenDetail>
          :
          <div>
            <p>{detail}</p>
            <Space>
              <small>{createdAtStr}</small>
              {
                props.post.own ?
                  <Popconfirm
                    title="この投稿を非表示にしますか?"
                    onConfirm={() => props.handlePostHidden(props.post.data.id)}
                  >
                    <a><AiFillEyeInvisible /></a>
                  </Popconfirm>
                  :
                  ""
              }
            </Space>
          </div>
      }
    </Card>
  )
}

export default PostItems
