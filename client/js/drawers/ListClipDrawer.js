// var context = new BaseAudioContext();
var baseAudioContext = new AudioContext();



function openClips(){

    var content = document.createElement('div');

    var title = document.createElement('h2');
    title.innerHTML = "Clip Disponibili";
    content.appendChild(title);

    var yourVideo = [];
    listVideos().then(function(clips){
      console.log(clips);
      var list = new List("mdc-list--two-line")
      content.appendChild(list.root_);
      for(var i in clips){
        var li = document.createElement('li');
        li.className = "mdc-list-item";

        var checkbox = new Checkbox("check-"+i);
        // checkbox.checked = true;
        // checkbox.disabled = true;
        li.appendChild(checkbox.root_);

        var span = document.createElement('span');
        span.className = "mdc-list-item__text";
        li.appendChild(span);

        var primaryText = document.createElement('span');
        primaryText.className = "mdc-list-item__primary-text";
        primaryText.innerHTML = clips[i].snippet.title;
        span.appendChild(primaryText);

        var secondaryText = document.createElement('span')
        secondaryText.className = "mdc-list-item__secondary-text";
        secondaryText.innerHTML = clips[i].snippet.description;
        span.appendChild(secondaryText);

        // var vid = clips[i].id.vieoId;

        list.add(li);

        yourVideo.push(clips[i]);

      }

    var salva = new ActionButton('Salva Clip');
    content.appendChild(salva.root_);

    // salva.listen('click',async ()=>{
    //   var vidToUpload = [];
    //   var vidsId = [];
    //   var xhr;
    //   // console.log(yourVideo);
    //       for(var i in yourVideo){
    //         if(document.getElementById("check-"+i).checked){
    //         xhr = new XMLHttpRequest();
    //         xhr.open('POST', '/audio_from_yt',false);
    //         xhr.setRequestHeader('Content-Type', 'application/json');
    //         xhr.onload =  function(){
    //           console.log(decode64(this.responseText, "video/webm"));
    //           vidsId.push(yourVideo[i].id.videoId);
    //           // )
    //           //  vidsId.push(yourVideo[i].id.videoId);
    //            var base64 = this.responseText;
    //            var url = decode64(this.responseText, "video/webm");
    //           //  vidToUpload.push(url);
    //            var xhr1 = new XMLHttpRequest();
    //            xhr1.open('POST','/save_video_local');
    //            xhr1.setRequestHeader('Content-Type', 'application/json');
    //            xhr1.send(JSON.stringify({id:yourVideo[i].id.videoId , video:base64}))
    //           // audio.src = url;
    //           // audiodiv.style.display = "inline";
    //         }

    //         xhr.send(JSON.stringify({id: yourVideo[i].id.videoId}));
    //       }
    //     }
    //     // xhr.onreadystatechange = function() {
    //     //   if (xhr.readyState == XMLHttpRequest.DONE) {
    //     //      // console.log(vidToUpload);
    //     //       // insertClip('a','b','c',vidToUpload);
    //           console.log('wewew',vidsId)
    //           var xhr2 = new XMLHttpRequest();
    //           xhr2.open('POST','/concatenate_to_upload');
    //           xhr2.setRequestHeader('Content-Type', 'application/json');
    //           xhr2.onload = function(){
    //             console.log('response',decode64(this.responseText, "video/webm"));
    //           };
    //           xhr2.send(JSON.stringify({id:vidsId}))
    //     //   }
    //     // }
    //     });

    salva.listen('click',async ()=>{
      var vidToUpload = [];
      var vidsId = [];
      var xhr;
      // console.log(yourVideo);
          for(var i in yourVideo){
            if(document.getElementById("check-"+i).checked){
            xhr = new XMLHttpRequest();
            xhr.open('POST', '/audio_from_yt',false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload =  function(){
              console.log(decode64(this.responseText, "audio/webm"));
              vidsId.push(yourVideo[i].id.videoId);
              vidToUpload.push(this.responseText);
              //  var base64 = this.responseText;
              //  var url = decode64(this.responseText, "video/webm");
          }

            xhr.send(JSON.stringify({id: yourVideo[i].id.videoId}));
          }
        }
        // xhr.onreadystatechange = function() {
        //   if (xhr.readyState == XMLHttpRequest.DONE) {
        //      // console.log(vidToUpload);
        //       // insertClip('a','b','c',vidToUpload);
              console.log(vidToUpload)
              var blobs = [];

              for (var i in vidToUpload){
                var buffer = await readProva(vidToUpload[i]);
              //   var blob = decode64BLOB(await vidToUpload[i],"audio/webm");
              //   // var blob = await getimageBlob(url);
              //   var arrayBuffer;
              //   let fileReader = new FileReader();

              //   fileReader.onloadend = () => {
              //       arrayBuffer = fileReader.result;
              //   }

              // fileReader.readAsArrayBuffer(blob);
                // var data = await getDatafromBLOB(blob);
                // var binary = convertDataURIToBinary(blob);

                blobs.push(buffer);
              };
              // var blob = new Blob(blobs,{type:"audio/webm"});
              // var url = URL.createObjectURL(blob);
              // console.log(await encode64(blob));
              console.log(blobs);
              var con =  await appendBuffer(blobs[0],blobs[1]);
              var blob = new Blob([con.buffer], {type:"audio/webm"})
              console.log(await encode64(blob));
              console.log(URL.createObjectURL(blob))
              // var bufferF = con.buffer;

              // baseAudioContext.decodeAudioData(con.buffer, function(con) {
              //   var audioSource = baseAudioContext.createBufferSource();
              //   audioSource.connect(baseAudioContext.destination);

              //   // Concatenate the two buffers into one.
              //   audioSource.buffer = con ;
              //   // audioSource.playbackRate.value = 1;
              //   console.log(audioSource)
              //   audioSource.start();
              //   var blob = new Blob([con.buffer], {type:"audio/webm"})
              //   console.log(URL.createObjectURL(blob));
              // });
              // var final = new Blob([con],{type:'audio/webm'})
              // console.log()
              // var xhr2 = new XMLHttpRequest();
              // xhr2.open('POST','/concatenate_to_upload');
              // xhr2.setRequestHeader('Content-Type', 'application/json');
              // xhr2.onload = function(){
              //   console.log('response',decode64(this.responseText, "video/webm"));
              // };
              // xhr2.send(JSON.stringify({id:vidsId}))
        //   }
        // }
        });

    map.pageDrawer = new PageDrawer('Your Clips', content);
    map.pageDrawer.open = true;
});
}

function readProva(base64){
  return new Promise((resolve,reject)=>{
    console.log(base64)
    var blob = decode64BLOB(base64,"audio/webm");
    // var blob = await getimageBlob(url);
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
        resolve(fileReader.result);
    }

  fileReader.readAsArrayBuffer(blob);
  })
}

// function play(data) {
//   //decode the loaded data
//   context.decodeAudioData(data, function(buf) {
//     var audioSource = context.createBufferSource();
//     audioSource.connect(context.destination);

//     // Concatenate the two buffers into one.
//     audioSource.buffer = appendBuffer(buf, buf);
//     audioSource.noteOn(0);
//     audioSource.playbackRate.value = 1;
//   })};
