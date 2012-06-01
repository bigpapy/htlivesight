if (!htlivesight) var htlivesight = {};

htlivesight.About = {contentPath: htlivesight.resourcePath,

startup: function() {},
  
localization: function() {
htlivesight.prefs=htlivesight.Preferences.get();
htlivesight.url = htlivesight.About.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
htlivesight.languageXML = htlivesight.loadXml(htlivesight.url);
htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");

//PASTE AFTER HERE

//document.getElementById("about-dialog").attributes.getNamedItem("title").value=htlivesight.Util.Parse("WindowAboutTitle",htlivesight.data[0]);

document.getElementById("TabInfo").innerHTML=htlivesight.Util.Parse("TabInfo",htlivesight.data[0]);
document.getElementById("creationDate").innerHTML="01 "+htlivesight.Util.Parse("MonthJune",htlivesight.data[0])+" 2012";
document.getElementById("createdBy").innerHTML=htlivesight.Util.Parse("TextCreatedBy",htlivesight.data[0]);

document.getElementById("TabTranslators").innerHTML=htlivesight.Util.Parse("TabTranslators",htlivesight.data[0]);
document.getElementById("ThanksTo").innerHTML=htlivesight.Util.Parse("TextThanksTo",htlivesight.data[0]);

document.getElementById("TabCredits").innerHTML=htlivesight.Util.Parse("TabCredits",htlivesight.data[0]);

//PASTE BEFORE HERE

}

};

