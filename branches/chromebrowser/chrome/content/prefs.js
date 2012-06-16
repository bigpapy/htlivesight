/**
 * pref.js
 * htlivesight preferences service for oauth codes.
 */
 
var htlivesightPrefs = {
	_pref_branch : null,
	pref_default:'',

	init : function() {
		//alert(htlivesight.chromeContext());
		if (htlivesight.arch === "Gecko") {
			var prefs = Components
				.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService);
			htlivesightPrefs._pref_branch = prefs.getBranch("extensions.Htlivesight.prefs.");

		}
	},

	getString : function(key) {
		if (htlivesight.arch === "Gecko") {
			var str;

			try {
				str = htlivesightPrefs._pref_branch.getComplexValue(encodeURI(key),
					Components.interfaces.nsISupportsString).data;
			}
			catch (e) {
				try {
					str = htlivesightPrefs._pref_branch.getComplexValue(pref_name,
						Components.interfaces.nsISupportsString).data;
	 			}
	 			catch (e) {
					str = null;
				}
			}
	 		return str;
			} // end gecko
		if (htlivesight.arch === "Sandboxed") {
			 var value = localStorage["extensions.Htlivesight.prefs."+key];
			 if (value==null) value="";
			 return value;
		}

	},

	setString : function(key, value) {
		if (htlivesight.arch === "Sandboxed")
			localStorage["extensions.Htlivesight.prefs."+key] = value;
		//	htlivesightPrefs.setValue(key, String(value));
		if (htlivesight.arch === "Gecko") {
				var str = Components
					.classes["@mozilla.org/supports-string;1"]
					.createInstance(Components.interfaces.nsISupportsString);
				str.data = value;
				htlivesightPrefs._pref_branch.setComplexValue(encodeURI(key),
						Components.interfaces.nsISupportsString, str);
		}
	},
	
	
	getBool : function(key) {
		
		if (htlivesight.arch === "Gecko") {

		var value;
			try {
				value = htlivesightPrefs._pref_branch.getBoolPref(encodeURI(key));
			}
			catch (e) {
				try {
					value = htlivesightPrefs._pref_branch.getBoolPref(key);
				}
				catch (e) {
					value = null;
				}
			}
			return value;
		}; // end gecko
		
		if (htlivesight.arch === "Sandboxed") {
			var value = localStorage["extensions.Htlivesight.prefs."+key];
			if(value=="true") return true;
			if(value=="false") return false;
			return null;
		}
	},

	setBool : function(key, value) {
		if (htlivesight.arch === "Sandboxed")
			localStorage["extensions.Htlivesight.prefs."+key] = value;
		
		if (htlivesight.arch === "Gecko")
		 htlivesightPrefs._pref_branch.setBoolPref(encodeURI(key), value);
	},
// begin adding by bigpapy (it's a try)*** to be tested, only inserted. ***
	
	getInt : function(key) {
		if (htlivesight.arch === "Gecko") {

		try {
			return htlivesightPrefs._pref_branch.getIntPref(encodeURI(key));
		} catch(e) {
			return null;
		}
		} // end gecko
		if (htlivesight.arch === "Sandboxed") {
			var value = localStorage["extensions.Htlivesight.prefs."+key];
			parseInt(value);
			 return value;
		}
	},

	setInt : function(key, value) {
		if (htlivesight.arch === "Sandboxed")
			localStorage["extensions.Htlivesight.prefs."+key] = value;
		
		if (htlivesight.arch === "Gecko")
			htlivesightPrefs._pref_branch.setIntPref(encodeURI(key), value);
	},
};