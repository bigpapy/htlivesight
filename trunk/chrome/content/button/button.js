htls = {

1: function () { 

url : "chrome://htlivesight/content/htlivesight.xul";

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
      var theTab = browser.addTab('chrome://htlivesight/content/htlivesight.xul');
      theTab.label = "HTLiveSight";
      browser.selectedTab = theTab;
    } else {
    toOpenWindowByType('mozilla:htlivesight', 'chrome://htlivesight/content/htlivesight.xul');
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
	      var theTab = browser.addTab('chrome://htlivesight/content/settings.xul');
	      theTab.label = "HTLiveSight";
	      browser.selectedTab = theTab;
	    } else {
	    toOpenWindowByType('mozilla:htlivesight', 'chrome://htlivesight/content/settings.xul');
	      //window.open("chrome://livefox/content/livefox.xul", "trtretre", "chrome,resizable");
	    }
	  },
  
};