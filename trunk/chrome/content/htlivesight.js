var htlivesight = {
  constants: function() {
  }, /*
  prefs: {
    openInTab: true,
    getLeagueMatches: true,
    getLeagueWithin: false,
    getLeagueWithinHours: 48,
    username: "",
    friends: ""
  },*/
  showLeague: false,
  liveCount: 0,
  warningShown: false,
  strings: null,
  startup: function() {
    var winboxRegister = function(wbList) {
      var winbox;
      var i, len;
      var img;
      for(i=0, len=wbList.length; i<len; i++) {
        winbox=wbList[i];
        img = document.getElementById("imgwinboxshade_"+winbox);
        img.addEventListener('click',  htlivesight.Click.winboxShade, true);
        img.setAttribute("tooltiptext", strings.getString("tooltip.window.shade"));
        img.collapsed=false;

        img = document.getElementById("imgwinboxopen_"+winbox);
        img.addEventListener('click',  htlivesight.Click.winboxOpen, true);
        img.setAttribute("tooltiptext", strings.getString("tooltip.window.open"));
        img.collapsed=true;

        document.getElementById("winboxcontent_"+winbox).hidden=false;
        htlivesight.winboxShadeByName("friends");
      }
    };
    htlivesight.Log.start();
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    strings = document.getElementById("strings");
    document.getElementById("winbox_leaguematches").collapsed=true;
    winboxRegister(["leaguematches","leaguetable","matchlist","friends","addmatch"]);
    htlivesight.Click.AddButtonListeners();
    htlivesight.prefs = htlivesight.Preferences.get();
    Friends.start();
    htlivesight.Sound.start();
    
    //htlivesight.Test.start();

    htlivesight.Log.debug("loading username and password");
    htlivesight.Log.debug("teamId: " + htlivesight.prefs.general.teamId);
    if (htlivesight.prefs.general.teamId != "") {
      document.getElementById("teamId").value=htlivesight.prefs.general.teamId;    
    //  document.getElementById("security_code").value=htlivesight.Preferences.password.get();
    }
    document.getElementById("reLive").checked=htlivesight.prefs.other.reLive;
    
  },
  getRecommendedServer: function() {
//	  alert("startup: getRecommendedServer");
    HTTP.getRecommendedServer();
  },
  Login: function(username, securitycode){// changed
//	  alert("startup: Login: begin");
    if(document.getElementById("save_teamId").checked) {
      htlivesight.Preferences.teamId.save(document.getElementById("teamId").value);
    /*  htlivesight.Preferences.password.save(document.getElementById("username").value,
                                        document.getElementById("security_code").value);*/
      //var prefs = htlivesight.Settings.preferences;
    };
    if(document.getElementById("reLive").checked) {
    	htlivesight.prefs.other.reLive = true;
      } else {
    	htlivesight.prefs.other.reLive = false;
      };
      htlivesight.Preferences.ReLive.save(htlivesight.prefs.other.reLive);
 //   Login.HTTP();
    Login.Fakesuccess(); 
  //  alert("startup: Login: end");
  },
  Logout: function() {
//	  alert("startup: Logout begin");
    if (Login.login) {
      Logout.HTTP();
    }
 //   alert("startup: Logout end");
  },
  Options: function() {
//	  alert("startup:Options begin");
    var features = "chrome,titlebar,toolbar,centerscreen,modal,resizable";
    var url = "chrome://htlivesight/content/settings.xul";
    window.openDialog(url, "Options", features);
    htlivesight.prefs = htlivesight.Preferences.get();
//    alert("startup:Options end");
  },
  About: function() {
//	  alert("startup:About begin");
      var features = "chrome,titlebar,toolbar,centerscreen,modal,resizable";
      var url = "chrome://htlivesight/content/about.xul";
      window.openDialog(url, "About", features);
  //    alert("startup:About end");
  },
  Reconnect: function() {
//	alert("startup:Reconnect begin");
    document.getElementById("login_box").hidden = false;
    document.getElementById("button_login").disabled=false;
 //   alert("startup:Reconnect end");
  },
  startView: function() { 
//	  alert("startup:startview begin");
	  
	  Live.startView();
 //   alert("startup:startview end");
  },
  GetMyData: function() { 
//	  alert("startup:GetMyData begin");
	  Team.HTTPGetMyData();
//	  alert("startup:GetMyData end");
  },
  GetLeague: function() {
//	  alert("startup:GetLeague begin");
    League.HTTPGet();
 //   alert("startup:GetLeague end");
  },
  GetLeagueMatches: function() {
//	  alert("startup:GetLeagueMatches begin");  
    League.HTTPFixtures();
 //   alert("startup:GetLeagueMatches end");
  },
  GetMyMatch: function() { 
//	  alert("startup:GetMyMatch begin: id "/*+ Teams.myTeam.id +" youth " + Teams.myTeam.youth*/ );
    Matches.HTTPGetByTeam(Teams.myTeam.id, Teams.myTeam.youth);
 //   alert("startup:GetMyMatch end");
  },
  winboxOpenByName: function(name) {
//	  alert("startup:winboxOpenByName begin");
    document.getElementById("winboxcontent_"+name).collapsed = false;
    document.getElementById("imgwinboxopen_"+name).collapsed = true;
    document.getElementById("imgwinboxshade_"+name).collapsed = false;
 //   alert("startup:winboxOpenByName end");
  },
  winboxShadeByName: function(name) {
	//  alert("startup:winboxShadeByName begin");
    document.getElementById("winboxcontent_"+name).collapsed = true;
    document.getElementById("imgwinboxopen_"+name).collapsed = false;
    document.getElementById("imgwinboxshade_"+name).collapsed = true;
 //   alert("startup:winboxShadeByName end");
  },
  AddLiveMatch: function(matchId, youth) {
//	  alert("startup:winboxShadeByName begin");
    if (htlivesight.liveCount >= 20) {
       var message=document.getElementById("strings").getString("matches.maximum");
       alert(message);
       htlivesight.warningShown = true;
       return;
    }
    if (typeof(Match.List["_"+matchId+"_"+youth]) == 'undefined')
    {
      htlivesight.liveCount++;
      Live.HTTPAddMatch(matchId, youth);
      htlivesight.GetMatchDetails(matchId, youth);
    } else {
      if (Match.List["_"+matchId+"_"+youth].live == false)
        htlivesight.liveCount++;
      Live.HTTPAddMatch(matchId, youth);
      htlivesight.GetMatchDetails(matchId, youth);
    }
 //   alert("startup:winboxShadeByName end");
  },
  GetMatchDetails: function(matchId, youth) { 
//	  alert("startup:GetMatchDetails begin");
 //   matchDetails.HTTPGet(matchId, youth);
  //  alert("startup:GetMatchDetails end:");
  },
  close: function() {
    // do nothing. unload do the job
  },
  unload: function() {
//	  alert("startup:unload: begin");
    htlivesight.Logout();
 //   alert("startup:unload: end");
  } 
};







