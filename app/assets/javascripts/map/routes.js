var redIcon = L.icon({
        iconUrl: 'http://assets.route360.net/leaflet-extras/marker-icon-red.png',
        shadowUrl: 'http://assets.route360.net/leaflet-extras/marker-shadow.png',
        iconAnchor: [12, 45],
        popupAnchor: [0, -35]
      });

var sourceMarker1 = L.marker(latlons.src1, { draggable : true }).addTo(map);
      var targetMarker1 = L.marker(latlons.trg1, { icon: redIcon, draggable : true }).addTo(map);
      var targetMarker2 = L.marker(latlons.trg2, { icon: redIcon, draggable : true }).addTo(map);

var routeLayer = L.featureGroup().addTo(map);

var getRoutes = function() {

        routeLayer.clearLayers();

        // you need to define some options for the polygon service
        // for more travel options check out the other tutorials
        var travelOptions = r360.travelOptions();
        // we only have one source which is the marker we just added
        travelOptions.addSource(sourceMarker1);
        // add two targets to the options
        travelOptions.addTarget(targetMarker1);
        travelOptions.addTarget(targetMarker2);
        // set the travel type to transit
        travelOptions.setTravelType('walk');
        // please contact us and request your own key
        travelOptions.setServiceKey('F2H7U2QUY7P3AESM3O20K2U');
        // set the service url for your area
        travelOptions.setServiceUrl('https://service.route360.net/south_america/');

        // start the service
        r360.RouteService.getRoutes(travelOptions, function(routes) {

          // one route for each source and target combination
          routes.forEach(function(route) {

            r360.LeafletUtil.fadeIn(routeLayer, route, 1000, "travelDistance");
          });
        });
      }

      getRoutes();

      sourceMarker1.on('dragend', getRoutes);
      targetMarker1.on('dragend', getRoutes);
      targetMarker2.on('dragend', getRoutes);
