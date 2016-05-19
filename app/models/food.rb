class Food < ActiveRecord::Base
  has_many :users
  has_many :servings, through: :users
end
