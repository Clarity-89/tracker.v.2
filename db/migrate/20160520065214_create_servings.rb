class CreateServings < ActiveRecord::Migration
  def change
    create_table :servings do |t|
      t.references :user, index: true, foreign_key: true
      t.references :food, index: true, foreign_key: true
      t.string :type
      t.date :date

      t.timestamps null: false
    end
  end
end
