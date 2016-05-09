require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:test)
  end

  test "login with invalid info" do
    get login_path
    assert_template 'sessions/new'
    post login_path, session: {email: "", password: ""}
    assert_template 'sessions/new'
    assert_not flash.empty?, "Flash should be displayed on errors"
    get root_path
    assert flash.empty?, "Flash should not be shown on page redirect"
  end

  test "login with valid info" do
    get login_path
    post login_path, session: {email: @user.email, password: 'password'}
    assert is_logged_in?
    assert_redirected_to @user
    follow_redirect!
    assert_template 'users/show'
    # check that if user is logged in he's redirected straight to home page
    get root_path
    assert_redirected_to home_url
    get logout_path
    assert_not is_logged_in?
    assert_redirected_to root_url
  end

end
