htlivesightPrefs.init();
document.addEventListener('DOMContentLoaded', function () {
	htlivesight.Settings.startup();
	htlivesight.Settings.localization();
	/* tab 1 */
	document.getElementById("dark_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(2);});
	document.getElementById("light_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(3);});
	document.getElementById("livefox_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(4);});
	document.getElementById("openin_tab").addEventListener('click',function(){htlivesight.Settings.click.radopenin(true);});
	document.getElementById("openin_window").addEventListener('click',function(){htlivesight.Settings.click.radopenin(false);});
	document.getElementById("hattrickServer").addEventListener('change',function(){htlivesight.Settings.click.txtfixhattrickserver();});
	/* tab 2 */
	//document.getElementById("chkGetAllMine").addEventListener('click',function(){htlivesight.Settings.click.chkgetallmine();});
	document.getElementById("chkGetAllMineWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgetallminewithin();});
	document.getElementById("txtGetAllMineWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixallminehours();});
	document.getElementById("chkGetLeague").addEventListener('click',function(){htlivesight.Settings.click.chkgetleague();});
	document.getElementById("chkGetLeagueWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgetleaguewithin();});
	document.getElementById("txtGetLeagueWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixleaguehours();});
	document.getElementById("chkGetLeagueScorers").addEventListener('click',function(){htlivesight.Settings.click.chkgetleaguescorers();});
	
	document.getElementById("chkGetYouthLeague").addEventListener('click',function(){htlivesight.Settings.click.chkgetyouthleague();});
	document.getElementById("chkGetYouthLeagueWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgetyouthleaguewithin();});
	document.getElementById("txtGetYouthLeagueWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixyouthleaguehours();});

	
	document.getElementById("chkGetTournament").addEventListener('click',function(){htlivesight.Settings.click.chkgettournament();});
	document.getElementById("chkGetTournamentWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgettournamentwithin();});
	document.getElementById("txtGetTournamentWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixtournamenthours();});
	
	document.getElementById("chkGetFriends").addEventListener('click',function(){htlivesight.Settings.click.chkgetfriends();});
	document.getElementById("chkGetFriendsWithin").addEventListener('click',function(){htlivesight.Settings.click.chkgetfriendswithin();});
	document.getElementById("txtGetFriendsWithinHours").addEventListener('change',function(){htlivesight.Settings.click.txtfixfriendshours();});
	
	document.getElementById("chkDoNotGetFriendsHointegratedMatches").addEventListener('change',function(){htlivesight.Settings.click.chkDoNotGetFriendsHointegratedMatches();});
	
	document.getElementById("chkGetYouthNearestMatch").addEventListener('click',function(){htlivesight.Settings.click.chkMyYouthMatch();});
	document.getElementById("chkHdrScorers").addEventListener('click',function(){htlivesight.Settings.click.chkhdrscorers();});
	document.getElementById("chkHdrBooked").addEventListener('click',function(){htlivesight.Settings.click.chkhdrbooked();});
	document.getElementById("chkHdrSentOff").addEventListener('click',function(){htlivesight.Settings.click.chkhdrsentoff();});
	document.getElementById("chkHdrInjured").addEventListener('click',function(){htlivesight.Settings.click.chkhdrinjured();});
	document.getElementById("txtMatchWindowSize").addEventListener('change',function(){htlivesight.Settings.click.txtfixwindowsize();});
	/* tab 3 */
	document.getElementById("chkSound").addEventListener('click',function(){htlivesight.Settings.click.chkSound();});
	document.getElementById("chkSoundOnlyOpened").addEventListener('click',function(){htlivesight.Settings.click.chkSoundOnlyOpened();});
	document.getElementById("chkFlash").addEventListener('click',function(){htlivesight.Settings.click.chkFlash();});
	document.getElementById("chkSlider").addEventListener('click',function(){htlivesight.Settings.click.chkSlider();});
	/* tab 4 */
	document.getElementById("removeauth").addEventListener('click',function(){htlivesight.Settings.click.resetToken();});
	document.getElementById("reverseOrder").addEventListener('click',function(){htlivesight.Settings.click.reverseOrder();});
	document.getElementById("printEventKey").addEventListener('click',function(){htlivesight.Settings.click.printEventKey();});
	/* tab 5 */
	document.getElementById("oldIcons").addEventListener('click',function(){htlivesight.Settings.click.oldIcons();});
	document.getElementById("weather").addEventListener('click',function(){htlivesight.Settings.click.weather();});
	document.getElementById("whistleTime").addEventListener('click',function(){htlivesight.Settings.click.whistleTime();});
	document.getElementById("weatherSE").addEventListener('click',function(){htlivesight.Settings.click.weatherSE();});
	document.getElementById("livefoxGoal").addEventListener('click',function(){htlivesight.Settings.click.livefoxGoal();});
	document.getElementById("noOpGoal").addEventListener('click',function(){htlivesight.Settings.click.noOpGoal();});
	document.getElementById("chkSecondSoundEqualFirst").addEventListener('click',function(){htlivesight.Settings.click.secondSoundEqualFirst();});
	document.getElementById("chkYouthSoundEqualSenior").addEventListener('click',function(){htlivesight.Settings.click.youthSoundEqualSenior();});
	document.getElementById("volumeSound").addEventListener('click',function(){htlivesight.Settings.click.settingVolumeSound();});
	// my goal
	document.getElementById("myGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('myGoal');});
	document.getElementById("label_myGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('myGoal','sound/cheer_8k.ogg');});
	document.getElementById("label_myGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('myGoalSoundPath');});
	document.getElementById("myGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'myGoalSoundPath');});
	document.getElementById("myGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('myGoal');});
	//op goal
	document.getElementById("opGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('opGoal');});
	document.getElementById("label_opGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('opGoal','sound/cheer1.ogg');});
	document.getElementById("label_opGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('opGoalSoundPath');});
	document.getElementById("opGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'opGoalSoundPath');});
	document.getElementById("opGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('opGoal');});
	//fr goal
	document.getElementById("frGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('frGoal');});
	document.getElementById("label_frGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('frGoal','sound/goal.ogg');});
	document.getElementById("label_frGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('frGoalSoundPath');});
	document.getElementById("frGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'frGoalSoundPath');});
	document.getElementById("frGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('frGoal');});
	//opfr goal
	document.getElementById("opfrGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('opfrGoal');});
	document.getElementById("label_opfrGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('opfrGoal','sound/applause.ogg');});
	document.getElementById("label_opfrGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('opfrGoalSoundPath');});
	document.getElementById("opfrGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'opfrGoalSoundPath');});
	document.getElementById("opfrGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('opfrGoal');});
	//ot goal
	document.getElementById("otGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('otGoal');});
	document.getElementById("label_otGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('otGoal','sound/ovation.ogg');});
	document.getElementById("label_otGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('otGoalSoundPath');});
	document.getElementById("otGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'otGoalSoundPath');});
	document.getElementById("otGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('otGoal');});
	// miss goal
	document.getElementById("missGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('missGoal');});
	document.getElementById("label_missGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('missGoal','sound/miss.ogg');});
	document.getElementById("label_missGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('missGoalSoundPath');});
	document.getElementById("missGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'missGoalSoundPath');});
	document.getElementById("missGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('missGoal');});
	// sun
	document.getElementById("sunCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('sun');});
	document.getElementById("label_sunButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('sun','sound/sun.ogg');});
	document.getElementById("label_sunButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('sunSoundPath');});
	document.getElementById("sunSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'sunSoundPath');});
	document.getElementById("sunSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('sun');});
	// rain
	document.getElementById("rainCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('rain');});
	document.getElementById("label_rainButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('rain','sound/rain.ogg');});
	document.getElementById("label_rainButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('rainSoundPath');});
	document.getElementById("rainSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'rainSoundPath');});
	document.getElementById("rainSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('rain');});
	//overcast
	document.getElementById("overcastCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('overcast');});
	document.getElementById("label_overcastButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('overcast','sound/overcast.ogg');});
	document.getElementById("label_overcastButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('overcastSoundPath');});
	document.getElementById("overcastSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'overcastSoundPath');});
	document.getElementById("overcastSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('overcast');});
	//few clouds
	document.getElementById("fewCloudsCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('fewClouds');});
	document.getElementById("label_fewCloudsButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('fewClouds','sound/few_clouds.ogg');});
	document.getElementById("label_fewCloudsButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('fewCloudsSoundPath');});
	document.getElementById("fewCloudsSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'fewCloudsSoundPath');});
	document.getElementById("fewCloudsSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('fewClouds');});
	//my boo
	document.getElementById("myBooCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('myBoo');});
	document.getElementById("label_myBooButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('myBoo','sound/boo.ogg');});
	document.getElementById("label_myBooButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('myBooSoundPath');});
	document.getElementById("myBooSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'myBooSoundPath');});
	document.getElementById("myBooSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('myBoo');});
	//op boo
	document.getElementById("opBooCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('opBoo');});
	document.getElementById("label_opBooButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('opBoo','sound/OpBoo.ogg');});
	document.getElementById("label_opBooButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('opBooSoundPath');});
	document.getElementById("opBooSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'opBooSoundPath');});
	document.getElementById("opBooSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('opBoo');});
	///whistle start
	document.getElementById("whistleStartCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('whistleStart');});
	document.getElementById("label_whistleStartButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('whistleStart','sound/whistle_start.ogg');});
	document.getElementById("label_whistleStartButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('whistleStartSoundPath');});
	document.getElementById("whistleStartSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'whistleStartSoundPath');});
	document.getElementById("whistleStartSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('whistleStart');});
	// double whistle
	document.getElementById("whistle2Check").addEventListener('click',function(){htlivesight.Settings.click.checkSound('whistle2');});
	document.getElementById("label_whistle2Button_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('whistle2','sound/whistle2.ogg');});
	document.getElementById("label_whistle2Button_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('whistle2SoundPath');});
	document.getElementById("whistle2SoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'whistle2SoundPath');});
	document.getElementById("whistle2SoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('whistle2');});
	// triple whistle
	document.getElementById("whistle3Check").addEventListener('click',function(){htlivesight.Settings.click.checkSound('whistle3');});
	document.getElementById("label_whistle3Button_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('whistle3','sound/whistle3.ogg');});
	document.getElementById("label_whistle3Button_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('whistle3SoundPath');});
	document.getElementById("whistle3SoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'whistle3SoundPath');});
	document.getElementById("whistle3SoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('whistle3');});
	// whistle
	document.getElementById("whistleCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('whistle');});
	document.getElementById("label_whistleButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('whistle','sound/whistle.ogg');});
	document.getElementById("label_whistleButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('whistleSoundPath');});
	document.getElementById("whistleSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'whistleSoundPath');});
	document.getElementById("whistleSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('whistle');});
	//hattrick
	document.getElementById("hattrickCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('hattrick');});
	document.getElementById("label_hattrickButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('hattrick','sound/tarzan.ogg');});
	document.getElementById("label_hattrickButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('hattrickSoundPath');});
	document.getElementById("hattrickSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'hattrickSoundPath');});
	document.getElementById("hattrickSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('hattrick');});
	
//pressing
	document.getElementById("pressingCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('pressing');});
	document.getElementById("label_pressingButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('pressing','sound/pressing.ogg');});
	document.getElementById("label_pressingButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('pressingSoundPath');});
	document.getElementById("pressingSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'pressingSoundPath');});
	document.getElementById("pressingSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('pressing');});
	
//myBruised
	document.getElementById("myBruisedCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('myBruised');});
	document.getElementById("label_myBruisedButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('myBruised','sound/my_bruised.ogg');});
	document.getElementById("label_myBruisedButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('myBruisedSoundPath');});
	document.getElementById("myBruisedSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'myBruisedSoundPath');});
	document.getElementById("myBruisedSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('myBruised');});
	
//otherBruised
	document.getElementById("otherBruisedCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('otherBruised');});
	document.getElementById("label_otherBruisedButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('otherBruised','sound/other_bruised.ogg');});
	document.getElementById("label_otherBruisedButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('otherBruisedSoundPath');});
	document.getElementById("otherBruisedSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'otherBruisedSoundPath');});
	document.getElementById("otherBruisedSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('otherBruised');});
	
//mySentOff
	document.getElementById("mySentOffCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('mySentOff');});
	document.getElementById("label_mySentOffButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('mySentOff','sound/my_sent_off.ogg');});
	document.getElementById("label_mySentOffButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('mySentOffSoundPath');});
	document.getElementById("mySentOffSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'mySentOffSoundPath');});
	document.getElementById("mySentOffSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('mySentOff');});
	
//otherSentOff
	document.getElementById("otherSentOffCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('otherSentOff');});
	document.getElementById("label_otherSentOffButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('otherSentOff','sound/other_sent_off.ogg');});
	document.getElementById("label_otherSentOffButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('otherSentOffSoundPath');});
	document.getElementById("otherSentOffSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'otherSentOffSoundPath');});
	document.getElementById("otherSentOffSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('otherSentOff');});
	
//miss friend
	document.getElementById("missFriendCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('missFriend');});
	document.getElementById("label_missFriendButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('missFriend','sound/miss_friend.ogg');});
	document.getElementById("label_missFriendButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('missFriendSoundPath');});
	document.getElementById("missFriendSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'missFriendSoundPath');});
	document.getElementById("missFriendSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('missFriend');});
	
//miss other
	document.getElementById("missOtherCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('missOther');});
	document.getElementById("label_missOtherButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('missOther','sound/miss_other.ogg');});
	document.getElementById("label_missOtherButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('missOtherSoundPath');});
	document.getElementById("missOtherSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'missOtherSoundPath');});
	document.getElementById("missOtherSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('missOther');});
	
//info
	document.getElementById("infoCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('info');});
	document.getElementById("label_infoButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('info','sound/crowd.ogg');});
	document.getElementById("label_infoButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('infoSoundPath');});
	document.getElementById("infoSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'infoSoundPath');});
	document.getElementById("infoSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('info');});
	
	//my favourite goal
	document.getElementById("myFavouriteGoalCheck").addEventListener('click',function(){htlivesight.Settings.click.checkSound('myFavouriteGoal');});
	document.getElementById("label_myFavouriteGoalButton_reset").addEventListener('click',function(){htlivesight.Settings.click.soundReset('myFavouriteGoal','sound/tarzan.ogg');});
	document.getElementById("label_myFavouriteGoalButton_play").addEventListener('click',function(){htlivesight.Settings.click.soundPlay('myFavouriteGoalSoundPath');});
	document.getElementById("myFavouriteGoalSoundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getSoundFile(this.files,'myFavouriteGoalSoundPath');});
	document.getElementById("myFavouriteGoalSoundPath").addEventListener('change',function(){htlivesight.Settings.click.checkSound('myFavouriteGoal');});
	
	document.getElementById("myFavouritePlayersId").addEventListener('change',function(){htlivesight.Settings.click.myFavouritePlayersIdSet('myFavouritePlayersId');});
	
	/* tab 6 */
	document.getElementById("friendHomeColorCheck").addEventListener('click',function(){htlivesight.Settings.click.friendHomeColorCheck();});
	document.getElementById("friendHomeColorCode").addEventListener('change',function(){htlivesight.Settings.click.friendHomeColorSet();});

	document.getElementById("friendAwayColorCheck").addEventListener('click',function(){htlivesight.Settings.click.friendAwayColorCheck();});
	document.getElementById("friendAwayColorCode").addEventListener('change',function(){htlivesight.Settings.click.friendAwayColorSet();});

	document.getElementById("foeHomeColorCheck").addEventListener('click',function(){htlivesight.Settings.click.foeHomeColorCheck();});
	document.getElementById("foeHomeColorCode").addEventListener('change',function(){htlivesight.Settings.click.foeHomeColorSet();});

	document.getElementById("foeAwayColorCheck").addEventListener('click',function(){htlivesight.Settings.click.foeAwayColorCheck();});
	document.getElementById("foeAwayColorCode").addEventListener('change',function(){htlivesight.Settings.click.foeAwayColorSet();});

	document.getElementById("foeAwayColorCheck").addEventListener('click',function(){htlivesight.Settings.click.foeAwayColorCheck();});
	document.getElementById("foeAwayColorCode").addEventListener('change',function(){htlivesight.Settings.click.foeAwayColorSet();});

	document.getElementById("neutralColorCheck").addEventListener('click',function(){htlivesight.Settings.click.neutralColorCheck();});
	document.getElementById("neutralColorCode").addEventListener('change',function(){htlivesight.Settings.click.neutralColorSet();});

	//document.getElementById("textColorCheck").addEventListener('click',function(){htlivesight.Settings.click.textColorCheck();});
	//document.getElementById("textColorCode").addEventListener('change',function(){htlivesight.Settings.click.textColorSet();});
  document.getElementById("friendHomeTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.friendHomeTextColorCheck();});
	document.getElementById("friendHomeTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.friendHomeTextColorSet();});

  document.getElementById("friendAwayTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.friendAwayTextColorCheck();});
	document.getElementById("friendAwayTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.friendAwayTextColorSet();});
	
  document.getElementById("foeHomeTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.foeHomeTextColorCheck();});
	document.getElementById("foeHomeTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.foeHomeTextColorSet();});
	
  document.getElementById("foeAwayTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.foeAwayTextColorCheck();});
	document.getElementById("foeAwayTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.foeAwayTextColorSet();});
	
	document.getElementById("neutralTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.neutralTextColorCheck();});
	document.getElementById("neutralTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.neutralTextColorSet();});
	
	document.getElementById("seTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.seTextColorCheck();});
	document.getElementById("seTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.seTextColorSet();});
	//document.getElementById("label_customBackground_try").addEventListener('click',function(){htlivesight.Settings.click.tryBackground();});	
	document.getElementById("label_customBackground_reset").addEventListener('click',function(){htlivesight.Settings.click.resetBackground();});
	document.getElementById("customBackgroundPathBrowse").addEventListener('change',function(){htlivesight.Settings.click.getImageFile(this.files);});
	document.getElementById("customBackgroundPath").addEventListener('change',function(){htlivesight.Settings.click.tryBackground();});	
	
	document.getElementById("chkExtendBackground").addEventListener('click',function(){htlivesight.Settings.click.extendBackground();});
	document.getElementById("chkRepeatBackground").addEventListener('click',function(){htlivesight.Settings.click.repeatBackground();});
	
	document.getElementById("headerBarColorCheck").addEventListener('click',function(){htlivesight.Settings.click.headerBarColorCheck();});
	document.getElementById("headerBarColorCode").addEventListener('change',function(){htlivesight.Settings.click.headerBarColorSet();});
	
	document.getElementById("headerBarTextColorCheck").addEventListener('click',function(){htlivesight.Settings.click.headerBarTextColorCheck();});
	document.getElementById("headerBarTextColorCode").addEventListener('change',function(){htlivesight.Settings.click.headerBarTextColorSet();});
	//other import export
	document.getElementById("import_button").addEventListener('click',function(){htlivesight.Settings.click.importPreferences();});
	document.getElementById("export_button").addEventListener('click',function(){htlivesight.Settings.click.exportPreferences();});
	
	document.getElementById("chkExportOauth").addEventListener('click',function(){htlivesight.Settings.click.exportOauth();});
	document.getElementById("chkExportBackground").addEventListener('click',function(){htlivesight.Settings.click.exportBackground();});
	document.getElementById("chkExportSounds").addEventListener('click',function(){htlivesight.Settings.click.exportSounds();});
	document.getElementById("useLiveEventsAndTextsInput").addEventListener('click',function(){htlivesight.Settings.click.useLiveEventsAndTexts();});
	
	
	/* ok cancel buttons*/
	try{ // because this two buttons are present in settings.html but not in htlivesight.html
		document.getElementById("ok-option").addEventListener('click',function(){htlivesight.Settings.click.btnOk();});
		document.getElementById("canc-option").addEventListener('click',function(){htlivesight.Settings.click.btnCancel();});
	}catch(e){}
	/* ending listeners */	
});