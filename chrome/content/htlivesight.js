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
  
  dynresize: function() {
	var winW2 = 630, winH2 = 460;
if (document.body && document.body.offsetWidth) {
 winW2 = document.body.offsetWidth;
 winH2 = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW2 = document.documentElement.offsetWidth;
 winH2 = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW2 = window.innerWidth;
 winH2 = window.innerHeight;
}
document.getElementById("live_box").setAttribute("style", "width:" + (winW2-320) + "px" );
//document.getElementById("chronoheader").setAttribute("style", "width:" + (winW2-250-220) + "px" );
//document.getElementById("sidebar").setAttribute("style", "width:" + (winW2-94) );
},

  
  startup: function() {
//	  console.log("startup1");
    // modify added by bigpapy
  //  htlivesight.prefs = htlivesight.Preferences.get();
 //   if (htlivesight.prefs.personalization.oldIcons){ htlivesight.Image = htlivesight.ImageOld;
   // Events.type.SWAP= new Event.type(150, htlivesight.Image.event.swap);
   //   }
    // end modify by bigpapy
	
	var winW = 630, winH = 460;
if (document.body && document.body.offsetWidth) {
 winW = document.body.offsetWidth;
 winH = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW = document.documentElement.offsetWidth;
 winH = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW = window.innerWidth;
 winH = window.innerHeight;
}
console.info(winW);
console.info(winH);
document.getElementById("live_box").setAttribute("style", "width:" + (winW-320) + "px" );
//document.getElementById("chronoheader").setAttribute("style", "width:" + (winW-210-300-220) );
//document.getElementById("sidebar").setAttribute("style", "width:" + (winW-94) );
	
	
	
	  var winboxRegister = function(wbList) {
      var winbox;
      var i, len;
      var img;

      for(i=0, len=wbList.length; i<len; i++) {
        winbox=wbList[i];
 //       console.log("winboxregister 1");
        img = document.getElementById("imgwinboxshade_"+winbox);
//        console.log("winboxregister 1.1 = "+img);
        img.addEventListener('click',  htlivesight.Click.winboxShade, true);
 //       console.log("winboxregister 1.2");
        img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.shade")*/htlivesight.Util.Parse("TooltipWindowShade",htlivesight.data[0]));
 //       console.log("winboxregister 1.3");
        img.style.display="block";
 //       console.log("winboxregister 2");
        img = document.getElementById("imgwinboxopen_"+winbox);
        img.addEventListener('click',  htlivesight.Click.winboxOpen, true);
        img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.open")*/htlivesight.Util.Parse("TooltipWindowOpen",htlivesight.data[0]));
        img.style.display="none";
 //       console.log("winboxregister 3");
        document.getElementById("winboxcontent_"+winbox).hidden=false;
        htlivesight.winboxShadeByName("friends");
      }
//      console.log("startup2");
    };
    htlivesight.Log.start();
 //   netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
 //   strings = document.getElementById("strings");
//    console.log("starter1");
    document.getElementById("winbox_leaguematches").style.display="block";
 //   console.log("starter2");
//    winboxRegister(["leaguematches","leaguetable","matchlist","friends","addmatch"]);
 //   console.log("starter3");
    htlivesight.Click.AddButtonListeners();
//    console.log("starter4");
    htlivesight.prefs = htlivesight.Preferences.get();
//    console.log("starter5");
    if (htlivesight.prefs.personalization.oldIcons) htlivesight.Image = htlivesight.ImageOld;
 //   console.log("starter6");

    htlivesight.Friends.start();
//    console.log("starter7");
    htlivesight.Sound.start();
    //htlivesight.Test.start();
//    console.log("starter8");
    htlivesight.Log.debug("loading username and password");
//    console.log("starter9");
    htlivesight.Log.debug("teamId: " + htlivesight.prefs.general.teamId);
//    console.log("starter9.5");
    if (htlivesight.prefs.general.teamId != "") {
      document.getElementById("teamId").value=htlivesight.prefs.general.teamId;    
    //  document.getElementById("security_code").value=htlivesight.Preferences.password.get();
    }
//    console.log("starter10");
    document.getElementById("reLive").checked=htlivesight.prefs.other.reLive;
//    console.log("starter11");
    document.getElementById("reLiveSpeed").value=htlivesight.prefs.other.reLiveSpeed;
//    console.log("starter12");
    document.getElementById("reLiveByEvent").checked=htlivesight.prefs.other.reLiveByEvent;
 //   console.log("starter13");
    if(!document.getElementById("reLive").checked) {
    	document.getElementById("reLiveSpeed").disabled = true;
      	document.getElementById("reLiveByEvent").disabled = true;
      }
//    console.log("starter14");
  },
  getRecommendedServer: function() {
//	  console.log("startup: getRecommendedServer begin");
    htlivesight.HTTP.getRecommendedServer();
 //   console.log("startup: getRecommendedServer end");
  },
  Login: function(username, securitycode){// changed
//	  console.log("startup: Login: begin");
	 
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

 //    console.log("startup: Login: end");
  },
  Logout: function() {
//	  alert("startup: Logout begin");
    if (htlivesight.LogIn.login) {
      htlivesight.LogOut.HTTP();
    }
 //   alert("startup: Logout end");
  },
  Options: function() {
//	  console.log("startup:Options begin");
    var features = "chrome,titlebar,toolbar,centerscreen,modal,resizable";
    var url = htlivesightEnv.contentPath+"settings.html";
    window.openDialog(url, "Options", features);
    htlivesight.prefs = htlivesight.Preferences.get();
 //   console.log("startup:Options end");
  },
  About: function() {
//	  console.log("startup:About begin");
      var features = "chrome,titlebar,toolbar,centerscreen,modal,resizable";
      var url = htlivesightEnv.contentPath+"about.html";
      window.openDialog(url, "About", features);
 //     console.log("startup:About end");
  },
  Reconnect: function() {
//	console.log("startup:Reconnect begin");
    document.getElementById("login_box").hidden = false;
    document.getElementById("button_login").disabled=false;
//   console.log("startup:Reconnect end");
  },
  startView: function() { 
//	  console.log("startup:startview begin");
	  do{
		  console.log("htlivesight0");
		  htlivesight.Live.view();
		  console.log("htlivesight1");
		  setTimeout(function(){htlivesight.matchDetails.view();}, 500);
		  console.log("htlivesight2");
	  }while(htlivesight.errorLoadingXML);
//	  htlivesight.Live.view(); // added to avoid delay showing event list
//	  console.log("htlivesight1");
//	  htlivesight.matchDetails.view();
//	  console.log("htlivesight2");
	  htlivesight.Live.startView();
//   console.log("startup:startview end");
  },
  GetMyData: function() { 
//	  console.log("startup:GetMyData begin");
	  try{
	  htlivesight.Team.HTTPGetMyData();
	  }catch(e){alert(e);}
//	  console.log("startup:GetMyData end");
  },
  GetLeague: function() {
//	  console.log("startup:GetLeague begin");
    htlivesight.League.HTTPGet();
 //   console.log("startup:GetLeague end");
  },
  GetLeagueMatches: function() {
//	  console.log("startup:GetLeagueMatches begin");  
    htlivesight.League.HTTPFixtures();
 //   console.log("startup:GetLeagueMatches end");
  },
  GetMyMatch: function() { 
//	  console.log("startup:GetMyMatch begin: id "/*+ Teams.myTeam.id +" youth " + Teams.myTeam.youth*/ );
    htlivesight.Matches.HTTPGetByTeam(htlivesight.Teams.myTeam.id, htlivesight.Teams.myTeam.youth);
 //   console.log("startup:GetMyMatch end");
  },
  winboxOpenByName: function(name) {
//	  console.log("startup:winboxOpenByName begin");
    document.getElementById("winboxcontent_"+name).style.display="block";
    document.getElementById("imgwinboxopen_"+name).style.display="none";
    document.getElementById("imgwinboxshade_"+name).style.display="block";
 //   console.log("startup:winboxOpenByName end");
  },
  winboxShadeByName: function(name) {
//	  console.log("startup:winboxShadeByName begin");
    document.getElementById("winboxcontent_"+name).style.display="none";
    document.getElementById("imgwinboxopen_"+name).style.display="block";
    document.getElementById("imgwinboxshade_"+name).style.display="none";
 //   console.log("startup:winboxShadeByName end");
  },
  AddLiveMatch: function(matchId, sourceSystem) {
//	  console.log("AddLiveMatch: begin");
//	  alert("1");
    if (htlivesight.liveCount >= 20) {
  //  	alert("2");
       var message=/*document.getElementById("strings").getString("matches.maximum")*/htlivesight.Util.Parse("MatchesMaximum",data[0]);
  //     alert("3");
       alert(message);
 //      alert("4");
       htlivesight.warningShown = true;
 //      alert("5");
       return;
    }
 //   alert("6");
 /*   if (typeof(htlivesight.Match.List["_"+matchId+"_"+youth]) == 'undefined')
    {
      alert("7:  htlivesight.liveCount: "+ htlivesight.liveCount);
      htlivesight.liveCount++;
      alert("8");
      htlivesight.Live.HTTPAddMatch(matchId, youth);
      alert("9");
      htlivesight.GetMatchDetails(matchId, youth);
      alert("10");
    } else { */
  //  	alert("11");
 //     if (htlivesight.Match.List["_"+matchId+"_"+youth].live == false)
      htlivesight.liveCount++;
 //     alert("12: htlivesight.liveCount: "+ htlivesight.liveCount);
      htlivesight.Live.HTTPAddMatch(matchId, sourceSystem);
 //     alert("13");
      htlivesight.GetMatchDetails(matchId, sourceSystem);
  //    alert("14");
 //   }
 //     console.log("AddLiveMatch: end");
  },
  GetMatchDetails: function(matchId, sourceSystem) { 
//	  console.log("startup:GetMatchDetails begin");
 //   matchDetails.HTTPGet(matchId, youth);
 //   console.log("startup:GetMatchDetails end:");
  },
  close: function() {
    // do nothing. unload do the job
  },
  unload: function() {
//	  console.log("startup:unload: begin");
    htlivesight.Logout();
 //   console.log("startup:unload: end");
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
	  alert("startup:unload: begin");
	  console.log("begin");

		//prefs = htlivesight.Settings.preferences;
		htlivesight.prefs=htlivesight.Preferences.get();

		console.log("prefs.language.locale= "+ htlivesight.prefs.language.locale);
		htlivesight.url = htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
		console.log("url"+ htlivesight.url);
		htlivesight.languageXML = htlivesight.loadXml(htlivesight.url);

		htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
		
		
		
		alert("before if!");
		if (!htlivesightPrefs.getBool("HtlsFirstStart")){
			console.log("into if before opening optionspage");
			console.log("htlivesightEnv.contentPath="+ htlivesightEnv.contentPath)
			var optionsPage=window.open(htlivesightEnv.contentPath+"settings.html","_blank");
			alert("after opening optionspage");
		//	optionsPage.onfocus();
		
			
			htlivesightPrefs.setBool("HtlsFirstStart",true);


			

		//	alert("7");
		};
//		alert("end");

 //   alert("startup:unload: end");
  },  
  chatdelay: function() {
  document.getElementById("chat-dialog").innerHTML = '<iframe src="http://webchat.quakenet.org/?channels=htlivesight&uio=OT10cnVlJjExPTEyMwb9" width="647" height="400"></iframe>';
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