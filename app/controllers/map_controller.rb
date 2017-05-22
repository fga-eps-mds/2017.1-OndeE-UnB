class MapController < ApplicationController
  layout false
  def index
  end

  def building
    @building = Building.find(params[:id])
  end

  def point
    @point = Point.find(params[:id])
  end
end
