
import axios from 'axios'

export default class Buildings {
  constructor (){
    this.endpoint = '/map/data/buildings'
    this.buildings = this.getBuildings()
  }

  getBuildings () {
    axios.get(this.endpoint)
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  addToMap(buildingLayer){
    console.log(this.buildings);
    this.buildings.forEach(building => {
        console.info("Adding building");
        try {
          var geoJSON = JSON.parse(building.geo_data);
          geoJSON.features[0].properties.building = {
            id: building.id,
            title: building.title,
            acronym: building.acronym
          };
          console.info(geoJSON);
          buildingLayer.addData(geoJSON);
        } catch (err) {
          console.error(err);
        }
      });
  }

}
