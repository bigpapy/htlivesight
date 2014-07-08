if (!htlivesight) var htlivesight = {};
htlivesight.Lang = {
		startup: function() {},
		getL10nData: function (){
			var prefs=htlivesight.Preferences.get();
			var url = htlivesight.resourcePath+"locale/"+ prefs.language.locale +".xml";
			var languageXML = htlivesight.loadXml(url);
			var l10ndata=languageXML.getElementsByTagName("Htlivesight");
			return l10ndata;
		},
		localization: function() {
			htlivesight.prefs=htlivesight.Preferences.get();
			htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
			htlivesight.languageXML=htlivesight.loadXml(htlivesight.url);
			htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
			if (!htlivesightPrefs.getBool("HtlsFirstStart")){
				var optionsPage=window.open(htlivesightEnv.contentPath+"settings.html","_parent");
			};
//			LOGIN
			var doc=document;
			doc.getElementById("ui-dialog-title-login-dialog").innerHTML=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);	
			doc.getElementById("LoginLabel2").innerHTML=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);
			doc.getElementById("LoginTeamId").innerHTML=htlivesight.Util.Parse("LoginTeamId",htlivesight.data[0]);
			doc.getElementById("LoginSave").innerHTML=htlivesight.Util.Parse("LoginRememberMe",htlivesight.data[0]);
			doc.getElementById("button_login").attributes.getNamedItem("value").value=htlivesight.Util.Parse("LoginButton",htlivesight.data[0]);
			doc.getElementById("LoginReLive").innerHTML=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
			doc.getElementById("LoginReLive2").innerHTML=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
			doc.getElementById("LoginSpeed").innerHTML=htlivesight.Util.Parse("LoginSpeed",htlivesight.data[0]);
			doc.getElementById("LoginByEvent").innerHTML=htlivesight.Util.Parse("LoginByEvent",htlivesight.data[0]);
			doc.getElementById("SecondTeamIdLabel").innerHTML=htlivesight.Util.Parse("SecondTeamIdLabel",htlivesight.data[0]);
			doc.getElementById("warning").innerHTML=htlivesight.Util.Parse("Warning",htlivesight.data[0]);
			doc.getElementById("safari-warning-text").innerHTML=htlivesight.Util.Parse("SafariWarning",htlivesight.data[0]);
			doc.getElementById("warning2").innerHTML=htlivesight.Util.Parse("Warning",htlivesight.data[0]);
			doc.getElementById("android-warning-text").innerHTML=htlivesight.Util.Parse("AndroidWarning",htlivesight.data[0]);
			//todo: add android warning text localization.
//			ABOUT
			doc.getElementById("ui-dialog-title-about-dialog").innerHTML=htlivesight.Util.Parse("WindowAboutTitle",htlivesight.data[0]);	
			doc.getElementById("TabInfo").innerHTML=htlivesight.Util.Parse("TabInfo",htlivesight.data[0]);
			doc.getElementById("creationDate").innerHTML="06 "+htlivesight.Util.Parse("MonthJuly",htlivesight.data[0])+" 2014";
			doc.getElementById("createdBy").innerHTML=htlivesight.Util.Parse("TextCreatedBy",htlivesight.data[0]);
			doc.getElementById("testers").innerHTML=htlivesight.Util.Parse("Testers",htlivesight.data[0]);
			doc.getElementById("BasedOn").innerHTML=htlivesight.Util.Parse("BasedOn",htlivesight.data[0]);
			doc.getElementById("License").innerHTML=htlivesight.Util.Parse("License",htlivesight.data[0]);
			doc.getElementById("Tech").innerHTML=htlivesight.Util.Parse("Tech",htlivesight.data[0]);
			doc.getElementById("Supporter").innerHTML=htlivesight.Util.Parse("Supporter",htlivesight.data[0]);
			doc.getElementById("TabTranslators").innerHTML=htlivesight.Util.Parse("TabTranslators",htlivesight.data[0]);
			doc.getElementById("ThanksTo").innerHTML=htlivesight.Util.Parse("TextThanksTo",htlivesight.data[0]);
			doc.getElementById("TabCredits").innerHTML=htlivesight.Util.Parse("TabCredits",htlivesight.data[0]);
//			SETTINGS
			doc.getElementById("ui-dialog-title-options-dialog").innerHTML=htlivesight.Util.Parse("WindowTitle",htlivesight.data[0]);
			
			document.getElementById("ThemesSelector").innerHTML=htlivesight.Util.Parse("Themes",htlivesight.data[0]);
			document.getElementById("label_dark_theme").innerHTML=htlivesight.Util.Parse("Dark",htlivesight.data[0]);
			document.getElementById("label_light_theme").innerHTML=htlivesight.Util.Parse("Light",htlivesight.data[0]);
			
			doc.getElementById("TabGeneral").innerHTML=htlivesight.Util.Parse("TabGeneral",htlivesight.data[0]);
			doc.getElementById("GeneralOpen").innerHTML=htlivesight.Util.Parse("GeneralOpen",htlivesight.data[0]);
			doc.getElementById("label_openin_tab").innerHTML=htlivesight.Util.Parse("GeneralNewTab",htlivesight.data[0]);
			doc.getElementById("label_openin_window").innerHTML=htlivesight.Util.Parse("GeneralNewWindow",htlivesight.data[0]);
			doc.getElementById("LanguageSelect").innerHTML=htlivesight.Util.Parse("LanguageSelect",htlivesight.data[0]);
			doc.getElementById("LanguageNote").innerHTML=htlivesight.Util.Parse("LanguageNote",htlivesight.data[0]);
			doc.getElementById("GeneralServer").innerHTML=htlivesight.Util.Parse("GeneralServer",htlivesight.data[0]);
			doc.getElementById("GeneralNote").innerHTML=htlivesight.Util.Parse("GeneralNote",htlivesight.data[0]);
			doc.getElementById("CrowdinHelp").innerHTML=htlivesight.Util.Parse("CrowdinHelp",htlivesight.data[0]);
//			alert("Settings tab 2");
			doc.getElementById("TabMatches").innerHTML=htlivesight.Util.Parse("TabMatches",htlivesight.data[0]);
			doc.getElementById("MatchesLeague").innerHTML=htlivesight.Util.Parse("MatchesLeague",htlivesight.data[0]);
			doc.getElementById("label_chkGetLeague").innerHTML=htlivesight.Util.Parse("MatchesGetLeague",htlivesight.data[0]);
			doc.getElementById("label_chkGetLeagueWithin").innerHTML=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
			doc.getElementById("MatchesHours").innerHTML=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
			doc.getElementById("MatchesFriends").innerHTML=htlivesight.Util.Parse("MatchesFriends",htlivesight.data[0]);
			doc.getElementById("label_chkGetFriends").innerHTML=htlivesight.Util.Parse("MatchesGetFriends",htlivesight.data[0]);
			doc.getElementById("label_chkGetFriendsWithin").innerHTML=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
			doc.getElementById("MatchesHours2").innerHTML=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
			doc.getElementById("MatchesHeader").innerHTML=htlivesight.Util.Parse("MatchesHeader",htlivesight.data[0]);
			
			doc.getElementById("label_chkDoNotGetFriendsHointegratedMatches").innerHTML=htlivesight.Util.Parse("NoTournament",htlivesight.data[0]);
			
			doc.getElementById("label_chkHdrScorers").innerHTML=htlivesight.Util.Parse("ScorersList",htlivesight.data[0]);
			doc.getElementById("label_chkHdrBooked").innerHTML=htlivesight.Util.Parse("BookedList",htlivesight.data[0]);
			doc.getElementById("label_chkHdrSentOff").innerHTML=htlivesight.Util.Parse("SentOffList",htlivesight.data[0]);
			doc.getElementById("label_chkHdrInjured").innerHTML=htlivesight.Util.Parse("InjuredList",htlivesight.data[0]);
			doc.getElementById("MatchesWindow").innerHTML=htlivesight.Util.Parse("MatchesWindow",htlivesight.data[0]);
			doc.getElementById("MatchesLines").innerHTML=htlivesight.Util.Parse("MatchesLines",htlivesight.data[0]);
//			alert("Settings tab 3");
			doc.getElementById("TabNotifications").innerHTML=htlivesight.Util.Parse("TabNotifications",htlivesight.data[0]);
			doc.getElementById("NotifyNotify").innerHTML=htlivesight.Util.Parse("NotifyNotify",htlivesight.data[0]);
			doc.getElementById("label_chkSound").innerHTML=htlivesight.Util.Parse("NotifyEnableSound",htlivesight.data[0]);
			doc.getElementById("label_chkSoundOnlyOpened").innerHTML=htlivesight.Util.Parse("NotifyOnly",htlivesight.data[0]);
			doc.getElementById("label_chkFlash").innerHTML=htlivesight.Util.Parse("NotifyFlash",htlivesight.data[0]);
			doc.getElementById("label_chkSlider").innerHTML=htlivesight.Util.Parse("NotifyStatus",htlivesight.data[0]);
//			alert("Settings tab 4");
			doc.getElementById("TabOther").innerHTML=htlivesight.Util.Parse("TabOther",htlivesight.data[0]);
			doc.getElementById("OtherAuthorization").innerHTML=htlivesight.Util.Parse("OtherAuthorization",htlivesight.data[0]);
			doc.getElementById("OtherReset").innerHTML=htlivesight.Util.Parse("OtherReset",htlivesight.data[0]);
			doc.getElementById("button_reset").innerHTML=htlivesight.Util.Parse("OtherResetButton",htlivesight.data[0]);
			doc.getElementById("OtherEvents").innerHTML=htlivesight.Util.Parse("OtherEvents",htlivesight.data[0]);
			doc.getElementById("label_reverseOrder").innerHTML=htlivesight.Util.Parse("OtherReverse",htlivesight.data[0]);
			doc.getElementById("OtherReverseNote").innerHTML=htlivesight.Util.Parse("OtherReverseNote",htlivesight.data[0]);
			doc.getElementById("OtherEventKey").innerHTML=htlivesight.Util.Parse("OtherEventKey",htlivesight.data[0]);
			doc.getElementById("label_printEventKey").innerHTML=htlivesight.Util.Parse("OtherEventKeyNote",htlivesight.data[0]);
//			alert("Settings tab 5");
			doc.getElementById("TabCustom").innerHTML=htlivesight.Util.Parse("TabCustom",htlivesight.data[0]);
			doc.getElementById("CustomIcons").innerHTML=htlivesight.Util.Parse("CustomIcons",htlivesight.data[0]);
			doc.getElementById("label_oldIcons").innerHTML=htlivesight.Util.Parse("CustomIconsOld",htlivesight.data[0]);
		//	doc.getElementById("CustomSounds").innerHTML=htlivesight.Util.Parse("CustomSounds",htlivesight.data[0]);
			doc.getElementById("label_weather").innerHTML=htlivesight.Util.Parse("CustomSoundsWeather",htlivesight.data[0]);
			doc.getElementById("label_whistleTime").innerHTML=htlivesight.Util.Parse("CustomSoundsTime",htlivesight.data[0]);
			doc.getElementById("label_weatherSE").innerHTML=htlivesight.Util.Parse("CustomSoundsSEW",htlivesight.data[0]);
			doc.getElementById("label_livefoxGoal").innerHTML=htlivesight.Util.Parse("CustomSoundsGoal",htlivesight.data[0]);
			doc.getElementById("label_noOpGoal").innerHTML=htlivesight.Util.Parse("CustomSoundsNoOpGoal",htlivesight.data[0]);
			//doc.getElementById("PathSoundsNote1").innerHTML=htlivesight.Util.Parse("PathSoundsNote1",htlivesight.data[0]);
			//doc.getElementById("PathSoundsNote2").innerHTML=htlivesight.Util.Parse("PathSoundsNote2",htlivesight.data[0]);
			//doc.getElementById("TabGoalSound").innerHTML=htlivesight.Util.Parse("TabGoalSound",htlivesight.data[0]);
			doc.getElementById("label_chkSecondSoundEqualFirst").innerHTML=htlivesight.Util.Parse("SecondSoundEqualFirst",htlivesight.data[0]);
			doc.getElementById("label_myGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMyGoal",htlivesight.data[0]);
			doc.getElementById("label_myGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_myGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_opGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpGoal",htlivesight.data[0]);
			doc.getElementById("label_opGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_opGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_frGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsFrGoal",htlivesight.data[0]);
			doc.getElementById("label_frGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_frGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_opfrGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpFrGoal",htlivesight.data[0]);
			doc.getElementById("label_opfrGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_opfrGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_otGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOtGoal",htlivesight.data[0]);
			doc.getElementById("label_otGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_otGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_missGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMiss",htlivesight.data[0]);
			doc.getElementById("label_missGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_missGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			//doc.getElementById("TabWheatherSound").innerHTML=htlivesight.Util.Parse("TabWheatherSound",htlivesight.data[0]);
			doc.getElementById("label_sunCheck").innerHTML=htlivesight.Util.Parse("PathSoundsSun",htlivesight.data[0]);
			doc.getElementById("label_sunButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_sunButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_rainCheck").innerHTML=htlivesight.Util.Parse("PathSoundsRain",htlivesight.data[0]);
			doc.getElementById("label_rainButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_rainButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_overcastCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOvercast",htlivesight.data[0]);
			doc.getElementById("label_overcastButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_overcastButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_fewCloudsCheck").innerHTML=htlivesight.Util.Parse("PathSoundsFewClouds",htlivesight.data[0]);
			doc.getElementById("label_fewCloudsButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_fewCloudsButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_myBooCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMyBoo",htlivesight.data[0]);
			doc.getElementById("label_myBooButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_myBooButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_opBooCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpBoo",htlivesight.data[0]);
			doc.getElementById("label_opBooButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_opBooButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			//doc.getElementById("TabWhistleSound").innerHTML=htlivesight.Util.Parse("TabWhistleSound",htlivesight.data[0]);
			doc.getElementById("label_whistleStartCheck").innerHTML=htlivesight.Util.Parse("PathSoundsWhistleStart",htlivesight.data[0]);
			doc.getElementById("label_whistleStartButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_whistleStartButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_whistle2Check").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle2",htlivesight.data[0]);
			doc.getElementById("label_whistle2Button_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_whistle2Button_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_whistle3Check").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle3",htlivesight.data[0]);
			doc.getElementById("label_whistle3Button_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_whistle3Button_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_whistleCheck").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle",htlivesight.data[0]);
			doc.getElementById("label_whistleButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_whistleButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_hattrickCheck").innerHTML=htlivesight.Util.Parse("PathSoundsHattrick",htlivesight.data[0]);
			doc.getElementById("label_hattrickButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_hattrickButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
			doc.getElementById("label_volumeSound").innerHTML=htlivesight.Util.Parse("PlayVolumeSetting",htlivesight.data[0]);
			doc.getElementById("import").innerHTML=htlivesight.Util.Parse("Import",htlivesight.data[0]);
			doc.getElementById("import_button").innerHTML=htlivesight.Util.Parse("Import",htlivesight.data[0]);
			doc.getElementById("export").innerHTML=htlivesight.Util.Parse("Export",htlivesight.data[0]);
			doc.getElementById("export_button").innerHTML=htlivesight.Util.Parse("Export",htlivesight.data[0]);
			doc.getElementById("label_chkExportOauth").innerHTML=htlivesight.Util.Parse("ExportOauth",htlivesight.data[0]);
			doc.getElementById("label_chkExportBackground").innerHTML=htlivesight.Util.Parse("ExportBackground",htlivesight.data[0]);
			doc.getElementById("label_chkExportSounds").innerHTML=htlivesight.Util.Parse("ExportSounds",htlivesight.data[0]);
			
			if(htlivesight.platform == "Safari"){
			  $("[type='file']").hide();
			  $("[type='file']").parent().prepend("<div class='warning'>"+htlivesight.Util.Parse("OnlyHTTPFiles",htlivesight.data[0])+"</div><br/>");
			}
			if(htlivesight.platform == 'Android'){
				$("[type='file']").hide();
			}
//			TOPBAR
			doc.getElementById("ReLiveControls").innerHTML=htlivesight.Util.Parse("ReLiveControls",htlivesight.data[0]);
			doc.getElementById("volume_slider").title=htlivesight.Util.Parse("Volume",htlivesight.data[0]);
//			SIDEBAR
			doc.getElementById("LeagueMatches").innerHTML=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);
			doc.getElementById("LeagueLiveTable").innerHTML=htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0]);
			doc.getElementById("LeaguePosition").innerHTML=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
			doc.getElementById("LeagueTeam").innerHTML=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
			doc.getElementById("LeaguePlayed").innerHTML=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
			doc.getElementById("LeagueGoals").innerHTML=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
			doc.getElementById("LeagueGoalDiff").innerHTML=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
			doc.getElementById("LeaguePoints").innerHTML=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);
			
			doc.getElementById("LeagueMatchesBis").innerHTML=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);
			doc.getElementById("LeaguePositionBis").innerHTML=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
			doc.getElementById("LeagueTeamBis").innerHTML=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
			doc.getElementById("LeaguePlayedBis").innerHTML=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
			doc.getElementById("LeagueGoalsBis").innerHTML=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
			doc.getElementById("LeagueGoalDiffBis").innerHTML=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
			doc.getElementById("LeaguePointsBis").innerHTML=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);
			
			doc.getElementById("MatchesList").innerHTML=htlivesight.Util.Parse("MatchesList",htlivesight.data[0]);
			doc.getElementById("FriendsTitle").innerHTML=htlivesight.Util.Parse("FriendsTitle",htlivesight.data[0]);
			doc.getElementById("FriendsRemove").innerHTML=htlivesight.Util.Parse("FriendsRemove",htlivesight.data[0]);
			doc.getElementById("FriendsOpen").innerHTML=htlivesight.Util.Parse("FriendsOpen",htlivesight.data[0]);
			doc.getElementById("MatchesAdd").innerHTML=htlivesight.Util.Parse("MatchesAdd",htlivesight.data[0]);
//			options of the select list translations.
			doc.getElementById("optionHattrick").innerHTML=htlivesight.Util.Parse("Senior",htlivesight.data[0]);
			doc.getElementById("optionYouth").innerHTML=htlivesight.Util.Parse("Youth",htlivesight.data[0]);
			doc.getElementById("optionHtointegrated").innerHTML=htlivesight.Util.Parse("Tournament",htlivesight.data[0]);
			doc.getElementById("MatchesByMatch").innerHTML=htlivesight.Util.Parse("MatchesByMatch",htlivesight.data[0]);
			doc.getElementById("MatchesByTeam").innerHTML=htlivesight.Util.Parse("MatchesByTeam",htlivesight.data[0]);
			doc.getElementById("MenuServer").innerHTML=htlivesight.Util.Parse("MenuServer",htlivesight.data[0]);
			doc.getElementById("ServerStatus").innerHTML=htlivesight.Util.Parse("MenuDisconnected",htlivesight.data[0]);
			doc.getElementById("TabColors").innerHTML=htlivesight.Util.Parse("Colors",htlivesight.data[0]);
			doc.getElementById("CustomEventBackground").innerHTML=htlivesight.Util.Parse("EventBackground",htlivesight.data[0]);
			doc.getElementById("ChooseColor").innerHTML=htlivesight.Util.Parse("ColorPicker",htlivesight.data[0]);
			doc.getElementById("label_friendHomeColorCode").innerHTML=htlivesight.Util.Parse("FriendHome",htlivesight.data[0]);
			doc.getElementById("label_friendAwayColorCode").innerHTML=htlivesight.Util.Parse("FriendAway",htlivesight.data[0]);
			doc.getElementById("label_foeHomeColorCode").innerHTML=htlivesight.Util.Parse("FoeHome",htlivesight.data[0]);
			doc.getElementById("label_foeAwayColorCode").innerHTML=htlivesight.Util.Parse("FoeAway",htlivesight.data[0]);
			doc.getElementById("label_neutralColorCode").innerHTML=htlivesight.Util.Parse("Neutral",htlivesight.data[0]);
			doc.getElementById("CustomEventText").innerHTML=htlivesight.Util.Parse("EventColorTitle",htlivesight.data[0]);
			
			doc.getElementById("label_friendHomeTextColorCode").innerHTML=htlivesight.Util.Parse("FriendHome",htlivesight.data[0]);
			doc.getElementById("label_friendAwayTextColorCode").innerHTML=htlivesight.Util.Parse("FriendAway",htlivesight.data[0]);
			doc.getElementById("label_foeHomeTextColorCode").innerHTML=htlivesight.Util.Parse("FoeHome",htlivesight.data[0]);
			doc.getElementById("label_foeAwayTextColorCode").innerHTML=htlivesight.Util.Parse("FoeAway",htlivesight.data[0]);
			doc.getElementById("label_neutralTextColorCode").innerHTML=htlivesight.Util.Parse("Neutral",htlivesight.data[0]);
			
			doc.getElementById("label_headerBarColorCode").innerHTML=htlivesight.Util.Parse("HeaderBarColor",htlivesight.data[0]);
			doc.getElementById("HeaderBarColor").innerHTML=htlivesight.Util.Parse("HeaderBarColor",htlivesight.data[0]);
			doc.getElementById("label_headerBarTextColorCode").innerHTML=htlivesight.Util.Parse("HeaderBarTextColor",htlivesight.data[0]);
			//doc.getElementById("HeaderBarTextColor").innerHTML=htlivesight.Util.Parse("HeaderBarTextColor",htlivesight.data[0]);
						
			//doc.getElementById("label_textColorCode").innerHTML=htlivesight.Util.Parse("EventTextColor",htlivesight.data[0]);
			doc.getElementById("label_seTextColorCode").innerHTML=htlivesight.Util.Parse("SETextColor",htlivesight.data[0]);
			//doc.getElementById("LoggedIn").innerHTML=htlivesight.Util.Parse("LoggedIn",htlivesight.data[0]);
			//doc.getElementById("LoggedIn").innerHTML="Following: ";
			doc.getElementById("latestNews").innerHTML=htlivesight.Util.Parse("latestNews",htlivesight.data[0]);
			doc.getElementById("HTLSThread").title=htlivesight.Util.Parse("HTLSThread",htlivesight.data[0]);
			doc.getElementById("ProjectWebsite").title=htlivesight.Util.Parse("ProjectWebsite",htlivesight.data[0]);
			doc.getElementById("GooglePlusPage").title=htlivesight.Util.Parse("GooglePlusPage",htlivesight.data[0]);
			doc.getElementById("TwitterPage").title=htlivesight.Util.Parse("TwitterPage",htlivesight.data[0]);
			doc.getElementById("FacebookPage").title=htlivesight.Util.Parse("FacebookPage",htlivesight.data[0]);
			doc.getElementById("chat_link").title=htlivesight.Util.Parse("chatLink",htlivesight.data[0]);
			doc.getElementById("hidesidebar").title=htlivesight.Util.Parse("hidesidebar",htlivesight.data[0]);
			doc.getElementById("options_link").title=htlivesight.Util.Parse("MenuOptions",htlivesight.data[0]);
			doc.getElementById("about_link").title=htlivesight.Util.Parse("MenuAbout",htlivesight.data[0]);
			doc.getElementById("copiedToClipboard").innerHTML=htlivesight.Util.Parse("CopiedToClipboard",htlivesight.data[0]);
			// background
			doc.getElementById("label_customBackground_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
			doc.getElementById("label_chkExtendBackground").innerHTML=htlivesight.Util.Parse("ExtendImage",htlivesight.data[0]);
			doc.getElementById("label_chkRepeatBackground").innerHTML=htlivesight.Util.Parse("RepeatImage",htlivesight.data[0]);
			doc.getElementById("CustomBackground").innerHTML=htlivesight.Util.Parse("Background",htlivesight.data[0]);
			doc.getElementById("muteAll").title=htlivesight.Util.Parse("MuteAll",htlivesight.data[0]);
		}
};
