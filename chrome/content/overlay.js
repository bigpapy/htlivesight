var htlivesight = {
  isWindowOpen: false,
  testAndResetOldVersionSettings: function() {
    try {
      var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
      var oldVersionValue = preferences.getBoolPref("htlivesight.getLeagueMatches");
      // no error means old version. cleaning all;
      alert("This version will reset your old settings.\nSorry for the inconvenience.");
      preferences.deleteBranch("htlivesight");
    } catch(e) {
    }
  },
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },
  onMenuItemCommand: function() {
    
    this.testAndResetOldVersionSettings();
    var openInTab = true;
    try {
      var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
      var openInTab = preferences.getBoolPref("htlivesight.openInTab");
    } catch(e) {
    }
    
    if (openInTab) {
      var browser = top.document.getElementById("content");
      var theTab = browser.addTab('chrome://htlivesight/content/htlivesight.xul');
      theTab.label = "htlivesight";
      browser.selectedTab = theTab;
    } else {
    toOpenWindowByType('mozilla:htlivesight', 'chrome://htlivesight/content/htlivesight.xul');
      //window.open("chrome://htlivesight/content/htlivesight.xul", "trtretre", "chrome,resizable");
    }
  },    installButton: function() {		// to add HTlivesight button on the navigation bar by default		HtlivesightPrefs.init();				if (!HtlivesightPrefs.getBool("HtlsToolbarInited")) {						var buttonId = "htls-button-1"; // ID of HTlivesight button						var afterId = "search-container"; // insert after search box						var navBar = document.getElementById("nav-bar");						var curSet = navBar.currentSet.split(",");						if (curSet.indexOf(buttonId) == -1) {								var pos = curSet.indexOf(afterId) + 1 || curSet.length;								var set = curSet.slice(0, pos).concat(buttonId).concat(curSet.slice(pos));								navBar.setAttribute("currentset", set.join(","));								navBar.currentSet = set.join(",");								document.persist(navBar.id, "currentset");								try {										BrowserToolboxCustomizeDone(true);									}				catch (e) {}			}						HtlivesightPrefs.setBool("HtlsToolbarInited",true);					};	  },	  
};

