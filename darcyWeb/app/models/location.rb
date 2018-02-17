class Location < ApplicationRecord
  actable
  validates :title, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :geo_data, presence: true    
end
