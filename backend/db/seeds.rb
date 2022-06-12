# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
INIT_CATEGORIES = [
  {
    name: '感想',
  },
  {
    name: '問い合わせ',
  },
  {
    name: 'クレーム',
  }
]

p "create test data for category."
INIT_CATEGORIES.each do |category|
  Category.create(category)
end

p "create test data for post."
(1..100).each do |n| 
  Post.create(
    user: User.offset( rand(User.count) ).first,
    user_name: "#{n} tester",
    mail: "#{n}test@test.com",
    title: "#{n} test title",
    detail: "#{n} test detail",
    category: Category.offset( rand(Category.count) ).first)
end
