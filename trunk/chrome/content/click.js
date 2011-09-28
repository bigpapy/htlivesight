htlivesight.Click = {
  Test: function (event) {
    try {

      netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
      var url = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();
      url = url.QueryInterface(Components.interfaces.nsIURL);
      url.spec = "chrome://htlivesight/content/sound/wav.wav";
      var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
      sample = sample.QueryInterface(Components.interfaces.nsISound);
      sample.play(url);
      
      alert("Test!!");
    } catch(e) {
      htlivesight.Log.warn("Click.Test:" + e);
    }
  },
  AddMatch: function (event) {
    var matchId = parseInt(document.getElementById("boxaddmatch").value, 10);
    var youth = (document.getElementById("boxaddyouth").checked?"True":"False");
    if (matchId) {
      htlivesight.AddLiveMatch(matchId, youth);
    }
  },
  Login: function (event) {
    Login.teamId = document.getElementById("teamId").value;        if (Login.teamId == ""){
      return;
    };
    document.getElementById("button_login").disabled=true;       htlivesight.getRecommendedServer();
  },
  Logout: function (event) {
    htlivesight.Logout();
  },
  AddMatchByTeam: function (event) {
    var teamId = parseInt(document.getElementById("boxaddmatch").value, 10);
    var youth = (document.getElementById("boxaddyouth").checked?"True":"False");
    if(teamId) {
      Matches.HTTPGetByTeam(teamId, youth);
    }
  },
  ClearLog: function() {
    var logElement;
    logElement = document.getElementById("logbox");
    logElement.setAttribute("value", "");
  },
  window: function() {
    var id=this.getAttribute("id").split("_");
    htlivesight.DOM.window.set(id[1], id[2], htlivesight.DOM.mode[id[0]]);
  },
  moveDown: function() {
    var id=this.getAttribute("id").split("_");
    var window=document.getElementById("live_"+id[1]+"_"+id[2]);
    var next=window.nextSibling;
    if (next != null && next.hidden == false)
      next = next.nextSibling;
    window.parentNode.insertBefore(window, next);
    this.setAttribute("src", htlivesight.Image.window.down.off);
  },
  moveUp: function() {
    var id=this.getAttribute("id").split("_");
    var window=document.getElementById("live_"+id[1]+"_"+id[2]);
    var prev=window.previousSibling;
    window.parentNode.insertBefore(window, prev);
    this.setAttribute("src", htlivesight.Image.window.up.off);
  },
  over: function() {
    var id=this.getAttribute("id").split("_");
    var windowmode=Match.List["_"+id[1]+"_"+id[2]].window.mode;
    var mode = htlivesight.DOM.mode[id[0]];
    if (mode == windowmode) return;
    switch (mode) {
      case htlivesight.DOM.mode.close:
        this.setAttribute("src", htlivesight.Image.window.close.on);
        break;
      case htlivesight.DOM.mode.shade:
        this.setAttribute("src", htlivesight.Image.window.shade.on);
        break;
      case htlivesight.DOM.mode.minimize:
        this.setAttribute("src", htlivesight.Image.window.minimize.on);
        break;
      case htlivesight.DOM.mode.maximize:
        this.setAttribute("src", htlivesight.Image.window.maximize.on);
        break;
      case htlivesight.DOM.mode.moveup:
        this.setAttribute("src", htlivesight.Image.window.up.on);
        break;
      case htlivesight.DOM.mode.movedown:
        this.setAttribute("src", htlivesight.Image.window.down.on);
        break;
      case htlivesight.DOM.mode.link:          this.setAttribute("src", htlivesight.Image.window.link.on);          break;        }
  },
  out: function() {
    var id=this.getAttribute("id").split("_");
    var windowmode=Match.List["_"+id[1]+"_"+id[2]].window.mode;
    var mode = htlivesight.DOM.mode[id[0]];
    if (mode == windowmode) return;
    switch (mode) {
      case htlivesight.DOM.mode.close:
        this.setAttribute("src", htlivesight.Image.window.close.off);
        break;
      case htlivesight.DOM.mode.shade:
        this.setAttribute("src", htlivesight.Image.window.shade.off);
        break;
      case htlivesight.DOM.mode.minimize:
        this.setAttribute("src", htlivesight.Image.window.minimize.off);
        break;
      case htlivesight.DOM.mode.maximize:
        this.setAttribute("src", htlivesight.Image.window.maximize.off);
        break;
      case htlivesight.DOM.mode.moveup:
        this.setAttribute("src", htlivesight.Image.window.up.off);
        break;
      case htlivesight.DOM.mode.movedown:
        this.setAttribute("src", htlivesight.Image.window.down.off);
        break;      case htlivesight.DOM.mode.link:          this.setAttribute("src", htlivesight.Image.window.link.off);          break;        
    }
  },  tip: function() {
    var id=this.getAttribute("id").split("_");
    htlivesight.DOM.toggleTip(id[1], id[2]);
  },//added by bigpapy: action on clicking on icon
  link: function() {	    var id=this.getAttribute("id").split("_");	    htlivesight.DOM.toggleLink(id[1], id[2]); },	//added by bigpapy (end): action on clicking on icon   //added by bigpapy: action on clicking on icon sound sound: function() {	 	var id=this.getAttribute("id").split("_");	    htlivesight.DOM.toggleSound(id[1], id[2]);	  },  	//added by bigpapy (end): action on clicking on icon sound   ToggleMatch: function() {
    var id = this.getAttribute("id").split("_");
    htlivesight.DOM.toggleView(id[2], id[3]);
  },
  DeleteMatch: function() {
    var id = this.getAttribute("id").split("_");
    htlivesight.DOM.deleteView(id[2], id[3]);
  },
  addTeamToFriendsList: function(teamId, youth) {
    Friends.add(teamId, youth);
  },
  AddButtonListeners: function() {
    var elem;
    
    elem = document.getElementById("buttonAddTeam");
    elem.addEventListener('command', htlivesight.Click.AddMatchByTeam, true);
  
    elem = document.getElementById("buttonAddMatch");
    elem.addEventListener('command', htlivesight.Click.AddMatch, true);
  
    elem = document.getElementById("button_login");
    elem.addEventListener('command', htlivesight.Click.Login, true);
    
    elem = document.getElementById("close_login");
    elem.addEventListener('click',  htlivesight.Click.loginClose, true);
     
  },
  winboxOpen: function() {
    var name=this.id.split("_")[1];
    htlivesight.winboxOpenByName(name);
  },
  winboxShade: function() {
    var name=this.id.split("_")[1];
    htlivesight.winboxShadeByName(name);
  },
  loginClose: function() {
     document.getElementById('login_box').hidden = true;
     document.getElementById("button_login").disabled=true;
  },
  removeFriend: function() {
    Friends.remove();
  },
  addFriendMatch: function() {
    Friends.addMatch();
  },
  moveUpFriend: function() {
    Friends.moveUp();
  },
  moveDownFriend: function() {
    Friends.moveDown();
  }
};





