class User < ApplicationRecord
  attr_accessor :uuid

  class << self
    def create_anonymous!
      uuid = new_uuid
      user = new(
        uuid: uuid,
        user_digest: digest(uuid)
      )
      user.save!
      user
    end

    private

    def new_uuid
      SecureRandom.urlsafe_base64
    end

    def digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end
  end

  def authenticated?(uuid)
    BCrypt::Password.new(user_digest) == uuid
  end
end
