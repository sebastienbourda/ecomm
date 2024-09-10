class ProductsController < ApplicationController
  def show
    @product = Product.find(params[:id])
    @random_products = Product.where.not(id: @product.id).order("RANDOM()").limit(4)
  end
end
