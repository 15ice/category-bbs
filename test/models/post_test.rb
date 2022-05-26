require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "名前が50文字以内であること" do
    post = Post.new(
      user: User.first,
      user_name: (0...51).map{ (65 + rand(26)).chr }.join,
      detail: "テストテスト"
    )
    post.valid?
    assert post.errors[:user_name].include?("名前は50文字以内で入力してください")
  end

  test "本文が必須であること" do
    post = Post.new(
      user: User.first
    )
    post.valid?
    assert post.errors[:detail].include?("本文を入力してください")
  end

  test "本文が5000文字以内であること" do
    post = Post.new(
      user: User.first,
      detail: (0...5001).map{ (65 + rand(26)).chr }.join
    )
    post.valid?
    assert post.errors[:detail].include?("本文は5000文字以内で入力してください")
  end

  test "メールアドレスのフォーマットが正しいこと" do
    post = Post.new(
      user: User.first,
      mail: "suzuki.example.com",
      detail: "テストテスト"
    )
    post.valid?
    assert post.errors[:mail].include?("メールアドレスを正しく入力してください")

    post = Post.new(
      user: User.first,
      mail: "test#taro@examle.com",
      detail: "テストテスト"
    )
    post.valid?
    assert post.errors[:mail].include?("メールアドレスを正しく入力してください")
  end

  test "正しいデータで投稿ができること" do
    post = Post.new(
      user: User.first,
      user_name: (0...50).map{ (65 + rand(26)).chr }.join,
      mail: "hoge@example.com",
      detail: (0...5000).map{ (65 + rand(26)).chr }.join,
      category: Category.first
    )
    assert post.valid?
  end
end
