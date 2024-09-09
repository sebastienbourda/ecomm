class HomeController < ApplicationController
  def index
    @main_categories = Category.take(4)
    @products = Product.where("active", true)
  end
end
