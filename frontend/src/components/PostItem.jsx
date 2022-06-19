import React, { Fragment } from 'react';
import { Popconfirm, Col, Row, Space } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';
import styled from 'styled-components';

import {
  COLORS
} from '../style_constants';

const PostTitle = styled.div`
  background-color: ${COLORS.LIGHT_PRIMARY_BACK};
  width: 70vw;
  padding: 8px;
  margin: auto;
`
const TitleText = styled.span`
  font-size: 1.2rem;
  color: ${COLORS.PRIMARY_TEXT};
  font-weight: bold;
  text-shadow: 1px 2px 3px ${COLORS.TEXT};
`
const UserText = styled.span`
  text-align: right;
  border-bottom: 3px dotted ${COLORS.DARK_PRIMARY_BACK};
`
const PostDetail = styled.div`
  border: 4px solid ${COLORS.LIGHT_PRIMARY_BACK};
  width: 70vw;
  padding: 4px;
  margin: auto;
`
const FooterText = styled.div`
  color: ${COLORS.SECONDARY_TEXT};
  font-size: 0.8rem;
`
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
    <Fragment>
      <PostTitle>
        <Row>
          <Col span="20">
            <TitleText>
              {title}
            </TitleText>
          </Col>
          <Col span="4">
            <UserText>
              {useName}{mail}
            </UserText>
          </Col>
        </Row>
      </PostTitle>
      <PostDetail>
        {
          props.post.data.is_hidden ?
            <HiddenDetail>(非表示)</HiddenDetail>
            :
            <div>
              <p>{detail}</p>
              <FooterText>
                <Space size="large">
                  {createdAtStr}
                  {
                    props.post.own ?
                      <Popconfirm
                        title="この投稿を非表示にしますか?"
                        onConfirm={() => props.handlePostHidden(props.post.data.id)}
                      >
                        <a>非表示にする</a>
                      </Popconfirm>
                      :
                      ""
                  }
                </Space>
              </FooterText>
            </div>
        }
      </PostDetail>
    </Fragment>
  )
}

export default PostItems
