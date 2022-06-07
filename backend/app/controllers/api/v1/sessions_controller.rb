class Api::V1::SessionsController < ApplicationController
  def login
    if AdminSession.password_authenticated?(session_params[:password]) then
      admin_session = AdminSession.create_sessions!(@user)
      admin_login(admin_session)
      render json: {}, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  def logout
    reset_session
    render json: {}, status: :ok
  end

  def logged_in?
    if is_admin?
      render json: {}, status: :ok
    else
      render json: {}, status: :unauthorized
    end
  end

  private

  def session_params
    params.require(:session).permit(
      :password)
  end
end
