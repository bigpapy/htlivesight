if (!htlivesight)	var htlivesight={};
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
	// port common functions to sandboxed
	var sandboxed = {
		extension : {
			sendRequest: function (data, callback) {
				if (callback) chrome.extension.sendRequest(data, callback);
				else chrome.extension.sendRequest(data);
			},
			onRequest : {
				addListener : function (listener) {chrome.extension.onRequest.addListener(listener);},
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
}
else {
	htlivesight.arch = "Gecko";
	htlivesight.resourcePath = "chrome://htlivesight/content/";
	htlivesight.internalPath = "chrome://htlivesight/content/";

/*	if ( typeof(window)!=='object' // fennec content
		|| typeof(Browser)!=='undefined' ) { // fennec background
		htlivesight.platform = "Fennec";
		htlivesight.chromeContext = function() {
			if (typeof(sendSyncMessage)=='function')
				return "content";
			else
				return "background";
		}
	} */
//	else {
		htlivesight.platform = "Firefox";
		htlivesight.chromeContext = function() {
			return 'background';
//		}
	};
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