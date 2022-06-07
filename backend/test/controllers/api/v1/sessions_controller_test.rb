require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "test login" do
    post "/api/v1/login", params: { session: { password: "root" } }
    assert_response :ok
    assert !session[:created_at].nil?
    assert !session[:access_key].nil?

    post "/api/v1/login", params: { session: { password: "rootroot" } }
    assert_response :unauthorized
  end
  
  test "test logout" do
    delete "/api/v1/logout"
    assert_response :ok
    assert session[:created_at].nil?
    assert session[:access_key].nil?
  end
  
  test "test logged_in" do
    get "/api/v1/logged_in"
    assert_response :unauthorized

    post "/api/v1/login", params: { session: { password: "root" } }
    assert_response :ok
    assert !session[:created_at].nil?
    assert !session[:access_key].nil?
    get "/api/v1/logged_in"
    assert_response :ok
  end
end
