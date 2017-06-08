class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.references :room, foreign_key: true
      t.decimal :code
      t.string :start_time
      t.string :end_time
      t.string :day_of_week
    end
  end
end
