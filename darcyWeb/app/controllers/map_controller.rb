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

  def routes
      @buildings = Building.all
  end

  def search_building
      @buildings = Building.all
  end

  def collect_building_data
    @buildings = Building.all
    @buildings.each do t
    render json: @buildings
  end

end
