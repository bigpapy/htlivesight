htlivesight.Sound = {
  urlQueryInterface: null,
  sampleQueryInterface: null,
  samplePath: "sound/",
};

htlivesight.Sound.sample = function(file) {
  var urlInstance = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();
  this.url = urlInstance.QueryInterface(Components.interfaces.nsIURL);  
  this.url.spec = htlivesight.ResourcePath + htlivesight.Sound.samplePath + file;  
};

htlivesight.Sound.sample.prototype.play = function() {
 // htlivesight.Sound.sampleQueryInterface.play(this.url);
};
//added by bigpapy in order to have only one play function:

htlivesight.Sound.start = function() {
//  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

  
  

  var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );
  htlivesight.Sound.sampleQueryInterface = sample.QueryInterface(Components.interfaces.nsISound);
  //htlivesight.Sound.sampleQueryInterface.play(url)  
// moved here by bigpapy
};