if (!htlivesight) var htlivesight = {};
htlivesight.Lang = {
		startup: function() {},
		/*getL10nData: function (){
			var prefs=htlivesight.Preferences.get();
			var url = htlivesight.resourcePath+"locale/"+ prefs.language.locale +".xml";
			var languageXML = htlivesight.loadXml(url);
			var l10ndata=languageXML.getElementsByTagName("Htlivesight");
			return l10ndata;
		},*/
		localization: function() {
			htlivesight.prefs=htlivesight.Preferences.get();
			htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
			//htlivesight.languageXML=htlivesight.loadXml(htlivesight.url);
			//htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
			htlivesight.loadXml(htlivesight.url, function(xml, status){
				if(status != 200){return}
				var data=xml.getElementsByTagName("Htlivesight");
				htlivesight.data=data;
				
				if (!htlivesightPrefs.getBool("HtlsFirstStart")){
					var optionsPage=window.open(htlivesightEnv.contentPath+"settings.html","_parent");
				};
		//			LOGIN
				var doc=document;
				doc.getElementById("ui-id-10").textContent=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);	
				doc.getElementById("LoginLabel2").textContent=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);
				doc.getElementById("LoginTeamId").textContent=htlivesight.Util.Parse("LoginTeamId",htlivesight.data[0]);
				doc.getElementById("LoginSave").textContent=htlivesight.Util.Parse("LoginRememberMe",htlivesight.data[0]);
				doc.getElementById("button_login").attributes.getNamedItem("value").value=htlivesight.Util.Parse("LoginButton",htlivesight.data[0]);
				doc.getElementById("LoginReLive").textContent=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
				doc.getElementById("LoginReLive2").textContent=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
				doc.getElementById("LoginSpeed").textContent=htlivesight.Util.Parse("LoginSpeed",htlivesight.data[0]);
				doc.getElementById("LoginByEvent").textContent=htlivesight.Util.Parse("LoginByEvent",htlivesight.data[0]);
				doc.getElementById("SecondTeamIdLabel").textContent=htlivesight.Util.Parse("SecondTeamIdLabel",htlivesight.data[0]);
				doc.getElementById("warning").textContent=htlivesight.Util.Parse("Warning",htlivesight.data[0]);
				doc.getElementById("safari-warning-text").textContent=htlivesight.Util.Parse("SafariWarning",htlivesight.data[0]);
				doc.getElementById("warning2").textContent=htlivesight.Util.Parse("Warning",htlivesight.data[0]);
				doc.getElementById("android-warning-text").textContent=htlivesight.Util.Parse("AndroidWarning",htlivesight.data[0]);
				//todo: add android warning text localization.
		//			ABOUT
				doc.getElementById("ui-id-11").textContent=htlivesight.Util.Parse("WindowAboutTitle",htlivesight.data[0]);	
				doc.getElementById("TabInfo").textContent=htlivesight.Util.Parse("TabInfo",htlivesight.data[0]);
				doc.getElementById("creationDate").textContent="11 "+htlivesight.Util.Parse("MonthDecember",htlivesight.data[0])+" 2016";
				doc.getElementById("createdBy").textContent=htlivesight.Util.Parse("TextCreatedBy",htlivesight.data[0]);
				doc.getElementById("testers").textContent=htlivesight.Util.Parse("Testers",htlivesight.data[0]);
				doc.getElementById("BasedOn").textContent=htlivesight.Util.Parse("BasedOn",htlivesight.data[0]);
				doc.getElementById("License").textContent=htlivesight.Util.Parse("License",htlivesight.data[0]);
				doc.getElementById("Tech").textContent=htlivesight.Util.Parse("Tech",htlivesight.data[0]);
				doc.getElementById("Supporter").textContent=htlivesight.Util.Parse("Supporter",htlivesight.data[0]);
				doc.getElementById("TabTranslators").textContent=htlivesight.Util.Parse("TabTranslators",htlivesight.data[0]);
				doc.getElementById("ThanksTo").textContent=htlivesight.Util.Parse("TextThanksTo",htlivesight.data[0]);
				doc.getElementById("TabCredits").textContent=htlivesight.Util.Parse("TabCredits",htlivesight.data[0]);
		//			SETTINGS
				doc.getElementById("ui-id-19").textContent=htlivesight.Util.Parse("WindowTitle",htlivesight.data[0]);
				
				document.getElementById("ThemesSelector").textContent=htlivesight.Util.Parse("Themes",htlivesight.data[0]);
				document.getElementById("label_dark_theme").textContent=htlivesight.Util.Parse("Dark",htlivesight.data[0]);
				document.getElementById("label_light_theme").textContent=htlivesight.Util.Parse("Light",htlivesight.data[0]);
				
				doc.getElementById("TabGeneral").textContent=htlivesight.Util.Parse("TabGeneral",htlivesight.data[0]);
				doc.getElementById("GeneralOpen").textContent=htlivesight.Util.Parse("GeneralOpen",htlivesight.data[0]);
				doc.getElementById("label_openin_tab").textContent=htlivesight.Util.Parse("GeneralNewTab",htlivesight.data[0]);
				doc.getElementById("label_openin_window").textContent=htlivesight.Util.Parse("GeneralNewWindow",htlivesight.data[0]);
				doc.getElementById("LanguageSelect").textContent=htlivesight.Util.Parse("LanguageSelect",htlivesight.data[0]);
				doc.getElementById("LanguageNote").textContent=htlivesight.Util.Parse("LanguageNote",htlivesight.data[0]);
				doc.getElementById("GeneralServer").textContent=htlivesight.Util.Parse("GeneralServer",htlivesight.data[0]);
				doc.getElementById("GeneralNote").textContent=htlivesight.Util.Parse("GeneralNote",htlivesight.data[0]);
				doc.getElementById("CrowdinHelp").textContent=htlivesight.Util.Parse("CrowdinHelp",htlivesight.data[0]);
		//			alert("Settings tab 2");
				doc.getElementById("TabMatches").textContent=htlivesight.Util.Parse("TabMatches",htlivesight.data[0]);
				doc.getElementById("MatchesLeague").textContent=htlivesight.Util.Parse("MatchesLeague",htlivesight.data[0]);
				doc.getElementById("label_chkGetLeague").textContent=htlivesight.Util.Parse("MatchesGetLeague",htlivesight.data[0]);
				doc.getElementById("label_chkGetLeagueWithin").textContent=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
				doc.getElementById("MatchesHours").textContent=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
				doc.getElementById("MatchesFriends").textContent=htlivesight.Util.Parse("MatchesFriends",htlivesight.data[0]);
				doc.getElementById("label_chkGetFriends").textContent=htlivesight.Util.Parse("MatchesGetFriends",htlivesight.data[0]);
				doc.getElementById("label_chkGetFriendsWithin").textContent=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
				doc.getElementById("MatchesHours2").textContent=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
				doc.getElementById("MatchesHeader").textContent=htlivesight.Util.Parse("MatchesHeader",htlivesight.data[0]);
				
				doc.getElementById("label_chkDoNotGetFriendsHointegratedMatches").textContent=htlivesight.Util.Parse("NoTournament",htlivesight.data[0]);
				
				doc.getElementById("label_chkHdrScorers").textContent=htlivesight.Util.Parse("ScorersList",htlivesight.data[0]);
				doc.getElementById("label_chkHdrBooked").textContent=htlivesight.Util.Parse("BookedList",htlivesight.data[0]);
				doc.getElementById("label_chkHdrSentOff").textContent=htlivesight.Util.Parse("SentOffList",htlivesight.data[0]);
				doc.getElementById("label_chkHdrInjured").textContent=htlivesight.Util.Parse("InjuredList",htlivesight.data[0]);
				doc.getElementById("MatchesWindow").textContent=htlivesight.Util.Parse("MatchesWindow",htlivesight.data[0]);
				doc.getElementById("MatchesLines").textContent=htlivesight.Util.Parse("MatchesLines",htlivesight.data[0]);
				
				doc.getElementById("label_chkGetYouthLeague").textContent=htlivesight.Util.Parse("MatchesGetLeague",htlivesight.data[0]);
				doc.getElementById("label_chkGetYouthLeagueWithin").textContent=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
				doc.getElementById("YouthMatchesHours").textContent=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
				doc.getElementById("MatchesYouth").textContent=htlivesight.Util.Parse("YouthMatches",htlivesight.data[0]);
				doc.getElementById("label_chkGetYouthNearestMatch").textContent=htlivesight.Util.Parse("GetYouthNearestMatch",htlivesight.data[0]);
				doc.getElementById("MatchesYouthLeague").textContent=htlivesight.Util.Parse("MatchesYouthLeague",htlivesight.data[0]);
		//			alert("Settings tab 3");
				doc.getElementById("TabNotifications").textContent=htlivesight.Util.Parse("TabNotifications",htlivesight.data[0]);
				doc.getElementById("NotifyNotify").textContent=htlivesight.Util.Parse("NotifyNotify",htlivesight.data[0]);
				doc.getElementById("label_chkSound").textContent=htlivesight.Util.Parse("NotifyEnableSound",htlivesight.data[0]);
				doc.getElementById("label_chkSoundOnlyOpened").textContent=htlivesight.Util.Parse("NotifyOnly",htlivesight.data[0]);
				doc.getElementById("label_chkFlash").textContent=htlivesight.Util.Parse("NotifyFlash",htlivesight.data[0]);
				doc.getElementById("label_chkSlider").textContent=htlivesight.Util.Parse("NotifyStatus",htlivesight.data[0]);
		//			alert("Settings tab 4");
				doc.getElementById("TabOther").textContent=htlivesight.Util.Parse("TabOther",htlivesight.data[0]);
				doc.getElementById("OtherAuthorization").textContent=htlivesight.Util.Parse("OtherAuthorization",htlivesight.data[0]);
				doc.getElementById("OtherReset").textContent=htlivesight.Util.Parse("OtherReset",htlivesight.data[0]);
				doc.getElementById("button_reset").textContent=htlivesight.Util.Parse("OtherResetButton",htlivesight.data[0]);
				doc.getElementById("OtherEvents").textContent=htlivesight.Util.Parse("OtherEvents",htlivesight.data[0]);
				doc.getElementById("label_reverseOrder").textContent=htlivesight.Util.Parse("OtherReverse",htlivesight.data[0]);
				doc.getElementById("OtherReverseNote").textContent=htlivesight.Util.Parse("OtherReverseNote",htlivesight.data[0]);
				doc.getElementById("OtherEventKey").textContent=htlivesight.Util.Parse("OtherEventKey",htlivesight.data[0]);
				doc.getElementById("label_printEventKey").textContent=htlivesight.Util.Parse("OtherEventKeyNote",htlivesight.data[0]);
		//			alert("Settings tab 5");
				doc.getElementById("TabCustom").textContent=htlivesight.Util.Parse("TabCustom",htlivesight.data[0]);
				doc.getElementById("CustomIcons").textContent=htlivesight.Util.Parse("CustomIcons",htlivesight.data[0]);
				doc.getElementById("label_oldIcons").textContent=htlivesight.Util.Parse("CustomIconsOld",htlivesight.data[0]);
			//	doc.getElementById("CustomSounds").textContent=htlivesight.Util.Parse("CustomSounds",htlivesight.data[0]);
				doc.getElementById("label_weather").textContent=htlivesight.Util.Parse("CustomSoundsWeather",htlivesight.data[0]);
				doc.getElementById("label_whistleTime").textContent=htlivesight.Util.Parse("CustomSoundsTime",htlivesight.data[0]);
				doc.getElementById("label_weatherSE").textContent=htlivesight.Util.Parse("CustomSoundsSEW",htlivesight.data[0]);
				doc.getElementById("label_livefoxGoal").textContent=htlivesight.Util.Parse("CustomSoundsGoal",htlivesight.data[0]);
				doc.getElementById("label_noOpGoal").textContent=htlivesight.Util.Parse("CustomSoundsNoOpGoal",htlivesight.data[0]);
				//doc.getElementById("PathSoundsNote1").textContent=htlivesight.Util.Parse("PathSoundsNote1",htlivesight.data[0]);
				//doc.getElementById("PathSoundsNote2").textContent=htlivesight.Util.Parse("PathSoundsNote2",htlivesight.data[0]);
				//doc.getElementById("TabGoalSound").textContent=htlivesight.Util.Parse("TabGoalSound",htlivesight.data[0]);
				doc.getElementById("label_chkSecondSoundEqualFirst").textContent=htlivesight.Util.Parse("SecondSoundEqualFirst",htlivesight.data[0]);
				doc.getElementById("label_myGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsMyGoal",htlivesight.data[0]);
				doc.getElementById("label_myGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_myGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_opGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsOpGoal",htlivesight.data[0]);
				doc.getElementById("label_opGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_opGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_frGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsFrGoal",htlivesight.data[0]);
				doc.getElementById("label_frGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_frGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_opfrGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsOpFrGoal",htlivesight.data[0]);
				doc.getElementById("label_opfrGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_opfrGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_otGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsOtGoal",htlivesight.data[0]);
				doc.getElementById("label_otGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_otGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_missGoalCheck").textContent=htlivesight.Util.Parse("PathSoundsMiss",htlivesight.data[0]);
				doc.getElementById("label_missGoalButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_missGoalButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				//doc.getElementById("TabWheatherSound").textContent=htlivesight.Util.Parse("TabWheatherSound",htlivesight.data[0]);
				doc.getElementById("label_sunCheck").textContent=htlivesight.Util.Parse("PathSoundsSun",htlivesight.data[0]);
				doc.getElementById("label_sunButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_sunButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_rainCheck").textContent=htlivesight.Util.Parse("PathSoundsRain",htlivesight.data[0]);
				doc.getElementById("label_rainButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_rainButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_overcastCheck").textContent=htlivesight.Util.Parse("PathSoundsOvercast",htlivesight.data[0]);
				doc.getElementById("label_overcastButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_overcastButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_fewCloudsCheck").textContent=htlivesight.Util.Parse("PathSoundsFewClouds",htlivesight.data[0]);
				doc.getElementById("label_fewCloudsButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_fewCloudsButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_myBooCheck").textContent=htlivesight.Util.Parse("PathSoundsMyBoo",htlivesight.data[0]);
				doc.getElementById("label_myBooButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_myBooButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_opBooCheck").textContent=htlivesight.Util.Parse("PathSoundsOpBoo",htlivesight.data[0]);
				doc.getElementById("label_opBooButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_opBooButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				//doc.getElementById("TabWhistleSound").textContent=htlivesight.Util.Parse("TabWhistleSound",htlivesight.data[0]);
				doc.getElementById("label_whistleStartCheck").textContent=htlivesight.Util.Parse("PathSoundsWhistleStart",htlivesight.data[0]);
				doc.getElementById("label_whistleStartButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_whistleStartButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_whistle2Check").textContent=htlivesight.Util.Parse("PathSoundsWhistle2",htlivesight.data[0]);
				doc.getElementById("label_whistle2Button_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_whistle2Button_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_whistle3Check").textContent=htlivesight.Util.Parse("PathSoundsWhistle3",htlivesight.data[0]);
				doc.getElementById("label_whistle3Button_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_whistle3Button_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_whistleCheck").textContent=htlivesight.Util.Parse("PathSoundsWhistle",htlivesight.data[0]);
				doc.getElementById("label_whistleButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_whistleButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_hattrickCheck").textContent=htlivesight.Util.Parse("PathSoundsHattrick",htlivesight.data[0]);
				doc.getElementById("label_hattrickButton_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_hattrickButton_play").textContent=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
				doc.getElementById("label_volumeSound").textContent=htlivesight.Util.Parse("PlayVolumeSetting",htlivesight.data[0]);
				doc.getElementById("import").textContent=htlivesight.Util.Parse("Import",htlivesight.data[0]);
				doc.getElementById("import_button").textContent=htlivesight.Util.Parse("Import",htlivesight.data[0]);
				doc.getElementById("export").textContent=htlivesight.Util.Parse("Export",htlivesight.data[0]);
				doc.getElementById("export_button").textContent=htlivesight.Util.Parse("Export",htlivesight.data[0]);
				doc.getElementById("label_chkExportOauth").textContent=htlivesight.Util.Parse("ExportOauth",htlivesight.data[0]);
				doc.getElementById("label_chkExportBackground").textContent=htlivesight.Util.Parse("ExportBackground",htlivesight.data[0]);
				doc.getElementById("label_chkExportSounds").textContent=htlivesight.Util.Parse("ExportSounds",htlivesight.data[0]);
				doc.getElementById("label_chkYouthSoundEqualSenior").textContent=htlivesight.Util.Parse("YouthSoundEqualSenior",htlivesight.data[0]);
				
				if(htlivesight.platform == "Safari"){
				  $("[type='file']").hide();
				  $("[type='file']").parent().prepend("<div class='warning'>"+htlivesight.Util.Parse("OnlyHTTPFiles",htlivesight.data[0])+"</div><br/>");
				}
				if(htlivesight.platform == 'Android'){
					$("[type='file']").hide();
				}
		//			TOPBAR
				doc.getElementById("ReLiveControls").textContent=htlivesight.Util.Parse("ReLiveControls",htlivesight.data[0]);
				doc.getElementById("volume_slider").title=htlivesight.Util.Parse("Volume",htlivesight.data[0]);
		//			SIDEBAR
				doc.getElementById("LeagueMatches").textContent=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);				
				doc.getElementById("LeagueLiveTable").textContent=htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0]);
				doc.getElementById("LeaguePosition").textContent=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
				doc.getElementById("LeagueTeam").textContent=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
				doc.getElementById("LeaguePlayed").textContent=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
				doc.getElementById("LeagueGoals").textContent=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
				doc.getElementById("LeagueGoalDiff").textContent=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
				doc.getElementById("LeaguePoints").textContent=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);
				
				doc.getElementById("LeagueMatchesBis").textContent=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);
				doc.getElementById("LeaguePositionBis").textContent=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
				doc.getElementById("LeagueTeamBis").textContent=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
				doc.getElementById("LeaguePlayedBis").textContent=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
				doc.getElementById("LeagueGoalsBis").textContent=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
				doc.getElementById("LeagueGoalDiffBis").textContent=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
				doc.getElementById("LeaguePointsBis").textContent=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);
				
				doc.getElementById("YouthLeagueMatches").textContent=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);
				doc.getElementById("YouthLeagueLiveTable").textContent=htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0]);
				doc.getElementById("YouthLeaguePosition").textContent=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
				doc.getElementById("YouthLeagueTeam").textContent=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
				doc.getElementById("YouthLeaguePlayed").textContent=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
				doc.getElementById("YouthLeagueGoals").textContent=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
				doc.getElementById("YouthLeagueGoalDiff").textContent=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
				doc.getElementById("YouthLeaguePoints").textContent=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);
				
				doc.getElementById("YouthLeagueMatchesBis").textContent=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);
				doc.getElementById("YouthLeagueLiveTableBis").textContent=htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0]);
				doc.getElementById("YouthLeaguePositionBis").textContent=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
				doc.getElementById("YouthLeagueTeamBis").textContent=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
				doc.getElementById("YouthLeaguePlayedBis").textContent=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
				doc.getElementById("YouthLeagueGoalsBis").textContent=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
				doc.getElementById("YouthLeagueGoalDiffBis").textContent=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
				doc.getElementById("YouthLeaguePointsBis").textContent=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);
				
				doc.getElementById("MatchesList").textContent=htlivesight.Util.Parse("MatchesList",htlivesight.data[0]);
				doc.getElementById("FriendsTitle").textContent=htlivesight.Util.Parse("FriendsTitle",htlivesight.data[0]);
				doc.getElementById("FriendsRemove").textContent=htlivesight.Util.Parse("FriendsRemove",htlivesight.data[0]);
				doc.getElementById("FriendsOpen").textContent=htlivesight.Util.Parse("FriendsOpen",htlivesight.data[0]);
				doc.getElementById("MatchesAdd").textContent=htlivesight.Util.Parse("MatchesAdd",htlivesight.data[0]);
		//			options of the select list translations.
				doc.getElementById("optionHattrick").textContent=htlivesight.Util.Parse("Senior",htlivesight.data[0]);
				doc.getElementById("optionYouth").textContent=htlivesight.Util.Parse("Youth",htlivesight.data[0]);
				doc.getElementById("optionHtointegrated").textContent=htlivesight.Util.Parse("Tournament",htlivesight.data[0]);
				doc.getElementById("MatchesByMatch").textContent=htlivesight.Util.Parse("MatchesByMatch",htlivesight.data[0]);
				doc.getElementById("MatchesByTeam").textContent=htlivesight.Util.Parse("MatchesByTeam",htlivesight.data[0]);
				doc.getElementById("MenuServer").textContent=htlivesight.Util.Parse("MenuServer",htlivesight.data[0]);
				doc.getElementById("ServerStatus").textContent=htlivesight.Util.Parse("MenuDisconnected",htlivesight.data[0]);
				doc.getElementById("TabColors").textContent=htlivesight.Util.Parse("Colors",htlivesight.data[0]);
				doc.getElementById("CustomEventBackground").textContent=htlivesight.Util.Parse("EventBackground",htlivesight.data[0]);
				doc.getElementById("ChooseColor").textContent=htlivesight.Util.Parse("ColorPicker",htlivesight.data[0]);
				doc.getElementById("label_friendHomeColorCode").textContent=htlivesight.Util.Parse("FriendHome",htlivesight.data[0]);
				doc.getElementById("label_friendAwayColorCode").textContent=htlivesight.Util.Parse("FriendAway",htlivesight.data[0]);
				doc.getElementById("label_foeHomeColorCode").textContent=htlivesight.Util.Parse("FoeHome",htlivesight.data[0]);
				doc.getElementById("label_foeAwayColorCode").textContent=htlivesight.Util.Parse("FoeAway",htlivesight.data[0]);
				doc.getElementById("label_neutralColorCode").textContent=htlivesight.Util.Parse("Neutral",htlivesight.data[0]);
				doc.getElementById("CustomEventText").textContent=htlivesight.Util.Parse("EventColorTitle",htlivesight.data[0]);
				
				doc.getElementById("label_friendHomeTextColorCode").textContent=htlivesight.Util.Parse("FriendHome",htlivesight.data[0]);
				doc.getElementById("label_friendAwayTextColorCode").textContent=htlivesight.Util.Parse("FriendAway",htlivesight.data[0]);
				doc.getElementById("label_foeHomeTextColorCode").textContent=htlivesight.Util.Parse("FoeHome",htlivesight.data[0]);
				doc.getElementById("label_foeAwayTextColorCode").textContent=htlivesight.Util.Parse("FoeAway",htlivesight.data[0]);
				doc.getElementById("label_neutralTextColorCode").textContent=htlivesight.Util.Parse("Neutral",htlivesight.data[0]);
				
				doc.getElementById("label_headerBarColorCode").textContent=htlivesight.Util.Parse("HeaderBarColor",htlivesight.data[0]);
				doc.getElementById("HeaderBarColor").textContent=htlivesight.Util.Parse("HeaderBarColor",htlivesight.data[0]);
				doc.getElementById("label_headerBarTextColorCode").textContent=htlivesight.Util.Parse("HeaderBarTextColor",htlivesight.data[0]);
				//doc.getElementById("HeaderBarTextColor").textContent=htlivesight.Util.Parse("HeaderBarTextColor",htlivesight.data[0]);
							
				//doc.getElementById("label_textColorCode").textContent=htlivesight.Util.Parse("EventTextColor",htlivesight.data[0]);
				doc.getElementById("label_seTextColorCode").textContent=htlivesight.Util.Parse("SETextColor",htlivesight.data[0]);
				//doc.getElementById("LoggedIn").textContent=htlivesight.Util.Parse("LoggedIn",htlivesight.data[0]);
				//doc.getElementById("LoggedIn").textContent="Following: ";
				doc.getElementById("latestNews").textContent=htlivesight.Util.Parse("latestNews",htlivesight.data[0]);
				doc.getElementById("HTLSThread").title=htlivesight.Util.Parse("HTLSThread",htlivesight.data[0]);
				doc.getElementById("ProjectWebsite").title=htlivesight.Util.Parse("ProjectWebsite",htlivesight.data[0]);
				doc.getElementById("GooglePlusPage").title=htlivesight.Util.Parse("GooglePlusPage",htlivesight.data[0]);
				doc.getElementById("TwitterPage").title=htlivesight.Util.Parse("TwitterPage",htlivesight.data[0]);
				doc.getElementById("FacebookPage").title=htlivesight.Util.Parse("FacebookPage",htlivesight.data[0]);
				doc.getElementById("chat_link").title=htlivesight.Util.Parse("chatLink",htlivesight.data[0]);
				doc.getElementById("hidesidebar").title=htlivesight.Util.Parse("hidesidebar",htlivesight.data[0]);
				doc.getElementById("options_link").title=htlivesight.Util.Parse("MenuOptions",htlivesight.data[0]);
				doc.getElementById("about_link").title=htlivesight.Util.Parse("MenuAbout",htlivesight.data[0]);
				doc.getElementById("copiedToClipboard").textContent=htlivesight.Util.Parse("CopiedToClipboard",htlivesight.data[0]);
				// background
				doc.getElementById("label_customBackground_reset").textContent=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
				doc.getElementById("label_chkExtendBackground").textContent=htlivesight.Util.Parse("ExtendImage",htlivesight.data[0]);
				doc.getElementById("label_chkRepeatBackground").textContent=htlivesight.Util.Parse("RepeatImage",htlivesight.data[0]);
				doc.getElementById("CustomBackground").textContent=htlivesight.Util.Parse("Background",htlivesight.data[0]);
				doc.getElementById("muteAll").title=htlivesight.Util.Parse("MuteAll",htlivesight.data[0]);
			});
		}
};
