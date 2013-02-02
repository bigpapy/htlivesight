htlivesight.Sound = {		urlQueryInterface: null,		sampleQueryInterface: null,		samplePath: "sound/",};htlivesight.Sound.sample = function(file) {	this.url = new Object;	this.url.spec = htlivesight.ResourcePath + htlivesight.Sound.samplePath + file;  };htlivesight.Sound.sample.prototype.play = function() {	htlivesight.Sound.play(this.url.spec, document);
};htlivesight.Sound.play = function(url,doc) {	try {		try  {			 if (htlivesight.Util.detectWinXP_and_FF()) throw "winXP_and_FF";			var music = new Audio(url);			music.play();		} catch(e) {			var music = doc.createElement('audio');			music.setAttribute("autoplay","autoplay");			var source = doc.createElement('source');			source.setAttribute('src',url);			source.setAttribute('type','audio/ogg');			music.appendChild(source);			doc.getElementsByTagName('body')[0].appendChild(music);		}	} catch(e){		alert("Cannot play sound: ", url);	}};htlivesight.Sound.start = function() {	if (htlivesightEnv.arch === "Gecko") {		var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );		htlivesight.Sound.sampleQueryInterface = sample.QueryInterface(Components.interfaces.nsISound);	}	htlivesight.Sound.sample.mygoal.url.spec = htlivesight.prefs.personalization.myGoalSoundPath;	htlivesight.Sound.sample.opgoal.url.spec = htlivesight.prefs.personalization.opGoalSoundPath;	htlivesight.Sound.sample.frgoal.url.spec = htlivesight.prefs.personalization.frGoalSoundPath;	htlivesight.Sound.sample.opfrgoal.url.spec = htlivesight.prefs.personalization.opfrGoalSoundPath;	htlivesight.Sound.sample.otgoal.url.spec = htlivesight.prefs.personalization.otGoalSoundPath;	htlivesight.Sound.sample.myboo.url.spec = htlivesight.prefs.personalization.myBooSoundPath;	htlivesight.Sound.sample.opboo.url.spec = htlivesight.prefs.personalization.opBooSoundPath;	htlivesight.Sound.sample.miss.url.spec = htlivesight.prefs.personalization.missGoalSoundPath;	htlivesight.Sound.sample.whistle.url.spec = htlivesight.prefs.personalization.whistleSoundPath;	htlivesight.Sound.sample.tarzan.url.spec = htlivesight.prefs.personalization.hattrickSoundPath;	htlivesight.Sound.sample.sun.url.spec = htlivesight.prefs.personalization.sunSoundPath;	htlivesight.Sound.sample.few_clouds.url.spec = htlivesight.prefs.personalization.fewCloudsSoundPath;	htlivesight.Sound.sample.overcast.url.spec = htlivesight.prefs.personalization.overcastSoundPath;	htlivesight.Sound.sample.rain.url.spec = htlivesight.prefs.personalization.rainSoundPath;	htlivesight.Sound.sample.end.url.spec = htlivesight.prefs.personalization.whistle3SoundPath;	htlivesight.Sound.sample.end_half.url.spec = htlivesight.prefs.personalization.whistle2SoundPath;	htlivesight.Sound.sample.beginning.url.spec = htlivesight.prefs.personalization.whistleStartSoundPath;};htlivesight.Sound.sample.mygoal = new htlivesight.Sound.sample("cheer_8k.ogg");htlivesight.Sound.sample.opgoal = new htlivesight.Sound.sample("cheer1.ogg");htlivesight.Sound.sample.frgoal = new htlivesight.Sound.sample("goal.ogg");htlivesight.Sound.sample.opfrgoal = new htlivesight.Sound.sample("applause.ogg");htlivesight.Sound.sample.otgoal = new htlivesight.Sound.sample("ovation.ogg");htlivesight.Sound.sample.myboo = new htlivesight.Sound.sample("boo.ogg");htlivesight.Sound.sample.opboo = new htlivesight.Sound.sample("OpBoo.ogg");htlivesight.Sound.sample.miss = new htlivesight.Sound.sample("miss.ogg");htlivesight.Sound.sample.whistle = new htlivesight.Sound.sample("whistle.ogg");htlivesight.Sound.sample.tarzan = new htlivesight.Sound.sample("tarzan.ogg");htlivesight.Sound.sample.sun = new htlivesight.Sound.sample("sun.ogg");htlivesight.Sound.sample.few_clouds = new htlivesight.Sound.sample("few_clouds.ogg");htlivesight.Sound.sample.overcast = new htlivesight.Sound.sample("overcast.ogg");htlivesight.Sound.sample.rain = new htlivesight.Sound.sample("rain.ogg");htlivesight.Sound.sample.end = new htlivesight.Sound.sample("whistle3.ogg");htlivesight.Sound.sample.end_half = new htlivesight.Sound.sample("whistle2.ogg");htlivesight.Sound.sample.beginning = new htlivesight.Sound.sample("whistle_start.ogg");