var Live = {
  ADD: 1,
  VIEW: 2,
  started: false,
  interval: null,
  loopValue: 0,
  startView: function() {	      if (Live.started==false) {
      var e = document.getElementById("clockBox");
  e.style.width="32px";
  e.style.height="32px";
  Live.interval = setInterval("Live.loop()", 1000);
      Live.started = true; 
    }
  },
  clockSeconds: 0,    nextEventTime: 0,    addTime: 0,    updating: true,    lastShownIndexes: "",    safeLiveVersionEnabled: false,    loop: function() {
//	var liveXml="";	  		Live.clockSeconds = ++Live.clockSeconds % 60;
    var slice = Math.floor(Live.clockSeconds/10);
    var sec = Live.clockSeconds%10;
    //document.getElementById("sec").value=clockSeconds;
    //document.getElementById("sec").style.fontSize="9pt";
  
    var e = document.getElementById("clockBox");
    e.style.backgroundImage = "url('img/clock"+slice+".png')";  
    e.style.backgroundColor = "rgb(100%," +(50 + (10-sec)*5)+"%,"+ (10-sec)*10+"%)"; 

    var strings = document.getElementById("strings");
    htlivesight.Log.Label(strings.getString("progress.update")+" "+(60-Live.clockSeconds)
                      +strings.getString("progress.seconds"));
          htlivesight.Log.Meter(0);        // added by bigpapy to implement smart update time           if (Live.clockSeconds==0) {	   now=new Date();// added to smart update	   if(htlivesight.prefs.other.reLive && Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)Live.addTime+=1;
       if ((Live.nextEventTime-now)<0) {    	   Live.updating=true;    	   Live.view();       }else{    	  // Time.hattrickTime= now.setTime(now-(-Time.hattrickDiffTime));    	   Live.updating=false;    	   Live.ParseLive(htlivesight.liveXml, Live.VIEW);       }// added to smart update   //    if(htlivesight.prefs.other.reLive) Live.addTime+=1;       // no more needed, to be removed***************************************************     //  now=new Date();     //  Live.clockSeconds=Math.abs(Math.round((now/1000)%60+(Time.hattrickDiffTime/1000)%60))%60;       // no more needed, to be removed***************************************************           //   alert("Live.nextEventTime = "+Live.nextEventTime+ "now = "+now+" diff = "+(Live.nextEventTime-now));    //	Live.view();// original line       htlivesight.warningShown = false;  //     alert("Live.nextEventTime = "+Live.nextEventTime+ "now = "+now+" diff = "+(Live.nextEventTime-now));
    }else if(htlivesight.prefs.other.reLive &&     		(Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)) //added by bigpapy to show events during 60 seconds in relive    {    	Live.updating=false;    	    	Live.addTime+=1;    	    	Live.ParseLive(htlivesight.liveXml, Live.VIEW);    	      	     }    // Synchronization of the HTLS clock with the Hattrick server clock at 40" and 20" /*   if (Live.clockSeconds%60==59 && !htlivesight.prefs.other.reLive)    {      now=new Date();      Live.clockSeconds=Math.abs((Math.floor(now/1000)%60+Math.floor(Time.hattrickDiffTime/1000)%60))%60;    }*/ // End synchronization of the HTLS clock with the Hattrick server clock at 40" and 20"    
  }
  
};

/* ============================================ */

Live.view = function() {
 // var URL = HTTP.hattrickServer
   //                 + "/Common/chppxml.axd?file=live"
     //               + "&actionType=viewAll"
       //             + "&version=1.4"

 // EventSystem.HTTPRequest(URL, Live.ParseView, "request.live");	  	 try{	 	 if (Live.lastShownIndexes !=""){  parameters=[["file","live"],              ["actionType","viewNew"],              ["version","1.6"],              ["lastShownIndexes",Live.lastShownIndexes],              ]; // alert("Live.lastShownIndexes/parameter"+ Live.lastShownIndexes);	 } else { parameters=[["file","live"],	             ["actionType","viewAll"],	             ["version","1.6"]	             ];     };	 if (Live.safeLiveVersionEnabled){		 parameters=[["file","live"],		             ["actionType","viewAll"],		             ["version","1.5"]		             ];	 } }catch(e){	 alert("errore"+ e);	parameters=[["file","live"],	             ["actionType","viewAll"],	             ["version","1.6"]	             ]; }  Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){  Live.ParseView(xml);  });};

Live.ParseView = function (response) {		Live.ParseLive(response, Live.VIEW);	
};

/* ============================================ */
Live.Matches = function() {
};

Live.HTTPAddMatch = function (matchId, youth) {
/*  var URL = HTTP.hattrickServer
                    + "/Common/chppxml.axd?file=live"
                    + "&actionType=addMatch"
                    + "&matchID=" + matchId
		    + "&isYouth=" + youth
                    + "&version=1.4";*/
  var match = Match.List["_"+matchId+"_"+youth];    if (match != null) {
    match.live = true;
    document.getElementById("short_" + matchId + "_" + youth).hidden = false;
  } else {
 //   EventSystem.HTTPRequest(URL, Live.ParseAddMatch, "request.add");	    parameters=[["file","live"],	    				["actionType","addMatch"],	    				["matchID",matchId],	    				["isYouth",youth],	    				["version","1.6"]	    ];	    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){Live.ParseAddMatch(xml);});
  }
};
  
Live.ParseAddMatch = function (response) {
  Live.ParseLive(response, Live.ADD);
};

Live.HTTPDeleteMatch = function (matchId, youth) {
/*  var URL = HTTP.hattrickServer
                    + "/Common/chppxml.axd?file=live"
                    + "&actionType=deleteMatch"
                    + "&matchID=" + matchId
		    + "&isYouth=" + youth
                    + "&version=1.4"; */
 // EventSystem.HTTPRequest(URL, Live.ParseDeleteMatch, "request.delete");   parameters=[["file","live"],  				["actionType","deleteMatch"],  				["matchID",matchId],  				["isYouth",youth],  				["version","1.6"]  ];  Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){	  Live.ParseDeleteMatch(xml);  });    match = Match.List["_"+matchId+"_"+youth];  match.lastShownEventIndex=-1;  Match.List["_"+matchId+"_"+youth] = match;    /**   * removing match from json file about last shown indexes   */   //removing the match in three steps, part before last shown index...//  elements=Live.lastShownIndexes.replace("{\"matchId\":\""+matchId+"\", \"isYouth\":\""+youth+"\", \"index\":\"","@");  //...removing last shown index and replacing with @ to mark the target... // elements=elements.replace(/@\d{1,2}/,"@");  //...removing part after the last shown index // elements=elements.replace("@\"},","");  //passing new last shown indexes from local variable to the main variable. // Live.lastShownIndexes=elements; // alert(Live.lastShownIndexes); // alert ("elements[0]= "+ elements[0] +"\n elements[1]= "+ elements[1]);   /* {  //     + index +"\"},\n"	  alert("Live.lastShownIndexes="+Live.lastShownIndexes);	  arrayLastShownIndexes=Live.lastShownIndexes.split(":");	  newlastShownIndexes="";	  for(var j=0;j< arrayLastShownIndexes.length; j++){		  if ((arrayLastShownIndexes[j].search(matchId)!=-1) &&				  arrayLastShownIndexes[j+1].search(youth)!=-1) newlastShownIndexes+=arrayLastShownIndexes[j];		  alert("newlastShownIndexes= "+ newlastShownIndexes);	  }	  Live.lastShownIndexes=newlastShownIndexes;	//  Live.lastShownIndexes=Live.lastShownIndexes.replace("{\"matchId\":\""+matchId+"\", \"isYouth\":\""+youth+"\", \"index\":\""+"[0-9]*"+"\"},\n","pluto");	  alert("Live.lastShownIndexes="+Live.lastShownIndexes);  }*/
};

Live.ParseDeleteMatch = function (response) {
};

/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */

Live.ParseLive = function (response, source) {
  var regStr = "(<Match>(.*?)</Match>)";
 // var regExp;
  var match/*, XMLEventList*/;
//  var found;    var newLastShownIndexes="";    
  try {	  var elapsedTime=0; //added by bigpapy	  	//  var newEvent=false;	  	  var errorMsg = Live.ParseError(response);	  	//  Live.lastShownIndexes="";    //	  alert("Live.Parselive1" + response);	  	//  htlivesight.liveXml= response;
	  if (errorMsg != null) {
		  var server = Live.ParseServer(response);
		  var strings = document.getElementById("strings");		  alert("Live.Parselive2 error" + response);
		  alert(strings.getString("message.error_reading") + " " + server + ": " + errorMsg);
	  }	  	  /**************************************************************************************	   * part added to remove flash and images event before update	   *************************************************************************************/	   htlivesight.Notify.clearImages();	      htlivesight.Notify.clearFlash();	      /**************************************************************************************		   * part added to remove flash and images event before update		   *************************************************************************************/	      
	//  alert("Live.Parselive3" + response);//	  alert ("Time.hattrickTime"+Time.hattrickTime);	  newTime=Time.parseFetchDate(response);	//  if (Live.updating && Live.clockSeconds==0) Time.start(newTime);	  if (newTime>Time.hattrickTime){		  Time.start(newTime);		  }else {			  now = new Date();		//	  console.log("OldTime.hattrickTime: " + Time.hattrickTime);			  Time.hattrickTime= now.setTime(now-(-Time.hattrickDiffTime));		//	  console.log("NewTime.hattrickTime: " + Time.hattrickTime);			  }	//    Time.hattrickTime=newTime;	//	  Live.clockSeconds=Math.round(Math.abs(Time.hattrickTime)/1000)%60;	//  }	 // if ((Live.clockSeconds==0) || (Time.hattrickTime==0)) Time.hattrickTime = Time.parseFetchDate(response);	//  alert ("Time.hattrickTime"+Time.hattrickTime);	  	//  console.log("bigpapy: live_1");	  	  // bigpapy adding for reLive	  if(htlivesight.prefs.other.reLive){		  if(Time.reLiveStartTime == 0) {			  Time.reLiveStartTime = Time.hattrickTime;	//		  Time.reLiveTime=Time.hattrickTime;		  }		  //Used round because elapsedTime<= didn't work.	//	  if (addtime==0) Time.reLiveTime+=60000;		  		  // old line to be removed	//	  elapsedTime=Math.round((Time.hattrickTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addTime;		  // old line to be removed		  	//	  elapsedTime=Math.round((Time.reLiveTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addtime;	//	  alert("elapsedTime:"+elapsedTime);	//	  alert(" Time.reLiveStartTime="+Time.reLiveStartTime+" Time.hattrickTime="+Time.hattrickTime+" addtime="+addtime+" elapsedTime="+ elapsedTime);		  elapsedTime=Live.addTime;//added to have internal minutes.		  		  if (elapsedTime) Time.reLiveMinute=elapsedTime;		  if (elapsedTime>45 && elapsedTime<61) elapsedTime=45;		  if (elapsedTime>60) elapsedTime-=15; //	  alert("Time.reLiveStartTime: " + Time.reLiveStartTime+//			  "elapsedTime: "+ elapsedTime);	  }	  // bigpapy end adding reLive	
	  regExp = new RegExp(regStr, "g");
//	  console.log("bigpapy: live_2");
	  var count = 0;    //	  alert("Live.Parselive5" + response);	  		        matchNodes = response.getElementsByTagName("Match");	  	   //	  alert("Live.Parselive6");
	  // for(;found = regExp.exec(response);) {	  	  // modified by bigpapy//	    alert ("matchNodes.length: "+matchNodes.length);	   //     newlastShownIndexes="{\n\"matches\": [\n";//	  if (Live.lastShownIndexes=="") Live.lastShownIndexes="{\n\"matches\": [\n ]\n }";	  //new json attempt.	//  Live.lastShownIndexes="{\n\"matches\": [ ";	    for(var j=0;j< matchNodes.length ;j++){	  //for(var j=1;j< matchNodes.length ;j=j+2){		 if (Live.updating) htlivesight.Log.Meter(((j+1)/matchNodes.length)*100);		  matchNode = matchNodes[j];		  count++;	//	  console.log("bigpapy: live_3");	//	  alert("j="+j);		  //part added by bigpapy to get viewNew working		  		  try{			//  console.log("bigpapy: live_3.1");			  			  matchId=parseInt(Util.Parse("MatchID", matchNode),10);			  			  matchYouth=Live.ParseYouth(matchNode);			  			  matchDate=Time.parseDate(Util.Parse("MatchDate", matchNode));			  			  matchHome= new Match.side(					  					  Live.ParseHomeTeam(matchNode),					  Live.ParseHomeGoals(matchNode)			  );			  			  matchAway= new Match.side(					  Live.ParseAwayTeam(matchNode),					  Live.ParseAwayGoals(matchNode)			  );			  			  matchYouth=Live.ParseYouth(matchNode);		/*	  matchId=parseInt(Util.Parse("MatchID", matchNode),10);*/		//	  console.log("bigpapy: live_3.11");		  }catch(e){		//	  console.log("bigpapy: live_3.20:"+ e);			  matchId=parseInt(Util.Parse("MatchID", matchNode),10);		//	  console.log("bigpapy: live_3.21");			  matchYouth=Live.ParseYouth(matchNode);		//	  console.log("bigpapy: live_3.22");			  matchDate=Match.List["_"+matchId+"_"+matchYouth].date;		//	  console.log("bigpapy: live_3.23");			  matchHome= new Match.side(					  Match.List["_"+matchId+"_"+matchYouth].home,					 // Match.List["_"+matchId+"_"+matchYouth].home.goals);					  Live.ParseHomeGoals(matchNode));					  			  matchAway= new Match.side(					  Match.List["_"+matchId+"_"+matchYouth].away,					  //Match.List["_"+matchId+"_"+matchYouth].away.goals);					  Live.ParseAwayGoals(matchNode));			  }		  		  
		  match = new Match(
				  //     Util.Parse("<MatchID>(.*?)</MatchID>", found[1]),				  //	  xml.getElementsByTagName("MatchID")[0].textContent,				  matchId,    	        	  
				  //       Time.parseDate(Util.Parse("<MatchDate>(.*?)</MatchDate>", found[1])),				  //	Time.parseDate(xml.getElementsByTagName("MatchDate")[0].textContent),				/*  Time.parseDate(Util.Parse("MatchDate", matchNode)),*/				  matchDate,
				 /* new Match.side(
						  Live.ParseHomeTeam(matchNode),
						  Live.ParseHomeGoals(matchNode)
				  )*/matchHome,
				  /*new Match.side(
						  Live.ParseAwayTeam(matchNode),
						  Live.ParseAwayGoals(matchNode)
				  )*/matchAway,
				  //        new Match.events(Events.ParseList(Util.Parse("<EventList>(.*?)</EventList>", found[1]))),				  //   new Match.events(Events.ParseList(xml.getElementsByTagName("EventList")[0].textContent)),				  new Match.events(Events.ParseList(matchNode.getElementsByTagName("EventList")[0],elapsedTime)), // Re live added elapsedTime by bigpapy.
				  null,
				  matchYouth
		  );	//	  console.log("bigpapy: live_3.5");	//	  alert("j="+j+" match.id:"+match.id);		  		//	  alert("live! match.reLiveByEventEnd="+match.reLiveByEventEnd);		  		// adding code about intelligent update (with next event minute) start:		 // Math.round(Math.abs(Time.hattrickTime)/1000);		 		  try{			  	//		  console.log("bigpapy: live_4");			  		//  lastShownEventIndex = -1;		//  Live.lastShownIndex="{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+lastShownEventIndex+"\"},\n";		  lastShownEventIndex = matchNode.getElementsByTagName("LastShownEventIndex")[0].textContent;		  match.lastShownEventIndex=lastShownEventIndex;		//  console.log("lastShownEventIndex="+lastShownEventIndex);	//	  console.log("bigpapy: live_5");		//  if (lastShownEventIndex >-1)  alert("lastShownEventIndex: "+lastShownEventIndex);/* begin old json		  newlastShownIndex="{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+lastShownEventIndex+"\"},\n";		  if (Live.lastShownIndexes.search("{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth)!=-1){			  Live.lastShownIndexes.replace("{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\"",					  "@");			  Live.lastShownIndexes.replace(/@\d{1,2}/,"{\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+lastShownEventIndex);		  }else{			  Live.lastShownIndexes=Live.lastShownIndexes.slice(0,Live.lastShownIndexes.length-6);			  Live.lastShownIndexes+=newlastShownIndex+" ]\n }";		  }*///end old json		 // match.event.list.first=0;		  //match.event.list.last=0;		  		  		  		 /* nextEventMinute = matchNode.getElementsByTagName("NextEventMinute")[0].textContent;		  alert("nextEventMinute: "+ nextEventMinute);		  if (nextEventMinute>45) nextEventMinute+=15;		  nextUpdate=nextEventMinute*60000+match.date;		  if (Live.nextEventTime==0) Live.nextEventTime=nextUpdate;		  Live.nextEventTime=Math.min(Live.nextEventTime,nextUpdate);*/		//  Live.clockSeconds=((0+Time.hattrickTime)/1000)%60;		  }catch(e){/*console.log("error next event minute: "+ e);*/};		 // alert("match.date= "+ match.date);		 // newlastShownIndexes+=newlastShownIndex;		 // newlastShownIndex="";// adding code about intelligent update (with next event minute) end:	//	  console.log("bigpapy: live_6");		  		 		  if(Time.reLiveMinute==Number.MAX_VALUE)			  match.reLiveByEventEnd=true;		  		  if (match.id) {	//		  alert("Live.Parselive9");		//	  alert("live_first_2: "+ match.event.list.first);
			  match.home.team = Teams.update(match.home.team, match.youth);
			  match.away.team = Teams.update(match.away.team, match.youth);
			  match = Match.Update(match);			  	//		  console.log("bigpapy: live_7");			  		  }		  		// bigpapy adding for reLive		  if((htlivesight.prefs.other.reLive) && (match.date <= Time.reLiveStartTime) && !(match.isFinish)){			  if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)			  { 				  match.home.reLiveGoals=0;    			  match.away.reLiveGoals=0;  //  			  alert("match.home.reLiveGoals="+match.home.reLiveGoals  //  					  +"match.away.reLiveGoals="+match.away.reLiveGoals);			  };			  			 for(var i=match.event.list.first; i<=match.event.list.last; i++){				 event=match.event.list["_"+i];				 if (event.key.A==1 || (event.key.A==0 &&(event.key.BC==55 ||						 event.key.BC==56 || event.key.BC==57))){					 match.getSideById(event.subjectTeamId).reLiveGoals+=1;					 				 };			 };			 match.home.goals=match.home.reLiveGoals;			 match.away.goals=match.away.reLiveGoals;			 			 // added by bigpapy live.xml 1.6			 match.lastShownEventIndex=match.event.list.last;		  }		  // bigpapy end adding reLive
	  }	    	   // newlastShownIndexes+=" ]\n }";	   // if (newlastShownIndexes!="{\n\"matches\": [\n ]\n }")//	    if	(Live.lastShownIndexes=="{\n\"matches\": [\n ]\n }") Live.lastShownIndexes="";//	    alert("lastShownIndexes: "+ Live.lastShownIndexes);
//	  alert("Live.Parselive10");	 //   Live.lastShownIndexes="{\n\"matches\": [ ";	    	//    console.log("bigpapy: live_8");
	  for (matchIndex in Match.List) {//		  alert("Live.Parselive11");
		  match = Match.List[matchIndex];		  	//	  console.log("bigpapy: live_9");		  		  if (match.lastShownEventIndex!=-1)			  newLastShownIndexes+=" {\"matchId\":\""+match.id+"\", \"isYouth\":\""+match.youth+"\", \"index\":\""+match.lastShownEventIndex+"\"}, ";		  	//	  alert("live_first_4: "+ match.event.list.first);
		  if (match.live) {			  		//	  alert("matchIndex="+matchIndex+" match.live="+match.live);	//		  console.log("bigpapy: live_10");			  
			  match.updateTime();			  	//		  console.log("bigpapy: live_11");
	//		  alert("Live.Parselive12");
			  if (source == Live.VIEW) {
				  var first = match.event.list.first;
				  var last = match.event.list.last;				  	//			  console.log("bigpapy: live_12");				  				   	//			  alert("first="+first+" last="+last);          	//			  alert("Live.Parselive13");				  	/** Next line is used in relive mode: if there are event to process it means	 * that live.xml was loaded correctly by HTlivesight so it can be saved in a	 * variable to be used as a fake live.xml in the relive mode updating during	 * the minute.	 */			  				  if(htlivesight.prefs.other.reLive && first<=last) htlivesight.liveXml=response;				  
				  for (var i=first; i<=last; i++) {					//  alert("before i:" + i);
					  htlivesight.Notify.add(match.event.list["_"+i]);				    //  alert("after i:" + i);				//	  if(htlivesight.prefs.other.reLive) htlivesight.liveXml= response;
				  }				  //added by bigpapy: adding first and second half sound start (begin)				  				//added by bigpapy: adding first and second half sound start (end)
			  }
		//	  alert("Live.Parselive14");	//		  console.log("bigpapy: live_13");
			  htlivesight.DOM.UpdateLiveMatch(match);  	//		  console.log("bigpapy: live_14");
		  }

	  }	  if (newLastShownIndexes!="")
	  Live.lastShownIndexes="{\n\"matches\": [ "+newLastShownIndexes+" ]\n }";	//  console.log("Live.lastShownIndexes = "+Live.lastShownIndexes);
    if (source == Live.VIEW) {    	htlivesight.Notify.set();  //    	alert("Live.Parselive15");
    }        htlivesight.errorLoadingXML=false;//alert ("Live.clockSeconds"+Live.clockSeconds);//if (Live.clockSeconds==0) htlivesight.liveXml=response;// synchronization with hattrick server clockif (!htlivesight.prefs.other.reLive){ now=new Date();       Live.clockSeconds=Math.abs(Math.ceil((now/1000)%60+(Time.hattrickDiffTime/1000)%60+1))%60;}// end synchronization with hattrick server clock
  } catch(e) {	  	//  alert("Live.Parselive16");//	  alert("Live.ParseView : " + e);	  htlivesight.errorLoadingXML=true;	//  console.log("Live.ParseView : " + e);//modified by bigpapy
  }

};
 
Live.ParseHomeTeam = function (xml) {
  return new Team(Live.ParseHomeTeamId(xml), Live.ParseHomeTeamName(xml), Live.ParseHomeTeamShortName(xml), (Live.ParseYouth(xml)?Live.ParseYouth(xml):"False"));
};

Live.ParseAwayTeam = function (xml) {
  return new Team(Live.ParseAwayTeamId(xml), Live.ParseAwayTeamName(xml), Live.ParseAwayTeamShortName(xml), (Live.ParseYouth(xml)?Live.ParseYouth(xml):"False"));
};

Live.ParseHomeTeamId = function (xml) {
//  return Util.Parse("<HomeTeamID>(.*?)</HomeTeamID>", xml);	return parseInt(Util.Parse("HomeTeamID", xml),10);
};

Live.ParseHomeTeamName = function (xml) {
//  return Util.Parse("<HomeTeamName>(.*?)</HomeTeamName>", xml);	return Util.Parse("HomeTeamName", xml);
};Live.ParseHomeTeamShortName = function (xml) {//  return Util.Parse("<HomeTeamName>(.*?)</HomeTeamName>", xml);	return Util.Parse("HomeTeamShortName", xml);};

Live.ParseAwayTeamId = function (xml) {
//  return Util.Parse("<AwayTeamID>(.*?)</AwayTeamID>", xml);	return parseInt(Util.Parse("AwayTeamID", xml),10);
};

Live.ParseAwayTeamName = function (xml) {
//  return Util.Parse("<AwayTeamName>(.*?)</AwayTeamName>", xml);	return Util.Parse("AwayTeamName", xml);
};Live.ParseAwayTeamShortName = function (xml) {//  return Util.Parse("<AwayTeamName>(.*?)</AwayTeamName>", xml);	return Util.Parse("AwayTeamShortName", xml);};

Live.ParseHomeGoals = function (xml) {
//  return Util.Parse("<HomeGoals>(.*?)</HomeGoals>", xml);	return parseInt(Util.Parse("HomeGoals", xml),10);
};

Live.ParseAwayGoals = function (xml) {
//  return Util.Parse("<AwayGoals>(.*?)</AwayGoals>", xml);  return parseInt(Util.Parse("AwayGoals", xml),10);
};

Live.ParseYouth = function (xml) {
//  return Util.Parse("<IsYouth>(.*?)</IsYouth>", xml);//	console.log("Into Live.ParseYouth");	return Util.Parse("IsYouth", xml);
};

Live.ParseError = function (xml) {
 // return Util.Parse("<Error>(.*?)</Error>", xml);  return Util.Parse("Error", xml);
};

Live.ParseServer = function (xml) {
//  return Util.Parse("<Server>(.*?)</Server>", xml);  return Util.Parse("Server", xml);
};

Live.ParseMatchId = function (xml) {
  return League.ParseMatchId(xml);
};
