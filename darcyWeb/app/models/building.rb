class Building < ApplicationRecord
  acts_as :location
  validates :acronym, presence: true
  validates :phone, presence: true
  validates :title, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :geo_data, presence: true   
end