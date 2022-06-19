import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination, message, Space } from 'antd';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import DrawerMenu from '../components/DrawerMenu.jsx';
import PostList from '../components/PostList.jsx';
import PostForm from '../components/PostForm.jsx';

// apis
import {
  fetchPosts,
  getPostsCount,
  addPost,
  updatePostHidden
} from '../apis/posts';
import {
  fetchCategories,
} from '../apis/categories';
// reducers
import {
  initPostsState,
  postsActionTypes,
  postsReducer,
} from '../reducers/posts';
import {
  initCategoriesState,
  categoriesActionTypes,
  categoriesReducer,
} from '../reducers/categories';
// constants
import { REQUEST_STATE, NUM_OF_TAKE_POSTS } from '../constants';
import { COLORS, DefaultMain, PageTitle } from '../style_constants';

const CategoryLink = styled.div`
  margin: auto;
  width: 40vw;
  text-align: center;
`

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Posts = () => {

  let query = useQuery();

  const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, initCategoriesState);
  const [postsState, postsDispatch] = useReducer(postsReducer, initPostsState);
  const [selectCategory, setSelectCategory] = useState(query.get("category") ?? 1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    changeCategory(selectCategory);
  }, [])

  const getCategories = () => {
    categoriesDispatch({ type: categoriesActionTypes.FETCHING });
    fetchCategories().then((res) => {
      categoriesDispatch({
        type: categoriesActionTypes.FETCH_SUCCESS,
        payload: {
          categories: res
        }
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  const changeCategory = (category) => {
    getPageTotal(category);
    getPosts(category, 0);
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
        type: postsActionTypes.FETCH_SUCCESS,
        payload: {
          posts: res
        }
      })
    }).catch((e) => {
      console.error(e);
    });
  }

  const handleClickDrawer = (category) => {
    setSelectCategory(category);
    setDrawerVisible(false);
    navigate(`/?category=${category}`);
    changeCategory(category);
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getPosts(selectCategory, (pageNumber - 1) * NUM_OF_TAKE_POSTS);
  }

  const handleSendForm = (value) => {
    addPost({
      ...value.post,
      category_id: selectCategory
    }).then((res) => {
      changeCategory(selectCategory);
      message.info("投稿しました。");
    }).catch((e) => {
      console.error(e);
    })
  }

  const handlePostHidden = (id) => {
    updatePostHidden({
      id: id
    }).then((res) => {
      getPosts(selectCategory, (page - 1) * NUM_OF_TAKE_POSTS);
      message.info('投稿を非表示にしました。');
    }).catch((e) => {
      console.error(e);
    });
  }

  const showTotal = (total) => {
    var startRow = ((page - 1) * NUM_OF_TAKE_POSTS) + 1;
    var endRow = page * NUM_OF_TAKE_POSTS;
    if (endRow > total) endRow = total;
    return `${startRow}-${endRow}/${total}件`;
  }

  return (
    <Fragment>
      <DefaultMain>
        {
          categoriesState.fetchState === REQUEST_STATE.LOADING ?
            ""
            :
            <DrawerMenu
              title="カテゴリ選択"
              items={categoriesState.categoriesList}
              setValue={handleClickDrawer}
              visible={drawerVisible}
              setVisible={setDrawerVisible}
            />
        }
        <CategoryLink>
          {
            categoriesState.fetchState === REQUEST_STATE.LOADING ?
              ""
              :
              <Space>
                <PageTitle>
                  {categoriesState.categoriesList.filter(r => r.value == selectCategory).map((item, index) => {
                    return (
                      <Fragment key={index}>{item.label}</Fragment>
                    )
                  })}
                </PageTitle>
                <a onClick={() => setDrawerVisible(true)}>カテゴリ選択</a>
              </Space>
          }
        </CategoryLink>
        <PostForm handleFinish={handleSendForm} />
        {
          postsState.fetchState === REQUEST_STATE.LOADING ?
            <ReactLoading
              type="spin"
              color={COLORS.SECONDARY_TEXT}
              style={{ margin: 'auto', width: '10vw' }} />
            :
            <Fragment>
              <PostList posts={postsState.postsList} handlePostHidden={handlePostHidden} />
              <Pagination
                size="small"
                defaultCurrent={page}
                total={total}
                pageSize={NUM_OF_TAKE_POSTS}
                onChange={handlePageChange}
                showTotal={showTotal}
                style={{ textAlign: 'center' }}
              />
            </Fragment>
        }
      </DefaultMain>
    </Fragment>
  )
}

export default Posts
