/*
 * misc.js
 * Miscellaneous utilities
 */
if (!htlivesight) var htlivesight = {};
htlivesight.load = function(url, callback, crossSite) {
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
htlivesight.loadXml = function(url, callback, crossSite) {
	if (callback) {
		htlivesight.load(url, function(text, status) {
			try {
				var parser = new DOMParser();
				var xml = parser.parseFromString(text, "text/xml");
				try {
					callback(xml, status);
				}
				catch (e) {
					console.log("Uncaught callback error:"+ e);
				}
			}
			catch (e) {
				console.log("Cannot parse XML:\n" + text + "\n"+ e);
				callback(null, status);
			}
		}, crossSite);
	}
	else {
		try {
			var text = htlivesight.load(url);
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
htlivesight.filePickerForDataUrl = function(doc, callback) {
	var input = doc.createElement('input');
	input.type = 'file';
	input.addEventListener('change',function(ev) {
		var file = ev.target.files[0];
		var reader = new window.FileReader();
		reader.onerror = function(e) {
			window.alert('Error code: ' + e.target.error.code);
			calback(null);
		};
		reader.onload = function(evt) {
			var dataUrl = evt.target.result;
			if (dataUrl.length > 164000) {
				window.alert('File too large');
				dataUrl = null;
			}
			callback(dataUrl);
		};
		reader.readAsDataURL(file);
	}, false);
	return input;
};
htlivesight.copyToClipboard = function(string) {
	if(htlivesight.platform == "Chrome"){
		var clipboardStore = document.getElementById('clipboard-store');
		clipboardStore.value = string;
		clipboardStore.style.display="block";
		clipboardStore.select();
		document.execCommand('Copy');
		clipboardStore.style.display="none";
	}else if(htlivesight.arch = "Gecko") {
		var gClipboardHelper = Components
		.classes["@mozilla.org/widget/clipboardhelper;1"]
		.getService(Components.interfaces.nsIClipboardHelper);
		gClipboardHelper.copyString(string);
	};
};