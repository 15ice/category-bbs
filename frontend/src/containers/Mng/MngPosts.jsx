import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Popconfirm, message, Pagination, Modal } from 'antd';
import { AiFillEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import styled from 'styled-components';

import SelectItem from '../../components/SelectItem.jsx';

// api
import {
  fetchPosts,
  getPostsCount,
  updatePostDisplay,
  updatePostHidden
} from '../../apis/posts';
import {
  fetchCategories,
} from '../../apis/categories';
// constants
import { HTTP_STATUS_CODE, NUM_OF_TAKE_POSTS, LOGIN_STATE } from '../../constants';

const HiddenIcon = styled.span`
  font-size: 1.3rem;
`

const MngPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    getPageTotal(selectCategory);
    getPosts(selectCategory, 0);
  }, []);

  const postFormat = (id, userName, mail, title, detail, isHidden, createdAt) => {
    return {
      'key': id,
      'userName': userName,
      'mail': mail,
      'title': title,
      'detail': detail,
      'isHidden': isHidden,
      'createdAt': createdAt
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

  const getPageTotal = (category) => {
    getPostsCount({
      category: category
    }).then((res) => {
      setTotal(res);
    }).catch((e) => {
      console.error(e);
    });
  }

  const getPosts = (category, skip) => {
    fetchPosts({
      category: category,
      skip: skip,
      take: NUM_OF_TAKE_POSTS
    }).then((res) => {
      var posts = res.map(r => postFormat(
        r.data.id,
        r.data.user_name,
        r.data.mail,
        r.data.title,
        r.data.detail,
        r.data.is_hidden,
        r.data.created_at));
      setPosts(posts);
    }).catch((e) => {
      console.error(e);
    });
  }

  const handleSelectCategory = (value) => {
    setSelectCategory(value);
    setPage(1);
    getPageTotal(value);
    getPosts(value, 0);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getPosts(selectCategory, (pageNumber - 1) * NUM_OF_TAKE_POSTS);
  }

  const handlePostDisplay = (id) => {
    updatePostDisplay({
      id: id
    }).then((res) => {
      getPosts(selectCategory, 0);
      message.info('投稿を表示しました。');
    }).catch((e) => {
      console.error(e);
      if (e.response.status === HTTP_STATUS_CODE.FORBIDDEN) {
        props.setLoginState(LOGIN_STATE.NOT_LOGIN);
        navigate("/login", { replace: true });
      }
    });
  }

  const handlePostHidden = (id) => {
    updatePostHidden({
      id: id
    }).then((res) => {
      getPosts(selectCategory, 0);
      message.info('投稿を非表示にしました。');
    }).catch((e) => {
      console.error(e);
      if (e.response.status === HTTP_STATUS_CODE.FORBIDDEN) {
        props.setLoginState(LOGIN_STATE.NOT_LOGIN);
        navigate("/login", { replace: true });
      }
    });
  }

  const columns = [
    {
      title: '投稿日',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <time>{(new Date(date)).toLocaleString()}</time>
    },
    {
      title: '名前',
      dataIndex: 'userName',
      key: 'userName',
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
      render: (detail) => (
        detail.length > 50 ?
          <a onClick={() => Modal.info({
            title: '',
            content: (
              <div>
                {detail.split(/(\n)/).map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item.match(/\n/) ? <br /> : item}
                    </Fragment>
                  )
                })}
              </div>
            ),
            onOk() { },
          })}>
            {detail.slice(0, 50) + '...'}
          </a>
          :
          <div>{detail}</div>
      ),
    },
    {
      title: '表示/非表示',
      dataIndex: 'isHidden',
      render: (_, record) => (
        record.isHidden ?
          <Popconfirm title="表示しますか?" onConfirm={() => handlePostDisplay(record.key)}>
            <a><HiddenIcon><AiFillEyeInvisible /></HiddenIcon></a>
          </Popconfirm>
          :
          <Popconfirm title="非表示にしますか?" onConfirm={() => handlePostHidden(record.key)}>
            <a><HiddenIcon><AiOutlineEye /></HiddenIcon></a>
          </Popconfirm>
      ),
    },
  ];

  return (
    <Fragment>
      <SelectItem items={categories} handleChange={handleSelectCategory} />
      <Table
        columns={columns}
        dataSource={posts}
        pagination={false}
        scroll={{ y: '60vh' }}
      />
      <Pagination
        defaultCurrent={page}
        total={total}
        pageSize={NUM_OF_TAKE_POSTS}
        onChange={handlePageChange}
      />
    </Fragment>
  )
}

export default MngPosts
