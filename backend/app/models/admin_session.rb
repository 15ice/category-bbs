class AdminSession < ApplicationRecord
  belongs_to :user
  validates :user, uniqueness: { scope: :created_at }
  attr_accessor :access_key

  class << self
    def create_sessions!(user)
      access_key = new_access_key
      session = new(
        user: user,
        access_key: access_key,
        access_key_digest: digest(access_key)
      )
      session.save!
      session
    end

    def password_authenticated?(password)
      BCrypt::Password.new(Settings.MNG_PASSWORD) == password
    end

    private

    def new_access_key
      SecureRandom.urlsafe_base64
    end

    def digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end
  end

  def authenticated?(access_key)
    BCrypt::Password.new(access_key_digest) == access_key
  end
end
