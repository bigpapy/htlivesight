 /* ========================================================================
 * HT-Tools Hattrick Manager Assistant 
 *
 * Copyright 2014-2015 Ventouris Anastasios
 * Licensed under GPL v3
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * ======================================================================== */



var botificationcalc = function(ownerless) {
	
    var bot = false;
    var bottime = new Date(2014, 10, 25).getTime();

    while ( bot === false ) {
		

		if ( bottime + (1000 * 60 * 60 * 24) >= ownerless) {
			bot = true;
			datet = bottime;

		} else if (bottime + (1000 * 60 * 60 * 24 * 49) >= ownerless) {
			bot = true;
			datet = bottime + (1000 * 60 * 60 * 24 * 49);

		} else if (bottime + (1000 * 60 * 60 * 24 * 98) >= ownerless) {
			bot = true;
			datet = bottime + (1000 * 60 * 60 * 24 * 98);

		} else if (bottime + (1000 * 60 * 60 * 24 * 106) >= ownerless) {
   			bot = true;
   			datet = bottime + (1000 * 60 * 60 * 24 * 106);

  		}

		bottime = bottime + (1000 * 60 * 60 * 24 * 112);  	
	}

	if ( ownerless === datet ) {
		datet = new Date(datet);
		return datet.getDate() + "/" + (datet.getMonth() + 1) + "/" + datet.getFullYear() + "  -  " + botificationcalc(ownerless + (1000*60*60*24));  

	} else {
 	
		datet = new Date(datet)
		return datet.getDate() + "/" + (datet.getMonth() + 1) + "/" + datet.getFullYear();   
	
	}
}


var botification = function() {

	/*$input = $('.datepicker').pickadate();
	var picker = $input.pickadate('picker');
	var lastlogin = picker.get('select').pick;*/
	var lastlogin = new Date($("#date").val()).getTime();
	var moreThanOneYear = $('#moreThanOneYear').is(":checked");
	var daysToOwnerless = 49;
	if(moreThanOneYear) daysToOwnerless = 98;
	var ownerless = lastlogin + (1000 * 60 * 60 * 24 * daysToOwnerless);
	var res1 = new Date(ownerless);

	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
	
	last = new Date(lastlogin);

	tableobj.rows[0].cells[0].innerText = last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear();
	tableobj.rows[0].cells[1].innerText = res1.getDate() + "/" + (res1.getMonth() + 1) + "/" + res1.getFullYear();
	tableobj.rows[0].cells[2].innerText = botificationcalc( ownerless );
}

var botification2 = function(last,ownerlesstr, signupDate) {
	if (last === "0001-01-01 00:00:00") {
		var ownerless = new Date()
		var res1 = ownerlesstr;
		last = "";

	} else {
		var lastlogin = new Date(last).getTime();
		var daysToOwnerless = 49;
		////
		if(new Date().setFullYear(new Date().getFullYear()-1) > new Date(signupDate).getTime()){//if user signup more than 1 year ago
			daysToOwnerless = 98;
		}
		////
		var ownerless = lastlogin + (1000 * 60 * 60 * 24 * daysToOwnerless);
		var res1 = new Date(ownerless);
		res1 = res1.getDate() + "/" + (res1.getMonth() + 1) + "/" + res1.getFullYear();

		last = new Date(last);
		last = last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear();
	}
	

	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
	
	tableobj.rows[0].cells[0].innerText = last;
	tableobj.rows[0].cells[1].innerText = res1;
	tableobj.rows[0].cells[2].innerText = botificationcalc( ownerless );
}

var today = new Date().getTime();

if ( today === botificationcalc(today) ) {
	$("#message2").show();
	$("#message2").append( "<b> " + botificationcalc(today + (1000 * 60 * 60 * 24)) + "</b>" );
	} else {
	$("#message1").show();
	$("#message1").append( "<b> " + botificationcalc(today) + "</b>" );
}

// put botification.html inline js here


$(document).ready(function(){
  $('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
  $('.collapsible').collapsible();
  $('ul.tabs').tabs();
  $('.datepicker').pickadate({
    monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "'September", "October", "November", "December"],
    today: "today",
    clear: "clear",
    close: "close"})
  });



$('#my-form-1').on('submit', function() {
	$("#progress").show();
	var teamId = $("#teamid").val();
	//getValue(value);
	
	htlivesight.generateFromSeed();
	htlivesight.prefs=htlivesight.Preferences.get();
	htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
	htlivesight.loadXml(htlivesight.url, function(xml, status){
		if(status != 200){return}
		var data=xml.getElementsByTagName("Htlivesight");
		htlivesight.data=data;
		httpGet(teamId);
	});

	return false;
});

$('#my-form-2').on('submit', function() {
	if(!$("#date").val()){
		alert("Please set last login date.");
		return false;
	} 
	botification();
	return false;
});

var httpGet = function (teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","teamdetails"],["version", "3.5"],["teamID",teamId]];
	if(teamId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){parseGet(xml,teamId);});
	}
};

var parseGet = function(xml,teamId){
	console.log(xml);
	var lastlogin = htlivesight.Util.Parse("LastLoginDate", xml);
	console.log('lastlogin:' + lastlogin);
	var supporterTier = htlivesight.Util.Parse("SupporterTier", xml);
	console.log('supporterTier:' + supporterTier);
	var botSince = htlivesight.Util.Parse("BotSince", xml);
	console.log('botSince:' + botSince);
	var signupDate = htlivesight.Util.Parse("SignupDate",xml);
	console.log();
	
	if (supporterTier === "platinum" || supporterTier === "diamond" ) {
		toast(supporterTier, 3000, 'rounded');
		
		var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
		last = new Date(lastlogin);
		tableobj.rows[0].cells[0].innerText = last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear();
		tableobj.rows[0].cells[1].innerText = "";
		tableobj.rows[0].cells[2].innerText = "";

	  } else {
		botification2(lastlogin,botSince, signupDate); 
	  }
	  
	  $("#progress").hide();
}

//

/*
function getValue(value)  {
   $("#progress").show();
   
   $.getJSON('/_jquerydownloaddata', 
   {'name':'botification','team':value}
   ,

   function(data) {
	  if (data.supporter === "platinum" || data.supporter === "diamond" ) {
		toast('supporterinfo', 3000, 'rounded');
		
		var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
		last = new Date(data.lastlogin);
		tableobj.rows[0].cells[0].innerText = last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear();
		tableobj.rows[0].cells[1].innerText = "";
		tableobj.rows[0].cells[2].innerText = "";

	  } else {
		botification2(data.lastlogin,'ownerlessmessage') 
	  }
	  
	  $("#progress").hide();

   });

  return false;

 };*/

