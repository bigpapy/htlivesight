htlivesight.Live = {
		ADD: 1,
		VIEW: 2,
		started: false,
		interval: null,
		loopValue: 0,
		startView: function() {
			if (htlivesight.Live.started==false) {
				var e = document.getElementById("clockBox");
				e.style.width="32px";
				e.style.height="32px";
				htlivesight.Live.interval = setInterval(function() { htlivesight.Live.loop(); }, 1000);
				htlivesight.Live.started = true; 
			}
		},
		clockSeconds: 0,
		counterPlayers: 0,
		addTime: 0,
		updating: true,
		lastShownIndexes: "",
		relivePlay: false,
		whistleBeginFirstHalfPlayed: false,
		safeLiveVersionEnabled: false,
		nextEventTime:0,
		removedLastRoundFromTable: false,
		loop: function() {
			htlivesight.Live.clockSeconds = ++htlivesight.Live.clockSeconds % 60;
			var slice = Math.floor(htlivesight.Live.clockSeconds/10);
			var sec = htlivesight.Live.clockSeconds%10;
			//	var e = document.getElementById("clockBox");
			//	e.style.backgroundImage = "url('img/clock"+slice+".png')";  
			//	e.style.backgroundColor = "rgb(100%," +(50 + (10-sec)*5)+"%,"+ (10-sec)*10+"%)"; 
			htlivesight.Log.Label(htlivesight.Util.Parse("ProgressUpdate",htlivesight.data[0])+(60-htlivesight.Live.clockSeconds)+' ' +
					htlivesight.Util.Parse("ProgressSeconds",htlivesight.data[0]));
			htlivesight.Log.Meter(0);
			if ((htlivesight.Live.clockSeconds==0)||(htlivesight.prefs.other.reLive&&(htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0) && htlivesight.Live.addTime == 0)) {
				//console.log("should be >0: "+ (htlivesight.Live.nextEventTime-(now-(-htlivesight.Time.hattrickDiffTime))));
				var now=new Date();// added to smart update
				if((htlivesight.prefs.other.reLive && htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)&& htlivesight.Live.relivePlay)htlivesight.Live.addTime+=1;
				if (((htlivesight.Live.nextEventTime-(now-(-htlivesight.Time.hattrickDiffTime)))<0)|| htlivesight.Live.addTime == 1 ){
					htlivesight.Live.updating=true;
					now.setDate(now.getDate()+7);
					htlivesight.Live.nextEventTime=now.getTime();
					//	console.log("download true!");
					if(htlivesight.Live.addTime == 1){htlivesight.Live.lastShownIndexes=null;}
					htlivesight.Live.view();
					//	setTimeout(function(){htlivesight.matchDetails.view();}, 500);
				}else{
					htlivesight.Live.updating=false;
					htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);
					//	setTimeout(function(){htlivesight.matchDetails.view();}, 500);
				}// added to smart update
				htlivesight.warningShown = false;
			}else if(htlivesight.prefs.other.reLive && 
					(htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)) //added by bigpapy to show events during 60 seconds in relive
			{
				//	console.log("addtime= "+htlivesight.Live.addTime);
				htlivesight.Live.updating=false;
				if(htlivesight.Live.relivePlay) htlivesight.Live.addTime+=1;
				if(htlivesight.Live.relivePlay) htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);
			}
		}
};
/* ============================================ */
htlivesight.Live.view = function() {
	try{
		if (htlivesight.Live.lastShownIndexes && !htlivesight.Live.safeLiveVersionEnabled/*!="" && !htlivesight.prefs.other.reLive*/){
			var parameters=[["file","live"],
			                ["actionType","viewNew"],
			                ["version","2.3"],
			                ["lastShownIndexes",htlivesight.Live.lastShownIndexes], 
			                ["includeStartingLineup",true],
							["useLiveEventsAndTexts",htlivesight.prefs.other.useLiveEventsAndTexts]
			                ];
			//console.log("LastShownEventIndex= " + htlivesight.Live.lastShownIndexes);
			//console.log("request parameters :"+  parameters);
			//console.log(parameters);
			//alert(parameters);
			htlivesight.Live.parameters = parameters;
		} else { var parameters=[["file","live"],
		                         ["actionType","viewAll"],
		                         ["version","2.3"],
		                         ["includeStartingLineup",true],
								 ["useLiveEventsAndTexts",htlivesight.prefs.other.useLiveEventsAndTexts]
		                         ];
		//console.log("request parameters :"+  parameters);
		//console.log(parameters);
		//alert(parameters);
		htlivesight.Live.parameters = parameters;
		};
	}catch(e){
		alert("error: "+ e);
		var parameters=[["file","live"],
		                ["actionType","viewAll"],
		                ["version","1.5"],
		                ];
	}
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){
		//console.log(xml);
		htlivesight.Live.ParseView(xml);
	});
};
htlivesight.Live.ParseView = function (response) {
	htlivesight.Live.ParseLive(response, htlivesight.Live.VIEW);
};
/* ============================================ */
htlivesight.Live.Matches = function() {
};
htlivesight.Live.HTTPAddMatch = function (matchId, sourceSystem) {
	var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];
	htlivesight.addedMatchList["_"+matchId+"_"+sourceSystem]={}; // add the match to the list to be shown (clear all CHPP issue)
	if (match != null) {
		match.live = true;
		document.getElementById("short_" + matchId + "_" + sourceSystem).hidden = false;
	} else {
		htlivesight.liveCount++;
		if(Object.keys(htlivesight.Match.List).length === 20){
			new Noty({type: 'warning', maxVisible: 1, text: "You exceded the limit of 20 matches, check your options for get matches and/or clear your HT-Live before launch HTLiveSight"}).show();
		}
		//if(!htlivesight.addedMatchList){htlivesight.addedMatchList={};}
		sourceSystem=sourceSystem.toLowerCase();
		var  parameters=[["file","live"],
		                 ["actionType","addMatch"],
		                 ["matchID",matchId],
		                 ["sourceSystem",sourceSystem],
		                 ["version","2.3"],
		                 ["includeStartingLineup",true],
						 ["useLiveEventsAndTexts",htlivesight.prefs.other.useLiveEventsAndTexts]
		                 ];
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.Live.ParseAddMatch(xml);});
		setTimeout(function(){htlivesight.matchDetails.view();}, 500);
		setTimeout(function(){htlivesight.DOM.addTeamLogo();}, 500);
		
	}
};
htlivesight.Live.ParseAddMatch = function (response) {
	htlivesight.Live.ParseLive(response, htlivesight.Live.ADD);
	if (htlivesight.Live.addTime>0) htlivesight.liveXml=response;
	htlivesight.DOM.addTeamLogo();
};
htlivesight.Live.HTTPDeleteMatch = function (matchId, sourceSystem) {
	var parameters=[["file","live"],
	                ["actionType","deleteMatch"],
	                ["matchID",matchId],
	                ["sourceSystem",sourceSystem],
	                ["version","2.3"],
	                ];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){
		htlivesight.Live.ParseDeleteMatch(xml);
	});
	var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];
	match.lastShownEventIndex[0]=-1;
	htlivesight.Match.List["_"+matchId+"_"+sourceSystem] = match;
};
htlivesight.Live.ParseDeleteMatch = function (response) {
};
/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */
htlivesight.Live.ParseLive = function (response, source) {
	var match;
	var newTime;
	var newLastShownIndexes="";
	try {

		var elapsedTime = 0; //added by bigpapy
		var matchPart = 1;
		var errorMsg = htlivesight.Live.ParseError(response);
		try{
			if(response.getElementsByTagName("Match").length>0){
				htlivesight.liveXml= response;
				console.log(response.getElementsByTagName("Match"));
				//	console.log("into event.length>0 response is: "+response);
			}else{return;};
		}catch(e){return;};
		if(htlivesight.prefs.other.reLive){clearInterval(htlivesight.Live.interval);};

		if (errorMsg != null) {
			var server = htlivesight.Live.ParseServer(response);
			alert("Live.Parselive2 error" + response);
			alert(htlivesight.Util.Parse("MessageErrorReading",htlivesight.data[0])+ " " + server + ": " + errorMsg);
			htlivesight.Live.safeLiveVersionEnabled=true;
		}
		/**************************************************************************************
		 * part added to remove flash and images event before update
		 *************************************************************************************/
		htlivesight.Notify.clearImages();
		htlivesight.Notify.clearFlash();
		/**************************************************************************************
		 * part added to remove flash and images event before update
		 *************************************************************************************/
		try{newTime=htlivesight.Time.parseFetchDate(response);}catch(e){newTime=htlivesight.Time.hattrickTime;};
		if (htlivesight.Live.updating){
			if (htlivesight.Time.hattrickDiffTime==0)htlivesight.Time.start(newTime);
			htlivesight.Time.hattrickTime=newTime;
		}else {
			var  now = new Date();
			htlivesight.Time.hattrickTime= (now-(-htlivesight.Time.hattrickDiffTime));
		};
		if(htlivesight.prefs.other.reLive){
			if(htlivesight.Time.reLiveStartTime == 0) {
				htlivesight.Time.reLiveStartTime = htlivesight.Time.hattrickTime;
			}
			elapsedTime=htlivesight.Live.addTime;//added to have internal minutes.
			if (elapsedTime) htlivesight.Time.reLiveMinute=elapsedTime;
			if (elapsedTime>45 && elapsedTime<61) elapsedTime=45;
			if (elapsedTime>60){ elapsedTime-=15; matchPart = 2;};
			if (elapsedTime>=95){ elapsedTime-=5; matchPart = 3;};
			if (elapsedTime>=120){ matchPart = 4;};
		}

		var count = 0;
		var matchNodes = response.getElementsByTagName("Match");
		if(!htlivesight.Live.lastShownIndexes){htlivesight.liveCount=matchNodes.length;/*console.log("get matches n ="+htlivesight.liveCount);*/}
		for(var j = 0, len = matchNodes.length; j< len ;j++){
			if (htlivesight.Live.updating) htlivesight.Log.Meter(((j+1)/matchNodes.length)*100);
			var matchNode = matchNodes[j];
			count++;
			try
			{
				var matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);
				var substitutions = htlivesight.LineUp.ParseSubstitutions(matchNode.getElementsByTagName("Substitutions")[0],(matchSourceSystem.toLowerCase()=="youth")?true:false);
				var now = new Date();
				var matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);

			}catch(e){};
			try{
				var matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);
				var  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);
				var matchDate=htlivesight.Time.parseDate(htlivesight.Util.Parse("MatchDate", matchNode));
				var  matchHome= new htlivesight.Match.side(
						htlivesight.Live.ParseHomeTeam(matchNode),
						htlivesight.Live.ParseHomeGoals(matchNode)
				);
				/*** start adding lineup home team ***/
				try
				{
					//get the away team lineup string from "hometeam" xml block.
					var matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);
					var homeTeamId = htlivesight.Live.ParseHomeTeamId(matchNode);
					var homeLineUp = htlivesight.LineUp.ParseLineUpFromXml(matchNode.getElementsByTagName("HomeTeam")[0], homeTeamId, (matchSourceSystem.toLowerCase()=="youth")?true:false);
				}catch(e){}
				var  matchAway= new htlivesight.Match.side(
						htlivesight.Live.ParseAwayTeam(matchNode),
						htlivesight.Live.ParseAwayGoals(matchNode)
				);
				try
				{
					//get the away team lineup string from "awayteam" xml block.
					var matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);
					var awayTeamId = htlivesight.Live.ParseHomeTeamId(matchNode);
					var awayLineUp = htlivesight.LineUp.ParseLineUpFromXml(matchNode.getElementsByTagName("AwayTeam")[0], awayTeamId, (matchSourceSystem.toLowerCase()=="youth")?true:false);

				}catch(e){}
				matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);
				matchHome.lineUp= homeLineUp;
				matchAway.lineUp= awayLineUp;
			}catch(e){
				var  matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);
				var  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);
				var  matchDate=htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].date;
				var  matchHome= new htlivesight.Match.side(
						htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].home,
						htlivesight.Live.ParseHomeGoals(matchNode));
				var  matchAway= new htlivesight.Match.side(
						htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].away,
						htlivesight.Live.ParseAwayGoals(matchNode));
			}
			// if the match is present in the list of match added go on (clear all CHPP cache issue)
			if(!htlivesight.addedMatchList["_"+matchId+"_"+matchSourceSystem] && document.getElementById("clearAllMatches").checked){continue;} 
			match = new htlivesight.Match(
					matchId,
					matchDate,
					matchHome,
					matchAway,
					new htlivesight.Match.events(htlivesight.Events.ParseList(matchNode.getElementsByTagName("EventList")[0],elapsedTime, matchPart)), // Re live added elapsedTime by bigpapy.
					null,
					matchSourceSystem,
					substitutions
			);
			try{
				if(htlivesight.prefs.other.reLive){
					var lastShownEventIndex = match.event.list.last;
				}else{ 
					var lastShownEventIndex = matchNode.getElementsByTagName("LastShownEventIndex")[0].textContent;
				}
				if(lastShownEventIndex > match.lastShownEventIndex[1]){
					match.lastShownEventIndex[0]=match.lastShownEventIndex[1];
					match.lastShownEventIndex[1]=lastShownEventIndex;
				}

			}catch(e){/*console.log(e)*/};
			//		var nextEventMinute = 1;
			try{
				var	nextEventMinute = parseInt(matchNode.getElementsByTagName("NextEventMinute")[0].textContent);
				if (isNaN(nextEventMinute) && matchNode.getElementsByTagName("NextEventMinute").length>0) nextEventMinute = 1; 
				//		}catch(e){/*nextEventMinute=1;/*alert("error next event minute:"+e);*/}
				//		if (isNaN(nextEventMinute)) nextEventMinute = 1;
				if (nextEventMinute>45) nextEventMinute=15+nextEventMinute;
				if (nextEventMinute!=0){
					var nextUpdateDate=new Date(match.date);
					nextUpdateDate.setMinutes(nextUpdateDate.getMinutes()+nextEventMinute);
					match.nextEventTime= nextUpdateDate.getTime();
				};
			}catch(e){/*console.log(e)*/}
			if(htlivesight.Time.reLiveMinute==Number.MAX_VALUE)
				match.reLiveByEventEnd=true;
			if (match.id) {
				var homeTeam= new htlivesight.Team(match.home.team.id, match.home.team.name, match.home.team.shortName, match.sourceSystem );
				match.home.team = htlivesight.Teams.update(homeTeam);
				//htlivesight.Teams.list["_"+homeTeam.id+"_"+homeTeam.youth] = homeTeam;
				var awayTeam= new htlivesight.Team(match.away.team.id, match.away.team.name, match.away.team.shortName, match.sourceSystem );
				match.away.team = htlivesight.Teams.update(awayTeam);
				//htlivesight.Teams.list["_"+awayTeam.id+"_"+awayTeam.youth] = awayTeam;
				match = htlivesight.Match.Update(match);
			}
			if((htlivesight.prefs.other.reLive) && (match.date <= htlivesight.Time.reLiveStartTime) && (match.isFinish)){
				if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)
				{ 
					match.home.reLiveGoals=0;
					match.away.reLiveGoals=0;
				};
				for(var i=0; i<=match.event.list.last; i++){
					var event=match.event.list["_"+i];
					if(event===undefined) continue;
					if(event.key.A==5 && event.key.BC==01){
						//	match.home.reLiveGoals=5;
						//	match.away.reLiveGoals=0;
						//	match.home.realGoals=5;
						//	match.away.realGoals=0;
						match.home.realGoals=0;
						match.away.realGoals=5;
						match.home.goals=0;
						match.away.goals=5;
					}
					if(event.key.A==5 && event.key.BC==02){
						match.home.realGoals=5;
						match.away.realGoals=0;
						match.home.goals=5;
						match.away.goals=0;

						//console.log("added relive goals!");
					}
				};
			}

			if((htlivesight.prefs.other.reLive) && (match.date <= htlivesight.Time.reLiveStartTime) && !(match.isFinish)){
				if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)
				{ 
					match.home.reLiveGoals=0;
					match.away.reLiveGoals=0;
				};
				for(var i=match.event.list.first; i<=match.event.list.last; i++){
					var event=match.event.list["_"+i];
					if(event===undefined) continue;
					if(event.key.A==1 && event.key.BC==25){//#25 fixed assigning goal to wrong side
						match.getOppositeSideById(event.subjectTeamId).reLiveGoals+=1;
					}else if (event.key.A==1 || (event.key.A==0 &&(event.key.BC==55 ||
							event.key.BC==56 || event.key.BC==57))){
						match.getSideById(event.subjectTeamId).reLiveGoals+=1;					 
					};

				};



				// added by bigpapy in order to store actual score of matches for relive table
				match.home.realGoals=match.home.goals;
				match.away.realGoals=match.away.goals;
				match.home.goals=match.home.reLiveGoals;
				match.away.goals=match.away.reLiveGoals;
				//console.log("home real goals= "+match.home.realGoals+"away real goals= "+match.away.realGoals+"home goals= "+match.home.goals+"away goals="+match.away.goals);
				if(match.event.list.last > match.lastShownEventIndex[1]){
					match.lastShownEventIndex[0]=match.lastShownEventIndex[1];
					match.lastShownEventIndex[1]=match.event.list.last;
				};
			};
			// bigpapy end adding reLive
		}
		for (matchIndex in htlivesight.Match.List) {
			match = htlivesight.Match.List[matchIndex];
			if (match.lastShownEventIndex[0]!=-1)
				newLastShownIndexes+=" {\"matchId\":\""+match.id+"\", \"sourceSystem\":\""+match.sourceSystem+"\", \"index\":\""+match.lastShownEventIndex[0]+"\"}, ";
			//if(htlivesight.Live.updating==true)console.log("match.live="+match.live);
			if (match.live) {
				try{
					if(match.nextEventTime!=0) 
					{
						if((match.nextEventTime<htlivesight.Live.nextEventTime)||(htlivesight.Live.nextEventTime==0))htlivesight.Live.nextEventTime = match.nextEventTime;
					}
				}catch(e){alert(e);};
				match.updateTime();
				if (source == htlivesight.Live.VIEW) {
					var first = match.event.list.first;
					var last = match.event.list.last;
					/** Next line is used in relive mode: if there are event to process it means
					 * that live.xml was loaded correctly by HTlivesight so it can be saved in a
					 * variable to be used as a fake live.xml in the relive mode updating during
					 * the minute.
					 */
					//if(htlivesight.Live.updating==true)console.log("before choosing!");
					if(htlivesight.prefs.other.reLive && first<=last){
						htlivesight.liveXml=response;
					}
					if(!htlivesight.prefs.other.reLive){htlivesight.liveXml=response;}
					for (var i=first; i<=last; i++) {
						htlivesight.Notify.add(match.event.list["_"+i]);
						htlivesight.Speech.add(match.event.list["_"+i]);
					}
				}
				htlivesight.DOM.UpdateLiveMatch(match);  
			};
		}
		if (newLastShownIndexes!="")
			htlivesight.Live.lastShownIndexes="{\n\"matches\": [ "+newLastShownIndexes+" ]\n }";
		if (source == htlivesight.Live.VIEW) {
			htlivesight.Notify.set();
			htlivesight.Speech.eventspeeching();
		}
		htlivesight.errorLoadingXML=false;
	} catch(e) {
		console.log("Live.ParseView : " + e);
		htlivesight.errorLoadingXML=true;
		if(htlivesight.prefs.other.reLive){htlivesight.Live.interval = setInterval(function() { htlivesight.Live.loop(); }, 1000);};
	};
	setTimeout(function(){htlivesight.matchDetails.view();}, 10);
	setTimeout(function(){htlivesight.matchLineup.view();}, 20);
	//setTimeout(function(){htlivesight.players.HTTPGet(htlivesight.Teams.myTeam.id,htlivesight.Teams.myTeam.youth);}, 10);

//	setTimeout(function(){htlivesight.players.HTTPGet("550611","False");}, 10);
//	setTimeout(function(){htlivesight.players.HTTPGet("1163060","False");}, 10);
//	setTimeout(function(){htlivesight.players.HTTPGet("1751637","False");}, 10);
//	setTimeout(function(){htlivesight.players.HTTPGet("505946","False");}, 10);


	try{
		for (playerIndex in htlivesight.Player.List){
			var playerIdYouth=playerIndex.split("_");

			try{

				if(!htlivesight.Player.List[playerIndex].downloaded){
					player = htlivesight.players.HTTPGet(playerIdYouth[1],playerIdYouth[2]);
					htlivesight.Player.List[playerIndex].downloaded=true;
				}
			}catch(e){console.log(e);

			player = htlivesight.players.HTTPGet(playerIdYouth[1],playerIdYouth[2]);}

			var player = htlivesight.Player.List[playerIndex];

			if(player.specialty=="0" || player.specialty=="1" || player.specialty=="2" || player.specialty=="3" || player.specialty=="4" || player.specialty=="5"|| player.specialty=="6" || player.specialty=="8"){
				htlivesight.players.addSpecialtyToDom(playerIdYouth[1],playerIdYouth[2],player.specialty);
				htlivesight.Player.List[playerIndex].downloaded=true;
			}

			//	setTimeout(function(){htlivesight.players.HTTPGet(team.id,team.youth);}, 10);
		}
	}catch(e){console.log("looping players list error:"+e);}

	htlivesight.DOM.addTeamLogo();



	if(htlivesight.prefs.other.reLive){htlivesight.Live.interval = setInterval(function() { htlivesight.Live.loop(); }, 1000);};
};
htlivesight.Live.ParseHomeTeam = function (xml) {
	return new htlivesight.Team(htlivesight.Live.ParseHomeTeamId(xml), htlivesight.Live.ParseHomeTeamName(xml), htlivesight.Live.ParseHomeTeamShortName(xml), ((htlivesight.Live.ParseSourceSystem(xml)=="youth")?"True":"False"));
};
htlivesight.Live.ParseAwayTeam = function (xml) {
	return new htlivesight.Team(htlivesight.Live.ParseAwayTeamId(xml), htlivesight.Live.ParseAwayTeamName(xml), htlivesight.Live.ParseAwayTeamShortName(xml), ((htlivesight.Live.ParseSourceSystem(xml)=="youth")?"True":"False"));
};
htlivesight.Live.ParseHomeTeamId = function (xml) {
	return parseInt(htlivesight.Util.Parse("HomeTeamID", xml),10);
};
htlivesight.Live.ParseHomeTeamName = function (xml) {
	return htlivesight.Util.Parse("HomeTeamName", xml);
};
htlivesight.Live.ParseHomeTeamShortName = function (xml) {
	return htlivesight.Util.Parse("HomeTeamShortName", xml);
};
htlivesight.Live.ParseAwayTeamId = function (xml) {
	return parseInt(htlivesight.Util.Parse("AwayTeamID", xml),10);
};
htlivesight.Live.ParseAwayTeamName = function (xml) {
	return htlivesight.Util.Parse("AwayTeamName", xml);
};
htlivesight.Live.ParseAwayTeamShortName = function (xml) {
	return htlivesight.Util.Parse("AwayTeamShortName", xml);
};
htlivesight.Live.ParseHomeGoals = function (xml) {
	var homegoals = parseInt(htlivesight.Util.Parse("HomeGoals", xml),10);
	//console.log("homegoals = "+ homegoals);
	/*if(homegoals > 25){
		alert("error! Too much home goals:" + homegoals + ", please check console log:");
		console.log("error! Too much home goals:" + homegoals + ", please check console log:");
		console.log(xml);
		console.log(''+xml);
		console.log(htlivesight.Util.Parse("HomeGoals", xml));
		alert(xml);
		console.log("parameters: ");
		console.log(htlivesight.Live.parameters);
		alert(htlivesight.Live.parameters);
	}*/
	return parseInt(htlivesight.Util.Parse("HomeGoals", xml),10);
};
htlivesight.Live.ParseAwayGoals = function (xml) {
	var awaygoals = parseInt(htlivesight.Util.Parse("AwayGoals", xml),10);
	//console.log("awaygoals = "+ awaygoals);
	/*if(awaygoals > 25){
		alert("error! Too much away goals:" + awaygoals + ", please check console log:");
		console.log("error! Too much away goals:" + awaygoals + ", please check console log:");
		console.log(xml);
		console.log(''+xml);
		console.log(htlivesight.Util.Parse("AwayGoals", xml));
		alert(xml);
		console.log("parameters: ");
		console.log(htlivesight.Live.parameters);
		alert(htlivesight.Live.parameters);
	}*/
	return parseInt(htlivesight.Util.Parse("AwayGoals", xml),10);
};
htlivesight.Live.ParseSourceSystem = function (xml) {
	var sourceSystem = htlivesight.Util.Parse("SourceSystem", xml);
	if (sourceSystem == null){
		var isYouth = htlivesight.Util.Parse("IsYouth", xml);
		if (isYouth == "True" || isYouth == "true") sourceSystem = "Youth";
		else sourceSystem="Hattrick";
	}
	return sourceSystem.toLowerCase();
};
htlivesight.Live.ParseError = function (xml) {
	return htlivesight.Util.Parse("Error", xml);
};
htlivesight.Live.ParseServer = function (xml) {
	return htlivesight.Util.Parse("Server", xml);
};
htlivesight.Live.ParseMatchId = function (xml) {
	return htlivesight.League.ParseMatchId(xml);
};