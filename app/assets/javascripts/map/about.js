  L.easyButton("ion-android-happy", function(btn, map) {
  	$("#sidebar").load("about", function(){
  		if(!sidebar.isVisible()){
  		   sidebar.show();
  		}
  		else
  			sidebar.hide();
  	})
   

  }).addTo(map);