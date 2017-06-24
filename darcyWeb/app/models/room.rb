class Room < ApplicationRecord
  acts_as :location

  belongs_to :building

  has_many :schedules

  # types of rooms
  enum room_type: [ :classroom, :laboratory, :professor_room, :study_room, :amphitheater, :academic_center, :kitchen, :SAA, :others]
  translate_enum :room_type

  # validations
  validates :acronym, length: { maximum: 20 }, presence: true
  validates :building, presence: true
  validates :geo_data, presence: true
  validates :latitude, numericality: true, presence: true
  validates :level, numericality: { only_integer: true }, presence: true
  validates :longitude, numericality: true, presence: true
  validates :room_type, inclusion: { in: room_types.keys }
  validates :title, length: { maximum: 50 }, presence: true
end
