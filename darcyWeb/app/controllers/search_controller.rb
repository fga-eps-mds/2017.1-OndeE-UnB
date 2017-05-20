SearchController < MapController

  def collect_department_data
     geo_json = json_department_search(params[:search])
     render plain: geo_json.to_json
  end


end
