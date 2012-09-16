/* ----------------------------------------------------------------
 * objects and funtions for
 * Matches.asp
 * ---------------------------------------------------------------- */


htlivesight.Matches =function() {
};

/* ----------------------------------------------------------------
 * Get match by team id data
 * ---------------------------------------------------------------- */

htlivesight.Matches.HTTPGetByTeam = function (teamId, youth) {
// alert("youth: "+ youth);	/*   var URL;

    URL = HTTP.hattrickServer + "/Common/chppxml.axd?file=matches"
        + "&teamID=" + teamId
	+ "&isYouth=" + youth;*/

   // EventSystem.HTTPRequest(URL, Matches.ParseGetByTeam, "request.team");  var parameters=[    				["file", "matches"],    	              ["version","2.6"],    				["teamID", teamId]    			];    			if ((youth == "True")||(youth=="youth")||(youth=="Youth")){parameters.push(["isYouth", "true"]);/*alert("id= "+ teamId+" youth= "+ youth);*/}    				//alert("id= "+ teamId+" youth= "+ youth);    htlivesight.ApiProxy.retrieve(document, parameters, function (xml){htlivesight.Matches.ParseGetByTeam(xml,youth);});
};

htlivesight.Matches.ParseGetByTeam = function(xml,youth) {
	// Gonzo replace: var regStr = "(<Match\\s(?:.*?)</Match>)";
//	var regStr = "(<Match>(.*?)</Match>)";
//  var regExp, found;
  try {
    var fetchDate = htlivesight.Time.parseFetchDate(xml);      //   alert("fetchDate: " + fetchDate);
//    regExp = new RegExp(regStr, "g");
 //   var id, homeTeam, awayTeam;
    var matches = new Array();
  //  var sourceSystem = sourceSystem; //  alert("youth " + youth);        var matchNodes = xml.getElementsByTagName("Match");      //  alert("dopo xml.getElementsByTagName(Match)");
  //  for(;found = regExp.exec(xml);) {    for(var j=0;j< matchNodes.length ;j++){    var	matchNode = matchNodes[j];        var sourceSystem= htlivesight.Matches.ParseSourceSystem(matchNode);     
    	matches[matches.length] = htlivesight.Matches.ParseMatch(matchNode, sourceSystem);    	
    }      
    var diffDate, nearestDiff=Number.MAX_VALUE;
    var g=-1, i=0;
    for (i=0; i<matches.length; i++) {
      diffDate = Math.abs(matches[i].date - fetchDate);
      if (diffDate < nearestDiff) {
        nearestDiff = diffDate;
        g = i;
      }
    };
    if(htlivesight.Friends.autoFriendCount > 0) {
      if(htlivesight.prefs.matches.friends.within &&
         nearestDiff > htlivesight.prefs.matches.friends.withinHours*htlivesight.Time.HOUR)
        g = -1;
    }
    if(g != -1) {
      if(!(htlivesight.warningShown == true && htlivesight.liveCount >= 20))
        htlivesight.AddLiveMatch(matches[g].id, matches[g].sourceSystem);
    }
    if(htlivesight.Friends.autoFriendCount > 0) {
      htlivesight.Friends.autoFriendCount--;
    }
  } catch(e) {
    alert("Matches.ParseGetByTeam: " + e);	  console.log("Matches.ParseGetByTeam: " + e);	  // relive error removed, to test again.
  }
  return null;
};



/* ----------------------------------------------------------------
 * commun Parse functions
 * ---------------------------------------------------------------- */

htlivesight.Matches.ParseMatch = function (xml, sourceSystem) {
  //match.type = Matches.ParseMatchType(xml);//	alert(" "+ Live.ParseMatchId(xml) +" "+ League.ParseMatchDate(xml) + " "+ Live.ParseHomeTeam(xml)+ " "+Live.ParseAwayTeam(xml));
 return new htlivesight.Match(
    htlivesight.Live.ParseMatchId(xml),
    htlivesight.League.ParseMatchDate(xml),
    htlivesight.Live.ParseHomeTeam(xml),
    htlivesight.Live.ParseAwayTeam(xml),
    null, null,
    sourceSystem	
  );
};

htlivesight.Matches.ParseMatchType = function (xml) {    alert ("questa funzione non viene mai chiamata: Matches.ParseMatchType");
//  return htlivesight.Util.Parse("<MatchType>(.*?)</MatchType>", xml);		return xml.getElementsByTagName("MatchType")[0].textContent;
};htlivesight.Matches.ParseSourceSystem = function (xml) {//    alert ("questa funzione non viene mai chiamata: Matches.ParseMatchType");//  return htlivesight.Util.Parse("<MatchType>(.*?)</MatchType>", xml);	//alert("Into Matches.ParseSourceSystem: Sourcesystem="+ xml.getElementsByTagName("SourceSystem")[0].textContent);	return xml.getElementsByTagName("SourceSystem")[0].textContent;};
 

 
