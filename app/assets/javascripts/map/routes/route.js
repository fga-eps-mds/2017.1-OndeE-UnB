function Route() {

  this.origin = {
    marker: null,
    title: "origin",
    icon: "arrow-up-c",
    color: "green"
  };

  this.destination = {
    marker: null,
    title: "destination",
    icon: "arrow-down-c",
    color: "red"
  };
}

Route.prototype.positionError = function(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      swal("Oops...", "Habilite o uso da localização no browser.", "error");
      break;
    case error.POSITION_UNAVAILABLE:
      swal("Oops...", "Localização não disponível.", "error");
      break;
    case error.TIMEOUT:
      swal("Oops...", "Não foi possível obter a localização no tempo esperado.", "error");
      break;
    case error.UNKNOWN_ERROR:
      swal("Oops...", "Ocorreu um erro desconhecido. Tente novamente.", "error");
      break;
  }
}
