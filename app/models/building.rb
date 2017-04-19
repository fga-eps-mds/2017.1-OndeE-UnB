class Building < ApplicationRecord
  has_and_belongs_to_many :departments
  has_many :rooms
  has_many :entrances
  acts_as :location
  validates :acronym, presence: true
  validates :title, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :geo_data, presence: true
end
