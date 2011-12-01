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
  clockSeconds: 0,    nextEventTime: 0,    addTime: 0,    updating: true,    loop: function() {
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
          htlivesight.Log.Meter(0);        // added by bigpapy to implement smart update time           if (Live.clockSeconds==0) {	   now=new Date();// added to smart update	   if(htlivesight.prefs.other.reLive && Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)Live.addTime+=1;
       if ((Live.nextEventTime-now)<0) {    	   Live.updating=true;    	   Live.view();       }else{    	   Time.hattrickTime=now+Time.hattrickDiffTime;    	   Live.updating=false;    	   Live.ParseLive(htlivesight.liveXml, Live.VIEW);       }// added to smart update   //    if(htlivesight.prefs.other.reLive) Live.addTime+=1;       // no more needed, to be removed***************************************************  //     now=new Date();  //     Live.clockSeconds=Math.abs(Math.round((now/1000)%60+(Time.hattrickDiffTime/1000)%60))%60;       // no more needed, to be removed***************************************************           //   alert("Live.nextEventTime = "+Live.nextEventTime+ "now = "+now+" diff = "+(Live.nextEventTime-now));    //	Live.view();// original line       htlivesight.warningShown = false;  //     alert("Live.nextEventTime = "+Live.nextEventTime+ "now = "+now+" diff = "+(Live.nextEventTime-now));
    }else if(htlivesight.prefs.other.reLive &&     		(Live.clockSeconds%(60/htlivesight.prefs.other.reLiveSpeed)==0)) //added by bigpapy to show events during 60 seconds in relive    {    	Live.updating=false;    	    	Live.addTime+=1;    	    	Live.ParseLive(htlivesight.liveXml, Live.VIEW);    	      	     }    // Synchronization of the HTLS clock with the Hattrick server clock at 40" and 20"    if (Live.clockSeconds%20==0 && !htlivesight.prefs.other.reLive)    {      now=new Date();      Live.clockSeconds=Math.abs((Math.floor(now/1000)%60+Math.floor(Time.hattrickDiffTime/1000)%60))%60;    } // End synchronization of the HTLS clock with the Hattrick server clock at 40" and 20"    
  }
  
};

/* ============================================ */

Live.view = function() {
 // var URL = HTTP.hattrickServer
   //                 + "/Common/chppxml.axd?file=live"
     //               + "&actionType=viewAll"
       //             + "&version=1.4"

 // EventSystem.HTTPRequest(URL, Live.ParseView, "request.live");  var parameters=[["file","live"],                  ["actionType","viewAll"],                  ["version","1.3"]                  ];    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){  Live.ParseView(xml);  });};

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
 //   EventSystem.HTTPRequest(URL, Live.ParseAddMatch, "request.add");	    var parameters=[["file","live"],	    				["actionType","addMatch"],	    				["matchID",matchId],	    				["isYouth",youth],	    				["version","1.3"]	    ];	    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){Live.ParseAddMatch(xml);});
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
 // EventSystem.HTTPRequest(URL, Live.ParseDeleteMatch, "request.delete");  var parameters=[["file","live"],  				["actionType","deleteMatch"],  				["matchID",matchId],  				["isYouth",youth],  				["version","1.3"]  ];  Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){	  Live.ParseDeleteMatch(xml);  });
};

Live.ParseDeleteMatch = function (response) {
};

/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */

Live.ParseLive = function (response, source) {
  var regStr = "(<Match>(.*?)</Match>)";
  var regExp;
  var match, XMLEventList;
  var found;    
  try {	  var elapsedTime=0; //added by bigpapy	  	  var newEvent=false;	  	  var errorMsg = Live.ParseError(response);    //	  alert("Live.Parselive1" + response);	  	//  htlivesight.liveXml= response;
	  if (errorMsg != null) {
		  var server = Live.ParseServer(response);
		  var strings = document.getElementById("strings");		  alert("Live.Parselive2 error" + response);
		  alert(strings.getString("message.error_reading") + " " + server + ": " + errorMsg);
	  }	  	  /**************************************************************************************	   * part added to remove flash and images event for second update	   *************************************************************************************/	   htlivesight.Notify.clearImages();	      htlivesight.Notify.clearFlash();	      /**************************************************************************************		   * part added to remove flash and images event for second update		   *************************************************************************************/	      
	//  alert("Live.Parselive3" + response);//	  alert ("Time.hattrickTime"+Time.hattrickTime);	  newTime=Time.parseFetchDate(response);	  if (Live.updating && Live.clockSeconds==0) Time.start(newTime);	  if (newTime>Time.hattrickTime){		//  Time.start(newTime);		  Time.hattrickTime=newTime;	//	  Live.clockSeconds=Math.round(Math.abs(Time.hattrickTime)/1000)%60;	  }	 // if ((Live.clockSeconds==0) || (Time.hattrickTime==0)) Time.hattrickTime = Time.parseFetchDate(response);	//  alert ("Time.hattrickTime"+Time.hattrickTime);	  	 	  	  // bigpapy adding for reLive	  if(htlivesight.prefs.other.reLive){		  if(Time.reLiveStartTime == 0) {			  Time.reLiveStartTime = Time.hattrickTime;	//		  Time.reLiveTime=Time.hattrickTime;		  }		  //Used round because elapsedTime<= didn't work.	//	  if (addtime==0) Time.reLiveTime+=60000;		  		  // old line to be removed	//	  elapsedTime=Math.round((Time.hattrickTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addTime;		  // old line to be removed		  	//	  elapsedTime=Math.round((Time.reLiveTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed+addtime;	//	  alert("elapsedTime:"+elapsedTime);	//	  alert(" Time.reLiveStartTime="+Time.reLiveStartTime+" Time.hattrickTime="+Time.hattrickTime+" addtime="+addtime+" elapsedTime="+ elapsedTime);		  elapsedTime=Live.addTime;//added to have internal minutes.		  		  if (elapsedTime) Time.reLiveMinute=elapsedTime;		  if (elapsedTime>45 && elapsedTime<61) elapsedTime=45;		  if (elapsedTime>60) elapsedTime-=15; //	  alert("Time.reLiveStartTime: " + Time.reLiveStartTime+//			  "elapsedTime: "+ elapsedTime);	  }	  // bigpapy end adding reLive	
	  regExp = new RegExp(regStr, "g");

	  var count = 0;    //	  alert("Live.Parselive5" + response);	    matchNodes = response.getElementsByTagName("Match");//	  alert("Live.Parselive6");
	  // for(;found = regExp.exec(response);) {	  	  // modified by bigpapy//	    alert ("matchNodes.length: "+matchNodes.length);	    for(var j=0;j< matchNodes.length ;j++){	  //for(var j=1;j< matchNodes.length ;j=j+2){		 if (Live.updating) htlivesight.Log.Meter(((j+1)/matchNodes.length)*100);		  matchNode = matchNodes[j];
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
		  );	//	  alert("j="+j+" match.id:"+match.id);		  if(Time.reLiveMinute==Number.MAX_VALUE){			  match.reLiveByEventEnd=true;		//	  alert("live! match.reLiveByEventEnd="+match.reLiveByEventEnd);		  }		  		// adding code about intelligent update (with next event minute) start:		 // Math.round(Math.abs(Time.hattrickTime)/1000);		  try{		  nextEventMinute = matchNode.getElementsByTagName("NextEventMinute")[0].textContent;		  alert("nextEventMinute: "+ nextEventMinute);		  if (nextEventMinute>45) nextEventMinute+=15;		  nextUpdate=nextEventMinute*60000+match.date;		  if (Live.nextEventTime==0) Live.nextEventTime=nextUpdate;		  Live.nextEventTime=Math.min(Live.nextEventTime,nextUpdate);		//  Live.clockSeconds=((0+Time.hattrickTime)/1000)%60;		  }catch(e){/*alert("error next event minute: "+ e);*/};		 // alert("match.date= "+ match.date);// adding code about intelligent update (with next event minute) end:		  		  if (match.id) {	//		  alert("Live.Parselive9");		//	  alert("live_first_2: "+ match.event.list.first);
			  match.home.team = Teams.update(match.home.team, match.youth);
			  match.away.team = Teams.update(match.away.team, match.youth);
			  match = Match.Update(match);			  		//	  alert("live_first_3: "+ match.event.list.first);
		  }		  		// bigpapy adding for reLive		  if((htlivesight.prefs.other.reLive) && (match.date <= Time.reLiveStartTime) && !(match.isFinish)){			  if (match.home.reLiveGoals==null || match.away.reLiveGoals==null)			  { 				  match.home.reLiveGoals=0;    			  match.away.reLiveGoals=0;  //  			  alert("match.home.reLiveGoals="+match.home.reLiveGoals  //  					  +"match.away.reLiveGoals="+match.away.reLiveGoals);			  };			  			 for(var i=match.event.list.first; i<=match.event.list.last; i++){				 event=match.event.list["_"+i];				 if (event.key.A==1 || (event.key.A==0 &&(event.key.BC==55 ||						 event.key.BC==56 || event.key.BC==57))){					 match.getSideById(event.subjectTeamId).reLiveGoals+=1;					 				 };			 };			 match.home.goals=match.home.reLiveGoals;			 match.away.goals=match.away.reLiveGoals;		  }		  // bigpapy end adding reLive
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
    }        htlivesight.errorLoadingXML=false;//alert ("Live.clockSeconds"+Live.clockSeconds);//if (Live.clockSeconds==0) htlivesight.liveXml=response;/*if (Live.clockSeconds==0){  now=new Date();  Live.clockSeconds=Math.abs((Math.floor(now/1000)%60+Math.floor(Time.hattrickDiffTime/1000)%60))%60;}*/
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
