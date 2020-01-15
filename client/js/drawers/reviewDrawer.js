async function reviewDrawer(olc){

  var content = document.createElement('div');

  var addButton = new FloatingActionButton('add', 'drawer-fab');
  content.appendChild(addButton.root_);

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/find_review');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = async function(){
    var response = JSON.parse(xhr.response);
    for(var i in response){
      if(response[i].rating_place){
        var user = await findUser(response[i].user);
        var div = document.createElement('div');

        var separator1 = document.createElement('hr');
        separator1.className = 'mdc-list-divider';
        div.appendChild(separator1);

        var img = document.createElement('img');
        img.src = user.picture;
        div.appendChild(img);

        var id = document.createElement('div');
        id.innerHTML = user.name;
        div.appendChild(id);
        setStar(response[i].rating_place, div);
        var comment = document.createElement('div');
        comment.innerHTML = response[i].comment;
        div.appendChild(comment);

        var separator2 = document.createElement('hr');
        separator2.className = 'mdc-list-divider';
        div.appendChild(separator2);


        content.appendChild(div);
      }
    }
  }
  xhr.send(JSON.stringify({OLC: olc}));


  map.pageDrawer  = new PageDrawer('Reviews', content);
  map.pageDrawer.open = true;

  addButton.listen('click', () => {
    reviewDialog(olc);
  })


}

function setStar(rating, div){

  var star = [];
  for(var i=0;i<5;i++){
    if((rating >= (i + 0.33)) && (rating <= (i + 0.66))){
      star[i] = document.createElement('div');
      star[i].className = "material-icons";
      star[i].innerHTML = 'star_half';
      div.appendChild(star[i]);
    }
    else if(rating > i){
      star[i] = document.createElement('div');
      star[i].className = "material-icons";
      star[i].innerHTML = 'star';
      div.appendChild(star[i]);
    }
    else {
      star[i] = document.createElement('div');
      star[i].className = "material-icons";
      star[i].innerHTML = 'star_border';
      div.appendChild(star[i]);
    }
  }
}

function findUser(id){
  return new Promise((resolve,reject) =>{
    xhr.open('POST', '/find_preference');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
      resolve(JSON.parse(xhr.response)[0]);
    }
    xhr.send(JSON.stringify({id: id}));
  })
}
