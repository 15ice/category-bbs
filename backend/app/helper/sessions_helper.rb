module SessionsHelper
  def remember(user)
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:uuid] = user.uuid
  end

  def admin_login(admin_session)
    session[:created_at] = admin_session.created_at
    session[:access_key] = admin_session.access_key
  end

  def current_user
    if (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      @current_user ||= user if user && user.authenticated?(cookies[:uuid])
    end
  end

  def is_admin?
    if (created_at = session[:created_at]) 
      admin_session = AdminSession.find_by(user: current_user, created_at: session[:created_at])
      return !admin_session.nil? && admin_session.authenticated?(session[:access_key]) &&
      Time.current.ago(Settings.MNG_SESSIONS_MINUTES_PERIOD.minutes) <= admin_session.created_at
    else
      return false
    end
  end
end
