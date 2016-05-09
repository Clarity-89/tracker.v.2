require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "Invalid signup info" do
    get signup_path
    assert_no_difference 'User.count' do
      post users_path, user: {name: " ", email: "test@me", password: "11", password_confirmation: "111"}
    end
    assert_template 'users/new'
  end
end
