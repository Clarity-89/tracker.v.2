require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Test User", email: "test@example.com", password: 'hello_world')
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = "  "
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = "  "
    assert_not @user.valid?
  end

  test "name should be max 25 chars long" do
    @user.name= "a" * 26
    assert_not @user.valid?
  end

  test "name should be min 3 chars long" do
    @user.name = "a"
    assert_not @user.valid?
  end

  test "email shouild be less than 255 chars long" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "valid emails should be accepted" do
    addresses = %w[me@test.com ME@test.org Hello_World@test.com firstname.lastname@test.com me@s.a.com]
    addresses.each do |address|
      @user.email = address
      assert @user.valid?, "#{address.inspect} should be valid"
    end
  end

  test "invalid emails should be rejected" do
    addresses = %w[hello.com me@test me@example,com hello@hello_back.com me@hello..com]
    addresses.each do |address|
      @user.email = address
      assert_not @user.valid?, "#{address.inspect} should be invalid"
    end
  end

  test "email should be unique" do
    dup_user = @user.dup
    dup_user.email = @user.email.upcase
    @user.save
    assert_not dup_user.valid?
  end

  test "password should be present" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "password should be min 6 chars long" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end

  test "email should be saved as lowercase" do
    email = 'HeLLo@me.coM'
    @user.email = email
    @user.save
    assert_equal email.downcase, @user.reload.email
  end
end
