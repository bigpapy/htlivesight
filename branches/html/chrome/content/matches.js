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
// alert("youth: "+ youth);

    URL = HTTP.hattrickServer + "/Common/chppxml.axd?file=matches"
        + "&teamID=" + teamId
	+ "&isYouth=" + youth;

   // EventSystem.HTTPRequest(URL, Matches.ParseGetByTeam, "request.team");
};

htlivesight.Matches.ParseGetByTeam = function(xml) {
	// Gonzo replace: var regStr = "(<Match\\s(?:.*?)</Match>)";
//	var regStr = "(<Match>(.*?)</Match>)";
//  var regExp, found;
  try {
    var fetchDate = htlivesight.Time.parseFetchDate(xml); 
//    regExp = new RegExp(regStr, "g");
 //   var id, homeTeam, awayTeam;
    var matches = new Array();
    var youth = htlivesight.Live.ParseYouth(xml);
  //  for(;found = regExp.exec(xml);) {
    	matches[matches.length] = htlivesight.Matches.ParseMatch(matchNode, youth);
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
        htlivesight.AddLiveMatch(matches[g].id, matches[g].youth);
    }
    if(htlivesight.Friends.autoFriendCount > 0) {
      htlivesight.Friends.autoFriendCount--;
    }
  } catch(e) {
    alert("Matches.ParseGetByTeam: " + e);
  }
  return null;
};



/* ----------------------------------------------------------------
 * commun Parse functions
 * ---------------------------------------------------------------- */

htlivesight.Matches.ParseMatch = function (xml, youth) {
  //match.type = Matches.ParseMatchType(xml);
 return new htlivesight.Match(
    htlivesight.Live.ParseMatchId(xml),
    htlivesight.League.ParseMatchDate(xml),
    htlivesight.Live.ParseHomeTeam(xml),
    htlivesight.Live.ParseAwayTeam(xml),
    null, null,
    youth
  );


htlivesight.Matches.ParseMatchType = function (xml) {
//  return htlivesight.Util.Parse("<MatchType>(.*?)</MatchType>", xml);
};
 

 