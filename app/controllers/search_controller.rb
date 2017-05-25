class SearchController < MapController

  def index
     buildings = json_building_search(params[:search])
     departments = json_department_search(params[:search])
     features = buildings + departments
     geo_json = {
      type: "FeatureCollection",
      features: features
     }
     render plain: geo_json.to_json
  end

  def json_department_search(search)
    search = "%#{search}%"
    @department = Department.joins(:location).where("locations.title LIKE ? OR acronym LIKE ? ", search, search)
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
    @buildings = Building.joins(:location).where("locations.title LIKE ? OR acronym LIKE ? ", search, search)
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
    features
  end
end
