class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :title
      t.string :latitude
      t.string :longitude
      t.actable

      t.timestamps
    end
  end
end
