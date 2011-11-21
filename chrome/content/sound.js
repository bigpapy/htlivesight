htlivesight.Sound = {
  urlQueryInterface: null,
  sampleQueryInterface: null,
  samplePath: "chrome://htlivesight/content/sound/",	  //  samplePath: "file:///home/lelone/Scrivania/"
};

htlivesight.Sound.sample = function(file) {
  var urlInstance = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();
  this.url = urlInstance.QueryInterface(Components.interfaces.nsIURL);  
  this.url.spec = htlivesight.Sound.samplePath + file;  
};

htlivesight.Sound.sample.prototype.play = function() {
 // htlivesight.Sound.sampleQueryInterface.play(this.url);  // new implementatio sound by foxtrick	try {		var soundService = Components.classes["@mozilla.org/sound;1"].getService(Components.interfaces.nsISound);		var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);		soundService.play(ioService.newURI(this.url.spec, null, null));		return;	} catch(e) {}
};


htlivesight.Sound.start = function() {
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

  
  //htlivesight.Sound.urlQueryInterface.spec = "chrome://htlivesight/content/sound/wav.wav";

  var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
  htlivesight.Sound.sampleQueryInterface = sample.QueryInterface(Components.interfaces.nsISound);
  //htlivesight.Sound.sampleQueryInterface.play(url)    // added by bigpapy  //  alert("Prima del percorso1");//  alert("Percorso suono: "+ htlivesight.prefs.personalization.opGoalSound);//  htlivesight.Sound.sample.mygoal.url.spec = ""+htlivesight.prefs.personalization.opGoalSound;  //  alert("dopo");
// moved here by bigpapy    htlivesight.Sound.sample.mygoal.url.spec = htlivesight.prefs.personalization.myGoalSoundPath;  htlivesight.Sound.sample.opgoal.url.spec = htlivesight.prefs.personalization.opGoalSoundPath;  htlivesight.Sound.sample.frgoal.url.spec = htlivesight.prefs.personalization.frGoalSoundPath;  htlivesight.Sound.sample.opfrgoal.url.spec = htlivesight.prefs.personalization.opfrGoalSoundPath;  htlivesight.Sound.sample.otgoal.url.spec = htlivesight.prefs.personalization.otGoalSoundPath;  htlivesight.Sound.sample.myboo.url.spec = htlivesight.prefs.personalization.myBooSoundPath;  htlivesight.Sound.sample.opboo.url.spec = htlivesight.prefs.personalization.opBooSoundPath;  htlivesight.Sound.sample.miss.url.spec = htlivesight.prefs.personalization.missGoalSoundPath;  htlivesight.Sound.sample.whistle.url.spec = htlivesight.prefs.personalization.whistleSoundPath;  htlivesight.Sound.sample.tarzan.url.spec = htlivesight.prefs.personalization.hattrickSoundPath;  htlivesight.Sound.sample.sun.url.spec = htlivesight.prefs.personalization.sunSoundPath;  htlivesight.Sound.sample.few_clouds.url.spec = htlivesight.prefs.personalization.fewCloudsSoundPath;  htlivesight.Sound.sample.overcast.url.spec = htlivesight.prefs.personalization.overcastSoundPath;  htlivesight.Sound.sample.rain.url.spec = htlivesight.prefs.personalization.rainSoundPath;  htlivesight.Sound.sample.end.url.spec = htlivesight.prefs.personalization.whistle3SoundPath;  htlivesight.Sound.sample.end_half.url.spec = htlivesight.prefs.personalization.whistle2SoundPath;  htlivesight.Sound.sample.beginning.url.spec = htlivesight.prefs.personalization.whistleStartSoundPath;  // end part moved here.
};/*alert("Prima del percorso1");alert("Percorso suono"+ htlivesight.prefs.personalization.opGoalSound);*/htlivesight.Sound.sample.mygoal = new htlivesight.Sound.sample("cheer_8k.wav");htlivesight.Sound.sample.opgoal = new htlivesight.Sound.sample("cheer1.wav");htlivesight.Sound.sample.frgoal = new htlivesight.Sound.sample("goal.wav");htlivesight.Sound.sample.opfrgoal = new htlivesight.Sound.sample("applause.wav");htlivesight.Sound.sample.otgoal = new htlivesight.Sound.sample("ovation.wav");htlivesight.Sound.sample.myboo = new htlivesight.Sound.sample("boo.wav");htlivesight.Sound.sample.opboo = new htlivesight.Sound.sample("OpBoo.wav");htlivesight.Sound.sample.miss = new htlivesight.Sound.sample("miss.wav");htlivesight.Sound.sample.whistle = new htlivesight.Sound.sample("whistle.wav");htlivesight.Sound.sample.tarzan = new htlivesight.Sound.sample("tarzan.wav");htlivesight.Sound.sample.sun = new htlivesight.Sound.sample("sun.wav");htlivesight.Sound.sample.few_clouds = new htlivesight.Sound.sample("few_clouds.wav");htlivesight.Sound.sample.overcast = new htlivesight.Sound.sample("overcast.wav");htlivesight.Sound.sample.rain = new htlivesight.Sound.sample("rain.wav");htlivesight.Sound.sample.end = new htlivesight.Sound.sample("whistle3.wav");htlivesight.Sound.sample.end_half = new htlivesight.Sound.sample("whistle2.wav");htlivesight.Sound.sample.beginning = new htlivesight.Sound.sample("whistle_start.wav");


/*
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  
  var url = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();
  url = url.QueryInterface(Components.interfaces.nsIURL);
  url.spec = "chrome://htlivesight/content/sound/wav.wav";
  
  var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
  sample = sample.QueryInterface(Components.interfaces.nsISound);
  sample.play(url)
*/
