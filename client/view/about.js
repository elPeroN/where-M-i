function openAbout() {

  document.getElementById('content_content').innerHTML = '';
  document.getElementById('content_title').innerHTML = 'About Us';

  var aboutBar = new TabBar(aboutTab.map(o => o['icon']), aboutTab.map(o => o['name']));
  var div = document.createElement('div');

  aboutBar.listen("MDCTabBar:activated", (event) => {

    div.innerHTML = '';

    switch (event.detail.index) {
      case 0:
        var team = [simone, carlos, stefano, vincenzo];
        for (var i in team){
          var actionsIcons = [];
          for(var j in team[i].contacts) actionsIcons.push(new FontAwesomeButton(team[i].contacts[j].url, team[i].contacts[j].icon));
          div.appendChild(new CardTemp(team[i].title, null, team[i].description, team[i].media, null, actionsIcons, 'about-card'));
        }
        break;
      case 1:
        for(var i in technologies){
          div.appendChild(new CardTemp(technologies[i].title, null, null, technologies[i].media, null, null, 'about-card'));
        }
        break;
    }
  });

  aboutBar.activateTab(0);

  document.getElementById('content_content').appendChild(aboutBar.root_);
  document.getElementById('content_content').appendChild(div);

  mainDrawer.open = false;
  pageDrawer.open = true;
}