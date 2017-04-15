class CreateBuildings < ActiveRecord::Migration[5.0]
  def change
    create_table :buildings do |t|
      t.string :acronym
      t.integer :phone

    end
  end
end
