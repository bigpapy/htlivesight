/* ----------------------------------------------------------------
 * Match
 *   constructor and methods        
 * ---------------------------------------------------------------- */

function Match(id, date, home, away, event, arena, youth) {
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
//  this.reLiveByEventEnd= false;
};

Match.List = new Object();

Match.Team = function (id, name) {
  this.id = id;
  this.name = name;
};

Match.side = function(team, goals, formation, tactic) {
  this.team = team;
  this.goals = goals;
  this.formation = formation;
  this.tactic = tactic;
  this.scorers = null;
};

Match.events = function(evList) {
  this.list = evList;
  this.dom = new Array();
};

Match.prototype.updateTime = function() {
  this.timeElapsed = Time.getMatchTime(this);
};

Match.prototype.getTeamById = function(teamId) {
  if (this.home.team.id==teamId) {
    return this.home.team;
  } else if (this.away.team.id==teamId){
    return this.away.team; 
  }
  return null;
};

Match.prototype.getSideById = function(teamId) {
  if (this.home.team.id==teamId) {
    return this.home;
  } else if (this.away.team.id==teamId){
    return this.away; 
  }
  return null;
};

Match.prototype.isHomeTeam = function(teamId) {
  if (this.home.team.id==teamId) {
    return true;
  }
  return false;
};

Match.prototype.isAwayTeam = function(teamId) {
  if (this.away.team.id==teamId) {
    return true;
  }
  return false;
};

Match.Update = function (newMatch) {
  var match = Match.List["_"+newMatch.id+"_"+newMatch.youth];
  if (!match) {
    // new match!
    // add match to match list
    match = newMatch;
    Match.List["_"+match.id+"_"+match.youth] = match;
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
      } else {
        match.home.goals = newMatch.home.goals;
      }
    };

    if (newMatch.away) {
      if (!match.away) {
        match.away=newMatch.away;
      } else {
        match.away.goals = newMatch.away.goals;
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
        Events.translate(match, match.event.list["_"+i]);
    };
  }
  // added by bigpapy
  if (newMatch.reLiveByEventEnd) {
 //     if (!match.reLiveByEventEnd) {
        match.reLiveByEventEnd=newMatch.reLiveByEventEnd;
//      } else {
//        match.away.goals = newMatch.away.goals;
//      }
    };
 // end adding by bigpapy 
  return match;
};


