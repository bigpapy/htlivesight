document.addEventListener('DOMContentLoaded', function () {
    htlivesightPrefs.init();
    htlivesight.Util.selectStyleSheet();
    htlivesight.About.localization();
});
htlivesight.About = {		
	localization: function() {
	    var doc=document;  
	    //var l10nData=htlivesight.Lang.getL10nData();
	    var prefs=htlivesight.Preferences.get();
		var url = htlivesight.resourcePath+"locale/"+ prefs.language.locale +".xml";
		//var languageXML = htlivesight.loadXml(url);
		htlivesight.loadXml(url, function(xml, status){
			if(status != 200){return}
			var l10ndata=xml.getElementsByTagName("Htlivesight");
			htlivesight.data=data;
			//var l10ndata=languageXML.getElementsByTagName("Htlivesight");
			
		    doc.getElementById("TabInfo").textContent=htlivesight.Util.Parse("TabInfo",l10nData[0]);
		    doc.getElementById("creationDate").textContent="08 "+htlivesight.Util.Parse("MonthNovember",l10nData[0])+" 2015";
		    doc.getElementById("createdBy").textContent=htlivesight.Util.Parse("TextCreatedBy",l10nData[0]);
		    doc.getElementById("testers").textContent=htlivesight.Util.Parse("Testers",l10nData[0]);
		    doc.getElementById("BasedOn").textContent=htlivesight.Util.Parse("BasedOn",l10nData[0]);
		    doc.getElementById("License").textContent=htlivesight.Util.Parse("License",l10nData[0]);
		    doc.getElementById("Tech").textContent=htlivesight.Util.Parse("Tech",l10nData[0]);
		    doc.getElementById("Supporter").textContent=htlivesight.Util.Parse("Supporter",l10nData[0]);
		    doc.getElementById("TabTranslators").textContent=htlivesight.Util.Parse("TabTranslators",l10nData[0]);
		    doc.getElementById("ThanksTo").textContent=htlivesight.Util.Parse("TextThanksTo",l10nData[0]);
		    doc.getElementById("TabCredits").textContent=htlivesight.Util.Parse("TabCredits",l10nData[0]);
		});
	}
};
