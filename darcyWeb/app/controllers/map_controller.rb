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

    features = []
    @buildings.each_with_index do |building, index|

      properties = {
        popupContent: "MDS",
        title: building.acronym,
        description: building.title,
        image: 'fa-building'
      }

      geo_data = JSON.parse building.geo_data
      geo_data['features'].each do |feature|
        feature.merge!(properties: properties)
        features.push(feature)
      end

    end

     geo_json = {
      type: "FeatureCollection",
      features: features
    }

    render plain: geo_json.to_json
  end

end
