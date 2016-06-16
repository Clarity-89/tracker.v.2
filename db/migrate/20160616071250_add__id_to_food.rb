class AddIdToFood < ActiveRecord::Migration
  def change
    add_column :foods, :_id, :integer
  end
end
