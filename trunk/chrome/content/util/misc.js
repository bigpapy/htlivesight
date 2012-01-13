/*
 * misc.js
 * Miscellaneous utilities
 */

if (!Htlivesight) var Htlivesight = {};
Htlivesight.load = function(url, callback, crossSite) {
		var req = new XMLHttpRequest();
		if (!callback) {
			req.open("GET", url, false);
			if (typeof(req.overrideMimeType) == "function")
				req.overrideMimeType("text/plain");
			try
			{req.send(null);}catch(e){alert(e);}
			var response = req.responseText;
			return response;
		}
		else {
			req.open("GET", url, true);
			req.onreadystatechange = function(aEvt) {
				if (req.readyState == 4) {
					try {
						callback(req.responseText, req.status);
					}
					catch (e) {
						alert("Uncaught callback error:"+ e);
					}
				}
			};
			req.send();
		}
};

Htlivesight.loadXml = function(url, callback, crossSite) {
	if (callback) {
		Htlivesight.load(url, function(text, status) {
			try {
				var parser = new DOMParser();
				var xml = parser.parseFromString(text, "text/xml");
				try {
					callback(xml, status);
				}
				catch (e) {
					dump("Uncaught callback error:"+ e);
				}
			}
			catch (e) {
				dump("Cannot parse XML:\n" + text + "\n"+ e);
				callback(null, status);
			}
		}, crossSite);
	}
	else {
		try {
			var text = Htlivesight.load(url);
			var parser = new DOMParser();
			var xml = parser.parseFromString(text, "text/xml");
			return xml;

		}
		catch (e) {
			alert("Cannot parse XML:\n" + text + "\n"+ e);
			return null;
		}
	}
};
