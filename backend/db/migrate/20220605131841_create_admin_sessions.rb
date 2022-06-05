class CreateAdminSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :admin_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :access_key_digest, null: false

      t.timestamps
    end
  end
end
