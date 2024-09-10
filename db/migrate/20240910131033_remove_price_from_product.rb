class RemovePriceFromProduct < ActiveRecord::Migration[7.1]
  def change
    remove_column :products, :price, :integer
  end
end
