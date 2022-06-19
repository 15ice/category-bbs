import React from 'react';
import {
  Button,
  Form,
  Input
} from 'antd';
import styled from 'styled-components';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const PostFormWrap = styled.div`
  margin: auto;
  width: 40vw;
  padding: 20px;
`

const PostForm = (props) => {
  const [form] = Form.useForm();

  const handleFinish = (value) => {
    props.handleFinish(value);
    form.resetFields();
  }

  return (
    <PostFormWrap>
      <Form {...layout}
        form={form}
        onFinish={handleFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name={['post', 'user_name']} label="Name">
          <Input />
        </Form.Item>
        <Form.Item name={['post', 'mail']} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['post', 'title']} label="Title">
          <Input />
        </Form.Item>
        <Form.Item name={['post', 'detail']} label="Detail" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            送信
          </Button>
        </Form.Item>
      </Form>
    </PostFormWrap>
  )
}

export default PostForm
