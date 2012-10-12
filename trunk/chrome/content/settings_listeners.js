document.addEventListener('DOMContentLoaded', function () {
//document.querySelector('button').addEventListener('click', clickHandler); /***** example ****//
//	document.getElementsByTagName("body")[0].addEventListener('resize',function(){htlivesight.dynresize();});

	/** tab 1 */
	document.getElementById("dark_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(2);});
	document.getElementById("light_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(3);});
	document.getElementById("livefox_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(4);});

	document.getElementById("openin_tab").addEventListener('click',function(){htlivesight.Settings.click.radopenin(true);});
	document.getElementById("openin_window").addEventListener('click',function(){htlivesight.Settings.click.radopenin(false);});
	document.getElementById("hattrickServer").addEventListener('change',function(){htlivesight.Settings.click.txtfixhattrickserver();});
	
	/** tab 2 */
	document.getElementById("chkGetLeague").addEventListener('click',function(){htlivesight.Settings.click.chkgetleague();});
	document.getElementById("chkGetLeagueWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgetleaguewithin();});
	document.getElementById("txtGetLeagueWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixleaguehours();});
	
	document.getElementById("chkGetFriends").addEventListener('click',function(){htlivesight.Settings.click.chkgetfriends();});
	document.getElementById("chkGetFriendsWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgetfriendswithin();});
	document.getElementById("txtGetFriendsWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixfriendshours();});
	
	document.getElementById("chkHdrScorers").addEventListener('click',function(){htlivesight.Settings.click.chkhdrscorers();});
	document.getElementById("chkHdrBooked").addEventListener('click',function(){htlivesight.Settings.click.chkhdrbooked();});
	document.getElementById("chkHdrSentOff").addEventListener('click',function(){htlivesight.Settings.click.chkhdrsentoff();});
	document.getElementById("chkHdrInjured").addEventListener('click',function(){htlivesight.Settings.click.chkhdrinjured();});
	
	document.getElementById("txtMatchWindowSize").addEventListener('change',function(){htlivesight.Settings.click.txtfixwindowsize();});
	
	/** tab 3 */
	document.getElementById("chkSound").addEventListener('click',function(){htlivesight.Settings.click.chkSound();});
	document.getElementById("chkSoundOnlyOpened").addEventListener('click',function(){htlivesight.Settings.click.chkSoundOnlyOpened();});
	document.getElementById("chkFlash").addEventListener('click',function(){htlivesight.Settings.click.chkFlash();});
	document.getElementById("chkSlider").addEventListener('click',function(){htlivesight.Settings.click.chkSlider();});
	
	/** tab 4 */
	document.getElementById("removeauth").addEventListener('click',function(){htlivesight.Settings.click.resetToken();});
	document.getElementById("reverseOrder").addEventListener('click',function(){htlivesight.Settings.click.reverseOrder();});
	document.getElementById("printEventKey").addEventListener('click',function(){htlivesight.Settings.click.printEventKey();});
	
	/** tab 5 */
	document.getElementById("oldIcons").addEventListener('click',function(){htlivesight.Settings.click.oldIcons();});
	
	document.getElementById("weather").addEventListener('click',function(){htlivesight.Settings.click.weather();});
	document.getElementById("whistleTime").addEventListener('click',function(){htlivesight.Settings.click.whistleTime();});
	document.getElementById("weatherSE").addEventListener('click',function(){htlivesight.Settings.click.weatherSE();});
	document.getElementById("livefoxGoal").addEventListener('click',function(){htlivesight.Settings.click.livefoxGoal();});
	document.getElementById("noOpGoal").addEventListener('click',function(){htlivesight.Settings.click.noOpGoal();});
});