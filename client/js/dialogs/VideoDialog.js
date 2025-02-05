function openVideoDialog(audiosrc){

  var content = document.createElement('div');

  var audio = document.createElement('audio');
  audio.src = audiosrc;
  audio.controls = 'controls';
  audio.type = 'audio/webm';
  content.appendChild(audio);

  var start = new TextField("Start");
  start.required = true;
  content.appendChild(start.root_);

  var end = new TextField("End");
  end.required = true;

  content.appendChild(end.root_);

  var volume = new Slider();
  volume.start = 0;
  volume.end = 50;
  volume.value = 10;
  content.appendChild(volume.root_);

  var buttonContainer = document.createElement('div');
  var save = new ActionButton('save');
  var del = new ActionButton('delete');

  buttonContainer.appendChild(save.root_);
  buttonContainer.appendChild(del.root_);
  content.appendChild(buttonContainer);

  var dialog = new Dialog(content, buttonContainer, "");

  document.getElementById('map').appendChild(dialog.root_);
  dialog.scrimClickAction = '';
  dialog.escapeKeyAction = '';
  dialog.open();

  del.listen('click',()=>{
    dialog.close();
  })

  dialog.listen('MDCDialog:opened', function() {
    volume.layout();
  });

  return new Promise((resolve, reject) => {
    save.listen('click', async () => {
      if((start.value) && (end.value) && volume.value){
        dialog.close();
        var blob = await getimageBlob(audio.src);
        var base64 = await convertBlobToBase64(blob);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/modify_video');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = async function(){
          var url = decode64(this.responseText, "video/webm");
          resolve(url);
        };
        xhr.send(JSON.stringify({chunks: base64,start: start.value,end:end.value,volume:volume.value}));
      }else{
        var snackbar = new SnackBar('Missing data');
        snackbar.open();
      }
    });
  });
}
