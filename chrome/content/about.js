document.addEventListener('DOMContentLoaded', function () {
    htlivesightPrefs.init();
    htlivesight.Util.selectStyleSheet();
    htlivesight.About.localization();
});
htlivesight.About = {		
	localization: function() {
	    var doc = document;  
	    var prefs = htlivesight.Preferences.get();
		var url = htlivesight.resourcePath+"locale/"+ prefs.language.locale +".xml";
		
		htlivesight.loadXml(url, function(xml, status){
			if(status != 200){return}

			var l10nData=xml.getElementsByTagName("Htlivesight");
			
		    doc.getElementById("TabInfo").textContent=htlivesight.Util.Parse("TabInfo",l10nData[0]);
		    doc.getElementById("creationDate").textContent="10 "+htlivesight.Util.Parse("MonthDecember",l10nData[0])+" 2017";
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
