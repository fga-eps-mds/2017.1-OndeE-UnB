require 'json'
class Point < ApplicationRecord
      acts_as :location
      enum type_point: ["Bicicletario", "Banheiro"]
      validates :description, length: { maximum: 200}, presence: true
      validates :title, length: { maximum: 50 }, presence: true
      validates :latitude, numericality: true, presence: true
      validates :longitude, numericality: true, presence: true
      validates :geo_data, presence: true
end