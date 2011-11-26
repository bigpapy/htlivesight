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
    
    document.getElementById("myGoalCheck").checked = prefs.personalization.myGoalCheck;
    document.getElementById("myGoalSoundPath").disabled = !prefs.personalization.myGoalCheck;
    
    document.getElementById("opGoalCheck").checked = prefs.personalization.opGoalCheck;
    document.getElementById("opGoalSoundPath").disabled = !prefs.personalization.opGoalCheck;
    
    document.getElementById("frGoalCheck").checked = prefs.personalization.frGoalCheck;
    document.getElementById("frGoalSoundPath").disabled = !prefs.personalization.frGoalCheck;
    
    document.getElementById("opfrGoalCheck").checked = prefs.personalization.opfrGoalCheck;
    document.getElementById("opfrGoalSoundPath").disabled = !prefs.personalization.opfrGoalCheck;
    
    document.getElementById("otGoalCheck").checked = prefs.personalization.otGoalCheck;
    document.getElementById("otGoalSoundPath").disabled = !prefs.personalization.otGoalCheck;
    
    document.getElementById("missGoalCheck").checked = prefs.personalization.missGoalCheck;
    document.getElementById("missGoalSoundPath").disabled = !prefs.personalization.missGoalCheck;
    
    document.getElementById("sunCheck").checked = prefs.personalization.sunCheck;
    document.getElementById("sunSoundPath").disabled = !prefs.personalization.sunCheck;
    
    document.getElementById("rainCheck").checked = prefs.personalization.rainCheck;
    document.getElementById("rainSoundPath").disabled = !prefs.personalization.rainCheck;
    
    document.getElementById("overcastCheck").checked = prefs.personalization.overcastCheck;
    document.getElementById("overcastSoundPath").disabled = !prefs.personalization.overcastCheck;
    
    document.getElementById("fewCloudsCheck").checked = prefs.personalization.fewCloudsCheck;
    document.getElementById("fewCloudsSoundPath").disabled = !prefs.personalization.fewCloudsCheck;
    
    document.getElementById("myBooCheck").checked = prefs.personalization.myBooCheck;
    document.getElementById("myBooSoundPath").disabled = !prefs.personalization.myBooCheck;
    
    document.getElementById("opBooCheck").checked = prefs.personalization.opBooCheck;
    document.getElementById("opBooSoundPath").disabled = !prefs.personalization.opBooCheck;
    
    document.getElementById("whistleStartCheck").checked = prefs.personalization.whistleStartCheck;
    document.getElementById("whistleStartSoundPath").disabled = !prefs.personalization.whistleStartCheck;
    
    document.getElementById("whistle2Check").checked = prefs.personalization.whistle2Check;
    document.getElementById("whistle2SoundPath").disabled = !prefs.personalization.whistle2Check;
    
    document.getElementById("whistle3Check").checked = prefs.personalization.whistle3Check;
    document.getElementById("whistle3SoundPath").disabled = !prefs.personalization.whistle3Check;
    
    document.getElementById("whistleCheck").checked = prefs.personalization.whistleCheck;
    document.getElementById("whistleSoundPath").disabled = !prefs.personalization.whistleCheck;
    
    document.getElementById("hattrickCheck").checked = prefs.personalization.hattrickCheck;
    document.getElementById("hattrickSoundPath").disabled = !prefs.personalization.hattrickCheck;
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
        if(document.getElementById("myGoalCheck").checked) {
        document.getElementById("myGoalSoundPath").disabled = false;
        prefs.personalization.myGoalSoundPath = document.getElementById("myGoalSoundPath").value.replace("@","");
        document.getElementById("myGoalSoundPath").value=prefs.personalization.myGoalSoundPath;
        //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
        prefs.personalization.myGoalCheck=true;
        } else {
        	prefs.personalization.myGoalSoundPath = "@"+document.getElementById("myGoalSoundPath").value;
        	document.getElementById("myGoalSoundPath").disabled = true;
        	prefs.personalization.myGoalCheck=false;
          };
      },
      
      myGoalReset: function() {
    	  var prefs = htlivesight.Settings.preferences;
    	  document.getElementById("myGoalSoundPath").value="chrome://htlivesight/content/sound/cheer_8k.wav";
    	  prefs.personalization.myGoalSoundPath = document.getElementById("myGoalSoundPath").value;
      },

    opGoalSound: function() {
          var prefs = htlivesight.Settings.preferences;
          if(document.getElementById("opGoalCheck").checked) {
              document.getElementById("opGoalSoundPath").disabled = false;
              prefs.personalization.opGoalSoundPath = document.getElementById("opGoalSoundPath").value.replace("@","");
              document.getElementById("opGoalSoundPath").value=prefs.personalization.opGoalSoundPath;
              //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
              prefs.personalization.opGoalCheck=true;
              } else {
              	prefs.personalization.opGoalSoundPath = "@"+document.getElementById("opGoalSoundPath").value;
              	document.getElementById("opGoalSoundPath").disabled = true;
              	prefs.personalization.opGoalCheck=false;
                };
        },
    
        opGoalReset: function() {
      	  var prefs = htlivesight.Settings.preferences;
      	  document.getElementById("opGoalSoundPath").value="chrome://htlivesight/content/sound/cheer1.wav";
      	  prefs.personalization.opGoalSoundPath = document.getElementById("opGoalSoundPath").value;
        },

    frGoalSound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("frGoalCheck").checked) {
         document.getElementById("frGoalSoundPath").disabled = false;
         prefs.personalization.frGoalSoundPath = document.getElementById("frGoalSoundPath").value.replace("@","");
         document.getElementById("frGoalSoundPath").value=prefs.personalization.frGoalSoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.frGoalCheck=true;
         } else {
         	prefs.personalization.frGoalSoundPath = "@"+document.getElementById("frGoalSoundPath").value;
         	document.getElementById("frGoalSoundPath").disabled = true;
         	prefs.personalization.frGoalCheck=false;
           };
   },
   
   frGoalReset: function() {
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("frGoalSoundPath").value="chrome://htlivesight/content/sound/goal.wav";
   	  prefs.personalization.frpGoalSoundPath = document.getElementById("frGoalSoundPath").value;
     },

    opfrGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("opfrGoalCheck").checked) {
          document.getElementById("opfrGoalSoundPath").disabled = false;
          prefs.personalization.opfrGoalSoundPath = document.getElementById("opfrGoalSoundPath").value.replace("@","");
          document.getElementById("opfrGoalSoundPath").value=prefs.personalization.opfrGoalSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.opfrGoalCheck=true;
          } else {
          	prefs.personalization.opfrGoalSoundPath = "@"+document.getElementById("opfrGoalSoundPath").value;
          	document.getElementById("opfrGoalSoundPath").disabled = true;
          	prefs.personalization.opfrGoalCheck=false;
            };
    },
    
    opfrGoalReset: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("opfrGoalSoundPath").value="chrome://htlivesight/content/sound/applause.wav";
     	  prefs.personalization.opfrGoalSoundPath = document.getElementById("opfrGoalSoundPath").value;
       },

    otGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("otGoalCheck").checked) {
          document.getElementById("otGoalSoundPath").disabled = false;
          prefs.personalization.otGoalSoundPath = document.getElementById("otGoalSoundPath").value.replace("@","");
          document.getElementById("otGoalSoundPath").value=prefs.personalization.otGoalSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.otGoalCheck=true;
          } else {
          	prefs.personalization.otGoalSoundPath = "@"+document.getElementById("otGoalSoundPath").value;
          	document.getElementById("otGoalSoundPath").disabled = true;
          	prefs.personalization.otGoalCheck=false;
            };
    },
    
    otGoalReset: function() {
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("otGoalSoundPath").value="chrome://htlivesight/content/sound/ovation.wav";
   	  prefs.personalization.otGoalSoundPath = document.getElementById("otGoalSoundPath").value;
     },

    missGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("missGoalCheck").checked) {
          document.getElementById("missGoalSoundPath").disabled = false;
          prefs.personalization.missGoalSoundPath = document.getElementById("missGoalSoundPath").value.replace("@","");
          document.getElementById("missGoalSoundPath").value=prefs.personalization.missGoalSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.missGoalCheck=true;
          } else {
          	prefs.personalization.missGoalSoundPath = "@"+document.getElementById("missGoalSoundPath").value;
          	document.getElementById("missGoalSoundPath").disabled = true;
          	prefs.personalization.missGoalCheck=false;
            };
    },
    
    missGoalReset: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("missGoalSoundPath").value="chrome://htlivesight/content/sound/miss.wav";
     	  prefs.personalization.missGoalSoundPath = document.getElementById("missGoalSoundPath").value;
       },

    sunSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("sunCheck").checked) {
          document.getElementById("sunSoundPath").disabled = false;
          prefs.personalization.sunSoundPath = document.getElementById("sunSoundPath").value.replace("@","");
          document.getElementById("sunSoundPath").value=prefs.personalization.sunSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.sunCheck=true;
          } else {
          	prefs.personalization.sunSoundPath = "@"+document.getElementById("sunSoundPath").value;
          	document.getElementById("sunSoundPath").disabled = true;
          	prefs.personalization.sunCheck=false;
            };
    },
    
    sunReset: function() {
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("sunSoundPath").value="chrome://htlivesight/content/sound/sun.wav";
   	  prefs.personalization.sunSoundPath = document.getElementById("sunSoundPath").value;
     },

    rainSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("rainCheck").checked) {
          document.getElementById("rainSoundPath").disabled = false;
          prefs.personalization.rainSoundPath = document.getElementById("rainSoundPath").value.replace("@","");
          document.getElementById("rainSoundPath").value=prefs.personalization.rainSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.rainCheck=true;
          } else {
          	prefs.personalization.rainSoundPath = "@"+document.getElementById("rainSoundPath").value;
          	document.getElementById("rainSoundPath").disabled = true;
          	prefs.personalization.rainCheck=false;
            };
    },
    
    rainReset: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("rainSoundPath").value="chrome://htlivesight/content/sound/rain.wav";
     	  prefs.personalization.rainSoundPath = document.getElementById("rainSoundPath").value;
       },

    overcastSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("overcastCheck").checked) {
          document.getElementById("overcastSoundPath").disabled = false;
          prefs.personalization.overcastSoundPath = document.getElementById("overcastSoundPath").value.replace("@","");
          document.getElementById("overcastSoundPath").value=prefs.personalization.overcastSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.overcastCheck=true;
          } else {
          	prefs.personalization.overcastSoundPath = "@"+document.getElementById("overcastSoundPath").value;
          	document.getElementById("overcastSoundPath").disabled = true;
          	prefs.personalization.overcastCheck=false;
            };
    },
    
    overcastReset: function() {
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("overcastSoundPath").value="chrome://htlivesight/content/sound/overcast.wav";
   	  prefs.personalization.overcastSoundPath = document.getElementById("overcastSoundPath").value;
     },

    fewCloudSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("fewCloudsCheck").checked) {
          document.getElementById("fewCloudsSoundPath").disabled = false;
          prefs.personalization.fewCloudsSoundPath = document.getElementById("fewCloudsSoundPath").value.replace("@","");
          document.getElementById("fewCloudsSoundPath").value=prefs.personalization.fewCloudsSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.fewCloudsCheck=true;
          } else {
          	prefs.personalization.fewCloudsSoundPath = "@"+document.getElementById("fewCloudsSoundPath").value;
          	document.getElementById("fewCloudsSoundPath").disabled = true;
          	prefs.personalization.fewCloudsCheck=false;
            };
    },
    
    fewCloudReset: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("fewCloudsSoundPath").value="chrome://htlivesight/content/sound/fewClouds.wav";
     	  prefs.personalization.fewCloudsSoundPath = document.getElementById("fewCloudsSoundPath").value;
       },

    myBooSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("myBooCheck").checked) {
          document.getElementById("myBooSoundPath").disabled = false;
          prefs.personalization.myBooSoundPath = document.getElementById("myBooSoundPath").value.replace("@","");
          document.getElementById("myBooSoundPath").value=prefs.personalization.myBooSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.myBooCheck=true;
          } else {
          	prefs.personalization.myBooSoundPath = "@"+document.getElementById("myBooSoundPath").value;
          	document.getElementById("myBooSoundPath").disabled = true;
          	prefs.personalization.myBooCheck=false;
            };
    },
    
    myBooReset: function() {
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("myBooSoundPath").value="chrome://htlivesight/content/sound/boo.wav";
   	  prefs.personalization.myBooSoundPath = document.getElementById("myBooSoundPath").value;
     },

    opBooSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("opBooCheck").checked) {
          document.getElementById("opBooSoundPath").disabled = false;
          prefs.personalization.opBooSoundPath = document.getElementById("opBooSoundPath").value.replace("@","");
          document.getElementById("opBooSoundPath").value=prefs.personalization.myBooSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.opBooCheck=true;
          } else {
          	prefs.personalization.opBooSoundPath = "@"+document.getElementById("opBooSoundPath").value;
          	document.getElementById("opBooSoundPath").disabled = true;
          	prefs.personalization.opBooCheck=false;
            };
    },
    
    opBooReset: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("opBooSoundPath").value="chrome://htlivesight/content/sound/OpBoo.wav";
     	  prefs.personalization.opBooSoundPath = document.getElementById("opBooSoundPath").value;
       },

    whistleStartSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("whistleStartCheck").checked) {
          document.getElementById("whistleStartSoundPath").disabled = false;
          prefs.personalization.whistleStartSoundPath = document.getElementById("whistleStartSoundPath").value.replace("@","");
          document.getElementById("whistleStartSoundPath").value=prefs.personalization.whistleStartSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.whistleStartCheck=true;
          } else {
          	prefs.personalization.whistleStartSoundPath = "@"+document.getElementById("whistleStartSoundPath").value;
          	document.getElementById("whistleStartSoundPath").disabled = true;
          	prefs.personalization.whistleStartCheck=false;
            };
    },
    
    whistleStartReset: function() {
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("whistleStartSoundPath").value="chrome://htlivesight/content/sound/whistle_start.wav";
   	  prefs.personalization.whistleStartSoundPath = document.getElementById("whistleStartSoundPath").value;
     },

    whistle2Sound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("whistle2Check").checked) {
          document.getElementById("whistle2SoundPath").disabled = false;
          prefs.personalization.whistle2SoundPath = document.getElementById("whistle2SoundPath").value.replace("@","");
          document.getElementById("whistle2SoundPath").value=prefs.personalization.whistle2SoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.whistle2Check=true;
          } else {
          	prefs.personalization.whistle2SoundPath = "@"+document.getElementById("whistle2SoundPath").value;
          	document.getElementById("whistle2SoundPath").disabled = true;
          	prefs.personalization.whistle2Check=false;
            };
    },
    
    whistle2Reset: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("whistle2SoundPath").value="chrome://htlivesight/content/sound/whistle2.wav";
     	  prefs.personalization.whistle2SoundPath = document.getElementById("whistle2SoundPath").value;
       },

   whistle3Sound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("whistle3Check").checked) {
         document.getElementById("whistle3SoundPath").disabled = false;
         prefs.personalization.whistle3SoundPath = document.getElementById("whistle3SoundPath").value.replace("@","");
         document.getElementById("whistle3SoundPath").value=prefs.personalization.whistle3SoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.whistle3Check=true;
         } else {
         	prefs.personalization.whistle3SoundPath = "@"+document.getElementById("whistle3SoundPath").value;
         	document.getElementById("whistle3SoundPath").disabled = true;
         	prefs.personalization.whistle3Check=false;
           };
   },
   
   whistle3Reset: function() {
  	  var prefs = htlivesight.Settings.preferences;
  	  document.getElementById("whistle3SoundPath").value="chrome://htlivesight/content/sound/whistle3.wav";
  	  prefs.personalization.whistle3SoundPath = document.getElementById("whistle3SoundPath").value;
    },

   whistleSound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("whistleCheck").checked) {
         document.getElementById("whistleSoundPath").disabled = false;
         prefs.personalization.whistleSoundPath = document.getElementById("whistleSoundPath").value.replace("@","");
         document.getElementById("whistleSoundPath").value=prefs.personalization.whistleSoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.whistleCheck=true;
         } else {
         	prefs.personalization.whistleSoundPath = "@"+document.getElementById("whistleSoundPath").value;
         	document.getElementById("whistleSoundPath").disabled = true;
         	prefs.personalization.whistleCheck=false;
           };
   },
   
   whistleReset: function() {
	  	  var prefs = htlivesight.Settings.preferences;
	  	  document.getElementById("whistleSoundPath").value="chrome://htlivesight/content/sound/whistle.wav";
	  	  prefs.personalization.whistleSoundPath = document.getElementById("whistleSoundPath").value;
	    },

   hattrickSound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("hattrickCheck").checked) {
         document.getElementById("hattrickSoundPath").disabled = false;
         prefs.personalization.hattrickSoundPath = document.getElementById("hattrickSoundPath").value.replace("@","");
         document.getElementById("hattrickSoundPath").value=prefs.personalization.hattrickSoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.hattrickCheck=true;
         } else {
         	prefs.personalization.hattrickSoundPath = "@"+document.getElementById("hattrickSoundPath").value;
         	document.getElementById("hattrickSoundPath").disabled = true;
         	prefs.personalization.hattrickCheck=false;
           };
   },

   hattrickReset: function() {
	  	  var prefs = htlivesight.Settings.preferences;
	  	  document.getElementById("hattrickSoundPath").value="chrome://htlivesight/content/sound/tarzan.wav";
	  	  prefs.personalization.hattrickSoundPath = document.getElementById("hattrickSoundPath").value;
	    },

  }
};
