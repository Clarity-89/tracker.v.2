require 'test_helper'

class FoodTest < ActiveSupport::TestCase
    def setup
        @banana = Food.new(name: 'banana', calories: 15, serving_size: 100)
    end

    test "should be valid" do
        assert @banana.valid?
    end

    test "should not add duplicate entries" do
        @banana.save
        assert_no_difference 'Food.count' do
            @banana2 = Food.create(name: 'banana', calories: 15, serving_size: 100)
        end
    end
end
