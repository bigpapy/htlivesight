// link where I got "inspiration" for new button launch on firefox australis UI:
//https://blog.mozilla.org/addons/2014/03/06/australis-for-add-on-developers-2/

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

var windowListener = {
		onOpenWindow: function(aWindow) {
			// Wait for the window to finish loading
			let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
			domWindow.addEventListener("load", function onLoad() {
				domWindow.removeEventListener("load", onLoad, false);
				loadIntoWindow(domWindow);
			}, false);
		},

		onCloseWindow: function(aWindow) {},
		onWindowTitleChange: function(aWindow, aTitle) {}
};

function startup(aData, aReason) {
	let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

	// Load into any existing windows
	let windows = wm.getEnumerator("navigator:browser");
	while (windows.hasMoreElements()) {
		let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
		loadIntoWindow(domWindow);
	}

	// Load into any new windows
	wm.addListener(windowListener);
}

function shutdown(aData, aReason) {
	// When the application is shutting down we normally don't have to clean
	// up any UI changes made
	if (aReason == APP_SHUTDOWN)
		return;

	let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

	// Stop listening for new windows
	wm.removeListener(windowListener);

	// Unload from any existing windows
	let windows = wm.getEnumerator("navigator:browser");
	while (windows.hasMoreElements()) {
		let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
		unloadFromWindow(domWindow, aReason);
	};
}

function install(aData, aReason) {}

function uninstall(aData, aReason) {}

var menuId;

function loadIntoWindow(window) {
	if (!window)
		return;
	if (isAndroid()){
		// add list-item to launch htls on firefox android menu
		menuId = window.NativeWindow.menu.add("HTLivesight", resolveGeckoURI('chrome://htlivesight/skin/24.png'), function() {
			window.BrowserApp.addTab('chrome://htlivesight/content/htlivesight.html');
		});}else{
			//removed because XUL will be deprecated
			/*	
			// load overlay file used in no-restart installation
			window.document.loadOverlay('chrome://htlivesight/content/overlay.xul', null);
			// add button to nav-bar to launch htls
			HTLS.init();	*/		
		};
}

function unloadFromWindow(window, aReason) {
	if (!window)
		return;
	if (isAndroid()){
		// remove list-item to launch htls on firefox android menu
		window.NativeWindow.menu.remove(menuId);
	}else{
		HTLS.uninit();
	};
}

//converto url to a format compatible with bootstrap
function resolveGeckoURI(aURI) {
	Components.utils.import("resource://gre/modules/Services.jsm");

	if (aURI.startsWith("chrome://"))
	{
		let registry = Cc['@mozilla.org/chrome/chrome-registry;1'].getService(Ci.nsIChromeRegistry);
		return registry.convertChromeURL(Services.io.newURI(aURI, null, null)).spec;
	}
	else if (aURI.startsWith("resource://")) {
		let handler = Services.io.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
		return handler.resolveURI(Services.io.newURI(aURI, null, null));
	}
	return aURI;
}

//check if it's firefox for android or not
function isAndroid() {
	let appInfo = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
	return (appInfo.ID == "{aa3c5121-dab2-40e2-81ca-7ea25febc110}");
}

Cu.import("resource:///modules/CustomizableUI.jsm");
var console = Cu.import("resource://gre/modules/devtools/Console.jsm", {}).console;

let HTLS = {

		init : function() {
			let io =
				Cc["@mozilla.org/network/io-service;1"].
				getService(Ci.nsIIOService);
			// the 'style' directive isn't supported in chrome.manifest for bootstrapped
			// extensions, so this is the manual way of doing the same.
			this._ss =
				Cc["@mozilla.org/content/style-sheet-service;1"].
				getService(Ci.nsIStyleSheetService);
			this._uri = io.newURI("chrome://htlivesight/skin/toolbar.css", null, null);
			this._ss.loadAndRegisterSheet(this._uri, this._ss.USER_SHEET);
			// create widget and add it to the main toolbar.
			CustomizableUI.createWidget(
					{ id : "htls-button-1",
						defaultArea : CustomizableUI.AREA_NAVBAR,
						label : "HTLivesight",
						tooltiptext : "HTLivesight",
						onCommand : function(aEvent) {
							// next commented lines shows how to get alerts:
							//let win = aEvent.target.ownerDocument.defaultView;
							//win.alert("Hello!");
							// or
							//mainWindow.("Hello!);
							//if(win.htlivesight && typeof win.htlivesight.onMenuItemCommand == 'function'){
							//	return;
							//}
							var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
							var mainWindow = wm.getMostRecentWindow("navigator:browser");
							Cu.import('resource://gre/modules/Services.jsm');
							var aDOMWindow = Services.wm.getMostRecentWindow('navigator:browser');
							var openInTab = true;
							try {
								var preferences = Cc["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
								openInTab = preferences.getBoolPref("extensions.Htlivesight.prefs.openInTab");
							} catch(e) {}
							if (openInTab!==false) {
								mainWindow.gBrowser.selectedTab = mainWindow.gBrowser.addTab("chrome://htlivesight/content/htlivesight.html");
							} else {
								var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
				                   .getService(Components.interfaces.nsIWindowWatcher);
								ww.openWindow(mainWindow, "chrome://htlivesight/content/htlivesight.html",
				                        "htlivesight", "scrollable,resizable,location,top=0,left=0,outerWidth="+mainWindow.screen.width+",outerHeight="+mainWindow.screen.height, null);
							}
						}
					});
		},

		uninit : function() {
			CustomizableUI.destroyWidget("htls-button-1");
			if (this._ss.sheetRegistered(this._uri, this._ss.USER_SHEET)) {
				this._ss.unregisterSheet(this._uri, this._ss.USER_SHEET);
			}
		}
};