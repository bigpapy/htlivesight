htlivesight.Notify = {
  FLASH_SECONDS: 20,
  showHeaderImages: true,
  showNotify: true,
  eventList: [], // array of events
  matchEventList: null, // object with list of events grouped by match
  parentList: [], // array with box DOM elements that have images of events
  flashList: [],
  flashCounter: 0,
  alertTimer: 0,
  MatchEvent: function(match) {
    this.match = match;
    this.home = new Array(); // array with home events
    this.away = new Array(); // array with away events        this.neutral = new Array(); // array with neutral events
    this.homeAlert = Events.type.NONE;
    this.awayAlert = Events.type.NONE;        this.neutralAlert = Events.type.NONE;
    this.matchAlert = Events.type.NONE;
    this.matchAlertId = 0;
    this.flashCounter=0;
  },
  startTimeoutClear: function() {	  	  clearImagesTime = 45000;	  	  clearFlashTime = 20000;	  	  if(htlivesight.prefs.other.reLiveSpeed!=1 && htlivesight.prefs.other.reLive)	  {		  clearImagesTime = clearImagesTime/htlivesight.prefs.other.reLiveSpeed;		  		  clearFlashTime = clearFlashTime/htlivesight.prefs.other.reLiveSpeed;	  }
      setTimeout("htlivesight.Notify.clearImages()", clearImagesTime);
      setTimeout("htlivesight.Notify.clearFlash()", clearFlashTime);
  },
  startAlert: function(title, text) {	  	  startAlertTime=5000;	  	  if(htlivesight.prefs.other.reLiveSpeed!=1 && htlivesight.prefs.other.reLive)	  {		  startAlertTime=startAlertTime/htlivesight.prefs.other.reLiveSpeed;	  }
      setTimeout(htlivesight.Notify.showAlert, (this.alertTimer++)*startAlertTime, title, text);
  },
  flash: function() {
    var className, matchEv;
    try {
      if (htlivesight.Notify.flashList.length == 0) return;
      for (var i=0; i<htlivesight.Notify.flashList.length; i++) {
        matchEv = htlivesight.Notify.flashList[i];
        className = (matchEv.flashCounter++ % 2) == 1 ? matchEv.matchAlert.color.cssClass : htlivesight.Notify.color.white.cssClass;
        document.getElementById("placardbox_"+matchEv.match.id+"_"+matchEv.match.youth).className = className;
      }      notifyFlashTime=750;            if(htlivesight.prefs.other.reLiveSpeed!=1 && htlivesight.prefs.other.reLive)	  {    	  notifyFlashTime=notifyFlashTime/htlivesight.prefs.other.reLiveSpeed;	  }            
      setTimeout(htlivesight.Notify.flash, notifyFlashTime);
    } catch(e) {
      htlivesight.Log.error("Notify.flash: " + e);
    }
  },
  showAlert: function(title, text) {
    try {
      var alertService = Components.classes["@mozilla.org/alerts-service;1"]
                        .getService(Components.interfaces.nsIAlertsService);
      alertService.showAlertNotification(
                        htlivesight.Image.htlivesight,
                        title,
                        text,
                        false, "", null);
    } catch (e) {
      htlivesight.Log.error(e);
    }
  },
  add: function(event) {
    if (!event) return;
    if (event.isInfo()) return;
    this.eventList.push(event);
  },
  set: function() {    // check the list of events occurred in the last update
    this.matchEventList = new Object();
    for (var i=0; i<this.eventList.length; i++) {
      var ev=this.eventList[i];
      //if (ev.type.id != 120) continue; // TODO: remove after debug
      var match = ev.match;
      var matchEvent = this.matchEventList["_"+match.id+"_"+match.youth]; 
      if (!matchEvent) {
        matchEvent = new this.MatchEvent(match);
        this.matchEventList["_"+match.id+"_"+match.youth] = matchEvent;
      }
      if (match.isHomeTeam(ev.subjectTeamId)) {
        matchEvent.home.push(ev);
        if (ev.type.id < matchEvent.homeAlert.id) {
          matchEvent.homeAlert = ev.type;
        }
      } else if (match.isAwayTeam(ev.subjectTeamId)) {
        matchEvent.away.push(ev);
        if (ev.type.id < matchEvent.awayAlert.id) {
          matchEvent.awayAlert = ev.type;
        }
      }      else if (ev.subjectTeamId==0) {          matchEvent.neutral.push(ev);          if (ev.type.id < matchEvent.neutralAlert.id) {            matchEvent.neutralAlert = ev.type;          }        }                  
    }    
    // put events's image in the match header 
    for (var matchEventName in this.matchEventList) {
      var matchEvent = this.matchEventList[matchEventName];
      var match = matchEvent.match;
      
      // home team events
      if (matchEvent.home.length > 0) {
        var box = document.getElementById("header_home_team_notify_"+match.id+"_"+match.youth);
        for (var i=0; i<matchEvent.home.length; i++) {
          var ev = matchEvent.home[i];
          img = document.createElement("image");
          box.appendChild(img);
          img.setAttribute("src", ev.type.imageSrc);
          if (matchEvent.homeAlert.id > ev.type.id) matchEvent.homeAlert = ev.type;
        }
        this.parentList.push(box);
      }
      
      // away team events
      if (matchEvent.away.length > 0) {
        var box = document.getElementById("header_away_team_notify_"+match.id+"_"+match.youth);
        for (var i=matchEvent.away.length-1; i>=0; i--) {
          var ev = matchEvent.away[i];
          img = document.createElement("image");
          box.appendChild(img);
          img.setAttribute("src", ev.type.imageSrc);
          if (matchEvent.awayAlert.id > ev.type.id) matchEvent.awayAlert = ev.type;
        }
        this.parentList.push(box);
      }
   
      // put most important(?) event in the slider and plays sound
      matchEvent.matchAlert = (
                    matchEvent.homeAlert.id < matchEvent.awayAlert.id
                    ? matchEvent.homeAlert : matchEvent.awayAlert);            matchEvent.matchAlert = (              matchEvent.neutralAlert.id < matchEvent.matchAlert.id              ? matchEvent.neutralAlert : matchEvent.matchAlert);      
      matchEvent.matchAlertId = (
                    matchEvent.homeAlert.id < matchEvent.awayAlert.id
                    ? matchEvent.match.home.team.id : matchEvent.match.away.team.id);         /*   matchEvent.matchAlertId = (              matchEvent.neutralAlert.id > matchEvent.matchAlertId              ? 0 : matchEvent.matchAlertId); */ 

      var alertEv = matchEvent.matchAlert; 

      if (htlivesight.prefs.notification.slider) {
        if (alertEv.text) {
          var strings = document.getElementById("strings");                    if (matchEvent.matchAlertId == match.home.team.id){
        	this.startAlert(strings.getString(alertEv.text),"***"+
                            htlivesight.DOM.getTextContent(match.home.team.name)
                            + " " + match.home.goals + " : "
                            + match.away.goals + " "
                            + htlivesight.DOM.getTextContent(match.away.team.name));
        } else if (matchEvent.matchAlertId == match.away.team.id){        	        	this.startAlert(strings.getString(alertEv.text),                    htlivesight.DOM.getTextContent(match.home.team.name)                    + " " + match.home.goals + " : "                    + match.away.goals + " "                      + htlivesight.DOM.getTextContent(match.away.team.name)+"***");        	        }
      }            }
      
      if (htlivesight.prefs.notification.sound && !Match.List["_"+match.id+"_"+match.youth].window.mute) {
        if (!htlivesight.prefs.notification.soundOnlyOpened
            || document.getElementById("live_" + matchEvent.match.id+"_"+matchEvent.match.youth).hidden==false) {//bigpapy: added sounds about beginning match and second half.
 /*       	var startTime = match.date;            var time = Time.hattrickTime - startTime;            var seconds = Math.round(time/1000); // time elapsed in seconds            var minutes = Math.round(seconds/60); // time elapsed in minutes            if (minutes==0 || minutes==60) htlivesight.Sound.sample.beginning.play(); *///bigpapy: end adding sound to beginning of match or second half.        	        	if (matchEvent.matchAlertId == Teams.myTeam.id) {
        		if (alertEv.mysound) {
        			alertEv.mysound.play();
        		}
          } else if(match.home.team.id == Teams.myTeam.id || match.away.team.id == Teams.myTeam.id){
        	  if (alertEv.opsound) {
        		  alertEv.opsound.play();
        	  }
          } else if(Friends.isFriend(matchEvent.matchAlertId, match.youth)){        	  if (alertEv.frsound) {                  alertEv.frsound.play();                }          } else if(Friends.isFriend(match.home.team.id, match.youth)||Friends.isFriend(match.away.team.id, match.youth)){        	  if (alertEv.opfrsound) {                  alertEv.opfrsound.play();                }          } else {        	  if (alertEv.otsound) {                  alertEv.otsound.play();              }          }
      }
    }
      if (alertEv.color) {
        this.flashList.push(matchEvent);
      }        }   
    
    
    htlivesight.Log.properties(this.matchEventList, "MatchEventList:");

    this.startTimeoutClear();  
    if (htlivesight.prefs.notification.flash) {
      this.flash();
    }
  },
  clearImages: function() {
    var clearNotify = function(parent, i, parentList) {
      var child;
      while((child = parent.firstChild)) {
        parent.removeChild(child);
      }
      
    };
    if (this.eventList.length != 0) {
      this.parentList.forEach(clearNotify, htlivesight.Notify);
      this.eventList = [];
      this.parentList = [];
    }
    this.alertTimer = 0;
  },
  clearFlash: function() {
    for (var i=0; i<this.flashList.length; i++) {
      document.getElementById("placardbox_"+this.flashList[i].match.id+"_"+this.flashList[i].match.youth).className = "";
      this.flashList[i].flashCounter=0;
    }
    this.flashList = [];
  }
};

htlivesight.Notify.Color = function(css) {
  this.cssClass = css;
};

htlivesight.Notify.color = {
  white: new htlivesight.Notify.Color("background_white"),
  orange: new htlivesight.Notify.Color("background_orange"),
  yellow: new htlivesight.Notify.Color("background_yellow"),
  green: new htlivesight.Notify.Color("background_green"),
  red: new htlivesight.Notify.Color("background_red"),
  grey: new htlivesight.Notify.Color("background_grey"),
  blue: new htlivesight.Notify.Color("background_blue")
};


htlivesight.Notify.Color.prototype.toString = function() {
  return (this.cssClass);
};

htlivesight.Notify.MatchEvent.prototype.toString = function() {
  return (this.match.id + "," + this.home.length + "," + this.away.length);
};


