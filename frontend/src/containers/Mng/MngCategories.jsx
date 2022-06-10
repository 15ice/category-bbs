import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'antd';

import InputForm from '../../components/InputForm.jsx';

// api
import { fetchCategories, addCategories } from '../../apis/categories';

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
  }, []);

  const handleAdd = (name) => {
    addCategories({
      name: name
    }).then((res) => {
      setCategories([...categories, categoryFormat(res.id, res.name, 0, 0)]);
    }).catch((e) => {
      console.error(e);
    });
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
    }
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
