var geolocator;

async function localize(){
  var options = {enableHighAccuracy: true,timeout: 5000,maximumAge: 0};
  geolocator = navigator.geolocation.watchPosition(watch, error, options);
  //welcomeDialog.close();
}

async function watch(position){
  if(!map.position.getPosition){
    map.setCenter(latLng);
    //welcomeDialog.close();
  }

  if(position.coords.accuracy){
    var latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
    map.position.setPosition(latLng);
    await map.position.setAccuracy(position.coords.accuracy);
    welcomeDialog.close();
  }else error();
}

function clear(){
  geolocator = navigator.geolocation.clearWatch(geolocator);
  map.position.remove();
}

function error(err) {
  if(geolocator != null) clear();
  //rimuove marker se cambio metodo di localizzazione
  if(map.draggableMarker){
    map.draggableMarker.marker.setMap(null);
    map.draggableMarker = null;
  }
  var snackbar = new SnackBar('Geolocation error, please try again or use another method');
  snackbar.open();
  snackbar.listen("MDCSnackbar:closed",() => {
    document.querySelector('.main-content').removeChild(document.querySelector('.mdc-snackbar'));
  });
  map.menuDrawer.open = false;
  openWelcome();
}