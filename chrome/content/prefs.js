/**
 * pref.js
 * Htlivesight preferences service for oauth codes.
 */

var HtlivesightPrefs = {
	_pref_branch : null,
	pref_default:'',

	init : function() {

			var prefs = Components
				.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService);
			HtlivesightPrefs._pref_branch = prefs.getBranch("extensions.Htlivesight.prefs.");
	},

	getString : function(key) {
			var str;
			try {
				str = HtlivesightPrefs._pref_branch.getComplexValue(encodeURI(key),
					Components.interfaces.nsISupportsString).data;
			}
			catch (e) {
				try {
					str = HtlivesightPrefs._pref_branch.getComplexValue(pref_name,
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
			HtlivesightPrefs._pref_branch.setComplexValue(encodeURI(key),
				Components.interfaces.nsISupportsString, str);
	},
};
