if (!htlivesight) var htlivesight = {};htlivesight.EventSystem = {  ev: {    GET_SERVER: 0,    LOGIN: 1,    MY_TEAM: 2,    MY_LEAGUE: 3,    MY_LEAGUE_MATCHES: 4  },  Launch: function(f) {    setTimeout(function(){f;}, 10);  },  Declare: function(ev) {    switch (ev) {      case htlivesight.EventSystem.ev.GET_SERVER :    	  try{        htlivesight.EventSystem.Launch(htlivesight.Login());    	  }catch(e){alert("eventsystem"+e);}        break;      case htlivesight.EventSystem.ev.LOGIN :        htlivesight.EventSystem.Launch(htlivesight.GetMyData());        break;      case htlivesight.EventSystem.ev.MY_TEAM :        htlivesight.EventSystem.Launch(htlivesight.GetLeague());        break;      case htlivesight.EventSystem.ev.MY_LEAGUE :        htlivesight.EventSystem.Launch(htlivesight.GetLeagueMatches());        break;      case htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES :        htlivesight.EventSystem.Launch(htlivesight.GetMyMatch());        htlivesight.EventSystem.Launch(htlivesight.Friends.addLive());        htlivesight.EventSystem.Launch(htlivesight.startView());        break;      default:         alert("htlivesight.EventSystem received an unknown event!");        break;    };  }};/** --------------------------------------------  * RequestManager  * --------------------------------------------  */htlivesight.EventSystem.RequestManager =  {  open: true,  queue: new Array(),   RequestItem: function(r, d) {    this.func = r;    this.desc = d;  },  Add: function (request, description) {    reqItem = new htlivesight.EventSystem.RequestManager.RequestItem(request, description);    htlivesight.EventSystem.RequestManager.queue.push(reqItem);    htlivesight.EventSystem.Launch(htlivesight.EventSystem.RequestManager.Dispatch());  },  Dispatch: function () {    if (!htlivesight.EventSystem.RequestManager.open) return;    // locks RequestManager    // unlocks in function EventSystem.HTTPRequestHandler     htlivesight.EventSystem.RequestManager.open=false;    try {      var request = htlivesight.EventSystem.RequestManager.queue.shift();      if (request) {        htlivesight.Log.Label(request.desc);        request.func.send(null);      } else {        // there are no request. open RequestManager        htlivesight.EventSystem.RequestManager.open=true;      }    } catch(e) {      alert("htlivesight.EventSystem.RequestManager.Dispatch(): " + e);    }  },  toString: function () {    return ("[" + (htlivesight.EventSystem.RequestManager.open ? "open" : "close")+ "]" + this.queue);  }};/** --------------------------------------------  * XMLHTTPRequest  * --------------------------------------------  */htlivesight.EventSystem.HTTPRequest = function(URL, responseParser, description) {  var request = new XMLHttpRequest();//  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");  request.open('GET', URL);  request.setRequestHeader("User-Agent", htlivesight.HTTP.userAgent);  request.overrideMimeType('text/xml');  request.onreadystatechange = function() {    htlivesight.EventSystem.HTTPRequestHandler(request, responseParser);  };//  var strings = document.getElementById("strings");  htlivesight.EventSystem.RequestManager.Add(request, /*strings.getString(description)*/htlivesight.Util.Parse(description,data[0]));};htlivesight.EventSystem.HTTPRequestHandler = function (request, responseParser) {  var state, status, responseText/*, responseXML*/;  try {    state = request.readyState;    htlivesight.Log.Meter(state*100/5);    if (state==4) {      status = request.status;      if (status == 200) {        responseText = request.responseText;         responseXML = request.responseXML;        responseText = htlivesight.HTTP.Sanitize(responseText);        responseParser(responseText, request);        htlivesight.Log.Meter(100);      } else {        // there was an error returned by the server //       var strings = document.getElementById("strings");        alert(/*strings.getString("message.hattrick_error")*/htlivesight.Util.Parse("MessageHattrickError",data[0]));        htlivesight.Log.Meter(100);        document.getElementById("button_login").disabled=false;      }      htlivesight.EventSystem.RequestManager.open=true;      htlivesight.EventSystem.Launch(htlivesight.EventSystem.RequestManager.Dispatch());    } else {      // request isn't ready!    }    } catch(e) {    if (state==4) {        htlivesight.Log.Meter(100);    };    htlivesight.EventSystem.RequestManager.open=true;    htlivesight.EventSystem.Launch(htlivesight.EventSystem.RequestManager.Dispatch());  }};