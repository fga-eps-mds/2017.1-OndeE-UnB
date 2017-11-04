import axios from 'axios'

export default class Buildings {
  constructor() {
    this.endpoint = '/map/data/buildings'
    this.buildings = this.getBuildings()
  }

  getBuildings() {
    return axios.get(this.endpoint);
  }

  addToMap(layer) {
    this.buildings.then(response => {
      let buildings = response.data;

      buildings.forEach(building => {
        let geoJSON;
        try {
          geoJSON = JSON.parse(building.geo_data);
          geoJSON.features[0].properties.building = {
            id: building.id,
            title: building.title,
            acronym: building.acronym
          };
          layer.addData(geoJSON);
        } catch (err) {
          console.error(err);
        }
      });

    }).catch(function(error) {
      console.log(error)
    });
  }

}
