import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';

import DrawerMenu from '../components/DrawerMenu.jsx';
import PostList from '../components/PostList.jsx';

// apis
import {
  fetchPosts,
  getPostsCount
} from '../apis/posts';
import {
  fetchCategories,
} from '../apis/categories';
// constants
import { LOGIN_STATE, NUM_OF_TAKE_POSTS } from '../constants';
import { DefaultMain } from '../style_constants';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Posts = () => {
  let query = useQuery();

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(query.get("category") ?? 1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    changeCategory(selectCategory);
  }, [])

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
    fetchPosts({
      category: category,
      skip: skip,
      take: NUM_OF_TAKE_POSTS
    }).then((res) => {
      setPosts(res);
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

  const showTotal = (total) => {
    var startRow = ((page - 1) * NUM_OF_TAKE_POSTS) + 1;
    var endRow = page * NUM_OF_TAKE_POSTS;
    if (endRow > total) endRow = total;
    return `${startRow}-${endRow}/${total}件`;
  }

  return (
    <Fragment>
      <DefaultMain>
        <DrawerMenu
          title="カテゴリ選択"
          items={categories}
          setValue={handleClickDrawer}
          visible={drawerVisible}
          setVisible={setDrawerVisible}
        />
        <a onClick={() => setDrawerVisible(true)}>カテゴリ選択</a>
        <PostList posts={posts} />
        <Pagination
          size="small"
          defaultCurrent={page}
          total={total}
          pageSize={NUM_OF_TAKE_POSTS}
          onChange={handlePageChange}
          showTotal={showTotal}
          style={{ textAlign: 'center' }}
        />
      </DefaultMain>
    </Fragment>
  )
}

export default Posts
