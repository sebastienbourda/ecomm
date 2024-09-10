class AddPriceToStock < ActiveRecord::Migration[7.1]
  def change
    add_column :stocks, :price, :integer
  end
end
