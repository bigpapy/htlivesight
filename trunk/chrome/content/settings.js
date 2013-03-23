if (!htlivesight) var htlivesight = {};
htlivesight.Settings = {
		preferences: null,
		OPEN_IN: {
			TAB: 0,
			WINDOW: 1
		},
		startup: function() {
			htlivesight.Settings.self = this;
			this.preferences = htlivesight.Preferences.get();
			htlivesight.Settings.load();
		}, 
		load: function() {
			var prefs = htlivesight.Settings.preferences;
			document.getElementById("dark_theme").checked=false;
			document.getElementById("light_theme").checked=false;
			document.getElementById("livefox_theme").checked=false;
			switch (""+prefs.general.theme) {
			case "3": 
				document.getElementById("light_theme").checked=true;
				break;
			case "4":
				document.getElementById("livefox_theme").checked=true;
				break;
			default:
				document.getElementById("dark_theme").checked=true;
			prefs.general.theme=2;
			break;
			}
			setTimeout(function(){htlivesight.Settings.click.switch_style(prefs.general.theme);}, 100); // enable only choosed css.
			if (prefs.general.openInTab){document.getElementById("openin_tab").click();}
			else{document.getElementById("openin_window").click();}
			document.getElementById("customBackgroundPath").value = prefs.general.customBackgroundPath;
			
			document.getElementById("chkExtendBackground").checked = prefs.general.extendBackground;
			document.getElementById("chkRepeatBackground").checked = prefs.general.repeatBackground;
			
			document.getElementById("hattrickServer").value = prefs.general.hattrickServer;
			if (prefs.matches.league.get) {
				document.getElementById("chkGetLeague").checked=true;
				if (prefs.matches.league.within) {
					document.getElementById("txtGetLeagueWithinHours").disabled=false;
				} else {
					document.getElementById("txtGetLeagueWithinHours").disabled=true;
				}
			} else {
				document.getElementById("chkGetLeague").checked=false;
				document.getElementById("chkGetLeagueWithin").disabled=true;
				document.getElementById("txtGetLeagueWithinHours").disabled=true;
			}
			document.getElementById("chkGetLeagueWithin").checked=prefs.matches.league.within;
			document.getElementById("txtGetLeagueWithinHours").value=prefs.matches.league.withinHours;
			if (prefs.matches.friends.get) {
				document.getElementById("chkGetFriends").checked=true;
				
				document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled=false;
				
				if (prefs.matches.friends.within) {
					document.getElementById("txtGetFriendsWithinHours").disabled=false;
				} else {
					document.getElementById("txtGetFriendsWithinHours").disabled=true;
				};
			} else {
				document.getElementById("chkGetFriends").checked=false;
				document.getElementById("chkGetFriendsWithin").disabled=true;
				document.getElementById("txtGetFriendsWithinHours").disabled=true;
				
				document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled=true;
				
			}
			document.getElementById("chkGetFriendsWithin").checked=prefs.matches.friends.within;
			document.getElementById("txtGetFriendsWithinHours").value=prefs.matches.friends.withinHours;
			
			document.getElementById("chkDoNotGetFriendsHointegratedMatches").checked=prefs.matches.friends.doNotGetFriendsHointegratedMatches;
			
			document.getElementById("chkHdrScorers").checked=prefs.matches.scorers;
			document.getElementById("chkHdrBooked").checked=prefs.matches.booked;
			document.getElementById("chkHdrSentOff").checked=prefs.matches.sentOff;
			document.getElementById("chkHdrInjured").checked=prefs.matches.injured;
			document.getElementById("txtMatchWindowSize").value=prefs.matches.windowSize;
			document.getElementById("chkSound").checked=prefs.notification.sound;
			if (!prefs.notification.sound) {
				document.getElementById("chkSoundOnlyOpened").disabled=true;
			};
			document.getElementById("chkSoundOnlyOpened").checked = prefs.notification.soundOnlyOpened;
			document.getElementById("chkFlash").checked = prefs.notification.flash;
			document.getElementById("chkSlider").checked = prefs.notification.slider;
			document.getElementById("lang-list").value = prefs.language.locale;
			document.getElementById("reverseOrder").checked = prefs.other.bottomUp;
			document.getElementById("printEventKey").checked = prefs.other.printEventKey;
			document.getElementById("oldIcons").checked =prefs.personalization.oldIcons;
			document.getElementById("weather").checked =prefs.personalization.weather;
			document.getElementById("whistleTime").checked =prefs.personalization.whistleTime;
			document.getElementById("weatherSE").checked =prefs.personalization.weatherSE;
			document.getElementById("livefoxGoal").checked =prefs.personalization.livefoxGoal;
			document.getElementById("noOpGoal").checked =prefs.personalization.noOpGoal;
			document.getElementById("myGoalSoundPath").value = prefs.personalization.myGoalSoundPath;
			document.getElementById("opGoalSoundPath").value = prefs.personalization.opGoalSoundPath;
			document.getElementById("frGoalSoundPath").value = prefs.personalization.frGoalSoundPath;
			document.getElementById("opfrGoalSoundPath").value = prefs.personalization.opfrGoalSoundPath;
			document.getElementById("otGoalSoundPath").value = prefs.personalization.otGoalSoundPath;
			document.getElementById("missGoalSoundPath").value = prefs.personalization.missGoalSoundPath;
			document.getElementById("sunSoundPath").value = prefs.personalization.sunSoundPath;
			document.getElementById("rainSoundPath").value = prefs.personalization.rainSoundPath;
			document.getElementById("overcastSoundPath").value = prefs.personalization.overcastSoundPath;
			document.getElementById("fewCloudsSoundPath").value = prefs.personalization.fewCloudsSoundPath;
			document.getElementById("myBooSoundPath").value = prefs.personalization.myBooSoundPath;
			document.getElementById("opBooSoundPath").value = prefs.personalization.opBooSoundPath;
			document.getElementById("whistleStartSoundPath").value = prefs.personalization.whistleStartSoundPath;
			document.getElementById("whistle2SoundPath").value = prefs.personalization.whistle2SoundPath;
			document.getElementById("whistle3SoundPath").value = prefs.personalization.whistle3SoundPath;
			document.getElementById("whistleSoundPath").value = prefs.personalization.whistleSoundPath;
			document.getElementById("hattrickSoundPath").value = prefs.personalization.hattrickSoundPath;
			document.getElementById("myGoalCheck").checked = prefs.personalization.myGoalCheck;
			document.getElementById("myGoalSoundPath").disabled = !prefs.personalization.myGoalCheck;
			document.getElementById("opGoalCheck").checked = prefs.personalization.opGoalCheck;
			document.getElementById("opGoalSoundPath").disabled = !prefs.personalization.opGoalCheck;
			document.getElementById("frGoalCheck").checked = prefs.personalization.frGoalCheck;
			document.getElementById("frGoalSoundPath").disabled = !prefs.personalization.frGoalCheck;
			document.getElementById("opfrGoalCheck").checked = prefs.personalization.opfrGoalCheck;
			document.getElementById("opfrGoalSoundPath").disabled = !prefs.personalization.opfrGoalCheck;
			document.getElementById("otGoalCheck").checked = prefs.personalization.otGoalCheck;
			document.getElementById("otGoalSoundPath").disabled = !prefs.personalization.otGoalCheck;
			document.getElementById("missGoalCheck").checked = prefs.personalization.missGoalCheck;
			document.getElementById("missGoalSoundPath").disabled = !prefs.personalization.missGoalCheck;
			document.getElementById("sunCheck").checked = prefs.personalization.sunCheck;
			document.getElementById("sunSoundPath").disabled = !prefs.personalization.sunCheck;
			document.getElementById("rainCheck").checked = prefs.personalization.rainCheck;
			document.getElementById("rainSoundPath").disabled = !prefs.personalization.rainCheck;
			document.getElementById("overcastCheck").checked = prefs.personalization.overcastCheck;
			document.getElementById("overcastSoundPath").disabled = !prefs.personalization.overcastCheck;
			document.getElementById("fewCloudsCheck").checked = prefs.personalization.fewCloudsCheck;
			document.getElementById("fewCloudsSoundPath").disabled = !prefs.personalization.fewCloudsCheck;
			document.getElementById("myBooCheck").checked = prefs.personalization.myBooCheck;
			document.getElementById("myBooSoundPath").disabled = !prefs.personalization.myBooCheck;
			document.getElementById("opBooCheck").checked = prefs.personalization.opBooCheck;
			document.getElementById("opBooSoundPath").disabled = !prefs.personalization.opBooCheck;
			document.getElementById("whistleStartCheck").checked = prefs.personalization.whistleStartCheck;
			document.getElementById("whistleStartSoundPath").disabled = !prefs.personalization.whistleStartCheck;
			document.getElementById("whistle2Check").checked = prefs.personalization.whistle2Check;
			document.getElementById("whistle2SoundPath").disabled = !prefs.personalization.whistle2Check;
			document.getElementById("whistle3Check").checked = prefs.personalization.whistle3Check;
			document.getElementById("whistle3SoundPath").disabled = !prefs.personalization.whistle3Check;
			document.getElementById("whistleCheck").checked = prefs.personalization.whistleCheck;
			document.getElementById("whistleSoundPath").disabled = !prefs.personalization.whistleCheck;
			document.getElementById("hattrickCheck").checked = prefs.personalization.hattrickCheck;
			document.getElementById("hattrickSoundPath").disabled = !prefs.personalization.hattrickCheck;		
			document.getElementById("friendHomeColorCheck").checked = prefs.colors.friendHomeColorCheck;
			document.getElementById("friendHomeColorCode").disabled = !prefs.colors.friendHomeColorCheck;
			document.getElementById("friendHomeColorCode").value = "#"+prefs.colors.friendHomeColorCode;
			if (prefs.colors.friendHomeColorCheck)
				document.getElementById("label_friendHomeColorCode").style.backgroundColor= "#" + prefs.colors.friendHomeColorCode;
			document.getElementById("friendAwayColorCheck").checked = prefs.colors.friendAwayColorCheck;
			document.getElementById("friendAwayColorCode").disabled = !prefs.colors.friendAwayColorCheck;
			document.getElementById("friendAwayColorCode").value = "#"+prefs.colors.friendAwayColorCode;
			if (prefs.colors.friendAwayColorCheck)
				document.getElementById("label_friendAwayColorCode").style.backgroundColor= "#" + prefs.colors.friendAwayColorCode;
			document.getElementById("foeHomeColorCheck").checked = prefs.colors.foeHomeColorCheck;
			document.getElementById("foeHomeColorCode").disabled = !prefs.colors.foeHomeColorCheck;
			document.getElementById("foeHomeColorCode").value = "#"+prefs.colors.foeHomeColorCode;
			if (prefs.colors.foeHomeColorCheck)
				document.getElementById("label_foeHomeColorCode").style.backgroundColor= "#" + prefs.colors.foeHomeColorCode;
			document.getElementById("foeAwayColorCheck").checked = prefs.colors.foeAwayColorCheck;
			document.getElementById("foeAwayColorCode").disabled = !prefs.colors.foeAwayColorCheck;
			document.getElementById("foeAwayColorCode").value = "#"+prefs.colors.foeAwayColorCode;
			if (prefs.colors.foeAwayColorCheck)
				document.getElementById("label_foeAwayColorCode").style.backgroundColor= "#" + prefs.colors.foeAwayColorCode;
			document.getElementById("neutralColorCheck").checked = prefs.colors.neutralColorCheck;
			document.getElementById("neutralColorCode").disabled = !prefs.colors.neutralColorCheck;
			document.getElementById("neutralColorCode").value = "#"+prefs.colors.neutralColorCode;
			if (prefs.colors.neutralColorCheck)
				document.getElementById("label_neutralColorCode").style.backgroundColor= "#" + prefs.colors.neutralColorCode;
			document.getElementById("textColorCheck").checked = prefs.colors.textColorCheck;
			document.getElementById("textColorCode").disabled = !prefs.colors.textColorCheck;
			document.getElementById("textColorCode").value = "#"+prefs.colors.textColorCode;
			if (prefs.colors.textColorCheck){
				document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.textColorCode;
			};
			document.getElementById("seTextColorCheck").checked = prefs.colors.seTextColorCheck;
			document.getElementById("seTextColorCode").disabled = !prefs.colors.seTextColorCheck;
			document.getElementById("seTextColorCode").value = "#"+prefs.colors.seTextColorCode;
		},
		save: function() {
			htlivesight.Log.properties(this.preferences.notification);
			htlivesight.Preferences.save(this.preferences);
		},
		localization: function () {
			var  prefs=htlivesight.Preferences.get();
			var url = htlivesightEnv.contentPath+"locale/"+ prefs.language.locale +".xml";
			var languageXML = htlivesight.loadXml(url);
			var data=languageXML.getElementsByTagName("Htlivesight");
			htlivesight.data=data;
			document.getElementsByTagName("title")[0].innerHTML=htlivesight.Util.Parse("WindowMainTitle",data[0]);
			document.getElementById("TabGeneral").innerHTML=htlivesight.Util.Parse("TabGeneral",data[0]);
			document.getElementById("TabMatches").innerHTML=htlivesight.Util.Parse("TabMatches",data[0]);
			document.getElementById("TabNotifications").innerHTML=htlivesight.Util.Parse("TabNotifications",data[0]);
			document.getElementById("TabOther").innerHTML=htlivesight.Util.Parse("TabOther",data[0]);
			document.getElementById("TabCustom").innerHTML=htlivesight.Util.Parse("TabCustom",data[0]);
			
			document.getElementById("ThemesSelector").innerHTML=htlivesight.Util.Parse("Themes",data[0]);
			document.getElementById("label_dark_theme").innerHTML=htlivesight.Util.Parse("Dark",data[0]);
			document.getElementById("label_light_theme").innerHTML=htlivesight.Util.Parse("Light",data[0]);
			
			document.getElementById("GeneralOpen").innerHTML=htlivesight.Util.Parse("GeneralOpen",data[0]);
			document.getElementById("label_openin_tab").innerHTML=htlivesight.Util.Parse("GeneralNewTab",data[0]);
			document.getElementById("label_openin_window").innerHTML=htlivesight.Util.Parse("GeneralNewWindow",data[0]);
			document.getElementById("LanguageSelect").innerHTML=htlivesight.Util.Parse("LanguageSelect",data[0]);
			document.getElementById("LanguageNote").innerHTML=htlivesight.Util.Parse("LanguageNote",data[0]);
			document.getElementById("GeneralServer").innerHTML=htlivesight.Util.Parse("GeneralServer",data[0]);
			document.getElementById("GeneralNote").innerHTML=htlivesight.Util.Parse("GeneralNote",data[0]);
			document.getElementById("CrowdinHelp").innerHTML=htlivesight.Util.Parse("CrowdinHelp",data[0]);
			document.getElementById("MatchesLeague").innerHTML=htlivesight.Util.Parse("MatchesLeague",data[0]);
			document.getElementById("label_chkGetLeague").innerHTML=htlivesight.Util.Parse("MatchesGetLeague",data[0]);
			document.getElementById("label_chkGetLeagueWithin").innerHTML=htlivesight.Util.Parse("MatchesPlayed",data[0]);
			document.getElementById("MatchesHours").innerHTML=htlivesight.Util.Parse("MatchesHours",data[0]);
			document.getElementById("MatchesFriends").innerHTML=htlivesight.Util.Parse("MatchesFriends",data[0]);
			document.getElementById("label_chkGetFriends").innerHTML=htlivesight.Util.Parse("MatchesGetFriends",data[0]);
			document.getElementById("label_chkGetFriendsWithin").innerHTML=htlivesight.Util.Parse("MatchesPlayed",data[0]);
			document.getElementById("MatchesHours2").innerHTML=htlivesight.Util.Parse("MatchesHours",data[0]);
			
			document.getElementById("label_chkDoNotGetFriendsHointegratedMatches").innerHTML=htlivesight.Util.Parse("NoTournament",data[0]);
			
			document.getElementById("MatchesHeader").innerHTML=htlivesight.Util.Parse("MatchesHeader",data[0]);
			document.getElementById("label_chkHdrScorers").innerHTML=htlivesight.Util.Parse("ScorersList",data[0]);
			document.getElementById("label_chkHdrBooked").innerHTML=htlivesight.Util.Parse("BookedList",data[0]);
			document.getElementById("label_chkHdrSentOff").innerHTML=htlivesight.Util.Parse("SentOffList",data[0]);
			document.getElementById("label_chkHdrInjured").innerHTML=htlivesight.Util.Parse("InjuredList",data[0]);
			document.getElementById("MatchesWindow").innerHTML=htlivesight.Util.Parse("MatchesWindow",data[0]);
			document.getElementById("MatchesLines").innerHTML=htlivesight.Util.Parse("MatchesLines",data[0]);
			//notify
			document.getElementById("NotifyNotify").innerHTML=htlivesight.Util.Parse("NotifyNotify",data[0]);
			document.getElementById("label_chkSound").innerHTML=htlivesight.Util.Parse("NotifyEnableSound",data[0]);
			document.getElementById("label_chkSoundOnlyOpened").innerHTML=htlivesight.Util.Parse("NotifyOnly",data[0]);
			document.getElementById("label_chkFlash").innerHTML=htlivesight.Util.Parse("NotifyFlash",data[0]);
			document.getElementById("label_chkSlider").innerHTML=htlivesight.Util.Parse("NotifyStatus",data[0]);
			//other
			document.getElementById("OtherAuthorization").innerHTML=htlivesight.Util.Parse("OtherAuthorization",data[0]);
			document.getElementById("OtherReset").innerHTML=htlivesight.Util.Parse("OtherReset",data[0]);
			document.getElementById("button_reset").innerHTML=htlivesight.Util.Parse("OtherResetButton",data[0]);
			document.getElementById("OtherEvents").innerHTML=htlivesight.Util.Parse("OtherEvents",data[0]);
			document.getElementById("label_reverseOrder").innerHTML=htlivesight.Util.Parse("OtherReverse",data[0]);
			document.getElementById("OtherReverseNote").innerHTML=htlivesight.Util.Parse("OtherReverseNote",data[0]);
			document.getElementById("OtherEventKey").innerHTML=htlivesight.Util.Parse("OtherEventKey",data[0]);
			document.getElementById("label_printEventKey").innerHTML=htlivesight.Util.Parse("OtherEventKeyNote",data[0]);
			// customization
			document.getElementById("CustomIcons").innerHTML=htlivesight.Util.Parse("CustomIcons",data[0]);
			document.getElementById("label_oldIcons").innerHTML=htlivesight.Util.Parse("CustomIconsOld",data[0]);
			document.getElementById("CustomSounds").innerHTML=htlivesight.Util.Parse("CustomSounds",data[0]);
			document.getElementById("label_weather").innerHTML=htlivesight.Util.Parse("CustomSoundsWeather",data[0]);
			document.getElementById("label_whistleTime").innerHTML=htlivesight.Util.Parse("CustomSoundsTime",data[0]);
			document.getElementById("label_weatherSE").innerHTML=htlivesight.Util.Parse("CustomSoundsSEW",data[0]);
			document.getElementById("label_livefoxGoal").innerHTML=htlivesight.Util.Parse("CustomSoundsGoal",data[0]);
			document.getElementById("label_noOpGoal").innerHTML=htlivesight.Util.Parse("CustomSoundsNoOpGoal",data[0]);
			document.getElementById("PathSoundsNote1").innerHTML=htlivesight.Util.Parse("PathSoundsNote1",data[0]);
			document.getElementById("PathSoundsNote2").innerHTML=htlivesight.Util.Parse("PathSoundsNote2",data[0]);
//			goalsounds
			document.getElementById("TabGoalSound").innerHTML=htlivesight.Util.Parse("TabGoalSound",data[0]);
			// my goals sound labels
			document.getElementById("label_myGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMyGoal",data[0]);
			document.getElementById("label_myGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_myGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// op goals sound labels
			document.getElementById("label_opGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpGoal",data[0]);
			document.getElementById("label_opGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_opGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// friends goal sound labels
			document.getElementById("label_frGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsFrGoal",data[0]);
			document.getElementById("label_frGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_frGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// opponent friends goal sound labes
			document.getElementById("label_opfrGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpFrGoal",data[0]);
			document.getElementById("label_opfrGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_opfrGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// other goals sound labels
			document.getElementById("label_otGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOtGoal",data[0]);
			document.getElementById("label_otGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_otGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// miss goals sound labels
			document.getElementById("label_missGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMiss",data[0]);
			document.getElementById("label_missGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_missGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
//			meteo and injury sounds
			document.getElementById("TabWheatherSound").innerHTML=htlivesight.Util.Parse("TabWheatherSound",data[0]);
			// sun sound
			document.getElementById("label_sunCheck").innerHTML=htlivesight.Util.Parse("PathSoundsSun",data[0]);
			document.getElementById("label_sunButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_sunButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// rain sound
			document.getElementById("label_rainCheck").innerHTML=htlivesight.Util.Parse("PathSoundsRain",data[0]);
			document.getElementById("label_rainButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_rainButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// overcast sound
			document.getElementById("label_overcastCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOvercast",data[0]);
			document.getElementById("label_overcastButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_overcastButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// few clouds sound
			document.getElementById("label_fewCloudsCheck").innerHTML=htlivesight.Util.Parse("PathSoundsFewClouds",data[0]);
			document.getElementById("label_fewCloudsButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_fewCloudsButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// My injury sound
			document.getElementById("label_myBooCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMyBoo",data[0]);
			document.getElementById("label_myBooButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_myBooButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// Opponent and other injury sound
			document.getElementById("label_opBooCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpBoo",data[0]);
			document.getElementById("label_opBooButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_opBooButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
//			begin/end half and booking sounds
			document.getElementById("TabWhistleSound").innerHTML=htlivesight.Util.Parse("TabWhistleSound",data[0]);
			// Whistle start sound
			document.getElementById("label_whistleStartCheck").innerHTML=htlivesight.Util.Parse("PathSoundsWhistleStart",data[0]);
			document.getElementById("label_whistleStartButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_whistleStartButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// Whistle2 sound
			document.getElementById("label_whistle2Check").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle2",data[0]);
			document.getElementById("label_whistle2Button_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_whistle2Button_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// Whistle3 sound
			document.getElementById("label_whistle3Check").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle3",data[0]);
			document.getElementById("label_whistle3Button_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_whistle3Button_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// Whistle sound
			document.getElementById("label_whistleCheck").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle",data[0]);
			document.getElementById("label_whistleButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_whistleButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// Hattrick sound
			document.getElementById("label_hattrickCheck").innerHTML=htlivesight.Util.Parse("PathSoundsHattrick",data[0]);
			document.getElementById("label_hattrickButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_hattrickButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			document.getElementById("TabColors").innerHTML=htlivesight.Util.Parse("Colors",data[0]);
			document.getElementById("CustomEventBackground").innerHTML=htlivesight.Util.Parse("EventBackground",data[0]);
			document.getElementById("ChooseColor").innerHTML=htlivesight.Util.Parse("ColorPicker",data[0]);
			document.getElementById("label_friendHomeColorCode").innerHTML=htlivesight.Util.Parse("FriendHome",data[0]);
			document.getElementById("label_friendAwayColorCode").innerHTML=htlivesight.Util.Parse("FriendAway",data[0]);
			document.getElementById("label_foeHomeColorCode").innerHTML=htlivesight.Util.Parse("FoeHome",data[0]);
			document.getElementById("label_foeAwayColorCode").innerHTML=htlivesight.Util.Parse("FoeAway",data[0]);
			document.getElementById("label_neutralColorCode").innerHTML=htlivesight.Util.Parse("Neutral",data[0]);
			document.getElementById("CustomEventText").innerHTML=htlivesight.Util.Parse("EventColorTitle",data[0]);
			document.getElementById("label_textColorCode").innerHTML=htlivesight.Util.Parse("EventTextColor",data[0]);
			document.getElementById("label_seTextColorCode").innerHTML=htlivesight.Util.Parse("SETextColor",data[0]);
			//background
		// background
			document.getElementById("label_customBackground_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
			document.getElementById("label_chkExtendBackground").innerHTML=htlivesight.Util.Parse("ExtendImage",data[0]);
			document.getElementById("label_chkRepeatBackground").innerHTML=htlivesight.Util.Parse("RepeatImage",data[0]);
			document.getElementById("CustomBackground").innerHTML=htlivesight.Util.Parse("Background",data[0]);
			try{ //because it's present in settings.html but not in htlivesight.html
				document.getElementById("OkButton").innerHTML=htlivesight.Util.Parse("ButtonOk",data[0]);
				document.getElementById("CancelButton").innerHTML=htlivesight.Util.Parse("ButtonCancel",data[0]);
			}catch(e){}
		}, 
		click: {
			btnCancel: function() {
				window.close();
			},
			btnOk: function() {
				htlivesight.Settings.click.selLang();//change the language in prefs without saving it.
				htlivesight.Settings.save();
				if (!htlivesightPrefs.getBool("HtlsFirstStart")){
					htlivesightPrefs.setBool("HtlsFirstStart",true);
					window.open(htlivesightEnv.contentPath+"htlivesight.html","_parent");
				}
				else{
					window.close();
				}
			},
			switch_style: function(whichSheet){
				whichSheet=whichSheet-1;
				if(document.styleSheets){
					var c = document.styleSheets.length;
					var start=2;
					if(c==6){start=3;whichSheet++;} // fix to let firefox preference under extension to work properly.
					for(var i=start;i<c-1;i++){
						if(i!=whichSheet){
							document.styleSheets[i].disabled=true;
						}else{
							document.styleSheets[i].disabled=false;
						}
					}
					if(c==6)whichSheet--;
				}
				var prefs = htlivesight.Settings.preferences;
				prefs.general.theme = whichSheet+1;
			},
			radopenin: function(value) {
				var prefs = htlivesight.Settings.preferences;
				prefs.general.openInTab = value;
			},
			txtfixhattrickserver: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("hattrickServer").value;
				htlivesight.Settings.preferences.general.hattrickServer = value;
			},
			chkgetleague: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetLeague").checked) {
					document.getElementById("chkGetLeagueWithin").disabled = false;
					htlivesight.Settings.click.chkgetleaguewithin();
					prefs.matches.league.get = true;
				} else {
					document.getElementById("chkGetLeagueWithin").disabled = true;
					document.getElementById("txtGetLeagueWithinHours").disabled = true;
					prefs.matches.league.get = false;
				}
			},
			chkgetleaguewithin: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetLeagueWithin").checked) {
					document.getElementById("txtGetLeagueWithinHours").disabled = false;
					prefs.matches.league.within = true;
				} else {
					document.getElementById("txtGetLeagueWithinHours").disabled = true;
					prefs.matches.league.within = false;
				};
			},
			txtfixleaguehours: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("txtGetLeagueWithinHours").value.replace(/\D/g, "");
				document.getElementById("txtGetLeagueWithinHours").value = value;
				prefs.matches.league.withinHours = value;
			},
			chkgetfriends: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetFriends").checked) {
					document.getElementById("chkGetFriendsWithin").disabled = false;
					htlivesight.Settings.click.chkgetfriendswithin();
					document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled = false;
					prefs.matches.friends.get = true;
				} else {
					document.getElementById("chkGetFriendsWithin").disabled = true;
					document.getElementById("txtGetFriendsWithinHours").disabled = true;
					document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled = true;
					prefs.matches.friends.get = false;
				}
			},
			chkgetfriendswithin: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetFriendsWithin").checked) {
					document.getElementById("txtGetFriendsWithinHours").disabled = false;
					prefs.matches.friends.within = true;
				} else {
					document.getElementById("txtGetFriendsWithinHours").disabled = true;
					prefs.matches.friends.within = false;
				};
			},
			txtfixfriendshours: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("txtGetFriendsWithinHours").value.replace(/\D/g, "");
				document.getElementById("txtGetFriendsWithinHours").value = value;
				prefs.matches.friends.withinHours = value;
			},
			

			chkDoNotGetFriendsHointegratedMatches: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkDoNotGetFriendsHointegratedMatches").checked) {
					prefs.matches.friends.doNotGetFriendsHointegratedMatches = true;
				} else {
					prefs.matches.friends.doNotGetFriendsHointegratedMatches = false;
				};
			},
			
			
			chkhdrscorers: function() {
				var prefs = htlivesight.Settings.preferences;
				prefs.matches.scorers = document.getElementById("chkHdrScorers").checked;
			},
			chkhdrbooked: function() {
				var prefs = htlivesight.Settings.preferences;
				prefs.matches.booked = document.getElementById("chkHdrBooked").checked;
			},
			chkhdrsentoff: function() {
				var prefs = htlivesight.Settings.preferences;
				prefs.matches.sentOff = document.getElementById("chkHdrSentOff").checked;
			},
			chkhdrinjured: function() {
				var prefs = htlivesight.Settings.preferences;
				prefs.matches.injured = document.getElementById("chkHdrInjured").checked;
			},			
			txtfixwindowsize: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("txtMatchWindowSize").value.replace(/\D/g, "");
				document.getElementById("txtMatchWindowSize").value = value;
				prefs.matches.windowSize = value;
			},
			chkSound: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkSound").checked) {
					document.getElementById("chkSoundOnlyOpened").disabled = false;
					prefs.notification.sound = true;
					htlivesight.prefs.notification.sound = true;
					try{
					  document.getElementById("muteAllImg").src="./img/sound_on.gif";
					}catch(e){}
				} else {
					document.getElementById("chkSoundOnlyOpened").disabled = true;
					prefs.notification.sound = false;
					htlivesight.prefs.notification.sound = false;
					try{
					  document.getElementById("muteAllImg").src="./img/sound_off.gif";
					}catch(e){}
				};
			},
			chkSoundOnlyOpened: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkSoundOnlyOpened").checked) {
					prefs.notification.soundOnlyOpened = true;
				} else {
					prefs.notification.soundOnlyOpened = false;
				};
			},
			chkFlash: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkFlash").checked) {
					prefs.notification.flash = true;
				} else {
					prefs.notification.flash = false;
				};
			},
			chkSlider: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkSlider").checked) {
					prefs.notification.slider = true;
				} else {
					prefs.notification.slider = false;
				};
			},
			selLang: function() {
				var prefs = htlivesight.Settings.preferences;
				var newLang = document.getElementById("lang-list").value;
				prefs.language.locale = newLang;
			},
			resetToken: function() {
				teamId=htlivesight.Preferences.teamId.get();    
				if (teamId=="") teamId=prompt("TeamId");
				htlivesight.ApiProxy.invalidateAccessToken(teamId);//delete access token
				var  prefs=htlivesight.Preferences.get();
				var	url = htlivesightEnv.contentPath+"locale/"+ prefs.language.locale +".xml";
				var languageXML = htlivesight.loadXml(url);
				var data=languageXML.getElementsByTagName("Htlivesight");
				var reset_token=htlivesight.Util.Parse("ResetToken",data[0]);
				alert(reset_token);
			},
			reverseOrder: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("reverseOrder").checked) {
					prefs.other.bottomUp = true;
				} else {
					prefs.other.bottomUp = false;
				};
			},
			printEventKey: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("printEventKey").checked) {
					prefs.other.printEventKey = true;
				} else {
					prefs.other.printEventKey = false;
				};
			},
			oldIcons: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("oldIcons").checked) {
					prefs.personalization.oldIcons = true;
				} else {
					prefs.personalization.oldIcons = false;
				};
			},
			weather: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("weather").checked) {
					prefs.personalization.weather = true;
				} else {
					prefs.personalization.weather = false;
				};
			},
			whistleTime: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("whistleTime").checked) {
					prefs.personalization.whistleTime = true;
				} else {
					prefs.personalization.whistleTime = false;
				};
			},
			weatherSE: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("weatherSE").checked) {
					prefs.personalization.weatherSE = true;
				} else {
					prefs.personalization.weatherSE = false;
				};
			},
			livefoxGoal: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("livefoxGoal").checked) {
					prefs.personalization.livefoxGoal = true;
				} else {
					prefs.personalization.livefoxGoal = false;
				};
			},
			noOpGoal: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("noOpGoal").checked) {
					prefs.personalization.noOpGoal = true;
				} else {
					prefs.personalization.noOpGoal = false;
				};
			},
			checkSound: function(id) {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById(id+"Check").checked) {
					document.getElementById(id+"SoundPath").disabled = false;
					prefs.personalization[id+"SoundPath"] = document.getElementById(id+"SoundPath").value.replace(/@/g,"");
					document.getElementById(id+"SoundPath").value=prefs.personalization[id+"SoundPath"];
					prefs.personalization[id+"Check"]=true;
				} else {
					prefs.personalization[id+"SoundPath"] = "@"+document.getElementById(id+"SoundPath").value;
					document.getElementById(id+"SoundPath").value="@"+document.getElementById(id+"SoundPath").value;
					document.getElementById(id+"SoundPath").disabled = true;
					prefs.personalization[id+"Check"] = false;
				};
			},
			soundReset: function(id, defaultFile) {
				var prefix="@";
				if(document.getElementById(id+"Check").checked) prefix="";
				var prefs = htlivesight.Settings.preferences;
				document.getElementById(id+"SoundPath").value=prefix+htlivesightEnv.contentPath+defaultFile;
				prefs.personalization[id+"SoundPath"] = document.getElementById(id+"SoundPath").value;
				document.getElementById(id+"SoundPathBrowse").value="";
			},
			getSoundFile: function(file, id) {
				var prefs = htlivesight.Settings.preferences;
				if	(htlivesight.arch == "Sandboxed"){
					var reader = new FileReader();
					reader.onerror = function(e) {
						window.alert('Error code: ' + e.target.error.code);
						calback(null);
					};
					reader.onload = function (oFREvent) {
						dataUrl = oFREvent.target.result;
						if (dataUrl.length > 450000) {
							window.alert('File too large! Max 300kB.');
							dataUrl = null;
						}else{
							document.getElementById(id).value = dataUrl;
							prefs.personalization[id] = dataUrl;
						}
					};
					reader.readAsDataURL(file[0]);
				};
				if	(htlivesight.arch == "Gecko"){
					var browseId=id+"Browse";
					var soundPath=document.getElementById(browseId).value;
					if ((soundPath.search("chrome:")==-1) && (soundPath.search("file:")==-1)) soundPath="file:///"+soundPath;
					document.getElementById(id).value=soundPath;
					prefs.personalization[id] = soundPath;
				}
			},
			soundPlay: function(id) {
				soundPath=document.getElementById(id).value;
				htlivesight.Sound.play(soundPath, document);
			},
			friendHomeColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("friendHomeColorCheck").checked) {
					document.getElementById("friendHomeColorCode").disabled = false;
					prefs.colors.friendHomeColorCheck=true;
					document.getElementById("label_friendHomeColorCode").style.backgroundColor= "#" + prefs.colors.friendHomeColorCode;
				} else {
					document.getElementById("friendHomeColorCode").disabled = true;
					prefs.colors.friendHomeColorCheck=false;
				}
			},
			friendHomeColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("friendHomeColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.friendHomeColorCode = value;
				document.getElementById("label_friendHomeColorCode").style.backgroundColor= "#" + prefs.colors.friendHomeColorCode;
			},
			friendAwayColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("friendAwayColorCheck").checked) {
					document.getElementById("friendAwayColorCode").disabled = false;
					prefs.colors.friendAwayColorCheck=true;
					document.getElementById("label_friendAwayColorCode").style.backgroundColor= "#" + prefs.colors.friendAwayColorCode;
				} else {
					document.getElementById("friendAwayColorCode").disabled = true;
					prefs.colors.friendAwayColorCheck=false;
				}
			},
			friendAwayColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("friendAwayColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.friendAwayColorCode = value;
				document.getElementById("label_friendAwayColorCode").style.backgroundColor= "#" + prefs.colors.friendAwayColorCode;
			},
			foeHomeColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("foeHomeColorCheck").checked) {
					document.getElementById("foeHomeColorCode").disabled = false;
					prefs.colors.foeHomeColorCheck=true;
					document.getElementById("label_foeHomeColorCode").style.backgroundColor= "#" + prefs.colors.foeHomeColorCode;
				} else {
					document.getElementById("foeHomeColorCode").disabled = true;
					prefs.colors.foeHomeColorCheck=false;
				}
			},
			foeHomeColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("foeHomeColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.foeHomeColorCode = value;
				document.getElementById("label_foeHomeColorCode").style.backgroundColor= "#" + prefs.colors.foeHomeColorCode;
			},
			foeAwayColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("foeAwayColorCheck").checked) {
					document.getElementById("foeAwayColorCode").disabled = false;
					prefs.colors.foeAwayColorCheck=true;
					document.getElementById("label_foeAwayColorCode").style.backgroundColor= "#" + prefs.colors.foeAwayColorCode;
				} else {
					document.getElementById("foeAwayColorCode").disabled = true;
					prefs.colors.foeAwayColorCheck=false;
				}
			},
			foeAwayColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("foeAwayColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.foeAwayColorCode = value;
				document.getElementById("label_foeAwayColorCode").style.backgroundColor= "#" + prefs.colors.foeAwayColorCode;
			},
			neutralColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("neutralColorCheck").checked) {
					document.getElementById("neutralColorCode").disabled = false;
					prefs.colors.neutralColorCheck=true;
					document.getElementById("label_neutralColorCode").style.backgroundColor= "#" + prefs.colors.neutralColorCode;
				} else {
					document.getElementById("neutralColorCode").disabled = true;
					prefs.colors.neutralColorCheck=false;
				}
			},
			neutralColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("neutralColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.neutralColorCode = value;
				document.getElementById("label_neutralColorCode").style.backgroundColor= "#" + prefs.colors.neutralColorCode;
			},
			textColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("textColorCheck").checked) {
					document.getElementById("textColorCode").disabled = false;
					prefs.colors.textColorCheck=true;
					document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
					document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
					document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
					document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
					document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.textColorCode;
				} else {
					document.getElementById("textColorCode").disabled = true;
					prefs.colors.textColorCheck=false;
				}
			},
			textColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("textColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.textColorCode = value;
				document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.textColorCode;
			},
			seTextColorCheck: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("seTextColorCheck").checked) {
					document.getElementById("seTextColorCode").disabled = false;
					prefs.colors.seTextColorCheck=true;
					document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.seTextColorCode;
					document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.seTextColorCode;
					document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.seTextColorCode;
					document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.seTextColorCode;
					document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.seTextColorCode;
				} else {
					document.getElementById("seTextColorCode").disabled = true;
					prefs.colors.seTextColorCheck=false;
				}
			},
			seTextColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("seTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.seTextColorCode = value;
				document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.seTextColorCode;
				document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.seTextColorCode;
				document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.seTextColorCode;
				document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.seTextColorCode;
				document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.seTextColorCode;
			},
			tryBackground: function() {
				var prefs = htlivesight.Settings.preferences;
				imagePath = document.getElementById("customBackgroundPath").value;
				document.body.style.backgroundImage = "url('"+imagePath+"')";
				prefs.general["customBackgroundPath"] = imagePath;
			},
			resetBackground: function() {
			var prefs = htlivesight.Settings.preferences;
			imagePath = document.getElementById("customBackgroundPath").value=htlivesightEnv.contentPath+"themes/images/bg.png";
			document.body.style.backgroundImage = "url('"+imagePath+"')";
			prefs.general["customBackgroundPath"] = imagePath;
			},
			
			getImageFile: function(file) {
				var prefs = htlivesight.Settings.preferences;
				if	(htlivesight.arch == "Sandboxed"){
					var reader = new FileReader();
					reader.onerror = function(e) {
						window.alert('Error code: ' + e.target.error.code);
						calback(null);
					};
					reader.onload = function (oFREvent) {
						dataUrl = oFREvent.target.result;
						if (dataUrl.length > 450000) {
							window.alert('File too large! Max 300kB.');
							dataUrl = null;
						}else{
							document.getElementById("customBackgroundPath").value = dataUrl;
							document.body.style.backgroundImage = "url('"+dataUrl+"')";
							prefs.general["customBackgroundPath"] = dataUrl;
						}
					};
					reader.readAsDataURL(file[0]);
				};
				if	(htlivesight.arch == "Gecko"){
					var imagePath=document.getElementById("customBackgroundPathBrowse").value;
					var userAgent=navigator.userAgent;
					var windows=/Windows/g;
					var isWindows=windows.test(userAgent);
					if(isWindows) imagePath=imagePath.replace(/\\/g,"/");
					if ((imagePath.search("chrome:")==-1) && (imagePath.search("file:")==-1)) imagePath="file:///"+imagePath;
					document.getElementById("customBackgroundPath").value=imagePath;
					document.body.style.backgroundImage = "url('"+imagePath+"')";
					prefs.general["customBackgroundPath"] = imagePath;
				}
			},
			extendBackground: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkExtendBackground").checked) {
					document.getElementById("chkRepeatBackground").checked=false;
					htlivesight.Settings.click.repeatBackground();
				  document.body.style.backgroundSize="cover";
				}else{
					imagePath = document.getElementById("customBackgroundPath").value;
					document.body.style.backgroundImage = "url('"+imagePath+"')";
					document.body.style.backgroundSize="auto";
				}
				prefs.general["extendBackground"] = document.getElementById("chkExtendBackground").checked;
				},
				repeatBackground: function() {
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("chkRepeatBackground").checked) {
						document.getElementById("chkExtendBackground").checked=false;
						htlivesight.Settings.click.extendBackground();
					  document.body.style.backgroundRepeat="repeat";
					}else{
						imagePath = document.getElementById("customBackgroundPath").value;
						document.body.style.backgroundImage = "url('"+imagePath+"')";
						document.body.style.backgroundRepeat="no-repeat";
					}
					//document.body.style.backgroundPosition="left top";
					prefs.general["repeatBackground"] = document.getElementById("chkRepeatBackground").checked;
				}
		}
};