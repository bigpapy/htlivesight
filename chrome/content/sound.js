htlivesight.Sound = {
		urlQueryInterface: null,
		sampleQueryInterface: null,
		samplePath: "sound/",
};
htlivesight.Sound.sample = function(file) {
	this.url = new Object;
	if(htlivesight.platform == "Safari"){
		//this.url.spec = 'http://htlivesight.sourceforge.net/'+ htlivesight.Sound.samplePath + file;
		this.url.spec = "http://htlivesight.googlecode.com/svn/trunk/chrome/content/" + htlivesight.Sound.samplePath + file;
	}else{
		this.url.spec = htlivesight.ResourcePath + htlivesight.Sound.samplePath + file;
	}
};
htlivesight.Sound.sample.prototype.play = function() {
	htlivesight.Sound.play(this.url.spec, document);
};
htlivesight.Sound.play = function(url,doc) {
	try {
		try  {
			if (htlivesight.Util.detectWinXpAndFF()) throw "winXPAndFF";
			var music = new Audio(url);
			if($( "#volume_slider" ).length == 1){// if there is the slider 
				music.volume = $( "#volume_slider" ).slider( "value" )/100;
			}else if(htlivesight.prefs.general.volume){ // if there is volume saved
				music.volume = htlivesight.prefs.general.volume/100; 
			}else{ // use max volume
				music.volume = 1;
			}
			music.play();
			//console.log("Audio1");
		} catch(e) {
			console.log(e);
			var music = doc.createElement('audio');
			console.log(music.canPlayType('audio/mpeg'));
			music.volume = $( "#volume_slider" ).slider( "value" )/100;
			music.setAttribute("autoplay","autoplay");
			var source = doc.createElement('source');
			source.setAttribute('src',url);
			if(htlivesight.platform == "Safari"){
				source.setAttribute('type','audio/mp3');
			}else{
				source.setAttribute('type','audio/ogg');
			}
			music.appendChild(source);
			doc.getElementsByTagName('body')[0].appendChild(music);
			//console.log("Audio2");
		}
	} catch(e){
		alert("Cannot play sound: ", url);
	}
};
htlivesight.Sound.start = function() {
//	if (htlivesightEnv.arch === "Gecko") {
//	var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
//	htlivesight.Sound.sampleQueryInterface = sample.QueryInterface(Components.interfaces.nsISound);
//	}
	htlivesight.Sound.sample.mygoal.url.spec = htlivesight.prefs.personalization.myGoalSoundPath;
	htlivesight.Sound.sample.opgoal.url.spec = htlivesight.prefs.personalization.opGoalSoundPath;
	htlivesight.Sound.sample.frgoal.url.spec = htlivesight.prefs.personalization.frGoalSoundPath;
	htlivesight.Sound.sample.opfrgoal.url.spec = htlivesight.prefs.personalization.opfrGoalSoundPath;
	htlivesight.Sound.sample.otgoal.url.spec = htlivesight.prefs.personalization.otGoalSoundPath;
	htlivesight.Sound.sample.myboo.url.spec = htlivesight.prefs.personalization.myBooSoundPath;
	htlivesight.Sound.sample.opboo.url.spec = htlivesight.prefs.personalization.opBooSoundPath;
	htlivesight.Sound.sample.miss.url.spec = htlivesight.prefs.personalization.missGoalSoundPath;
	htlivesight.Sound.sample.whistle.url.spec = htlivesight.prefs.personalization.whistleSoundPath;
	htlivesight.Sound.sample.tarzan.url.spec = htlivesight.prefs.personalization.hattrickSoundPath;
	htlivesight.Sound.sample.sun.url.spec = htlivesight.prefs.personalization.sunSoundPath;
	htlivesight.Sound.sample.few_clouds.url.spec = htlivesight.prefs.personalization.fewCloudsSoundPath;
	htlivesight.Sound.sample.overcast.url.spec = htlivesight.prefs.personalization.overcastSoundPath;
	htlivesight.Sound.sample.rain.url.spec = htlivesight.prefs.personalization.rainSoundPath;
	htlivesight.Sound.sample.end.url.spec = htlivesight.prefs.personalization.whistle3SoundPath;
	htlivesight.Sound.sample.end_half.url.spec = htlivesight.prefs.personalization.whistle2SoundPath;
	htlivesight.Sound.sample.beginning.url.spec = htlivesight.prefs.personalization.whistleStartSoundPath;
	htlivesight.Sound.sample.pressing.url.spec = htlivesight.prefs.personalization.pressingSoundPath;
	htlivesight.Sound.sample.mybruised.url.spec = htlivesight.prefs.personalization.myBruisedSoundPath;
	htlivesight.Sound.sample.otherbruised.url.spec = htlivesight.prefs.personalization.otherBruisedSoundPath;
	htlivesight.Sound.sample.mysentoff.url.spec = htlivesight.prefs.personalization.mySentOffSoundPath;
	htlivesight.Sound.sample.othersentoff.url.spec = htlivesight.prefs.personalization.otherSentOffSoundPath;
	htlivesight.Sound.sample.missFriend.url.spec = htlivesight.prefs.personalization.missFriendSoundPath;
	htlivesight.Sound.sample.missOther.url.spec = htlivesight.prefs.personalization.missOtherSoundPath;
	htlivesight.Sound.sample.info.url.spec = htlivesight.prefs.personalization.infoSoundPath;
	htlivesight.Sound.sample.myFavouriteGoal.url.spec = htlivesight.prefs.personalization.myFavouriteGoalSoundPath;
};
htlivesight.Sound.sample.mygoal = new htlivesight.Sound.sample("cheer_8k.mp3");
htlivesight.Sound.sample.opgoal = new htlivesight.Sound.sample("cheer1.mp3");
htlivesight.Sound.sample.frgoal = new htlivesight.Sound.sample("goal.mp3");
htlivesight.Sound.sample.opfrgoal = new htlivesight.Sound.sample("applause.mp3");
htlivesight.Sound.sample.otgoal = new htlivesight.Sound.sample("ovation.mp3");
htlivesight.Sound.sample.myboo = new htlivesight.Sound.sample("boo.mp3");
htlivesight.Sound.sample.opboo = new htlivesight.Sound.sample("OpBoo.mp3");
htlivesight.Sound.sample.miss = new htlivesight.Sound.sample("miss.mp3");
htlivesight.Sound.sample.whistle = new htlivesight.Sound.sample("whistle.mp3");
htlivesight.Sound.sample.tarzan = new htlivesight.Sound.sample("tarzan.mp3");
htlivesight.Sound.sample.sun = new htlivesight.Sound.sample("sun.mp3");
htlivesight.Sound.sample.few_clouds = new htlivesight.Sound.sample("few_clouds.mp3");
htlivesight.Sound.sample.overcast = new htlivesight.Sound.sample("overcast.mp3");
htlivesight.Sound.sample.rain = new htlivesight.Sound.sample("rain.mp3");
htlivesight.Sound.sample.end = new htlivesight.Sound.sample("whistle3.mp3");
htlivesight.Sound.sample.end_half = new htlivesight.Sound.sample("whistle2.mp3");
htlivesight.Sound.sample.beginning = new htlivesight.Sound.sample("whistle_start.mp3");
htlivesight.Sound.sample.pressing = new htlivesight.Sound.sample("pressing.mp3");
htlivesight.Sound.sample.mybruised = new htlivesight.Sound.sample("my_bruised.mp3");
htlivesight.Sound.sample.otherbruised = new htlivesight.Sound.sample("other_bruised.mp3");
htlivesight.Sound.sample.mysentoff = new htlivesight.Sound.sample("my_sent_off.mp3");
htlivesight.Sound.sample.othersentoff = new htlivesight.Sound.sample("other_sent_off.mp3");
htlivesight.Sound.sample.missFriend = new htlivesight.Sound.sample("miss_friend.mp3");
htlivesight.Sound.sample.missOther = new htlivesight.Sound.sample("miss_other.mp3");
htlivesight.Sound.sample.info = new htlivesight.Sound.sample("crowd.mp3");
htlivesight.Sound.sample.myFavouriteGoal = new htlivesight.Sound.sample("tarzan.mp3");