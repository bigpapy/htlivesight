var HTTP = {
  userAgent: "htlivesight/0.1",   // http User-Agent string App/version
  hattrickServer: "http://www.hattrick.org", // server to use in connections
  type: "outputType=XML",
  Sanitize: function (response) {
    var regExp1 = new RegExp("(>(?:\\s|\\n|\\r)+<)", "g");
    var regExp2 = new RegExp("(\\n|\\r)", "g");
    var str = response.replace(regExp1, "><");
    var str = str.replace(regExp2, "");
    return str;
  },
  ClearSessionCookie: function() {
  }
};


HTTP.getRecommendedServer = function() {
//    var URL = HTTP.hattrickServer + "/Common/chppxml.axd?file=servers";  
//    EventSystem.HTTPRequest(URL, HTTP.ParseRecommendedServer, "request.server");/* Following row is copied from HTTP.ParseRecommendedServer because * it let software goes on (look at file eventsystem line 31))*/		EventSystem.Declare(EventSystem.ev.GET_SERVER);
};

HTTP.ParseRecommendedServer = function (response) {
 // Time.start(Time.parseFetchDate(response));
 // HTTP.hattrickServer = Util.Parse("<RecommendedURL>(.*?)</RecommendedURL>", response);
 // htlivesight.Log.info("Recommended server: " + HTTP.hattrickServer);
 // EventSystem.Declare(EventSystem.ev.GET_SERVER);

};


