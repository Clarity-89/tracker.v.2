require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "Invalid signup info" do
    get signup_path
    assert_no_difference 'User.count' do
      post users_path, user: {name: " ", email: "test@me", password: "11", password_confirmation: "111"}
    end
    assert_template 'users/new'
  end

  test "Valid signup" do
    get signup_path
    assert_difference 'User.count', 1 do
      post_via_redirect users_path, user: {name: "Test User", email: "test@me.com", password: "111111", password_confirmation: "111111"}
    end
    assert_template 'users/show'
    assert is_logged_in?
  end

end
