class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :user_name, 
      length: { maximum: 50, too_long: "名前は%{count}文字以内で入力してください" }
  validates :detail, 
      presence: { message: '本文を入力してください' }, 
      length: { maximum: 5000, too_long: "本文は%{count}文字以内で入力してください" }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z|\A\z/i
  validates :mail, 
      format: { with: VALID_EMAIL_REGEX, message: "メールアドレスを正しく入力してください" }

  def self.search(category, skip, take)
    if category
      Post.where(category: category).order(created_at: :desc).limit(take).offset(skip)
    else
      Post.all.order(created_at: :desc)
    end
  end

  def self.rec_num(category)
    if category
      Post.where(category_id: category).count
    else
      Post.all.count
    end
  end

  def self.rec_active_num(category)
    if category
      Post.where(category: category, is_hidden: false).count
    else
      Post.all.count
    end
  end
end
