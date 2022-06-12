class Api::V1::CategoriesController < ApplicationController

  before_action :check_admin, only: [:create, :update, :destroy]

  def index
    categories = Category.order(created_at: :asc)
    data = categories.map {
      | category | {
        data: category,
        post_count: category.post_count,
        active_post_count: category.active_post_count
      }
    }
    render json: data, status: :ok
  end

  def show
    category = Category.find(params[:id])
    render json: category, status: :ok
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def update
    category = Category.find(params[:id])
    if category.update(category_params)
      render json: category, status: :ok
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if Category.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
