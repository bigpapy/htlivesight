htlivesight.Live = {		ADD: 1,		VIEW: 2,		started: false,		interval: null,		loopValue: 0,		startView: function() {			if (htlivesight.Live.started==false) {				var e = document.getElementById("clockBox");				e.style.width="32px";				e.style.height="32px";				htlivesight.Live.interval = setInterval(function() { htlivesight.Live.loop(); }, 1000);				htlivesight.Live.started = true; 			}		},		clockSeconds: 0,		addTime: 0,		updating: true,		lastShownIndexes: "",		safeLiveVersionEnabled: false,		nextEventTime:0,		removedLastRoundFromTable: false,		loop: function() {			htlivesight.Live.clockSeconds = ++htlivesight.Live.clockSeconds % 60;			var slice = Math.floor(htlivesight.Live.clockSeconds/10);			var sec = htlivesight.Live.clockSeconds%10;			var e = document.getElementById("clockBox");			e.style.backgroundImage = "url('img/clock"+slice+".png')";  			e.style.backgroundColor = "rgb(100%," +(50 + (10-sec)*5)+"%,"+ (10-sec)*10+"%)"; 			htlivesight.Log.Label(htlivesight.Util.Parse("ProgressUpdate",htlivesight.data[0])+(60-htlivesight.Live.clockSeconds)					+htlivesight.Util.Parse("ProgressSeconds",htlivesight.data[0]));			htlivesight.Log.Meter(0);			if (htlivesight.Live.clockSeconds==0) {				var now=new Date();// added to smart update				if(htlivesight.prefs.other.reLive && htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)htlivesight.Live.addTime+=1;				if ((htlivesight.Live.nextEventTime-(now-(-htlivesight.Time.hattrickDiffTime)))<0){					htlivesight.Live.updating=true;					now.setDate(now.getDate()+7);					htlivesight.Live.nextEventTime=now.getTime();					htlivesight.Live.view();					setTimeout(function(){htlivesight.matchDetails.view();}, 500);				}else{					htlivesight.Live.updating=false;					htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);					setTimeout(function(){htlivesight.matchDetails.view();}, 500);				}// added to smart update				htlivesight.warningShown = false;			}else if(htlivesight.prefs.other.reLive && 					(htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)) //added by bigpapy to show events during 60 seconds in relive			{				htlivesight.Live.updating=false;				htlivesight.Live.addTime+=1;				htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);			}		}};/* ============================================ */htlivesight.Live.view = function() {	try{		if (htlivesight.Live.lastShownIndexes !=""){			var parameters=[["file","live"],			                ["actionType","viewNew"],			                ["version","1.8"],			                ["lastShownIndexes",htlivesight.Live.lastShownIndexes], 			                ["includeStartingLineup",true],			                ];		} else { var parameters=[["file","live"],		                         ["actionType","viewAll"],		                         ["version","1.8"],		                         ["includeStartingLineup",true],		                         ];		};	}catch(e){		alert("errore"+ e);		var parameters=[["file","live"],		                ["actionType","viewAll"],		                ["version","1.5"]		];	}	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){		htlivesight.Live.ParseView(xml);	});};htlivesight.Live.ParseView = function (response) {	htlivesight.Live.ParseLive(response, htlivesight.Live.VIEW);};/* ============================================ */htlivesight.Live.Matches = function() {};htlivesight.Live.HTTPAddMatch = function (matchId, sourceSystem) {	var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];	if (match != null) {		match.live = true;		document.getElementById("short_" + matchId + "_" + sourceSystem).hidden = false;	} else {		sourceSystem=sourceSystem.toLowerCase();		var  parameters=[["file","live"],		                 ["actionType","addMatch"],		                 ["matchID",matchId],		                 ["sourceSystem",sourceSystem],		                 ["version","1.8"],		                 ["includeStartingLineup",true],		                 ];		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.Live.ParseAddMatch(xml);});		setTimeout(function(){htlivesight.matchDetails.view();}, 500);	}};htlivesight.Live.ParseAddMatch = function (response) {	htlivesight.Live.ParseLive(response, htlivesight.Live.ADD);	if (htlivesight.Live.addTime>0) htlivesight.liveXml=response;};htlivesight.Live.HTTPDeleteMatch = function (matchId, sourceSystem) {	var parameters=[["file","live"],	                ["actionType","deleteMatch"],	                ["matchID",matchId],	                ["sourceSystem",sourceSystem],	                ["version","1.8"]	];	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){		htlivesight.Live.ParseDeleteMatch(xml);	});	var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];	match.lastShownEventIndex[0]=-1;	htlivesight.Match.List["_"+matchId+"_"+sourceSystem] = match;};htlivesight.Live.ParseDeleteMatch = function (response) {};/* ---------------------------------------------------------------- * common Parse functions * ---------------------------------------------------------------- */htlivesight.Live.ParseLive = function (response, source) {	var match;	var newTime;	var newLastShownIndexes="";	try {		var elapsedTime=0; //added by bigpapy		var errorMsg = htlivesight.Live.ParseError(response);		if(typeof htlivesight.liveXml == 'undefined') htlivesight.liveXml= response; // added to fix error "response is undefined"		if(htlivesight.Live.updating)console.log("response at the beginning="+response.textContent);		if (errorMsg != null) {			var server = htlivesight.Live.ParseServer(response);			alert("Live.Parselive2 error" + response);			alert(htlivesight.Util.Parse("MessageErrorReading",htlivesight.data[0])+ " " + server + ": " + errorMsg);			htlivesight.Live.safeLiveVersionEnabled=true;		}		/**************************************************************************************		 * part added to remove flash and images event before update		 *************************************************************************************/		htlivesight.Notify.clearImages();		htlivesight.Notify.clearFlash();		/**************************************************************************************		 * part added to remove flash and images event before update		 *************************************************************************************/		try{newTime=htlivesight.Time.parseFetchDate(response);}catch(e){newTime=htlivesight.Time.hattrickTime;};		if (htlivesight.Live.updating){			if (htlivesight.Time.hattrickDiffTime==0)htlivesight.Time.start(newTime);			htlivesight.Time.hattrickTime=newTime;		}else {			var  now = new Date();			htlivesight.Time.hattrickTime= (now-(-htlivesight.Time.hattrickDiffTime));		};		if(htlivesight.prefs.other.reLive){			if(htlivesight.Time.reLiveStartTime == 0) {				htlivesight.Time.reLiveStartTime = htlivesight.Time.hattrickTime;			}			elapsedTime=htlivesight.Live.addTime;//added to have internal minutes.			if (elapsedTime) htlivesight.Time.reLiveMinute=elapsedTime;			if (elapsedTime>45 && elapsedTime<61) elapsedTime=45;			if (elapsedTime>60) elapsedTime-=15;		}		var count = 0;		var matchNodes = response.getElementsByTagName("Match");		for(var j = 0, len = matchNodes.length; j< len ;j++){			if (htlivesight.Live.updating) htlivesight.Log.Meter(((j+1)/matchNodes.length)*100);			var matchNode = matchNodes[j];			count++;			try			{				var substitutions = htlivesight.LineUp.ParseSubstitutions(matchNode.getElementsByTagName("Substitutions")[0]);			}catch(e){};			try{				var matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);				var  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);				var matchDate=htlivesight.Time.parseDate(htlivesight.Util.Parse("MatchDate", matchNode));				var  matchHome= new htlivesight.Match.side(						htlivesight.Live.ParseHomeTeam(matchNode),						htlivesight.Live.ParseHomeGoals(matchNode)				);				/*** start adding lineup home team ***/				try				{					//get the away team lineup string from "hometeam" xml block.					var homeLineUp = htlivesight.LineUp.ParseLineUpFromXml(matchNode.getElementsByTagName("HomeTeam")[0]);				}catch(e){}				var  matchAway= new htlivesight.Match.side(						htlivesight.Live.ParseAwayTeam(matchNode),						htlivesight.Live.ParseAwayGoals(matchNode)				);				try				{					//get the away team lineup string from "awayteam" xml block.					var awayLineUp = htlivesight.LineUp.ParseLineUpFromXml(matchNode.getElementsByTagName("AwayTeam")[0]);				}catch(e){}				matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);				matchHome.lineUp= homeLineUp;				matchAway.lineUp= awayLineUp;			}catch(e){				var  matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);				var  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);				var  matchDate=htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].date;				var  matchHome= new htlivesight.Match.side(						htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].home,						htlivesight.Live.ParseHomeGoals(matchNode));				var  matchAway= new htlivesight.Match.side(						htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].away,						htlivesight.Live.ParseAwayGoals(matchNode));			}			match = new htlivesight.Match(					matchId,					matchDate,					matchHome,					matchAway,					new htlivesight.Match.events(htlivesight.Events.ParseList(matchNode.getElementsByTagName("EventList")[0],elapsedTime)), // Re live added elapsedTime by bigpapy.					null,					matchSourceSystem,					substitutions			);			try{				var lastShownEventIndex = matchNode.getElementsByTagName("LastShownEventIndex")[0].textContent;				match.lastShownEventIndex[0]=match.lastShownEventIndex[1];				match.lastShownEventIndex[1]=lastShownEventIndex;			}catch(e){};			try{ 		  				var nextEventMinute = parseInt(matchNode.getElementsByTagName("NextEventMinute")[0].textContent);				if (nextEventMinute>45) nextEventMinute=15+nextEventMinute;				if (nextEventMinute!=0){					var nextUpdateDate=new Date(match.date);					nextUpdateDate.setMinutes(nextUpdateDate.getMinutes()+nextEventMinute);					match.nextEventTime= nextUpdateDate.getTime();				};			}catch(e){/*alert("error next event minute:"+e);*/};			if(htlivesight.Time.reLiveMinute==Number.MAX_VALUE)				match.reLiveByEventEnd=true;			if (match.id) {				var homeTeam= new htlivesight.Team(match.home.team.id, match.home.team.name, match.home.team.shortName, match.sourceSystem );				match.home.team = htlivesight.Teams.update(homeTeam);				var awayTeam= new htlivesight.Team(match.away.team.id, match.away.team.name, match.away.team.shortName, match.sourceSystem );				match.away.team = htlivesight.Teams.update(awayTeam);				match = htlivesight.Match.Update(match);			}			if((htlivesight.prefs.other.reLive) && (match.date <= htlivesight.Time.reLiveStartTime) && !(match.isFinish)){				if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)				{ 					match.home.reLiveGoals=0;					match.away.reLiveGoals=0;				};				for(var i=match.event.list.first; i<=match.event.list.last; i++){					var event=match.event.list["_"+i];					if (event.key.A==1 || (event.key.A==0 &&(event.key.BC==55 ||							event.key.BC==56 || event.key.BC==57))){						match.getSideById(event.subjectTeamId).reLiveGoals+=1;					 					};				};				// added by bigpapy in order to store actual score of matches for relive table				match.home.realGoals=match.home.goals;				match.away.realGoals=match.away.goals;				match.home.goals=match.home.reLiveGoals;				match.away.goals=match.away.reLiveGoals;				match.lastShownEventIndex[0]=match.lastShownEventIndex[1];				match.lastShownEventIndex[1]=match.event.list.last;			};			// bigpapy end adding reLive		}		for (matchIndex in htlivesight.Match.List) {			match = htlivesight.Match.List[matchIndex];			if (match.lastShownEventIndex[0]!=-1)				newLastShownIndexes+=" {\"matchId\":\""+match.id+"\", \"sourceSystem\":\""+match.sourceSystem+"\", \"index\":\""+match.lastShownEventIndex[0]+"\"}, ";			if(htlivesight.Live.updating==true)console.log("match.live="+match.live);			if (match.live) {				try{					if(match.nextEventTime!=0) 					{						if((match.nextEventTime<htlivesight.Live.nextEventTime)||(htlivesight.Live.nextEventTime==0))htlivesight.Live.nextEventTime = match.nextEventTime;					}				}catch(e){alert(e);};				match.updateTime();				if (source == htlivesight.Live.VIEW) {					var first = match.event.list.first;					var last = match.event.list.last;					/** Next line is used in relive mode: if there are event to process it means					 * that live.xml was loaded correctly by HTlivesight so it can be saved in a					 * variable to be used as a fake live.xml in the relive mode updating during					 * the minute.					 */					if(htlivesight.Live.updating==true)console.log("before choosing!");					if(htlivesight.prefs.other.reLive && first<=last){						htlivesight.liveXml=response;					}					if(!htlivesight.prefs.other.reLive){htlivesight.liveXml=response;}					for (var i=first; i<=last; i++) {						htlivesight.Notify.add(match.event.list["_"+i]);					}				}				htlivesight.DOM.UpdateLiveMatch(match);  			};		}		if (newLastShownIndexes!="")			htlivesight.Live.lastShownIndexes="{\n\"matches\": [ "+newLastShownIndexes+" ]\n }";		if (source == htlivesight.Live.VIEW) {			htlivesight.Notify.set();		}		htlivesight.errorLoadingXML=false;	} catch(e) {	//	alert("Live.ParseView : " + e);		htlivesight.errorLoadingXML=true;	};};htlivesight.Live.ParseHomeTeam = function (xml) {	return new htlivesight.Team(htlivesight.Live.ParseHomeTeamId(xml), htlivesight.Live.ParseHomeTeamName(xml), htlivesight.Live.ParseHomeTeamShortName(xml), ((htlivesight.Live.ParseSourceSystem(xml)=="youth")?"True":"False"));};htlivesight.Live.ParseAwayTeam = function (xml) {	return new htlivesight.Team(htlivesight.Live.ParseAwayTeamId(xml), htlivesight.Live.ParseAwayTeamName(xml), htlivesight.Live.ParseAwayTeamShortName(xml), ((htlivesight.Live.ParseSourceSystem(xml)=="youth")?"True":"False"));};htlivesight.Live.ParseHomeTeamId = function (xml) {	return parseInt(htlivesight.Util.Parse("HomeTeamID", xml),10);};htlivesight.Live.ParseHomeTeamName = function (xml) {	return htlivesight.Util.Parse("HomeTeamName", xml);};htlivesight.Live.ParseHomeTeamShortName = function (xml) {	return htlivesight.Util.Parse("HomeTeamShortName", xml);};htlivesight.Live.ParseAwayTeamId = function (xml) {	return parseInt(htlivesight.Util.Parse("AwayTeamID", xml),10);};htlivesight.Live.ParseAwayTeamName = function (xml) {	return htlivesight.Util.Parse("AwayTeamName", xml);};htlivesight.Live.ParseAwayTeamShortName = function (xml) {	return htlivesight.Util.Parse("AwayTeamShortName", xml);};htlivesight.Live.ParseHomeGoals = function (xml) {	return parseInt(htlivesight.Util.Parse("HomeGoals", xml),10);};htlivesight.Live.ParseAwayGoals = function (xml) {	return parseInt(htlivesight.Util.Parse("AwayGoals", xml),10);};htlivesight.Live.ParseSourceSystem = function (xml) {	var sourceSystem = htlivesight.Util.Parse("SourceSystem", xml)	if (sourceSystem == null){		var isYouth = htlivesight.Util.Parse("IsYouth", xml)		if (isYouth == "True" || isYouth == "true") sourceSystem = "Youth"			else sourceSystem="Hattrick";	}	return sourceSystem.toLowerCase();};htlivesight.Live.ParseError = function (xml) {	return htlivesight.Util.Parse("Error", xml);};htlivesight.Live.ParseServer = function (xml) {	return htlivesight.Util.Parse("Server", xml);};htlivesight.Live.ParseMatchId = function (xml) {	return htlivesight.League.ParseMatchId(xml);};