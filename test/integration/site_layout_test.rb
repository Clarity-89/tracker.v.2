require 'test_helper'

# noinspection Rails3Deprecated
class SiteLayoutTest < ActionDispatch::IntegrationTest

  test 'layout links' do
    get root_path
    assert_template 'static_pages/landing'
    assert_select 'a[href=?]', root_path, count: 2
    assert_select 'a[href=?]', about_path
    assert_select 'a[href=?]', contact_path
  end
end
