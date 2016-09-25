if (!htlivesight) var htlivesight = {};htlivesight.EventSystem = {		ev: {			GET_SERVER: 0,			MANAGER_COMPENDIUM: 1,			LOGIN: 2,			LOGIN2: 3,			MY_STADIUM: 4,			MY_STADIUM2: 5,			MY_TEAM: 6,			MY_TEAM2: 7,			MY_LEAGUE: 8,			MY_LEAGUE2: 9,			MY_TOURNAMENTS: 10,			MY_TOURNAMENTS2: 11,			MY_YOUTHTEAM: 12,			MY_YOUTHTEAM2: 13,			MY_YOUTHLEAGUE: 14,			MY_YOUTHLEAGUE2:15,			MY_LEAGUE_MATCHES: 16		},		Launch: function(f) {			setTimeout(function(){f;}, 10);		},		Declare: function(ev) {			switch (ev) {			case htlivesight.EventSystem.ev.GET_SERVER :				try{					htlivesight.EventSystem.Launch(htlivesight.Login());				}catch(e){alert("eventsystem"+e);}				break;			case htlivesight.EventSystem.ev.MANAGER_COMPENDIUM :				htlivesight.EventSystem.Launch(htlivesight.GetManagerCompendium());				break;							case htlivesight.EventSystem.ev.LOGIN :				htlivesight.EventSystem.Launch(htlivesight.GetMyData());				break;						case htlivesight.EventSystem.ev.LOGIN2 :				htlivesight.EventSystem.Launch(htlivesight.GetMyData2());				break;							case htlivesight.EventSystem.ev.MY_STADIUM :				htlivesight.EventSystem.Launch(htlivesight.GetMyArena());				break;						case htlivesight.EventSystem.ev.MY_STADIUM2 :				htlivesight.EventSystem.Launch(htlivesight.GetMyArena2());				break;			case htlivesight.EventSystem.ev.MY_TEAM :				htlivesight.EventSystem.Launch(htlivesight.GetLeague());				break;							case htlivesight.EventSystem.ev.MY_TEAM2 :				htlivesight.EventSystem.Launch(htlivesight.GetLeague2());				break;				case htlivesight.EventSystem.ev.MY_LEAGUE :				//console.log("into my_league");				htlivesight.EventSystem.Launch(htlivesight.GetLeagueMatches());				break;						case htlivesight.EventSystem.ev.MY_LEAGUE2 :				//console.log("into my_league2");				htlivesight.EventSystem.Launch(htlivesight.GetLeagueMatches2());				break;							case htlivesight.EventSystem.ev.MY_TOURNAMENTS :				//console.log("into tournaments");				htlivesight.EventSystem.Launch(htlivesight.GetTournaments());				break;								case htlivesight.EventSystem.ev.MY_TOURNAMENTS2 :				//console.log("into tournaments2");				htlivesight.EventSystem.Launch(htlivesight.GetTournaments2());				break;							case htlivesight.EventSystem.ev.MY_YOUTHTEAM :				//console.log("into MY_YOUTHTEAM");				htlivesight.EventSystem.Launch(htlivesight.GetYouthLeague());				break;							case htlivesight.EventSystem.ev.MY_YOUTHTEAM2 :				//console.log("into MY_YOUTHTEAM2");				htlivesight.EventSystem.Launch(htlivesight.GetYouthLeague2());				break;									case htlivesight.EventSystem.ev.MY_YOUTHLEAGUE :				//console.log("before my_YouthLeague_matches");				htlivesight.EventSystem.Launch(htlivesight.GetYouthLeagueMatches());				//console.log("after my_YouthLeague_matches");				break;						case htlivesight.EventSystem.ev.MY_YOUTHLEAGUE2 :				//console.log("before my_YouthLeague_matches2");				htlivesight.EventSystem.Launch(htlivesight.GetYouthLeagueMatches2());				//console.log("after my_YouthLeague_matches2");				break;			case htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES :				//console.log("into my_league_matches");				htlivesight.EventSystem.Launch(htlivesight.League.addLeagueMatches());				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.League.addLeagueMatches2());}, 100);				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.GetMyMatch());}, 200);				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.GetMyYouthMatch1());}, 300);				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.GetMyYouthMatch2());}, 400);				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.Friends.addLive());}, 500);				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.YouthLeague.addYouthLeagueMatches());}, 600);				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.YouthLeague.addYouthLeagueMatches2());}, 700);				/*if(htlivesight.ManagerCompendium.youthTeams[0] && htlivesight.ManagerCompendium.youthTeams[0].youthTeamId){					setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.Matches.HTTPGetByTeam(htlivesight.ManagerCompendium.youthTeams[0].youthTeamId, "true", true));}, 600);				}				if(htlivesight.ManagerCompendium.youthTeams[1] && htlivesight.ManagerCompendium.youthTeams[1].youthTeamId){					setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.Matches.HTTPGetByTeam(htlivesight.ManagerCompendium.youthTeams[1].youthTeamId, "true", true));}, 700);				}*/				setTimeout(function(){htlivesight.EventSystem.Launch(htlivesight.startView());}, 800);				break;			default: 				alert("htlivesight.EventSystem received an unknown event! "+ev);			break;			};		}};/** -------------------------------------------- * RequestManager * -------------------------------------------- */htlivesight.EventSystem.RequestManager =  {		open: true,		queue: new Array(),		RequestItem: function(r, d) {			this.func = r;			this.desc = d;		},		Add: function (request, description) {			reqItem = new htlivesight.EventSystem.RequestManager.RequestItem(request, description);			htlivesight.EventSystem.RequestManager.queue.push(reqItem);			htlivesight.EventSystem.Launch(htlivesight.EventSystem.RequestManager.Dispatch());		},		Dispatch: function () {			if (!htlivesight.EventSystem.RequestManager.open) return;			htlivesight.EventSystem.RequestManager.open=false;			try {				var request = htlivesight.EventSystem.RequestManager.queue.shift();				if (request) {					htlivesight.Log.Label(request.desc);					request.func.send(null);				} else {					htlivesight.EventSystem.RequestManager.open=true;				}			}catch(e){ alert("htlivesight.EventSystem.RequestManager.Dispatch(): " + e);}		},		toString: function () {			return ("[" + (htlivesight.EventSystem.RequestManager.open ? "open" : "close")+ "]" + this.queue);		}};/** -------------------------------------------- * XMLHTTPRequest * -------------------------------------------- */htlivesight.EventSystem.HTTPRequest = function(URL, responseParser, description) {	var request = new XMLHttpRequest();	request.open('GET', URL, true);	request.setRequestHeader("User-Agent", htlivesight.HTTP.userAgent);	request.overrideMimeType('text/xml');	request.onreadystatechange = function() {		htlivesight.EventSystem.HTTPRequestHandler(request, responseParser);	};	htlivesight.EventSystem.RequestManager.Add(request,htlivesight.Util.Parse(description,htlivesight.data[0]));};htlivesight.EventSystem.HTTPRequestHandler = function (request, responseParser) {	var status, responseText;	var state = 0;	try {		state = request.readyState;		htlivesight.Log.Meter(state*100/5);		if (state==4) {			status = request.status;			if (status == 200) {				responseText = request.responseText; 				responseXML = request.responseXML;				responseText = htlivesight.HTTP.Sanitize(responseText);				responseParser(responseText, request);				htlivesight.Log.Meter(100);			} else {				alert(htlivesight.Util.Parse("MessageHattrickError",htlivesight.data[0]));				htlivesight.Log.Meter(100);				document.getElementById("button_login").disabled=false;			}			htlivesight.EventSystem.RequestManager.open=true;			htlivesight.EventSystem.Launch(htlivesight.EventSystem.RequestManager.Dispatch());		} else {		}  	} catch(e) {		if (state==4) {			htlivesight.Log.Meter(100);		};		htlivesight.EventSystem.RequestManager.open=true;		htlivesight.EventSystem.Launch(htlivesight.EventSystem.RequestManager.Dispatch());	}};