function Logout() {
};

Logout.HTTP = function () {
/*  var URL = HTTP.hattrickServer
          + "/Common/chppxml.axd?file=login"
          + "&actionType=logout";*/

  //var request = new XMLHttpRequest();
  //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  //request.open('GET', URL, false);
  //request.setRequestHeader("User-Agent", HTTP.userAgent)
  //request.send(null);
  Live.started = false;
  clearInterval(Live.interval);
  Live.interval = null;
  //HTTP.ClearSessionCookie();
  htlivesight.Log.trace("htlivesight out. Goodbye.");
};





