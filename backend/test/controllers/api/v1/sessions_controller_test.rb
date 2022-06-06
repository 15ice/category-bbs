require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "test login" do
    post "/api/v1/login", params: { session: { password: "root" } }
    assert_response :ok
    assert !session[:created_at].nil?
    assert !session[:access_key].nil?
  end
  
  test "test logout" do
    delete "/api/v1/logout"
    assert_response :ok
    assert session[:created_at].nil?
    assert session[:access_key].nil?
  end
end
