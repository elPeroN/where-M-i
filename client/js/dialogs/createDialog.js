function createDialog(position, card){
  var content = document.createElement("div");

  var lat = position.lat();
  var long = position.lng();
  var exampleCard;

  if (card == null)  exampleCard = new Card(luogoSconosciuto.title, null, luogoSconosciuto.description, luogoSconosciuto.media).root_;
  else exampleCard = card;
  exampleCard.className += " about-card";
  exampleCard.id = "place-card";
  content.appendChild(exampleCard);

  if (card == null){
    var addName = document.createElement("div");
    var name = new TextField("Name","add");
    var submit = new IconButton("add");
    submit.root_.addEventListener("click", function(){
      document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML= name.value;
    })
    addName.appendChild(name.root_);
    addName.appendChild(submit.root_);
    content.appendChild(addName);

    var addDescr = document.createElement("div");
    var descr = new TextField("Description","add");
    var submit = new IconButton("add");
    submit.root_.addEventListener("click", function(){
      document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML= descr.value;
    })
    addDescr.appendChild(descr.root_);
    addDescr.appendChild(submit.root_);
    content.appendChild(addDescr);
  }

  var addCat = document.createElement("div");
  var cat = new TextField("Category","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
  })
  addCat.appendChild(cat.root_);
  addCat.appendChild(submit.root_);
  content.appendChild(addCat);

  var addOpHo = document.createElement("div");
  var opHo = new TextField("Opening Hours","add");
  var submit = new IconButton("add");
  submit.root_.addEventListener("click", function(){
  })
  addOpHo.appendChild(opHo.root_);
  addOpHo.appendChild(submit.root_);
  content.appendChild(addOpHo);

  var addImage = document.createElement("div");
  var input = document.createElement("input");
  input.type = 'file';
  input.id = 'file';
  content.appendChild(addImage);

  var footer = document.createElement('div');
  var button = new ActionButton("add");
  button.addEventListener("click", function(){

    var form = new FormData();
    form.append('OLC', OpenLocationCode.encode(position.lat(), position.lng(), OpenLocationCode.CODE_PRECISION_EXTRA));
    form.append('user', profile.getId());
    form.append('name', document.getElementById("place-card").querySelector(".mdc-card__title").innerHTML);
    //form.append('category', ?)
    //form.append('orario', ?);
    form.append('description', document.getElementById("place-card").querySelector(".mdc-typography--body2").innerHTML);

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/new_place');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200 ) {
            alert('Aggiunto con Successo!');
            //map.places.push(new Place(response[i].name, null, response[i].description, null, center, map)
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };

    var object = {};
    form.forEach(function(value, key){
        object[key] = value;
    });

    xhr.send(JSON.stringify(object));
  });
  footer.appendChild(button);


  var dialog = new Dialog(content,footer,"Add some informations.");
  document.getElementById('map').appendChild(dialog.root_);
  dialog.open();

  dialog.listen('MDCDialog:closing', function() {
  document.getElementById('map').removeChild(dialog.root_);
});
}
