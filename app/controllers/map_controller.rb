class MapController < ApplicationController
  layout false
  def index
  end

  def building
    @building = Building.find(params[:id])
  end

  def data
    @buildings = Building.all
    render json: @buildings
  end

  def datapoint
    @point = Point.all
    render json: @point
  end

  def point
    @point = Point.find(params[:id])
  end
end
