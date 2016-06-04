class ServingsIntegerToFloat < ActiveRecord::Migration
  def change
      change_column :foods, :calories, :float
      change_column :foods, :protein, :float
      change_column :foods, :carbs, :float
      change_column :foods, :fat, :float
      change_column :foods, :serving_size, :float
  end
end
