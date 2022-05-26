require "test_helper"

class Api::V1::PostsControllerTest < ActionDispatch::IntegrationTest
  test "test index" do
    get "/api/v1/posts"
    assert_response :ok
  end
  test "test search" do
    category_id = Category.first.id
    get "/api/v1/posts/search/#{category_id}"
    assert_response :ok
  end

  test "test create" do
    category_id = Category.first.id
    post "/api/v1/posts", 
      params: {post: {user_name: "test", mail: "hoge@example.com", title: "test", detail: "test", category_id: category_id}}
    assert_response :created
  end

  test "test show" do
    post_id = Post.first.id
    get "/api/v1/posts/#{post_id}"
    assert_response :ok
    assert_equal(post_id, response.parsed_body["id"])
  end

  test "test update" do
    post_id = Post.first.id
    category_id = Category.first.id
    put "/api/v1/posts/#{post_id}", 
      params: {post: {is_hidden: true}}
    assert_response :ok
    assert_equal(true, response.parsed_body["is_hidden"])
  end
end
