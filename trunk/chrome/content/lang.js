if (!htlivesight) var htlivesight = {};

htlivesight.Lang = {
//contentPath: htlivesight.resourcePath,
startup: function() {},
localization: function() {
//alert("begin localization");
htlivesight.prefs=htlivesight.Preferences.get();
//alert("1");
htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
//alert("2: url="+ htlivesight.url);
htlivesight.languageXML=htlivesight.loadXml(htlivesight.url);
//alert("3");
htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");

//************* added by bigpapy to load prefs first time!
//alert("before if!");
if (!htlivesightPrefs.getBool("HtlsFirstStart")){
//alert("into if before opening optionspage");
//	alert("htlivesightEnv.contentPath="+ htlivesightEnv.contentPath);

	var optionsPage=window.open(htlivesightEnv.contentPath+"settings.html","_parent");
//	alert("after opening optionspage");
//	optionsPage.onfocus();

	
//	htlivesightPrefs.setBool("HtlsFirstStart",true);


	

//	alert("7");
};
// end added by bigpapy to load prefs first time **************************

//LOGIN
//alert("Login");

document.getElementById("ui-dialog-title-login-dialog").innerHTML=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);	
//alert("login2");
document.getElementById("LoginLabel2").innerHTML=htlivesight.Util.Parse("LoginLabel",htlivesight.data[0]);
document.getElementById("LoginTeamId").innerHTML=htlivesight.Util.Parse("LoginTeamId",htlivesight.data[0]);
document.getElementById("LoginSave").innerHTML=htlivesight.Util.Parse("LoginRememberMe",htlivesight.data[0]);
document.getElementById("button_login").attributes.getNamedItem("value").value=htlivesight.Util.Parse("LoginButton",htlivesight.data[0]);

document.getElementById("LoginReLive").innerHTML=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
document.getElementById("LoginReLive2").innerHTML=htlivesight.Util.Parse("LoginReLive",htlivesight.data[0]);
document.getElementById("LoginSpeed").innerHTML=htlivesight.Util.Parse("LoginSpeed",htlivesight.data[0]);
document.getElementById("LoginByEvent").innerHTML=htlivesight.Util.Parse("LoginByEvent",htlivesight.data[0]);

//ABOUT
//alert("About");
document.getElementById("ui-dialog-title-about-dialog").innerHTML=htlivesight.Util.Parse("WindowAboutTitle",htlivesight.data[0]);	
document.getElementById("TabInfo").innerHTML=htlivesight.Util.Parse("TabInfo",htlivesight.data[0]);
document.getElementById("creationDate").innerHTML="17 "+htlivesight.Util.Parse("MonthNovember",htlivesight.data[0])+" 2012";
document.getElementById("createdBy").innerHTML=htlivesight.Util.Parse("TextCreatedBy",htlivesight.data[0]);

document.getElementById("TabTranslators").innerHTML=htlivesight.Util.Parse("TabTranslators",htlivesight.data[0]);
document.getElementById("ThanksTo").innerHTML=htlivesight.Util.Parse("TextThanksTo",htlivesight.data[0]);

document.getElementById("TabCredits").innerHTML=htlivesight.Util.Parse("TabCredits",htlivesight.data[0]);

//SETTINGS
//alert("Settings");
document.getElementById("ui-dialog-title-options-dialog").innerHTML=htlivesight.Util.Parse("WindowTitle",htlivesight.data[0]);
document.getElementById("TabGeneral").innerHTML=htlivesight.Util.Parse("TabGeneral",htlivesight.data[0]);
document.getElementById("GeneralOpen").innerHTML=htlivesight.Util.Parse("GeneralOpen",htlivesight.data[0]);
document.getElementById("label_openin_tab").innerHTML=htlivesight.Util.Parse("GeneralNewTab",htlivesight.data[0]);
document.getElementById("label_openin_window").innerHTML=htlivesight.Util.Parse("GeneralNewWindow",htlivesight.data[0]);
document.getElementById("LanguageSelect").innerHTML=htlivesight.Util.Parse("LanguageSelect",htlivesight.data[0]);
document.getElementById("LanguageNote").innerHTML=htlivesight.Util.Parse("LanguageNote",htlivesight.data[0]);
document.getElementById("GeneralServer").innerHTML=htlivesight.Util.Parse("GeneralServer",htlivesight.data[0]);
document.getElementById("GeneralNote").innerHTML=htlivesight.Util.Parse("GeneralNote",htlivesight.data[0]);
document.getElementById("CrowdinHelp").innerHTML=htlivesight.Util.Parse("CrowdinHelp",htlivesight.data[0]);

//alert("Settings tab 2");
document.getElementById("TabMatches").innerHTML=htlivesight.Util.Parse("TabMatches",htlivesight.data[0]);
document.getElementById("MatchesLeague").innerHTML=htlivesight.Util.Parse("MatchesLeague",htlivesight.data[0]);
document.getElementById("label_chkGetLeague").innerHTML=htlivesight.Util.Parse("MatchesGetLeague",htlivesight.data[0]);
document.getElementById("label_chkGetLeagueWithin").innerHTML=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
document.getElementById("MatchesHours").innerHTML=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
document.getElementById("MatchesFriends").innerHTML=htlivesight.Util.Parse("MatchesFriends",htlivesight.data[0]);
document.getElementById("label_chkGetFriends").innerHTML=htlivesight.Util.Parse("MatchesGetFriends",htlivesight.data[0]);
document.getElementById("label_chkGetFriendsWithin").innerHTML=htlivesight.Util.Parse("MatchesPlayed",htlivesight.data[0]);
document.getElementById("MatchesHours2").innerHTML=htlivesight.Util.Parse("MatchesHours",htlivesight.data[0]);
document.getElementById("MatchesHeader").innerHTML=htlivesight.Util.Parse("MatchesHeader",htlivesight.data[0]);
//document.getElementById("MatchesScorers").innerHTML=htlivesight.Util.Parse("MatchesScorers",htlivesight.data[0]);
document.getElementById("label_chkHdrScorers").innerHTML=htlivesight.Util.Parse("ScorersList",htlivesight.data[0]);

//document.getElementById("MatchesBooked").innerHTML=htlivesight.Util.Parse("MatchesBooked",htlivesight.data[0]);
document.getElementById("label_chkHdrBooked").innerHTML=htlivesight.Util.Parse("BookedList",htlivesight.data[0]);
//document.getElementById("MatchesSentOff").innerHTML=htlivesight.Util.Parse("MatchesSentOff",htlivesight.data[0]);
document.getElementById("label_chkHdrSentOff").innerHTML=htlivesight.Util.Parse("SentOffList",htlivesight.data[0]);
//document.getElementById("MatchesInjured").innerHTML=htlivesight.Util.Parse("MatchesInjured",htlivesight.data[0]);
document.getElementById("label_chkHdrInjured").innerHTML=htlivesight.Util.Parse("InjuredList",htlivesight.data[0]);

document.getElementById("MatchesWindow").innerHTML=htlivesight.Util.Parse("MatchesWindow",htlivesight.data[0]);
document.getElementById("MatchesLines").innerHTML=htlivesight.Util.Parse("MatchesLines",htlivesight.data[0]);

//alert("Settings tab 3");
document.getElementById("TabNotifications").innerHTML=htlivesight.Util.Parse("TabNotifications",htlivesight.data[0]);
document.getElementById("NotifyNotify").innerHTML=htlivesight.Util.Parse("NotifyNotify",htlivesight.data[0]);
document.getElementById("label_chkSound").innerHTML=htlivesight.Util.Parse("NotifyEnableSound",htlivesight.data[0]);
document.getElementById("label_chkSoundOnlyOpened").innerHTML=htlivesight.Util.Parse("NotifyOnly",htlivesight.data[0]);
document.getElementById("label_chkFlash").innerHTML=htlivesight.Util.Parse("NotifyFlash",htlivesight.data[0]);
document.getElementById("label_chkSlider").innerHTML=htlivesight.Util.Parse("NotifyStatus",htlivesight.data[0]);

//alert("Settings tab 4");
document.getElementById("TabOther").innerHTML=htlivesight.Util.Parse("TabOther",htlivesight.data[0]);
document.getElementById("OtherAuthorization").innerHTML=htlivesight.Util.Parse("OtherAuthorization",htlivesight.data[0]);
document.getElementById("OtherReset").innerHTML=htlivesight.Util.Parse("OtherReset",htlivesight.data[0]);
document.getElementById("button_reset").innerHTML=htlivesight.Util.Parse("OtherResetButton",htlivesight.data[0]);
document.getElementById("OtherEvents").innerHTML=htlivesight.Util.Parse("OtherEvents",htlivesight.data[0]);
document.getElementById("label_reverseOrder").innerHTML=htlivesight.Util.Parse("OtherReverse",htlivesight.data[0]);
document.getElementById("OtherReverseNote").innerHTML=htlivesight.Util.Parse("OtherReverseNote",htlivesight.data[0]);
document.getElementById("OtherEventKey").innerHTML=htlivesight.Util.Parse("OtherEventKey",htlivesight.data[0]);
document.getElementById("label_printEventKey").innerHTML=htlivesight.Util.Parse("OtherEventKeyNote",htlivesight.data[0]);

//alert("Settings tab 5");
document.getElementById("TabCustom").innerHTML=htlivesight.Util.Parse("TabCustom",htlivesight.data[0]);
document.getElementById("CustomIcons").innerHTML=htlivesight.Util.Parse("CustomIcons",htlivesight.data[0]);
document.getElementById("label_oldIcons").innerHTML=htlivesight.Util.Parse("CustomIconsOld",htlivesight.data[0]);
document.getElementById("CustomSounds").innerHTML=htlivesight.Util.Parse("CustomSounds",htlivesight.data[0]);
document.getElementById("label_weather").innerHTML=htlivesight.Util.Parse("CustomSoundsWeather",htlivesight.data[0]);
document.getElementById("label_whistleTime").innerHTML=htlivesight.Util.Parse("CustomSoundsTime",htlivesight.data[0]);
document.getElementById("label_weatherSE").innerHTML=htlivesight.Util.Parse("CustomSoundsSEW",htlivesight.data[0]);
document.getElementById("label_livefoxGoal").innerHTML=htlivesight.Util.Parse("CustomSoundsGoal",htlivesight.data[0]);
document.getElementById("label_noOpGoal").innerHTML=htlivesight.Util.Parse("CustomSoundsNoOpGoal",htlivesight.data[0]);
document.getElementById("PathSoundsNote1").innerHTML=htlivesight.Util.Parse("PathSoundsNote1",htlivesight.data[0]);
document.getElementById("PathSoundsNote2").innerHTML=htlivesight.Util.Parse("PathSoundsNote2",htlivesight.data[0]);
document.getElementById("TabGoalSound").innerHTML=htlivesight.Util.Parse("TabGoalSound",htlivesight.data[0]);
document.getElementById("label_myGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMyGoal",htlivesight.data[0]);
document.getElementById("label_myGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_myGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_opGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpGoal",htlivesight.data[0]);
document.getElementById("label_opGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_opGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_frGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsFrGoal",htlivesight.data[0]);
document.getElementById("label_frGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_frGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_opfrGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpFrGoal",htlivesight.data[0]);
document.getElementById("label_opfrGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_opfrGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_otGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOtGoal",htlivesight.data[0]);
document.getElementById("label_otGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_otGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_missGoalCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMiss",htlivesight.data[0]);
document.getElementById("label_missGoalButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_missGoalButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("TabWheatherSound").innerHTML=htlivesight.Util.Parse("TabWheatherSound",htlivesight.data[0]);
document.getElementById("label_sunCheck").innerHTML=htlivesight.Util.Parse("PathSoundsSun",htlivesight.data[0]);
document.getElementById("label_sunButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_sunButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_rainCheck").innerHTML=htlivesight.Util.Parse("PathSoundsRain",htlivesight.data[0]);
document.getElementById("label_rainButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_rainButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_overcastCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOvercast",htlivesight.data[0]);
document.getElementById("label_overcastButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_overcastButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_fewCloudsCheck").innerHTML=htlivesight.Util.Parse("PathSoundsFewClouds",htlivesight.data[0]);
document.getElementById("label_fewCloudsButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_fewCloudsButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_myBooCheck").innerHTML=htlivesight.Util.Parse("PathSoundsMyBoo",htlivesight.data[0]);
document.getElementById("label_myBooButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_myBooButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_opBooCheck").innerHTML=htlivesight.Util.Parse("PathSoundsOpBoo",htlivesight.data[0]);
document.getElementById("label_opBooButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_opBooButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("TabWhistleSound").innerHTML=htlivesight.Util.Parse("TabWhistleSound",htlivesight.data[0]);
document.getElementById("label_whistleStartCheck").innerHTML=htlivesight.Util.Parse("PathSoundsWhistleStart",htlivesight.data[0]);
document.getElementById("label_whistleStartButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_whistleStartButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_whistle2Check").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle2",htlivesight.data[0]);
document.getElementById("label_whistle2Button_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_whistle2Button_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_whistle3Check").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle3",htlivesight.data[0]);
document.getElementById("label_whistle3Button_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_whistle3Button_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_whistleCheck").innerHTML=htlivesight.Util.Parse("PathSoundsWhistle",htlivesight.data[0]);
document.getElementById("label_whistleButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_whistleButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);
document.getElementById("label_hattrickCheck").innerHTML=htlivesight.Util.Parse("PathSoundsHattrick",htlivesight.data[0]);
document.getElementById("label_hattrickButton_reset").innerHTML=htlivesight.Util.Parse("PathSoundsRestore",htlivesight.data[0]);
document.getElementById("label_hattrickButton_play").innerHTML=htlivesight.Util.Parse("PathSoundsPlay",htlivesight.data[0]);

//TOPBAR


//SIDEBAR
//alert("Sidebar");
document.getElementById("LeagueMatches").innerHTML=htlivesight.Util.Parse("LeagueMatches",htlivesight.data[0]);

document.getElementById("LeagueLiveTable").innerHTML=htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0]);
document.getElementById("LeaguePosition").innerHTML=htlivesight.Util.Parse("LeaguePosition",htlivesight.data[0]);
document.getElementById("LeagueTeam").innerHTML=htlivesight.Util.Parse("LeagueTeam",htlivesight.data[0]);
document.getElementById("LeaguePlayed").innerHTML=htlivesight.Util.Parse("LeaguePlayed",htlivesight.data[0]);
document.getElementById("LeagueGoals").innerHTML=htlivesight.Util.Parse("LeagueGoals",htlivesight.data[0]);
document.getElementById("LeagueGoalDiff").innerHTML=htlivesight.Util.Parse("LeagueGoalDiff",htlivesight.data[0]);
document.getElementById("LeaguePoints").innerHTML=htlivesight.Util.Parse("LeaguePoints",htlivesight.data[0]);

document.getElementById("MatchesList").innerHTML=htlivesight.Util.Parse("MatchesList",htlivesight.data[0]);

document.getElementById("FriendsTitle").innerHTML=htlivesight.Util.Parse("FriendsTitle",htlivesight.data[0]);
document.getElementById("FriendsRemove").innerHTML=htlivesight.Util.Parse("FriendsRemove",htlivesight.data[0]);
document.getElementById("FriendsOpen").innerHTML=htlivesight.Util.Parse("FriendsOpen",htlivesight.data[0]);

document.getElementById("MatchesAdd").innerHTML=htlivesight.Util.Parse("MatchesAdd",htlivesight.data[0]);
//options of the select list translations.
document.getElementById("optionHattrick").innerHTML=htlivesight.Util.Parse("Senior",htlivesight.data[0]);
document.getElementById("optionYouth").innerHTML=htlivesight.Util.Parse("Youth",htlivesight.data[0]);
document.getElementById("optionHtointegrated").innerHTML=htlivesight.Util.Parse("Tournament",htlivesight.data[0]);

document.getElementById("MatchesByMatch").innerHTML=htlivesight.Util.Parse("MatchesByMatch",htlivesight.data[0]);
document.getElementById("MatchesByTeam").innerHTML=htlivesight.Util.Parse("MatchesByTeam",htlivesight.data[0]);

document.getElementById("MenuServer").innerHTML=htlivesight.Util.Parse("MenuServer",htlivesight.data[0]);
document.getElementById("ServerStatus").innerHTML=htlivesight.Util.Parse("MenuDisconnected",htlivesight.data[0]);


document.getElementById("TabColors").innerHTML=htlivesight.Util.Parse("Colors",htlivesight.data[0]);
document.getElementById("CustomEventBackground").innerHTML=htlivesight.Util.Parse("EventBackground",htlivesight.data[0]);
document.getElementById("ChooseColor").innerHTML=htlivesight.Util.Parse("ColorPicker",htlivesight.data[0]);
document.getElementById("label_friendHomeColorCode").innerHTML=htlivesight.Util.Parse("FriendHome",htlivesight.data[0]);
document.getElementById("label_friendAwayColorCode").innerHTML=htlivesight.Util.Parse("FriendAway",htlivesight.data[0]);
document.getElementById("label_foeHomeColorCode").innerHTML=htlivesight.Util.Parse("FoeHome",htlivesight.data[0]);
document.getElementById("label_foeAwayColorCode").innerHTML=htlivesight.Util.Parse("FoeAway",htlivesight.data[0]);
document.getElementById("label_neutralColorCode").innerHTML=htlivesight.Util.Parse("Neutral",htlivesight.data[0]);
document.getElementById("CustomEventText").innerHTML=htlivesight.Util.Parse("EventColorTitle",htlivesight.data[0]);
document.getElementById("label_textColorCode").innerHTML=htlivesight.Util.Parse("EventTextColor",htlivesight.data[0]);
document.getElementById("label_seTextColorCode").innerHTML=htlivesight.Util.Parse("SETextColor",htlivesight.data[0]);

/** biigpapy new localizations **/
//document.getElementById("imgup_friend").innerHTML=htlivesight.Util.Parse("Up",htlivesight.data[0]);
//document.getElementById("imgdown_friend").innerHTML=htlivesight.Util.Parse("Down",htlivesight.data[0]);
document.getElementById("LoggedIn").innerHTML=htlivesight.Util.Parse("LoggedIn",htlivesight.data[0]);
document.getElementById("latestNews").innerHTML=htlivesight.Util.Parse("latestNews",htlivesight.data[0]);
document.getElementById("HTLSThread").title=htlivesight.Util.Parse("HTLSThread",htlivesight.data[0]);
document.getElementById("ProjectWebsite").title=htlivesight.Util.Parse("ProjectWebsite",htlivesight.data[0]);
document.getElementById("GooglePlusPage").title=htlivesight.Util.Parse("GooglePlusPage",htlivesight.data[0]);
document.getElementById("TwitterPage").title=htlivesight.Util.Parse("TwitterPage",htlivesight.data[0]);
document.getElementById("FacebookPage").title=htlivesight.Util.Parse("FacebookPage",htlivesight.data[0]);
document.getElementById("chat_link").title=htlivesight.Util.Parse("chatLink",htlivesight.data[0]);
document.getElementById("hidesidebar").title=htlivesight.Util.Parse("hidesidebar",htlivesight.data[0]);
document.getElementById("options_link").title=htlivesight.Util.Parse("MenuOptions",htlivesight.data[0]);
document.getElementById("about_link").title=htlivesight.Util.Parse("MenuAbout",htlivesight.data[0]);

//alert("end localization");

}

};

