htlivesight.LogOut = function() {};htlivesight.LogOut.HTTP = function () {	htlivesight.Live.started = false;	clearInterval(htlivesight.Live.interval);	htlivesight.Live.interval = null;	htlivesight.Log.trace("htlivesight out. Goodbye.");};





