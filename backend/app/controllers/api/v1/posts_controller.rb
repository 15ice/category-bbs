class Api::V1::PostsController < ApplicationController

  before_action :check_admin, only: [:update_display]

  def index
    posts = Post.search(params[:category], params[:skip], params[:take])
    render json: posts
  end

  def count
    num = Post.rec_num(params[:category])
    render json: num
  end

  def show
    post = Post.find(params[:id])
    render json: post, status: :ok
  end

  def create
    data = post_params
    post = Post.new(
      user: @user,
      user_name: data[:user_name],
      mail: data[:mail],
      title: data[:title],
      detail: data[:detail],
      category: Category.find(data[:category_id])
    )
    if post.save
      render json: post, status: :created
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update_hidden
    # 非表示に更新
    post = Post.find(params[:id])

    # 非表示に更新できるのは、管理者か本人のみ
    if post.user != @user && !is_admin?
      render json: {}, status: :forbidden
      return
    end

    post.is_hidden = true
    if post.save
      render json: post, status: :ok
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update_display
    # 表示に更新
    post = Post.find(params[:id])
    post.is_hidden = false
    if post.save
      render json: post, status: :ok
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(
      :user_name, 
      :mail, 
      :title, 
      :detail,
      :category_id)
  end
end
