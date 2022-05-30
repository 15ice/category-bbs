class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.order(created_at: :asc)
    render json: categories, status: :ok
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
