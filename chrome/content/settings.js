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
			$(function(){
				$("#tabs").tabs();
			});
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
			//if (prefs.matches.allMine.get) {
				//document.getElementById("chkGetAllMine").checked=true;
				if (prefs.matches.allMine.within) {
					document.getElementById("txtGetAllMineWithinHours").disabled=false;
				} else {
					document.getElementById("txtGetAllMineWithinHours").disabled=true;
				}
			/*} else {
				document.getElementById("chkGetAllMine").checked=false;
				document.getElementById("chkGetAllMineWithin").disabled=true;
				document.getElementById("txtGetAllMineWithinHours").disabled=true;
			}*/
			document.getElementById("chkGetAllMineWithin").checked=prefs.matches.allMine.within;
			document.getElementById("txtGetAllMineWithinHours").value=prefs.matches.allMine.withinHours;
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
			document.getElementById("chkGetLeagueScorers").checked=prefs.matches.league.getScorers;
			document.getElementById("chkGetYouthNearestMatch").checked=prefs.matches.myYouthMatch;
			if (prefs.matches.youthLeague.get) {
				document.getElementById("chkGetYouthLeague").checked=true;
				if (prefs.matches.youthLeague.within) {
					document.getElementById("txtGetYouthLeagueWithinHours").disabled=false;
				} else {
					document.getElementById("txtGetYouthLeagueWithinHours").disabled=true;
				}
			} else {
				document.getElementById("chkGetYouthLeague").checked=false;
				document.getElementById("chkGetYouthLeagueWithin").disabled=true;
				document.getElementById("txtGetYouthLeagueWithinHours").disabled=true;
			}
			document.getElementById("chkGetYouthLeagueWithin").checked=prefs.matches.youthLeague.within;
			document.getElementById("txtGetYouthLeagueWithinHours").value=prefs.matches.youthLeague.withinHours;
			
			
			if (prefs.matches.tournament.get) {
				document.getElementById("chkGetTournament").checked=true;
				if (prefs.matches.tournament.within) {
					document.getElementById("txtGetTournamentWithinHours").disabled=false;
				} else {
					document.getElementById("txtGetTournamentWithinHours").disabled=true;
				}
			} else {
				document.getElementById("chkGetTournament").checked=false;
				document.getElementById("chkGetTournamentWithin").disabled=true;
				document.getElementById("txtGetTournamentWithinHours").disabled=true;
			}
			document.getElementById("chkGetTournamentWithin").checked=prefs.matches.tournament.within;
			document.getElementById("txtGetTournamentWithinHours").value=prefs.matches.tournament.withinHours;
			
			if (prefs.matches.friends.get) {
				document.getElementById("chkGetFriends").checked=true;
				
				document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled=false;
				
				if (prefs.matches.friends.within) {
					document.getElementById("txtGetFriendsWithinHours").disabled=false;
				} else {
					document.getElementById("txtGetFriendsWithinHours").disabled=true;
				}
			} else {
				document.getElementById("chkGetFriends").checked=false;
				document.getElementById("chkGetFriendsWithin").disabled=true;
				document.getElementById("txtGetFriendsWithinHours").disabled=true;
				
				//document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled=true;
				
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
			document.getElementById("chkSecondSoundEqualFirst").checked =prefs.personalization.secondSoundEqualFirst;
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
			
			document.getElementById("pressingSoundPath").value = prefs.personalization.pressingSoundPath;
			document.getElementById("myBruisedSoundPath").value = prefs.personalization.myBruisedSoundPath;
			document.getElementById("otherBruisedSoundPath").value = prefs.personalization.otherBruisedSoundPath;
			document.getElementById("mySentOffSoundPath").value = prefs.personalization.mySentOffSoundPath;
			document.getElementById("otherSentOffSoundPath").value = prefs.personalization.otherSentOffSoundPath;

			document.getElementById("missFriendSoundPath").value = prefs.personalization.missFriendSoundPath;
			document.getElementById("missOtherSoundPath").value = prefs.personalization.missOtherSoundPath;
			document.getElementById("infoSoundPath").value = prefs.personalization.infoSoundPath;
			document.getElementById("myFavouriteGoalSoundPath").value = prefs.personalization.myFavouriteGoalSoundPath;
			
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
			
			document.getElementById("pressingCheck").checked = prefs.personalization.pressingCheck;
			document.getElementById("pressingSoundPath").disabled = !prefs.personalization.pressingCheck;
			
			document.getElementById("myBruisedCheck").checked = prefs.personalization.myBruisedCheck;
			document.getElementById("myBruisedSoundPath").disabled = !prefs.personalization.myBruisedCheck;
			
			document.getElementById("otherBruisedCheck").checked = prefs.personalization.otherBruisedCheck;
			document.getElementById("otherBruisedSoundPath").disabled = !prefs.personalization.otherBruisedCheck;
			
			document.getElementById("mySentOffCheck").checked = prefs.personalization.mySentOffCheck;
			document.getElementById("mySentOffSoundPath").disabled = !prefs.personalization.mySentOffCheck;
			
			document.getElementById("otherSentOffCheck").checked = prefs.personalization.otherSentOffCheck;
			document.getElementById("otherSentOffSoundPath").disabled = !prefs.personalization.otherSentOffCheck;
			
			document.getElementById("missFriendCheck").checked = prefs.personalization.missFriendCheck;
			document.getElementById("missFriendSoundPath").disabled = !prefs.personalization.missFriendCheck;
			
			document.getElementById("missOtherCheck").checked = prefs.personalization.missOtherCheck;
			document.getElementById("missOtherSoundPath").disabled = !prefs.personalization.missOtherCheck;
			
			document.getElementById("infoCheck").checked = prefs.personalization.infoCheck;
			document.getElementById("infoSoundPath").disabled = !prefs.personalization.infoCheck;
			
			document.getElementById("myFavouriteGoalCheck").checked = prefs.personalization.myFavouriteGoalCheck;
			document.getElementById("myFavouriteGoalSoundPath").disabled = !prefs.personalization.myFavouriteGoalCheck;
			
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
			
			document.getElementById("friendHomeTextColorCheck").checked = prefs.colors.friendHomeTextColorCheck;
			document.getElementById("friendHomeTextColorCode").disabled = !prefs.colors.friendHomeTextColorCheck;
			document.getElementById("friendHomeTextColorCode").value = "#"+prefs.colors.friendHomeTextColorCode;
			if (prefs.colors.friendHomeTextColorCheck)
				document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.friendHomeTextColorCode;
			document.getElementById("friendAwayTextColorCheck").checked = prefs.colors.friendAwayTextColorCheck;
			document.getElementById("friendAwayTextColorCode").disabled = !prefs.colors.friendAwayTextColorCheck;
			document.getElementById("friendAwayTextColorCode").value = "#"+prefs.colors.friendAwayTextColorCode;
			if (prefs.colors.friendAwayTextColorCheck)
				document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.friendAwayTextColorCode;
			document.getElementById("foeHomeTextColorCheck").checked = prefs.colors.foeHomeTextColorCheck;
			document.getElementById("foeHomeTextColorCode").disabled = !prefs.colors.foeHomeTextColorCheck;
			document.getElementById("foeHomeTextColorCode").value = "#"+prefs.colors.foeHomeTextColorCode;
			if (prefs.colors.foeHomeTextColorCheck)
				document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.foeHomeTextColorCode;
			document.getElementById("foeAwayTextColorCheck").checked = prefs.colors.foeAwayTextColorCheck;
			document.getElementById("foeAwayTextColorCode").disabled = !prefs.colors.foeAwayTextColorCheck;
			document.getElementById("foeAwayTextColorCode").value = "#"+prefs.colors.foeAwayTextColorCode;
			if (prefs.colors.foeAwayTextColorCheck)
				document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.foeAwayTextColorCode;
			document.getElementById("neutralTextColorCheck").checked = prefs.colors.neutralTextColorCheck;
			document.getElementById("neutralTextColorCode").disabled = !prefs.colors.neutralTextColorCheck;
			document.getElementById("neutralTextColorCode").value = "#"+prefs.colors.neutralTextColorCode;
			if (prefs.colors.neutralTextColorCheck)
				document.getElementById("label_neutralColorCode").style.backgroundColor= "#" + prefs.colors.neutralColorCode;

			//document.getElementById("textColorCheck").checked = prefs.colors.textColorCheck;
			//document.getElementById("textColorCode").disabled = !prefs.colors.textColorCheck;
			//document.getElementById("textColorCode").value = "#"+prefs.colors.textColorCode;
			if (prefs.colors.friendHomeTextColorCheck){
				document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
			}
				//document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				//document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				//document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				//document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.textColorCode;
			//};
			document.getElementById("seTextColorCheck").checked = prefs.colors.seTextColorCheck;
			document.getElementById("seTextColorCode").disabled = !prefs.colors.seTextColorCheck;
			document.getElementById("seTextColorCode").value = "#"+prefs.colors.seTextColorCode;
			
			document.getElementById("headerBarColorCheck").checked = prefs.colors.headerBarColorCheck;
			document.getElementById("headerBarColorCode").disabled = !prefs.colors.headerBarColorCheck;
			document.getElementById("headerBarColorCode").value = "#"+prefs.colors.headerBarColorCode;
			
			document.getElementById("headerBarTextColorCheck").checked = prefs.colors.headerBarTextColorCheck;
			document.getElementById("headerBarTextColorCode").disabled = !prefs.colors.headerBarTextColorCheck;
			document.getElementById("headerBarTextColorCode").value = "#"+prefs.colors.headerBarTextColorCode;
			if (document.getElementById("headerBarColorCheck").checked){
				$('.ui-accordion-header').css('background-image','none');
				$('.ui-accordion-header, #label_headerBarColorCode, #label_headerBarTextColorCode').css('background-color','#'+prefs.colors.headerBarColorCode);
			}
			if (document.getElementById("headerBarTextColorCheck").checked){
//				$('.ui-accordion-header').css('background-image','none');
				$('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a , #label_headerBarColorCode, #label_headerBarTextColorCode').css('color','#'+prefs.colors.headerBarTextColorCode);
			}
			document.getElementById("volumeSound").checked = prefs.personalization.settingVolumeSound;
			document.getElementById("chkExportOauth").checked = prefs.other.exportOauth;
			document.getElementById("chkExportBackground").checked = prefs.other.exportBackground;
			document.getElementById("chkExportSounds").checked = prefs.other.exportSounds;
			document.getElementById("chkYouthSoundEqualSenior").checked =prefs.personalization.youthSoundEqualSenior;
			document.getElementById("myFavouritePlayersId").value = prefs.personalization.myFavouritePlayersId;
			document.getElementById("useLiveEventsAndTextsInput").checked = prefs.other.useLiveEventsAndTexts;
		},
		save: function() {
			htlivesight.Log.properties(this.preferences.notification);
			htlivesight.Preferences.save(this.preferences);
		},
		localization: function () {
			var  prefs=htlivesight.Preferences.get();
			var url = htlivesightEnv.contentPath+"locale/"+ prefs.language.locale +".xml";
			//var languageXML = htlivesight.loadXml(url);
			htlivesight.loadXml(url, function(xml, status){
				if(status != 200){return}
				var data=xml.getElementsByTagName("Htlivesight");
				htlivesight.data=data;
				document.getElementsByTagName("title")[0].textContent=htlivesight.Util.Parse("WindowMainTitle",data[0]);
				document.getElementById("TabGeneral").textContent=htlivesight.Util.Parse("TabGeneral",data[0]);
				document.getElementById("TabMatches").textContent=htlivesight.Util.Parse("TabMatches",data[0]);
				document.getElementById("TabNotifications").textContent=htlivesight.Util.Parse("TabNotifications",data[0]);
				document.getElementById("TabOther").textContent=htlivesight.Util.Parse("TabOther",data[0]);
				document.getElementById("TabCustom").textContent=htlivesight.Util.Parse("CustomSounds",data[0]);
				
				document.getElementById("ThemesSelector").textContent=htlivesight.Util.Parse("Themes",data[0]);
				document.getElementById("label_dark_theme").textContent=htlivesight.Util.Parse("Dark",data[0]);
				document.getElementById("label_light_theme").textContent=htlivesight.Util.Parse("Light",data[0]);
				
				document.getElementById("GeneralOpen").textContent=htlivesight.Util.Parse("GeneralOpen",data[0]);
				document.getElementById("label_openin_tab").textContent=htlivesight.Util.Parse("GeneralNewTab",data[0]);
				document.getElementById("label_openin_window").textContent=htlivesight.Util.Parse("GeneralNewWindow",data[0]);
				document.getElementById("LanguageSelect").textContent=htlivesight.Util.Parse("LanguageSelect",data[0]);
				document.getElementById("LanguageNote").textContent=htlivesight.Util.Parse("LanguageNote",data[0]);
				document.getElementById("GeneralServer").textContent=htlivesight.Util.Parse("GeneralServer",data[0]);
				document.getElementById("GeneralNote").textContent=htlivesight.Util.Parse("GeneralNote",data[0]);
				document.getElementById("CrowdinHelp").textContent=htlivesight.Util.Parse("CrowdinHelp",data[0]);
				
				document.getElementById("MatchesAllMine").textContent=htlivesight.Util.Parse("MatchesAllMine",data[0]);
				document.getElementById("label_chkGetAllMineWithin").textContent=htlivesight.Util.Parse("ChkGetAllMineWithin",data[0]);".Load automatically all my teams matches if played in";
				document.getElementById("allMyMatchesHours").textContent=htlivesight.Util.Parse("MatchesHours",data[0]);
				document.getElementById("MatchesLeague").textContent=htlivesight.Util.Parse("MatchesLeague",data[0]);
				document.getElementById("label_chkGetLeague").textContent=htlivesight.Util.Parse("MatchesGetLeague",data[0]);
				document.getElementById("label_chkGetLeagueWithin").textContent=htlivesight.Util.Parse("MatchesPlayed",data[0]);
				document.getElementById("MatchesHours").textContent=htlivesight.Util.Parse("MatchesHours",data[0]);
				document.getElementById("MatchesFriends").textContent=htlivesight.Util.Parse("MatchesFriends",data[0]);
				document.getElementById("label_chkGetFriends").textContent=htlivesight.Util.Parse("MatchesGetFriends",data[0]);
				document.getElementById("label_chkGetFriendsWithin").textContent=htlivesight.Util.Parse("MatchesPlayed",data[0]);
				document.getElementById("MatchesHours2").textContent=htlivesight.Util.Parse("MatchesHours",data[0]);
				
				document.getElementById("label_chkDoNotGetFriendsHointegratedMatches").textContent=htlivesight.Util.Parse("NoTournament",data[0]);
				
				document.getElementById("MatchesHeader").textContent=htlivesight.Util.Parse("MatchesHeader",data[0]);
				document.getElementById("label_chkHdrScorers").textContent=htlivesight.Util.Parse("ScorersList",data[0]);
				document.getElementById("label_chkHdrBooked").textContent=htlivesight.Util.Parse("BookedList",data[0]);
				document.getElementById("label_chkHdrSentOff").textContent=htlivesight.Util.Parse("SentOffList",data[0]);
				document.getElementById("label_chkHdrInjured").textContent=htlivesight.Util.Parse("InjuredList",data[0]);
				document.getElementById("MatchesWindow").textContent=htlivesight.Util.Parse("MatchesWindow",data[0]);
				document.getElementById("MatchesLines").textContent=htlivesight.Util.Parse("MatchesLines",data[0]);
				//notify
				document.getElementById("NotifyNotify").textContent=htlivesight.Util.Parse("NotifyNotify",data[0]);
				document.getElementById("label_chkSound").textContent=htlivesight.Util.Parse("NotifyEnableSound",data[0]);
				document.getElementById("label_chkSoundOnlyOpened").textContent=htlivesight.Util.Parse("NotifyOnly",data[0]);
				document.getElementById("label_chkFlash").textContent=htlivesight.Util.Parse("NotifyFlash",data[0]);
				document.getElementById("label_chkSlider").textContent=htlivesight.Util.Parse("NotifyStatus",data[0]);
				//other
				document.getElementById("OtherAuthorization").textContent=htlivesight.Util.Parse("OtherAuthorization",data[0]);
				document.getElementById("OtherReset").textContent=htlivesight.Util.Parse("OtherReset",data[0]);
				document.getElementById("button_reset").textContent=htlivesight.Util.Parse("OtherResetButton",data[0]);
				document.getElementById("OtherEvents").textContent=htlivesight.Util.Parse("OtherEvents",data[0]);
				document.getElementById("label_reverseOrder").textContent=htlivesight.Util.Parse("OtherReverse",data[0]);
				document.getElementById("OtherReverseNote").textContent=htlivesight.Util.Parse("OtherReverseNote",data[0]);
				document.getElementById("OtherEventKey").textContent=htlivesight.Util.Parse("OtherEventKey",data[0]);
				document.getElementById("label_printEventKey").textContent=htlivesight.Util.Parse("OtherEventKeyNote",data[0]);
				document.getElementById("useLiveEventsAndTextsLegend").textContent=htlivesight.Util.Parse("UseLiveEventsAndTextsLegend",data[0]);
				document.getElementById("useLiveEventsAndTextsLabel").textContent=htlivesight.Util.Parse("UseLiveEventsAndTextsLabel",data[0]);
				// customization
				document.getElementById("CustomIcons").textContent=htlivesight.Util.Parse("CustomIcons",data[0]);
				document.getElementById("label_oldIcons").textContent=htlivesight.Util.Parse("CustomIconsOld",data[0]);
			//	document.getElementById("CustomSounds").textContent=htlivesight.Util.Parse("CustomSounds",data[0]);
				document.getElementById("label_weather").textContent=htlivesight.Util.Parse("CustomSoundsWeather",data[0]);
				document.getElementById("label_whistleTime").textContent=htlivesight.Util.Parse("CustomSoundsTime",data[0]);
				document.getElementById("label_weatherSE").textContent=htlivesight.Util.Parse("CustomSoundsSEW",data[0]);
				document.getElementById("label_livefoxGoal").textContent=htlivesight.Util.Parse("CustomSoundsGoal",data[0]);
				document.getElementById("label_noOpGoal").textContent=htlivesight.Util.Parse("CustomSoundsNoOpGoal",data[0]);
				//document.getElementById("PathSoundsNote1").textContent=htlivesight.Util.Parse("PathSoundsNote1",data[0]);
				//document.getElementById("PathSoundsNote2").textContent=htlivesight.Util.Parse("PathSoundsNote2",data[0]);
//				goalsounds
				document.getElementById("TabOptions").textContent=htlivesight.Util.Parse("MenuOptions",data[0]);
				document.getElementById("TabGoalSound").textContent=htlivesight.Util.Parse("Goals",data[0]);
				// my goals sound labels
				document.getElementById("label_myGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsMyGoal",data[0]);
				document.getElementById("label_myGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_myGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// op goals sound labels
				document.getElementById("label_opGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsOpGoal",data[0]);
				document.getElementById("label_opGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_opGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// friends goal sound labels
				document.getElementById("label_frGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsFrGoal",data[0]);
				document.getElementById("label_frGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_frGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// opponent friends goal sound labes
				document.getElementById("label_opfrGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsOpFrGoal",data[0]);
				document.getElementById("label_opfrGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_opfrGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// other goals sound labels
				document.getElementById("label_otGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsOtGoal",data[0]);
				document.getElementById("label_otGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_otGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// miss goals sound labels
				document.getElementById("label_missGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsMiss",data[0]);
				document.getElementById("label_missGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_missGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
//				meteo and injury sounds
				document.getElementById("TabWheatherSound").textContent=htlivesight.Util.Parse("TabWeather",data[0]);
				// sun sound
				document.getElementById("label_sunCheck").textContent=htlivesight.Util.Parse("PathSoundsSun",data[0]);
				document.getElementById("label_sunButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_sunButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// rain sound
				document.getElementById("label_rainCheck").textContent=htlivesight.Util.Parse("PathSoundsRain",data[0]);
				document.getElementById("label_rainButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_rainButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// overcast sound
				document.getElementById("label_overcastCheck").textContent=htlivesight.Util.Parse("PathSoundsOvercast",data[0]);
				document.getElementById("label_overcastButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_overcastButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// few clouds sound
				document.getElementById("label_fewCloudsCheck").textContent=htlivesight.Util.Parse("PathSoundsFewClouds",data[0]);
				document.getElementById("label_fewCloudsButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_fewCloudsButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// My injury sound
				document.getElementById("label_myBooCheck").textContent=htlivesight.Util.Parse("PathSoundsMyBoo",data[0]);
				document.getElementById("label_myBooButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_myBooButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// Opponent and other injury sound
				document.getElementById("label_opBooCheck").textContent=htlivesight.Util.Parse("PathSoundsOpBoo",data[0]);
				document.getElementById("label_opBooButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_opBooButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
//				begin/end half and booking sounds
				document.getElementById("TabWhistleSound").textContent=htlivesight.Util.Parse("TabWhistleCard",data[0]);
				// Whistle start sound
				document.getElementById("label_whistleStartCheck").textContent=htlivesight.Util.Parse("PathSoundsWhistleStart",data[0]);
				document.getElementById("label_whistleStartButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_whistleStartButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// Whistle2 sound
				document.getElementById("label_whistle2Check").textContent=htlivesight.Util.Parse("PathSoundsWhistle2",data[0]);
				document.getElementById("label_whistle2Button_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_whistle2Button_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// Whistle3 sound
				document.getElementById("label_whistle3Check").textContent=htlivesight.Util.Parse("PathSoundsWhistle3",data[0]);
				document.getElementById("label_whistle3Button_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_whistle3Button_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// Whistle sound
				document.getElementById("label_whistleCheck").textContent=htlivesight.Util.Parse("PathSoundsWhistle",data[0]);
				document.getElementById("label_whistleButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_whistleButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				// Hattrick sound
				document.getElementById("label_hattrickCheck").textContent=htlivesight.Util.Parse("PathSoundsHattrick",data[0]);
				document.getElementById("label_hattrickButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_hattrickButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				document.getElementById("TabInjuries").textContent=htlivesight.Util.Parse("TabInjuries",data[0]);
			// Pressing sound
				document.getElementById("label_pressingCheck").textContent=htlivesight.Util.Parse("PathSoundsPressing",data[0]);
				document.getElementById("label_pressingButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_pressingButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// my bruised sound
				document.getElementById("label_myBruisedCheck").textContent=htlivesight.Util.Parse("PathSoundsMyBruised",data[0]);
				document.getElementById("label_myBruisedButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_myBruisedButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// other bruised sound
				document.getElementById("label_otherBruisedCheck").textContent=htlivesight.Util.Parse("PathSoundsOtherBruised",data[0]);
				document.getElementById("label_otherBruisedButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_otherBruisedButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// my sent off sound
				document.getElementById("label_mySentOffCheck").textContent=htlivesight.Util.Parse("PathSoundsMySentOff",data[0]);
				document.getElementById("label_mySentOffButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_mySentOffButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
			// other Sent Off sound
				document.getElementById("label_otherSentOffCheck").textContent=htlivesight.Util.Parse("PathSoundsOtherSentOff",data[0]);
				document.getElementById("label_otherSentOffButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_otherSentOffButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);

				
				document.getElementById("TabChances").textContent=htlivesight.Util.Parse("TabChances",data[0]);	
			// miss friend sound labels
				document.getElementById("label_missFriendCheck").textContent=htlivesight.Util.Parse("PathSoundsMissFriend",data[0]);
				document.getElementById("label_missFriendButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_missFriendButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				
			// miss other sound labels
				document.getElementById("label_missOtherCheck").textContent=htlivesight.Util.Parse("PathSoundsMissOther",data[0]);
				document.getElementById("label_missOtherButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_missOtherButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				
				// info sound
				document.getElementById("label_infoCheck").textContent=htlivesight.Util.Parse("PathSoundsInfo",data[0]);
				document.getElementById("label_infoButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_infoButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				
				document.getElementById("TabPlayers").textContent=htlivesight.Util.Parse("TabPlayers",data[0]);
				// my favourite goal sound
				document.getElementById("label_myFavouriteGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsMyFavouriteGoal",data[0]);
				document.getElementById("label_myFavouriteGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_myFavouriteGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",data[0]);
				
				//my favourite player list
				document.getElementById("myFavouritePlayerIdsLabel").textContent=htlivesight.Util.Parse("MyFavouritePlayerList",data[0]);
				
				document.getElementById("TabColors").textContent=htlivesight.Util.Parse("Colors",data[0]);
				document.getElementById("CustomEventBackground").textContent=htlivesight.Util.Parse("EventBackground",data[0]);
				document.getElementById("ChooseColor").textContent=htlivesight.Util.Parse("ColorPicker",data[0]);
				document.getElementById("label_friendHomeColorCode").textContent=htlivesight.Util.Parse("FriendHome",data[0]);
				document.getElementById("label_friendAwayColorCode").textContent=htlivesight.Util.Parse("FriendAway",data[0]);
				document.getElementById("label_foeHomeColorCode").textContent=htlivesight.Util.Parse("FoeHome",data[0]);
				document.getElementById("label_foeAwayColorCode").textContent=htlivesight.Util.Parse("FoeAway",data[0]);
				document.getElementById("label_neutralColorCode").textContent=htlivesight.Util.Parse("Neutral",data[0]);
				document.getElementById("CustomEventText").textContent=htlivesight.Util.Parse("EventColorTitle",data[0]);
				
				document.getElementById("label_friendHomeTextColorCode").textContent=htlivesight.Util.Parse("FriendHome",data[0]);
				document.getElementById("label_friendAwayTextColorCode").textContent=htlivesight.Util.Parse("FriendAway",data[0]);
				document.getElementById("label_foeHomeTextColorCode").textContent=htlivesight.Util.Parse("FoeHome",data[0]);
				document.getElementById("label_foeAwayTextColorCode").textContent=htlivesight.Util.Parse("FoeAway",data[0]);
				document.getElementById("label_neutralTextColorCode").textContent=htlivesight.Util.Parse("Neutral",data[0]);
				//document.getElementById("label_textColorCode").textContent=htlivesight.Util.Parse("EventTextColor",data[0]);
				document.getElementById("label_seTextColorCode").textContent=htlivesight.Util.Parse("SETextColor",data[0]);
				document.getElementById("HeaderBarColor").textContent=htlivesight.Util.Parse("HeaderBarColor",data[0]);
				document.getElementById("label_headerBarColorCode").textContent=htlivesight.Util.Parse("HeaderBarColor",data[0]);
				document.getElementById("label_headerBarTextColorCode").textContent=htlivesight.Util.Parse("HeaderBarTextColor",data[0]);
				//background
			// background
				document.getElementById("label_customBackground_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",data[0]);
				document.getElementById("label_chkExtendBackground").textContent=htlivesight.Util.Parse("ExtendImage",data[0]);
				document.getElementById("label_chkRepeatBackground").textContent=htlivesight.Util.Parse("RepeatImage",data[0]);
				document.getElementById("CustomBackground").textContent=htlivesight.Util.Parse("Background",data[0]);
				document.getElementById("visitOurSoundCollection").textContent=htlivesight.Util.Parse("VisitOurSoundCollection",data[0]);
				document.getElementById("label_volumeSound").textContent=htlivesight.Util.Parse("PlayVolumeSetting",data[0]);
				
				document.getElementById("import").textContent=htlivesight.Util.Parse("Import",data[0]);
				document.getElementById("import_button").textContent=htlivesight.Util.Parse("Import",data[0]);
				document.getElementById("export").textContent=htlivesight.Util.Parse("Export",data[0]);
				document.getElementById("export_button").textContent=htlivesight.Util.Parse("Export",data[0]);
				document.getElementById("label_chkExportOauth").textContent=htlivesight.Util.Parse("ExportOauth",data[0]);
				document.getElementById("label_chkExportBackground").textContent=htlivesight.Util.Parse("ExportBackground",data[0]);
				document.getElementById("label_chkExportSounds").textContent=htlivesight.Util.Parse("ExportSounds",data[0]);
				
				try{ //because it's present in settings.html but not in htlivesight.html
					document.getElementById("OkButton").textContent=htlivesight.Util.Parse("ButtonOk",data[0]);
					document.getElementById("CancelButton").textContent=htlivesight.Util.Parse("ButtonCancel",data[0]);
				}catch(e){}
			
			});
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
				var value = document.getElementById("hattrickServer").value;
				htlivesight.Settings.preferences.general.hattrickServer = value;
			},
			/*chkgetallmine: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetAllMine").checked) {
					document.getElementById("chkGetAllMineWithin").disabled = false;
					htlivesight.Settings.click.chkgetallminewithin();
					prefs.matches.allMine.get = true;
				} else {
					document.getElementById("chkGetAllMineWithin").disabled = true;
					document.getElementById("txtGetAllMineWithinHours").disabled = true;
					prefs.matches.allMine.get = false;
				}
			},*/
			chkgetallminewithin: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetAllMineWithin").checked) {
					document.getElementById("txtGetAllMineWithinHours").disabled = false;
					prefs.matches.allMine.within = true;
				} else {
					document.getElementById("txtGetAllMineWithinHours").disabled = true;
					prefs.matches.allMine.within = false;
				};
			},
			txtfixallminehours: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("txtGetAllMineWithinHours").value.replace(/\D/g, "");
				if(value===""){
					value = prefs.matches.allMine.withinHours;
				}
				value = Math.max(0,Math.min(84,parseInt(value,10)));
				document.getElementById("txtGetAllMineWithinHours").value = value;
				prefs.matches.allMine.withinHours = value;
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
			chkgetleaguescorers: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetLeagueScorers").checked) {
					prefs.matches.league.getScorers = true;
				} else {
					prefs.matches.league.getScorers = false;
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
				if(value===""){
					value = prefs.matches.league.withinHours;
				}
				value = Math.max(0,Math.min(84,parseInt(value,10)));
				document.getElementById("txtGetLeagueWithinHours").value = value;
				prefs.matches.league.withinHours = value;
			},
			
			chkgetyouthleague: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetYouthLeague").checked) {
					document.getElementById("chkGetYouthLeagueWithin").disabled = false;
					htlivesight.Settings.click.chkgetyouthleaguewithin();
					prefs.matches.youthLeague.get = true;
				} else {
					document.getElementById("chkGetYouthLeagueWithin").disabled = true;
					document.getElementById("txtGetYouthLeagueWithinHours").disabled = true;
					prefs.matches.youthLeague.get = false;
				}
			},
			chkgetyouthleaguewithin: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetYouthLeagueWithin").checked) {
					document.getElementById("txtGetYouthLeagueWithinHours").disabled = false;
					prefs.matches.youthLeague.within = true;
				} else {
					document.getElementById("txtGetLeagueWithinHours").disabled = true;
					prefs.matches.youthLeague.within = false;
				};
			},
			txtfixyouthleaguehours: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("txtGetYouthLeagueWithinHours").value.replace(/\D/g, "");
				if(value===""){
					value = prefs.matches.youthLeague.withinHours;
				}
				value = Math.max(0,Math.min(84,parseInt(value,10)));
				document.getElementById("txtGetYouthLeagueWithinHours").value = value;
				prefs.matches.youthLeague.withinHours = value;
			},
			
			chkgettournament: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetTournament").checked) {
					document.getElementById("chkGetTournamentWithin").disabled = false;
					htlivesight.Settings.click.chkgettournamentwithin();
					prefs.matches.tournament.get = true;
				} else {
					document.getElementById("chkGetTournamentWithin").disabled = true;
					document.getElementById("txtGetTournamentWithinHours").disabled = true;
					prefs.matches.tournament.get = false;
				}
			},
			chkgettournamentwithin: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetTournamentWithin").checked) {
					document.getElementById("txtGetTournamentWithinHours").disabled = false;
					prefs.matches.tournament.within = true;
				} else {
					document.getElementById("txtGetTournamentWithinHours").disabled = true;
					prefs.matches.tournament.within = false;
				};
			},
			txtfixtournamenthours: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("txtGetTournamentWithinHours").value.replace(/\D/g, "");
				if(value===""){
					value = prefs.matches.tournament.withinHours;
				}
				value = Math.max(0,Math.min(84,parseInt(value,10)));
				document.getElementById("txtGetTournamentWithinHours").value = value;
				prefs.matches.tournament.withinHours = value;
			},
			
			chkgetfriends: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkGetFriends").checked) {
					document.getElementById("chkGetFriendsWithin").disabled = false;
					htlivesight.Settings.click.chkgetfriendswithin();
					//document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled = false;
					prefs.matches.friends.get = true;
				} else {
					document.getElementById("chkGetFriendsWithin").disabled = true;
					document.getElementById("txtGetFriendsWithinHours").disabled = true;
				//	document.getElementById("chkDoNotGetFriendsHointegratedMatches").disabled = true;
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
				if(value===""){
					value = prefs.matches.friends.withinHours;
				}
				value = Math.max(0,Math.min(84,parseInt(value,10)));
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
			chkMyYouthMatch: function() {
				var prefs = htlivesight.Settings.preferences;
				prefs.matches.myYouthMatch = document.getElementById("chkGetYouthNearestMatch").checked;
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
				//var languageXML = htlivesight.loadXml(url);
				htlivesight.loadXml(url, function(xml, status){
					if(status != 200){return}
					var data=xml.getElementsByTagName("Htlivesight");
					htlivesight.data=data;
					var reset_token=htlivesight.Util.Parse("ResetToken",data[0]);
					alert(reset_token);
					});
				//var data=languageXML.getElementsByTagName("Htlivesight");
				//var reset_token=htlivesight.Util.Parse("ResetToken",data[0]);
				//alert(reset_token);
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
				}
			},
			weather: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("weather").checked) {
					prefs.personalization.weather = true;
				} else {
					prefs.personalization.weather = false;
				}
			},
			whistleTime: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("whistleTime").checked) {
					prefs.personalization.whistleTime = true;
				} else {
					prefs.personalization.whistleTime = false;
				}
			},
			weatherSE: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("weatherSE").checked) {
					prefs.personalization.weatherSE = true;
				} else {
					prefs.personalization.weatherSE = false;
				}
			},
			livefoxGoal: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("livefoxGoal").checked) {
					prefs.personalization.livefoxGoal = true;
				} else {
					prefs.personalization.livefoxGoal = false;
				}
			},
			noOpGoal: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("noOpGoal").checked) {
					prefs.personalization.noOpGoal = true;
				} else {
					prefs.personalization.noOpGoal = false;
				}
			},
			
			secondSoundEqualFirst: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkSecondSoundEqualFirst").checked) {
					prefs.personalization.secondSoundEqualFirst = true;
				} else {
					prefs.personalization.secondSoundEqualFirst = false;
				}
			},
			
			youthSoundEqualSenior: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("chkYouthSoundEqualSenior").checked) {
					prefs.personalization.youthSoundEqualSenior = true;
				} else {
					prefs.personalization.youthSoundEqualSenior = false;
				}
			},
			
			settingVolumeSound: function() {
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("volumeSound").checked) {
					prefs.personalization.settingVolumeSound = true;
				} else {
					prefs.personalization.settingVolumeSound = false;
				}
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
				}
			},
			soundReset: function(id, defaultFile) {
				var prefix="@";
				if(document.getElementById(id+"Check").checked) prefix="";
				var prefs = htlivesight.Settings.preferences;
				if(htlivesight.platform == "Safari"){
					defaultFile = defaultFile.replace("ogg","mp3");
					defaultFile = defaultFile.replace("wav","mp3");
					defaultFile = defaultFile.replace("sound/","");
					document.getElementById(id+"SoundPath").value=prefix+'https://sourceforge.net/projects/htlivesight/files/Sounds/default/mp3/'+defaultFile;
				}else{
					document.getElementById(id+"SoundPath").value=prefix+htlivesightEnv.contentPath+defaultFile;
				}
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
				}
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
					document.getElementById("label_friendHomeColorCode").style.backgroundColor= "";
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
					document.getElementById("label_friendAwayColorCode").style.backgroundColor= "";
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
					document.getElementById("label_foeHomeColorCode").style.backgroundColor= "";
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
					document.getElementById("label_foeAwayColorCode").style.backgroundColor= "";
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
					document.getElementById("label_neutralColorCode").style.backgroundColor= "";
				}
			},
			neutralColorSet: function() {
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("neutralColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.neutralColorCode = value;
				document.getElementById("label_neutralColorCode").style.backgroundColor= "#" + prefs.colors.neutralColorCode;
			},
			textColorCheck: function() {
				//var prefs = htlivesight.Settings.preferences;
				//if(document.getElementById("textColorCheck").checked) {
				//	document.getElementById("textColorCode").disabled = false;
				//	prefs.colors.textColorCheck=true;
				//	document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				//	document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				//	document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
				//	document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
				//	document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.textColorCode;
				//} else {
				//	document.getElementById("textColorCode").disabled = true;
				//	prefs.colors.textColorCheck=false;
				//}
			},
			textColorSet: function() {
			//	var prefs = htlivesight.Settings.preferences;
			//	var value = document.getElementById("textColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
			//	prefs.colors.textColorCode = value;
			//	document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
			//	document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
			//	document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.textColorCode;
			//	document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.textColorCode;
			//	document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.textColorCode;
			},
			friendHomeTextColorCheck: function(){
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("friendHomeTextColorCheck").checked) {
					document.getElementById("friendHomeTextColorCode").disabled = false;
					prefs.colors.friendHomeTextColorCheck=true;
					document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.friendHomeTextColorCode;
				} else {
					document.getElementById("friendHomeTextColorCode").disabled = true;
					prefs.colors.friendHomeTextColorCheck=false;
					document.getElementById("label_friendHomeColorCode").style.color= "";
				}
			},
			friendHomeTextColorSet: function() {
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("friendHomeTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.friendHomeTextColorCode = value;
				document.getElementById("label_friendHomeColorCode").style.color= "#" + prefs.colors.friendHomeTextColorCode;
			},
			friendAwayTextColorCheck: function(){
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("friendAwayTextColorCheck").checked) {
					document.getElementById("friendAwayTextColorCode").disabled = false;
					prefs.colors.friendAwayTextColorCheck=true;
					document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.friendAwayTextColorCode;
				} else {
					document.getElementById("friendAwayTextColorCode").disabled = true;
					prefs.colors.friendAwayTextColorCheck=false;
					document.getElementById("label_friendAwayColorCode").style.color= "";
				}
			},
			friendAwayTextColorSet: function() {
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("friendAwayTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.friendAwayTextColorCode = value;
				document.getElementById("label_friendAwayColorCode").style.color= "#" + prefs.colors.friendAwayTextColorCode;
			},
			
			foeHomeTextColorCheck: function(){
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("foeHomeTextColorCheck").checked) {
					document.getElementById("foeHomeTextColorCode").disabled = false;
					prefs.colors.foeHomeTextColorCheck=true;
					document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.foeHomeTextColorCode;
				} else {
					document.getElementById("foeHomeTextColorCode").disabled = true;
					prefs.colors.foeHomeTextColorCheck=false;
					document.getElementById("label_foeHomeColorCode").style.color= "";
				}
			},
			foeHomeTextColorSet: function() {
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("foeHomeTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.foeHomeTextColorCode = value;
				document.getElementById("label_foeHomeColorCode").style.color= "#" + prefs.colors.foeHomeTextColorCode;
			},
			foeAwayTextColorCheck: function(){
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("foeAwayTextColorCheck").checked) {
					document.getElementById("foeAwayTextColorCode").disabled = false;
					prefs.colors.foeAwayTextColorCheck=true;
					document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.foeAwayTextColorCode;
				} else {
					document.getElementById("foeAwayTextColorCode").disabled = true;
					prefs.colors.foeAwayTextColorCheck=false;
					document.getElementById("label_foeAwayColorCode").style.color= "";
				}
			},
			foeAwayTextColorSet: function() {
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("foeAwayTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.foeAwayTextColorCode = value;
				document.getElementById("label_foeAwayColorCode").style.color= "#" + prefs.colors.foeAwayTextColorCode;
			},
			neutralTextColorCheck: function(){
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				if(document.getElementById("neutralTextColorCheck").checked) {
					document.getElementById("neutralTextColorCode").disabled = false;
					prefs.colors.neutralTextColorCheck=true;
					document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.neutralTextColorCode;
				} else {
					document.getElementById("neutralTextColorCode").disabled = true;
					prefs.colors.neutralTextColorCheck=false;
					document.getElementById("label_neutralColorCode").style.color= "";
				}
			},
			neutralTextColorSet: function() {
				//alert("ciao!");
				var prefs = htlivesight.Settings.preferences;
				var value = document.getElementById("neutralTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
				prefs.colors.neutralTextColorCode = value;
				document.getElementById("label_neutralColorCode").style.color= "#" + prefs.colors.neutralTextColorCode;
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
					document.getElementById("label_friendHomeColorCode").style.color= "";
					document.getElementById("label_friendAwayColorCode").style.color= "";
					document.getElementById("label_foeHomeColorCode").style.color= "";
					document.getElementById("label_foeAwayColorCode").style.color= "";
					document.getElementById("label_neutralColorCode").style.color= "";
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
				prefs.general.customBackgroundPath = imagePath;
			},
			resetBackground: function() {
			var prefs = htlivesight.Settings.preferences;
			var imagePath;
			if(htlivesight.platform == "Safari"){
				imagePath = document.getElementById("customBackgroundPath").value="./themes/images/bg.png";
			}else{
				imagePath = document.getElementById("customBackgroundPath").value=htlivesightEnv.contentPath+"themes/images/bg.png";
			}
			document.body.style.backgroundImage = "url('"+imagePath+"')";
			prefs.general.customBackgroundPath = imagePath;
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
							prefs.general.customBackgroundPath = dataUrl;
						}
					};
					reader.readAsDataURL(file[0]);
				}
				if	(htlivesight.arch == "Gecko"){
					var imagePath=document.getElementById("customBackgroundPathBrowse").value;
					var userAgent=navigator.userAgent;
					var windows=/Windows/g;
					var isWindows=windows.test(userAgent);
					if(isWindows) imagePath=imagePath.replace(/\\/g,"/");
					if ((imagePath.search("chrome:")==-1) && (imagePath.search("file:")==-1)) imagePath="file:///"+imagePath;
					document.getElementById("customBackgroundPath").value=imagePath;
					document.body.style.backgroundImage = "url('"+imagePath+"')";
					prefs.general.customBackgroundPath = imagePath;
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
				prefs.general.extendBackground = document.getElementById("chkExtendBackground").checked;
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
					prefs.general.repeatBackground = document.getElementById("chkRepeatBackground").checked;
				},
				
				headerBarColorCheck: function(){
					//alert("ciao!");
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("headerBarColorCheck").checked) {
						document.getElementById("headerBarColorCode").disabled = false;
						prefs.colors.headerBarColorCheck=true;
						//document.getElementById("label_headerBarColorCode").style.color= "#" + prefs.colors.headerBarColorCode;
						$('.ui-accordion-header').css('background-image','none');
						var value = document.getElementById("headerBarColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
						$('.ui-accordion-header, #label_headerBarColorCode, #label_headerBarTextColorCode').css('background-color','#'+value);
					} else {
						document.getElementById("headerBarColorCode").disabled = true;
						prefs.colors.headerBarColorCheck=false;
						$('.ui-accordion-header').css('background-image','');
						//$('.ui-accordion-header').removeAttr('style');
						$('.ui-accordion-header, #label_headerBarColorCode, #label_headerBarTextColorCode').css('background-color','');
						/*if(document.getElementById("livefox_theme").checked){
							$('.ui-accordion-header').removeAttr('style');
						}else{
							$('.ui-accordion-header').removeAttr('style');	
						}*/
						
					}
				},
				headerBarColorSet: function() {
					//alert("ciao!");
					var prefs = htlivesight.Settings.preferences;
					var value = document.getElementById("headerBarColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
					prefs.colors.headerBarColorCode = value;
					$('.ui-accordion-header').css('background-color','#'+value);
				},
				
				headerBarTextColorCheck: function(){
					//alert("ciao!");
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("headerBarTextColorCheck").checked) {
						document.getElementById("headerBarTextColorCode").disabled = false;
						prefs.colors.headerBarTextColorCheck=true;
						//document.getElementById("label_headerBarColorCode").style.color= "#" + prefs.colors.headerBarColorCode;
						//$('.ui-accordion-header').css('background-image','none');
						var value = document.getElementById("headerBarTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
						$('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a, #label_headerBarColorCode, #label_headerBarTextColorCode').css('color','#'+value);
					} else {
						document.getElementById("headerBarTextColorCode").disabled = true;
						prefs.colors.headerBarTextColorCheck=false;
						//$('.ui-accordion-header').css('background-image','images/ui-bg_highlight-hard_33_459e00_1x100.png');
						//$('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a').removeAttr('style');
						$('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a, #label_headerBarColorCode, #label_headerBarTextColorCode').css('color','');
						/*if(document.getElementById("livefox_theme").checked){
							$('.ui-accordion-header').removeAttr('style');
						}else{
							$('.ui-accordion-header').removeAttr('style');	
						}*/
						
					}
				},
				headerBarTextColorSet: function() {
					//alert("ciao!");
					var prefs = htlivesight.Settings.preferences;
					var value = document.getElementById("headerBarTextColorCode").value.replace(/(\W|[g-zG-Z]|_)/g, "");
					prefs.colors.headerBarTextColorCode = value;
					$('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a').css('color','#'+value);
				},
				exportPreferences: function(){
					var prefs = htlivesight.Settings.preferences;
					document.getElementById("export_text").value = "";
					if(document.getElementById("chkExportOauth").checked){
						prefs.oauth={};
						prefs.oauth[prefs.general.teamId]={};
						//prefs.oauth[prefs.general.teamId].accessToken=htlivesight.ApiProxy.getAccessToken(prefs.general.teamId);
						//prefs.oauth[prefs.general.teamId].accessTokenSecret=htlivesight.ApiProxy.getAccessTokenSecret(prefs.general.teamId);
						prefs.oauth[prefs.general.teamId].t1=htlivesight.encrypt(htlivesight.ApiProxy.getAccessToken(prefs.general.teamId));
						prefs.oauth[prefs.general.teamId].t2=htlivesight.encrypt(htlivesight.ApiProxy.getAccessTokenSecret(prefs.general.teamId));
					}
					var jsonPrefs = JSON.stringify(prefs);
					if(!document.getElementById("chkExportOauth").checked){
						//jsonPrefs = jsonPrefs.replace(/,"oauth":{"\d+":{"accessToken":"\w+","accessTokenSecret":"\w+"}}/,"");
						jsonPrefs = jsonPrefs.replace(/,"oauth":{"\d+":{"t1":"\w+","t2":"\w+"}}/,"");
					}
					if(!document.getElementById("chkExportBackground").checked){
					//	delete prefs.general.customBackgroundPath;
						jsonPrefs = jsonPrefs.replace(/"customBackgroundPath":"[^"]+",/,"");
						jsonPrefs = jsonPrefs.replace(/"extendBackground":\w+,"repeatBackground":\w+,/,"");
					}
					if(!document.getElementById("chkExportSounds").checked){
						//delete prefs.personalization.myGoalSoundPath;
						jsonPrefs = jsonPrefs.replace(/"myGoalSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.opGoalSoundPath;
						jsonPrefs = jsonPrefs.replace(/"opGoalSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.frGoalSoundPath;
						jsonPrefs = jsonPrefs.replace(/"frGoalSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.opfrGoalSoundPath;
						jsonPrefs = jsonPrefs.replace(/"opfrGoalSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.otGoalSoundPath;
						jsonPrefs = jsonPrefs.replace(/"otGoalSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.missGoalSoundPath;
						jsonPrefs = jsonPrefs.replace(/"missGoalSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.sunSoundPath;
						jsonPrefs = jsonPrefs.replace(/"sunSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.rainSoundPath;
						jsonPrefs = jsonPrefs.replace(/"rainSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.overcastSoundPath;
						jsonPrefs = jsonPrefs.replace(/"overcastSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.fewCloudsSoundPath;
						jsonPrefs = jsonPrefs.replace(/"fewCloudsSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.myBooSoundPath;
						jsonPrefs = jsonPrefs.replace(/"myBooSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.opBooSoundPath;
						jsonPrefs = jsonPrefs.replace(/"opBooSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.whistleStartSoundPath;
						jsonPrefs = jsonPrefs.replace(/"whistleStartSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.whistle2SoundPath;
						jsonPrefs = jsonPrefs.replace(/"whistle2SoundPath":"[^"]+",/,"");
//						delete prefs.personalization.whistle3SoundPath;
						jsonPrefs = jsonPrefs.replace(/"whistle3SoundPath":"[^"]+",/,"");
//						delete prefs.personalization.whistleSoundPath;
						jsonPrefs = jsonPrefs.replace(/"whistleSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.hattrickSoundPath;
						jsonPrefs = jsonPrefs.replace(/"hattrickSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.pressingSoundPath;
						jsonPrefs = jsonPrefs.replace(/"pressingSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.myBruisedSoundPath;
						jsonPrefs = jsonPrefs.replace(/"myBruisedSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.otherBruisedSoundPath;
						jsonPrefs = jsonPrefs.replace(/"otherBruisedSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.mySentOffSoundPath;
						jsonPrefs = jsonPrefs.replace(/"mySentOffSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.otherSentOffSoundPath;
						jsonPrefs = jsonPrefs.replace(/"otherSentOffSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.missFriendSoundPath;
						jsonPrefs = jsonPrefs.replace(/"missFriendSoundPath":"[^"]+",/,"");
//						delete prefs.personalization.missOtherSoundPath;
						jsonPrefs = jsonPrefs.replace(/"missOtherSoundPath":"[^"]+",/,"");
						jsonPrefs = jsonPrefs.replace(/"infoSoundPath":"[^"]+",/,"");
						jsonPrefs = jsonPrefs.replace(/"myFavouriteGoalSoundPath":"[^"]+",/,"");
					}
					document.getElementById("export_text").value = jsonPrefs;
					document.getElementById("export_text").select();
					prefs = htlivesight.Settings.preferences;
				},
				importPreferences: function(){
					var old_prefs = htlivesight.Settings.preferences;
					try{
						var importText = document.getElementById("import_text").value
						
						// replace all the reference to other browser or HTLS channel (dev or stable) to this browser and channel:
						importText = importText.replace(/([a-z]*-extension|chrome):\/\/[^\/]*\/content\//g, htlivesightEnv.contentPath);
						htlivesight.Settings.preferences = JSON.parse(importText);
					
						if (!htlivesight.Settings.preferences.general.customBackgroundPath){
							htlivesight.Settings.preferences.general.customBackgroundPath = old_prefs.general.customBackgroundPath;
							htlivesight.Settings.preferences.general.extendBackground = old_prefs.general.extendBackground;
							htlivesight.Settings.preferences.general.repeatBackground = old_prefs.general.repeatBackground;
						}

						if (!htlivesight.Settings.preferences.personalization.myGoalSoundPath){
//							delete prefs.personalization.myGoalSoundPath;
							htlivesight.Settings.preferences.personalization.myGoalSoundPath = old_prefs.personalization.myGoalSoundPath;					 
//							delete prefs.personalization.opGoalSoundPath;
							htlivesight.Settings.preferences.personalization.opGoalSoundPath = old_prefs.personalization.opGoalSoundPath;					 
//							delete prefs.personalization.frGoalSoundPath;
							htlivesight.Settings.preferences.personalization.frGoalSoundPath = old_prefs.personalization.frGoalSoundPath;
//							delete prefs.personalization.opfrGoalSoundPath;
							htlivesight.Settings.preferences.personalization.opfrGoalSoundPath = old_prefs.personalization.opfrGoalSoundPath;
//							delete prefs.personalization.otGoalSoundPath;
							htlivesight.Settings.preferences.personalization.otGoalSoundPath = old_prefs.personalization.otGoalSoundPath;
//							delete prefs.personalization.missGoalSoundPath;
							htlivesight.Settings.preferences.personalization.missGoalSoundPath = old_prefs.personalization.missGoalSoundPath;
//							delete prefs.personalization.sunSoundPath;
							htlivesight.Settings.preferences.personalization.sunSoundPath = old_prefs.personalization.sunSoundPath;
//							delete prefs.personalization.rainSoundPath;
							htlivesight.Settings.preferences.personalization.rainSoundPath = old_prefs.personalization.rainSoundPath;
//							delete prefs.personalization.overcastSoundPath;
							htlivesight.Settings.preferences.personalization.overcastSoundPath = old_prefs.personalization.overcastSoundPath;
//							delete prefs.personalization.fewCloudsSoundPath;
							htlivesight.Settings.preferences.personalization.fewCloudsSoundPath = old_prefs.personalization.fewCloudsSoundPath;
//							delete prefs.personalization.myBooSoundPath;
							htlivesight.Settings.preferences.personalization.myBooSoundPath = old_prefs.personalization.myBooSoundPath;
//							delete prefs.personalization.opBooSoundPath;
							htlivesight.Settings.preferences.personalization.opBooSoundPath = old_prefs.personalization.opBooSoundPath;
//							delete prefs.personalization.whistleStartSoundPath;
							htlivesight.Settings.preferences.personalization.whistleStartSoundPath = old_prefs.personalization.whistleStartSoundPath;
//							delete prefs.personalization.whistle2SoundPath;
							htlivesight.Settings.preferences.personalization.whistle2SoundPath = old_prefs.personalization.whistle2SoundPath;
//							delete prefs.personalization.whistle3SoundPath;
							htlivesight.Settings.preferences.personalization.whistle3SoundPath = old_prefs.personalization.whistle3SoundPath;
//							delete prefs.personalization.whistleSoundPath;
							htlivesight.Settings.preferences.personalization.whistleSoundPath = old_prefs.personalization.whistleSoundPath;
//							delete prefs.personalization.hattrickSoundPath;
							htlivesight.Settings.preferences.personalization.hattrickSoundPath = old_prefs.personalization.hattrickSoundPath;
//							delete prefs.personalization.pressingSoundPath;
							htlivesight.Settings.preferences.personalization.pressingSoundPath = old_prefs.personalization.pressingSoundPath;
//							delete prefs.personalization.myBruisedSoundPath;
							htlivesight.Settings.preferences.personalization.myBruisedSoundPath = old_prefs.personalization.myBruisedSoundPath;
//							delete prefs.personalization.otherBruisedSoundPath;
							htlivesight.Settings.preferences.personalization.otherBruisedSoundPath = old_prefs.personalization.otherBruisedSoundPath;
//							delete prefs.personalization.mySentOffSoundPath;
							htlivesight.Settings.preferences.personalization.mySentOffSoundPath = old_prefs.personalization.mySentOffSoundPath;
//							delete prefs.personalization.otherSentOffSoundPath;
							htlivesight.Settings.preferences.personalization.otherSentOffSoundPath = old_prefs.personalization.otherSentOffSoundPath;
//							delete prefs.personalization.missFriendSoundPath;
							htlivesight.Settings.preferences.personalization.missFriendSoundPath = old_prefs.personalization.missFriendSoundPath;
//							delete prefs.personalization.missOtherSoundPath;
							htlivesight.Settings.preferences.personalization.missOtherSoundPath = old_prefs.personalization.missOtherSoundPath;
							htlivesight.Settings.preferences.personalization.infoSoundPath = old_prefs.personalization.infoSoundPath;
							htlivesight.Settings.preferences.personalization.myFavouriteGoalSoundPath = old_prefs.personalization.myFavouriteGoalSoundPath;
							htlivesight.Settings.preferences.personalization.myFavouritePlayersId = old_prefs.personalization.myFavouritePlayersId;
						}
						//avoid TypeError loading default value for added preferences:
						if(!htlivesight.Settings.preferences.matches.allMine){
							htlivesight.Settings.preferences.matches.allMine = new htlivesight.Preferences.matches.allMine();
						}
						
					
						htlivesight.Settings.save();
						if(htlivesight.Settings.preferences.oauth){
							for (var key in htlivesight.Settings.preferences.oauth) {
								if (htlivesight.Settings.preferences.oauth.hasOwnProperty(key)) {
									//htlivesight.ApiProxy.setAccessToken(htlivesight.Settings.preferences.oauth[key].accessToken,key);
									//htlivesight.ApiProxy.setAccessTokenSecret(htlivesight.Settings.preferences.oauth[key].accessTokenSecret,key);
									htlivesight.ApiProxy.setAccessToken(htlivesight.decrypt(htlivesight.Settings.preferences.oauth[key].t1),key);
									htlivesight.ApiProxy.setAccessTokenSecret(htlivesight.decrypt(htlivesight.Settings.preferences.oauth[key].t2),key);
//									alert(key);
//									alert(htlivesight.Settings.preferences.oauth[key]['accessToken']);
//									alert(htlivesight.Settings.preferences.oauth[key]['accessTokenSecret']);
								}
							}
						}
						htlivesight.Settings.load();
//						htlivesight.Settings.click.tryBackground();
						document.body.style.backgroundImage = "url('"+htlivesight.Settings.preferences.general.customBackgroundPath+"')";
						htlivesight.Settings.click.extendBackground();
						htlivesight.Settings.click.repeatBackground();
						if(htlivesight.Settings.preferences.colors.headerBarColorCheck){
							$('.ui-accordion-header').css('background-color','#'+htlivesight.Settings.preferences.colors.headerBarColorCode);
						}
						if(htlivesight.Settings.preferences.colors.headerBarTextColorCheck){
							$('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a').css('color','#'+htlivesight.Settings.preferences.colors.headerBarTextColorCode);
						}
						var  prefs=htlivesight.Preferences.get();
						var url = htlivesightEnv.contentPath+"locale/"+ prefs.language.locale +".xml";
						//var languageXML = htlivesight.loadXml(url);
						htlivesight.loadXml(url, function(xml, status){
							if(status != 200){return}
							var data=xml.getElementsByTagName("Htlivesight");
							htlivesight.data=data;
							var msg = htlivesight.Util.Parse("ImportOk",data[0]) +"\n"+ htlivesight.Util.Parse("ClickToSave",data[0])+ "\n" +htlivesight.Util.Parse("PrefsRestart",data[0]); 
							alert(msg);
						});
						//var data=languageXML.getElementsByTagName("Htlivesight");
						//var msg = htlivesight.Util.Parse("ImportOk",data[0]) +"\n"+ htlivesight.Util.Parse("ClickToSave",data[0])+ "\n" +htlivesight.Util.Parse("PrefsRestart",data[0]); 
						//alert(msg);
					}catch(e){alert(e);}
				},
				exportOauth: function(){
					//alert("export Oauth!");
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("chkExportOauth").checked) {
						prefs.other.exportOauth= true;
					}else{
						prefs.other.exportOauth= false;
					}
				},
				exportBackground: function(){
					//alert("export Background!");
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("chkExportBackground").checked) {
						prefs.other.exportBackground= true;
					}else{
						prefs.other.exportBackground= false;
					}
				},
				exportSounds: function(){
					//alert("export Sounds!");
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("chkExportSounds").checked) {
						prefs.other.exportSounds= true;
					}else{
						prefs.other.exportSounds= false;
					}
				},
				
				myFavouritePlayersIdSet: function() {
					var prefs = htlivesight.Settings.preferences;
					var value = document.getElementById("myFavouritePlayersId").value;
					prefs.personalization.myFavouritePlayersId = value;
				},
				
				useLiveEventsAndTexts : function(){
					var prefs = htlivesight.Settings.preferences;
					if(document.getElementById("useLiveEventsAndTextsInput").checked) {
						prefs.other.useLiveEventsAndTexts = true;
					}else{
						prefs.other.useLiveEventsAndTexts = false;
					}
				}

		}
};