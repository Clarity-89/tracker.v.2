class AddIdToFood < ActiveRecord::Migration
  def change
    add_column :foods, :_id, :string
  end
end
