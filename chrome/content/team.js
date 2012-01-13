if (!htlivesight) var htlivesight = {};

htlivesight.Team = function Team(id, name, shortName, youth) {
  this.id = id;
  this.name = name;
  this.shortName = shortName;
  this.youth = youth;
  this.addTeamToFriendsPopup=null;
};


htlivesight.Teams = {
  myTeam: null,
  list: new Object(),
};


htlivesight.Teams.update = function(newTeam) {
  var team = htlivesight.Teams.list["_"+newTeam.id+"_"+newTeam.youth]; 
  if (!team) {
    team=newTeam;
    htlivesight.Teams.list["_"+team.id+"_"+team.youth] = team;
    team.addTeamToFriendsPopup = htlivesight.DOM.createAddTeamToFriendsPopup(team);
    if (htlivesight.Friends.isFriend(team.id, team.youth, !htlivesight.Friends.STRICT)) {
      htlivesight.Friends.update(team.id, team.name);
    };
  } else {
    if (!team.name) team.name=newTeam.name;
    if (!team.shortName) team.shortName=newTeam.shortName;
  };
  return team;
};

htlivesight.Team.HTTPGetMyData = function () {
 
    var parameters=[["file","teamdetails"],
                     ["teamID", document.getElementById("teamId").value]
    				];
    
    Htlivesight.ApiProxy.retrieve(document, parameters, function (xml){htlivesight.Team.ParseMyData(xml);}); 
};

htlivesight.Team.ParseMyData = function (xml) {

  var myTeam;

  try {
    if (xml) {
      myTeam = htlivesight.Team.ParseTeamData(xml); // return team
      htlivesight.Teams.myTeam = myTeam;
      htlivesight.Teams.update(myTeam);
    } else {
    	// without this if during authorization you get this error message.
    	if (Htlivesight.ApiProxy.authorized(document.getElementById("teamId").value)) alert("team data not found");
      return;
    };
  } catch(e) {
    alert("ParseMyData: " + e);
  }
  htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);

};

htlivesight.Team.ParseMyUserData = function (xml) {
  ;// nothing to do yet
};

htlivesight.Team.ParseTeamData = function (xml) {
  try {
    var id = htlivesight.Team.ParseTeamId(xml);
 //   alert("id: " + id);
    var name = htlivesight.Team.ParseTeamName(xml);
//    alert("name: "+ name);
    var shortName = htlivesight.Team.ParseShortTeamName(xml);
 //   alert("Shortname: " + shortName);
    var youth = htlivesight.Team.ParseYouth(xml);
 //   alert("youth: " + youth);
    team = new htlivesight.Team(id, name, shortName, youth);

   // team.arena = Team.ParseArena(xml); 
  //  team.country = Team.ParseCountry(xml);
    team.league = htlivesight.Team.ParseLeague(xml); //Team.ParseLeague return league

    return team;
  } catch(e) {
    alert("ParseTeamData: " + e);
  }
  return null;
};

htlivesight.Team.ParseTeamId = function (xml) {
	return parseInt(Util.Parse("TeamID", xml), 10);
};

htlivesight.Team.ParseTeamName = function (xml) {
	return Util.Parse("TeamName", xml);
};

htlivesight.Team.ParseShortTeamName = function (xml) {
	return Util.Parse("ShortTeamName", xml);
};

htlivesight.Team.ParseYouth = function (xml) {
	return "False";
};


// this function is never used
htlivesight.Team.ParseArena = function (xml) {
  var id, name;
  try {
 
	  id = parseInt(Util.Parse("ArenaID",xml),10);
	  alert("ArenaID: " + id);
		  
	  name = Util.Parse("ArenaName",xml);
	  alert("Arenaname: "+ name);	  
	  
	  var arena = new Arena(id, name);
    return arena;
  } catch(e) { alert("Team.ParseArena: " + e);
  }
  return null;
};


// this function is never used.
htlivesight.Team.ParseCountry = function (xml) {
  var id, name;
  try {
	  
	  id = parseInt(Util.Parse("LeagueID",xml),10);
	  alert("LeagueID: "+ id);
	  
	  name = Util.Parse("LeagueName",xml);
	  alert("LeagueName: "+ name);
	  
    var country = new Country(id, name);
    return country;
  } catch(e) { alert("Team.ParseCountry: " + e);
  }
  return null;
};

htlivesight.Team.ParseLeague = function (xml) {
  var id, name, level;
  try {
	  
    id = parseInt(Util.Parse("LeagueLevelUnitID",xml),10);
 //   alert("LeagueLevelUnitID: "+ id);
 
    name = Util.Parse("LeagueLevelUnitName",xml);
 //   alert("LeagueLevelUnitName: "+ name);
 
     level = parseInt(Util.Parse("LeagueLevel",xml),10);
//    alert("LeagueLevel: " + level);
    
    var league = new htlivesight.League(id, name, level);
    return league;
  } catch(e) {
    alert("Team.ParseLeague: " + e);
  }
  return null;
};


