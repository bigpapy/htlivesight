if (!htlivesight)
	var htlivesight={};

if (typeof(chrome) == "object") {
	htlivesight.arch = "Sandboxed";
	htlivesight.platform = "Chrome";
	htlivesight.InternalPath = htlivesight.ResourcePath = chrome.extension.getURL("content/");

	// to tell which context the chrome script is running at
	// either background page, or content script
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
	}

	// port common functions to sandboxed
	var sandboxed = {
		extension : {
			sendRequest: function (data, callback) {
				if (callback) chrome.extension.sendRequest(data, callback);
				else chrome.extension.sendRequest(data);
			},
			onRequest : {
				addListener : function (listener) {chrome.extension.onRequest.addListener(listener)},
			},
			getURL : function (path) {chrome.extension.getURL(path)},
		},
		tabs : {
			create : function (url) {chrome.tabs.create(url)},
		},
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
		platform = "Firefox";
		chromeContext = function() {
			return 'background';
//		}
	};

}

var htlivesightEnv={
	
	contentPath : "chrome://htlivesight/content/",
	arch: "Gecko",
	
};

