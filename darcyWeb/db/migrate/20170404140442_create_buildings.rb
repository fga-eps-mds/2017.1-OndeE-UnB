class CreateBuildings < ActiveRecord::Migration[5.0]
  def change
    create_table :buildings do |t|
      t.string :department
      t.string :description

      t.timestamps
    end
  end
end
