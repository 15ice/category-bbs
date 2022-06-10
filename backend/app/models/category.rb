class Category < ApplicationRecord
  has_many :posts

  validates :name, 
      presence: { message: 'カテゴリ名を入力してください' }, 
      length: { maximum: 20, too_long: "カテゴリ名は%{count}文字以内で入力してください" }

  def post_count
    self.posts.size
  end

  def active_post_count
    self.posts.where(is_hidden: false).size
  end
end
