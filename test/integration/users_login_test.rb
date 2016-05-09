require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest

  test "login with invalid info" do
    get login_path
    assert_template 'sessions/new'
    post login_path, session: {email: "", password: ""}
    assert_template 'sessions/new'
    assert_not flash.empty?, "Flash should be displayed on errors"
    get root_path
    assert flash.empty?, "Flash should not be shown on page redirect"
  end

end
