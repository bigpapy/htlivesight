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
        prefs.personalization.myGoalSoundPath = document.getElementById("myGoalSoundPath").value.replace(/@/g,"");
        document.getElementById("myGoalSoundPath").value=prefs.personalization.myGoalSoundPath;
        prefs.personalization.myGoalCheck=true;
        //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
        } else {
        	prefs.personalization.myGoalSoundPath = "@"+document.getElementById("myGoalSoundPath").value;
        	document.getElementById("myGoalSoundPath").value="@"+document.getElementById("myGoalSoundPath").value;
        	document.getElementById("myGoalSoundPath").disabled = true;
        	prefs.personalization.myGoalCheck=false;
          };
       
      },
      
      myGoalReset: function() {
    	  var prefix="@";
    	  if(document.getElementById("myGoalCheck").checked) prefix="";
    	  var prefs = htlivesight.Settings.preferences;
    	  document.getElementById("myGoalSoundPath").value=prefix+"chrome://htlivesight/content/sound/cheer_8k.wav";
    	  prefs.personalization.myGoalSoundPath = document.getElementById("myGoalSoundPath").value;
    	  document.getElementById("myGoalSoundPathBrowse").value="";
    	 
      },
      
      myGoalSoundFile: function() {
    	  var prefs = htlivesight.Settings.preferences;
    	  soundPath=document.getElementById("myGoalSoundPathBrowse").value;
  			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
  			document.getElementById("myGoalSoundPath").value=soundPath;
  			prefs.personalization.myGoalSoundPath = soundPath;
  		  },
    	      
      myGoalPlay: function() {
    	  try {
    			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
    			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
    			soundPath=document.getElementById("myGoalSoundPath").value;
    		//	if (soundPath.search("chrome:")==-1) soundPath="file://"+soundPath;
    			soundService.play(ioService.newURI(soundPath, null, null));
    			return;
    		} catch(e) {}
      },
      
   /*   prova: function() {
    	  alert("works!");
    	  document.getElementById("myGoalSoundPathHidden").focus();
    	  alert("works2!");
    	  document.getElementById("myGoalSoundPath").value=document.getElementById("myGoalSoundPathHidden").value;
      },*/

    opGoalSound: function() {
          var prefs = htlivesight.Settings.preferences;
          if(document.getElementById("opGoalCheck").checked) {
              document.getElementById("opGoalSoundPath").disabled = false;
              prefs.personalization.opGoalSoundPath = document.getElementById("opGoalSoundPath").value.replace(/@/g,"");
              document.getElementById("opGoalSoundPath").value=prefs.personalization.opGoalSoundPath;
              //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
              prefs.personalization.opGoalCheck=true;
              } else {
              	prefs.personalization.opGoalSoundPath = "@"+document.getElementById("opGoalSoundPath").value;
              	document.getElementById("opGoalSoundPath").value = "@"+document.getElementById("opGoalSoundPath").value;
              	document.getElementById("opGoalSoundPath").disabled = true;
              	prefs.personalization.opGoalCheck=false;
                };
        },
    
        opGoalReset: function() {
      	  var prefix="@";
    	  if(document.getElementById("opGoalCheck").checked) prefix="";
      	  var prefs = htlivesight.Settings.preferences;
      	  document.getElementById("opGoalSoundPath").value=prefix+"chrome://htlivesight/content/sound/cheer1.wav";
      	  prefs.personalization.opGoalSoundPath = document.getElementById("opGoalSoundPath").value;
      	  document.getElementById("opGoalSoundPathBrowse").value="";
        },

        opGoalPlay: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("opGoalSoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },

        opGoalSoundFile: function() {
      	  var prefs = htlivesight.Settings.preferences;
      	  soundPath=document.getElementById("opGoalSoundPathBrowse").value;
    			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
    			document.getElementById("opGoalSoundPath").value=soundPath;
    			prefs.personalization.opGoalSoundPath = soundPath;
    		  },

        
        frGoalSound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("frGoalCheck").checked) {
         document.getElementById("frGoalSoundPath").disabled = false;
         prefs.personalization.frGoalSoundPath = document.getElementById("frGoalSoundPath").value.replace(/@/g,"");
         document.getElementById("frGoalSoundPath").value=prefs.personalization.frGoalSoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.frGoalCheck=true;
         } else {
         	prefs.personalization.frGoalSoundPath = "@"+document.getElementById("frGoalSoundPath").value;
         	document.getElementById("frGoalSoundPath").value = "@"+document.getElementById("frGoalSoundPath").value;
         	document.getElementById("frGoalSoundPath").disabled = true;
         	prefs.personalization.frGoalCheck=false;
           };
   },
   
   frGoalReset: function() {
 	  var prefix="@";
	  if(document.getElementById("frGoalCheck").checked) prefix="";
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("frGoalSoundPath").value=prefix+"chrome://htlivesight/content/sound/goal.wav";
   	  prefs.personalization.frGoalSoundPath = document.getElementById("frGoalSoundPath").value;
   	  document.getElementById("frGoalSoundPathBrowse").value="";
     },

     frGoalPlay: function() {
     	  try {
     			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
     			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
     			soundService.play(ioService.newURI(document.getElementById("frGoalSoundPath").value, null, null));
     			return;
     		} catch(e) {}
       },
       
       frGoalSoundFile: function() {
       	  var prefs = htlivesight.Settings.preferences;
       	  soundPath=document.getElementById("frGoalSoundPathBrowse").value;
     			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
     			document.getElementById("frGoalSoundPath").value=soundPath;
     			prefs.personalization.frGoalSoundPath = soundPath;
     		  },

     
     opfrGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("opfrGoalCheck").checked) {
          document.getElementById("opfrGoalSoundPath").disabled = false;
          prefs.personalization.opfrGoalSoundPath = document.getElementById("opfrGoalSoundPath").value.replace(/@/g,"");
          document.getElementById("opfrGoalSoundPath").value=prefs.personalization.opfrGoalSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.opfrGoalCheck=true;
          } else {
          	prefs.personalization.opfrGoalSoundPath = "@"+document.getElementById("opfrGoalSoundPath").value;
          	document.getElementById("opfrGoalSoundPath").value="@"+document.getElementById("opfrGoalSoundPath").value;
          	document.getElementById("opfrGoalSoundPath").disabled = true;
          	prefs.personalization.opfrGoalCheck=false;
            };
    },
    
    opfrGoalReset: function() {
  	  var prefix="@";
	  if(document.getElementById("opfrGoalCheck").checked) prefix="";
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("opfrGoalSoundPath").value=prefix+"chrome://htlivesight/content/sound/applause.wav";
     	  prefs.personalization.opfrGoalSoundPath = document.getElementById("opfrGoalSoundPath").value;
     	  document.getElementById("opfrGoalSoundPathBrowse").value="";
       },

    opfrGoalPlay: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("opfrGoalSoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },
        
        opfrGoalSoundFile: function() {
         	  var prefs = htlivesight.Settings.preferences;
         	  soundPath=document.getElementById("opfrGoalSoundPathBrowse").value;
       			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
       			document.getElementById("opfrGoalSoundPath").value=soundPath;
       			prefs.personalization.opfrGoalSoundPath = soundPath;
       		  },
       
    otGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("otGoalCheck").checked) {
          document.getElementById("otGoalSoundPath").disabled = false;
          prefs.personalization.otGoalSoundPath = document.getElementById("otGoalSoundPath").value.replace(/@/g,"");
          document.getElementById("otGoalSoundPath").value=prefs.personalization.otGoalSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.otGoalCheck=true;
          } else {
          	prefs.personalization.otGoalSoundPath = "@"+document.getElementById("otGoalSoundPath").value;
          	document.getElementById("otGoalSoundPath").value = "@"+document.getElementById("otGoalSoundPath").value;
          	document.getElementById("otGoalSoundPath").disabled = true;
          	prefs.personalization.otGoalCheck=false;
            };
    },
    
    otGoalReset: function() {
  	  var prefix="@";
	  if(document.getElementById("otGoalCheck").checked) prefix="";
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("otGoalSoundPath").value=prefix+"chrome://htlivesight/content/sound/ovation.wav";
   	  prefs.personalization.otGoalSoundPath = document.getElementById("otGoalSoundPath").value;
   	document.getElementById("otGoalSoundPathBrowse").value="";
     },

     otGoalPlay: function() {
     	  try {
     			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
     			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
     			soundService.play(ioService.newURI(document.getElementById("otGoalSoundPath").value, null, null));
     			return;
     		} catch(e) {}
       },
       
       otGoalSoundFile: function() {
      	  var prefs = htlivesight.Settings.preferences;
      	  soundPath=document.getElementById("otGoalSoundPathBrowse").value;
    			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
    			document.getElementById("otGoalSoundPath").value=soundPath;
    			prefs.personalization.otGoalSoundPath = soundPath;
    		  },

     
    missGoalSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("missGoalCheck").checked) {
          document.getElementById("missGoalSoundPath").disabled = false;
          prefs.personalization.missGoalSoundPath = document.getElementById("missGoalSoundPath").value.replace(/@/g,"");
          document.getElementById("missGoalSoundPath").value=prefs.personalization.missGoalSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.missGoalCheck=true;
          } else {
          	prefs.personalization.missGoalSoundPath = "@"+document.getElementById("missGoalSoundPath").value;
          	document.getElementById("missGoalSoundPath").value = "@"+document.getElementById("missGoalSoundPath").value;
          	document.getElementById("missGoalSoundPath").disabled = true;
          	prefs.personalization.missGoalCheck=false;
            };
    },
    
    missGoalReset: function() {
  	  var prefix="@";
	  if(document.getElementById("missGoalCheck").checked) prefix="";
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("missGoalSoundPath").value=prefix+"chrome://htlivesight/content/sound/miss.wav";
     	  prefs.personalization.missGoalSoundPath = document.getElementById("missGoalSoundPath").value;
     	  document.getElementById("missGoalSoundPathBrowse").value="";
       },

    missGoalPlay: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("missGoalSoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },
        
        missGoalSoundFile: function() {
        	  var prefs = htlivesight.Settings.preferences;
        	  soundPath=document.getElementById("missGoalSoundPathBrowse").value;
      			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
      			document.getElementById("missGoalSoundPath").value=soundPath;
      			prefs.personalization.missGoalSoundPath = soundPath;
      		  },
       
    sunSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("sunCheck").checked) {
          document.getElementById("sunSoundPath").disabled = false;
          prefs.personalization.sunSoundPath = document.getElementById("sunSoundPath").value.replace(/@/g,"");
          document.getElementById("sunSoundPath").value=prefs.personalization.sunSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.sunCheck=true;
          } else {
          	prefs.personalization.sunSoundPath = "@"+document.getElementById("sunSoundPath").value;
          	document.getElementById("sunSoundPath").value = "@"+document.getElementById("sunSoundPath").value;
          	document.getElementById("sunSoundPath").disabled = true;
          	prefs.personalization.sunCheck=false;
            };
    },
    
    sunReset: function() {
  	  var prefix="@";
	  if(document.getElementById("sunCheck").checked) prefix="";
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("sunSoundPath").value=prefix+"chrome://htlivesight/content/sound/sun.wav";
   	  prefs.personalization.sunSoundPath = document.getElementById("sunSoundPath").value;
   	  document.getElementById("sunSoundPathBrowse").value="";
     },

     sunPlay: function() {
     	  try {
     			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
     			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
     			soundService.play(ioService.newURI(document.getElementById("sunSoundPath").value, null, null));
     			return;
     		} catch(e) {}
       },     
       
       sunSoundFile: function() {
     	  var prefs = htlivesight.Settings.preferences;
     	  soundPath=document.getElementById("sunSoundPathBrowse").value;
   			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
   			document.getElementById("sunSoundPath").value=soundPath;
   			prefs.personalization.sunSoundPath = soundPath;
   		  },
     
    rainSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("rainCheck").checked) {
          document.getElementById("rainSoundPath").disabled = false;
          prefs.personalization.rainSoundPath = document.getElementById("rainSoundPath").value.replace(/@/g,"");
          document.getElementById("rainSoundPath").value=prefs.personalization.rainSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.rainCheck=true;
          } else {
          	prefs.personalization.rainSoundPath = "@"+document.getElementById("rainSoundPath").value;
          	document.getElementById("rainSoundPath").value= "@"+document.getElementById("rainSoundPath").value;
          	document.getElementById("rainSoundPath").disabled = true;
          	prefs.personalization.rainCheck=false;
            };
    },
    
    rainReset: function() {
  	  var prefix="@";
	  if(document.getElementById("rainCheck").checked) prefix="";
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("rainSoundPath").value=prefix+"chrome://htlivesight/content/sound/rain.wav";
     	  prefs.personalization.rainSoundPath = document.getElementById("rainSoundPath").value;
     	  document.getElementById("rainSoundPathBrowse").value="";
       },

    rainPlay: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("rainSoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },
       
        rainSoundFile: function() {
       	  var prefs = htlivesight.Settings.preferences;
       	  soundPath=document.getElementById("rainSoundPathBrowse").value;
     			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
     			document.getElementById("rainSoundPath").value=soundPath;
     			prefs.personalization.rainSoundPath = soundPath;
     		  },
        
    overcastSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("overcastCheck").checked) {
          document.getElementById("overcastSoundPath").disabled = false;
          prefs.personalization.overcastSoundPath = document.getElementById("overcastSoundPath").value.replace(/@/g,"");
          document.getElementById("overcastSoundPath").value=prefs.personalization.overcastSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.overcastCheck=true;
          } else {
          	prefs.personalization.overcastSoundPath = "@"+document.getElementById("overcastSoundPath").value;
          	document.getElementById("overcastSoundPath").value = "@"+document.getElementById("overcastSoundPath").value;
          	document.getElementById("overcastSoundPath").disabled = true;
          	prefs.personalization.overcastCheck=false;
            };
    },
    
    overcastReset: function() {
  	  var prefix="@";
	  if(document.getElementById("overcastCheck").checked) prefix="";
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("overcastSoundPath").value=prefix+"chrome://htlivesight/content/sound/overcast.wav";
   	  prefs.personalization.overcastSoundPath = document.getElementById("overcastSoundPath").value;
   	  document.getElementById("overcastSoundPathBrowse").value="";
     },

    overcastPlay: function() {
     	  try {
     			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
     			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
     			soundService.play(ioService.newURI(document.getElementById("overcastSoundPath").value, null, null));
     			return;
     		} catch(e) {}
       },
     
       overcastSoundFile: function() {
        	  var prefs = htlivesight.Settings.preferences;
        	  soundPath=document.getElementById("overcastSoundPathBrowse").value;
      			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
      			document.getElementById("overcastSoundPath").value=soundPath;
      			prefs.personalization.overcastSoundPath = soundPath;
      		  },
       
    fewCloudSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("fewCloudsCheck").checked) {
          document.getElementById("fewCloudsSoundPath").disabled = false;
          prefs.personalization.fewCloudsSoundPath = document.getElementById("fewCloudsSoundPath").value.replace(/@/g,"");
          document.getElementById("fewCloudsSoundPath").value=prefs.personalization.fewCloudsSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.fewCloudsCheck=true;
          } else {
          	prefs.personalization.fewCloudsSoundPath = "@"+document.getElementById("fewCloudsSoundPath").value;
          	document.getElementById("fewCloudsSoundPath").value = "@"+document.getElementById("fewCloudsSoundPath").value;
          	document.getElementById("fewCloudsSoundPath").disabled = true;
          	prefs.personalization.fewCloudsCheck=false;
            };
    },
    
    fewCloudReset: function() {
  	  var prefix="@";
	  if(document.getElementById("fewCloudsCheck").checked) prefix="";
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("fewCloudsSoundPath").value=prefix+"chrome://htlivesight/content/sound/few_clouds.wav";
     	  prefs.personalization.fewCloudsSoundPath = document.getElementById("fewCloudsSoundPath").value;
       	  document.getElementById("fewCloudsSoundPathBrowse").value="";
       },

   fewCloudPlay: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("fewCloudsSoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },

        fewCloudSoundFile: function() {
      	  var prefs = htlivesight.Settings.preferences;
      	  soundPath=document.getElementById("fewCloudsSoundPathBrowse").value;
    			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
    			document.getElementById("fewCloudsSoundPath").value=soundPath;
    			prefs.personalization.fewCloudsSoundPath = soundPath;
    		  },
        
       myBooSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("myBooCheck").checked) {
          document.getElementById("myBooSoundPath").disabled = false;
          prefs.personalization.myBooSoundPath = document.getElementById("myBooSoundPath").value.replace(/@/g,"");
          document.getElementById("myBooSoundPath").value=prefs.personalization.myBooSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.myBooCheck=true;
          } else {
          	prefs.personalization.myBooSoundPath = "@"+document.getElementById("myBooSoundPath").value;
          	document.getElementById("myBooSoundPath").value="@"+document.getElementById("myBooSoundPath").value;
          	document.getElementById("myBooSoundPath").disabled = true;
          	prefs.personalization.myBooCheck=false;
            };
    },
    
    myBooReset: function() {
  	  var prefix="@";
	  if(document.getElementById("myBooCheck").checked) prefix="";
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("myBooSoundPath").value=prefix+"chrome://htlivesight/content/sound/boo.wav";
   	  prefs.personalization.myBooSoundPath = document.getElementById("myBooSoundPath").value;
   	  document.getElementById("myBooSoundPathBrowse").value="";
     },

     myBooPlay: function() {
     	  try {
     			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
     			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
     			soundService.play(ioService.newURI(document.getElementById("myBooSoundPath").value, null, null));
     			return;
     		} catch(e) {}
       },

       myBooSoundFile: function() {
       	  var prefs = htlivesight.Settings.preferences;
       	  soundPath=document.getElementById("myBooSoundPathBrowse").value;
     			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
     			document.getElementById("myBooSoundPath").value=soundPath;
     			prefs.personalization.myBooSoundPath = soundPath;
     		  },
       
    opBooSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("opBooCheck").checked) {
          document.getElementById("opBooSoundPath").disabled = false;
          prefs.personalization.opBooSoundPath = document.getElementById("opBooSoundPath").value.replace(/@/g,"");
          document.getElementById("opBooSoundPath").value=prefs.personalization.opBooSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.opBooCheck=true;
          } else {
          	prefs.personalization.opBooSoundPath = "@"+document.getElementById("opBooSoundPath").value;
          	document.getElementById("opBooSoundPath").value= "@"+document.getElementById("opBooSoundPath").value;
          	document.getElementById("opBooSoundPath").disabled = true;
          	prefs.personalization.opBooCheck=false;
            };
    },
    
    opBooReset: function() {
  	  var prefix="@";
	  if(document.getElementById("opBooCheck").checked) prefix="";
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("opBooSoundPath").value=prefix+"chrome://htlivesight/content/sound/OpBoo.wav";
     	  prefs.personalization.opBooSoundPath = document.getElementById("opBooSoundPath").value;
     	  document.getElementById("opBooSoundPathBrowse").value="";
       },

    opBooPlay: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("opBooSoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },

        opBooSoundFile: function() {
         	  var prefs = htlivesight.Settings.preferences;
         	  soundPath=document.getElementById("opBooSoundPathBrowse").value;
       			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
       			document.getElementById("opBooSoundPath").value=soundPath;
       			prefs.personalization.opBooSoundPath = soundPath;
       		  },
        
    whistleStartSound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("whistleStartCheck").checked) {
          document.getElementById("whistleStartSoundPath").disabled = false;
          prefs.personalization.whistleStartSoundPath = document.getElementById("whistleStartSoundPath").value.replace(/@/g,"");
          document.getElementById("whistleStartSoundPath").value=prefs.personalization.whistleStartSoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.whistleStartCheck=true;
          } else {
          	prefs.personalization.whistleStartSoundPath = "@"+document.getElementById("whistleStartSoundPath").value;
          	document.getElementById("whistleStartSoundPath").value="@"+document.getElementById("whistleStartSoundPath").value;
          	document.getElementById("whistleStartSoundPath").disabled = true;
          	prefs.personalization.whistleStartCheck=false;
            };
    },
    
    whistleStartReset: function() {
  	  var prefix="@";
	  if(document.getElementById("whistleStartCheck").checked) prefix="";
   	  var prefs = htlivesight.Settings.preferences;
   	  document.getElementById("whistleStartSoundPath").value=prefix+"chrome://htlivesight/content/sound/whistle_start.wav";
   	  prefs.personalization.whistleStartSoundPath = document.getElementById("whistleStartSoundPath").value;
   	  document.getElementById("whistleStartSoundPathBrowse").value="";
     },

     whistleStartPlay: function() {
     	  try {
     			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
     			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
     			soundService.play(ioService.newURI(document.getElementById("whistleStartSoundPath").value, null, null));
     			return;
     		} catch(e) {}
       },

       whistleStartSoundFile: function() {
      	  var prefs = htlivesight.Settings.preferences;
      	  soundPath=document.getElementById("whistleStartSoundPathBrowse").value;
    			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
    			document.getElementById("whistleStartSoundPath").value=soundPath;
    			prefs.personalization.whistleStartSoundPath = soundPath;
    		  },
       
    whistle2Sound: function() {
      var prefs = htlivesight.Settings.preferences;
      if(document.getElementById("whistle2Check").checked) {
          document.getElementById("whistle2SoundPath").disabled = false;
          prefs.personalization.whistle2SoundPath = document.getElementById("whistle2SoundPath").value.replace(/@/g,"");
          document.getElementById("whistle2SoundPath").value=prefs.personalization.whistle2SoundPath;
          //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
          prefs.personalization.whistle2Check=true;
          } else {
          	prefs.personalization.whistle2SoundPath = "@"+document.getElementById("whistle2SoundPath").value;
          	document.getElementById("whistle2SoundPath").value="@"+document.getElementById("whistle2SoundPath").value;
          	document.getElementById("whistle2SoundPath").disabled = true;
          	prefs.personalization.whistle2Check=false;
            };
    },
    
    whistle2Reset: function() {
  	  var prefix="@";
	  if(document.getElementById("whistle2Check").checked) prefix="";
     	  var prefs = htlivesight.Settings.preferences;
     	  document.getElementById("whistle2SoundPath").value=prefix+"chrome://htlivesight/content/sound/whistle2.wav";
     	  prefs.personalization.whistle2SoundPath = document.getElementById("whistle2SoundPath").value;
     	 document.getElementById("whistle2SoundPathBrowse").value="";
       },

       whistle2Play: function() {
      	  try {
      			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
      			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      			soundService.play(ioService.newURI(document.getElementById("whistle2SoundPath").value, null, null));
      			return;
      		} catch(e) {}
        },
        
        whistle2SoundFile: function() {
        	  var prefs = htlivesight.Settings.preferences;
        	  soundPath=document.getElementById("whistle2SoundPathBrowse").value;
      			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
      			document.getElementById("whistle2SoundPath").value=soundPath;
      			prefs.personalization.whistle2SoundPath = soundPath;
      		  },
       
   whistle3Sound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("whistle3Check").checked) {
         document.getElementById("whistle3SoundPath").disabled = false;
         prefs.personalization.whistle3SoundPath = document.getElementById("whistle3SoundPath").value.replace(/@/g,"");
         document.getElementById("whistle3SoundPath").value=prefs.personalization.whistle3SoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.whistle3Check=true;
         } else {
         	prefs.personalization.whistle3SoundPath = "@"+document.getElementById("whistle3SoundPath").value;
         	document.getElementById("whistle3SoundPath").value= "@"+document.getElementById("whistle3SoundPath").value;
         	document.getElementById("whistle3SoundPath").disabled = true;
         	prefs.personalization.whistle3Check=false;
           };
   },
   
   whistle3Reset: function() {
 	  var prefix="@";
	  if(document.getElementById("whistle3Check").checked) prefix="";
  	  var prefs = htlivesight.Settings.preferences;
  	  document.getElementById("whistle3SoundPath").value=prefix+"chrome://htlivesight/content/sound/whistle3.wav";
  	  prefs.personalization.whistle3SoundPath = document.getElementById("whistle3SoundPath").value;
  	document.getElementById("whistle3SoundPathBrowse").value="";
    },

    whistle3Play: function() {
    	  try {
    			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
    			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
    			soundService.play(ioService.newURI(document.getElementById("whistle3SoundPath").value, null, null));
    			return;
    		} catch(e) {}
      },
      
      whistle3SoundFile: function() {
    	  var prefs = htlivesight.Settings.preferences;
    	  soundPath=document.getElementById("whistle3SoundPathBrowse").value;
  			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
  			document.getElementById("whistle3SoundPath").value=soundPath;
  			prefs.personalization.whistle3SoundPath = soundPath;
  		  },
    
   whistleSound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("whistleCheck").checked) {
         document.getElementById("whistleSoundPath").disabled = false;
         prefs.personalization.whistleSoundPath = document.getElementById("whistleSoundPath").value.replace(/@/g,"");
         document.getElementById("whistleSoundPath").value=prefs.personalization.whistleSoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.whistleCheck=true;
         } else {
         	prefs.personalization.whistleSoundPath = "@"+document.getElementById("whistleSoundPath").value;
         	document.getElementById("whistleSoundPath").value="@"+document.getElementById("whistleSoundPath").value;
         	document.getElementById("whistleSoundPath").disabled = true;
         	prefs.personalization.whistleCheck=false;
           };
   },
   
   whistleReset: function() {
 	  var prefix="@";
	  if(document.getElementById("whistleCheck").checked) prefix="";
	  	  var prefs = htlivesight.Settings.preferences;
	  	  document.getElementById("whistleSoundPath").value=prefix+"chrome://htlivesight/content/sound/whistle.wav";
	  	  prefs.personalization.whistleSoundPath = document.getElementById("whistleSoundPath").value;
	  	document.getElementById("whistleSoundPathBrowse").value="";
	    },

	whistlePlay: function() {
	    	  try {
	    			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
	    			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	    			soundService.play(ioService.newURI(document.getElementById("whistleSoundPath").value, null, null));
	    			return;
	    		} catch(e) {}
	      },
	      
	      whistleSoundFile: function() {
        	  var prefs = htlivesight.Settings.preferences;
        	  soundPath=document.getElementById("whistleSoundPathBrowse").value;
      			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
      			document.getElementById("whistleSoundPath").value=soundPath;
      			prefs.personalization.whistleSoundPath = soundPath;
      		  },
	    
   hattrickSound: function() {
     var prefs = htlivesight.Settings.preferences;
     if(document.getElementById("hattrickCheck").checked) {
         document.getElementById("hattrickSoundPath").disabled = false;
         prefs.personalization.hattrickSoundPath = document.getElementById("hattrickSoundPath").value.replace(/@/g,"");
         document.getElementById("hattrickSoundPath").value=prefs.personalization.hattrickSoundPath;
         //prefs.personalization.myGoalSoundPath = prefs.personalization.myGoalSoundPath.replace("@","");
         prefs.personalization.hattrickCheck=true;
         } else {
         	prefs.personalization.hattrickSoundPath = "@"+document.getElementById("hattrickSoundPath").value;
         	document.getElementById("hattrickSoundPath").value = "@"+document.getElementById("hattrickSoundPath").value;
         	document.getElementById("hattrickSoundPath").disabled = true;
         	prefs.personalization.hattrickCheck=false;
           };
   },

   hattrickReset: function() {
 	  var prefix="@";
	  if(document.getElementById("hattrickCheck").checked) prefix="";
	  	  var prefs = htlivesight.Settings.preferences;
	  	  document.getElementById("hattrickSoundPath").value=prefix+"chrome://htlivesight/content/sound/tarzan.wav";
	  	  prefs.personalization.hattrickSoundPath = document.getElementById("hattrickSoundPath").value;
	  	  document.getElementById("hattrickSoundPathBrowse").value="";
	    },

	hattrickPlay: function() {
	    	  try {
	    			var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);
	    			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	    			soundService.play(ioService.newURI(document.getElementById("hattrickSoundPath").value, null, null));
	    			return;
	    		} catch(e) {}
	      },
	    
	      hattrickSoundFile: function() {
        	  var prefs = htlivesight.Settings.preferences;
        	  soundPath=document.getElementById("hattrickSoundPathBrowse").value;
      			if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
      			document.getElementById("hattrickSoundPath").value=soundPath;
      			prefs.personalization.hattrickSoundPath = soundPath;
      		  },
	      
  }
};
