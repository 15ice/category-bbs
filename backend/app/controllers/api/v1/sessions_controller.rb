class Api::V1::SessionsController < ApplicationController
  def login
    if AdminSession.password_authenticated?(session_params[:password]) then
      admin_session = AdminSession.create_sessions!(current_user)
      admin_login(admin_session)
      render login: true, status: :ok
    else
      render login: false, status: :unauthorized
    end
  end

  def logout
    reset_session
    render logout: true, status: :ok
  end

  private

  def session_params
    params.require(:session).permit(
      :password)
  end
end
