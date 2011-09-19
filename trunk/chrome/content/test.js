htlivesight.Test = {
  start: function() {
    var rightbox, hbox, button;
    rightbox = document.getElementById("rightbox");
    hbox = document.createElement("hbox");
    rightbox.appendChild(hbox);
    hbox.setAttribute("pack", "center");

    button = document.createElement("button");
    hbox.appendChild(button);
    button.addEventListener('command', htlivesight.Test.click1, true);
    button.setAttribute("label", "test 1");

    button = document.createElement("button");
    hbox.appendChild(button);
    button.addEventListener('command', htlivesight.Test.click2, true);
    button.setAttribute("label", "test 2");
    
  }
};

htlivesight.Test.click1 = function() {
  htlivesight.Sound.sample.ovation.play();
};

htlivesight.Test.click2 = function() {
/*
  var doRemove = confirm("remove htlivesight entries from preferences?");
  if (doRemove) {
    var s = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  
    var branch = "htlivesight";     
    htlivesight.Log.debug("deleting brunch: [" + branch + "]...");
    var res = s.deleteBranch(branch);
    htlivesight.Log.debug("...ok [" + res + "]");
  }
*/
htlivesight.Notify.showAlert("Test", "htlivesight is awesome!");
};


