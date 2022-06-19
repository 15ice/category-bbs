import React, { Fragment, useState, useReducer, useEffect } from 'react';
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
// reducers
import {
  initPostsState,
  postsActionTypes,
  postsReducer,
} from '../../reducers/posts';
import {
  initCategoriesState,
  categoriesActionTypes,
  categoriesReducer,
} from '../../reducers/categories';
// constants
import {
  REQUEST_STATE,
  HTTP_STATUS_CODE,
  NUM_OF_TAKE_POSTS
} from '../../constants';

const HiddenIcon = styled.span`
  font-size: 1.3rem;
`

const MngPosts = (props) => {
  const [postsState, postsDispatch] = useReducer(postsReducer, initPostsState);
  const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, initCategoriesState);
  const [selectCategory, setSelectCategory] = useState(1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCategories();
    getPageTotal(selectCategory);
    getPosts(selectCategory, 0);
  }, []);

  const getCategories = () => {
    categoriesDispatch({ type: categoriesActionTypes.FETCHING });
    fetchCategories().then((res) => {
      categoriesDispatch({
        type: categoriesActionTypes.FETCH_LAVEL,
        payload: {
          categories: res
        }
      });
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
    postsDispatch({ type: postsActionTypes.FETCHING });
    fetchPosts({
      category: category,
      skip: skip,
      take: NUM_OF_TAKE_POSTS
    }).then((res) => {
      postsDispatch({
        type: postsActionTypes.FETCH_TABLE,
        payload: {
          posts: res
        }
      });
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
        props.handleLogout();
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
        props.handleLogout();
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
            width: '70vw',
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
      {
        categoriesState.fetchState === REQUEST_STATE.OK ?
          <SelectItem
            items={categoriesState.categoriesList}
            handleChange={handleSelectCategory}
          />
          :
          ""
      }
      <Table
        columns={columns}
        dataSource={postsState.postsList}
        loading={postsState.fetchState === REQUEST_STATE.LOADING}
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
