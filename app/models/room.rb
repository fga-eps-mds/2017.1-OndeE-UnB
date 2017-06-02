class Room < ApplicationRecord
  acts_as :location
  belongs_to :building
  belongs_to :department
  has_many :courses
end
