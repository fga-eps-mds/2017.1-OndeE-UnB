class Room < ApplicationRecord
  belongs_to :building
  belongs_to :department
end
