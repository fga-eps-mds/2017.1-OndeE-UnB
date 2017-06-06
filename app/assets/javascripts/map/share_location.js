map.contextmenu.addItem({
  text: 'Compartilhar Localizacao',
  callback: shareLocation
});




var sharedLocation = {
  marker: null,
  title: 'sharedLocation',
  icon: 'arrow-down-c',
  color: 'blue'
};


function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
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
  linkUrl += "/findme?lat="+lat+"&lng="+lng;
  copyToClipboard(linkUrl);
  alert("Link copiado, cole onde desejar e envie para seu colega!");
};



function shareLocation(e) {
  setSharedLocation(e, sharedLocation);
}