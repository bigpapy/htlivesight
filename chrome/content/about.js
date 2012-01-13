if (!htlivesight) var htlivesight = {};

htlivesight.About = {
  startup: function() {
  },    localization: function() {	  	// loading preferences:		htlivesight.prefs=htlivesight.Preferences.get();	// composition of the url about localization xml file: 		htlivesight.url = "chrome://htlivesight/content/locale/"+ htlivesight.prefs.language.locale +".xml";	// loading xml file:			htlivesight.languageXML = Htlivesight.loadXml(htlivesight.url);	// getting all the label:			htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");	// getting "htlivesight-about" label and setting it.			document.getElementById("htlivesight-about").attributes.getNamedItem("title").value=Util.Parse("WindowAboutTitle",htlivesight.data[0]);		// here there is date of creation, change here		document.getElementById("creationDate").value="13 "+Util.Parse("MonthJanuary",htlivesight.data[0])+" 2012";		// here there are authors name, change them here 		document.getElementById("createdBy").value=Util.Parse("TextCreatedBy",htlivesight.data[0])+" Silkevicious &amp; Bigpapy";  }
};
