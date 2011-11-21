function htlivesight() {
};


htlivesight.Settings = {
  preferences: null,
  OPEN_IN: {
    TAB: 0,
    WINDOW: 1
  },
  startup: function() {
    htlivesight.Settings.self = this;
    this.preferences = htlivesight.Preferences.get();
    htlivesight.Settings.load();
  },
  load: function() {
    var prefs = htlivesight.Settings.preferences;
    var ndx = prefs.general.openInTab 
              ? htlivesight.Settings.OPEN_IN.TAB
              : htlivesight.Settings.OPEN_IN.WINDOW;
    document.getElementById("openin").selectedIndex=ndx;
    document.getElementById("hattrickServer").value = prefs.general.hattrickServer;
 /*   if(prefs.other.reLive) {
    	document.getElementById("chkGetLeague").disabled=true;
    	prefs.matches.league.get=false;
    }*/
    if (prefs.matches.league.get) {
    	document.getElementById("chkGetLeague").checked=true;
    	if (prefs.matches.league.within) {
    		document.getElementById("txtGetLeagueWithinHours").disabled=false;
    	} else {
    		document.getElementById("txtGetLeagueWithinHours").disabled=true;
    	}
    } else {
    	document.getElementById("chkGetLeague").checked=false;
    	document.getElementById("chkGetLeagueWithin").disabled=true;
    	document.getElementById("txtGetLeagueWithinHours").disabled=true;
   	}
    document.getElementById("chkGetLeagueWithin").checked=prefs.matches.league.within;
    document.getElementById("txtGetLeagueWithinHours").value=prefs.matches.league.withinHours;

    if (prefs.matches.friends.get) {
      document.getElementById("chkGetFriends").checked=true;
      if (prefs.matches.friends.within) {
        document.getElementById("txtGetFriendsWithinHours").disabled=false;
      } else {
        document.getElementById("txtGetFriendsWithinHours").disabled=true;
      };
    } else {
      document.getElementById("chkGetFriends").checked=false;
      document.getElementById("chkGetFriendsWithin").disabled=true;
      document.getElementById("txtGetFriendsWithinHours").disabled=true;
    }
    document.getElementById("chkGetFriendsWithin").checked=prefs.matches.friends.within;
    document.getElementById("txtGetFriendsWithinHours").value=prefs.matches.friends.withinHours;
    
    document.getElementById("chkHdrScorers").checked=prefs.matches.scorers;
    
    document.getElementById("txtMatchWindowSize").value=prefs.matches.windowSize;
    
    document.getElementById("chkSound").checked=prefs.notification.sound;
    if (!prefs.notification.sound) {
      document.getElementById("chkSoundOnlyOpened").disabled=true;
    };
    document.getElementById("chkSoundOnlyOpened").checked = prefs.notification.soundOnlyOpened;
    document.getElementById("chkFlash").checked = prefs.notification.flash;
    document.getElementById("chkSlider").checked = prefs.notification.slider;

    document.getElementById("lang-list").value = prefs.language.locale;
 
    document.getElementById("reverseOrder").checked = prefs.other.bottomUp;
    document.getElementById("printEventKey").checked = prefs.other.printEventKey;
    
    document.getElementById("oldIcons").checked =prefs.personalization.oldIcons;
    document.getElementById("weather").checked =prefs.personalization.weather;
    document.getElementById("whistleTime").checked =prefs.personalization.whistleTime;
    document.getElementById("weatherSE").checked =prefs.personalization.weatherSE;
    document.getElementById("livefoxGoal").checked =prefs.personalization.livefoxGoal;
    document.getElementById("noOpGoal").checked =prefs.personalization.noOpGoal;
    
    document.getElementById("myGoalSoundPath").value = prefs.personalization.myGoalSoundPath;
    document.getElementById("opGoalSoundPath").value = prefs.personalization.opGoalSoundPath;
    document.getElementById("frGoalSoundPath").value = prefs.personalization.frGoalSoundPath;
    document.getElementById("opfrGoalSoundPath").value = prefs.personalization.opfrGoalSoundPath;
    document.getElementById("otGoalSoundPath").value = prefs.personalization.otGoalSoundPath;
    document.getElementById("missGoalSoundPath").value = prefs.personalization.missGoalSoundPath;
    document.getElementById("sunSoundPath").value = prefs.personalization.sunSoundPath;
    document.getElementById("rainSoundPath").value = prefs.personalization.rainSoundPath;
    document.getElementById("overcastSoundPath").value = prefs.personalization.overcastSoundPath;
    document.getElementById("fewCloudsSoundPath").value = prefs.personalization.fewCloudsSoundPath;
    document.getElementById("myBooSoundPath").value = prefs.personalization.myBooSoundPath;
    document.getElementById("opBooSoundPath").value = prefs.personalization.opBooSoundPath;
    document.getElementById("whistleStartSoundPath").value = prefs.personalization.whistleStartSoundPath;
    document.getElementById("whistle2SoundPath").value = prefs.personalization.whistle2SoundPath;
    document.getElementById("whistle3SoundPath").value = prefs.personalization.whistle3SoundPath;
    document.getElementById("whistleSoundPath").value = prefs.personalization.whistleSoundPath;
    document.getElementById("hattrickSoundPath").value = prefs.personalization.hattrickSoundPath;
    
 //   htlivesight.Sound.sample.opgoal = new htlivesight.Sound.sample("chrome://htlivesight/content/sound/sun.wav");
    //   htlivesight.Sound.sample.opgoal.url.spec= "/home/lelone/Scrivania/sun.wav";
 //   document.getElementById("reLive").checked = prefs.other.reLive;
 //   document.getElementById("reLiveSpeed").value = prefs.other.reLiveSpeed;
 
    
  },
  save: function() {
    htlivesight.Log.properties(this.preferences.notification);
    htlivesight.Preferences.save(this.preferences);
  },
  click: {
    btnCancel: function() {
      window.close();
    },
    btnOk: function() {
      htlivesight.Settings.save();
      window.close();
    },
    radopenin: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.general.openInTab = (document.getElementById("openin").selectedIndex==htlivesight.Settings.OPEN_IN.TAB);

    },

    txtfixhattrickserver: function() {
        var prefs = htlivesight.Settings.preferences;
        var value = document.getElementById("hattrickServer").value;//.replace(/\D/g, "");
    //    document.getElementById("hattrickServer").value = value;
        prefs.general.hattrickServer = value;
      },
    
    chkgetleague: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkGetLeague").checked) {
        document.getElementById("chkGetLeagueWithin").disabled = false;
        htlivesight.Settings.click.chkgetleaguewithin();
        prefs.matches.league.get = true;
      } else {
        document.getElementById("chkGetLeagueWithin").disabled = true;
        document.getElementById("txtGetLeagueWithinHours").disabled = true;
        prefs.matches.league.get = false;
      }
    },
    chkgetleaguewithin: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkGetLeagueWithin").checked) {
        document.getElementById("txtGetLeagueWithinHours").disabled = false;
        prefs.matches.league.within = true;
      } else {
        document.getElementById("txtGetLeagueWithinHours").disabled = true;
        prefs.matches.league.within = false;
      };
    },
    txtfixleaguehours: function() {
      var prefs = htlivesight.Settings.preferences;
      var value = document.getElementById("txtGetLeagueWithinHours").value.replace(/\D/g, "");
      document.getElementById("txtGetLeagueWithinHours").value = value;
      prefs.matches.league.withinHours = value;
    },
    chkgetfriends: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkGetFriends").checked) {
        document.getElementById("chkGetFriendsWithin").disabled = false;
        htlivesight.Settings.click.chkgetfriendswithin();
        prefs.matches.friends.get = true;
      } else {
        document.getElementById("chkGetFriendsWithin").disabled = true;
        document.getElementById("txtGetFriendsWithinHours").disabled = true;
        prefs.matches.friends.get = false;
      }
    },
    chkgetfriendswithin: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkGetFriendsWithin").checked) {
        document.getElementById("txtGetFriendsWithinHours").disabled = false;
        prefs.matches.friends.within = true;
      } else {
        document.getElementById("txtGetFriendsWithinHours").disabled = true;
        prefs.matches.friends.within = false;
      };
    },
    txtfixfriendshours: function() {
      var prefs = htlivesight.Settings.preferences;
      var value = document.getElementById("txtGetFriendsWithinHours").value.replace(/\D/g, "");
      document.getElementById("txtGetFriendsWithinHours").value = value;
      prefs.matches.friends.withinHours = value;
    },
    chkhdrscorers: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.matches.scorers = document.getElementById("chkHdrScorers").checked;
    },
    txtfixwindowsize: function() {
      var prefs = htlivesight.Settings.preferences;
      var value = document.getElementById("txtMatchWindowSize").value.replace(/\D/g, "");
      document.getElementById("txtMatchWindowSize").value = value;
      prefs.matches.windowSize = value;
    },
    chkSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkSound").checked) {
        document.getElementById("chkSoundOnlyOpened").disabled = false;
        prefs.notification.sound = true;
      } else {
        document.getElementById("chkSoundOnlyOpened").disabled = true;
        prefs.notification.sound = false;
      };
    },
    chkSoundOnlyOpened: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkSoundOnlyOpened").checked) {
        prefs.notification.soundOnlyOpened = true;
      } else {
        prefs.notification.soundOnlyOpened = false;
      };
    },
    chkFlash: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkFlash").checked) {
        prefs.notification.flash = true;
      } else {
        prefs.notification.flash = false;
      };
    },
    chkSlider: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("chkSlider").checked) {
        prefs.notification.slider = true;
      } else {
        prefs.notification.slider = false;
      };
    },
    selLang: function() {
      var prefs = htlivesight.Settings.preferences;
      var newLang = document.getElementById("lang-list").selectedItem.value;
      prefs.language.locale = newLang;
    },
    //added by bigpapy (begin)
    resetToken: function() {
       	teamId=htlivesight.Preferences.teamId.get();    
    	if (teamId=="") teamId=prompt("TeamId");
       	Htlivesight.ApiProxy.invalidateAccessToken(teamId);//delete access token
       	var strbundle = document.getElementById("stringsauthorize");// internationalization: get local file content.
       	var reset_token=strbundle.getString("reset_token");
     	alert(reset_token);
    },
    //added by bigpapy (end)
    reverseOrder: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("reverseOrder").checked) {
          prefs.other.bottomUp = true;
        } else {
          prefs.other.bottomUp = false;
        };
    },
    
    printEventKey: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("printEventKey").checked) {
          prefs.other.printEventKey = true;
        } else {
          prefs.other.printEventKey = false;
        };
    },
    
    oldIcons: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("oldIcons").checked) {
          prefs.personalization.oldIcons = true;
        } else {
          prefs.personalization.oldIcons = false;
        };
    },
    
    weather: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("weather").checked) {
          prefs.personalization.weather = true;
        } else {
          prefs.personalization.weather = false;
        };
    },
    
    whistleTime: function() {
        	var prefs = htlivesight.Settings.preferences;
            if(document.getElementById("whistleTime").checked) {
              prefs.personalization.whistleTime = true;
            } else {
              prefs.personalization.whistleTime = false;
            };
    },
    
    weatherSE: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("weatherSE").checked) {
          prefs.personalization.weatherSE = true;
        } else {
          prefs.personalization.weatherSE = false;
        };
    },
    
    livefoxGoal: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("livefoxGoal").checked) {
          prefs.personalization.livefoxGoal = true;
        } else {
          prefs.personalization.livefoxGoal = false;
        };
    },
    noOpGoal: function() {
    	var prefs = htlivesight.Settings.preferences;
        if(document.getElementById("noOpGoal").checked) {
          prefs.personalization.noOpGoal = true;
        } else {
          prefs.personalization.noOpGoal = false;
        };
    },
    
    myGoalSound: function() {
        var prefs = htlivesight.Settings.preferences;
        prefs.personalization.myGoalSoundPath = document.getElementById("myGoalSoundPath").value;
      },

    opGoalSound: function() {
          var prefs = htlivesight.Settings.preferences;
          prefs.personalization.opGoalSoundPath = document.getElementById("opGoalSoundPath").value;
        },

    frGoalSound: function() {
     var prefs = htlivesight.Settings.preferences;
     prefs.personalization.frGoalSoundPath = document.getElementById("frGoalSoundPath").value;
   },

    opfrGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.opfrGoalSoundPath = document.getElementById("opfrGoalSoundPath").value;
    },

    otGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.otGoalSoundPath = document.getElementById("otGoalSoundPath").value;
    },

    missGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.missGoalSoundPath = document.getElementById("missGoalSoundPath").value;
    },

    sunSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.sunSoundPath = document.getElementById("sunSoundPath").value;
    },

    rainSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.rainSoundPath = document.getElementById("rainSoundPath").value;
    },

    overcastSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.overcastSoundPath = document.getElementById("overcastSoundPath").value;
    },

    fewCloudSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.fewCloudsSoundPath = document.getElementById("fewCloudsSoundPath").value;
    },

    myBooSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.myBooSoundPath = document.getElementById("myBooSoundPath").value;
    },

    opBooSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.opBooSoundPath = document.getElementById("opBooSoundPath").value;
    },

    whistleStartSound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.whistleStartSoundPath = document.getElementById("whistleStartSoundPath").value;
    },

    whistle2Sound: function() {
      var prefs = htlivesight.Settings.preferences;
      prefs.personalization.whistle2SoundPath = document.getElementById("whistle2SoundPath").value;
    },

   whistle3Sound: function() {
     var prefs = htlivesight.Settings.preferences;
     prefs.personalization.whistle3SoundPath = document.getElementById("whistle3SoundPath").value;
   },

   whistleSound: function() {
     var prefs = htlivesight.Settings.preferences;
     prefs.personalization.whistleSoundPath = document.getElementById("whistleSoundPath").value;
   },

   hattrickSound: function() {
     var prefs = htlivesight.Settings.preferences;
     prefs.personalization.hattrickSoundPath= document.getElementById("hattrickSoundPath").value;
   },

  }
};
