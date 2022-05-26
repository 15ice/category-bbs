class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :user_name
      t.string :mail
      t.string :title
      t.string :detail, null: false
      t.references :category, null: false, foreign_key: true
      t.boolean :is_hidden, default: false, null: false

      t.timestamps
    end
  end
end
