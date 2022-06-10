import React from 'react';
import { Button, Form, Input } from 'antd';

const InputForm = (props) => {
  const [form] = Form.useForm();
  const value = Form.useWatch('value', form);

  const handleAdd = (v) => {
    props.handleAdd(v.value);
    form.resetFields();
  }

  return (
    <Form
      form={form}
      name="input_form"
      layout="inline"
      onFinish={handleAdd}
    >
      <Form.Item name="value">
        <Input
          type="text"
          style={{ width: 150 }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={(!value || /^\s*$/.test(value))}>
          Add
        </Button>
      </Form.Item>
    </Form>
  )
}

export default InputForm
