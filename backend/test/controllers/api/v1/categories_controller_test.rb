require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "test index" do
    get "/api/v1/categories"
    assert_response :ok
  end

  test "test create" do
    post "/api/v1/categories", 
      params: {category: {name: "test"}}
    assert_response :created
  end

  test "test show" do
    category_id = Category.first.id
    get "/api/v1/categories/#{category_id}"
    assert_response :ok
    assert_equal(category_id, response.parsed_body["id"])
  end

  test "test update" do
    category_id = Category.first.id
    put "/api/v1/categories/#{category_id}", 
      params: {category: {id: category_id, name: "test"}}
    assert_response :ok
    assert_equal("test", response.parsed_body["name"])
  end
end
