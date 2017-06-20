class SearchController < MapController

  def index
    buildings = json_building_search(params[:search])
    departments = json_department_search(params[:search])
    rooms = json_room_search(params[:search])
    features = buildings + departments + rooms
    geo_json = {
      type: 'FeatureCollection',
      features: features
    }
    render plain: geo_json.to_json
  end

  def json_room_search(search)
    search = "%#{search}%"
    room_search_string = 'locations.title ILIKE ? OR acronym ILIKE ? '
    @room = Room.joins(:location).where(room_search_string, search, search)
    features = []
    @room.each_with_index do |room, _index|
      properties = {
        popupContent: 'MDS',
        title: room.title,
        description: room.room_type,
        image: 'fa-room'
      }

      geo_data = JSON.parse room.geo_data
      geo_data['features'].each do |feature|
        feature[:properties] = properties
        features.push(feature)
      end
    end
    features
  end

  def json_department_search(search)
    search = "%#{search}%"
    department_search_string = 'locations.title ILIKE ? OR acronym ILIKE ? '
    @department = Department.joins(:location).where(department_search_string, search, search)
    features = []
    @department.each_with_index do |department, _index|
      properties = {
        popupContent: 'MDS',
        title: department.acronym,
        description: department.title,
        image: 'fa-department'
      }

      geo_data = JSON.parse department.geo_data
      geo_data['features'].each do |feature|
        feature[:properties] = properties
        features.push(feature)
      end
    end
    features
  end

  def json_building_search(search)
    search = "%#{search}%"
    building_search_string = 'locations.title ILIKE ? OR acronym ILIKE ? '
    @buildings = Building.joins(:location).where(building_search_string, search, search)
    features = []
    @buildings.each_with_index do |building, _index|
      properties = {
        popupContent: 'MDS',
        title: building.acronym,
        description: building.title,
        image: 'fa-building'
      }

      geo_data = JSON.parse building.geo_data
      geo_data['features'].each do |feature|
        feature[:properties] = properties
        features.push(feature)
      end
    end
    features
  end
end
