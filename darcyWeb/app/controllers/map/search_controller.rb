class Map::SearchController < MapController
  def locations
    puts params[:search]
    buildings = search_buildings(params[:search])
    rooms = search_rooms(params[:search])
    buildings + rooms
  end

  def search
    render json: locations
  end

  def search_geo
    render json: geo(locations)
  end

  def geo(features)
    geo_json = []
    features.each do |feature|

      title = ''
      description = ''
      image = ''
      case feature.class.name
      when 'Building'
        title = feature.acronym
        description = feature.title
        image = 'fa-building'
      when 'Room'
        title = feature.title
        description = feature.room_type
        image = 'fa-room'
      end

      properties = {
        popupContent: 'MDS',
        title: title,
        description: description,
        image: image,
        latitude: feature.latitude,
        longitude: feature.longitude
      }

      geo_data = JSON.parse feature.geo_data
      geo_data['features'].each do |geo_feature|
        geo_feature[:properties] = properties
        geo_json.push(geo_feature)
      end
    end

    json = {
     type: 'FeatureCollection',
     features: geo_json
    }

    json.to_json
  end

  def search_rooms(search)
    search = "%#{search}%"
    Room.joins(:location).where('locations.title ILIKE ? OR acronym ILIKE ? ', search, search)
  end

  def search_buildings(search)
    search = "%#{search}%"
    Building.joins(:location).where('locations.title ILIKE ? OR acronym ILIKE ? ', search, search)
  end
end
