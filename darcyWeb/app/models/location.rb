class Location < ApplicationRecord
  self.inheritance_column = :type
  
  scope :buildings, -> { where(type: 'Building') }

  def self.types
    %w(Building)
  end

end
