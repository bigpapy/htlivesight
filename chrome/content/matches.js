/* ----------------------------------------------------------------
 * objects and funtions for
 * Matches.asp
 * ---------------------------------------------------------------- */


function Matches() {
};

/* ----------------------------------------------------------------
 * Get match by team id data
 * ---------------------------------------------------------------- */

Matches.HTTPGetByTeam = function (teamId, youth) {
// alert("youth: "+ youth);	/*   var URL;

    URL = HTTP.hattrickServer + "/Common/chppxml.axd?file=matches"
        + "&teamID=" + teamId
	+ "&isYouth=" + youth;*/

   // EventSystem.HTTPRequest(URL, Matches.ParseGetByTeam, "request.team");    var parameters=[    				["file", "matches"],    				["teamID", teamId]    			];    			if (youth == "True")    				parameters.push(["isYouth", "true"]);    	//		alert ("youth " +youth);    Htlivesight.ApiProxy.retrieve(document, parameters, function (xml){Matches.ParseGetByTeam(xml);});
};

Matches.ParseGetByTeam = function(xml) {
	// Gonzo replace: var regStr = "(<Match\\s(?:.*?)</Match>)";
	var regStr = "(<Match>(.*?)</Match>)";
  var regExp, found;
  try {
    var fetchDate = Time.parseFetchDate(xml);      //   alert("fetchDate: " + fetchDate);
    regExp = new RegExp(regStr, "g");
    var id, homeTeam, awayTeam;
    var matches = new Array();
    var youth = Live.ParseYouth(xml); //  alert("youth " + youth);        var matchNodes = xml.getElementsByTagName("Match");      //  alert("dopo xml.getElementsByTagName(Match)");
  //  for(;found = regExp.exec(xml);) {    for(var j=0;j< matchNodes.length ;j++){    	matchNode = matchNodes[j];     
    	matches[matches.length] = Matches.ParseMatch(matchNode, youth);    	
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
    if(Friends.autoFriendCount > 0) {
      if(htlivesight.prefs.matches.friends.within &&
         nearestDiff > htlivesight.prefs.matches.friends.withinHours*Time.HOUR)
        g = -1;
    }
    if(g != -1) {
      if(!(htlivesight.warningShown == true && htlivesight.liveCount >= 20))
        htlivesight.AddLiveMatch(matches[g].id, matches[g].youth);
    }
    if(Friends.autoFriendCount > 0) {
      Friends.autoFriendCount--;
    }
  } catch(e) {
    alert("Matches.ParseGetByTeam: " + e);
  }
  return null;
};



/* ----------------------------------------------------------------
 * commun Parse functions
 * ---------------------------------------------------------------- */

Matches.ParseMatch = function (xml, youth) {
  //match.type = Matches.ParseMatchType(xml);//	alert(" "+ Live.ParseMatchId(xml) +" "+ League.ParseMatchDate(xml) + " "+ Live.ParseHomeTeam(xml)+ " "+Live.ParseAwayTeam(xml));
 return new Match(
    Live.ParseMatchId(xml),
    League.ParseMatchDate(xml),
    Live.ParseHomeTeam(xml),
    Live.ParseAwayTeam(xml),
    null, null,
    youth	
  );
};

Matches.ParseMatchType = function (xml) {    alert ("questa funzione non viene mai chiamata: Matches.ParseMatchType");
//  return Util.Parse("<MatchType>(.*?)</MatchType>", xml);		return xml.getElementsByTagName("MatchType")[0].textContent;
};
 

 
