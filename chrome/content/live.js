htlivesight.Live = {  ADD: 1,  VIEW: 2,  started: false,  interval: null,  loopValue: 0,  startView: function() {	      if (htlivesight.Live.started==false) {      var e = document.getElementById("clockBox");  e.style.width="32px";  e.style.height="32px";//  htlivesight.Live.interval = setInterval("htlivesight.Live.loop()", 1000);    htlivesight.Live.interval = setInterval(function() { htlivesight.Live.loop(); }, 1000);      htlivesight.Live.started = true;     }  },  clockSeconds: 0,    addTime: 0,    updating: true,    lastShownIndexes: "",    safeLiveVersionEnabled: false,    nextEventTime:0,    removedLastRoundFromTable: false,    loop: function() {//	var liveXml="";/*	  if (!Live.nextEventTime){		  Live.nextEventTime=new Date();		  Live.nextEventTime.setDate(Live.nextEventTime.getDate()+7);	  } */		htlivesight.Live.clockSeconds = ++htlivesight.Live.clockSeconds % 60;    var slice = Math.floor(htlivesight.Live.clockSeconds/10);    var sec = htlivesight.Live.clockSeconds%10;   // document.getElementById("sec").value=clockSeconds;    //document.getElementById("sec").style.fontSize="9pt";      var e = document.getElementById("clockBox");    e.style.backgroundImage = "url('img/clock"+slice+".png')";      e.style.backgroundColor = "rgb(100%," +(50 + (10-sec)*5)+"%,"+ (10-sec)*10+"%)";   //  var strings = document.getElementById("strings");    htlivesight.Log.Label(/*strings.getString("progress.update")*/htlivesight.Util.Parse("ProgressUpdate",data[0])+/*" (last:"+htlivesight.Live.updating+") "+*/(60-htlivesight.Live.clockSeconds)                      +/*strings.getString("progress.seconds")*/ htlivesight.Util.Parse("ProgressSeconds",data[0]));          htlivesight.Log.Meter(0);        // added by bigpapy to implement smart update time           if (htlivesight.Live.clockSeconds==0) {  //	 console.log("seconds="+htlivesight.Live.clockSeconds);	var now=new Date();// added to smart update//	console.log("Relive = "+htlivesight.prefs.other.reLive+" Speed = "+htlivesight.prefs.other.reLiveSpeed);	   if(htlivesight.prefs.other.reLive && htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)htlivesight.Live.addTime+=1;//	   console.log("should be negative = "+(htlivesight.Live.nextEventTime-(now-(-htlivesight.Time.hattrickDiffTime))));       if ((htlivesight.Live.nextEventTime-(now-(-htlivesight.Time.hattrickDiffTime)))<0){     //	   console.log("Real update: htlivesight.Live.nextEventTime="+new Date(htlivesight.Live.nextEventTime));   // 	   console.log("now-(-Time.hattrickDiffTime)="+new Date(now-(-htlivesight.Time.hattrickDiffTime)));    	   htlivesight.Live.updating=true;    	   now.setDate(now.getDate()+7);    	   htlivesight.Live.nextEventTime=now.getTime();    	   htlivesight.Live.view(); //   	   console.log("live 1");    	   setTimeout(function(){htlivesight.matchDetails.view();}, 500); //   	   console.log("live 2"); //   	   console.log("htlivesight.liveXml="+htlivesight.liveXml.textContent);       }else{    	  // Time.hattrickTime= now.setTime(now-(-Time.hattrickDiffTime)); //  	   console.log("Fake update: htlivesight.Live.nextEventTime="+new Date(htlivesight.Live.nextEventTime)); //  	   console.log("now-(-Time.hattrickDiffTime)="+new Date(now-(-Time.hattrickDiffTime)));    	   htlivesight.Live.updating=false;    	   htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW); //   	   console.log("livefake 1");    	   setTimeout(function(){htlivesight.matchDetails.view();}, 500);//    	   console.log("livefake 2"); //  	   console.log("Fake update done!");       }// added to smart update       htlivesight.warningShown = false;    }else if(htlivesight.prefs.other.reLive &&     		(htlivesight.Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)) //added by bigpapy to show events during 60 seconds in relive    {    	htlivesight.Live.updating=false;    	    	htlivesight.Live.addTime+=1;       	htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);    	      	     }      }  };/* ============================================ */htlivesight.Live.view = function() { // var URL = HTTP.hattrickServer   //                 + "/Common/chppxml.axd?file=live"     //               + "&actionType=viewAll"       //             + "&version=1.4" // EventSystem.HTTPRequest(URL, Live.ParseView, "request.live");	  		try{		/** begin part of editing to find relive not working during live */	 //		if (htlivesight.Live.lastShownIndexes !=""){ // ORIGINAL LINE TO BE RESTORED AFTER FINDING ISSUE WITH RELIVE BLOCK OF EVENT DURING LIVE MATCHES.    /** end part of editing to find relive not working during live */			if (htlivesight.Live.lastShownIndexes !="" && !htlivesight.prefs.other.reLive ){			var parameters=[["file","live"],			                ["actionType","viewNew"],			                ["version","1.8"],			                ["lastShownIndexes",htlivesight.Live.lastShownIndexes], 			                ["includeStartingLineup",true],			                ];		} else { var parameters=[["file","live"],	             ["actionType","viewAll"],	             ["version","1.8"],     			 ["includeStartingLineup",true],	             ];     };         // removed safe version because of new sourcesystem version./*	 if (htlivesight.Live.safeLiveVersionEnabled){		var parameters=[["file","live"],		             ["actionType","viewAll"],		             ["version","1.5"]		             ];	//	alert("downloading in safe mode");	 }*/ }catch(e){	 alert("errore"+ e);	var parameters=[["file","live"],	             ["actionType","viewAll"],	             ["version","1.5"]	             ]; }  htlivesight.ApiProxy.retrieve(document, parameters, function(xml){  htlivesight.Live.ParseView(xml);  });};htlivesight.Live.ParseView = function (response) {		htlivesight.Live.ParseLive(response, htlivesight.Live.VIEW);	};/* ============================================ */htlivesight.Live.Matches = function() {};htlivesight.Live.HTTPAddMatch = function (matchId, sourceSystem) {/*  var URL = HTTP.hattrickServer                    + "/Common/chppxml.axd?file=live"                    + "&actionType=addMatch"                    + "&matchID=" + matchId		    + "&isYouth=" + youth                    + "&version=1.4";*///	alert("before adding match: id= "+matchId+" Sourcesystem="+sourceSystem);  var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];    if (match != null) {//	  alert("the match: id= "+matchId+" Sourcesystem="+sourceSystem+ "is already in list!");    match.live = true;    document.getElementById("short_" + matchId + "_" + sourceSystem).hidden = false;  } else {//	  alert("the match: id= "+matchId+" Sourcesystem="+sourceSystem+ "is not in list, adding it");	  sourceSystem=sourceSystem.toLowerCase(); //   EventSystem.HTTPRequest(URL, htlivesight.Live.ParseAddMatch, "request.add");	  	  var  parameters=[["file","live"],	    				["actionType","addMatch"],	    				["matchID",matchId],	    				["sourceSystem",sourceSystem],	    				["version","1.8"],	    				["includeStartingLineup",true],	    ];	 // alert("into Live.HTTPAddMatch: sourceSystem= "+sourceSystem+" matchID="+matchId);	    htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.Live.ParseAddMatch(xml);});	    setTimeout(function(){htlivesight.matchDetails.view();}, 500);  }};  htlivesight.Live.ParseAddMatch = function (response) {  htlivesight.Live.ParseLive(response, htlivesight.Live.ADD);    if (htlivesight.Live.addTime>0) htlivesight.liveXml=response;};htlivesight.Live.HTTPDeleteMatch = function (matchId, sourceSystem) {/*  var URL = HTTP.hattrickServer                    + "/Common/chppxml.axd?file=live"                    + "&actionType=deleteMatch"                    + "&matchID=" + matchId		    + "&isYouth=" + youth                    + "&version=1.4"; */ // EventSystem.HTTPRequest(URL, htlivesight.Live.ParseDeleteMatch, "request.delete");  var parameters=[["file","live"],  				["actionType","deleteMatch"],  				["matchID",matchId],  				["sourceSystem",sourceSystem],  				["version","1.8"]  ];  htlivesight.ApiProxy.retrieve(document, parameters, function(xml){	  htlivesight.Live.ParseDeleteMatch(xml);  });   var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];  match.lastShownEventIndex[0]=-1;  htlivesight.Match.List["_"+matchId+"_"+sourceSystem] = match;  };htlivesight.Live.ParseDeleteMatch = function (response) {};/* ---------------------------------------------------------------- * common Parse functions * ---------------------------------------------------------------- */htlivesight.Live.ParseLive = function (response, source) {//  var regStr = "(<Match>(.*?)</Match>)"; // var regExp;  var match/*, XMLEventList*/;  	var newTime;//  var found;    var newLastShownIndexes="";      try {	  var elapsedTime=0; //added by bigpapy	  	//  var newEvent=false;	//  console.log("0");	  var errorMsg = htlivesight.Live.ParseError(response);	  	//  htlivesight.Live.lastShownIndexes="";    //	  alert("Live.Parselive1" + response);	  	//  htlivesight.liveXml= response;//	  console.log("1");	    if(htlivesight.Live.updating)console.log("response at the beginning="+response.textContent);	  if (errorMsg != null) {		  var server = htlivesight.Live.ParseServer(response);//		  var strings = document.getElementById("strings");		  alert("Live.Parselive2 error" + response);		  alert(/*strings.getString("message.error_reading")*/ htlivesight.Util.Parse("MessageErrorReading",data[0])+ " " + server + ": " + errorMsg);		  htlivesight.Live.safeLiveVersionEnabled=true;		  	//	  if(htlivesight.Live.safeLiveVersionEnabled) alert("safe mode enabled");	  }	  	  /**************************************************************************************	   * part added to remove flash and images event before update	   *************************************************************************************///	  console.log("2");	   htlivesight.Notify.clearImages();//	   console.log("3");	      htlivesight.Notify.clearFlash();	      /**************************************************************************************		   * part added to remove flash and images event before update		   *************************************************************************************/	      	//  alert("Live.Parselive3" + response);//	  alert ("Time.hattrickTime"+Time.hattrickTime);//1.7      console.log("hattrickTime before fetch date: " + new Date(Time.hattrickTime));	  try{newTime=htlivesight.Time.parseFetchDate(response);}catch(e){newTime=htlivesight.Time.hattrickTime;};//1.7	  console.log("newtime: " + newTime);	//  if (Live.updating && Live.clockSeconds==0) Time.start(newTime);	  if (htlivesight.Live.updating){		  if (htlivesight.Time.hattrickDiffTime==0)htlivesight.Time.start(newTime);		  htlivesight.Time.hattrickTime=newTime;		  }else {			var  now = new Date();	//		alert("now="+now);//1.7		  console.log("OldTime.hattrickTime: " + new Date(Time.hattrickTime));			  htlivesight.Time.hattrickTime= (now-(-htlivesight.Time.hattrickDiffTime));	//		  alert("htlivesight.Time.hattrickTime="+ new Date(htlivesight.Time.hattrickTime));//1.7			  console.log("NewTime.hattrickTime: " + new Date(Time.hattrickTime));			  };	//    Time.hattrickTime=newTime;	//	  Live.clockSeconds=Math.round(Math.abs(Time.hattrickTime)/1000)%60;	//  }	 // if ((Live.clockSeconds==0) || (Time.hattrickTime==0)) Time.hattrickTime = Time.parseFetchDate(response);	//  alert ("Time.hattrickTime"+Time.hattrickTime);	  	//  console.log("bigpapy: live_1");	  	  // bigpapy adding for reLive	  if(htlivesight.prefs.other.reLive){		  if(htlivesight.Time.reLiveStartTime == 0) {			  htlivesight.Time.reLiveStartTime = htlivesight.Time.hattrickTime;	//		  Time.reLiveTime=Time.hattrickTime;		  }		  //Used round because elapsedTime<= didn't work.	//	  if (addtime==0) Time.reLiveTime+=60000;		  		  // old line to be removed	//	  elapsedTime=Math.round((Time.hattrickTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addTime;		  // old line to be removed		  	//	  elapsedTime=Math.round((Time.reLiveTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addtime;	//	  alert("elapsedTime:"+elapsedTime);	//	  alert(" Time.reLiveStartTime="+Time.reLiveStartTime+" Time.hattrickTime="+Time.hattrickTime+" addtime="+addtime+" elapsedTime="+ elapsedTime);		  elapsedTime=htlivesight.Live.addTime;//added to have internal minutes.		  		  if (elapsedTime) htlivesight.Time.reLiveMinute=elapsedTime;		  if (elapsedTime>45 && elapsedTime<61) elapsedTime=45;		  if (elapsedTime>60) elapsedTime-=15; //	  alert("Time.reLiveStartTime: " + Time.reLiveStartTime+//			  "elapsedTime: "+ elapsedTime);	  }	  // bigpapy end adding reLive	//	  regExp = new RegExp(regStr, "g");//	  console.log("bigpapy: live_2");	  var count = 0;    //	  alert("Live.Parselive5" + response);	  		    var matchNodes = response.getElementsByTagName("Match");	  	   //	  alert("Live.Parselive6");	  // for(;found = regExp.exec(response);) {	  	  // modified by bigpapy//	    alert ("matchNodes.length: "+matchNodes.length);	   //     newlastShownIndexes="{\n\"matches\": [\n";//	  if (Live.lastShownIndexes=="") Live.lastShownIndexes="{\n\"matches\": [\n ]\n }";	  //new json attempt.	//  Live.lastShownIndexes="{\n\"matches\": [ ";	    for(var j=0;j< matchNodes.length ;j++){	  //for(var j=1;j< matchNodes.length ;j=j+2){		 if (htlivesight.Live.updating) htlivesight.Log.Meter(((j+1)/matchNodes.length)*100);		 var matchNode = matchNodes[j];		  count++;	//	  console.log("bigpapy: live_3");	//	  alert("j="+j);		  //part added by bigpapy to get viewNew working		  		  try			{				var substitutions = htlivesight.LineUp.ParseSubstitutions(matchNode.getElementsByTagName("Substitutions")[0]);			}catch(e){};		  		  try{	//		  console.log("bigpapy: live_3.1");			  			var matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);			  			var  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);			  			var matchDate=htlivesight.Time.parseDate(htlivesight.Util.Parse("MatchDate", matchNode));			  			var  matchHome= new htlivesight.Match.side(					  					  htlivesight.Live.ParseHomeTeam(matchNode),					  htlivesight.Live.ParseHomeGoals(matchNode)			  );						/*** start adding lineup home team ***/			try			{				//get the away team lineup string from "hometeam" xml block.				var homeLineUp = htlivesight.LineUp.ParseLineUpFromXml(matchNode.getElementsByTagName("HomeTeam")[0]);			}catch(e){ //if lineup is missing (walkover) it shows an empty lineup.								//		homeLineUp =":       -      ,      ,      ,      ,       -      ,      ,      ,      ,       -      ,      ,       ";											 }			  			var  matchAway= new htlivesight.Match.side(					  htlivesight.Live.ParseAwayTeam(matchNode),					  htlivesight.Live.ParseAwayGoals(matchNode)			  );						try			{				//get the away team lineup string from "awayteam" xml block.				var awayLineUp = htlivesight.LineUp.ParseLineUpFromXml(matchNode.getElementsByTagName("AwayTeam")[0]);			}catch(e){ //if lineup is missing (walkover) it shows an empty lineup.				//		awayLineUp =":       -      ,      ,      ,      ,       -      ,      ,      ,      ,       -      ,      ,       ";											 }			  			  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);		/*	  matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);*/	//		  console.log("bigpapy: live_3.11");			  matchHome.lineUp= homeLineUp;			  matchAway.lineUp= awayLineUp;		  }catch(e){//			  console.log("bigpapy: live_3.20:"+ e);			var  matchId=parseInt(htlivesight.Util.Parse("MatchID", matchNode),10);	//		  console.log("bigpapy: live_3.21");			var  matchSourceSystem=htlivesight.Live.ParseSourceSystem(matchNode);//			  console.log("bigpapy: live_3.22");			var  matchDate=htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].date;//			  console.log("bigpapy: live_3.23");			var  matchHome= new htlivesight.Match.side(					  htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].home,					 // Match.List["_"+matchId+"_"+matchYouth].home.goals);					  htlivesight.Live.ParseHomeGoals(matchNode));					  			var  matchAway= new htlivesight.Match.side(					  htlivesight.Match.List["_"+matchId+"_"+matchSourceSystem].away,					  //Match.List["_"+matchId+"_"+matchYouth].away.goals);					  htlivesight.Live.ParseAwayGoals(matchNode));			  }		  		  match = new htlivesight.Match(				  //     htlivesight.Util.Parse("<MatchID>(.*?)</MatchID>", found[1]),				  //	  xml.getElementsByTagName("MatchID")[0].textContent,				  matchId,    	        	  				  //       Time.parseDate(htlivesight.Util.Parse("<MatchDate>(.*?)</MatchDate>", found[1])),				  //	Time.parseDate(xml.getElementsByTagName("MatchDate")[0].textContent),				/*  Time.parseDate(htlivesight.Util.Parse("MatchDate", matchNode)),*/				  matchDate,				 /* new Match.side(						  htlivesight.Live.ParseHomeTeam(matchNode),						  htlivesight.Live.ParseHomeGoals(matchNode)				  )*/matchHome,				  /*new Match.side(						  htlivesight.Live.ParseAwayTeam(matchNode),						  htlivesight.Live.ParseAwayGoals(matchNode)				  )*/matchAway,				  //        new Match.events(Events.ParseList(htlivesight.Util.Parse("<EventList>(.*?)</EventList>", found[1]))),				  //   new Match.events(Events.ParseList(xml.getElementsByTagName("EventList")[0].textContent)),				  new htlivesight.Match.events(htlivesight.Events.ParseList(matchNode.getElementsByTagName("EventList")[0],elapsedTime)), // Re live added elapsedTime by bigpapy.				  null,				  matchSourceSystem,				  				  substitutions		  );	//	  console.log("bigpapy: live_3.5");	//	  alert("j="+j+" match.id:"+match.id);		  		//	  alert("live! match.reLiveByEventEnd="+match.reLiveByEventEnd);		  		// adding code about intelligent update (with next event minute) start:		 // Math.round(Math.abs(Time.hattrickTime)/1000);		 		  try{			  	//		  console.log("bigpapy: live_4");			  		//  lastShownEventIndex = -1;		//  htlivesight.Live.lastShownIndex="{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+lastShownEventIndex+"\"},\n";		var lastShownEventIndex = matchNode.getElementsByTagName("LastShownEventIndex")[0].textContent;		match.lastShownEventIndex[0]=match.lastShownEventIndex[1];		  match.lastShownEventIndex[1]=lastShownEventIndex;		  }catch(e){};		//  console.log("lastShownEventIndex="+lastShownEventIndex);	//	  console.log("bigpapy: live_5");		//  if (lastShownEventIndex >-1)  alert("lastShownEventIndex: "+lastShownEventIndex);/* begin old json		  newlastShownIndex="{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+lastShownEventIndex+"\"},\n";		  if (htlivesight.Live.lastShownIndexes.search("{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth)!=-1){			  Live.lastShownIndexes.replace("{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\"",					  "@");			  Live.lastShownIndexes.replace(/@\d{1,2}/,"{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+lastShownEventIndex);		  }else{			  Live.lastShownIndexes=Live.lastShownIndexes.slice(0,Live.lastShownIndexes.length-6);			  Live.lastShownIndexes+=newlastShownIndex+" ]\n }";		  }*///end old json		 // match.event.list.first=0;		  //match.event.list.last=0;		  		 try{ 		  		 var nextEventMinute = parseInt(matchNode.getElementsByTagName("NextEventMinute")[0].textContent);//1.7		  console.log("nextEventMinute: "+ nextEventMinute);		  if (nextEventMinute>45) nextEventMinute=15+nextEventMinute;		  if (nextEventMinute!=0){	//		  console.log("match.date: " + match.date);			 var nextUpdateDate=new Date(match.date);	//		  console.log("nextUpdateDate: " + nextUpdateDate);			  nextUpdateDate.setMinutes(nextUpdateDate.getMinutes()+nextEventMinute);			  			  			  		/*	  nextUpdateDateMinutes=nextUpdateDate.getMinutes();			  console.log("minutes"+ nextUpdateDateMinutes);			  nextUpdateDateHours=nextUpdateDate.getHours();			  console.log("hours"+ nextUpdateDateHours);			  totalMinutes=nextUpdateDateMinutes+nextEventMinute;			  console.log("totalMinutes"+ totalMinutes);			  nextUpdateDateHours+=nextUpdateDateMinutes/60;			  console.log("hours"+ nextUpdateDateHours);			  nextUpdateDateMinutes%=60;			  console.log("minutes"+ nextUpdateDateMinutes);			  nextUpdateDate.setHours(nextUpdateDateHours,nextUpdateDateMinutes);*/			  		//	  nextUpdateDate.setMinutes(/*nextUpdateDate.getMinutes()+*/nextEventMinute);		//	  nextUpdateDate=new Date(match.date-0+(NextEventMinute*60000));		//	  nextUpdateDate= match.date-0+(NextEventMinute*60000);		//	  console.log("nextUpdateDate: " + nextUpdateDate);	//		  nextUpdateDate= nextUpdateDate +(NextEventMinute*60000);	//		  console.log("nextUpdateDate: " + nextUpdateDate);			/*  minutes=nextUpdateDate.getMinutes()+nextEventMinute;			  hours=nextUpdateDate.getHours()+minutes/60;			  days=nextUpdateDate.getDate()+hours/24;			  minutes=minutes%60;			  hours=hours%24;			  nextUpdateDate.setHours(hours,minutes);			  nextUpdateDate.setDate(nextUpdateDate.getDate()+5);			  nextupdateDate+=days;*/			  match.nextEventTime= nextUpdateDate.getTime();		//	  console.log("match.nextEventTime: " + match.nextEventTime);	//	  match.nextEventTime=(((match.date.getTime())/60000)+nextEventMinute)*60000;//1.7		  console.log("nextUpdate: " + match.nextEventTime);		  };		  }catch(e){/*alert("error next event minute:"+e);*/};		//  Live.clockSeconds=((0+Time.hattrickTime)/1000)%60;		 // alert("match.date= "+ match.date);		 // newlastShownIndexes+=newlastShownIndex;		 // newlastShownIndex="";// adding code about intelligent update (with next event minute) end:	//	  console.log("bigpapy: live_6");		  		 		  if(htlivesight.Time.reLiveMinute==Number.MAX_VALUE)			  match.reLiveByEventEnd=true;		  		  if (match.id) {	//		  alert("Live.Parselive9");		//	  alert("live_first_2: "+ match.event.list.first);			  var homeTeam= new htlivesight.Team(match.home.team.id, match.home.team.name, match.home.team.shortName, match.sourceSystem );			  match.home.team = htlivesight.Teams.update(homeTeam);			  			  var awayTeam= new htlivesight.Team(match.away.team.id, match.away.team.name, match.away.team.shortName, match.sourceSystem );			  match.away.team = htlivesight.Teams.update(awayTeam);			  match = htlivesight.Match.Update(match);			  	//		  console.log("bigpapy: live_7");			  		  }		  		// bigpapy adding for reLive		  if((htlivesight.prefs.other.reLive) && (match.date <= htlivesight.Time.reLiveStartTime) && !(match.isFinish)){			  if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)			  { 				  match.home.reLiveGoals=0;    			  match.away.reLiveGoals=0;  //  			  alert("match.home.reLiveGoals="+match.home.reLiveGoals  //  					  +"match.away.reLiveGoals="+match.away.reLiveGoals);			  };			  			 for(var i=match.event.list.first; i<=match.event.list.last; i++){				var event=match.event.list["_"+i];				 if (event.key.A==1 || (event.key.A==0 &&(event.key.BC==55 ||						 event.key.BC==56 || event.key.BC==57))){					 match.getSideById(event.subjectTeamId).reLiveGoals+=1;					 				 };			 };			// added by bigpapy in order to store actual score of matches for relive table			 match.home.realGoals=match.home.goals;			 match.away.realGoals=match.away.goals;			 match.home.goals=match.home.reLiveGoals;			 match.away.goals=match.away.reLiveGoals;			 			 // added by bigpapy live.xml 1.6			 match.lastShownEventIndex[0]=match.lastShownEventIndex[1]			 match.lastShownEventIndex[1]=match.event.list.last;		  };		  // bigpapy end adding reLive	  }	    	   // newlastShownIndexes+=" ]\n }";	   // if (newlastShownIndexes!="{\n\"matches\": [\n ]\n }")//	    if	(Live.lastShownIndexes=="{\n\"matches\": [\n ]\n }") Live.lastShownIndexes="";//	    alert("lastShownIndexes: "+ Live.lastShownIndexes);//	  alert("Live.Parselive10");	 //   Live.lastShownIndexes="{\n\"matches\": [ ";	    	//    console.log("bigpapy: live_8");	  for (matchIndex in htlivesight.Match.List) {//		  alert("Live.Parselive11");		  match = htlivesight.Match.List[matchIndex];		  //		  console.log("bigpapy: live_9");		  		  if (match.lastShownEventIndex[0]!=-1)			  newLastShownIndexes+=" {\"matchId\":\""+match.id+"\", \"sourceSystem\":\""+match.sourceSystem+"\", \"index\":\""+match.lastShownEventIndex[0]+"\"}, ";			//	  alert("live_first_4: "+ match.event.list.first);		  if(htlivesight.Live.updating==true)console.log("match.live="+match.live);		  if (match.live) {			  try{			 if(match.nextEventTime!=0) 					{					if((match.nextEventTime<htlivesight.Live.nextEventTime)||(htlivesight.Live.nextEventTime==0))htlivesight.Live.nextEventTime = match.nextEventTime;					}					}catch(e){alert(e);};			  		//	  alert("matchIndex="+matchIndex+" match.live="+match.live);	//		  console.log("bigpapy: live_10");			  			  match.updateTime();			  	//		  console.log("bigpapy: live_11");	//		  alert("Live.Parselive12");			  if (source == htlivesight.Live.VIEW) {				  var first = match.event.list.first;				  var last = match.event.list.last;				  	//			  console.log("bigpapy: live_12");				  				   	//			  alert("first="+first+" last="+last);          	//			  alert("Live.Parselive13");				  	/** Next line is used in relive mode: if there are event to process it means	 * that live.xml was loaded correctly by HTlivesight so it can be saved in a	 * variable to be used as a fake live.xml in the relive mode updating during	 * the minute.	 */				  if(htlivesight.Live.updating==true)console.log("before choosing!");				  if(htlivesight.prefs.other.reLive && first<=last){				//  	alert("first="+first+" last="+last);				//  	if(htlivesight.Live.updating==true)alert(new XMLSerializer().serializeToString(response));				  	htlivesight.liveXml=response;				  	}				  if(!htlivesight.prefs.other.reLive){htlivesight.liveXml=response;}				  for (var i=first; i<=last; i++) {					//  alert("before i:" + i);					  htlivesight.Notify.add(match.event.list["_"+i]);				    //  alert("after i:" + i);				//	  if(htlivesight.prefs.other.reLive) htlivesight.liveXml= response;				  }				  //added by bigpapy: adding first and second half sound start (begin)				  				//added by bigpapy: adding first and second half sound start (end)			  }		//	  alert("Live.Parselive14");	//		  console.log("bigpapy: live_13");			  htlivesight.DOM.UpdateLiveMatch(match);  //			  console.log("bigpapy: live_14");		  };	  }	  if (newLastShownIndexes!="")	  htlivesight.Live.lastShownIndexes="{\n\"matches\": [ "+newLastShownIndexes+" ]\n }";	//  console.log("htlivesight.Live.lastShownIndexes = "+htlivesight.Live.lastShownIndexes);    if (source == htlivesight.Live.VIEW) {    	htlivesight.Notify.set();  //    	alert("Live.Parselive15");    }        htlivesight.errorLoadingXML=false;//alert ("Live.clockSeconds"+Live.clockSeconds);//if (Live.clockSeconds==0) htlivesight.liveXml=response;// synchronization with hattrick server clock/*if (!htlivesight.prefs.other.reLive){if (htlivesight.Live.updating){var now=new Date(htlivesight.Time.hattrickTime); htlivesight.Live.clockSeconds=(now.getSeconds()+56)%60;   //    Live.clockSeconds=Math.abs(Math.floor(Math.floor(now/1000)%60+Math.floor(Time.hattrickDiffTime/1000)%60)-1)%60;   //    now.setMilliseconds(now.getMilliseconds()+Time.hattrickDiffTime);   //    Live.clockSeconds=now.getSeconds()-1;//1.7      console.log("now: "+now+" Time.hattrickDiffTime: "+Time.hattrickDiffTime);}else{var	now=new Date();	     now.setMilliseconds(now.getMilliseconds()+htlivesight.Time.hattrickDiffTime);	       htlivesight.Live.clockSeconds=(now.getSeconds()+56)%60;//1.7	       console.log("now: "+now+" Time.hattrickDiffTime: "+Time.hattrickDiffTime);	}} */// end synchronization with hattrick server clock  } catch(e) {	  	//  alert("Live.Parselive16");//	  alert("Live.ParseView : " + e);	  htlivesight.errorLoadingXML=true;	//  console.log("Live.ParseView : " + e);//modified by bigpapy  };}; htlivesight.Live.ParseHomeTeam = function (xml) {  return new htlivesight.Team(htlivesight.Live.ParseHomeTeamId(xml), htlivesight.Live.ParseHomeTeamName(xml), htlivesight.Live.ParseHomeTeamShortName(xml), ((htlivesight.Live.ParseSourceSystem(xml)=="youth")?"True":"False"));};htlivesight.Live.ParseAwayTeam = function (xml) {  return new htlivesight.Team(htlivesight.Live.ParseAwayTeamId(xml), htlivesight.Live.ParseAwayTeamName(xml), htlivesight.Live.ParseAwayTeamShortName(xml), ((htlivesight.Live.ParseSourceSystem(xml)=="youth")?"True":"False"));};htlivesight.Live.ParseHomeTeamId = function (xml) {//  return htlivesight.Util.Parse("<HomeTeamID>(.*?)</HomeTeamID>", xml);	return parseInt(htlivesight.Util.Parse("HomeTeamID", xml),10);};htlivesight.Live.ParseHomeTeamName = function (xml) {//  return htlivesight.Util.Parse("<HomeTeamName>(.*?)</HomeTeamName>", xml);	return htlivesight.Util.Parse("HomeTeamName", xml);};htlivesight.Live.ParseHomeTeamShortName = function (xml) {//  return htlivesight.Util.Parse("<HomeTeamName>(.*?)</HomeTeamName>", xml);	return htlivesight.Util.Parse("HomeTeamShortName", xml);};htlivesight.Live.ParseAwayTeamId = function (xml) {//  return htlivesight.Util.Parse("<AwayTeamID>(.*?)</AwayTeamID>", xml);	return parseInt(htlivesight.Util.Parse("AwayTeamID", xml),10);};htlivesight.Live.ParseAwayTeamName = function (xml) {//  return htlivesight.Util.Parse("<AwayTeamName>(.*?)</AwayTeamName>", xml);	return htlivesight.Util.Parse("AwayTeamName", xml);};htlivesight.Live.ParseAwayTeamShortName = function (xml) {//  return htlivesight.Util.Parse("<AwayTeamName>(.*?)</AwayTeamName>", xml);	return htlivesight.Util.Parse("AwayTeamShortName", xml);};htlivesight.Live.ParseHomeGoals = function (xml) {//  return htlivesight.Util.Parse("<HomeGoals>(.*?)</HomeGoals>", xml);	return parseInt(htlivesight.Util.Parse("HomeGoals", xml),10);};htlivesight.Live.ParseAwayGoals = function (xml) {//  return htlivesight.Util.Parse("<AwayGoals>(.*?)</AwayGoals>", xml);  return parseInt(htlivesight.Util.Parse("AwayGoals", xml),10);};htlivesight.Live.ParseSourceSystem = function (xml) {//  return htlivesight.Util.Parse("<IsYouth>(.*?)</IsYouth>", xml);//	console.log("Into Live.ParseYouth");	var sourceSystem = htlivesight.Util.Parse("SourceSystem", xml)	if (sourceSystem == null){		var isYouth = htlivesight.Util.Parse("IsYouth", xml)		if (isYouth == "True" || isYouth == "true") sourceSystem = "Youth"		else sourceSystem="Hattrick";	}	return sourceSystem.toLowerCase();//	return htlivesight.Util.Parse("SourceSystem", xml);};htlivesight.Live.ParseError = function (xml) { // return htlivesight.Util.Parse("<Error>(.*?)</Error>", xml);  return htlivesight.Util.Parse("Error", xml);};htlivesight.Live.ParseServer = function (xml) {//  return htlivesight.Util.Parse("<Server>(.*?)</Server>", xml);  return htlivesight.Util.Parse("Server", xml);};htlivesight.Live.ParseMatchId = function (xml) {  return htlivesight.League.ParseMatchId(xml);};