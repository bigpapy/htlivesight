var htlivesight = {
		constants: function() {
		},
		addedMatchList: {}, // list of match added by HTLS (used to fix CHPP cache when all match are cleaned up but persist in live.xml
		Settings: null,
		showLeague: false,
		liveCount: 0,
		warningShown: false,
		strings: null,
		playingtts: false,
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
			//console.info(winW2);
			//console.info(winH2);
			if(htlivesight.platform == 'Android'){
				document.getElementById("live_box").setAttribute("style", "width:" + (winW-288) + "px; margin-left:2px");
				document.getElementById("sidebar").setAttribute("style", "width:" + (250) + "px; margin-right:2px");
			}else{
				document.getElementById("live_box").setAttribute("style", "width:" + (winW2-317) + "px" );
				document.getElementById("sidebar").setAttribute("style", "width:" + (290) + "px" );
			}


		},

		startup: function() {

			// initialize soundmanager2 (for TextToSpeech)
			/*soundManager.setup({
			  // where to find flash audio SWFs, as needed
			  url: htlivesightEnv.contentPath+'/lib',
			  onready: function() {
			    // SM2 is ready to play audio!
			  }
			});*/

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
			//console.info(winW);
			//console.info(winH);
			//document.getElementById("live_box").setAttribute("style", "width:" + (winW-3/17) + "px" );
			//document.getElementById("sidebar").setAttribute("style", "width:" + (290) + "px" );

			if(htlivesight.platform == 'Android'){
				document.getElementById("live_box").setAttribute("style", "width:" + (winW-288) + "px; margin-left:2px");
				document.getElementById("sidebar").setAttribute("style", "width:" + (250) + "px; margin-right:2px");

				document.getElementById("contentbody_leaguematches").setAttribute("style", "margin-left: -13px");
				document.getElementById("contentbody_leaguetable").setAttribute("style", "margin-left: -10px; width: 222px;");

				document.getElementById("contentbody_leaguematchesBis").setAttribute("style", "margin-left: -13px");
				document.getElementById("contentbody_leaguetableBis").setAttribute("style", "margin-left: -10px; width: 222px;");


				document.getElementById("contentbody_matchlist").setAttribute("style", "margin-left: -13px");
				document.getElementById("ServerStatus").setAttribute("style", "margin-left: -13px");
				document.getElementById("progresslabel").setAttribute("style", "margin-right: -13px");
				document.getElementById("topbar").setAttribute("style", "z-index: -1; position: absolute; top: 0;");

			}else{
				document.getElementById("live_box").setAttribute("style", "width:" + (winW-317) + "px");
				document.getElementById("sidebar").setAttribute("style", "width:" + (290) + "px");
			}
			// coloring header
			/*document.getElementById("MatchesList").style.backgroundColor="#654321";
		  	document.getElementById("FriendsTitle").style.backgroundColor="#654321";
		  	document.getElementById("MatchesAdd").style.backgroundColor="#654321";
		  	document.getElementById("MenuServer").style.backgroundColor="#654321";*/
			//$(".ui-accordion-header").css("background-color","yellow");

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
			htlivesight.generateFromSeed();
			document.getElementById("winbox_leaguematches").style.display="block";
			htlivesight.Click.AddButtonListeners();
			htlivesight.prefs = htlivesight.Preferences.get();
			if (htlivesight.prefs.personalization.oldIcons) htlivesight.Image = htlivesight.ImageOld;
			htlivesight.Friends.start();
			htlivesight.Sound.start();
			htlivesight.Log.debug("loading username and password");
			htlivesight.Log.debug("teamId: " + htlivesight.prefs.general.teamId);
			document.body.style.backgroundImage="url('"+htlivesight.prefs.general.customBackgroundPath + "')";

			if(htlivesight.prefs.general.extendBackground){
				//alert("extend!");
				document.body.style.backgroundSize="cover";
				//		document.body.style.backgroundImage="url('"+htlivesight.prefs.general.customBackgroundPath + "')";
			}

			if(htlivesight.prefs.general.repeatBackground){
				//alert("repeat!");
				document.body.style.backgroundRepeat="repeat";
				//		document.body.style.backgroundImage="url('"+htlivesight.prefs.general.customBackgroundPath + "')";
			}
			htlivesight.setvolume(htlivesight.prefs.general.volume);
			//if(htlivesight.prefs.general.volume==0)	$("#muteAllImg").attr('src', "./img/sound_off.gif");
			//if(htlivesight.prefs.general.volume!=0 && htlivesight.prefs.general.volume<=33)	$("#muteAllImg").attr('src', "./img/sound_on.gif");
			//if(htlivesight.prefs.general.volume>33 && htlivesight.prefs.general.volume<=66)	$("#muteAllImg").attr('src', "./img/sound_on_1.gif");
			//if(htlivesight.prefs.general.volume>66)	$("#muteAllImg").attr('src', "./img/sound_on_2.gif");

			if(!htlivesight.prefs.notification.sound){
				document.getElementById("muteAllImg").src="./img/sound_off.gif";}

			if (htlivesight.prefs.general.teamId) {
				document.getElementById("teamId").value=htlivesight.prefs.general.teamId;    
			}
			if (htlivesight.prefs.general.secondTeamId && htlivesight.prefs.general.secondTeamId != 'undefined') {
				document.getElementById("secondTeamId").value=htlivesight.prefs.general.secondTeamId;    
			}
			document.getElementById("reLive").checked=htlivesight.prefs.other.reLive;
			document.getElementById("reLiveSpeed").value=htlivesight.prefs.other.reLiveSpeed;
			document.getElementById("reLiveByEvent").checked=htlivesight.prefs.other.reLiveByEvent;
			if(!document.getElementById("reLive").checked) {
				document.getElementById("reLiveSpeed").disabled = true;
				document.getElementById("reLiveByEvent").disabled = true;
			}
			document.getElementById("clearAllMatches").checked = htlivesight.prefs.other.clearAllMatches;
			if (htlivesight.prefs.general.hattrickServer==="") htlivesight.prefs.general.hattrickServer="www"; 
			//var link=document.getElementById("HTLSThread").getAttribute("href");
			//link="http://"+htlivesight.prefs.general.hattrickServer+link;
			//document.getElementById("HTLSThread").setAttribute("href",link);
			if(htlivesight.platform == "Safari"){
				$('#safari-warning').show();
			}
			if(htlivesight.platform == "Android"){
				$('#android-warning').show();
			}
			var volume_tooltip = $('.volume_tooltip');
			volume_tooltip.hide();
			$( "#volume_slider" ).slider({
				orientation: "horizontal",
				range: "min",
				min: 0,
				max: 100,
				value: isNaN(parseInt(htlivesight.prefs.general.volume))?"100":htlivesight.prefs.general.volume,
						slide: function(event, ui){
							htlivesight.setvolume(ui.value);
//							var value = slider.slider('value');  
							volume_tooltip.css('left', ui.value).text(ui.value);  
//							if(ui.value==0)	$("#muteAllImg").attr('src', "./img/sound_off.gif");
//							if(ui.value!=0 && ui.value<=33)	$("#muteAllImg").attr('src', "./img/sound_on.gif");
//							if(ui.value>33 && ui.value<=66)	$("#muteAllImg").attr('src', "./img/sound_on_1.gif");
//							if(ui.value>66)	$("#muteAllImg").attr('src', "./img/sound_on_2.gif");
						},
						start: function(event, ui){
							volume_tooltip.fadeIn('fast');
						},
						stop: function( event, ui ) {
							volume_tooltip.fadeOut('fast'); 
							htlivesightPrefs.setInt("general.volume", ui.value);
							//if(ui.value==0)	$("#muteAllImg").attr('src', "./img/sound_off.gif");
							//if(ui.value!=0 && ui.value<=33)	$("#muteAllImg").attr('src', "./img/sound_on.gif");
							//if(ui.value>33 && ui.value<=66)	$("#muteAllImg").attr('src', "./img/sound_on_1.gif");
							//if(ui.value>66)	$("#muteAllImg").attr('src', "./img/sound_on_2.gif");
							//if((!document.getElementById("chkSound").checked && ui.value!=0)||(document.getElementById("chkSound").checked && ui.value==0)){
							//	htlivesight.Click.MuteAll();
							//}
							//htlivesight.Settings.click.soundPlay(htlivesight.Sound.samplePath+'whistle.ogg');
							if(htlivesightPrefs.getBool("personalization.settingVolumeSound")){
								if(htlivesight.platform == "Safari"){
									htlivesight.Sound.play("http://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/whistle.mp3", document);
								}else{
									htlivesight.Sound.play(htlivesight.Sound.samplePath+'whistle.ogg', document);
								}
							}

						}
			});

		},
		getRecommendedServer: function() {
			htlivesight.HTTP.getRecommendedServer();
		},
		Login: function(username, securitycode){// changed
			if(document.getElementById("save_teamId").checked) {
				htlivesight.Preferences.teamId.save(document.getElementById("teamId").value);
				htlivesight.Preferences.secondTeamId.save(document.getElementById("secondTeamId").value);
			};
			if(document.getElementById("reLive").checked) {
				document.getElementById("ReLiveControls").style.display="inline-block";
				document.getElementById("playPauseButton").style.display="inline-block";
				document.getElementById("goToEnd").style.display="inline-block";
				document.getElementById("reLiveSpeedForm").style.display="inline-block";
				document.getElementById("reLiveSpeedPanel").style.display="inline-block";
				document.getElementById("reLiveSpeedPanel").value=document.getElementById("reLiveSpeed").value;
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
			if(document.getElementById("clearAllMatches").checked){

			}
			if(document.getElementById("save_teamId").checked){
				htlivesight.Preferences.ReLive.save(htlivesight.prefs.other.reLive,htlivesight.prefs.other.reLiveSpeed, htlivesight.prefs.other.reLiveByEvent);
				htlivesight.Preferences.clearAllMatches.save(document.getElementById("clearAllMatches").checked);
			}
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
		
		GetManagerCompendium: function() { 
			try{
				htlivesight.ManagerCompendium.HTTPGetMyData();
			}catch(e){alert(e);}
		},
		
		GetMyData: function() { 
			try{
				htlivesight.Team.HTTPGetMyData(document.getElementById("teamId").value,"myFirstTeam");
			}catch(e){alert(e);}
		},
		GetMyData2: function() { 
			try{
				if(parseInt(document.getElementById("secondTeamId").value)){
					htlivesight.Team.HTTPGetMyData(document.getElementById("secondTeamId").value,"mySecondTeam");
				}else{
					htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_STADIUM);
				}
			}catch(e){alert(e);}
		},
		GetMyArena: function(){
			//	console.log("loading first team arena details");
			htlivesight.matchDetails.HTTPGetArena(htlivesight.Teams.myTeam.arenaID,htlivesight.Teams.myTeam.id);
			//	console.log("loaded first team arena details");
		},
		GetMyArena2: function(){
			try{
				if(parseInt(document.getElementById("secondTeamId").value)){
					//	console.log("loading second team arena details with teamId = "+htlivesight.Teams.mySecondTeam.id);
					htlivesight.matchDetails.HTTPGetArena(htlivesight.Teams.mySecondTeam.arenaID, htlivesight.Teams.mySecondTeam.id);
					//	console.log("loaded second team arena details with teamId = "+htlivesight.Teams.mySecondTeam.id);
				}else{
					htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);
				}
			}catch(e){alert(e);}
		},
		GetLeague: function() {
			htlivesight.League.HTTPGet(htlivesight.Teams.myTeam.league.id,"myFirstTeam");
		},
		GetLeague2: function() {
			if(parseInt(document.getElementById("secondTeamId").value)){
				htlivesight.League.HTTPGet(htlivesight.Teams.mySecondTeam.league.id,"mySecondTeam");
			}else{
				htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE);
			}
		},
		GetLeagueMatches: function() {
			htlivesight.League.HTTPFixtures(htlivesight.Teams.myTeam.league.id,"myFirstTeam");
		},
		GetLeagueMatches2: function() {
			if(parseInt(document.getElementById("secondTeamId").value)){
				htlivesight.League.HTTPFixtures(htlivesight.Teams.mySecondTeam.league.id,"mySecondTeam");
			}else{
				htlivesight.EventSystem.Declare(/*htlivesight.EventSystem.ev.MY_TOURNAMENTS*/htlivesight.EventSystem.ev.MY_YOUTHLEAGUE);//disabled tournaments
			}
		},
		GetTournaments: function() {
			//FUNCTION HERE TO ADD MATCHES OF FIRST TEAM TOURNAMENTS
			htlivesight.Tournaments.HTTPTournamentsList(htlivesight.Teams.myTeam.id, "myFirstTeam");
			// if(parseInt(document.getElementById("secondTeamId").value)){
			//htlivesight.League.HTTPFixtures(htlivesight.Teams.mySecondTeam.league.id,"mySecondTeam");
			// }else{
			//htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TOURNAMENT2);
			//}
		},
		GetTournaments2: function() {
			if(parseInt(document.getElementById("secondTeamId").value)){
				//htlivesight.League.HTTPFixtures(htlivesight.Teams.mySecondTeam.league.id,"mySecondTeam");
				//FUNCTION HERE TO ADD MATCHES OF SECOND TEAM TOURNAMENTS
				htlivesight.Tournaments.HTTPTournamentsList(htlivesight.Teams.mySecondTeam.id, "mySecondTeam");
			}else{
				htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE);
			}
		},
		
		GetYouthLeagueMatches: function() {
			//console.log("LeagueId = "+htlivesight.ManagerCompendium.data.youthTeams[0].youthLegueId);
			if(htlivesight.ManagerCompendium.data.youthTeams[0]){
				htlivesight.YouthLeague.HTTPFixtures(htlivesight.ManagerCompendium.data.youthTeams[0].youthLegueId,"myFirstYouthTeam");
			}else{
				htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE2);
			}
			//console.log("b");
		},
		GetYouthLeagueMatches2: function() {
			if(htlivesight.ManagerCompendium.data.youthTeams[1]){
				htlivesight.YouthLeague.HTTPFixtures(htlivesight.ManagerCompendium.data.youthTeams[1].youthLegueId,"mySecondYouthTeam");
			}else{
				htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES);
			}
		},
		
		addLeagueMatches: function(){
			htlivesight.League.addLeagueMatches();
		},
		GetMyMatch: function() { 
			htlivesight.Matches.HTTPGetByTeam(htlivesight.Teams.myTeam.id, htlivesight.Teams.myTeam.youth, false);
			if(parseInt(document.getElementById("secondTeamId").value)){
				htlivesight.Matches.HTTPGetByTeam(htlivesight.Teams.mySecondTeam.id, htlivesight.Teams.mySecondTeam.youth, false);
			}
		},
		GetMyYouthMatch1: function() {
			//console.log(htlivesight.Settings.preferences);
			//console.log("htlivesight.Prefs.Matches.myYouthMarch"+htlivesight.Prefs.Matches.myYouthMarch);
			var prefs = htlivesight.Settings.preferences;
			//console.log("CARICARE MATCH GIOVANILI?");
			//console.log(prefs.matches.myYouthMatch)
			console.log("checking for prefs to get youth team nearest match");
			if(!prefs.matches.myYouthMatch) return;
			console.log("Prefs was set to get first youth team nearest match. Checking if team id is present to do a request for 1st youth team...");
			console.log("htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId = "+ htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId);
			if(htlivesight.ManagerCompendium.data.youthTeams[0] && parseInt(htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId)){
				try{
					console.log("getting 1st youth team match...");
					htlivesight.Matches.HTTPGetByTeam(htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId, "youth", true);
					console.log("after getting 1st youth team match");
				}catch(e){console.log("Error getting first youth team nearest match: "+e);}
			}
			
		},
		GetMyYouthMatch2: function() {
			//console.log(htlivesight.Settings.preferences);
			//console.log("htlivesight.Prefs.Matches.myYouthMarch"+htlivesight.Prefs.Matches.myYouthMarch);

			var prefs = htlivesight.Settings.preferences;
			console.log("checking for prefs to get youth team nearest match");
			//console.log("CARICARE MATCH GIOVANILI?");

			//console.log(prefs.matches.myYouthMatch)
			if(!prefs.matches.myYouthMatch) return;
			console.log("Prefs was set to get second youth team nearest match. Checking if team id is present to do a request for 2nd youth team...");
			console.log("htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId = "+ htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId);
			if(htlivesight.ManagerCompendium.data.youthTeams[1] && parseInt(htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId)){
				try{
					console.log("getting 2nd youth team match...");
					htlivesight.Matches.HTTPGetByTeam(htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId, "youth", true);
					console.log("after getting 2nd youth team match");
				}catch(e){console.log("Error getting second youth team nearest match: "+e);}
			}
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
			/*			console.log("add match: id: "+matchId+" system: "+sourceSystem);
			if (htlivesight.liveCount >= 20) {
				console.log("over matches limit. n ="+htlivesight.liveCount);
				var message=htlivesight.Util.Parse("MatchesMaximum",htlivesight.data[0]);
				alert(message);
				htlivesight.warningShown = true;
				return;
			}*/
			/*   if (typeof(htlivesight.Match.List["_"+matchId+"_"+youth]) == 'undefined')
    {
      htlivesight.liveCount++;
      htlivesight.Live.HTTPAddMatch(matchId, youth);
      htlivesight.GetMatchDetails(matchId, youth);
    } else { */
			//     if (htlivesight.Match.List["_"+matchId+"_"+youth].live == false)
			//htlivesight.liveCount++;
			htlivesight.Live.HTTPAddMatch(matchId, sourceSystem, false);
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
			//htlivesight.languageXML = htlivesight.loadXml(htlivesight.url);
			htlivesight.loadXml(htlivesight.url, function(xml, status){
				if(status != 200){return}
				htlivesight.data = xml.getElementsByTagName("Htlivesight");
				if (!htlivesightPrefs.getBool("HtlsFirstStart")){
					var optionsPage=window.open(htlivesightEnv.contentPath+"settings.html","_blank");
					htlivesightPrefs.setBool("HtlsFirstStart",true);
				};	
			});
			
		},  
		chatdelay: function() {
			document.getElementById("chat-dialog").innerHTML = '<iframe type="content" src="http://webchat.quakenet.org/?channels=htlivesight&uio=OT10cnVlJjExPTEyMwb9" width="647" height="400"></iframe>';
		},
		setvolume: function(volume){
			if(volume == 0){
				$("#muteAllImg").attr('src', "./img/sound_off.gif");
			}else if(volume > 0 && volume <= 33){
				$("#muteAllImg").attr('src', "./img/sound_on_1.gif");
			}else if(volume > 33 && volume <= 66){
				$("#muteAllImg").attr('src', "./img/sound_on_2.gif");
			}else /*if(volume>66 || volume === undefined)*/{
				$("#muteAllImg").attr('src', "./img/sound_on_3.gif");
			}
		},

};
