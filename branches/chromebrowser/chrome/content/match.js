/* ----------------------------------------------------------------
 * Match
 *   constructor and methods        
 * ---------------------------------------------------------------- */
if (!htlivesight) var htlivesight = {};

htlivesight.Match= function(id, date, home, away, event, arena, youth, subs) {
  this.id = id;
  this.date = date;
  this.home = home;
  this.away = away;
  this.event = event;
  this.youth = youth;
  this.substitutions = subs;
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
	  this.booked = null;
	  this.sent_off = null;
	  this.free_kick = 0;
	  this.free_kick_goal = 0;
	  this.penalty = 0;
	  this.penalty_goal = 0;
	  this.right = 0;
	  this.right_goal = 0;
	  this.center = 0;
	  this.center_goal = 0;
	  this.left = 0;
	  this.left_goal = 0;
	  this.occasion = 0;
	  this.special_event = 0;
	  this.special_event_goal = 0;
	  this.realGoals=0;
	  this.yellow=0;
	  this.red=0;
	  this.injured=0;
	  this.possession_1=0;
	  this.possession_2=0;
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
	  
	// added by bigpapy to get substitutions.
      if (newMatch.substitutions) {
          match.substitutions=newMatch.substitutions;
      }
	  // added by bigpapy to get substitutions.
	  
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
          match.home.lineUp=newMatch.home.lineUp; // store home team lineup in global variable if not present
          match.home.free_kick = newMatch.home.free_kick;
          match.home.free_kick_goal = newMatch.home.free_kick_goal;
          match.home.penalty = newMatch.home.penalty;
          match.home.penalty_goal = newMatch.home.penalty_goal;
          match.home.right = newMatch.home.right;
          match.home.right_goal = newMatch.home.right_goal;
          match.home.center = newMatch.home.center;
          match.home.center_goal = newMatch.home.center_goal;
          match.home.left = newMatch.home.left;
          match.home.left_goal = newMatch.home.left_goal;
          match.home.special_event = newMatch.home.special_event;
          match.home.special_event_goal = newMatch.home.special_event_goal;
          match.home.possession_1 = newMatch.home.possession_1;
          match.home.possession_2 = newMatch.home.possession_2;
      } else {
    	  if(match.home.goals < newMatch.home.goals) match.home.goals = newMatch.home.goals;

          if(match.home.free_kick < newMatch.home.free_kick) match.home.free_kick = newMatch.home.free_kick;
          if(match.home.free_kick_goal < newMatch.home.free_kick_goal) match.home.free_kick_goal = newMatch.home.free_kick_goal;
          if(match.home.penalty < newMatch.home.penalty) match.home.penalty = newMatch.home.penalty;
          if(match.home.penalty_goal < newMatch.home.penalty_goal) match.home.penalty_goal = newMatch.home.penalty_goal;
          if(match.home.right < newMatch.home.right) match.home.right = newMatch.home.right;
          if(match.home.right_goal < newMatch.home.right_goal) match.home.right_goal = newMatch.home.right_goal;
          if(match.home.center < newMatch.home.center) match.home.center = newMatch.home.center;
          if(match.home.center_goal < newMatch.home.center_goal) match.home.center_goal = newMatch.home.center_goal;
          if(match.home.left < newMatch.home.left) match.home.left = newMatch.home.left;
          if(match.home.left.goal < newMatch.home.left_goal) match.home.left_goal = newMatch.home.left_goal;
          if(match.home.special_event_goal < newMatch.home.special_event_goal) match.home.special_event_goal = newMatch.home.special_event_goal;
          if(match.home.special_event < newMatch.home.special_event) match.home.special_event = newMatch.home.special_event;
          if(match.home.lineUp[0].update < newMatch.home.lineUp[0].update) match.home.lineUp=newMatch.home.lineUp; // store home team lineup in global variable if the stored one is undefined.
          if(match.home.possession_1 < newMatch.home.possession_1) match.home.possession_1 = newMatch.home.possession_1;
          if(match.home.possession_2 < newMatch.home.possession_2) match.home.possession_2 = newMatch.home.possession_2;
      }
    };

    if (newMatch.away) {
      if (!match.away) {
    	  match.away=newMatch.away;
          match.away.realGoals=newMatch.away.realGoals;
          match.away.lineUp=newMatch.away.lineUp; // store away team lineup in global variable if the stored one is undefined.
          match.away.free_kick = newMatch.away.free_kick;
          match.away.free_kick_goal = newMatch.away.free_kick_goal;
          match.away.penalty = newMatch.away.penalty;
          match.away.penalty_goal = newMatch.away.penalty_goal;
          match.away.right = newMatch.away.right;
          match.away.right_goal = newMatch.away.right_goal;
          match.away.center = newMatch.away.center;
          match.away.center_goal = newMatch.away.center_goal;
          match.away.left = newMatch.away.left;
          match.away.left_goal = newMatch.away.left_goal;
          match.away.special_event = newMatch.away.special_event;
          match.away.special_event_goal = newMatch.away.special_event_goal;
          match.away.possession_1 = newMatch.away.possession_1;
          match.away.possession_2 = newMatch.away.possession_2;
      } else {
    	  if(match.away.goals < newMatch.away.goals)  match.away.goals = newMatch.away.goals;
    	  if(match.away.realGoals < newMatch.away.realGoals) match.away.realGoals = newMatch.away.realGoals;

    	  if(match.away.free_kick < newMatch.away.free_kick) match.away.free_kick = newMatch.away.free_kick;
    	  if(match.away.free_kick_goal < newMatch.away.free_kick_goal) match.away.free_kick_goal = newMatch.away.free_kick_goal;
          if(match.away.penalty < newMatch.away.penalty) match.away.penalty = newMatch.away.penalty;
          if(match.away.penalty_goal < newMatch.away.penalty_goal) match.away.penalty_goal = newMatch.away.penalty_goal;
          if(match.away.right < newMatch.away.right) match.away.right = newMatch.away.right;
          if(match.away.right_goal < newMatch.away.right_goal) match.away.right_goal = newMatch.away.right_goal;
          if(match.away.center < newMatch.away.center) match.away.center = newMatch.away.center;
          if(match.away.left < newMatch.away.left) match.away.left = newMatch.away.left;
          if(match.away.special_event < newMatch.away.special_event) match.away.special_event = newMatch.away.special_event;
          if(match.away.special_event_goal < newMatch.away.special_event_goal) match.away.special_event_goal = newMatch.away.special_event_goal;
          if(match.away.possession_1 < newMatch.away.possession_1) match.away.possession_1 = newMatch.away.possession_1;
          if(match.away.possession_2 < newMatch.away.possession_2) match.away.possession_2 = newMatch.away.possession_2;
    	  
    	  if(match.away.lineUp[0].update < newMatch.away.lineUp[0].update) match.away.lineUp= newMatch.away.lineUp;

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


