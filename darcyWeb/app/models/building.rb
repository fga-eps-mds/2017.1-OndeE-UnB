class Building < ApplicationRecord
  include ImageUploader[:image]
  has_many :rooms
  has_many :entrances
  has_many :plans
  acts_as :location
  validates :acronym, length: { maximum: 20 }, presence: true
  validates :title, length: { maximum: 50 }, presence: true
  validates :phone, length: { maximum: 11 }, numericality: { only_integer: true }
  validates :latitude, numericality: true, presence: true
  validates :longitude, numericality: true, presence: true
  validates :geo_data, presence: true
  validates :acronym , uniqueness: true
end
