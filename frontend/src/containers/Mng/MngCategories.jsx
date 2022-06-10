import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

// api
import { fetchCategories } from '../../apis/categories';

const MngCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((res) => {
      var categories = res.map(r => {
        return {
          'key': r.data.id,
          'name': r.data.name,
          'post_count': r.post_count,
          'active_post_count': r.active_post_count
        }
      });
      setCategories(categories);
    }).catch((e) => {
      console.error(e);
    });
  });

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
    <Table columns={columns} dataSource={categories} />
  );
}

export default MngCategories
