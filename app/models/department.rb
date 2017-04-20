class Department < ApplicationRecord
  has_and_belongs_to_many :buildings
  has_many :rooms, through: :buildings
end
