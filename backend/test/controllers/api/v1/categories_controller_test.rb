require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "test index" do
    get "/api/v1/categories"
    assert_response :ok
  end

  test "test create" do
    post "/api/v1/login", params: { session: { password: "root" } }
    assert_response :ok

    post "/api/v1/categories", 
      params: {category: {name: "test"}}
    assert_response :created
  end

  test "test create forbidden" do
    post "/api/v1/categories", 
      params: {category: {name: "test"}}
    assert_response :forbidden
  end

  test "test show" do
    category_id = Category.first.id
    get "/api/v1/categories/#{category_id}"
    assert_response :ok
    assert_equal(category_id, response.parsed_body["id"])
  end

  test "test update" do
    post "/api/v1/login", params: { session: { password: "root" } }
    assert_response :ok

    category_id = Category.first.id
    put "/api/v1/categories/#{category_id}", 
      params: {category: {id: category_id, name: "test"}}
    assert_response :ok
    assert_equal("test", response.parsed_body["name"])
  end

  test "test update forbidden" do
    category_id = Category.first.id
    put "/api/v1/categories/#{category_id}", 
      params: {category: {id: category_id, name: "test"}}
    assert_response :forbidden
  end

  test "test destroy" do
    post "/api/v1/login", params: { session: { password: "root" } }
    assert_response :ok

    category = Category.create(name: "test")
    category = Category.find_by(name: "test")
    delete "/api/v1/categories/#{category.id}"
    assert_response :no_content
  end

  test "test destroy forbidden" do
    Category.create(name: "test")
    category = Category.find_by(name: "test")
    delete "/api/v1/categories/#{category.id}"
    assert_response :forbidden
  end
end
