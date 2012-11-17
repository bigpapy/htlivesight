htlivesightPrefs.init();
document.addEventListener('DOMContentLoaded', function () {
	htlivesight.Settings.startup();
	htlivesight.Lang.localization();
	htlivesight.startup();
	window.onresize=function(){htlivesight.dynresize();};
	var doc=document;
	doc.getElementById("chat_link").addEventListener('click',function(){htlivesight.chatdelay();});
	doc.getElementById("button_login").addEventListener('click',function(){htlivesight.Click.Login();});
	doc.getElementById("reLive").addEventListener('click',function(){htlivesight.reLive();});
	doc.getElementById("buttonAddMatch").addEventListener('click',function(){htlivesight.Click.AddMatch();});
	doc.getElementById("buttonAddTeam").addEventListener('click', function(){htlivesight.Click.AddMatchByTeam();});
});