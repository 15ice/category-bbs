class ApplicationController < ActionController::API
  include ActionController::Cookies
  include SessionsHelper

  before_action :set_user

  private

  def set_user
    @user = current_user
    unless @user
      @user = User.create_anonymous!
      remember(@user)
    else
    end
  end

  def check_admin
    if !is_admin?
      render json: {}, status: :forbidden
    end
  end
end
