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
      }
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
    }
    document.getElementById("chkSoundOnlyOpened").checked = prefs.notification.soundOnlyOpened;
    document.getElementById("chkFlash").checked = prefs.notification.flash;
    document.getElementById("chkSlider").checked = prefs.notification.slider;

    document.getElementById("lang-list").value = prefs.language.locale;
    
    document.getElementById("reverseOrder").checked = prefs.other.bottomUp;
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
    }
  }
};
