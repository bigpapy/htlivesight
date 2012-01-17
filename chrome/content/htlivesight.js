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
  Settings: null,
  showLeague: false,
  liveCount: 0,
  warningShown: false,
  strings: null,
  startup: function() {
    // modify added by bigpapy
  //  htlivesight.prefs = htlivesight.Preferences.get();
 //   if (htlivesight.prefs.personalization.oldIcons){ htlivesight.Image = htlivesight.ImageOld;
   // Events.type.SWAP= new Event.type(150, htlivesight.Image.event.swap);
   //   }
    // end modify by bigpapy
    var winboxRegister = function(wbList) {
      var winbox;
      var i, len;
      var img;

      for(i=0, len=wbList.length; i<len; i++) {
        winbox=wbList[i];
        img = document.getElementById("imgwinboxshade_"+winbox);
        img.addEventListener('click',  htlivesight.Click.winboxShade, true);
        img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.shade")*/htlivesight.Util.Parse("TooltipWindowShade",htlivesight.data[0]));
        img.collapsed=false;

        img = document.getElementById("imgwinboxopen_"+winbox);
        img.addEventListener('click',  htlivesight.Click.winboxOpen, true);
        img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.open")*/htlivesight.Util.Parse("TooltipWindowOpen",htlivesight.data[0]));
        img.collapsed=true;

        document.getElementById("winboxcontent_"+winbox).hidden=false;
        htlivesight.winboxShadeByName("friends");
      }
    };
    htlivesight.Log.start();
 //   netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
 //   strings = document.getElementById("strings");
 //   alert("1");
    document.getElementById("winbox_leaguematches").collapsed=true;
 //   alert("2");
    winboxRegister(["leaguematches","leaguetable","matchlist","friends","addmatch"]);
 //   alert("3");
    htlivesight.Click.AddButtonListeners();
 //   alert("4");
    htlivesight.prefs = htlivesight.Preferences.get();
//    alert("5");
    if (htlivesight.prefs.personalization.oldIcons) htlivesight.Image = htlivesight.ImageOld;
 //   alert("6");

    htlivesight.Friends.start();
 //   alert("7");
    htlivesight.Sound.start();
    //htlivesight.Test.start();
 //   alert("8");
    htlivesight.Log.debug("loading username and password");
 //   alert("9");
    htlivesight.Log.debug("teamId: " + htlivesight.prefs.general.teamId);
 //   alert("9.5");
    if (htlivesight.prefs.general.teamId != "") {
      document.getElementById("teamId").value=htlivesight.prefs.general.teamId;    
    //  document.getElementById("security_code").value=htlivesight.Preferences.password.get();
    }
 //   alert("10");
    document.getElementById("reLive").checked=htlivesight.prefs.other.reLive;
 //   alert("11");
    document.getElementById("reLiveSpeed").value=htlivesight.prefs.other.reLiveSpeed;
 //   alert("12");
    document.getElementById("reLiveByEvent").checked=htlivesight.prefs.other.reLiveByEvent;
 //   alert("13");
    if(!document.getElementById("reLive").checked) {
    	document.getElementById("reLiveSpeed").disabled = true;
      	document.getElementById("reLiveByEvent").disabled = true;
      }
 //   alert("14");
  },
  getRecommendedServer: function() {
//	  alert("startup: getRecommendedServer");
    htlivesight.HTTP.getRecommendedServer();
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
    if(document.getElementById("reLiveSpeed").value!="")
    	htlivesight.prefs.other.reLiveSpeed=document.getElementById("reLiveSpeed").value;
    if(document.getElementById("reLiveByEvent").checked) {
    	htlivesight.prefs.other.reLiveByEvent = true;
    } else {
    	htlivesight.prefs.other.reLiveByEvent = false;
    };
    htlivesight.Preferences.ReLive.save(htlivesight.prefs.other.reLive,htlivesight.prefs.other.reLiveSpeed, htlivesight.prefs.other.reLiveByEvent);
 //   htlivesight.Preferences.ReLiveSpeed.save(htlivesight.prefs.other.reLiveSpeed);
 //   htlivesight.Preferences.ReLiveByEvent.save(htlivesight.prefs.other.reLiveByEvent);
 //   Login.HTTP();
     htlivesight.LogIn.Fakesuccess();

  //  alert("startup: Login: end");
  },
  Logout: function() {
//	  alert("startup: Logout begin");
    if (htlivesight.LogIn.login) {
      htlivesight.LogOut.HTTP();
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
	  do{
		  htlivesight.Live.view();
	  }while(htlivesight.errorLoadingXML);
//	  htlivesight.Live.view(); // added to avoid delay showing event list
	  htlivesight.Live.startView();
 //   alert("startup:startview end");
  },
  GetMyData: function() { 
//	  alert("startup:GetMyData begin");
	  htlivesight.Team.HTTPGetMyData();
//	  alert("startup:GetMyData end");
  },
  GetLeague: function() {
//	  alert("startup:GetLeague begin");
    htlivesight.League.HTTPGet();
 //   alert("startup:GetLeague end");
  },
  GetLeagueMatches: function() {
//	  alert("startup:GetLeagueMatches begin");  
    htlivesight.League.HTTPFixtures();
 //   alert("startup:GetLeagueMatches end");
  },
  GetMyMatch: function() { 
//	  alert("startup:GetMyMatch begin: id "/*+ Teams.myTeam.id +" youth " + Teams.myTeam.youth*/ );
    htlivesight.Matches.HTTPGetByTeam(htlivesight.Teams.myTeam.id, htlivesight.Teams.myTeam.youth);
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
       var message=/*document.getElementById("strings").getString("matches.maximum")*/htlivesight.Util.Parse("MatchesMaximum",data[0]);
       alert(message);
       htlivesight.warningShown = true;
       return;
    }
    if (typeof(htlivesight.Match.List["_"+matchId+"_"+youth]) == 'undefined')
    {
      htlivesight.liveCount++;
      htlivesight.Live.HTTPAddMatch(matchId, youth);
      htlivesight.GetMatchDetails(matchId, youth);
    } else {
      if (htlivesight.Match.List["_"+matchId+"_"+youth].live == false)
        htlivesight.liveCount++;
      htlivesight.Live.HTTPAddMatch(matchId, youth);
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
  },
  reLive: function() {
  //	var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("reLive").checked) {
    	document.getElementById("reLiveSpeed").disabled = false;
      	document.getElementById("reLiveByEvent").disabled = false;
      } else {
        document.getElementById("reLiveSpeed").disabled = true;
    	document.getElementById("reLiveByEvent").disabled = true;
      };
  },

  localization: function() {
//	  alert("startup:unload: begin");
	//  alert("begin");

		//prefs = htlivesight.Settings.preferences;
		htlivesight.prefs=htlivesight.Preferences.get();

//		alert("prefs.language.locale= "+ htlivesight.prefs.language.locale);
		htlivesight.url = "chrome://htlivesight/content/locale/"+ htlivesight.prefs.language.locale +".xml";
//		alert("url"+ htlivesight.url);
		htlivesight.languageXML = htlivesight.loadXml(htlivesight.url);

		htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");

		
//		alert("1");
		document.getElementById("htlivesight-window").attributes.getNamedItem("title").value=htlivesight.Util.Parse("WindowMainTitle",htlivesight.data[0]);
	//	alert("2");
		document.getElementById("server").attributes.getNamedItem("label").value=htlivesight.Util.Parse("MenuServer",htlivesight.data[0]);
//		alert("2.1");
		document.getElementById("server").attributes.getNamedItem("label").value+=htlivesight.Util.Parse("MenuDisconnected",htlivesight.data[0]);
		document.getElementById("menuOptions").attributes.getNamedItem("label").value=htlivesight.Util.Parse("MenuOptions",htlivesight.data[0]);
		document.getElementById("menuAbout").attributes.getNamedItem("label").value=htlivesight.Util.Parse("MenuAbout",htlivesight.data[0]);
//		alert("3");
		document.getElementById("LoginLabel").value=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);
		document.getElementById("LoginLabel2").attributes.getNamedItem("label").value=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);
		document.getElementById("LoginTeamId").value=htlivesight.Util.Parse("LoginTeamId",htlivesight.data[0]);
		document.getElementById("save_teamId").attributes.getNamedItem("label").value=htlivesight.Util.Parse("LoginRememberMe",htlivesight.data[0]);
		document.getElementById("button_login").attributes.getNamedItem("label").value=htlivesight.Util.Parse("LoginButton",htlivesight.data[0]);
		document.getElementById("LoginReLive").attributes.getNamedItem("label").value=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
		document.getElementById("reLive").attributes.getNamedItem("label").value=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
		document.getElementById("LoginSpeed").value=htlivesight.Util.Parse("LoginSpeed",htlivesight.data[0]);
		document.getElementById("reLiveByEvent").attributes.getNamedItem("label").value=htlivesight.Util.Parse("LoginByEvent",htlivesight.data[0]);
//		alert("4");
		document.getElementById("LeagueMatches").value=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);

		document.getElementById("leaguetable_name").value=htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0]);

		document.getElementById("LeaguePosition").value=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);

		document.getElementById("LeagueTeam").value=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);

		document.getElementById("LeaguePlayed").value=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
//		alert("5");
		document.getElementById("LeagueGoals").value=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);

		document.getElementById("LeagueGoalDiff").value=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);

		document.getElementById("LeaguePoints").value=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);

		document.getElementById("MatchesList").value=htlivesight.Util.Parse("MatchesList",htlivesight.data[0]);

		document.getElementById("MatchesList").value=htlivesight.Util.Parse("MatchesList",htlivesight.data[0]);
//		alert("6");
		document.getElementById("FriendsTitle").value=htlivesight.Util.Parse("FriendsTitle",htlivesight.data[0]);

		document.getElementById("btnfriend_remove").attributes.getNamedItem("label").value=htlivesight.Util.Parse("FriendsRemove",htlivesight.data[0]);

		document.getElementById("btnfriend_addmatch").attributes.getNamedItem("label").value=htlivesight.Util.Parse("FriendsOpen",htlivesight.data[0]);

		document.getElementById("MatchesAdd").value=htlivesight.Util.Parse("MatchesAdd",htlivesight.data[0]);

		document.getElementById("MatchesAdd").value=htlivesight.Util.Parse("MatchesAdd",htlivesight.data[0]);
//		alert("7");
		document.getElementById("boxaddyouth").attributes.getNamedItem("label").value=htlivesight.Util.Parse("MatchesYouth",htlivesight.data[0]);

		document.getElementById("buttonAddMatch").attributes.getNamedItem("label").value=htlivesight.Util.Parse("MatchesByMatch",htlivesight.data[0]);

		document.getElementById("buttonAddTeam").attributes.getNamedItem("label").value=htlivesight.Util.Parse("MatchesByTeam",htlivesight.data[0]);
//		alert("8");
		if (!htlivesightPrefs.getBool("HtlsFirstStart")){
		//	alert("1");
			var optionsPage=window.open("chrome://htlivesight/content/settings.xul","_blank");
		//	alert("2");
		//	optionsPage.onfocus();
		
			
			htlivesightPrefs.setBool("HtlsFirstStart",true);


			//	htlivesight.Settings.save();
			//	alert("5");
				
			//	alert("5.5");
			//	document.location.assign("chrome://htlivesight/content/htlivesight.xul");//reload HTLS
			//	alert("6");

		//	alert("7");
		};
//		alert("end");

 //   alert("startup:unload: end");
  },  
/*  temachange: function() {
//	  alert("startup:unload: begin");
//	  document.getElementById(tabID).setAttribute("class", "livefox.css");
	  document.styleSheets[0].disabled = true;
	  document.styleSheets[1].disabled = false;
	  document.styleSheets[2].disabled = true;
 //   alert("startup:unload: end");
  },*/
};







