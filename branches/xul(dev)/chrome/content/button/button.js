htlivesight.Button = {

1: function () { 

url : htlivesightEnv.contentPath+"htlivesight.xul";

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
      var theTab = browser.addTab(htlivesightEnv.contentPath+'htlivesight.xul');
      theTab.label = "HTLiveSight";
      browser.selectedTab = theTab;
    } else {
    toOpenWindowByType('mozilla:htlivesight', htlivesightEnv.contentPath+'htlivesight.xul');
      //window.open("chrome://livefox/content/livefox.xul", "trtretre", "chrome,resizable");
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
	      var theTab = browser.addTab(htlivesightEnv.contentPath+'settings.xul');
	      theTab.label = "HTLiveSight";
	      browser.selectedTab = theTab;
	    } else {
	    toOpenWindowByType('mozilla:htlivesight', htlivesightEnv.contentPath+'settings.xul');
	      //window.open("chrome://livefox/content/livefox.xul", "trtretre", "chrome,resizable");
	    }
	  },
  
};