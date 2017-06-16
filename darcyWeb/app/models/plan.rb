class Plan < ApplicationRecord
  include PlanUploader[:image]
  belongs_to :building
  validates :building, presence: true
  validates :level, numericality: { only_integer: true }, presence: true
  validates :geo_data, presence: true
  validates :image, presence: true
end
