const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

function loadIntoWindow(window) {
  if (!window)
    return;
  // Add any persistent UI elements
  // Perform any other initialization
}

function unloadFromWindow(window, aReason) {
  if (!window)
    return;
  // Remove any persistent UI elements
  // Perform any other cleanup
}

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
  }
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
	// load overlay file used in no-restart installation
	window.document.loadOverlay('chrome://htlivesight/content/overlay.xul', null);
	// add button to nav-bar to launch htls
  addButton('nav-bar', "htls-button-1", "launch HTLivesight", 'chrome://htlivesight/skin/24.png', 'chrome://htlivesight/skin/16.png', true, window.document) 
  }
}

function unloadFromWindow(window, aReason) {
  if (!window)
    return;
	if (isAndroid()){
		// remove list-item to launch htls on firefox android menu
    window.NativeWindow.menu.remove(menuId);
	}else{
		// get htls button in firefox desktop navbar...
	  var toolbarButton = window.document.getElementById("htls-button-1") 
		// and remove it.
    toolbarButton.parentNode.removeChild(toolbarButton);
		// get menuitem in tool -> hattrick -> htls menu...
  	var htlivesight = window.document.getElementById('htlivesight_menuItemStart');
		// ... and remove it.		
  	htlivesight.parentNode.removeChild(htlivesight);
		// get hattrick menu popup and...
  	var hattrick_menupopup = window.document.getElementById('hattricktools_menupopup');
		// hattrick menu.
	 	var hattrick_menu = window.document.getElementById('hattricktools_menu');
		// if hattrick menu popup has no element inside...
  	if(hattrick_menupopup.firstChild==null){
			// it's possible to remove it and hattrick menu
      hattrick_menupopup.parentNode.removeChild(hattrick_menupopup);
      hattrick_menu.parentNode.removeChild(hattrick_menu);
	  }
	}
}

// converto url to a format compatible with bootstrap
function resolveGeckoURI(aURI) {
  Components.utils.import("resource://gre/modules/Services.jsm");
    
  if (aURI.startsWith("chrome://"))
  {
    let registry = Cc['@mozilla.org/chrome/chrome-registry;1'].getService(Ci["nsIChromeRegistry"]);
    return registry.convertChromeURL(Services.io.newURI(aURI, null, null)).spec;
  }
    else if (aURI.startsWith("resource://")) {
      let handler = Services.io.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
      return handler.resolveURI(Services.io.newURI(aURI, null, null));
  }
  return aURI;
}

// check if it's firefox for android or not
function isAndroid() {
  let appInfo = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
  return (appInfo.ID == "{aa3c5121-dab2-40e2-81ca-7ea25febc110}");
}

// add button launch for htls
function addButton(toolbarId, buttonId, label, iconPath24, iconPath16, firstRun, document) {
  var toolbar = document.getElementById(toolbarId);
  var toolbarButton = document.createElement("toolbarbutton");
  toolbarButton.setAttribute("id", buttonId);
  toolbarButton.setAttribute("type", "button");
  toolbarButton.setAttribute("removable", "true");
  toolbarButton.setAttribute("class",
    "toolbarbutton-1 chromeclass-toolbar-additional");
  toolbarButton.setAttribute("label", label);
	// this css permit to change htls button size to be used with icon and icon small size.
  toolbarButton.style.cssText= "#htls-button-1 {margin-left:2px; list-style-image: url("+iconPath24+");} toolbar[iconsize='small'] #htls-button-1 {list-style-image: url("+iconPath16+");}"

  var palette = document.getElementById("navigator-toolbox").palette;
  palette.appendChild(toolbarButton);
  var currentset = toolbar.getAttribute("currentset").split(",");
  var index = currentset.indexOf(buttonId);
  if (index == -1) {
    if (firstRun) {
      // No button yet so add it to the toolbar.
      toolbar.appendChild(toolbarButton);
      toolbar.setAttribute("currentset", toolbar.currentSet);
      document.persist(toolbar.id, "currentset");
    }
  }
  else {
    // The ID is in the currentset, so find the position and
    // insert the button there.
    var before = null;
    for (var i=index+1; i<currentset.length; i++) {
      before = document.getElementById(currentset[i]);
      if (before) {
        toolbar.insertItem(buttonId, before);
        break;
      }
    }
    if (!before) {
      toolbar.insertItem(buttonId);
    }
  }
}

