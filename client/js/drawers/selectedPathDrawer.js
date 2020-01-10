async function selectedPath(path){

  var content = document.createElement('div');
  content.id = 'content';

  for(var i in path.route){
    searchPlace(path.route[i]);
  }

  var navigationButton = new FloatingActionButton('navigation', 'drawer-fab');

  content.appendChild(navigationButton.root_);

  navigationButton.listen('click', () => {
    showRoute(path.route);
  })


  map.pageDrawer  = new PageDrawer(path.namer, content);
  map.pageDrawer.open = true;
}

function searchPlace(olc){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_place');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    var response = JSON.parse(xhr.response);
    var image = await decode64(response[0].image, "image/jpg");
    var card = new Card (response[0].name, null, response[0].description, image, null,null,'about-card');
    document.querySelector("#content").appendChild(card.root_);
  }
  xhr.send(JSON.stringify({OLC: olc}));

}

function showRoute(path){
    var origin = decodeOlc(path[0]);
    var destination = decodeOlc(path[path.length - 1]);
    var waypoints = [];
    for(var i=1; i<path.length -1; i++){
      console.log(i);
      var point = {location: decodeOlc(path[i])};
      waypoints.push(point);
    }
    console.log(waypoints);
    map.directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'WALKING'
      }, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
          map.directionsRenderer.setDirections(response);
          console.log(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

}

function decodeOlc(olc){
  var decode = OpenLocationCode.decode(olc);
  latLng = {lat: decode.latitudeCenter, lng: decode.longitudeCenter};
  return latLng
}