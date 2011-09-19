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
	+ "&isYouth=" + youth;*/

 //   EventSystem.HTTPRequest(URL, matchDetails.ParseGet, "request.details");        var parameters=[["file","matchdetails"],                    ["matchID",matchId],                    ["isYouth",youth],                           ];    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){matchDetails.ParseGet(xml);});
};

matchDetails.ParseGet = function(xml) {
  var regArenaStr = "(<Arena>(?:.*?)</Arena>)";
  var regExp, found;
  var arena, matchId;

  try {
    matchId = matchDetails.parseMatchId(xml);
    if (matchId) {    	
      regExp = new RegExp(regArenaStr);
      found = regExp.exec(xml);  //   xmlArena = xml.getElementsByTagName("Arena")[0];
      arena = matchDetails.parseArena(/*found[1]*/xml);  //    alert("arena = matchDetails.parseArena(/*found[1]*/xml): " +arena.name);
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
//  return parseInt(Util.Parse("<MatchID>(.*?)</MatchID>", xml), 10);	return parseInt(Util.Parse("MatchID", xml), 10);
};

matchDetails.parseArena = function(xml) {	//	alert("matchDetails.parseArenaName(xml): "+ matchDetails.parseArenaName(xml));
  return new matchDetails.arena(
    matchDetails.parseArenaId(xml),
    matchDetails.parseArenaName(xml),
    null, null
  )
};

matchDetails.parseArenaId = function (xml) {
//  return Util.Parse("<ArenaID>(.*?)</ArenaID>", xml);	return parseInt(Util.Parse("ArenaID", xml), 10);
};
matchDetails.parseArenaName = function (xml) {//alert ("Util.Parse(ArenaName, xml):"+ Util.Parse("ArenaName", xml));
 // return Util.Parse("<ArenaName>(.*?)</ArenaName>", xml);	 return Util.Parse("ArenaName", xml);
};
matchDetails.parseWeatherId = function (xml) {
//  return Util.Parse("<WeatherID>(.*?)</WeatherID>", xml);	return parseInt(Util.Parse("WeatherID", xml),10);
};
matchDetails.parseSoldTotal = function (xml) {
 // return Util.Parse("<SoldTotal>(.*?)</SoldTotal>", xml);	return /*parseInt(*/Util.Parse("SoldTotal", xml)/*,10)*/;// with parseInt it gives error even if sold tickets is a number!
};


