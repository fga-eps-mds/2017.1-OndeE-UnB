class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.references :building, foreign_key: true
      t.integer :level
      t.text :geo_data
      t.text :image_data
    end
  end
end
