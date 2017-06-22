map.contextmenu.addItem({
  text: "Compartilhar localização",
  callback: shareLocation
});



var sharedLocation = {
  marker: null,
  title: "sharedLocation",
  icon: "arrow-down-c",
  color: "blue"
};


function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData("Text", text);

  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}



function setSharedLocation(e, waypoint) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  if (waypoint.marker == null) {
    createMarker(waypoint, e.latlng);
  } else {
    waypoint.marker.setLatLng(e.latlng);
  }

  var linkUrl = window.location.host;
  linkUrl += "/findme?lat=" + lat + "&lng=" + lng;
  copyToClipboard(linkUrl);
  swal("Link copiado", "Cole onde desejar e envie para seu colega!", "success")
};



function shareLocation(e) {
  setSharedLocation(e, sharedLocation);
}

var sharedLocation = {
  marker: null,
  title: "sharedLocation",
  icon: "arrow-down-c",
  color: "blue"
};

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m, key, value) {
      vars[key] = value;
    });
  return vars;
}

function createMarker(waypoint, latlng) {
  //console.log("Lat and Lng");
  if (!$.isEmptyObject(latlng)) {
    waypoint.marker = L.marker(latlng, {
      icon: L.AwesomeMarkers.icon({
        prefix: "ion",
        icon: waypoint.icon,
        markerColor: waypoint.color
      })
    });
    map.addLayer(waypoint.marker);

    map.setView(latlng, 32, {
      animate: true
    });
    //map.setZoom(200, {animate: true});
  }
}

createMarker(sharedLocation, getUrlVars());
