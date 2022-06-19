import React, { Fragment, useReducer, useEffect } from 'react';
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
// reducers
import {
  initCategoriesState,
  categoriesActionTypes,
  categoriesReducer,
} from '../../reducers/categories';
// constants
import { REQUEST_STATE, HTTP_STATUS_CODE } from '../../constants';

const MngCategories = (props) => {
  const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, initCategoriesState);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    categoriesDispatch({ type: categoriesActionTypes.FETCHING });
    fetchCategories().then((res) => {
      categoriesDispatch({
        type: categoriesActionTypes.FETCH_TABLE,
        payload: {
          categories: res
        }
      });
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
        props.handleLogout();
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
        props.handleLogout();
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
        props.handleLogout();
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
        dataSource={categoriesState.categoriesList}
        loading={categoriesState.fetchState === REQUEST_STATE.LOADING}
        pagination={false}
        scroll={{ y: '60vh' }}
      />
    </Fragment>
  )
}

export default MngCategories
