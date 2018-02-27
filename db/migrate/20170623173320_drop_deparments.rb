class DropDeparments < ActiveRecord::Migration[5.0]
  def change
    drop_table :departments
  end
end
