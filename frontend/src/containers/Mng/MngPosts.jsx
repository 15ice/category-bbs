import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Popconfirm, message } from 'antd';
import { format } from 'date-fns';

import SelectItem from '../../components/SelectItem.jsx';

// api
import {
  fetchPosts,
} from '../../apis/posts';
import {
  fetchCategories,
} from '../../apis/categories';
// constants
import { HTTP_STATUS_CODE, NUM_OF_TAKE_POSTS } from '../../constants';

const MngPosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const postFormat = (id, user_id, user_name, mail, title, detail, is_hidden, created_at) => {
    return {
      'key': id,
      'user_id': user_id,
      'user_name': user_name,
      'mail': mail,
      'title': title,
      'detail': detail,
      'is_hidden': is_hidden,
      'created_at': created_at
    }
  }

  const getCategories = () => {
    fetchCategories().then((res) => {
      var categories = res.map(r => {
        return {
          value: r.data.id,
          label: r.data.name
        }
      });
      setCategories(categories);
    }).catch((e) => {
      console.error(e);
    });
  }

  const getPosts = (category, skip) => {
    fetchPosts(category, skip, NUM_OF_TAKE_POSTS).then((res) => {
      var posts = res.map(r => postFormat(
        r.id,
        r.user_id,
        r.user_name,
        r.mail,
        r.title,
        r.detail,
        r.is_hidden,
        r.created_at));
      setPosts(posts);
    }).catch((e) => {
      console.error(e);
    });
  }

  const handleSelectCategory = (value) => {
    getPosts(value, 0);
  };

  const columns = [
    {
      title: '投稿日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => <time>{format(new Date(date), "yyyy/MM/dd hh:mm")}</time>
    },
    {
      title: '名前',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Email',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: 'タイトル',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '詳細',
      dataIndex: 'detail',
      key: 'detail',
    }
  ];

  return (
    <Fragment>
      <SelectItem items={categories} handleChange={handleSelectCategory} />
      <Table
        columns={columns}
        dataSource={posts}
        scroll={{ y: '60vh' }}
      />
    </Fragment>
  )
}

export default MngPosts
