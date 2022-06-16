import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Popconfirm, message } from 'antd';

import InputForm from '../../components/InputForm.jsx';
import { EditableRow, EditableCell, convertColumns } from '../../components/EditableCell.jsx';

// api
import {
  fetchCategories,
  addCategories,
  updateCategories,
  deleteCategories
} from '../../apis/categories';
// constants
import { HTTP_STATUS_CODE, LOGIN_STATE } from '../../constants';

const MngCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const categoryFormat = (id, name, postCount, activePostCount) => {
    return {
      'key': id,
      'name': name,
      'postCount': postCount,
      'activePostCount': activePostCount
    }
  }

  const getCategories = () => {
    fetchCategories().then((res) => {
      var categories = res.map(r => categoryFormat(
        r.data.id,
        r.data.name,
        r.post_count,
        r.active_post_count));
      setCategories(categories);
    }).catch((e) => {
      console.error(e);
    });
  }

  const handleAdd = (name) => {
    addCategories({
      name: name
    }).then((res) => {
      getCategories();
      message.info('カテゴリを追加しました。');
    }).catch((e) => {
      console.error(e);
      if (e.response.status === HTTP_STATUS_CODE.FORBIDDEN) {
        props.setLoginState(LOGIN_STATE.NOT_LOGIN);
        navigate("/login", { replace: true });
      }
    });
  }

  const handleDelete = (categoryId) => {
    deleteCategories({
      categoryId: categoryId
    }).then((res) => {
      getCategories();
      message.info('カテゴリを削除しました。');
    }).catch((e) => {
      console.error(e);
      if (e.response.status === HTTP_STATUS_CODE.FORBIDDEN) {
        props.setLoginState(LOGIN_STATE.NOT_LOGIN);
        navigate("/login", { replace: true });
      }
    });
  }

  const handleUpdate = (row) => {
    updateCategories({
      categoryId: row.key,
      name: row.name
    }).then((res) => {
      getCategories();
      message.info('カテゴリ名を変更しました。');
    }).catch((e) => {
      console.error(e);
      if (e.response.status === HTTP_STATUS_CODE.FORBIDDEN) {
        props.setLoginState(LOGIN_STATE.NOT_LOGIN);
        navigate("/login", { replace: true });
      }
      else if (e.response.data.name) {
        message.error(e.response.data.name[0]);
      }
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: 'カテゴリ名',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: '投稿数',
      dataIndex: 'postCount',
      key: 'postCount',
    },
    {
      title: '表示中の投稿数',
      dataIndex: 'activePostCount',
      key: 'activePostCount',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (_, record) => (
        <Popconfirm title="削除しますか?" onConfirm={() => handleDelete(record.key)}>
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Fragment>
      <InputForm name="add_name" handleAdd={handleAdd} />
      <Table
        components={components}
        columns={convertColumns(columns, handleUpdate)}
        dataSource={categories}
        pagination={false}
        scroll={{ y: '60vh' }}
      />
    </Fragment>
  )
}

export default MngCategories
