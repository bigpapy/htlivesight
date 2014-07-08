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
		{req.send(null);}catch(e){alert(e+" URL = "+url);}
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
					console.log(xml);
					console.log(text);
				}
			}
			catch (e) {
				console.log("Cannot parse XML:\n" + text + "\n"+ e);
				callback(null, status);
			}
		}, crossSite);
	}
	else {
	    var text = "";
		try {
			text = htlivesight.load(url);
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
htlivesight.copyToClipboard = function(string,e) {
	var clipboardStore;
	if(htlivesight.platform == "Safari"){
		if ($( "#clipboard-store" ).dialog( "isOpen" )){
			$("#clipboard-store").dialog('close');
		}
		clipboardStore = document.getElementById('clipboard-store');
		clipboardStore.value = string;
		//clipboardStore.title  = "press ctrl/cmd + c to copy selected text";
		clipboardStore.title  = htlivesight.Util.Parse("SafariClipboardTitle",htlivesight.data[0]);
		$( "#clipboard-store" ).dialog({ autoOpen: false, hide: "fadeOut", height: "auto", width: 45, position: [e.pageX+10,e.pageY-20-document.documentElement.scrollTop-document.body.scrollTop], resizable: true  });
		setTimeout(function(){ $("#clipboard-store").dialog( "open" ); clipboardStore.select();},500);
		//var dialog= $("#clipboard-store").dialog( "open" )/*.fadeOut(1500)*/;
		//clipboardStore.select();
	}else if(htlivesight.platform == "Chrome"){
		clipboardStore = document.getElementById('clipboard-store');
		clipboardStore.value = string;
		clipboardStore.style.display="block";
		clipboardStore.select();
		document.execCommand('Copy');
		clipboardStore.style.display="none";
	}else if(htlivesight.arch == "Gecko") {
		var gClipboardHelper = Components
		.classes["@mozilla.org/widget/clipboardhelper;1"]
		.getService(Components.interfaces.nsIClipboardHelper);
		gClipboardHelper.copyString(string);
	}
};
htlivesight.copiedToClipboardNotification=function(e){
	// opening dialogue box to let user knows lineup is clicked.
	$( "#copiedToClipboard" ).dialog({ autoOpen: false, hide: "fadeOut", height: 55, width: "auto", position: [e.pageX+10,e.pageY-20-document.documentElement.scrollTop-document.body.scrollTop], resizable: false  });
	var dialog= $("#copiedToClipboard").dialog( "open" )/*.fadeOut(1500)*/;
	$("#copiedToClipboard").prev().hide();
	dialog.fadeOut(2500);
	setTimeout(function(){ $("#copiedToClipboard").dialog("close"); },2000);
	setTimeout(function(){ $("#copiedToClipboard").prev().show(); },2500);
};
htlivesight.generateFromSeed=function(){
	//var oldString="***...???";
	/*	crypted=[];
	for(var i=0; i<oldString.length;i++){
		seed[oldString.length-i]=parseInt(oldString.charCodeAt(i))+i+75;
		console.log("seed["+parseInt(oldString.length-i)+"]= "+seed[oldString.length-i]);
	}*/
	var newString="";
	var seed=[,196,218,204,231,214,179,230,209,166,195,180,163,157,222,169,151,210,198,215,219,180,201,175,204,158,190,
	          171,193,187,167,175,143,206,158,173,158,132,183,161,163,149,126,141];
	for(var i=1; i<seed.length;i++){
		newString+=String.fromCharCode(seed[seed.length-i]-i-74);
	}
	htlivesight.ApiProxy.consumerSecret = newString;
	//return newString;
	//alert("old string= "+oldString+"\nnew String= "+newString);
};