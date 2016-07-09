# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


if Rails.env.production?
    User.create(name: "Admin", email: "me@test.net", password: ENV['ADMIN_PASS'], password_confirmation: ENV['ADMIN_PASS'], admin: true,
                activated: true, activated_at: Time.zone.now)
else
    User.create(name: "Admin", email: "me@test.net", password: "111111", password_confirmation: "111111", admin: true,
                activated: true, activated_at: Time.zone.now)

end

User.create!(name: "Example User",
             email: "example@railstutorial.org",
             password: "foobar",
             password_confirmation: "foobar",
             activated: true, activated_at: Time.zone.now)