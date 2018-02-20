class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.string :acronym
      t.references :building, foreign_key: true
      t.integer :room_type
      t.integer :level
    end
  end
end
