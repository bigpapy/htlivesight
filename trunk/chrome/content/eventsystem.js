var EventSystem = {


  ev: {
    GET_SERVER: 0,
    LOGIN: 1,
    MY_TEAM: 2,
    MY_LEAGUE: 3,
    MY_LEAGUE_MATCHES: 4
  },
  Launch: function(f) {
    setTimeout(f, 10);
  },
  Declare: function(ev) {
    switch (ev) {
      case EventSystem.ev.GET_SERVER :
        EventSystem.Launch("htlivesight.Login()");
        break;
      case EventSystem.ev.LOGIN :
        EventSystem.Launch("htlivesight.GetMyData()");
        break;
      case EventSystem.ev.MY_TEAM :
        EventSystem.Launch("htlivesight.GetLeague()");
        break;
      case EventSystem.ev.MY_LEAGUE :
        EventSystem.Launch("htlivesight.GetLeagueMatches()");
        break;
      case EventSystem.ev.MY_LEAGUE_MATCHES :
        EventSystem.Launch("htlivesight.GetMyMatch()");
        EventSystem.Launch("Friends.addLive()");
        EventSystem.Launch("htlivesight.startView()");
        break;
      default: 
        alert("EventSystem received an unknown event!");
        break;
    };
  }
};

/** --------------------------------------------
  * RequestManager
  * --------------------------------------------
  */
EventSystem.RequestManager =  {
  open: true,
  queue: new Array(), 
  RequestItem: function(r, d) {
    this.func = r;
    this.desc = d;
  },
  Add: function (request, description) {
    reqItem = new EventSystem.RequestManager.RequestItem(request, description);
    EventSystem.RequestManager.queue.push(reqItem);
    EventSystem.Launch("EventSystem.RequestManager.Dispatch()");
  },
  Dispatch: function () {
    if (!EventSystem.RequestManager.open) return;
    // locks RequestManager
    // unlocks in function EventSystem.HTTPRequestHandler 
    EventSystem.RequestManager.open=false;
    try {
      var request = EventSystem.RequestManager.queue.shift();
      if (request) {
        htlivesight.Log.Label(request.desc);
        request.func.send(null);
      } else {
        // there are no request. open RequestManager
        EventSystem.RequestManager.open=true;
      }
    } catch(e) {
      alert("EventSystem.RequestManager.Dispatch(): " + e);
    }
  },
  toString: function () {
    return ("[" + (EventSystem.RequestManager.open ? "open" : "close")+ "]" + this.queue);
  }
};

/** --------------------------------------------
  * XMLHTTPRequest
  * --------------------------------------------
  */
EventSystem.HTTPRequest = function(URL, responseParser, description) {
  var request = new XMLHttpRequest();
  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  request.open('GET', URL);
  request.setRequestHeader("User-Agent", HTTP.userAgent);
  request.overrideMimeType('text/xml');
  request.onreadystatechange = function() {
    EventSystem.HTTPRequestHandler(request, responseParser);
  };
  var strings = document.getElementById("strings");
  EventSystem.RequestManager.Add(request, strings.getString(description));
};
EventSystem.HTTPRequestHandler = function (request, responseParser) {
  var state, status, responseText/*, responseXML*/;
  try {
    state = request.readyState;
    htlivesight.Log.Meter(state*100/5);
    if (state==4) {
      status = request.status;
      if (status == 200) {
        responseText = request.responseText; 
        responseXML = request.responseXML;
        responseText = HTTP.Sanitize(responseText);
        responseParser(responseText, request);
        htlivesight.Log.Meter(100);
      } else {
        // there was an error returned by the server
        var strings = document.getElementById("strings");
        alert(strings.getString("message.hattrick_error"));
        htlivesight.Log.Meter(100);
        document.getElementById("button_login").disabled=false;
      }
      EventSystem.RequestManager.open=true;
      EventSystem.Launch("EventSystem.RequestManager.Dispatch()");
    } else {
      // request isn't ready!
    }  
  } catch(e) {
    if (state==4) {
        htlivesight.Log.Meter(100);
    };
    EventSystem.RequestManager.open=true;
    EventSystem.Launch("EventSystem.RequestManager.Dispatch()");
  }
};

