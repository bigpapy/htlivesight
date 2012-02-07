/* ----------------------------------------------------------------
 * Match
 *   constructor and methods        
 * ---------------------------------------------------------------- */
if (!htlivesight) var htlivesight = {};

htlivesight.Match= function(id, date, home, away, event, arena, youth) {
  this.id = id;
  this.date = date;
  this.home = home;
  this.away = away;
  this.event = event;
  this.youth = youth;
  this.window = {
    mode: htlivesight.DOM.mode.minimize,
    tip: true
  };
  this.weather = {
    image:null,
    text:null
  };
  this.arena = {
    name: (arena ? arena.name : null),
    attendance:null
  };
  this.isFinish = false;
  this.timeElapsed="";
  this.live = true;
  this.lastShownEventIndex= [-1,-1];
  this.nextEventTime= 0;
};

htlivesight.Match.List = new Object();

htlivesight.Match.Team = function (id, name, shortName) {
  this.id = id;
  this.name = htlivesight.Util.RemoveAmpersand(name);
  this.shortName = htlivesight.Util.RemoveAmpersand(shortName);
};

htlivesight.Match.side = function(team, goals, formation, tactic) {
  this.team = team;
  this.goals = goals;
  this.formation = formation;
  this.tactic = tactic;
  this.scorers = null;
  this.realGoals=0;
};

htlivesight.Match.events = function(evList) {
  this.list = evList;
  this.dom = new Array();
};

htlivesight.Match.prototype.updateTime = function() {
  this.timeElapsed = htlivesight.Time.getMatchTime(this);
};

htlivesight.Match.prototype.getTeamById = function(teamId) {
  if (this.home.team.id==teamId) {
    return this.home.team;
  } else if (this.away.team.id==teamId){
    return this.away.team; 
  }
  return null;
};

htlivesight.Match.prototype.getSideById = function(teamId) {
  if (this.home.team.id==teamId) {
    return this.home;
  } else if (this.away.team.id==teamId){
    return this.away; 
  }
  return null;
};

htlivesight.Match.prototype.isHomeTeam = function(teamId) {
  if (this.home.team.id==teamId) {
    return true;
  }
  return false;
};

htlivesight.Match.prototype.isAwayTeam = function(teamId) {
  if (this.away.team.id==teamId) {
    return true;
  }
  return false;
};

htlivesight.Match.Update = function (newMatch) {
  var match = htlivesight.Match.List["_"+newMatch.id+"_"+newMatch.youth];
  if (!match) {
    // new match!
    // add match to match list
    match = newMatch;
    htlivesight.Match.List["_"+match.id+"_"+match.youth] = match;
  } else {
    if (newMatch.arena) {
      if (!match.arena) {
        match.arena = newMatch.arena;
      } else {
        if (newMatch.arena.name) {
          match.arena.name = newMatch.arena.name;
        };
        if (newMatch.arena.attendance) {
          match.arena.attendance = newMatch.arena.attendance;
        };
      }
    }

    if (newMatch.home) {
      if (!match.home) {
        match.home=newMatch.home;
        match.home.realGoals=newMatch.home.realGoals;
      } else {
        if(match.home.goals < newMatch.home.goals) match.home.goals = newMatch.home.goals;
        if(match.home.realGoals < newMatch.home.realGoals) match.home.realGoals = newMatch.home.realGoals;
      }
    };

    if (newMatch.away) {
      if (!match.away) {
        match.away=newMatch.away;
        match.away.realGoals=newMatch.away.realGoals;
      } else {
    	  if(match.away.goals < newMatch.away.goals)  match.away.goals = newMatch.away.goals;
    	  if(match.away.realGoals < newMatch.away.realGoals) match.away.realGoals = newMatch.away.realGoals;
      }
    };
    
    if (newMatch.event && newMatch.event.list.last > 0) {
      var i = match.event.list.last+1;
      if (i == 1)
        i = 0;
      match.event.list.first = i;
      for (; i<=newMatch.event.list.last; i++) {
        match.event.list["_" + i] = newMatch.event.list["_" + i];
      }
      match.event.list.last = newMatch.event.list.last;
    }
        
  }

  if (match.event && match.event.list) {
    for (i=match.event.list.first; i <= match.event.list.last; i++) {
      if (match.event.list["_"+i])
        htlivesight.Events.translate(match, match.event.list["_"+i]);
    };
  }
  // added by bigpapy
  
  if (newMatch.lastShownEventIndex) {
      match.lastShownEventIndex=newMatch.lastShownEventIndex;
     };
     
     if (newMatch.reLiveByEventEnd) {
         match.reLiveByEventEnd=newMatch.reLiveByEventEnd;
        }else if(match.reLiveByEventEnd){
        	newMatch.reLiveByEventEnd=match.reLiveByEventEnd;
         }
  // end adding by bigpapy
     
     // new adding by bigpapy (nexteventtime)
     if (newMatch.nextEventTime) {
         match.nextEventTime=newMatch.nextEventTime;
        };
               
     // end adding by bigpapy (nexteventtime)
  return match;
};


