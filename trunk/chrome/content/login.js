var Login = {
  login: false,
 // username: "",
 // securitycode: ""
};
/*
Login.HTTP = function () {
  var URL = HTTP.hattrickServer
                    + "/Common/chppxml.axd?file=login"
                    + "&actionType=login"
                    + "&Loginname=" + Login.username
                    + "&readonlypassword=" + Login.securitycode
                    + "&ChppID=2532"
                    + "&ChppKey=28D8F2DC-35F5-457E-BBA8-18FA5BD48FAF";

 // EventSystem.HTTPRequest(URL, Login.ParseResponse, "request.login");
};*/
/*
Login.ParseResponse = function (response, request) {
  var regActionSuccessfulString = "<IsAuthenticated>(.*?)</IsAuthenticated>";
  var regExp, actionSuccessfulString, found;
  var success;

  try {
    regExp = new RegExp(regActionSuccessfulString);
    found = regExp.exec(response);
    actionSuccessfulString = found[1];
    if (actionSuccessfulString.toLowerCase() == "true") {
      success = true;
    } else {
      success = false;
    }
  } catch(e) {
    success = false;
  }

  if (success) {
    Login.login=true;
    EventSystem.Declare(EventSystem.ev.LOGIN);
    document.getElementById("login_box").hidden = true;
    document.getElementById("boxaddmatch").readOnly=false;
    document.getElementById("boxaddmatch").readonly=false;
    htlivesight.DOM.addServerToPopup(HTTP.hattrickServer);
  } else {
    var strings = document.getElementById("strings");
    alert(strings.getString("message.login_not_successful"));
    document.getElementById("button_login").disabled=false;
  }
};*/
// Added by bigpapy (Login.Fakesuccess) to grant prosecution of the software:Login.Fakesuccess = function() {//	alert("Login.Fakesuccess begin");	Login.login=true;    EventSystem.Declare(EventSystem.ev.LOGIN);    document.getElementById("login_box").hidden = true;    document.getElementById("boxaddmatch").readOnly=false;    document.getElementById("boxaddmatch").readonly=false;    //htlivesight.DOM.addServerToPopup(HTTP.hattrickServer);	 //  alert("Login.Fakesuccess end");};


