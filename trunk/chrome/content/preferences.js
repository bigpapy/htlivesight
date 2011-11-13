/*
- preferences
  - general
    - openInTab
    - username
    - friendsList
  - matches
    - league
      - get
      - within
      - withinHours
    - friends
      - get
      - within
      - withinHours
    - scorers
    - windowSize
  - notification
    - sound
    - soundOnlyOpened
    - flash
    - slider
*/

htlivesight.Preferences = function() {
  service = null;
};

htlivesight.Preferences.root = function() {
  this.general = new htlivesight.Preferences.general();
  this.matches = new htlivesight.Preferences.matches();
  this.notification = new htlivesight.Preferences.notification();
  this.language = new htlivesight.Preferences.language();    this.other = new htlivesight.Preferences.other();    this.personalization = new htlivesight.Preferences.personalization();
};

htlivesight.Preferences.general = function() {
  this.openInTab = true;
  this.friendsList="";
  this.teamId = "";    this.hattrickServer = "";
};

htlivesight.Preferences.matches = function(l, f) {
  this.league = new htlivesight.Preferences.matches.league();
  this.friends = new htlivesight.Preferences.matches.friends();
  this.scorers = true;
  this.windowSize = 3;
};

htlivesight.Preferences.matches.league = function() {
  this.get = true;
  this.within = true;
  this.withinHours = 24;
};

htlivesight.Preferences.matches.friends = function() {
  this.get = true;
  this.within = true;
  this.withinHours = 24;
};

htlivesight.Preferences.notification = function() {
  this.sound = true;
  this.soundOnlyOpened = true;
  this.flash = true;
  this.slider = true;
};

htlivesight.Preferences.language = function() {
  this.locale = "en-US";
};
htlivesight.Preferences.other = function() {	this.bottomUp = false;		this.reLive = false;		this.reLiveSpeed = 1;		this.reliveByEvent = false;		this.printEventKey = false;};	htlivesight.Preferences.personalization = function() {		this.oldIcons = false;		this.weather = true;		this.whistleTime = true;		this.weatherSE = true;}
htlivesight.Preferences.start = function() {
  try {

    if (!htlivesight.Preferences.service) {
      htlivesight.Preferences.service = Components.classes["@mozilla.org/preferences-service;1"].
        getService(Components.interfaces.nsIPrefBranch);
    }
  } catch(e) {
    htlivesight.Log.warn("Cannot start preferences: " + e);
  }
    
};

htlivesight.Preferences.get = function() {
  htlivesight.Preferences.start();
  var prefs = new htlivesight.Preferences.root(); 
  htlivesight.Preferences.load(prefs);
  return prefs;
};

htlivesight.Preferences.load = function(prefs) {
    htlivesight.Preferences.start();
    var service = htlivesight.Preferences.service;
    
    try {
      prefs.general.openInTab = service.getBoolPref("htlivesight.openInTab");
      prefs.general.friendsList = htlivesight.Preferences.friends.get();            prefs.general.hattrickServer = service.getCharPref("htlivesight.general.hattrickServer");
    
      prefs.matches.league.get = service.getBoolPref("htlivesight.matches.league.get");
      prefs.matches.league.within = service.getBoolPref("htlivesight.matches.league.within");
      prefs.matches.league.withinHours = service.getIntPref("htlivesight.matches.league.withinHours");
    
      prefs.matches.friends.get = service.getBoolPref("htlivesight.matches.friends.get");
      prefs.matches.friends.within = service.getBoolPref("htlivesight.matches.friends.within");
      prefs.matches.friends.withinHours = service.getIntPref("htlivesight.matches.friends.withinHours");

      prefs.matches.scorers = service.getBoolPref("htlivesight.matches.scorers");
      prefs.matches.windowSize = service.getIntPref("htlivesight.matches.windowSize");
  
      prefs.notification.sound = service.getBoolPref("htlivesight.notification.sound");
      prefs.notification.soundOnlyOpened = service.getBoolPref("htlivesight.notification.soundOnlyOpened");
      prefs.notification.flash = service.getBoolPref("htlivesight.notification.flash");
      prefs.notification.slider = service.getBoolPref("htlivesight.notification.slider");
      
      prefs.language.locale = service.getCharPref("general.useragent.locale");                  prefs.other.bottomUp = service.getBoolPref("htlivesight.other.bottomUp");            prefs.other.reLive = service.getBoolPref("htlivesight.other.reLive");            prefs.other.reLiveSpeed = service.getIntPref("htlivesight.other.reLiveSpeed");            prefs.other.reLiveByEvent = service.getBoolPref("htlivesight.other.reLiveByEvent");      prefs.other.printEventKey = service.getBoolPref("htlivesight.other.printEventKey");            prefs.personalization.oldIcons = service.getBoolPref("htlivesight.personalization.oldIcons");            prefs.personalization.weather = service.getBoolPref("htlivesight.personalization.weather");            prefs.personalization.whistleTime = service.getBoolPref("htlivesight.personalization.whistleTime");            prefs.personalization.weatherSE = service.getBoolPref("htlivesight.personalization.weatherSE");       //     prefs.personalization.oldIcons ? htlivesight.img_name_prefix="old_" : htlivesight.img_name_prefix="";          } catch(e) {
      htlivesight.Log.warn("Cannot load preferences: " + e);
    }

    try {
      prefs.general.teamId = htlivesight.Preferences.teamId.get();
    } catch(e) {
      htlivesight.Log.warn("Cannot load teamId: " + e);
    }
};

htlivesight.Preferences.save = function(prefs) {
  try {
    htlivesight.Log.trace("saving preferences...");
    htlivesight.Preferences.start();
    var s = htlivesight.Preferences.service;
    
    s.setBoolPref("htlivesight.openInTab", prefs.general.openInTab);
    htlivesight.Preferences.friends.save(prefs.general.friendsList);
    s.setCharPref("htlivesight.general.hattrickServer", prefs.general.hattrickServer);        
    s.setBoolPref("htlivesight.matches.league.get",prefs.matches.league.get);
    s.setBoolPref("htlivesight.matches.league.within",prefs.matches.league.within);
    s.setIntPref("htlivesight.matches.league.withinHours",prefs.matches.league.withinHours);
  
    s.setBoolPref("htlivesight.matches.friends.get",prefs.matches.friends.get);
    s.setBoolPref("htlivesight.matches.friends.within",prefs.matches.friends.within);
    s.setIntPref("htlivesight.matches.friends.withinHours",prefs.matches.friends.withinHours);

    s.setBoolPref("htlivesight.matches.scorers",prefs.matches.scorers);
    s.setIntPref("htlivesight.matches.windowSize",prefs.matches.windowSize);

    s.setBoolPref("htlivesight.notification.sound",prefs.notification.sound);
    s.setBoolPref("htlivesight.notification.soundOnlyOpened",prefs.notification.soundOnlyOpened);
    s.setBoolPref("htlivesight.notification.flash",prefs.notification.flash);
    s.setBoolPref("htlivesight.notification.slider",prefs.notification.slider);
    
    s.setCharPref("general.useragent.locale", prefs.language.locale);
    s.setBoolPref("htlivesight.other.bottomUp", prefs.other.bottomUp);        s.setBoolPref("htlivesight.other.reLive", prefs.other.reLive);        s.setIntPref("htlivesight.other.reLiveSpeed", prefs.other.reLiveSpeed);        s.setBoolPref("htlivesight.other.reLiveByEvent", prefs.other.reLiveByEvent);        s.setBoolPref("htlivesight.other.printEventKey", prefs.other.printEventKey);        s.setBoolPref("htlivesight.personalization.oldIcons", prefs.personalization.oldIcons);        s.setBoolPref("htlivesight.personalization.weather", prefs.personalization.weather);        s.setBoolPref("htlivesight.personalization.whistleTime", prefs.personalization.whistleTime);        s.setBoolPref("htlivesight.personalization.weatherSE", prefs.personalization.weatherSE);        
    htlivesight.Preferences.teamId.save(prefs.general.teamId);
    htlivesight.Log.trace("...done");

  } catch(e) {
    htlivesight.Log.warn("Cannot save preferences: " + e);
  }
};



htlivesight.Preferences.friends = {
  get: function() {
    var friends="";
    try {
      htlivesight.Preferences.start();
      var service = htlivesight.Preferences.service;
      friends = service.getCharPref("htlivesight.friendsList");
    } catch(e) {
      htlivesight.Log.warn("cannot load friends. " + e);
    }
    return friends;
  
  },
  save: function(friends) {
    try {
      htlivesight.Preferences.start();
      var service = htlivesight.Preferences.service;
      service.setCharPref("htlivesight.friendsList", friends);
    } catch(e) {
      htlivesight.Log.warn("cannot save friends. " + e);
    }
  }
};

htlivesight.Preferences.teamId = {
  get: function() {
    var teamId="";
    try {
      htlivesight.Preferences.start();
      var service = htlivesight.Preferences.service;
      teamId = service.getCharPref("htlivesight.teamId");
    } catch(e) {
      htlivesight.Log.warn("cannot load teamId. " + e);
    }
    return teamId;
  
  },
  save: function(teamId) {
    try {
      htlivesight.Preferences.start();
      var service = htlivesight.Preferences.service;
      service.setCharPref("htlivesight.teamId", teamId);
    } catch(e) {
      htlivesight.Log.warn("cannot save teamId. " + e);
    }
  }
};// added by bigpapy to save and load Re-live htlivesight.Preferences.ReLive = {		  get: function() {		    var reLive=false;		    try {		      htlivesight.Preferences.start();		      var service = htlivesight.Preferences.service;		      reLive = service.getBoolPref("htlivesight.other.reLive");		    } catch(e) {		      htlivesight.Log.warn("cannot load ReLive options. " + e);		    }		    return reLive;		  		  },		  save: function(reLive, reLiveSpeed, reLiveByEvent) {		    try {		      htlivesight.Preferences.start();		      var service = htlivesight.Preferences.service;		      service.setBoolPref("htlivesight.other.reLive", reLive);		      		      service.setIntPref("htlivesight.other.reLiveSpeed", reLiveSpeed);		      		      service.setBoolPref("htlivesight.other.reLiveByEvent", reLiveByEvent);		    } catch(e) {		      htlivesight.Log.warn("cannot save teamId. " + e);		    }		  }		};
// end adding by bigpapy about relive in htlivesight.js//It's highly probable this function isn't used anymore
htlivesight.Preferences.password = {
  get: function() {
    var outHost = new Object();
    var outUser = new Object();
    var outPass = new Object();
    
    try {
      if ("@mozilla.org/passwordmanager;1" in Components.classes) {
        // Password Manager exists so this is not Firefox 3 (could be Firefox 2, Netscape, SeaMonkey, etc).
        var passwordmanager = Components.classes["@mozilla.org/passwordmanager;1"]
                                        .createInstance(Components.interfaces.nsIPasswordManagerInternal);
        passwordmanager.findPasswordEntry("htlivesight.xpi", "username", "", outHost, outUser, outPass);
      }
      else if ("@mozilla.org/login-manager;1" in Components.classes) {
        // Login Manager exists so this is Firefox 3
        var loginManager = Components.classes["@mozilla.org/login-manager;1"]
                                     .getService(Components.interfaces.nsILoginManager);
        var logins = loginManager.findLogins({}, "chrome://htlivesight", null, "Hattrick Security Code");
        
        outPass.value = logins[0].password;
      }
    } catch(e) {
      // Usually means no security code saved
      htlivesight.Log.warn("cannot get security code. " + e);
      outPass.value = "";
    }
    return outPass.value;
  },
  save: function(username, password) {
    if ("@mozilla.org/passwordmanager;1" in Components.classes) {
      var passwordManager = Components.classes["@mozilla.org/passwordmanager;1"]
          .createInstance(Components.interfaces.nsIPasswordManager);
      try {
        passwordManager.removeUser("htlivesight.xpi","username");
      } catch(e) {
        htlivesight.Log.warn("cannot remove security code. " + e);
      }
      try {
        passwordManager.addUser("htlivesight.xpi","username", password);
      } catch(e) {
        htlivesight.Log.warn("cannot save security code. " + e);
      }
    }
    else if ("@mozilla.org/login-manager;1" in Components.classes) {   
      var loginManager = Components.classes["@mozilla.org/login-manager;1"]
                                   .getService(Components.interfaces.nsILoginManager);
                                   
      try {
        var logins = loginManager.findLogins({}, "chrome://htlivesight", null, "Hattrick Security Code");
        loginManager.removeLogin(logins[0]);
      } catch(e) {
        htlivesight.Log.warn("cannot remove security code. " + e);
      }
      try {
        var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
                                                     Components.interfaces.nsILoginInfo,
                                                     "init");

        var loginInfo = new nsLoginInfo("chrome://htlivesight", null, "Hattrick Security Code",
                                        username, password, "", "");
        loginManager.addLogin(loginInfo);
      } catch(e) {
        htlivesight.Log.warn("cannot save security code. " + e);
      }
    }    
  }
};




