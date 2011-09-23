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
    this.away = new Array(); // array with away events
    this.homeAlert = Events.type.NONE;
    this.awayAlert = Events.type.NONE;
    this.matchAlert = Events.type.NONE;
    this.matchAlertId = 0;
    this.flashCounter=0;
  },
  startTimeoutClear: function() {
      setTimeout("htlivesight.Notify.clearImages()", 45000);
      setTimeout("htlivesight.Notify.clearFlash()", 20000);
  },
  startAlert: function(title, text) {
      setTimeout(htlivesight.Notify.showAlert, (this.alertTimer++)*5000, title, text);
  },
  flash: function() {
    var className, matchEv;
    try {
      if (htlivesight.Notify.flashList.length == 0) return;
      for (var i=0; i<htlivesight.Notify.flashList.length; i++) {
        matchEv = htlivesight.Notify.flashList[i];
        className = (matchEv.flashCounter++ % 2) == 1 ? matchEv.matchAlert.color.cssClass : htlivesight.Notify.color.white.cssClass;
        document.getElementById("placardbox_"+matchEv.match.id+"_"+matchEv.match.youth).className = className;
      }
      setTimeout(htlivesight.Notify.flash, 750);
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
  set: function() {
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
      }
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
                    ? matchEvent.homeAlert : matchEvent.awayAlert);
      matchEvent.matchAlertId = (
                    matchEvent.homeAlert.id < matchEvent.awayAlert.id
                    ? matchEvent.match.home.team.id : matchEvent.match.away.team.id);

      var alertEv = matchEvent.matchAlert; 

      if (htlivesight.prefs.notification.slider) {
        if (alertEv.text) {
          var strings = document.getElementById("strings");
          this.startAlert(strings.getString(alertEv.text),
                            htlivesight.DOM.getTextContent(match.home.team.name)
                            + " " + match.home.goals + " : "
                            + match.away.goals + " "
                            + htlivesight.DOM.getTextContent(match.away.team.name));
        }
      }
      
      if (htlivesight.prefs.notification.sound) {
        if (!htlivesight.prefs.notification.soundOnlyOpened
            || document.getElementById("live_" + matchEvent.match.id+"_"+matchEvent.match.youth).hidden==false) {
 /*       	var startTime = match.date;
            if (alertEv.mysound) {
              alertEv.mysound.play();
            }
          } else {
            if (alertEv.opsound) {
              alertEv.opsound.play();
            }
          }
        }
      }

      if (alertEv.color) {
        this.flashList.push(matchEvent);
      }
    };
    
    
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

