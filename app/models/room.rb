class Room < ApplicationRecord
  acts_as :location

  belongs_to :building

  has_many :courses

  # types of rooms
  enum room_type: [ :classroom, :laboratory, :professor_room, :study_room ]

  # validations
  validates :building, presence: true
  validates :acronym, length: { maximum: 20 }, presence: true
  validates :title, length: { maximum: 50 }, presence: true
  validates :latitude, numericality: true, presence: true
  validates :longitude, numericality: true, presence: true
  validates :room_type, presence: true
  validates :level, numericality: { only_integer: true }, presence: true
  validates :geo_data, presence: true

end
