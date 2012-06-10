 htlivesight.LogOut = function() {
};

htlivesight.LogOut.HTTP = function () {
/*  var URL = HTTP.hattrickServer
          + "/Common/chppxml.axd?file=login"
          + "&actionType=logout";*/

  //var request = new XMLHttpRequest();
  //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  //request.open('GET', URL, false);
  //request.setRequestHeader("User-Agent", HTTP.userAgent)
  //request.send(null);
  htlivesight.Live.started = false;
  clearInterval(htlivesight.Live.interval);
  htlivesight.Live.interval = null;
  //HTTP.ClearSessionCookie();
  htlivesight.Log.trace("htlivesight out. Goodbye.");
};





