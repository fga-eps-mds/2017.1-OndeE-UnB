class Building < ApplicationRecord
  has_and_belongs_to_many :departments
  has_many :rooms
  has_many :entrances
  acts_as :location
  validates :acronym, length: {  maximum: 20 }, presence: true
  validates :title, length: {  maximum: 50 }, presence: true
  validates :phone, numericality: { only_integer: true }, presence: true
  validates :latitude, numericality: true, presence: true
  validates :longitude, numericality: true, presence: true
  validates :geo_data, presence: true
end
