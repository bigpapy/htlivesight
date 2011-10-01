/* ----------------------------------------------------------------
 * objects and funtions for
 * MatchDetails.asp
 * ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
 * Get match by team id data
 * ---------------------------------------------------------------- */
function matchDetails() {
};

matchDetails.arena = function(id, name, weatherId, sold) {
  this.id = id;
  this.name = name;
  this.weatherId = weatherId;
  this.sold = sold;
};
 
matchDetails.HTTPGet = function (matchId, youth) {
 /*   var URL;

    URL = HTTP.hattrickServer + "/Common/chppxml.axd?file=matchdetails"
        + "&matchID=" + matchId
	+ "&isYouth=" + youth;

 //   EventSystem.HTTPRequest(URL, matchDetails.ParseGet, "request.details");
};

matchDetails.ParseGet = function(xml) {
  var regArenaStr = "(<Arena>(?:.*?)</Arena>)";
  var regExp, found;
  var arena, matchId;

  try {
    matchId = matchDetails.parseMatchId(xml);
    if (matchId) {
      regExp = new RegExp(regArenaStr);
      found = regExp.exec(xml);
      arena = matchDetails.parseArena(/*found[1]*/xml);
      youth = Live.ParseYouth(xml);
      match = new Match(matchId, null, null, null, null, arena, youth);
      if (Match.List["_"+matchId+"_"+youth] != null &&
          Match.List["_"+matchId+"_"+youth].home != null) {
        match = Match.Update(match);
        htlivesight.DOM.UpdateLiveMatch(Match.List["_"+matchId+"_"+youth]);  
      } else {
        alert("Error downloading Live XML for match " +matchId);
      }
    }
  } catch(e) {
    alert("Parse MatchDetails: " + e);
  }
};

matchDetails.parseMatchId = function(xml) {
//  return parseInt(Util.Parse("<MatchID>(.*?)</MatchID>", xml), 10);
};

matchDetails.parseArena = function(xml) {
  return new matchDetails.arena(
    matchDetails.parseArenaId(xml),
    matchDetails.parseArenaName(xml),
    null, null
  )
};

matchDetails.parseArenaId = function (xml) {
//  return Util.Parse("<ArenaID>(.*?)</ArenaID>", xml);
};
matchDetails.parseArenaName = function (xml) {
 // return Util.Parse("<ArenaName>(.*?)</ArenaName>", xml);
};
matchDetails.parseWeatherId = function (xml) {
//  return Util.Parse("<WeatherID>(.*?)</WeatherID>", xml);
};
matchDetails.parseSoldTotal = function (xml) {
 // return Util.Parse("<SoldTotal>(.*?)</SoldTotal>", xml);
};

