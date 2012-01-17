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
			var str = Components
				.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
			str.data = value;
			htlivesightPrefs._pref_branch.setComplexValue(encodeURI(key),
				Components.interfaces.nsISupportsString, str);
	},
	
	// adding by bigpapy, it's a try to remove if it didn't work
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
			htlivesightPrefs._pref_branch.setBoolPref(encodeURI(key), value);
	},
// end adding by bigpapy (it's a try).
};
