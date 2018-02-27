class CreatePoints < ActiveRecord::Migration[5.0]
  def change
    create_table :points do |t|
        t.integer :type_point
        t.text :description
    end
  end
end
