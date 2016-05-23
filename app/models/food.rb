class Food < ActiveRecord::Base
  has_many :servings
  has_many :users, through: :servings
  validates :name, uniqueness: {scope: [:name, :calories, :serving_size]}
end
