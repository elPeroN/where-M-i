// Youtube Data API
// https://developers.google.com/youtube/v3/docs

async function youtubeSearch(part, q, maxResults){
  var query = {};
  query.part = part;
  query.type = "video";
  query.q = q;
  if(maxResults) query.maxResults = maxResults;

  if(q == '8FPHF800+-'){
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open("GET", "js/youtube.json");
      request.onload = function(){
        resolve(JSON.parse(request.responseText).s);
      }
      request.send();
    });
  }else{
    return null;
  }

  // let request = await gapi.client.youtube.search.list(query);
  //
  // var items = request.result.items;
  // while(request.result.nextPageToken){
  //   query.pageToken = request.result.nextPageToken;
  //   request = await gapi.client.youtube.search.list(query);
  //   items = items.concat(request.result.items);
  // }

  // var hiddenElement = document.createElement('a');
  //
  // console.log(JSON.stringify(items));
  // hiddenElement.href = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(items));
  // hiddenElement.target = '_blank';
  // hiddenElement.download = q + '.json';
  // hiddenElement.click();
  return items;
}

async function listVideos(){
  let request = await gapi.client.youtube.search.list({
    part: "id",
    forMine: true,
    type: "video",
    maxResults: 50,
    q: "8FPHF800+-"
  });
  return request.result.items;
}

async function getChannel(channelId){
  var request = await gapi.client.youtube.channels.list({
    part: "id, snippet",
    id: channelId
  });

  return request.result.items[0];
}

async function getVideo(videoId){
  var request = await gapi.client.youtube.videos.list({
    part: "id, snippet, statistics, status",
    id: videoId
  });

  return request.result.items[0];
}

async function removeVideo(videoId){
  return gapi.client.youtube.videos.delete({
    "id": videoId
  }).then(()=>{
    console.log('Il tuo video è stato correttamente rimosso')
  });
}

async function getRating(videoId){
  var request = await gapi.client.youtube.videos.getRating({
    id: videoId
  });

  return request.result.items[0].rating;
}

async function rate(videoId, rating){
  gapi.client.youtube.videos.rate({
    id: videoId,
    rating: rating
  });
}

async function updateVideo(videoId){
  return gapi.client.youtube.videos.update({
         id: videoId,
         part: 'status',
         status: {
             privacyStatus: 'public'
           }
     }).then(()=>{
       console.log('Il tuo video è stato correttamente pubblicato')
     });
}

function createPlaylist(name){
  return gapi.client.youtube.playlists.insert({
      "part": "id,snippet,status",
      "resource": {
        "snippet": {
          "title": name
        },
        "status":{
          "privacyStatus":'public'
        }
      }
    });
}

function insertClipInPlaylist(playlistId,clipId){
  return gapi.client.youtube.playlistItems.insert({
     "part": "snippet",
     "resource": {
       "snippet": {
         "playlistId": playlistId,
         "position": 0,
         "resourceId": {
           "kind": "youtube#video",
           "videoId": clipId
         }
       }
     }
   }).then((response)=>{
     console.log(response)
   });
}

async function insertClip(title, description, privacyStatus, readStream){

  return new Promise((resolve,reject) => {
    var metadata = {
      kind: 'youtube#video',
      snippet: {
      title: title,
      description : description,
      },
      status: {
      privacyStatus: privacyStatus
      }
    }

    var meta = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    var form = new FormData();
    form.append('dati', meta)
    form.append('video',readStream);

    $.ajax({
      url: 'https://www.googleapis.com/upload/youtube/v3/videos?access_token=' + encodeURIComponent(auth) + '&part=snippet,status',
      data: form,
      cache: false,
      contentType: false,
      processData: false,
      metadata: metadata,
      method: 'POST',
      success: function(data) {
        var snackbar = new SnackBar('Video Added succesfully on youtube');
        snackbar.open();
        resolve(data);
      }
    });
  });
}
