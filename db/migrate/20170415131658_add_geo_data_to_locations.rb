class AddGeoDataToLocations < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :geo_data, :json
  end
end
