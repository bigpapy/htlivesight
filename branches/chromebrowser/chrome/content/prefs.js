/**
 * pref.js
 * htlivesight preferences service for oauth codes.
 */
 
var htlivesightPrefs = {
	_pref_branch : null,
	pref_default:'',

	init : function() {

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
		if (htlivesight.arch === "SandBox") {
			var value = htlivesightPrefs.getValue(key);
            if (typeof(value) == "string")
                    return value;
            return null;

		}

	},

	setString : function(key, value) {
		if (htlivesightEnv.chromeContext()==='content')
			htlivesightPrefs.setValue(key, String(value));
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
		} // end gecko
		if (htlivesight.arch === "SandBox") {
			var value = htlivesightPrefs.getValue(key);
            if (typeof(value) == "boolean")
                    return value;
            return null;

		}
	},

	setBool : function(key, value) {
		if (htlivesightEnv.chromeContext()==='content')
			htlivesightPrefs.setValue(key, Boolean(value));
		else htlivesightPrefs._pref_branch.setBoolPref(encodeURI(key), value);
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
		if (htlivesight.arch === "SandBox") {
			var value = htlivesightPrefs.getValue(key);
            if (typeof(value) == "number")
                    return value;
            return null;

		}
	},

	setInt : function(key, value) {
		if (htlivesightEnv.chromeContext()==='content')
			htlivesightPrefs.setValue(key, Number(value));
		else htlivesightPrefs._pref_branch.setIntPref(encodeURI(key), value);
	},
	
	getValue : function(key) {
        try {
                if (htlivesightPrefs._pref_branch[key] !== undefined)
                        return htlivesightPrefs._pref_branch[key];
                else if (htlivesightPrefs.pref_default[key] !== undefined)
                        return htlivesightPrefs.pref_default[key];
                else
                        return null;
        }
        catch (e) {
                return null;
        };
        
},
	setValue : function(key, value) {
		try {
              htlivesightPrefs._pref_branch[key] = value;
              chrome.extension.sendRequest({ req : "setValue", key : key, value : value });
            }
		catch (e) {}
	},

	deleteValue : function(key) {
		delete(htlivesightPrefs._pref_branch[key]);
		chrome.extension.sendRequest({ req : "deleteValue", key : key });
	},
 

};