class Serving < ActiveRecord::Base
  belongs_to :user
  belongs_to :food
  self.inheritance_column = :_type_disabled
  validates :user_id, :food_id, presence: true
end
