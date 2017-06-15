$(plansPages).ready(function() {

  var overlay;

  // Standard corners for image
  var topLeft = [-15.764954118918263, -47.869057059288025];
  var topRight = [-15.7626954548496561, -47.87069186568261];
  var bottomLeft = [-15.764360415369641, -47.86812901496888];

  var markerTopLeft;
  var markerTopRight;
  var markerBottomLeft;

  function addMarker(latLng) {
    return L.marker(latLng, {
      draggable: true
    }).addTo(map);
  }

  //Fits image for each marker
  var boundsImage;

  const geoData = {
    $element: $("#plan_geo_data"),
    save: function(overlay) {
      var geoJSON = {
        bottomLeft: overlay._bottomLeft,
        topLeft: overlay._topLeft,
        topRight: overlay._topRight,
      };
      this.$element.val(JSON.stringify(geoJSON));
    },
    load: function() {
      const imageSource = $("#plan_image").data("image");
      var geoJSON = this.$element.val();

      if (geoJSON) {
        geoJSON = JSON.parse(geoJSON);
        markerTopLeft = addMarker(geoJSON.topLeft);
        markerTopRight = addMarker(geoJSON.topRight);
        markerBottomLeft = addMarker(geoJSON.bottomLeft);

        overlay = setOverlay(imageSource);

        enableMarkersDrag();

        boundsImage = new L.LatLngBounds(markerTopLeft.getLatLng(), markerTopRight.getLatLng()).extend(markerBottomLeft.getLatLng());
        map.fitBounds(boundsImage);

      }

    }
  };

  geoData.load();

  function enableMarkersDrag() {
    markerTopLeft.on('drag dragend', repositionImage);
    markerTopRight.on('drag dragend', repositionImage);
    markerBottomLeft.on('drag dragend', repositionImage);
  }

  // Removes the current overlay and the markers
  function clearOverlay() {
    if (overlay) {
      overlay.remove();
    }
  }

  function createMarkers(){
    if(!map.hasLayer(markerTopLeft)) {
      markerTopLeft = addMarker(topLeft);
      markerTopRight = addMarker(topRight);
      markerBottomLeft = addMarker(bottomLeft);
    }
  }

  function repositionImage() {
    overlay.reposition(markerTopLeft.getLatLng(), markerTopRight.getLatLng(), markerBottomLeft.getLatLng());
    geoData.save(overlay);
  }

  function setOverlay(image) {
    return L.imageOverlay.rotated(image, markerTopLeft.getLatLng(), markerTopRight.getLatLng(), markerBottomLeft.getLatLng(), {
      opacity: 1,
      interactive: true
    }).addTo(map);
  }

  $("input[name='plan[image]'").change(function() {

    var image = this.files[0];
    if (image) {
      var reader = new FileReader();

      reader.onload = function(e) {

        // Remove the current overlay
        clearOverlay();

        // Create markers only if its not created
        createMarkers();

        // Set a new overlay
        overlay = setOverlay(e.target.result);

        enableMarkersDrag();

      }
      reader.readAsDataURL(image);
    }
  });
});
