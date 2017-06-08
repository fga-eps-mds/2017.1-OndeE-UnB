class AddCodToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :cod, :int
  end
end
