if (!htlivesight) var htlivesight = {};

htlivesight.About = {
		contentPath: htlivesight.resourcePath,

  startup: function() {

  },
  
  localization: function() {
	  alert("1");
	// loading preferences:
		htlivesight.prefs=htlivesight.Preferences.get();
//		alert("2");
	// composition of the url about localization xml file: 
		htlivesight.url = htlivesight.About.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
//		alert("3");
	// loading xml file:	
		htlivesight.languageXML = htlivesight.loadXml(htlivesight.url);
//		alert("4");
	// getting all the label:	
		htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
//		alert("5");
	// getting "htlivesight-about" label and setting it.	
		document.getElementById("htlivesight-about").attributes.getNamedItem("title").value=htlivesight.Util.Parse("WindowAboutTitle",htlivesight.data[0]);
//		alert("6");
		// here there is date of creation, change here
		document.getElementById("creationDate").value="13 "+htlivesight.Util.Parse("MonthJanuary",htlivesight.data[0])+" 2012";
//		alert("7");
		// here there are authors name, change them here 
		document.getElementById("createdBy").innerHTML=/*htlivesight.Util.Parse("TextCreatedBy",htlivesight.data[0])+*/" Silkevicious & Bigpapy";
//		alert("8");
  }

};

