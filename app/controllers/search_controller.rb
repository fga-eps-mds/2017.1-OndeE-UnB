class SearchController < MapController

  def index
     geo_json = json_department_search(params[:search])
     render plain: geo_json.to_json
  end

  def json_department_search(search)
    @department = Department.where('acronym LIKE ?', "%#{search}%")
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
    geo_json = {
     type: "FeatureCollection",
     features: features
    }
end
