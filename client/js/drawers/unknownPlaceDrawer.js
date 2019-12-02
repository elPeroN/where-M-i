function selectPlace() {

  document.getElementById('content_content').innerHTML = '';
  document.getElementById('footer_content').innerHTML = '';
  document.getElementById('content_title').innerHTML = 'Select your Place';
  var div = document.createElement('div');
  document.getElementById('content_content').appendChild(div);
  setQuery(approx);
  fetch(queryUrl).then(function(response){
    return response.json();
  }).then(function(jsonResponse){
    for(var i in jsonResponse.results.bindings){

      var button = new ActionButton('select');
      button.id = i;
      button.addEventListener("click", (event) => {
        var name = jsonResponse.results.bindings[event.srcElement.id].name.value;
        var descr = jsonResponse.results.bindings[event.srcElement.id].abstract.value;
        var img = jsonResponse.results.bindings[event.srcElement.id].img.value;
        var selectedCard = new CardTemp(name,null,descr,img).root_;
        createDialog(selectedCard);
      });

      var placeCard = new CardTemp(jsonResponse.results.bindings[i].name.value,null,jsonResponse.results.bindings[i].abstract.value,jsonResponse.results.bindings[i].img.value,[button]).root_;
      placeCard.className += ' about-card';
      div.appendChild(placeCard);
    };

    var notHere = document.createElement('div');
    notHere.className = "notListedPlace";
    notHere.innerHTML = "<h5>Place not listed?</h5>";

    var addBut = new ActionButton('Create It');
    addBut.addEventListener("click",function(){
      placeMarker.setMap(null);
      createDialog();
    });

    notHere.appendChild(addBut);
    div.appendChild(notHere);
  });
  mainDrawer.open = false;
  pageDrawer.open = true;
}
