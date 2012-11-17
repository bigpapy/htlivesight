htlivesight.Button = {
1: function () { 
url : htlivesightEnv.contentPath+"htlivesight.html";
document.getElementById("content").webNavigation.loadURI(url, 0, null, null, null);
  }, 
2: function () {
    var openInTab = true;
    try {
      var openInTab = "0";
    } catch(e) {
    }
    if (openInTab) {
      var browser = top.document.getElementById("content");
      var theTab = browser.addTab(htlivesightEnv.contentPath+'htlivesight.html');
      theTab.label = "HTLiveSight";
      browser.selectedTab = theTab;
    } else {
    toOpenWindowByType('mozilla:htlivesight', htlivesightEnv.contentPath+'htlivesight.html');
    }
  },
  3: function () {
	    var openInTab = true;
	    try {
	      var openInTab = "0";
	    } catch(e) {
	    }
	    if (openInTab) {
	      var browser = top.document.getElementById("content");
	      var theTab = browser.addTab(htlivesightEnv.contentPath+'settings.html');
	      theTab.label = "HTLiveSight Options";
	      browser.selectedTab = theTab;
	    } else {
	    toOpenWindowByType('mozilla:htlivesight', htlivesightEnv.contentPath+'settings.html');
	    }
	  },
};