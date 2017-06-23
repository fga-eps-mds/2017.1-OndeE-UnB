class AddUniqueIndexToBuildings < ActiveRecord::Migration[5.0]
  def change
  	add_index :buildings, [:acronym], unique: true
  end
end
