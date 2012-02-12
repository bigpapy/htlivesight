/**
 * pref.js
 * htlivesight preferences service for oauth codes.
 */

var htlivesightPrefs = {
	_pref_branch : null,
	pref_default:'',

	init : function() {

			var prefs = Components
				.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService);
			htlivesightPrefs._pref_branch = prefs.getBranch("extensions.Htlivesight.prefs.");
	},

	getString : function(key) {
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
	},

	setString : function(key, value) {
		if (htlivesightEnv.chromeContext()==='content')
			sandboxed.extension.sendRequest({ req : "setValue", type:'string', key: key, value: value });
		else {
				var str = Components
					.classes["@mozilla.org/supports-string;1"]
					.createInstance(Components.interfaces.nsISupportsString);
				str.data = value;
				htlivesightPrefs._pref_branch.setComplexValue(encodeURI(key),
						Components.interfaces.nsISupportsString, str);
		}
	},
	
	
	getBool : function(key) {
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
	},

	setBool : function(key, value) {
		if (htlivesightEnv.chromeContext()==='content')
			sandboxed.extension.sendRequest({ req : "setValue", type:'bool', key: key, value: value });
		else htlivesightPrefs._pref_branch.setBoolPref(encodeURI(key), value);
	},
// begin adding by bigpapy (it's a try)*** to be tested, only inserted. ***
	
	getInt : function(key) {
		try {
			return htlivesightPrefs._pref_branch.getIntPref(encodeURI(key));
		} catch(e) {
			return null;
		}
	},

	setInt : function(key, value) {
		if (htlivesightEnv.chromeContext()==='content')
			sandboxed.extension.sendRequest({ req : "setValue", type:'int', key: key, value: value });
		else htlivesightPrefs._pref_branch.setIntPref(encodeURI(key), value);
	},
	
// end adding by bigpapy (it's a try).
};
