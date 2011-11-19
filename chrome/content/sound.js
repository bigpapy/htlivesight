htlivesight.Sound = {
  urlQueryInterface: null,
  sampleQueryInterface: null,
  samplePath: "chrome://htlivesight/content/sound/"
};

htlivesight.Sound.sample = function(file) {
  var urlInstance = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();
  this.url = urlInstance.QueryInterface(Components.interfaces.nsIURL);  
  this.url.spec = htlivesight.Sound.samplePath + file;  
};

htlivesight.Sound.sample.prototype.play = function() {
  htlivesight.Sound.sampleQueryInterface.play(this.url);
};


htlivesight.Sound.start = function() {
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

  
  //htlivesight.Sound.urlQueryInterface.spec = "chrome://htlivesight/content/sound/wav.wav";

  var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
  htlivesight.Sound.sampleQueryInterface = sample.QueryInterface(Components.interfaces.nsISound);
  //htlivesight.Sound.sampleQueryInterface.play(url)    // added by bigpapy  //  alert("Prima del percorso1");//  alert("Percorso suono: "+ htlivesight.prefs.personalization.opGoalSound);//  htlivesight.Sound.sample.mygoal.url.spec = ""+htlivesight.prefs.personalization.opGoalSound;  //  alert("dopo");
  
};/*alert("Prima del percorso1");alert("Percorso suono"+ htlivesight.prefs.personalization.opGoalSound);*/
htlivesight.Sound.sample.mygoal = new htlivesight.Sound.sample("cheer_8k.wav");
htlivesight.Sound.sample.opgoal = new htlivesight.Sound.sample("cheer1.wav");
htlivesight.Sound.sample.frgoal = new htlivesight.Sound.sample("goal.wav");htlivesight.Sound.sample.opfrgoal = new htlivesight.Sound.sample("applause.wav");htlivesight.Sound.sample.otgoal = new htlivesight.Sound.sample("ovation.wav");htlivesight.Sound.sample.myboo = new htlivesight.Sound.sample("boo.wav");
htlivesight.Sound.sample.opboo = new htlivesight.Sound.sample("OpBoo.wav");
htlivesight.Sound.sample.miss = new htlivesight.Sound.sample("miss.wav");
htlivesight.Sound.sample.whistle = new htlivesight.Sound.sample("whistle.wav");
htlivesight.Sound.sample.tarzan = new htlivesight.Sound.sample("tarzan.wav");htlivesight.Sound.sample.sun = new htlivesight.Sound.sample("sun.wav");htlivesight.Sound.sample.few_clouds = new htlivesight.Sound.sample("few_clouds.wav");htlivesight.Sound.sample.overcast = new htlivesight.Sound.sample("overcast.wav");htlivesight.Sound.sample.rain = new htlivesight.Sound.sample("rain.wav");htlivesight.Sound.sample.end = new htlivesight.Sound.sample("whistle3.wav");
htlivesight.Sound.sample.end_half = new htlivesight.Sound.sample("whistle2.wav");htlivesight.Sound.sample.beginning = new htlivesight.Sound.sample("whistle_start.wav");

/*
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  
  var url = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();
  url = url.QueryInterface(Components.interfaces.nsIURL);
  url.spec = "chrome://htlivesight/content/sound/wav.wav";
  
  var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
  sample = sample.QueryInterface(Components.interfaces.nsISound);
  sample.play(url)
*/
