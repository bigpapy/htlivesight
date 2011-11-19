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
  clockSeconds: 0,    loop: function() {
//	var liveXml="";		Live.clockSeconds = ++Live.clockSeconds % 60;
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
          htlivesight.Log.Meter(0);    
    if (Live.clockSeconds==0) {     		Live.view();    htlivesight.warningShown = false;
    }else if(htlivesight.prefs.other.reLive &&     		(Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)) //added by bigpapy to show events during 60 seconds in relive    {    	//now=""+new Date();    	    	addtime = (Live.clockSeconds/60)*htlivesight.prefs.other.reLiveSpeed; //minutes to add in the relive //   	alert("addtime:"+addtime);    	    	Live.ParseLive(htlivesight.liveXml, Live.VIEW, addtime);    	  //  	alert ("eseguito!");    }
  }
  
};

/* ============================================ */

Live.view = function() {
 // var URL = HTTP.hattrickServer
   //                 + "/Common/chppxml.axd?file=live"
     //               + "&actionType=viewAll"
       //             + "&version=1.4"

 // EventSystem.HTTPRequest(URL, Live.ParseView, "request.live");  var parameters=[["file","live"],                  ["actionType","viewAll"],                  ["version","1.3"]                  ];    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){  Live.ParseView(xml);  });};

Live.ParseView = function (response) {		Live.ParseLive(response, Live.VIEW, 0);	
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
 //   EventSystem.HTTPRequest(URL, Live.ParseAddMatch, "request.add");	    var parameters=[["file","live"],	    				["actionType","addMatch"],	    				["matchID",matchId],	    				["isYouth",youth],	    				["version","1.3"]	    ];	    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){Live.ParseAddMatch(xml);});
  }
};
  
Live.ParseAddMatch = function (response) {
  Live.ParseLive(response, Live.ADD, 0);
};

Live.HTTPDeleteMatch = function (matchId, youth) {
/*  var URL = HTTP.hattrickServer
                    + "/Common/chppxml.axd?file=live"
                    + "&actionType=deleteMatch"
                    + "&matchID=" + matchId
		    + "&isYouth=" + youth
                    + "&version=1.4"; */
 // EventSystem.HTTPRequest(URL, Live.ParseDeleteMatch, "request.delete");  var parameters=[["file","live"],  				["actionType","deleteMatch"],  				["matchID",matchId],  				["isYouth",youth],  				["version","1.3"]  ];  Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){	  Live.ParseDeleteMatch(xml);  });
};

Live.ParseDeleteMatch = function (response) {
};

/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */

Live.ParseLive = function (response, source, addtime) {
  var regStr = "(<Match>(.*?)</Match>)";
  var regExp;
  var match, XMLEventList;
  var found;    
  try {	  var elapsedTime=0; //added by bigpapy	  	  var newEvent=false;	  	  var errorMsg = Live.ParseError(response);    //	  alert("Live.Parselive1" + response);	  	//  htlivesight.liveXml= response;
	  if (errorMsg != null) {
		  var server = Live.ParseServer(response);
		  var strings = document.getElementById("strings");		  alert("Live.Parselive2 error" + response);
		  alert(strings.getString("message.error_reading") + " " + server + ": " + errorMsg);
	  }
	//  alert("Live.Parselive3" + response);//	  alert ("Time.hattrickTime"+Time.hattrickTime);	  if ((Live.clockSeconds==0) || (Time.hattrickTime==0)) Time.hattrickTime = Time.parseFetchDate(response);//	  alert ("Time.hattrickTime"+Time.hattrickTime);	  	 	  	  // bigpapy adding for reLive	  if(htlivesight.prefs.other.reLive){		  if(Time.reLiveStartTime == 0) Time.reLiveStartTime = Time.hattrickTime; 		  //Used round because elapsedTime<= didn't work.		  elapsedTime=Math.round((Time.hattrickTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addtime;	//	  alert("elapsedTime:"+elapsedTime);	//	  alert(" Time.reLiveStartTime="+Time.reLiveStartTime+" Time.hattrickTime="+Time.hattrickTime+" addtime="+addtime+" elapsedTime="+ elapsedTime);		  if (elapsedTime) Time.reLiveMinute=elapsedTime;		  if (elapsedTime>45 && elapsedTime<61) elapsedTime=45;		  if (elapsedTime>60) elapsedTime-=15; //	  alert("Time.reLiveStartTime: " + Time.reLiveStartTime+//			  "elapsedTime: "+ elapsedTime);	  }	  // bigpapy end adding reLive	
	  regExp = new RegExp(regStr, "g");

	  var count = 0;    //	  alert("Live.Parselive5" + response);	    matchNodes = response.getElementsByTagName("Match");//	  alert("Live.Parselive6");
	  // for(;found = regExp.exec(response);) {	  	  // modified by bigpapy//	    alert ("matchNodes.length: "+matchNodes.length);	    for(var j=0;j< matchNodes.length ;j++){	  //for(var j=1;j< matchNodes.length ;j=j+2){		  htlivesight.Log.Meter(((j+1)/matchNodes.length)*100);		  matchNode = matchNodes[j];		//  alert("Live.Parselive7");		//  alert("Util.Parse MatchID" + Util.Parse("MatchID", matchNode));		//  alert("Util.Parse MatchDate" + Time.parseDate(Util.Parse("MatchDate", matchNode)));		//  alert("Live.ParseHomeTeam(matchNode) " + Live.ParseHomeTeam(matchNode));		//  alert("Live.ParseHomeGoals(matchNode)" + Live.ParseHomeGoals(matchNode));		//  alert("Live.ParseAwayTeam(matchNode)" + Live.ParseAwayTeam(matchNode));		//  alert("Live.ParseAwayGoals(matchNode)" + Live.ParseAwayGoals(matchNode));		//  alert("Events.ParseList(matchNode.getElementsByTagName(EventList))"+ Events.ParseList(matchNode.getElementsByTagName("EventList")[0]));		//  alert("Live.ParseYouth(matchNode)"+ Live.ParseYouth(matchNode));		  
		  count++;	//	  alert("j="+j);
		  match = new Match(
				  //     Util.Parse("<MatchID>(.*?)</MatchID>", found[1]),				  //	  xml.getElementsByTagName("MatchID")[0].textContent,				  parseInt(Util.Parse("MatchID", matchNode),10),    	        	  
				  //       Time.parseDate(Util.Parse("<MatchDate>(.*?)</MatchDate>", found[1])),				  //	Time.parseDate(xml.getElementsByTagName("MatchDate")[0].textContent),				  Time.parseDate(Util.Parse("MatchDate", matchNode)),
				  new Match.side(
						  Live.ParseHomeTeam(matchNode),
						  Live.ParseHomeGoals(matchNode)
				  ),
				  new Match.side(
						  Live.ParseAwayTeam(matchNode),
						  Live.ParseAwayGoals(matchNode)
				  ),
				  //        new Match.events(Events.ParseList(Util.Parse("<EventList>(.*?)</EventList>", found[1]))),				  //   new Match.events(Events.ParseList(xml.getElementsByTagName("EventList")[0].textContent)),				  new Match.events(Events.ParseList(matchNode.getElementsByTagName("EventList")[0],elapsedTime)), // Re live added elapsedTime by bigpapy.
				  null,
				  Live.ParseYouth(matchNode)
		  );	//	  alert("j="+j+" match.id:"+match.id);		  if(Time.reLiveMinute==Number.MAX_VALUE){			  match.reLiveByEventEnd=true;		//	  alert("live! match.reLiveByEventEnd="+match.reLiveByEventEnd);		  }		  if (match.id) {	//		  alert("Live.Parselive9");		//	  alert("live_first_2: "+ match.event.list.first);
			  match.home.team = Teams.update(match.home.team, match.youth);
			  match.away.team = Teams.update(match.away.team, match.youth);
			  match = Match.Update(match);			  		//	  alert("live_first_3: "+ match.event.list.first);
		  }		  		// bigpapy adding for reLive		  if((htlivesight.prefs.other.reLive) && (match.date <= Time.reLiveStartTime) && !(match.isFinish)){			  if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)			  { 				  match.home.reLiveGoals=0;    			  match.away.reLiveGoals=0;  //  			  alert("match.home.reLiveGoals="+match.home.reLiveGoals  //  					  +"match.away.reLiveGoals="+match.away.reLiveGoals);			  };			  			 for(var i=match.event.list.first; i<=match.event.list.last; i++){				 event=match.event.list["_"+i];				 if (event.key.A==1 || (event.key.A==0 &&(event.key.BC==55 ||						 event.key.BC==56 || event.key.BC==57))){					 match.getSideById(event.subjectTeamId).reLiveGoals+=1;					 				 };			 };			 match.home.goals=match.home.reLiveGoals;			 match.away.goals=match.away.reLiveGoals;		 }		  // bigpapy end adding reLive
	  }
//	  alert("Live.Parselive10");
	  for (matchIndex in Match.List) {//		  alert("Live.Parselive11");
		  match = Match.List[matchIndex];		  	//	  alert("live_first_4: "+ match.event.list.first);
		  if (match.live) {			  		//	  alert("matchIndex="+matchIndex+" match.live="+match.live);
			  match.updateTime();
	//		  alert("Live.Parselive12");
			  if (source == Live.VIEW) {
				  var first = match.event.list.first;
				  var last = match.event.list.last;				  	//			  alert("first="+first+" last="+last);          	//			  alert("Live.Parselive13");				  	/** Next line is used in relive mode: if there are event to process it means	 * that live.xml was loaded correctly by HTlivesight so it can be saved in a	 * variable to be used as a fake live.xml in the relive mode updating during	 * the minute.	 */			  				  if(htlivesight.prefs.other.reLive && first<=last) htlivesight.liveXml=response;				  
				  for (var i=first; i<=last; i++) {					//  alert("before i:" + i);
					  htlivesight.Notify.add(match.event.list["_"+i]);				    //  alert("after i:" + i);				//	  if(htlivesight.prefs.other.reLive) htlivesight.liveXml= response;
				  }				  //added by bigpapy: adding first and second half sound start (begin)				  				//added by bigpapy: adding first and second half sound start (end)
			  }
		//	  alert("Live.Parselive14");
			  htlivesight.DOM.UpdateLiveMatch(match);  
		  }

	  }

    if (source == Live.VIEW) {    	htlivesight.Notify.set();  //    	alert("Live.Parselive15");
    }htlivesight.errorLoadingXML=false;//alert ("Live.clockSeconds"+Live.clockSeconds);//if (Live.clockSeconds==0) htlivesight.liveXml=response;
 
  } catch(e) {	  	//  alert("Live.Parselive16");	  alert("Live.ParseView : " + e);	  htlivesight.errorLoadingXML=true;	  dump("Live.ParseView : " + e);//modified by bigpapy
  }

};
 
Live.ParseHomeTeam = function (xml) {
  return new Team(Live.ParseHomeTeamId(xml), Live.ParseHomeTeamName(xml), null, (Live.ParseYouth(xml)?Live.ParseYouth(xml):"False"));
};

Live.ParseAwayTeam = function (xml) {
  return new Team(Live.ParseAwayTeamId(xml), Live.ParseAwayTeamName(xml), null, (Live.ParseYouth(xml)?Live.ParseYouth(xml):"False"));
};

Live.ParseHomeTeamId = function (xml) {
//  return Util.Parse("<HomeTeamID>(.*?)</HomeTeamID>", xml);	return parseInt(Util.Parse("HomeTeamID", xml),10);
};

Live.ParseHomeTeamName = function (xml) {
//  return Util.Parse("<HomeTeamName>(.*?)</HomeTeamName>", xml);	return Util.Parse("HomeTeamName", xml);
};

Live.ParseAwayTeamId = function (xml) {
//  return Util.Parse("<AwayTeamID>(.*?)</AwayTeamID>", xml);	return parseInt(Util.Parse("AwayTeamID", xml),10);
};

Live.ParseAwayTeamName = function (xml) {
//  return Util.Parse("<AwayTeamName>(.*?)</AwayTeamName>", xml);	return Util.Parse("AwayTeamName", xml);
};

Live.ParseHomeGoals = function (xml) {
//  return Util.Parse("<HomeGoals>(.*?)</HomeGoals>", xml);	return parseInt(Util.Parse("HomeGoals", xml),10);
};

Live.ParseAwayGoals = function (xml) {
//  return Util.Parse("<AwayGoals>(.*?)</AwayGoals>", xml);  return parseInt(Util.Parse("AwayGoals", xml),10);
};

Live.ParseYouth = function (xml) {
//  return Util.Parse("<IsYouth>(.*?)</IsYouth>", xml);	return Util.Parse("IsYouth", xml);
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
