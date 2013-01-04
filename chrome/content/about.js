document.addEventListener('DOMContentLoaded', function () {
	htlivesightPrefs.init();
	htlivesight.Util.selectStyleSheet();
	htlivesight.About.localization();
});
htlivesight.About = {		
		localization: function() {
			var doc=document;  
			var l10nData=htlivesight.Lang.getL10nData(); 
			doc.getElementById("TabInfo").innerHTML=htlivesight.Util.Parse("TabInfo",l10nData[0]);
			doc.getElementById("creationDate").innerHTML="04 "+htlivesight.Util.Parse("MonthJanuary",l10nData[0])+" 2013";
			doc.getElementById("createdBy").innerHTML=htlivesight.Util.Parse("TextCreatedBy",l10nData[0]);
			doc.getElementById("TabTranslators").innerHTML=htlivesight.Util.Parse("TabTranslators",l10nData[0]);
			doc.getElementById("ThanksTo").innerHTML=htlivesight.Util.Parse("TextThanksTo",l10nData[0]);
			doc.getElementById("TabCredits").innerHTML=htlivesight.Util.Parse("TabCredits",l10nData[0]);
		}
};
