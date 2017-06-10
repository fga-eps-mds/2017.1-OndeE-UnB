class SearchController < MapController

  def index
     buildings = json_building_search(params[:search])
     departments = json_department_search(params[:search])
     rooms = json_room_search(params[:search])
     features = buildings + departments + rooms
     geo_json = {
      type: "FeatureCollection",
      features: features
     }
     render plain: geo_json.to_json
  end

  def json_room_search(search)
    search = "%#{search}%"
    @room = Room.joins(:location).where("locations.title ILIKE ? OR acronym ILIKE ? ", search, search)
    features = []
    @room.each_with_index do |room, index|

      properties = {
        popupContent: "MDS",
        title: room.title,
        description: room.room_type,
        image: 'fa-room'
      }

      geo_data = JSON.parse room.geo_data
      geo_data['features'].each do |feature|
        feature.merge!(properties: properties)
        features.push(feature)
      end
    end
    features
  end

  def json_department_search(search)
    search = "%#{search}%"
    @department = Department.joins(:location).where("locations.title ILIKE ? OR acronym ILIKE ? ", search, search)
    features = []
    @department.each_with_index do |department, index|

      properties = {
        popupContent: "MDS",
        title: department.acronym,
        description: department.title,
        image: 'fa-department'
      }

      geo_data = JSON.parse department.geo_data
      geo_data['features'].each do |feature|
        feature.merge!(properties: properties)
        features.push(feature)
      end
    end
    features
  end

  def json_building_search(search)
    search = "%#{search}%"
    @buildings = Building.joins(:location).where("locations.title ILIKE ? OR acronym ILIKE ? ", search, search)
    features = []
    @buildings.each_with_index do |building, index|

      properties = {
        popupContent: "MDS",
        title: building.acronym,
        description: building.title,
        image: 'fa-building',
        latitude: building.latitude,
        longitude: building.longitude
      }

      geo_data = JSON.parse building.geo_data
      geo_data['features'].each do |feature|
        feature.merge!(properties: properties)
        features.push(feature)
      end

    end
    features
  end
end
