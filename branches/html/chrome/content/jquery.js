	/*<script type="text/javascript">
			// *** TO BE CUSTOMISED ***

	var style_cookie_name = "style" ;
	var style_cookie_duration = 30 ;

	// *** END OF CUSTOMISABLE SECTION ***

	function switch_style ( css_title )
	{// You may use this script on your site free of charge provided
	// you do not remove this notice or the URL below. Script from
	// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
	  var i, link_tag ;
	  for (i = 0, link_tag = document.getElementsByTagName("link") ;
	    i < link_tag.length ; i++ ) {
	    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
	      link_tag[i].title) {
	      link_tag[i].disabled = true ;
	      if (link_tag[i].title == css_title) {
	        link_tag[i].disabled = false ;
	      }
	    }
	    set_cookie( style_cookie_name, css_title,
	      style_cookie_duration );
	  }
	}function set_style_from_cookie()
	{  var css_title = get_cookie( style_cookie_name );
	  if (css_title.length) {
	    switch_style( css_title );
	  }
	}function set_cookie ( cookie_name, cookie_value,
	    lifespan_in_days, valid_domain )
	{    // http://www.thesitewizard.com/javascripts/cookies.shtml
	    var domain_string = valid_domain ?
	                       ("; domain=" + valid_domain) : '' ;
	    document.cookie = cookie_name +
	                       "=" + encodeURIComponent( cookie_value ) +
	                       "; max-age=" + 60 * 60 *
	                       24 * lifespan_in_days +
	                       "; path=/" + domain_string ;
	}function get_cookie ( cookie_name )
	{    // http://www.thesitewizard.com/javascripts/cookies.shtml
	    var cookie_string = document.cookie ;
	    if (cookie_string.length != 0) {
	        var cookie_value = cookie_string.match (
	                        '(^|;)[\s]*' +
	                        cookie_name +
	                        '=([^;]*)' );
	        return decodeURIComponent ( cookie_value[2] ) ;
	    }
	    return '' ;
	}		</script>*/

$(function(){
				// Accordion
				$("#accordion1").accordion({ header: "h3", collapsible: true });
				$("#accordion2").accordion({ header: "h3", collapsible: true });
				$("#accordion3").accordion({ header: "h3", collapsible: true });
				$("#winbox_leaguematches").accordion({ header: "h3", collapsible: true, autoHeight: false });
				$("#winbox_leaguetable").accordion({ header: "h3", collapsible: true, autoHeight: false });
				$("#winbox_matchlist").accordion({ header: "h3", collapsible: true, autoHeight: false });
				$("#winbox_friends").accordion({ header: "h3", collapsible: true, autoHeight: false });
				$("#winbox_addmatch").accordion({ header: "h3", collapsible: true, autoHeight: false });
				$("#server").accordion({ header: "h3", collapsible: true, autoHeight: false });
				// Tabs
				$('#options-tabs').tabs();
				$('#about-tabs').tabs();
				// Login Dialog
				//$( "#save_teamId" ).button();
				$( "#button_login" ).button();
				//$( "#reLive" ).button();
				//$( "#reLiveByEvent" ).button();					
				$('#login-dialog').dialog({
					autoOpen: true,
					modal: true,
					width: 750,
					show: "fold",
					hide: "fold",
				});
				$('#options-dialog').dialog({
					autoOpen: false,
					modal: true,
					width: 500,
					show: "fold",
					hide: "fold",
					buttons: [
						{
							text: "Ok",
							click: function() { 
								htlivesight.Settings.click.selLang();//change the language in prefs without saving it.
								htlivesight.Settings.save(); 
								$(this).dialog("close"); 
								}
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close");  }
						}
							]
				});
				$('#about-dialog').dialog({
					autoOpen: false,
					modal: true,
					//width: 500,
					show: "fold",
					hide: "fold",
				});
				
				  $( "#formationpopup" ).dialog({
					autoOpen: false,
					show: "blind",
					hide: "blind",
					});
				$('#home_team_formation_366146822_False').click(function(){
					$('#formationpopup').dialog('open');
					return false;
				});
  
				
				
				// Dialog Link
				$('#dialog_link').click(function(){
					$('#login-dialog').dialog('open');
					return false;
				});
				$('#options_link').click(function(){
					$('#options-dialog').dialog('open');
					return false;
				});
				$('#about_link').click(function(){
					$('#about-dialog').dialog('open');
					return false;
				});
				
				$('#warning').click(function(){
					$('#warning-dialog').dialog('open');
					return false;
				});				
				$('#warning-dialog').dialog({
					autoOpen: false,
					modal: true,
					width: 750,
					show: "drop",
					hide: "drop",
					//buttons: {
					//	"Ok": function() { 
					//		$(this).dialog("close"); 
					//	}, 
					//	"Cancel": function() { 
					//		$(this).dialog("close"); 
					//	}
					//}
				});
				$('#error').click(function(){
					$('#error-dialog').dialog('open');
					return false;
				});				
				$('#error-dialog').dialog({
					autoOpen: false,
					modal: true,
					width: 750,
					show: "explode",
					hide: "explode",
					//buttons: {
					//	"Ok": function() { 
					//		$(this).dialog("close"); 
					//	}, 
					//	"Cancel": function() { 
					//		$(this).dialog("close"); 
					//	}
					//}
				});
				
				//Add match events
				function runEffect() {
					var options = {};
					$( "#effect" ).show( "blind", options, 500, callback );
				};
				function runEffect2() {
					var options = {};
					$( "#effect2" ).show( "blind", options, 500, callback );
				};
						function runToggle() { //the toggler
							var options = {};
							$( "#matchevents" ).toggle( "blind", options, 500 );
						};
				function callback() {};
				$( "#button" ).click(function() {
					runEffect();
					return false;
				});
				$( "#button2" ).click(function() {
					runEffect2();
					return false;
				});
						$( "#togglebutton" ).click(function() {
							runToggle();
							return false;
						});
				$( "#effect" ).hide();
				$( "#effect2" ).hide();
				
				
				
				// Progressbar
				$("#progressbar").progressbar({
					
				});
				//Other Buttons
				$( "#btnfriend_remove" ).button();
				$( "#btnfriend_addmatch" ).button();
				$( "#imgup_friend" ).button();
				$( "#imgdown_friend" ).button();
				//$( "#boxaddyouth" ).button();
				$( "#buttonAddMatch" ).button();
				$( "#buttonAddTeam" ).button();
				//Options buttons
				$( "#openin" ).buttonset();
				/*$( "#chkGetLeague" ).button();
				$( "#chkGetLeagueWithin" ).button();
				$( "#chkGetFriends" ).button();
				$( "#chkGetFriendsWithin" ).button();
				$( "#chkHdrScorers" ).button();
				$( "#chkSound" ).button();
				$( "#chkSoundOnlyOpened" ).button();
				$( "#chkFlash" ).button();
				$( "#chkSlider" ).button();*/
				$( "#removeauth" ).button();
				/*$( "#reverseOrder" ).button();
				$( "#printEventKey" ).button();
				$( "#oldIcons" ).button();
				$( "#weather" ).button();
				$( "#whistleTime" ).button();
				$( "#weatherSE" ).button();
				$( "#livefoxGoal" ).button();
				$( "#noOpGoal" ).button();
				$( "#myGoalCheck" ).button();
				$( "#opGoalCheck" ).button();
				$( "#frGoalCheck" ).button();
				$( "#opfrGoalCheck" ).button();
				$( "#otGoalCheck" ).button();
				$( "#missGoalCheck" ).button();
				$( "#sunCheck" ).button();
				$( "#rainCheck" ).button();
				$( "#overcastCheck" ).button();
				$( "#fewCloudsCheck" ).button();
				$( "#myBooCheck" ).button();
				$( "#opBooCheck" ).button();
				$( "#whistleStartCheck" ).button();
				$( "#whistle2Check" ).button();
				$( "#whistle3Check" ).button();
				$( "#whistleCheck" ).button();
				$( "#hattrickCheck" ).button();*/
				$( ".brestore" ).button();
				//$( "#light" ).button();
				//$( "#dark" ).button();
				
				//hover states on the static widgets .........#options_link, #about_link,
				$('#site_link, #dialog_link, ul#icons li').hover(
					function() { $(this).addClass('ui-state-hover'); }, 
					function() { $(this).removeClass('ui-state-hover'); }
				);
				
				
				//Red Card/Injury Animation
				$( "#animator" ).click(function() {
				$( ".animation" ).addClass( "newClass", 1, callback );
					return false;
				});
				function callback() {
				setTimeout(function() {
				$( ".animation" ).removeClass( "newClass" );
				}, 15000 );
				}
				
				//Yellow Animation
				$( "#animator2" ).click(function() {
				$( ".animation" ).addClass( "newClass2", 1, callback );
					return false;
				});
				function callback() {
				setTimeout(function() {
				$( ".animation" ).removeClass( "newClass2" );
				}, 15000 );
				}
				
				//Miss Animation
				$( "#animator3" ).click(function() {
				$( ".animation" ).addClass( "newClass3", 1, callback );
					return false;
				});
				function callback() {
				setTimeout(function() {
				$( ".animation" ).removeClass( "newClass3" );
				}, 15000 );
				}
				
				//Goal Animation
				$( "#animator4" ).click(function() {
				$( ".animation" ).addClass( "newClass4", 1, callback );
					return false;
				});
				function callback() {
				setTimeout(function() {
				$( ".animation" ).removeClass( "newClass4" );
				}, 15000 );
				}
				
				//Bruised Animation
				$( "#animator5" ).click(function() {
				$( ".animation" ).addClass( "newClass5", 1, callback );
					return false;
				});
				function callback() {
				setTimeout(function() {
				$( ".animation" ).removeClass( "newClass5" );
				}, 15000 );
				}
		

						
			});