require 'test_helper'

class UsersControllerTest < ActionController::TestCase

  def setup
    @user = users(:test)
    @other_user = users(:alex)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should redirect to edit when not logged in" do
    get :edit, id: @user
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect to update when not logged in" do
    patch :update, id: @user, user: {name: @user.name, email: @user.email}
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect to edit when logged in as a wrong user" do
    log_in_as(@other_user)
    get :edit, id: @user
    assert flash.empty?
    assert_redirected_to root_url
  end

  test "should redirect to update when logged in as a wrong user" do
    log_in_as(@other_user)
    patch :update, id: @user, user: {name: @user.name, email: @user.email}
    assert flash.empty?
    assert_redirected_to root_url
  end

end
