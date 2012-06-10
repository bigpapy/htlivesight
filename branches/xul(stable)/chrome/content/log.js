htlivesight.Log = {
  progressMeter: null,
  progressLabel: null,
  start: function() {
    htlivesight.Log.progressMeter = document.getElementById("progressmeter");
    htlivesight.Log.progressLabel = document.getElementById("progresslabel");
  },
  Meter: function (value) {
    htlivesight.Log.progressMeter.setAttribute("value", value);
    if (value==100) htlivesight.Log.progressLabel.setAttribute("value", "");
  },
  Label: function (value) {
    htlivesight.Log.progressLabel.setAttribute("value", value);
  },
  debug: function (message) {
    dump("[htlivesight:Debug] " + message + "\n");
  },
  trace: function (message) {
    dump("[htlivesight:Trace] " + message + "\n");
  },
  info: function (message) {
    dump("[htlivesight:Info] " + message + "\n");
  },
  warn: function (message) {
    dump("[htlivesight:Warning] " + message + "\n");
  },
  error: function (message) {
    dump("[htlivesight:Error] " + message + "\n");
  },
  properties: function (obj, message) {
    if (message) this.debug(message);
    for (var prop in obj) {
      htlivesight.Log.debug(prop + ":" + obj[prop]);
    }
  }
};




