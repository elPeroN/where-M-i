function openGeocode() {

  var selectContent = document.createElement('div');
  var name = new TextField('City');
  var road = new TextField('road');
  var num = new TextField ('num');

  selectContent.appendChild(name.root_);
  selectContent.appendChild(road.root_);
  selectContent.appendChild(num.root_);

  var footer = document.createElement('div');
  var selectOnMap = new ActionButton('Select on map', 'mdc-button--raised');
  var back = new ActionButton('Back');
  var add = new ActionButton('Search', 'mdc-button--raised');

  footer.appendChild(back.root_);
  footer.appendChild(add.root_);
  footer.appendChild(selectOnMap.root_);

  var geocodeDialog = new Dialog(selectContent, footer, "Add some informations");

  document.getElementById('map').appendChild(geocodeDialog.root_);
  geocodeDialog.open();
  geocodeDialog.scrimClickAction = '';
  geocodeDialog.escapeKeyAction = '';

  add.listen('click', () => {
    var address = name.input.value + ' ' + road.input.value + ' ' + num.input.value;
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if(!map.position) map.position = new Position(results[0].geometry.location, true);
        else{
          map.position.setPosition(results[0].geometry.location);
        }
        map.setCenter(results[0].geometry.location);
        geocodeDialog.close();
      } else {
        var snackbar = new SnackBar('Please submit a valid Address');
        snackbar.open();
      }
    });
  })

  selectOnMap.listen('click', () => {
    geocodeDialog.close();
    openMarker();
  });

  back.listen('click', () => {
    geocodeDialog.close();
    openWelcome();
  });

  geocodeDialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(geocodeDialog.root_);
  });
};
