require 'json'
class Department < ApplicationRecord
  has_and_belongs_to_many :buildings
  has_many :rooms, through: :buildings
  acts_as :location
  validates :acronym, length: { maximum: 20 }, presence: true
  validates :title, length: { maximum: 50 }, presence: true
  validates :phone, length: { maximum: 11 }, numericality: { only_integer: true }
  validates :latitude, numericality: true, presence: true
  validates :longitude, numericality: true, presence: true
  validates :geo_data, presence: true
end
