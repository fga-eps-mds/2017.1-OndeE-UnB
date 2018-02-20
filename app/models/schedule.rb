class Schedule < ApplicationRecord
  belongs_to :room

  enum day_of_week: [:sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday]
  validates :title, presence: true
  validates :code, presence: true
  validates :day_of_week, inclusion: { in: day_of_weeks.keys }
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :classroom, presence: true

  translate_enum :day_of_week
end
