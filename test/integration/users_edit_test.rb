require 'test_helper'

class UsersEditTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:test)
  end

  test "unsuccssful edit" do
    log_in_as(@user, remember_me: '0')
    get edit_user_path(@user)
    assert_template 'users/edit'
    patch user_path(@user), user: {name: " ", email: "test@me", password: "11", password_confirmation: "111"}
    assert_template 'users/edit'
  end

  test "successful edit with forwarding" do
    get edit_user_path(@user)
    log_in_as(@user)
    assert_redirected_to edit_user_path(@user)
    name = "Test User"
    email = "me@test.com"
    patch user_path(@user), user: {name: name, email: email, password: "", password_confirmation: ""}
    assert_not flash.empty?
    assert_redirected_to @user
    @user.reload
    assert_equal name, @user.name
    assert_equal email, @user.email
  end

end
