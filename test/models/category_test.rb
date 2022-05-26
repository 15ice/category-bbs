require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  test "カテゴリ名が必須であること" do
    category = Category.new(
      name: "   "
    )
    category.valid?
    assert category.errors[:name].include?("カテゴリ名を入力してください")
  end

  test "カテゴリ名が20文字以内であること" do
    category = Category.new(
      name: (0...21).map{ (65 + rand(26)).chr }.join
    )
    category.valid?
    assert category.errors[:name].include?("カテゴリ名は20文字以内で入力してください")
  end

  test "正しいデータでカテゴリが登録できること" do
    category = Category.new(
      name: (0...20).map{ (65 + rand(26)).chr }.join
    )
    assert category.valid?
  end
end
