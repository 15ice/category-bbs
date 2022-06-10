import { Form, Input, Space } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';
const EditableContext = React.createContext(null);

const EditableCellValueWrap = styled.nav`
  padding: 5px 12px;
  cursor: pointer;
`

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
      toggleEdit();
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `The value is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <EditableCellValueWrap
        onClick={toggleEdit}
      >
        <Space>
          {children}
          <FiEdit2 />
        </Space>
      </EditableCellValueWrap>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const convertColumns = (defaultColumns, handleSave) => {
  return defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
};
