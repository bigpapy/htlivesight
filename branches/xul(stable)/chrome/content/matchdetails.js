/* ----------------------------------------------------------------
 * objects and funtions for
 * MatchDetails.asp
 * ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
 * Get match by team id data
 * ---------------------------------------------------------------- */
htlivesight.matchDetails= function () {
};

htlivesight.matchDetails.arena = function(id, name, weatherId, sold) {
  this.id = id;
  this.name = name;
  this.weatherId = weatherId;
  this.sold = sold;
};
 
htlivesight.matchDetails.HTTPGet = function (matchId, youth) {
 /*   var URL;

    URL = HTTP.hattrickServer + "/Common/chppxml.axd?file=matchdetails"
        + "&matchID=" + matchId
	+ "&isYouth=" + youth;

 //   EventSystem.HTTPRequest(URL, matchDetails.ParseGet, "request.details");
};

htlivesight.matchDetails.ParseGet = function(xml) {
  var regArenaStr = "(<Arena>(?:.*?)</Arena>)";
 /* var regExp, found;*/
  var arena, matchId;

  try {
    matchId = htlivesight.matchDetails.parseMatchId(xml);
    if (matchId) {
      regExp = new RegExp(regArenaStr);
  //    found = regExp.exec(xml);
      arena = htlivesight.matchDetails.parseArena(/*found[1]*/xml);
      htlivesight.matchDetails.youth = htlivesight.Live.ParseYouth(xml);
      match = new htlivesight.Match(matchId, null, null, null, null, arena, htlivesight.matchDetails.youth);
      if (htlivesight.Match.List["_"+matchId+"_"+htlivesight.matchDetails.youth] != null &&
          htlivesight.Match.List["_"+matchId+"_"+htlivesight.matchDetails.youth].home != null) {
        match = htlivesight.Match.Update(match);
        htlivesight.DOM.UpdateLiveMatch(htlivesight.Match.List["_"+matchId+"_"+htlivesight.matchDetails.youth]);  
      } else {
        alert("Error downloading Live XML for match " +matchId);
      }
    }
  } catch(e) {
    alert("Parse htlivesight.MatchDetails: " + e);
  }
};

htlivesight.matchDetails.parseMatchId = function(xml) {
//  return parseInt(htlivesight.Util.Parse("<MatchID>(.*?)</MatchID>", xml), 10);
};

htlivesight.matchDetails.parseArena = function(xml) {
  return new htlivesight.matchDetails.arena(
    htlivesight.matchDetails.parseArenaId(xml),
    htlivesight.matchDetails.parseArenaName(xml),
    null, null
  );
};

htlivesight.matchDetails.parseArenaId = function (xml) {
//  return htlivesight.Util.Parse("<ArenaID>(.*?)</ArenaID>", xml);
};
htlivesight.matchDetails.parseArenaName = function (xml) {
 // return htlivesight.Util.Parse("<ArenaName>(.*?)</ArenaName>", xml);
};
htlivesight.matchDetails.parseWeatherId = function (xml) {
//  return htlivesight.Util.Parse("<WeatherID>(.*?)</WeatherID>", xml);
};
htlivesight.matchDetails.parseSoldTotal = function (xml) {
 // return htlivesight.Util.Parse("<SoldTotal>(.*?)</SoldTotal>", xml);
};

