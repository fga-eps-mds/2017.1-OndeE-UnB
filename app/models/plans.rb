class Plans < ApplicationRecord
  include PlanUploader[:image]
  belongs_to :buildings
  validates :building, presence: true
  validates :level, length: { maximum: 3 }, numericality: { only_integer: true }
  validates :geo_data, presence: true
  validates :image, presence: true
end
