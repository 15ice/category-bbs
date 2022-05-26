class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.order(created_at: :desc)
    render json: posts
  end

  def search
    posts = Post.search(params[:category])
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post, status: :ok
  end

  def create
    data = post_params
    post = Post.new(
      user: current_user,
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

  def update
    # 表示、非表示のみ更新可能
    post = Post.find(params[:id])
    post.is_hidden = params.require(:post).permit(:is_hidden)
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
