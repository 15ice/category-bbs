class Api::V1::PostsController < ApplicationController

  before_action :check_admin, only: [:update_display]

  def index
    posts = Post.search(params[:category], params[:skip], params[:take])
    # 管理者以外は非表示となったデータを参照できない
    if !is_admin?
      posts = posts.where(is_hidden: false)
    end

    data = posts.map {
      | post | {
        data: {
          id: post.id,
          user_name: post.user_name,
          mail: post.mail,
          taitle: post.title,
          detail: post.detail,
          category_id: post.category_id,
          is_hidden: post.is_hidden,
          created_at: post.created_at
        },
        own: @user == post.user
      }
    }
    render json: data
  end

  def count
    if is_admin?
      num = Post.rec_num(params[:category])
    else
      # 管理者以外は非表示となったデータを参照できない
      num = Post.rec_active_num(params[:category])
    end
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
      reset_session
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
