class Place {
  constructor(name, img, description, category, latLng){

    this.marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        url: 'content/nearby.svg',
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    }});

    var buttonList = [];



    var addButton = new IconButton('search','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
    var directionButton = new IconButton('navigation','mdc-elevation--z2 mdc-image__circular mdc-button--raised');
    var positionButton = new IconButton('person_pin','mdc-elevation--z2 mdc-image__circular mdc-button--raised');

    buttonList.push(directionButton.root_);
    buttonList.push(positionButton.root_);
    var card = new Card(name, null, description, img,[addButton.root_],buttonList).root_;
    card.className += " infoWindow-card";

    this.infoWindow = new google.maps.InfoWindow({
      content: card,
      maxWidth: 400,
    });

    addButton.root_.addEventListener('click', () => {
      if(profile) selectPlace(this.marker.getPosition());
      else alert('You must be logged in to use this function');
    });

    directionButton.root_.addEventListener('click', () => {
      this.showDirection();
    });
    this.marker.addListener('click', () => {
      this.infoWindow.open(map, this.marker);
    });
    positionButton.root_.addEventListener('click', () => {
      map.position.setPosition(this.marker.getPosition());
      this.removePosition();
    });
  }


  showDirection(){
    if(map.position.getPosition()){
        map.directionsService.route({
          origin: map.position.getPosition(),
          destination: this.marker.getPosition(),
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
    }else{
      //Non hai la geolocalizzazione attiva!
      window.alert('Non hai la geolocalizzazione attiva');
    }
  }

  getPosition(){
    return this.marker.getPosition();
  }

  getMap(){
    return this.marker.getMap();
  }

  setPosition(position){
    this.marker.setPosition(position);
    this.marker.setMap(map);
  }

  removePosition(){
    this.marker.setMap(null);
    this.infoWindow.setMap(null);
  }

  isWindowOpen(){
    if(this.infoWindow.getMap()) return true;
    else return false;
  }

  closeWindow(){
    this.infoWindow.close();
  }

  openWindow(){
    this.infoWindow.open(map, this.marker);
  }

  /*
  var listener = function(j){
    map.places[j].addListener('click', function() {
      if(map.unknownMarker.getMap()) map.unknownMarker.setMap(null);
      var card = new Card(, null, );
      map.placeWindow.setContent(card);
      map.placeWindow.open(map, places[j]);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://texttospeech.googleapis.com/v1/text:synthesize');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = this.reproduceImmersiveSound;
      xhr.send(JSON.stringify({
"audioConfig": {
"audioEncoding": "LINEAR16",
"pitch": 0,
"speakingRate": 3.85
},
"input": {
"text": "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices."
},
"voice": {
"languageCode": "it-IT",
"name": "it-IT-Standard-A"
}
}));
    });
  }

  listener(i);
}
}

reproduceImmersiveSound(){
var response = JSON.parse(this.responseText);
console.log(response);
}
*/
}
