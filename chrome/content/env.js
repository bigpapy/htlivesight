if (!htlivesight)	var htlivesight={}; //check this file again to find unused code and remove it.
if (typeof(chrome) == "object") {
    htlivesight.arch = "Sandboxed";
    htlivesight.platform = "Chrome";
    htlivesight.internalPath = htlivesight.resourcePath = chrome.extension.getURL("content/");
    htlivesight.chromeContext = function() {
	try {
	    if (chrome.bookmarks) {
		return "background";
	    }
	    else {
		return "content";
	    }
	}
	catch (e) {
	    return "content";
	}
    };
//  port common functions to sandboxed
 // It seems next variable is never used, check if it's to be deleted
    var sandboxed = {
	    extension : {
		sendRequest: function (data, callback) { // It seems next function is never used, check if it's to be deleted
		    //if (callback) chrome.extension.sendRequest(data, callback);
			//else chrome.extension.sendRequest(data);
			console.log("sendRequest!");
			if (callback) chrome.extension.runtime.sendMessage(data, callback);
		    else chrome.extension.runtime.sendMessage(data);
		},
		onRequest : { // It seems next function is never used, check if it's to be deleted
		    addListener : function (listener) { console.log("onRequest!");/*chrome.extension.onRequest.addListener(listener);*/chrome.runtime.onMessage.addListener(listener);},
		},
		getURL : function (path) {chrome.extension.getURL(path);},
	    },
	    tabs : {
		create : function (url) {chrome.tabs.create(url);},
	    },
    };
}else if (typeof(opera) == "object") {
    htlivesight.arch = "Sandboxed";
    htlivesight.platform = "Opera";
    htlivesight.internalPath = "chrome://htlivesight/content/";
    htlivesight.resourcePath = "http://htlivesight.sourceforge.net/test/";
    htlivesight.chromeContext = function() {
	try {
	    if (opera.extension.postMessage) {
		return "background";
	    }
	    else {
		return "content";
	    }
	}
	catch (e) {
	    return "content";
	}
    };
}else if (typeof(safari) == "object") {

    htlivesight.arch = "Sandboxed";
    htlivesight.platform = "Safari";
    htlivesight.internalPath = safari.extension.baseURI +"chrome/content/";
    htlivesight.resourcePath = safari.extension.baseURI +"chrome/content/";
//  htlivesight.chromeContext = function() {
//  try {
//  if (safari.extension.postMessage) {
//  return "background";
//  }
//  else {
//  return "content";
//  }
//  }
//  catch (e) {
//  return "content";
//  }
//  };
}
else {
    htlivesight.arch = "Gecko";
    htlivesight.resourcePath = "chrome://htlivesight/content/";
    htlivesight.internalPath = "chrome://htlivesight/content/";
    try {
	var Cc = Components.classes;
	var Ci = Components.interfaces;
	var Cu = Components.utils;
	Cu.import('resource://gre/modules/Services.jsm');
	var appInfoID = Cc['@mozilla.org/xre/app-info;1'].getService(Ci.nsIXULAppInfo).ID;
	if (appInfoID == '{aa3c5121-dab2-40e2-81ca-7ea25febc110}')
	    htlivesight.platform = 'Android';
	else if (appInfoID == '{a23983c0-fd0e-11dc-95ff-0800200c9a66}')
	    htlivesight.platform = 'Mobile';
	else
	    htlivesight.platform = 'Firefox';  // includes SeaMonkey here
	//    alert(htlivesight.platform);
    } catch (e) {
	// above not working in mobile content. so it's that
	if (typeof(addMessageListener) !== 'undefined' || typeof(messageManager) !== 'undefined')
	    htlivesight.platform = 'Mobile';
	else
	    htlivesight.platform = 'Firefox';  // includes SeaMonkey here
    }
    /*
if (htlivesight.platform == 'Mobile' || htlivesight.platform == 'Android') {
	htlivesight.chromeContext = function() {
             if (typeof(sendSyncMessage) == 'function')
                     return 'content';
             else
                     return 'background';
     };
}
else {
	htlivesight.chromeContext = function() {
             return 'background';
     };
}*/


    /*	if ( typeof(window)!=='object' // fennec content
		|| typeof(Browser)!=='undefined' ) { // fennec background
		htlivesight.platform = "Fennec";
		alert('fennec!');
		htlivesight.chromeContext = function() {
			if (typeof(sendSyncMessage)=='function')
				return "content";
			else
				return "background";
		};
	} 
	else {
		htlivesight.platform = "Firefox";
		alert('Firefox!');
		htlivesight.chromeContext = function() {
			return 'background';
		};
	};*/
}
var htlivesightEnv={
	platform: htlivesight.platform,
	contentPath : htlivesight.resourcePath,
	arch: htlivesight.arch,
	chromeContext: function() {
	    return htlivesight.chromeContext();
	},
//	sandboxed: sandboxed,
};
