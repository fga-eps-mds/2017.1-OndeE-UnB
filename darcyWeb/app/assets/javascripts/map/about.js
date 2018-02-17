$(".btn-about").click(function(e){
  e.preventDefault();

  $("#sidebar").load("about", function(){
    if(!sidebar.isVisible()){
       sidebar.show();
    }
  });
});
