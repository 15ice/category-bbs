import React, { Fragment, useState, useEffect } from 'react';
import { Table, Popconfirm, message } from 'antd';

import InputForm from '../../components/InputForm.jsx';

// api
import {
  fetchCategories,
  addCategories,
  deleteCategories
} from '../../apis/categories';

const MngCategories = () => {
  const [categories, setCategories] = useState([]);

  const categoryFormat = (id, name, post_count, active_post_count) => {
    return {
      'key': id,
      'name': name,
      'post_count': post_count,
      'active_post_count': active_post_count
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

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
    }).catch((e) => {
      console.error(e);
    });
    message.info('カテゴリを追加しました。');
  }

  const handleDelete = (categoryId) => {
    deleteCategories({
      categoryId: categoryId
    }).then((res) => {
      getCategories();
    }).catch((e) => {
      console.error(e);
    });
    message.info('カテゴリを削除しました。');
  }

  const columns = [
    {
      title: 'カテゴリ名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '投稿数',
      dataIndex: 'post_count',
      key: 'post_count',
    },
    {
      title: '表示中の投稿数',
      dataIndex: 'active_post_count',
      key: 'active_post_count',
    },
    {
      title: '',
      dataIndex: 'operation',
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
        columns={columns}
        dataSource={categories}
        pagination={false}
        scroll={{ y: '60vh' }}
      />
    </Fragment>
  );
}

export default MngCategories
