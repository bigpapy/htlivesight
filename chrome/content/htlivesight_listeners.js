/** beginning script */
htlivesightPrefs.init();

document.addEventListener('DOMContentLoaded', function () {
	htlivesight.Settings.startup();
	htlivesight.Lang.localization();
	htlivesight.startup();
	/** ending script */
	/** beginning listeners */
	document.getElementsByTagName("body")[0].addEventListener('resize',function(){htlivesight.dynresize();});
	document.getElementById("chat_link").addEventListener('click',function(){htlivesight.chatdelay();});
	document.getElementById("button_login").addEventListener('click',function(){htlivesight.Click.Login();});
	document.getElementById("reLive").addEventListener('click',function(){htlivesight.reLive();});
	document.getElementById("buttonAddMatch").addEventListener('click',function(){htlivesight.Click.AddMatch();});
	document.getElementById("buttonAddTeam").addEventListener('click', function(){htlivesight.Click.AddMatchByTeam();});
	/** ending listeners */	
});

