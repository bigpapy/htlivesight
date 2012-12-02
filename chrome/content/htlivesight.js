var htlivesight = {
		constants: function() {
		}, 
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
			document.getElementById("live_box").setAttribute("style", "width:" + (winW2-370) + "px" );
			document.getElementById("sidebar").setAttribute("style", "width:" + (320) + "px" );
		},

		startup: function() {
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
			var winboxRegister = function(wbList) {
				var winbox;
				var i, len;
				var img;
				for(i=0, len=wbList.length; i<len; i++) {
					winbox=wbList[i];
					img = document.getElementById("imgwinboxshade_"+winbox);
					img.addEventListener('click',  htlivesight.Click.winboxShade, true);
					img.setAttribute("tooltiptext",htlivesight.Util.Parse("TooltipWindowShade",htlivesight.data[0]));
					img.style.display="block";
					img = document.getElementById("imgwinboxopen_"+winbox);
					img.addEventListener('click',  htlivesight.Click.winboxOpen, true);
					img.setAttribute("tooltiptext",htlivesight.Util.Parse("TooltipWindowOpen",htlivesight.data[0]));
					img.style.display="none";
					document.getElementById("winboxcontent_"+winbox).hidden=false;
					htlivesight.winboxShadeByName("friends");
				}
			};
			htlivesight.Log.start();
			document.getElementById("winbox_leaguematches").style.display="block";
			htlivesight.Click.AddButtonListeners();
			htlivesight.prefs = htlivesight.Preferences.get();
			if (htlivesight.prefs.personalization.oldIcons) htlivesight.Image = htlivesight.ImageOld;
			htlivesight.Friends.start();
			htlivesight.Sound.start();
			htlivesight.Log.debug("loading username and password");
			htlivesight.Log.debug("teamId: " + htlivesight.prefs.general.teamId);
			if (htlivesight.prefs.general.teamId != "") {
				document.getElementById("teamId").value=htlivesight.prefs.general.teamId;    
			}
			document.getElementById("reLive").checked=htlivesight.prefs.other.reLive;
			document.getElementById("reLiveSpeed").value=htlivesight.prefs.other.reLiveSpeed;
			document.getElementById("reLiveByEvent").checked=htlivesight.prefs.other.reLiveByEvent;
			if(!document.getElementById("reLive").checked) {
				document.getElementById("reLiveSpeed").disabled = true;
				document.getElementById("reLiveByEvent").disabled = true;
			}
			if (htlivesight.prefs.general.hattrickServer=="") htlivesight.prefs.general.hattrickServer="www"; 
			var link=document.getElementById("HTLSThread").getAttribute("href");
			link="http://"+htlivesight.prefs.general.hattrickServer+link;
			document.getElementById("HTLSThread").setAttribute("href",link);
		},
		getRecommendedServer: function() {
			htlivesight.HTTP.getRecommendedServer();
		},
		Login: function(username, securitycode){// changed
			if(document.getElementById("save_teamId").checked) {
				htlivesight.Preferences.teamId.save(document.getElementById("teamId").value);
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
			htlivesight.LogIn.Fakesuccess();
		},
		Logout: function() {
			if (htlivesight.LogIn.login) {
				htlivesight.LogOut.HTTP();
			}
		},
		Options: function() {
			var features = "chrome,titlebar,toolbar,centerscreen,modal,resizable";
			var url = htlivesightEnv.contentPath+"settings.html";
			window.openDialog(url, "Options", features);
			htlivesight.prefs = htlivesight.Preferences.get();
		},
		About: function() {
			var features = "chrome,titlebar,toolbar,centerscreen,modal,resizable";
			var url = htlivesightEnv.contentPath+"about.html";
			window.openDialog(url, "About", features);
		},
		Reconnect: function() {
			document.getElementById("login_box").hidden = false;
			document.getElementById("button_login").disabled=false;
		},
		startView: function() { 
			do{
				htlivesight.Live.view();
				setTimeout(function(){htlivesight.matchDetails.view();}, 500);
			}while(htlivesight.errorLoadingXML);
			htlivesight.Live.startView();
		},
		GetMyData: function() { 
			try{
				htlivesight.Team.HTTPGetMyData();
			}catch(e){alert(e);}
		},
		GetLeague: function() {
			htlivesight.League.HTTPGet();
		},
		GetLeagueMatches: function() {
			htlivesight.League.HTTPFixtures();
		},
		GetMyMatch: function() { 
			htlivesight.Matches.HTTPGetByTeam(htlivesight.Teams.myTeam.id, htlivesight.Teams.myTeam.youth);
		},
		winboxOpenByName: function(name) {
			document.getElementById("winboxcontent_"+name).style.display="block";
			document.getElementById("imgwinboxopen_"+name).style.display="none";
			document.getElementById("imgwinboxshade_"+name).style.display="block";
		},
		winboxShadeByName: function(name) {
			document.getElementById("winboxcontent_"+name).style.display="none";
			document.getElementById("imgwinboxopen_"+name).style.display="block";
			document.getElementById("imgwinboxshade_"+name).style.display="none";
		},
		AddLiveMatch: function(matchId, sourceSystem) {
			if (htlivesight.liveCount >= 20) {
				var message=htlivesight.Util.Parse("MatchesMaximum",htlivesight.data[0]);
				alert(message);
				htlivesight.warningShown = true;
				return;
			}
			/*   if (typeof(htlivesight.Match.List["_"+matchId+"_"+youth]) == 'undefined')
    {
      htlivesight.liveCount++;
      htlivesight.Live.HTTPAddMatch(matchId, youth);
      htlivesight.GetMatchDetails(matchId, youth);
    } else { */
			//     if (htlivesight.Match.List["_"+matchId+"_"+youth].live == false)
			htlivesight.liveCount++;
			htlivesight.Live.HTTPAddMatch(matchId, sourceSystem);
			htlivesight.GetMatchDetails(matchId, sourceSystem);
			//   }
		},
		GetMatchDetails: function(matchId, sourceSystem) { 
			//   matchDetails.HTTPGet(matchId, youth);
		},
		close: function() {
			// do nothing. unload do the job
		},
		unload: function() {
			htlivesight.Logout();
		},
		reLive: function() {
			if(document.getElementById("reLive").checked) {
				document.getElementById("reLiveSpeed").disabled = false;
				document.getElementById("reLiveByEvent").disabled = false;
			} else {
				document.getElementById("reLiveSpeed").disabled = true;
				document.getElementById("reLiveByEvent").disabled = true;
			};
		},
		localization: function() {
			htlivesight.prefs=htlivesight.Preferences.get();
			htlivesight.url = htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
			htlivesight.languageXML = htlivesight.loadXml(htlivesight.url);
			htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
			if (!htlivesightPrefs.getBool("HtlsFirstStart")){
				var optionsPage=window.open(htlivesightEnv.contentPath+"settings.html","_blank");
				htlivesightPrefs.setBool("HtlsFirstStart",true);
			};
		},  
		chatdelay: function() {
			document.getElementById("chat-dialog").innerHTML = '<iframe src="http://webchat.quakenet.org/?channels=htlivesight&uio=OT10cnVlJjExPTEyMwb9" width="647" height="400"></iframe>';
		}, 
};