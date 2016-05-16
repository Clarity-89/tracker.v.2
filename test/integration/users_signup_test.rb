require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  def setup
    ActionMailer::Base.deliveries.clear
  end

  test "Invalid signup info" do
    get signup_path
    assert_no_difference 'User.count' do
      post users_path, user: {name: " ", email: "test@me", password: "11", password_confirmation: "111"}
    end
    assert_template 'users/new'
  end

  test "Valid signup with account activation" do
    get signup_path
    assert_difference 'User.count', 1 do
      post users_path, user: {name: "Test User", email: "test@me.com", password: "111111", password_confirmation: "111111"}
    end
    assert_equal 1, ActionMailer::Base.deliveries.size
    user = assigns(:user)
    assert_not user.activated?
    # Try to og in before activation
    log_in_as(user)
    assert_not is_logged_in?
    # Invalid activation token
    get edit_account_activation_path('invalid token')
    assert_not is_logged_in?
    # Valid token, wrong email
    get edit_account_activation_path(user.activation_token, email: 'wrong')
    assert_not is_logged_in?
    # Valid activation token
    get edit_account_activation_path(user.activation_token, email: user.email)
    assert user.reload.activated?
    follow_redirect!
    assert_template 'users/show'
    assert is_logged_in?
  end

end
