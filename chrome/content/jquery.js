$(function() {
	htlivesight.prefs = htlivesight.Preferences.get();
	htlivesight.url = htlivesightEnv.contentPath + "locale/" + htlivesight.prefs.language.locale + ".xml";
	htlivesight.loadXml(htlivesight.url, function(xml, status) {
		if (status != 200) {
			return
		}
		var data = xml.getElementsByTagName("Htlivesight");
		htlivesight.data = data;
		$('#options-dialog').dialog({
			autoOpen : false,
			modal : true,
			width : 500,
			show : "fold",
			hide : "fold",
			buttons : [ {
				text : htlivesight.Util.Parse("ButtonOk", htlivesight.data[0]),/*
																				 * function() {
																				 * //htlivesight.prefs=htlivesight.Preferences.get();
																				 * htlivesight.url=htlivesightEnv.contentPath+"locale/"+
																				 * htlivesight.prefs.language.locale
																				 * +".xml";
																				 * htlivesight.languageXML=htlivesight.loadXml(htlivesight.url);
																				 * htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
																				 * return
																				 * htlivesight.Util.Parse("ButtonOk",htlivesight.data[0]);},
																				 */
				click : function() {
					htlivesight.Settings.click.selLang();// change the
															// language in prefs
															// without saving
															// it.
					htlivesight.Settings.save();
					$(this).dialog("close");
				}
			}, {
				text : htlivesight.Util.Parse("ButtonCancel", htlivesight.data[0]),/*
																					 * function() {
																					 * //htlivesight.prefs=htlivesight.Preferences.get();
																					 * htlivesight.url=htlivesightEnv.contentPath+"locale/"+
																					 * htlivesight.prefs.language.locale
																					 * +".xml";
																					 * htlivesight.languageXML=htlivesight.loadXml(htlivesight.url);
																					 * htlivesight.data=htlivesight.languageXML.getElementsByTagName("Htlivesight");
																					 * return
																					 * htlivesight.Util.Parse("ButtonCancel",htlivesight.data[0]);},
																					 */
				click : function() {
					$(this).dialog("close");
				}
			} ]
		});

	});
	// Accordion
/*	$("#accordion1").accordion({
		header : "h3",
		collapsible : true
	});
	$("#accordion2").accordion({
		header : "h3",
		collapsible : true
	});
	$("#accordion3").accordion({
		header : "h3",
		collapsible : true
	});*/
	$("#winbox_leaguematches").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content",
		active: false
	}).hide();
	$("#winbox_leaguetable").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_leaguematchesBis").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_leaguetableBis").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_youthleaguematches").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_youthleaguetable").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_youthleaguematchesBis").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_youthLeaguetableBis").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	}).hide();
	$("#winbox_matchlist").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content",
	});
	$("#winbox_friends").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content",
	});
	$("#winbox_addmatch").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content",
	});
	$("#server").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content",
	});
	// Tabs
	$('#options-tabs').tabs();
	$('#about-tabs').tabs();
	$("#sidebar-tabs").tabs();
	// Login Dialog
	$("#button_login").button();
	$('#chat-dialog').dialog({
		autoOpen : false,
		modal : false,
		width : 675,
		show : "fold",
		hide : "fold",
	});
	$('#chat_link').click(function() {
		$('#chat-dialog').dialog('open');
		return false;
	});
	$("#hidesidebar").click(function() {
		$("#sidebar").toggle("slow");
		$("#live_box").toggleClass("fullscreen", "slow").promise().done(function(){
			htlivesight.dynresize();
		});
		
	});
	$('#login-dialog').dialog({
		autoOpen : true,
		modal : true,
		width : 750,
		show : "fold",
		hide : "fold",
	});
	$('#about-dialog').dialog({
		autoOpen : false,
		modal : true,
		// width: 500,
		show : "fold",
		hide : "fold",
	});
	$("#formationpopup").dialog({
		autoOpen : false,
		show : "blind",
		hide : "blind",
	});
	// Dialog Link
	$('#dialog_link').click(function() {
		$('#login-dialog').dialog('open');
		return false;
	});
	$('#options_link').click(function() {
		$('#options-dialog').dialog('open');
		return false;
	});
	$('#about_link').click(function() {
		$('#about-dialog').dialog({
			position : {
				my : "top",
				at : "top"
			}
		});
		$('#about-dialog').dialog('open');
		return false;
	});
	$('#warning').click(function() {
		$('#warning-dialog').dialog('open');
		return false;
	});
	$('#warning-dialog').dialog({
		autoOpen : false,
		modal : true,
		width : 750,
		show : "drop",
		hide : "drop",
	});
	$('#error').click(function() {
		$('#error-dialog').dialog('open');
		return false;
	});
	$('#error-dialog').dialog({
		autoOpen : false,
		modal : true,
		width : 750,
		show : "explode",
		hide : "explode",
	});
	// Add match events
	function runEffect() {
		var options = {};
		$("#effect").show("blind", options, 500, callback);
	}
	;
	function runEffect2() {
		var options = {};
		$("#effect2").show("blind", options, 500, callback);
	}
	;
	function runToggle() { // the toggler
		var options = {};
		$("#matchevents").toggle("blind", options, 500);
	}
	;
	function callback() {
	}
	;
	$("#button").click(function() {
		runEffect();
		return false;
	});
	$("#button2").click(function() {
		runEffect2();
		return false;
	});
	$("#togglebutton").click(function() {
		runToggle();
		return false;
	});
	$("#effect").hide();
	$("#effect2").hide();
	// Progressbar
	$("#progressbar").progressbar({});
	// Other Buttons
	$("#btnfriend_remove").button();
	$("#btnfriend_addmatch").button();
	$("#imgup_friend").button();
	$("#imgdown_friend").button();
	$("#buttonAddMatch").button();
	$("#buttonAddTeam").button();
	// Options buttons
	$("#openin").buttonset();
	$("#removeauth").button();
	$(".brestore").button();
	// hover states on the static widgets .........#options_link, #about_link,
	$('#site_link, #dialog_link, ul#icons li').hover(function() {
		$(this).addClass('ui-state-hover');
	}, function() {
		$(this).removeClass('ui-state-hover');
	});
	// Red Card/Injury Animation
	$("#animator").click(function() {
		$(".animation").addClass("newClass", 1, callback);
		return false;
	});
	function callback() {
		setTimeout(function() {
			$(".animation").removeClass("newClass");
		}, 15000);
	}
	// Yellow Animation
	$("#animator2").click(function() {
		$(".animation").addClass("newClass2", 1, callback);
		return false;
	});
	function callback() {
		setTimeout(function() {
			$(".animation").removeClass("newClass2");
		}, 15000);
	}
	// Miss Animation
	$("#animator3").click(function() {
		$(".animation").addClass("newClass3", 1, callback);
		return false;
	});
	function callback() {
		setTimeout(function() {
			$(".animation").removeClass("newClass3");
		}, 15000);
	}
	// Goal Animation
	$("#animator4").click(function() {
		$(".animation").addClass("newClass4", 1, callback);
		return false;
	});
	function callback() {
		setTimeout(function() {
			$(".animation").removeClass("newClass4");
		}, 15000);
	}
	// Bruised Animation
	$("#animator5").click(function() {
		$(".animation").addClass("newClass5", 1, callback);
		return false;
	});
	function callback() {
		setTimeout(function() {
			$(".animation").removeClass("newClass5");
		}, 15000);
	}
});