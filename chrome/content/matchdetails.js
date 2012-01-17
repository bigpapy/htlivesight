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
	+ "&isYouth=" + youth;*/

 //   EventSystem.HTTPRequest(URL, matchDetails.ParseGet, "request.details");    	var parameters=[["file","matchdetails"],                    ["matchID",matchId],                    ["isYouth",youth],                           ];    htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchDetails.ParseGet(xml);});
};

htlivesight.matchDetails.ParseGet = function(xml) {
  var regArenaStr = "(<Arena>(?:.*?)</Arena>)";
 /* var regExp, found;*/
  var arena, matchId;

  try {
    matchId = htlivesight.matchDetails.parseMatchId(xml);
    if (matchId) {    	
      regExp = new RegExp(regArenaStr);
  //    found = regExp.exec(xml);  //   xmlArena = xml.getElementsByTagName("Arena")[0];
      arena = htlivesight.matchDetails.parseArena(/*found[1]*/xml);  //    alert("arena = matchDetails.parseArena(/*found[1]*/xml): " +arena.name);
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
//  return parseInt(htlivesight.Util.Parse("<MatchID>(.*?)</MatchID>", xml), 10);	return parseInt(htlivesight.Util.Parse("MatchID", xml), 10);
};

htlivesight.matchDetails.parseArena = function(xml) {	//	alert("matchDetails.parseArenaName(xml): "+ matchDetails.parseArenaName(xml));
  return new htlivesight.matchDetails.arena(
    htlivesight.matchDetails.parseArenaId(xml),
    htlivesight.matchDetails.parseArenaName(xml),
    null, null
  );
};

htlivesight.matchDetails.parseArenaId = function (xml) {
//  return htlivesight.Util.Parse("<ArenaID>(.*?)</ArenaID>", xml);	return parseInt(htlivesight.Util.Parse("ArenaID", xml), 10);
};
htlivesight.matchDetails.parseArenaName = function (xml) {//alert ("htlivesight.Util.Parse(ArenaName, xml):"+ htlivesight.Util.Parse("ArenaName", xml));
 // return htlivesight.Util.Parse("<ArenaName>(.*?)</ArenaName>", xml);	 return htlivesight.Util.Parse("ArenaName", xml);
};
htlivesight.matchDetails.parseWeatherId = function (xml) {
//  return htlivesight.Util.Parse("<WeatherID>(.*?)</WeatherID>", xml);	return parseInt(htlivesight.Util.Parse("WeatherID", xml),10);
};
htlivesight.matchDetails.parseSoldTotal = function (xml) {
 // return htlivesight.Util.Parse("<SoldTotal>(.*?)</SoldTotal>", xml);	return /*parseInt(*/htlivesight.Util.Parse("SoldTotal", xml)/*,10)*/;// with parseInt it gives error even if sold tickets is a number!
};


