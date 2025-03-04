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
if (!htlivesight) var htlivesight = {};
htlivesight.Preferences = function() {
	service = null;
};
htlivesight.Preferences.root = function() {
	this.general = new htlivesight.Preferences.general();
	this.matches = new htlivesight.Preferences.matches();
	this.notification = new htlivesight.Preferences.notification();
	this.language = new htlivesight.Preferences.language();
	this.other = new htlivesight.Preferences.other();
	this.personalization = new htlivesight.Preferences.personalization();
	this.colors = new htlivesight.Preferences.colors();
};
htlivesight.Preferences.general = function() {
	this.theme = 2;
	this.openInTab = true;
	this.friendsList="";
	this.teamId = "";
	this.hattrickServer = "";
	this.toolbarInited = false;
	this.customBackgroundPath = htlivesightEnv.contentPath+"themes/images/bg.png";
	this.extendBackground = false;
	this.repeatBackground = false;
	if (htlivesight.arch === "SandBox") {
		htlivesightPrefs.pref_default.openInTab = "true";
		htlivesightPrefs.pref_default.friendsList = "";
		htlivesightPrefs.pref_default.teamId = "";
		htlivesightPrefs.pref_default.hattrickServer = "";
		htlivesightPrefs.pref_default.toolbarInited = "false";
		htlivesightPrefs.pref_default.customBackgroundPath = htlivesightEnv.contentPath+"themes/images/bg.png";
		htlivesightPrefs.pref_default.extendBackground = false;
		htlivesightPrefs.pref_default.repeatBackground = false;
	}
	if (htlivesight.platform == "Safari"){
		this.customBackgroundPath = "./themes/images/bg.png";
	}
	this.volume = 100;
};
htlivesight.Preferences.matches = function(l, f) {
	this.allMine = new htlivesight.Preferences.matches.allMine();
	this.league = new htlivesight.Preferences.matches.league();
	this.youthLeague = new htlivesight.Preferences.matches.youthLeague();
	this.tournament = new htlivesight.Preferences.matches.tournament();
	this.friends = new htlivesight.Preferences.matches.friends();
	this.scorers = true;
	this.booked = true;
	this.sentOff = true;
	this.injured = true;
	this.windowSize = 3;
	this.myYouthMatch = true;
};
htlivesight.Preferences.matches.allMine = function() {
	this.get = true;
	this.within = true;
	this.withinHours = 24;
};
htlivesight.Preferences.matches.league = function() {
	this.get = true;
	this.within = true;
	this.withinHours = 24;
	this.getScorers = false;
};
htlivesight.Preferences.matches.youthLeague = function() {
	this.get = true;
	this.within = true;
	this.withinHours = 24;
};
htlivesight.Preferences.matches.tournament = function() {
	this.get = true;
	this.within = true;
	this.withinHours = 24;
};
htlivesight.Preferences.matches.friends = function() {
	this.get = true;
	this.within = true;
	this.withinHours = 24;
	this.doNotGetFriendsHointegratedMatches = false;
};
htlivesight.Preferences.notification = function() {
	this.sound = true;
	this.soundOnlyOpened = true;
	this.flash = true;
	this.slider = true;
};
htlivesight.Preferences.language = function() {
	this.locale = "A-I/eng-us";
};
htlivesight.Preferences.other = function() {
	this.bottomUp = false;
	this.reLive = false;
	this.reLiveSpeed = 1;
	this.reliveByEvent = false;
	this.printEventKey = false;
	this.clearAllMatches = false;
	this.exportOauth = false;
	this.exportBackground = true;
	this.exportSounds = true;
	this.getMyDataAutomatically = false;
	this.useLiveEventsAndTexts = true;
};	

htlivesight.Preferences.personalization = function() {
	this.oldIcons = false;
	this.weather = true;
	this.whistleTime = true;
	this.weatherSE = true;
	this.livefoxGoal = false;
	this.noOpGoal = false;
	this.secondSoundEqualFirst = true;
	this.youthSoundEqualSenior = true;
	this.settingVolumeSound = true;
	if (htlivesight.platform == "Safari"){
		// old path http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/cheer_8k.mp3
		this.myGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/cheer_8k.mp3";
		this.opGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/cheer1.mp3";
		this.frGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/goal.mp3";
		this.opfrGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/applause.mp3";
		this.otGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/ovation.mp3";
		this.missGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/miss.mp3";
		this.sunSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/sun.mp3";
		this.rainSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/rain.mp3";
		this.overcastSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/overcast.mp3";
		this.fewCloudsSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/few_clouds.mp3";
		this.myBooSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/boo.mp3";
		this.opBooSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/OpBoo.mp3";
		this.whistleStartSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/whistle_start.mp3";
		this.whistle2SoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/whistle2.mp3";
		this.whistle3SoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/whistle3.mp3";
		this.whistleSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/whistle.mp3";
		this.hattrickSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/tarzan.mp3";

		this.pressingSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/pressing.mp3";
		this.myBruisedSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/my_bruised.mp3";
		this.otherBruisedSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/other_bruised.mp3";
		this.mySentOffSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/my_sent_off.mp3";
		this.otherSentOffSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/other_sent_off.mp3";

		this.missFriendSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/miss_friend.mp3";
		this.missOtherSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/miss_other.mp3";
		this.infoSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/crowd.mp3";
		this.myFavouriteGoalSoundPath = "https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/tarzan.mp3";

	}else{
		this.myGoalSoundPath = htlivesightEnv.contentPath+"sound/cheer_8k.mp3";
		this.opGoalSoundPath = htlivesightEnv.contentPath+"sound/cheer1.mp3";
		this.frGoalSoundPath = htlivesightEnv.contentPath+"sound/goal.mp3";
		this.opfrGoalSoundPath = htlivesightEnv.contentPath+"sound/applause.mp3";
		this.otGoalSoundPath = htlivesightEnv.contentPath+"sound/ovation.mp3";
		this.missGoalSoundPath = htlivesightEnv.contentPath+"sound/miss.mp3";
		this.sunSoundPath = htlivesightEnv.contentPath+"sound/sun.mp3";
		this.rainSoundPath = htlivesightEnv.contentPath+"sound/rain.mp3";
		this.overcastSoundPath = htlivesightEnv.contentPath+"sound/overcast.mp3";
		this.fewCloudsSoundPath = htlivesightEnv.contentPath+"sound/few_clouds.mp3";
		this.myBooSoundPath = htlivesightEnv.contentPath+"sound/boo.mp3";
		this.opBooSoundPath = htlivesightEnv.contentPath+"sound/OpBoo.mp3";
		this.whistleStartSoundPath = htlivesightEnv.contentPath+"sound/whistle_start.mp3";
		this.whistle2SoundPath = htlivesightEnv.contentPath+"sound/whistle2.mp3";
		this.whistle3SoundPath = htlivesightEnv.contentPath+"sound/whistle3.mp3";
		this.whistleSoundPath = htlivesightEnv.contentPath+"sound/whistle.mp3";
		this.hattrickSoundPath = htlivesightEnv.contentPath+"sound/tarzan.mp3";

		this.pressingSoundPath = htlivesightEnv.contentPath+"sound/pressing.mp3";
		this.myBruisedSoundPath = htlivesightEnv.contentPath+"sound/my_bruised.mp3";
		this.otherBruisedSoundPath = htlivesightEnv.contentPath+"sound/other_bruised.mp3";
		this.mySentOffSoundPath = htlivesightEnv.contentPath+"sound/my_sent_off.mp3";
		this.otherSentOffSoundPath = htlivesightEnv.contentPath+"sound/other_sent_off.mp3";

		this.missFriendSoundPath = htlivesightEnv.contentPath+"sound/miss_friend.mp3";
		this.missOtherSoundPath = htlivesightEnv.contentPath+"sound/miss_other.mp3";
		this.infoSoundPath = htlivesightEnv.contentPath+"sound/crowd.mp3";
		this.myFavouriteGoalSoundPath = htlivesightEnv.contentPath+"sound/tarzan.mp3";
	}

	this.myGoalCheck = true;
	this.opGoalCheck = true;
	this.frGoalCheck = true;
	this.opfrGoalCheck = true;
	this.otGoalCheck = true;
	this.missGoalCheck = true;
	this.sunCheck = true;
	this.rainCheck = true;
	this.overcastCheck = true;
	this.fewCloudsCheck = true;
	this.myBooCheck = true;
	this.opBooCheck = true;
	this.whistleStartCheck = true;
	this.whistle2Check = true;
	this.whistle3Check = true;
	this.whistleCheck = true;
	this.hattrickCheck = true;

	this.pressingCheck = true;
	this.myBruisedCheck = true;
	this.otherBruisedCheck = true;
	this.mySentOffCheck = true;
	this.otherSentOffCheck = true;

	this.missFriendCheck = true;
	this.missOtherCheck = true;
	this.infoCheck = true;
	this.myFavouriteGoalCheck = true;
	this.myFavouritePlayersId = "";
};
htlivesight.Preferences.colors = function() {
	this.friendHomeColorCheck = false;
	this.friendHomeColorCode = "023702";
	this.friendAwayColorCheck = false;
	this.friendAwayColorCode = "920606";
	this.foeHomeColorCheck = false;
	this.foeHomeColorCode = "0B2D73";
	this.foeAwayColorCheck = false;
	this.foeAwayColorCode = "660754";
	this.neutralColorCheck = false;
	this.neutralColorCode = "000000";
	this.friendHomeTextColorCheck = false;
	this.friendHomeTextColorCode = "FFFFFF";
	this.friendAwayTextColorCheck = false;
	this.friendAwayTextColorCode = "FFFFFF";
	this.foeHomeTextColorCheck = false;
	this.foeHomeTextColorCode = "FFFFFF";
	this.foeAwayTextColorCheck = false;
	this.foeAwayTextColorCode = "FFFFFF";
	this.neutralTextColorCheck = false;
	this.neutralTextColorCode = "FFFFFF";
	this.seTextColorCheck = false;
	this.seTextColorCode = "F5F315";
	this.headerBarColorCheck = false;
	this.headerBarColorCode = "459e00";
	this.headerBarTextColorCheck = false;
	this.headerBarTextColorCode = "135790";
};
htlivesight.Preferences.start = function() {
	try {
		if (!htlivesight.Preferences.service) {
			if (htlivesight.arch === "Gecko") {
				htlivesight.Preferences.service = Components.classes["@mozilla.org/preferences-service;1"].
				getService(Components.interfaces.nsIPrefBranch);
			}
			if (htlivesight.arch === "SandBox") {
				htlivesight.Preferences.service = htlivesightPrefs;
			}
		}
	} catch(e) {
		console.log("Cannot start preferences: " + e);
		htlivesight.Log.warn("Cannot start preferences: " + e);
	}
};
htlivesight.Preferences.get = function() {
	htlivesight.Preferences.start();
	var prefs = new htlivesight.Preferences.root();
	if(!htlivesightPrefs.getBool("HtlsFirstStart")){
		htlivesight.Preferences.save(prefs);
	}
	htlivesight.Preferences.load(prefs);
	return prefs;
};
htlivesight.Preferences.load = function(prefs) {
	htlivesight.Preferences.start();
	var service = htlivesight.Preferences.service;
	var languagePath = "A-I/eng-us";
	var preferences = prefs;
	try{
		languagePath = htlivesightPrefs.getString("language"); //get path language
		// check if the path is an existing file, if so it'll be passed in preference, otherwise English-US will be the language
		if (languagePath.match(/^(A-I\/(ara|aze|bel|bos|bul|cat|ces|dan|ell|eng|eng-us|est|eus|fas|fin|fra|fry|fur|ger|glg|heb|hrv|hun|ind|isl|ita)|J-Z\/(jpn|kat|kor|lav|lit|ltz|mkd|mlt|nld|nno|nob|pol|por|por-br|ron|rus|slk|slv|spa|spa-ca|spa-su|sqi|srp|swe|tur|ukr|vie|vls|zho))$/))
			prefs.language.locale = languagePath;
	}catch(e){prefs.language.locale="A-I/eng-us";}
	try{
		var temp="";
		if (htlivesightPrefs.getBool("openInTab") == null) throw "no preferences saved";
		prefs.general.theme = htlivesightPrefs.getInt("general.theme");	
		prefs.general.openInTab = htlivesightPrefs.getBool("openInTab");
		prefs.general.friendsList = htlivesight.Preferences.friends.get();
		prefs.general.hattrickServer = htlivesightPrefs.getString("general.hattrickServer");
		prefs.general.toolbarInited = htlivesightPrefs.getBool("general.toolbarInited");
		prefs.general.volume = htlivesightPrefs.getInt("general.volume");
		prefs.matches.league.get = htlivesightPrefs.getBool("matches.league.get");
		prefs.matches.league.within = htlivesightPrefs.getBool("matches.league.within");
		prefs.matches.league.withinHours = htlivesightPrefs.getInt("matches.league.withinHours");
		
		if (htlivesightPrefs.getBool("matches.myYouthMatch") != null){
			prefs.matches.myYouthMatch = htlivesightPrefs.getBool("matches.myYouthMatch");
		}
		
		/*if(htlivesightPrefs.getBool("matches.youthLeague.get") != null){
			prefs.matches.youthLeague.get = htlivesightPrefs.getBool("matches.youthLeague.get");
			prefs.matches.youthLeague.within = htlivesightPrefs.getBool("matches.youthLeague.within");
			prefs.matches.youthLeague.withinHours = htlivesightPrefs.getInt("matches.youthLeague.withinHours");
	
		}*/
		
		prefs.matches.friends.get = htlivesightPrefs.getBool("matches.friends.get");
		prefs.matches.friends.within = htlivesightPrefs.getBool("matches.friends.within");
		prefs.matches.friends.withinHours = htlivesightPrefs.getInt("matches.friends.withinHours");

		prefs.matches.friends.doNotGetFriendsHointegratedMatches = htlivesightPrefs.getBool("matches.friends.doNotGetFriendsHointegratedMatches");

		prefs.matches.scorers = htlivesightPrefs.getBool("matches.scorers");
		prefs.matches.booked = htlivesightPrefs.getBool("matches.booked");
		prefs.matches.sentOff = htlivesightPrefs.getBool("matches.sentOff");
		prefs.matches.injured = htlivesightPrefs.getBool("matches.injured");
		prefs.matches.windowSize = htlivesightPrefs.getInt("matches.windowSize");
		prefs.notification.sound = htlivesightPrefs.getBool("notification.sound");

		prefs.notification.soundOnlyOpened = htlivesightPrefs.getBool("notification.soundOnlyOpened");
		prefs.notification.flash = htlivesightPrefs.getBool("notification.flash");
		prefs.notification.slider= htlivesightPrefs.getBool("notification.slider");	
		prefs.other.bottomUp = htlivesightPrefs.getBool("other.bottomUp");
		prefs.other.reLive = htlivesightPrefs.getBool("other.reLive");
		prefs.other.reLiveSpeed = htlivesightPrefs.getInt("other.reLiveSpeed");	
		prefs.other.reLiveByEvent =	htlivesightPrefs.getBool("other.reLiveByEvent");
		prefs.other.printEventKey = htlivesightPrefs.getBool("other.printEventKey");
		prefs.personalization.oldIcons = htlivesightPrefs.getBool("personalization.oldIcons");
		prefs.personalization.weather = htlivesightPrefs.getBool("personalization.weather");
		prefs.personalization.whistleTime = htlivesightPrefs.getBool("personalization.whistleTime");
		prefs.personalization.weatherSE = htlivesightPrefs.getBool("personalization.weatherSE");
		prefs.personalization.livefoxGoal = htlivesightPrefs.getBool("personalization.livefoxGoal");
		prefs.personalization.noOpGoal = htlivesightPrefs.getBool("personalization.noOpGoal");
		prefs.personalization.secondSoundEqualFirst = (htlivesightPrefs.getBool("personalization.secondSoundEqualFirst")!==null)?htlivesightPrefs.getBool("personalization.secondSoundEqualFirst") : prefs.personalization.secondSoundEqualFirst;
		prefs.personalization.youthSoundEqualSenior = (htlivesightPrefs.getBool("personalization.youthSoundEqualSenior")!==null)?htlivesightPrefs.getBool("personalization.youthSoundEqualSenior") : prefs.personalization.youthSoundEqualSenior;
		prefs.personalization.myGoalSoundPath= htlivesightPrefs.getString("personalization.myGoalSoundPath");
		if (prefs.personalization.myGoalSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.myGoalSoundPath= prefs.personalization.myGoalSoundPath.replace("wav","ogg");
		prefs.personalization.myGoalSoundPath= prefs.personalization.myGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.opGoalSoundPath=htlivesightPrefs.getString("personalization.opGoalSoundPath");
		if (prefs.personalization.opGoalSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.opGoalSoundPath= prefs.personalization.opGoalSoundPath.replace("wav","ogg");
		prefs.personalization.opGoalSoundPath= prefs.personalization.opGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.frGoalSoundPath=htlivesightPrefs.getString("personalization.frGoalSoundPath");
		if (prefs.personalization.frGoalSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.frGoalSoundPath= prefs.personalization.frGoalSoundPath.replace("wav","ogg");
		prefs.personalization.frGoalSoundPath= prefs.personalization.frGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.opfrGoalSoundPath=htlivesightPrefs.getString("personalization.opfrGoalSoundPath");
		if (prefs.personalization.opfrGoalSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.opfrGoalSoundPath= prefs.personalization.opfrGoalSoundPath.replace("wav","ogg");
		prefs.personalization.opfrGoalSoundPath= prefs.personalization.opfrGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.otGoalSoundPath=htlivesightPrefs.getString("personalization.otGoalSoundPath");
		if (prefs.personalization.otGoalSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.otGoalSoundPath= prefs.personalization.otGoalSoundPath.replace("wav","ogg");
		prefs.personalization.otGoalSoundPath= prefs.personalization.otGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.missGoalSoundPath=htlivesightPrefs.getString("personalization.missGoalSoundPath");
		if (prefs.personalization.missGoalSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.missGoalSoundPath= prefs.personalization.missGoalSoundPath.replace("wav","ogg");
		prefs.personalization.missGoalSoundPath= prefs.personalization.missGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.sunSoundPath=htlivesightPrefs.getString("personalization.sunSoundPath");
		if (prefs.personalization.sunSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.sunSoundPath= prefs.personalization.sunSoundPath.replace("wav","ogg");
		prefs.personalization.sunSoundPath= prefs.personalization.sunSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.rainSoundPath=htlivesightPrefs.getString("personalization.rainSoundPath");
		if (prefs.personalization.rainSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.rainSoundPath= prefs.personalization.rainSoundPath.replace("wav","ogg");
		prefs.personalization.rainSoundPath= prefs.personalization.rainSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.overcastSoundPath=htlivesightPrefs.getString("personalization.overcastSoundPath");
		if (prefs.personalization.overcastSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.overcastSoundPath= prefs.personalization.overcastSoundPath.replace("wav","ogg");
		prefs.personalization.overcastSoundPath= prefs.personalization.overcastSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.fewCloudsSoundPath=htlivesightPrefs.getString("personalization.fewCloudsSoundPath");
		if (prefs.personalization.fewCloudsSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.fewCloudsSoundPath= prefs.personalization.fewCloudsSoundPath.replace("wav","ogg");
		prefs.personalization.fewCloudsSoundPath= prefs.personalization.fewCloudsSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.myBooSoundPath=htlivesightPrefs.getString("personalization.myBooSoundPath");
		if (prefs.personalization.myBooSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.myBooSoundPath= prefs.personalization.myBooSoundPath.replace("wav","ogg");
		prefs.personalization.myBooSoundPath= prefs.personalization.myBooSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.opBooSoundPath=htlivesightPrefs.getString("personalization.opBooSoundPath");
		if (prefs.personalization.opBooSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.opBooSoundPath= prefs.personalization.opBooSoundPath.replace("wav","ogg");
		prefs.personalization.opBooSoundPath= prefs.personalization.opBooSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.whistleStartSoundPath=htlivesightPrefs.getString("personalization.whistleStartSoundPath");
		if (prefs.personalization.whistleStartSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.whistleStartSoundPath= prefs.personalization.whistleStartSoundPath.replace("wav","ogg");
		prefs.personalization.whistleStartSoundPath= prefs.personalization.whistleStartSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.whistle2SoundPath=htlivesightPrefs.getString("personalization.whistle2SoundPath");
		if (prefs.personalization.whistle2SoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.whistle2SoundPath= prefs.personalization.whistle2SoundPath.replace("wav","ogg");
		prefs.personalization.whistle2SoundPath= prefs.personalization.whistle2SoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.whistle3SoundPath=htlivesightPrefs.getString("personalization.whistle3SoundPath");
		if (prefs.personalization.whistle3SoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.whistle3SoundPath= prefs.personalization.whistle3SoundPath.replace("wav","ogg");
		prefs.personalization.whistle3SoundPath= prefs.personalization.whistle3SoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.whistleSoundPath=htlivesightPrefs.getString("personalization.whistleSoundPath");
		if (prefs.personalization.whistleSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.whistleSoundPath= prefs.personalization.whistleSoundPath.replace("wav","ogg");
		prefs.personalization.whistleSoundPath= prefs.personalization.whistleSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

		prefs.personalization.hattrickSoundPath=htlivesightPrefs.getString("personalization.hattrickSoundPath");
		if (prefs.personalization.hattrickSoundPath.match(htlivesightEnv.contentPath)!=null)
			prefs.personalization.hattrickSoundPath= prefs.personalization.hattrickSoundPath.replace("wav","ogg");
		prefs.personalization.hattrickSoundPath= prefs.personalization.hattrickSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");



		prefs.personalization.myGoalCheck=htlivesightPrefs.getBool("personalization.myGoalCheck");
		prefs.personalization.opGoalCheck=htlivesightPrefs.getBool("personalization.opGoalCheck");
		prefs.personalization.frGoalCheck=htlivesightPrefs.getBool("personalization.frGoalCheck");
		prefs.personalization.opfrGoalCheck=htlivesightPrefs.getBool("personalization.opfrGoalCheck");
		prefs.personalization.otGoalCheck=htlivesightPrefs.getBool("personalization.otGoalCheck");
		prefs.personalization.missGoalCheck=htlivesightPrefs.getBool("personalization.missGoalCheck");
		prefs.personalization.sunCheck=htlivesightPrefs.getBool("personalization.sunCheck");
		prefs.personalization.rainCheck=htlivesightPrefs.getBool("personalization.rainCheck");
		prefs.personalization.overcastCheck=htlivesightPrefs.getBool("personalization.overcastCheck");
		prefs.personalization.fewCloudsCheck=htlivesightPrefs.getBool("personalization.fewCloudsCheck");
		prefs.personalization.myBooCheck=htlivesightPrefs.getBool("personalization.myBooCheck");
		prefs.personalization.opBooCheck=htlivesightPrefs.getBool("personalization.opBooCheck");
		prefs.personalization.whistleStartCheck=htlivesightPrefs.getBool("personalization.whistleStartCheck");
		prefs.personalization.whistle2Check=htlivesightPrefs.getBool("personalization.whistle2Check");
		prefs.personalization.whistle3Check=htlivesightPrefs.getBool("personalization.whistle3Check");
		prefs.personalization.whistleCheck=htlivesightPrefs.getBool("personalization.whistleCheck");
		prefs.personalization.hattrickCheck=htlivesightPrefs.getBool("personalization.hattrickCheck");


		prefs.colors.friendHomeColorCheck=htlivesightPrefs.getBool("colors.friendHomeColorCheck");
		prefs.colors.friendHomeColorCode=htlivesightPrefs.getString("colors.friendHomeColorCode");
		prefs.colors.friendAwayColorCheck=htlivesightPrefs.getBool("colors.friendAwayColorCheck");
		prefs.colors.friendAwayColorCode=htlivesightPrefs.getString("colors.friendAwayColorCode");
		prefs.colors.foeHomeColorCheck=htlivesightPrefs.getBool("colors.foeHomeColorCheck");
		prefs.colors.foeHomeColorCode=htlivesightPrefs.getString("colors.foeHomeColorCode");
		prefs.colors.foeAwayColorCheck=htlivesightPrefs.getBool("colors.foeAwayColorCheck");
		prefs.colors.foeAwayColorCode=htlivesightPrefs.getString("colors.foeAwayColorCode");
		prefs.colors.neutralColorCheck=htlivesightPrefs.getBool("colors.neutralColorCheck");
		prefs.colors.neutralColorCode=htlivesightPrefs.getString("colors.neutralColorCode");
		prefs.colors.friendHomeTextColorCheck=htlivesightPrefs.getBool("colors.friendHomeTextColorCheck");
		prefs.colors.friendHomeTextColorCode=htlivesightPrefs.getString("colors.friendHomeTextColorCode");
		prefs.colors.friendAwayTextColorCheck=htlivesightPrefs.getBool("colors.friendAwayTextColorCheck");
		prefs.colors.friendAwayTextColorCode=htlivesightPrefs.getString("colors.friendAwayTextColorCode");
		prefs.colors.foeHomeTextColorCheck=htlivesightPrefs.getBool("colors.foeHomeTextColorCheck");
		prefs.colors.foeHomeTextColorCode=htlivesightPrefs.getString("colors.foeHomeTextColorCode");
		prefs.colors.foeAwayTextColorCheck=htlivesightPrefs.getBool("colors.foeAwayTextColorCheck");
		prefs.colors.foeAwayTextColorCode=htlivesightPrefs.getString("colors.foeAwayTextColorCode");
		prefs.colors.neutralTextColorCheck=htlivesightPrefs.getBool("colors.neutralTextColorCheck");
		prefs.colors.neutralTextColorCode=htlivesightPrefs.getString("colors.neutralTextColorCode");
		prefs.colors.seTextColorCheck=htlivesightPrefs.getBool("colors.seTextColorCheck");
		prefs.colors.seTextColorCode=htlivesightPrefs.getString("colors.seTextColorCode");

		prefs.colors.headerBarColorCheck=htlivesightPrefs.getBool("colors.headerBarColorCheck");
		prefs.colors.headerBarColorCode=htlivesightPrefs.getString("colors.headerBarColorCode");

		prefs.colors.headerBarTextColorCheck=htlivesightPrefs.getBool("colors.headerBarTextColorCheck");
		prefs.colors.headerBarTextColorCode=htlivesightPrefs.getString("colors.headerBarTextColorCode");

		if((htlivesightPrefs.getString("general.customBackgroundPath")!=null)&&(htlivesightPrefs.getString("general.customBackgroundPath")!="")){
			prefs.general.customBackgroundPath = htlivesightPrefs.getString("general.customBackgroundPath");};
			if((htlivesightPrefs.getBool("general.extendBackground")!=null)&&(htlivesightPrefs.getBool("general.extendBackground")!="")){
				prefs.general.extendBackground = htlivesightPrefs.getBool("general.extendBackground");}
			if((htlivesightPrefs.getBool("general.repeatBackground")!=null)&&(htlivesightPrefs.getBool("general.repeatBackground")!="")){
				prefs.general.repeatBackground = htlivesightPrefs.getBool("general.repeatBackground");

				temp=htlivesightPrefs.getString("personalization.pressingSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.pressingSoundPath= temp.replace("wav","ogg");
				prefs.personalization.pressingSoundPath= prefs.personalization.pressingSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.myBruisedSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.myBruisedSoundPath= temp.replace("wav","ogg");
				prefs.personalization.myBruisedSoundPath= prefs.personalization.myBruisedSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.otherBruisedSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.otherBruisedSoundPath= temp.replace("wav","ogg");
				prefs.personalization.otherBruisedSoundPath= prefs.personalization.otherBruisedSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.mySentOffSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.mySentOffSoundPath= temp.replace("wav","ogg");
				prefs.personalization.mySentOffSoundPath= prefs.personalization.mySentOffSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.otherSentOffSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.otherSentOffSoundPath= temp.replace("wav","ogg");
				prefs.personalization.otherSentOffSoundPath= prefs.personalization.otherSentOffSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.missFriendSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.missFriendSoundPath= temp.replace("wav","ogg");
				prefs.personalization.missFriendSoundPath= prefs.personalization.missFriendSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.missOtherSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.missOtherSoundPath= temp.replace("wav","ogg");
				prefs.personalization.missOtherSoundPath= prefs.personalization.missOtherSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");
				
				temp=htlivesightPrefs.getString("personalization.infoSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.infoSoundPath= temp.replace("wav","ogg");
				prefs.personalization.infoSoundPath= prefs.personalization.infoSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				temp=htlivesightPrefs.getString("personalization.myFavouriteGoalSoundPath");
				if (temp.match(htlivesightEnv.contentPath)!=null)
					prefs.personalization.myFavouriteGoalSoundPath= temp.replace("wav","ogg");
				prefs.personalization.myFavouriteGoalSoundPath= prefs.personalization.myFavouriteGoalSoundPath.replace("http://htlivesight.googlecode.com/svn/trunk/chrome/content/sound/","https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/");

				
				if (htlivesightPrefs.getBool("personalization.pressingCheck") != null)
					prefs.personalization.pressingCheck=htlivesightPrefs.getBool("personalization.pressingCheck");
				if (htlivesightPrefs.getBool("personalization.myBruisedCheck") != null)
					prefs.personalization.myBruisedCheck=htlivesightPrefs.getBool("personalization.myBruisedCheck");
				if (htlivesightPrefs.getBool("personalization.otherSentOffCheck") != null)
					prefs.personalization.otherBruisedCheck=htlivesightPrefs.getBool("personalization.otherSentOffCheck");
				if (htlivesightPrefs.getBool("personalization.mySentOffCheck") != null)
					prefs.personalization.mySentOffCheck=htlivesightPrefs.getBool("personalization.mySentOffCheck");
				if (htlivesightPrefs.getBool("personalization.otherSentOffCheck") != null)
					prefs.personalization.otherSentOffCheck=htlivesightPrefs.getBool("personalization.otherSentOffCheck");

				if (htlivesightPrefs.getBool("personalization.missFriendCheck") != null)
					prefs.personalization.missFriendCheck=htlivesightPrefs.getBool("personalization.missFriendCheck");
				if (htlivesightPrefs.getBool("personalization.missOtherCheck") != null)
					prefs.personalization.missOtherCheck=htlivesightPrefs.getBool("personalization.missOtherCheck");
				if (htlivesightPrefs.getBool("personalization.infoCheck") != null)
					prefs.personalization.infoCheck=htlivesightPrefs.getBool("personalization.infoCheck");
				if (htlivesightPrefs.getBool("personalization.myFavouriteGoalCheck") != null)
					prefs.personalization.infoCheck=htlivesightPrefs.getBool("personalization.myFavouriteGoalCheck");

			};
			prefs.personalization.settingVolumeSound = (htlivesightPrefs.getBool("personalization.settingVolumeSound")!==null)?htlivesightPrefs.getBool("personalization.settingVolumeSound") : prefs.personalization.settingVolumeSound;
			this.exportOauth = false;
			this.exportBackground = true;
			this.exportSounds = true;
			prefs.other.exportOauth = (htlivesightPrefs.getBool("other.exportOauth")!==null)?htlivesightPrefs.getBool("other.exportOauth") : prefs.other.exportOauth;
			prefs.other.exportBackground = (htlivesightPrefs.getBool("other.exportBackground")!==null)?htlivesightPrefs.getBool("other.exportBackground") : prefs.other.exportBackground;
			prefs.other.exportSounds = (htlivesightPrefs.getBool("other.exportSounds")!==null)?htlivesightPrefs.getBool("other.exportSounds") : prefs.other.exportSounds;
			//	var preferences1 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
			//	preferences1.deleteBranch("extensions.Htlivesight.prefs.matches.friends.doNotGetFriendsHointegratedMatches");
			prefs.other.clearAllMatches = (htlivesightPrefs.getBool("other.clearAllMatches")!==null)?htlivesightPrefs.getBool("other.clearAllMatches") : prefs.other.clearAllMatches;
			if (htlivesightPrefs.getBool("matches.tournament.get") != null){
				prefs.matches.tournament.get = htlivesightPrefs.getBool("matches.tournament.get");
				prefs.matches.tournament.within = htlivesightPrefs.getBool("matches.tournament.within");
				prefs.matches.tournament.withinHours = htlivesightPrefs.getInt("matches.tournament.withinHours");
			}
			if(htlivesightPrefs.getBool("matches.myYouthMatch")!=null){
				prefs.matches.myYouthMatch = htlivesightPrefs.getBool("matches.myYouthMatch");
			}
			if(htlivesightPrefs.getBool("matches.youthLeague.get") != null){
				prefs.matches.youthLeague.get = htlivesightPrefs.getBool("matches.youthLeague.get");
				prefs.matches.youthLeague.within = htlivesightPrefs.getBool("matches.youthLeague.within");
				prefs.matches.youthLeague.withinHours = htlivesightPrefs.getInt("matches.youthLeague.withinHours");
			}
			prefs.other.getMyDataAutomatically = htlivesightPrefs.getBool("other.getMyDataAutomatically");
			if (htlivesightPrefs.getString("personalization.myFavouritePlayersId") != null)
				prefs.personalization.myFavouritePlayersId=htlivesightPrefs.getString("personalization.myFavouritePlayersId");
			if(htlivesightPrefs.getBool("matches.allMine.within") != null){
				//prefs.matches.allMine.get = htlivesightPrefs.getBool("matches.allMine.get");
				prefs.matches.allMine.within = htlivesightPrefs.getBool("matches.allMine.within");
				prefs.matches.allMine.withinHours = htlivesightPrefs.getInt("matches.allMine.withinHours");
			}
			prefs.other.useLiveEventsAndTexts = htlivesightPrefs.getBool("other.useLiveEventsAndTexts");
			if(htlivesightPrefs.getBool("matches.league.getScorers") != null){
				prefs.matches.league.getScorers = htlivesightPrefs.getBool("matches.league.getScorers");
			}
	}catch(e){
		prefs= preferences;
	};
	try {
		if(service && !temp && !prefs){
			prefs.general.openInTab = service.getBoolPref("htlivesight.openInTab");
			prefs.general.friendsList = htlivesight.Preferences.friends.get();
			prefs.general.hattrickServer = service.getCharPref("htlivesight.general.hattrickServer");
			prefs.general.toolbarInited = service.getBoolPref("htlivesight.general.toolbarInited");
			//prefs.matches.allMine.get = service.getBoolPref("htlivesight.matches.allMine.get");
			prefs.matches.allMine.within = service.getBoolPref("htlivesight.matches.allMine.within");
			prefs.matches.allMine.withinHours = service.getIntPref("htlivesight.matches.allMine.withinHours");
			prefs.matches.league.get = service.getBoolPref("htlivesight.matches.league.get");
			prefs.matches.league.within = service.getBoolPref("htlivesight.matches.league.within");
			prefs.matches.league.withinHours = service.getIntPref("htlivesight.matches.league.withinHours");
			prefs.matches.league.getScorers = service.getBoolPref("htlivesight.matches.league.getScorers");
			prefs.matches.friends.get = service.getBoolPref("htlivesight.matches.friends.get");
			prefs.matches.friends.within = service.getBoolPref("htlivesight.matches.friends.within");
			prefs.matches.friends.withinHours = service.getIntPref("htlivesight.matches.friends.withinHours");
			

			prefs.matches.friends.doNotGetFriendsHointegratedMatches = service.getBoolPref("htlivesight.matches.friends.doNotGetFriendsHointegratedMatches");

			prefs.matches.scorers = service.getBoolPref("htlivesight.matches.scorers");
			prefs.matches.booked = service.getBoolPref("htlivesight.matches.booked");
			prefs.matches.sentOff = service.getBoolPref("htlivesight.matches.sentOff");
			prefs.matches.injured = service.getBoolPref("htlivesight.matches.injured");
			prefs.matches.windowSize = service.getIntPref("htlivesight.matches.windowSize");
			prefs.notification.sound = service.getBoolPref("htlivesight.notification.sound");
			prefs.notification.soundOnlyOpened = service.getBoolPref("htlivesight.notification.soundOnlyOpened");
			prefs.notification.flash = service.getBoolPref("htlivesight.notification.flash");
			prefs.notification.slider = service.getBoolPref("htlivesight.notification.slider");
			prefs.language.locale = service.getCharPref("htlivesight.language");
			prefs.other.bottomUp = service.getBoolPref("htlivesight.other.bottomUp");
			prefs.other.reLive = service.getBoolPref("htlivesight.other.reLive");
			prefs.other.reLiveSpeed = service.getIntPref("htlivesight.other.reLiveSpeed");
			prefs.other.reLiveByEvent = service.getBoolPref("htlivesight.other.reLiveByEvent");
			prefs.other.printEventKey = service.getBoolPref("htlivesight.other.printEventKey");
			prefs.personalization.oldIcons = service.getBoolPref("htlivesight.personalization.oldIcons");
			prefs.personalization.weather = service.getBoolPref("htlivesight.personalization.weather");
			prefs.personalization.whistleTime = service.getBoolPref("htlivesight.personalization.whistleTime");
			prefs.personalization.weatherSE = service.getBoolPref("htlivesight.personalization.weatherSE");
			prefs.personalization.livefoxGoal = service.getBoolPref("htlivesight.personalization.livefoxGoal");
			prefs.personalization.noOpGoal = service.getBoolPref("htlivesight.personalization.noOpGoal");
			prefs.personalization.secondSoundEqualFirst = service.getBoolPref("htlivesight.personalization.secondSoundEqualFirst");
			prefs.personalization.myGoalSoundPath=service.getCharPref("htlivesight.personalization.myGoalSoundPath");
			prefs.personalization.opGoalSoundPath=service.getCharPref("htlivesight.personalization.opGoalSoundPath");
			prefs.personalization.frGoalSoundPath=service.getCharPref("htlivesight.personalization.frGoalSoundPath");
			prefs.personalization.opfrGoalSoundPath=service.getCharPref("htlivesight.personalization.opfrGoalSoundPath");
			prefs.personalization.otGoalSoundPath=service.getCharPref("htlivesight.personalization.otGoalSoundPath");
			prefs.personalization.missGoalSoundPath=service.getCharPref("htlivesight.personalization.missGoalSoundPath");
			prefs.personalization.sunSoundPath=service.getCharPref("htlivesight.personalization.sunSoundPath");
			prefs.personalization.rainSoundPath=service.getCharPref("htlivesight.personalization.rainSoundPath");
			prefs.personalization.overcastSoundPath=service.getCharPref("htlivesight.personalization.overcastSoundPath");
			prefs.personalization.fewCloudsSoundPath=service.getCharPref("htlivesight.personalization.fewCloudsSoundPath");
			prefs.personalization.myBooSoundPath=service.getCharPref("htlivesight.personalization.myBooSoundPath");
			prefs.personalization.opBooSoundPath=service.getCharPref("htlivesight.personalization.opBooSoundPath");
			prefs.personalization.whistleStartSoundPath=service.getCharPref("htlivesight.personalization.whistleStartSoundPath");
			prefs.personalization.whistle2SoundPath=service.getCharPref("htlivesight.personalization.whistle2SoundPath");
			prefs.personalization.whistle3SoundPath=service.getCharPref("htlivesight.personalization.whistle3SoundPath");
			prefs.personalization.whistleSoundPath=service.getCharPref("htlivesight.personalization.whistleSoundPath");
			prefs.personalization.hattrickSoundPath=service.getCharPref("htlivesight.personalization.hattrickSoundPath");

			prefs.personalization.pressingSoundPath=service.getCharPref("htlivesight.personalization.pressingSoundPath");
			prefs.personalization.myBruisedSoundPath=service.getCharPref("htlivesight.personalization.myBruisedSoundPath");
			prefs.personalization.otherBruisedSoundPath=service.getCharPref("htlivesight.personalization.otherSentOffSoundPath");
			prefs.personalization.mySentOffSoundPath=service.getCharPref("htlivesight.personalization.mySentOffSoundPath");
			prefs.personalization.otherSentOffSoundPath=service.getCharPref("htlivesight.personalization.otherSentOffSoundPath");

			prefs.personalization.missFriendSoundPath=service.getCharPref("htlivesight.personalization.missFriendSoundPath");
			prefs.personalization.missOtherSoundPath=service.getCharPref("htlivesight.personalization.missOtherSoundPath");
			prefs.personalization.infoSoundPath=service.getCharPref("htlivesight.personalization.infoSoundPath");
			prefs.personalization.myFavouriteGoalSoundPath=service.getCharPref("htlivesight.personalization.myFavouriteGoalSoundPath");
			prefs.personalization.myFavouritePlayersId=service.getCharPref("htlivesight.personalization.myFavouritePlayersId");

			prefs.personalization.myGoalCheck=service.getBoolPref("htlivesight.personalization.myGoalCheck");
			prefs.personalization.opGoalCheck=service.getBoolPref("htlivesight.personalization.opGoalCheck");
			prefs.personalization.frGoalCheck=service.getBoolPref("htlivesight.personalization.frGoalCheck");
			prefs.personalization.opfrGoalCheck=service.getBoolPref("htlivesight.personalization.opfrGoalCheck");
			prefs.personalization.otGoalCheck=service.getBoolPref("htlivesight.personalization.otGoalCheck");
			prefs.personalization.missGoalCheck=service.getBoolPref("htlivesight.personalization.missGoalCheck");
			prefs.personalization.sunCheck=service.getBoolPref("htlivesight.personalization.sunCheck");
			prefs.personalization.rainCheck=service.getBoolPref("htlivesight.personalization.rainCheck");
			prefs.personalization.overcastCheck=service.getBoolPref("htlivesight.personalization.overcastCheck");
			prefs.personalization.fewCloudsCheck=service.getBoolPref("htlivesight.personalization.fewCloudsCheck");
			prefs.personalization.myBooCheck=service.getBoolPref("htlivesight.personalization.myBooCheck");
			prefs.personalization.opBooCheck=service.getBoolPref("htlivesight.personalization.opBooCheck");
			prefs.personalization.whistleStartCheck=service.getBoolPref("htlivesight.personalization.whistleStartCheck");
			prefs.personalization.whistle2Check=service.getBoolPref("htlivesight.personalization.whistle2Check");
			prefs.personalization.whistle3Check=service.getBoolPref("htlivesight.personalization.whistle3Check");
			prefs.personalization.whistleCheck=service.getBoolPref("htlivesight.personalization.whistleCheck");
			prefs.personalization.hattrickCheck=service.getBoolPref("htlivesight.personalization.hattrickCheck");

			prefs.personalization.pressingCheck=service.getBoolPref("htlivesight.personalization.pressingCheck");
			prefs.personalization.myBruisedCheck=service.getBoolPref("htlivesight.personalization.myBruisedCheck");
			prefs.personalization.otherBruisedCheck=service.getBoolPref("htlivesight.personalization.otherSentOffCheck");
			prefs.personalization.mySentOffCheck=service.getBoolPref("htlivesight.personalization.mySentOffCheck");
			prefs.personalization.otherSentOffCheck=service.getBoolPref("htlivesight.personalization.otherSentOffCheck");

			prefs.personalization.missFriendCheck=service.getBoolPref("htlivesight.personalization.missFriendCheck");
			prefs.personalization.missOtherCheck=service.getBoolPref("htlivesight.personalization.missOtherCheck");
			prefs.personalization.infoCheck=service.getBoolPref("htlivesight.personalization.infoCheck");
			prefs.personalization.myFavouriteGoalCheck=service.getBoolPref("htlivesight.personalization.myFavouriteGoalCheck");
			prefs.personalization.myFavouritePlayersId=service.getCharPref("htlivesight.personalization.myFavouritePlayersId");

			prefs.colors.friendHomeColorCheck= service.getBoolPref("htlivesight.colors.friendHomeColorCheck");
			prefs.colors.friendHomeColorCode= service.getCharPref("htlivesight.colors.friendHomeColorCode");
			prefs.colors.friendAwayColorCheck= service.getBool("htlivesight.colors.friendAwayColorCheck");
			prefs.colors.friendAwayColorCode= service.getCharPref("htlivesight.colors.friendAwayColorCode");
			prefs.colors.foeHomeColorCheck= service.getBool("htlivesight.colors.foeHomeColorCheck");
			prefs.colors.foeHomeColorCode= service.getCharPref("htlivesight.colors.foeHomeColorCode");
			prefs.colors.foeAwayColorCheck= services.getBool("htlivesight.colors.foeAwayColorCheck");
			prefs.colors.foeAwayColorCode= service.getCharPref("htlivesight.colors.foeAwayColorCode");
			prefs.colors.textColorCheck= services.getBool("htlivesight.colors.textColorCheck");
			prefs.colors.textColorCode= service.getCharPref("htlivesight.colors.textColorCode");
			prefs.colors.seTextColorCheck= services.getBool("htlivesight.colors.seTextColorCheck");
			prefs.colors.seTextColorCode= service.getCharPref("htlivesight.colors.seTextColorCode");
			prefs.colors.headerBarColorCheck= services.getBool("htlivesight.colors.headerBarColorCheck");
			prefs.colors.headerBarColorCode= service.getCharPref("htlivesight.colors.headerBarColorCode");
			prefs.colors.headerBarTextColorCheck= services.getBool("htlivesight.colors.headerBarTextColorCheck");
			prefs.colors.headerBarTextColorCode= service.getCharPref("htlivesight.colors.headerBarTextColorCode");
			prefs.personalization.settingVolumeSound = service.getBoolPref("htlivesight.personalization.settingVolumeSound");
			prefs.notification.sound = service.getBoolPref("htlivesight.notification.sound");

			prefs.matches.tournament.get = service.getBoolPref("htlivesight.matches.tournament.get");
			prefs.matches.tournament.within = service.getBoolPref("htlivesight.matches.tournament.within");
			prefs.matches.tournament.withinHours = service.getIntPref("htlivesight.matches.tournament.withinHours");
			
			prefs.matches.myYouthMatch = service.getBoolPref("htlivesight.matches.myYouthMatch");
			prefs.matches.youthLeague.get = service.getBoolPref("htlivesight.matches.youthLeague.get");
			prefs.matches.youthLeague.within = service.getBoolPref("htlivesight.matches.youthLeague.within");
			prefs.matches.youthLeague.withinHours = service.getIntPref("htlivesight.matches.youthLeague.withinHours");
			prefs.other.getMyDataAutomatically = service.getBoolPref("htlivesight.other.getMyDataAutomatically");
			prefs.other.useLiveEventsAndTexts = service.getBoolPref("htlivesight.other.useLiveEventsAndTexts");
		}
		//prefs.general.customBackgroundPath = service.getCharPref("htlivesight.general.customBackgroundPath");
	} catch(e) {
		htlivesight.Log.warn("Cannot load preferences: " + e);
	}
	try {
		prefs.general.teamId = htlivesight.Preferences.teamId.get();
	} catch(e) {
		htlivesight.Log.warn("Cannot load teamId: " + e);
	}
	try {
		prefs.general.secondTeamId = htlivesight.Preferences.secondTeamId.get();
	} catch(e) {
		htlivesight.Log.warn("Cannot load secondTeamId: " + e);
	}
	try {
		prefs.general.thirdTeamId = htlivesight.Preferences.thirdTeamId.get();
	} catch(e) {
		htlivesight.Log.warn("Cannot load thirdTeamId: " + e);
	}
};
htlivesight.Preferences.save = function(prefs) {
	try {
		htlivesight.Log.trace("saving preferences...");
		htlivesight.Preferences.start();
		//var s = htlivesight.Preferences.service;
		htlivesightPrefs.setInt("general.theme", prefs.general.theme);
		htlivesightPrefs.setBool("openInTab", prefs.general.openInTab);
		htlivesight.Preferences.friends.save(prefs.general.friendsList);
		htlivesightPrefs.setString("general.hattrickServer", prefs.general.hattrickServer);
		htlivesightPrefs.setBool("general.toolbarInited", prefs.general.toolbarInited);
		//htlivesightPrefs.setBool("matches.allMine.get",prefs.matches.allMine.get);
		htlivesightPrefs.setBool("matches.allMine.within",prefs.matches.allMine.within);
		htlivesightPrefs.setInt("matches.allMine.withinHours",prefs.matches.allMine.withinHours);
		htlivesightPrefs.setBool("matches.league.get",prefs.matches.league.get);
		htlivesightPrefs.setBool("matches.league.within",prefs.matches.league.within);
		htlivesightPrefs.setInt("matches.league.withinHours",prefs.matches.league.withinHours);
		htlivesightPrefs.setBool("matches.league.getScorers",prefs.matches.league.getScorers);
		htlivesightPrefs.setBool("matches.friends.get",prefs.matches.friends.get);
		htlivesightPrefs.setBool("matches.friends.within",prefs.matches.friends.within);
		htlivesightPrefs.setInt("matches.friends.withinHours",prefs.matches.friends.withinHours);

		htlivesightPrefs.setBool("matches.friends.doNotGetFriendsHointegratedMatches",prefs.matches.friends.doNotGetFriendsHointegratedMatches);

		htlivesightPrefs.setBool("matches.scorers",prefs.matches.scorers);
		htlivesightPrefs.setBool("matches.booked",prefs.matches.booked);
		htlivesightPrefs.setBool("matches.sentOff",prefs.matches.sentOff);
		htlivesightPrefs.setBool("matches.injured",prefs.matches.injured);
		htlivesightPrefs.setInt("matches.windowSize",prefs.matches.windowSize);
		htlivesightPrefs.setBool("notification.sound",prefs.notification.sound);
		htlivesightPrefs.setBool("notification.soundOnlyOpened",prefs.notification.soundOnlyOpened);
		htlivesightPrefs.setBool("notification.flash",prefs.notification.flash);
		htlivesightPrefs.setBool("notification.slider",prefs.notification.slider);
		htlivesightPrefs.setString("language", prefs.language.locale);
		htlivesightPrefs.setBool("other.bottomUp", prefs.other.bottomUp);
		htlivesightPrefs.setBool("other.printEventKey", prefs.other.printEventKey);
		htlivesightPrefs.setBool("personalization.oldIcons", prefs.personalization.oldIcons);
		htlivesightPrefs.setBool("personalization.weather", prefs.personalization.weather);
		htlivesightPrefs.setBool("personalization.whistleTime", prefs.personalization.whistleTime);
		htlivesightPrefs.setBool("personalization.weatherSE", prefs.personalization.weatherSE);
		htlivesightPrefs.setBool("personalization.livefoxGoal", prefs.personalization.livefoxGoal);
		htlivesightPrefs.setBool("personalization.noOpGoal", prefs.personalization.noOpGoal);
		htlivesightPrefs.setBool("personalization.secondSoundEqualFirst", prefs.personalization.secondSoundEqualFirst);
		htlivesightPrefs.setBool("personalization.youthSoundEqualSenior", prefs.personalization.youthSoundEqualSenior);
		htlivesightPrefs.setString("personalization.myGoalSoundPath", prefs.personalization.myGoalSoundPath);
		htlivesightPrefs.setString("personalization.opGoalSoundPath", prefs.personalization.opGoalSoundPath);
		htlivesightPrefs.setString("personalization.frGoalSoundPath", prefs.personalization.frGoalSoundPath);
		htlivesightPrefs.setString("personalization.opfrGoalSoundPath", prefs.personalization.opfrGoalSoundPath);
		htlivesightPrefs.setString("personalization.otGoalSoundPath", prefs.personalization.otGoalSoundPath);
		htlivesightPrefs.setString("personalization.missGoalSoundPath", prefs.personalization.missGoalSoundPath);
		htlivesightPrefs.setString("personalization.sunSoundPath", prefs.personalization.sunSoundPath);
		htlivesightPrefs.setString("personalization.rainSoundPath", prefs.personalization.rainSoundPath);
		htlivesightPrefs.setString("personalization.overcastSoundPath", prefs.personalization.overcastSoundPath);
		htlivesightPrefs.setString("personalization.fewCloudsSoundPath", prefs.personalization.fewCloudsSoundPath);
		htlivesightPrefs.setString("personalization.myBooSoundPath", prefs.personalization.myBooSoundPath);
		htlivesightPrefs.setString("personalization.opBooSoundPath", prefs.personalization.opBooSoundPath);
		htlivesightPrefs.setString("personalization.whistleStartSoundPath", prefs.personalization.whistleStartSoundPath);
		htlivesightPrefs.setString("personalization.whistle2SoundPath", prefs.personalization.whistle2SoundPath);
		htlivesightPrefs.setString("personalization.whistle3SoundPath", prefs.personalization.whistle3SoundPath);
		htlivesightPrefs.setString("personalization.whistleSoundPath", prefs.personalization.whistleSoundPath);
		htlivesightPrefs.setString("personalization.hattrickSoundPath", prefs.personalization.hattrickSoundPath);

		htlivesightPrefs.setString("personalization.pressingSoundPath", prefs.personalization.pressingSoundPath);
		htlivesightPrefs.setString("personalization.myBruisedSoundPath", prefs.personalization.myBruisedSoundPath);
		htlivesightPrefs.setString("personalization.otherBruisedSoundPath", prefs.personalization.otherBruisedSoundPath);
		htlivesightPrefs.setString("personalization.mySentOffSoundPath", prefs.personalization.mySentOffSoundPath);
		htlivesightPrefs.setString("personalization.otherSentOffSoundPath", prefs.personalization.otherSentOffSoundPath);

		htlivesightPrefs.setString("personalization.missFriendSoundPath", prefs.personalization.missFriendSoundPath);
		htlivesightPrefs.setString("personalization.missOtherSoundPath", prefs.personalization.missOtherSoundPath);
		htlivesightPrefs.setString("personalization.infoSoundPath", prefs.personalization.infoSoundPath);
		htlivesightPrefs.setString("personalization.myFavouriteGoalSoundPath", prefs.personalization.myFavouriteGoalSoundPath);
		htlivesightPrefs.setString("personalization.myFavouritePlayersId", prefs.personalization.myFavouritePlayersId);

		htlivesightPrefs.setBool("personalization.myGoalCheck", prefs.personalization.myGoalCheck);
		htlivesightPrefs.setBool("personalization.opGoalCheck", prefs.personalization.opGoalCheck);
		htlivesightPrefs.setBool("personalization.frGoalCheck", prefs.personalization.frGoalCheck);
		htlivesightPrefs.setBool("personalization.opfrGoalCheck", prefs.personalization.opfrGoalCheck);
		htlivesightPrefs.setBool("personalization.otGoalCheck", prefs.personalization.otGoalCheck);
		htlivesightPrefs.setBool("personalization.missGoalCheck", prefs.personalization.missGoalCheck);
		htlivesightPrefs.setBool("personalization.sunCheck", prefs.personalization.sunCheck);
		htlivesightPrefs.setBool("personalization.rainCheck", prefs.personalization.rainCheck);
		htlivesightPrefs.setBool("personalization.overcastCheck", prefs.personalization.overcastCheck);
		htlivesightPrefs.setBool("personalization.fewCloudsCheck", prefs.personalization.fewCloudsCheck);
		htlivesightPrefs.setBool("personalization.myBooCheck", prefs.personalization.myBooCheck);
		htlivesightPrefs.setBool("personalization.opBooCheck", prefs.personalization.opBooCheck);
		htlivesightPrefs.setBool("personalization.whistleStartCheck", prefs.personalization.whistleStartCheck);
		htlivesightPrefs.setBool("personalization.whistle2Check", prefs.personalization.whistle2Check);
		htlivesightPrefs.setBool("personalization.whistle3Check", prefs.personalization.whistle3Check);
		htlivesightPrefs.setBool("personalization.whistleCheck", prefs.personalization.whistleCheck);
		htlivesightPrefs.setBool("personalization.hattrickCheck", prefs.personalization.hattrickCheck);

		htlivesightPrefs.setBool("personalization.pressingCheck", prefs.personalization.pressingCheck);
		htlivesightPrefs.setBool("personalization.myBruisedCheck", prefs.personalization.myBruisedCheck);
		htlivesightPrefs.setBool("personalization.otherBruisedCheck", prefs.personalization.otherBruisedCheck);
		htlivesightPrefs.setBool("personalization.mySentOffCheck", prefs.personalization.mySentOffCheck);
		htlivesightPrefs.setBool("personalization.otherSentOffCheck", prefs.personalization.otherSentOffCheck);

		htlivesightPrefs.setBool("personalization.missFriendCheck", prefs.personalization.missFriendCheck);
		htlivesightPrefs.setBool("personalization.missOtherCheck", prefs.personalization.missOtherCheck);
		htlivesightPrefs.setBool("personalization.infoCheck", prefs.personalization.infoCheck);
		htlivesightPrefs.setBool("personalization.myFavouriteGoalCheck", prefs.personalization.myFavouriteGoalCheck);

		htlivesightPrefs.setBool("colors.friendHomeColorCheck", prefs.colors.friendHomeColorCheck);
		htlivesightPrefs.setString("colors.friendHomeColorCode", prefs.colors.friendHomeColorCode);
		htlivesightPrefs.setBool("colors.friendAwayColorCheck", prefs.colors.friendAwayColorCheck);
		htlivesightPrefs.setString("colors.friendAwayColorCode", prefs.colors.friendAwayColorCode);
		htlivesightPrefs.setBool("colors.foeHomeColorCheck", prefs.colors.foeHomeColorCheck);
		htlivesightPrefs.setString("colors.foeHomeColorCode", prefs.colors.foeHomeColorCode);
		htlivesightPrefs.setBool("colors.foeAwayColorCheck", prefs.colors.foeAwayColorCheck);
		htlivesightPrefs.setString("colors.foeAwayColorCode", prefs.colors.foeAwayColorCode);
		htlivesightPrefs.setBool("colors.neutralColorCheck", prefs.colors.neutralColorCheck);
		htlivesightPrefs.setString("colors.neutralColorCode", prefs.colors.neutralColorCode);
		htlivesightPrefs.setBool("colors.friendHomeTextColorCheck", prefs.colors.friendHomeTextColorCheck);
		htlivesightPrefs.setString("colors.friendHomeTextColorCode", prefs.colors.friendHomeTextColorCode);
		htlivesightPrefs.setBool("colors.friendAwayTextColorCheck", prefs.colors.friendAwayTextColorCheck);
		htlivesightPrefs.setString("colors.friendAwayTextColorCode", prefs.colors.friendAwayTextColorCode);
		htlivesightPrefs.setBool("colors.foeHomeTextColorCheck", prefs.colors.foeHomeTextColorCheck);
		htlivesightPrefs.setString("colors.foeHomeTextColorCode", prefs.colors.foeHomeTextColorCode);
		htlivesightPrefs.setBool("colors.foeAwayTextColorCheck", prefs.colors.foeAwayTextColorCheck);
		htlivesightPrefs.setString("colors.foeAwayTextColorCode", prefs.colors.foeAwayTextColorCode);
		htlivesightPrefs.setBool("colors.neutralTextColorCheck", prefs.colors.neutralTextColorCheck);
		htlivesightPrefs.setString("colors.neutralTextColorCode", prefs.colors.neutralTextColorCode);
		htlivesightPrefs.setBool("colors.seTextColorCheck", prefs.colors.seTextColorCheck);
		htlivesightPrefs.setString("colors.seTextColorCode", prefs.colors.seTextColorCode);
		htlivesightPrefs.setString("general.customBackgroundPath",prefs.general.customBackgroundPath);
		htlivesightPrefs.setBool("general.extendBackground",prefs.general.extendBackground);
		htlivesightPrefs.setBool("general.repeatBackground",prefs.general.repeatBackground);
		//	alert("extend = "+prefs.general.extendBackground+" repeat = "+ prefs.general.repeatBackground);
		htlivesight.Preferences.teamId.save(prefs.general.teamId);
		htlivesight.Preferences.secondTeamId.save(prefs.general.secondTeamId);
		htlivesight.Preferences.thirdTeamId.save(prefs.general.thirdTeamId);

		htlivesightPrefs.setBool("colors.headerBarColorCheck", prefs.colors.headerBarColorCheck);
		htlivesightPrefs.setString("colors.headerBarColorCode", prefs.colors.headerBarColorCode);
		htlivesightPrefs.setBool("colors.headerBarTextColorCheck", prefs.colors.headerBarTextColorCheck);
		htlivesightPrefs.setString("colors.headerBarTextColorCode", prefs.colors.headerBarTextColorCode);
		htlivesightPrefs.setBool("personalization.settingVolumeSound", prefs.personalization.settingVolumeSound);
		htlivesightPrefs.setBool("other.exportOauth", prefs.other.exportOauth);
		htlivesightPrefs.setBool("other.exportBackground", prefs.other.exportBackground);
		htlivesightPrefs.setBool("other.exportSounds", prefs.other.exportSounds);

		htlivesightPrefs.setBool("matches.tournament.get", prefs.matches.tournament.get);
		htlivesightPrefs.setBool("matches.tournament.within", prefs.matches.tournament.within);
		htlivesightPrefs.setInt("matches.tournament.withinHours", prefs.matches.tournament.withinHours);
		
		
		htlivesightPrefs.setBool("matches.myYouthMatch",prefs.matches.myYouthMatch);
		htlivesightPrefs.setBool("matches.youthLeague.get",prefs.matches.youthLeague.get);
		htlivesightPrefs.setBool("matches.youthLeague.within",prefs.matches.youthLeague.within);
		htlivesightPrefs.setInt("matches.youthLeague.withinHours",prefs.matches.youthLeague.withinHours);
		htlivesightPrefs.setBool("other.useLiveEventsAndTexts", prefs.other.useLiveEventsAndTexts);
		//s.deleteBranch("htlivesight");
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
				friends = htlivesightPrefs.getString("friendsList");
				if(service  && !friends){
					friends = service.getCharPref("htlivesight.friendsList");
				}
			} catch(e) {
				htlivesight.Log.warn("cannot load friends. " + e);
			}
			return friends;
		},
		save: function(friends) {
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				htlivesightPrefs.setString("friendsList", friends);
			} catch(e) {
				alert("cannot save friends. " + e);
			}
		}
};
htlivesight.Preferences.teamId = {
		get: function() {
			var teamId="";
			try {
				htlivesight.Preferences.start();
				var service = htlivesight.Preferences.service;
				teamId = htlivesightPrefs.getString("teamId");
				if(service && !teamId){
					teamId = service.getCharPref("htlivesight.teamId");
				}
			} catch(e) {
				htlivesight.Log.warn("cannot load teamId. " + e);
			}
			return teamId;
		},
		save: function(teamId) {
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				htlivesightPrefs.setString("teamId", teamId);
			} catch(e) {
				htlivesight.Log.warn("cannot save teamId. " + e);
			}
		}
};

htlivesight.Preferences.secondTeamId = {
		get: function() {
			var teamId="";
			try {
				htlivesight.Preferences.start();
				var service = htlivesight.Preferences.service;
				teamId = htlivesightPrefs.getString("secondTeamId");
				if(service && !teamId){
					teamId = service.getCharPref("htlivesight.secondTeamId");
				}
			} catch(e) {
				htlivesight.Log.warn("cannot load secondTeamId. " + e);
			}
			return teamId;
		},
		save: function(teamId) {
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				htlivesightPrefs.setString("secondTeamId", teamId);
			} catch(e) {
				htlivesight.Log.warn("cannot save secondTeamId. " + e);
			}
		}
};

htlivesight.Preferences.thirdTeamId = {
		get: function() {
			var teamId="";
			try {
				htlivesight.Preferences.start();
				var service = htlivesight.Preferences.service;
				teamId = htlivesightPrefs.getString("thirdTeamId");
				if(service && !teamId){
					teamId = service.getCharPref("htlivesight.thirdTeamId");
				}
			} catch(e) {
				htlivesight.Log.warn("cannot load thirdTeamId. " + e);
			}
			return teamId;
		},
		save: function(teamId) {
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				htlivesightPrefs.setString("thirdTeamId", teamId);
			} catch(e) {
				htlivesight.Log.warn("cannot save thirdTeamId. " + e);
			}
		}
};

htlivesight.Preferences.ReLive = {
		get: function() {
			var reLive=false;
			try {
				htlivesight.Preferences.start();
				var service = htlivesight.Preferences.service;
				reLive = htlivesightPrefs.getBool("other.reLive");
				reLive = service.getBoolPref("htlivesight.other.reLive");
			} catch(e) {
				htlivesight.Log.warn("cannot load ReLive options. " + e);
			}
			return reLive;
		},
		save: function(reLive, reLiveSpeed, reLiveByEvent) {
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				htlivesightPrefs.setBool("other.reLive", reLive);
				htlivesightPrefs.setInt("other.reLiveSpeed", reLiveSpeed);
				htlivesightPrefs.setBool("other.reLiveByEvent", reLiveByEvent);
			} catch(e) {
				htlivesight.Log.warn("Cannot save relive options. " + e);
			}
		}
};
htlivesight.Preferences.clearAllMatches= {
		get: function() {
			var clearAllMatches = false;
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				clearAllMatches = htlivesightPrefs.getBool("other.clearAllMatches");
				//reLive = service.getBoolPref("htlivesight.other.reLive");
			} catch(e) {
				htlivesight.Log.warn("Cannot load clear all matches option. " + e);
			}
			return clearAllMatches;
		},
		save: function(clearAllMatches){
			try{
				htlivesight.Preferences.start();
				htlivesightPrefs.setBool("other.clearAllMatches", clearAllMatches);
			}catch(e){
				htlivesight.Log.warn("Cannot save clear all matches options. " + e);
			}
		}
};
htlivesight.Preferences.getMyDataAutomatically= {
		get: function() {
			var getMyDataAutomatically = true;
			try {
				htlivesight.Preferences.start();
				//var service = htlivesight.Preferences.service;
				getMyDataAutomatically = htlivesightPrefs.getBool("other.getMyDataAutomatically");
				//reLive = service.getBoolPref("htlivesight.other.reLive");
			} catch(e) {
				htlivesight.Log.warn("Cannot load getMyDataAutomatically option. " + e);
			}
			return getMyDataAutomatically;
		},
		save: function(getMyDataAutomatically){
			try{
				htlivesight.Preferences.start();
				htlivesightPrefs.setBool("other.getMyDataAutomatically", getMyDataAutomatically);
			}catch(e){
				htlivesight.Log.warn("Cannot save getMyDataAutomatically option. " + e);
			}
		}
};
//It's highly probable this function isn't used anymore
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