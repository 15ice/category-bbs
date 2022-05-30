class ApplicationController < ActionController::API
  include ActionController::Cookies
  include SessionsHelper

  before_action :set_user

  private

  def set_user
    unless current_user
      user = User.create_anonymous!
      remember(user)
    end
  end
end
