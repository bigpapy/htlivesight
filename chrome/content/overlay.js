var htlivesight = {  isWindowOpen: false,    testAndResetOldVersionSettings: function() {    try {      var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);      var oldVersionValue = preferences.getBoolPref("htlivesight.getLeagueMatches");      // no error means old version. cleaning all;      alert("This version will reset your old settings.\nSorry for the inconvenience.");      preferences.deleteBranch("htlivesight");    } catch(e) {    }  },  onLoad: function() {    // initialization code    this.initialized = true;  },  onMenuItemCommand: function() {      //  this.testAndResetOldVersionSettings();    var openInTab = true;    try {      var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);      var openInTab = preferences.getBoolPref("extensions.Htlivesight.prefs.openInTab");          } catch(e) { var openInTab = htlivesightPrefs.getBool("openInTab");    }        if (openInTab) {      var browser = top.document.getElementById("content");      var theTab = browser.addTab(htlivesightEnv.contentPath+'htlivesight.html');      theTab.label = "htlivesight";      browser.selectedTab = theTab;    } else {  //  toOpenWindowByType('mozilla:htlivesight', htlivesightEnv.contentPath+'htlivesight.html');    	window.open(htlivesightEnv.contentPath+'htlivesight.html','_blank','location=no,menubar=no,status=no,toolbar=no,scrollbars=yes')    }  },    installButton: function() {		// to add HTlivesight button on the navigation bar by default	  htlivesight.arch= "Gecko";		htlivesightPrefs.init();				var preferences = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);		//	alert("prima di htlstoolbarInited");			try{	      var HtlsToolbarInited = preferences.getBoolPref("extensions.Htlivesight.prefs.HtlsToolbarInited");			}catch(e){HtlsToolbarInited= false;}	   //   alert("HtlsToolbarInited= "+ HtlsToolbarInited);		if (!HtlsToolbarInited) {			var buttonId = "htls-button-1"; // ID of HTlivesight button						var afterId = "search-container"; // insert after search box						var navBar = document.getElementById("nav-bar");						var curSet = navBar.currentSet.split(",");						if (curSet.indexOf(buttonId) == -1) {								var pos = curSet.indexOf(afterId) + 1 || curSet.length;								var set = curSet.slice(0, pos).concat(buttonId).concat(curSet.slice(pos));								navBar.setAttribute("currentset", set.join(","));								navBar.currentSet = set.join(",");								document.persist(navBar.id, "currentset");								try {										BrowserToolboxCustomizeDone(true);									}				catch (e) {}			}		//	alert("before saving");			htlivesightPrefs.setBool("HtlsToolbarInited",true);		//	alert("after saving");					};// This part localize label of HTLS button menu (options and start)		htlivesight.prefs=htlivesight.Preferences.get(); // load preferences (to get used language)		htlivesight.url = htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";//composition of url file xml localization		htlivesight.languageXML = htlivesight.loadXml(htlivesight.url); // get the xml file		htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight"); // get all the labeled info in the file		// substitute label of the Id "Preferences", "Start HTLS" and "tooltips button" with the localized strings. 		//	document.getElementById("Preferences").attributes.getNamedItem("label").value=htlivesight.data[0].getElementsByTagName("MenuOptions")[0].textContent;		//	document.getElementById("Start HTLS").attributes.getNamedItem("label").value=htlivesight.data[0].getElementsByTagName("MenuStart")[0].textContent;			document.getElementById("htls-button-1").attributes.getNamedItem("tooltiptext").value=htlivesight.data[0].getElementsByTagName("TooltipButton")[0].textContent;					//	document.getElementById("htlivesight_menuItemOptions").attributes.getNamedItem("label").value=htlivesight.data[0].getElementsByTagName("MenuOptions")[0].textContent;		//	document.getElementById("htlivesight_menuItemStart").attributes.getNamedItem("label").value=htlivesight.data[0].getElementsByTagName("MenuStart")[0].textContent;  },	  };