class Category < ApplicationRecord
  validates :name, 
      presence: { message: 'カテゴリ名を入力してください' }, 
      length: { maximum: 20, too_long: "カテゴリ名は%{count}文字以内で入力してください" }
end
