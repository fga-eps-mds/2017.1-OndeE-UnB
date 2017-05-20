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
    geo_json = json_building_search
    render plain: geo_json.to_json
  end



end
