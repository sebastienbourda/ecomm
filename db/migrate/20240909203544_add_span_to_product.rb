class AddSpanToProduct < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :span, :integer
  end
end
