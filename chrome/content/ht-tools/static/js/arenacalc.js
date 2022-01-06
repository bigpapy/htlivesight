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

  


var fancalc = function() {

	var fans_number = parseInt(document.getElementById('fans').value);
    var fans_mood = parseInt(document.getElementById('fansmood-value').value);
   
    if (fans_mood === 0) {
    	var coef = 10;	
    } else if (fans_mood === 1) {
    	var coef = 11.3;
    } else if (fans_mood === 2) {
    	var coef = 12.6;
    } else if (fans_mood === 3) {
    	var coef = 13.9;
    } else if (fans_mood === 4) {
    	var coef = 15.2;
    } else if (fans_mood === 5) {
    	var coef = 16.5;
    } else if (fans_mood === 6) {
    	var coef = 17.8;
    } else if (fans_mood === 7) {
    	var coef = 19.1;
    } else if (fans_mood === 8) {
    	var coef = 20.4;
    } else if (fans_mood === 9) {
    	var coef = 21.7;
    } else if (fans_mood === 10) {
    	var coef = 23;
    } else if (fans_mood === 11) {
    	var coef = 24.3;
    }

    var total_fan = fans_number * coef;
    var terraces = parseInt(0.6 * total_fan);
    var basic = parseInt(0.235 * total_fan);
    var roof = parseInt(0.14 * total_fan);
    var vip = parseInt(0.025 * total_fan);

    var income = Math.ceil(7 * terraces + 10 * basic + 19 * roof + 35 * vip);
    var weekly_cost = Math.ceil(0.5 * terraces + 0.7 * basic + roof + 2.5 * vip);

    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    realterraces = tableobj.rows[0].cells[1].innerText;
    realbasic = tableobj.rows[1].cells[1].innerText;
    realroof = tableobj.rows[2].cells[1].innerText;
    realvip = tableobj.rows[3].cells[1].innerText;
    realtotal = tableobj.rows[4].cells[1].innerText;

    if (realterraces != "") {
        var newterrances = terraces - realterraces;
        var newbasic = basic - realbasic;
        var newroof = roof - realroof;
        var newvip = vip - realvip;

        tableobj.rows[0].cells[2].innerText = newterrances;
        tableobj.rows[1].cells[2].innerText = newbasic;
        tableobj.rows[2].cells[2].innerText = newroof;
        tableobj.rows[3].cells[2].innerText = newvip;
        tableobj.rows[4].cells[2].innerText = (terraces + basic + roof + vip) - realtotal;
        tableobj.rows[7].cells[2].innerText = constructioncost(newterrances, newbasic , newroof, newvip) + "€";
    }

    tableobj.rows[0].cells[3].innerText = terraces;
    tableobj.rows[1].cells[3].innerText = basic;
    tableobj.rows[2].cells[3].innerText = roof;
    tableobj.rows[3].cells[3].innerText = vip;
    tableobj.rows[4].cells[3].innerText = terraces + basic + roof + vip;
    tableobj.rows[5].cells[3].innerText = income + "€";
    tableobj.rows[6].cells[3].innerText = weekly_cost + "€";



};


var sizecalc = function() {
	var fans_number = parseInt(document.getElementById('fans').value);
    var fan_mood =  parseInt(document.getElementById('fansmood-value').value);
    var totalsize = parseFloat(document.getElementById('arenasize').value);
    var terper = parseFloat(document.getElementById('terper').value);
    var basper = parseFloat(document.getElementById('basper').value);
    var roofper = parseFloat(document.getElementById('roofper').value);
    var vipper = parseFloat(document.getElementById('vipper').value);
            
    var terraces = Math.round(terper / 100 * totalsize);
    var basic = Math.round(basper / 100 * totalsize);
    var roof = Math.round(roofper / 100 * totalsize);
    var vip = Math.round(vipper / 100 * totalsize);

    var dif = totalsize - (terraces + basic + roof + vip)
    if ( dif !== 0) {
        vip += dif
    }
        
    var income = Math.ceil(7 * terraces + 10 * basic + 19 * roof + 35 * vip);
    var weekly_cost = Math.ceil(0.5 * terraces + 0.7 * basic + roof + 2.5 * vip);

    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    realterraces = tableobj.rows[0].cells[1].innerText;
    realbasic = tableobj.rows[1].cells[1].innerText;
    realroof = tableobj.rows[2].cells[1].innerText;
    realvip = tableobj.rows[3].cells[1].innerText;
    realtotal = tableobj.rows[4].cells[1].innerText;

    if (realterraces != "") {
        var newterrances = terraces - realterraces;
        var newbasic = basic - realbasic;
        var newroof = roof - realroof;
        var newvip = vip - realvip;

        tableobj.rows[0].cells[2].innerText = newterrances;
        tableobj.rows[1].cells[2].innerText = newbasic;
        tableobj.rows[2].cells[2].innerText = newroof;
        tableobj.rows[3].cells[2].innerText = newvip;
        tableobj.rows[4].cells[2].innerText = (terraces + basic + roof + vip) - realtotal;
        tableobj.rows[7].cells[2].innerText = constructioncost(newterrances, newbasic , newroof, newvip) + "€";
    }

    tableobj.rows[0].cells[3].innerText = terraces;
    tableobj.rows[1].cells[3].innerText = basic;
    tableobj.rows[2].cells[3].innerText = roof;
    tableobj.rows[3].cells[3].innerText = vip;
    tableobj.rows[4].cells[3].innerText = terraces + basic + roof + vip;
    tableobj.rows[5].cells[3].innerText = income + "€";
    tableobj.rows[6].cells[3].innerText = weekly_cost + "€";
}


var constructioncost = function(terraces,basic,roof,vip) {
    var sumi = 10000

    if (terraces > 0){
        sumi += Math.abs(terraces)*45
    } else {
        sumi += Math.abs(terraces)*6
    }

    if (basic > 0){
        sumi += Math.abs(basic)*75
    } else {
        sumi += Math.abs(basic)*6
    }

    if (roof > 0){
        sumi += Math.abs(roof)*90
    } else {
        sumi += Math.abs(roof)*6
    }

    if (vip > 0){
        sumi += Math.abs(vip)*300
    } else {
        sumi += Math.abs(vip)*6
    }
                                 
    return sumi                       
                             
}

// adding arena.html inline js here:
$('#arenas').change(function(){
	
	$("#lastMatches > tbody").empty();
	
	var arenaId = this.value;
	console.log(arenaId);
	
	var teamId = $("select option:selected").attr("teamId")
	console.log(teamId);
	
	arenaDetailsHTTPGet(this.value, $("select option:selected").attr("teamId"));
})

var arenaDetailsHTTPGet = function (arenaId, teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","arenadetails"],["version", "1.5"],["arenaID",arenaId]];
	if(arenaId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){arenaDetailsParseGet(xml,arenaId, teamId);});
	}
};
var arenaDetailsParseGet = function(xml,arenaId, teamId){
	console.log(xml);
	var terraces = parseInt(htlivesight.Util.Parse("Terraces", xml));
	var basic = parseInt(htlivesight.Util.Parse("Basic", xml));//data.basic; //basic
    var roof = parseInt(htlivesight.Util.Parse("Roof", xml));//data.roof; //roof
    var vip = parseInt(htlivesight.Util.Parse("VIP", xml));//data.vip; //vip
    var total = parseInt(htlivesight.Util.Parse("Total", xml));//data.total; //total
    
	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
	tableobj.rows[0].cells[1].innerText = terraces;//data.terraces; //terraces
    tableobj.rows[1].cells[1].innerText = basic;//data.basic; //basic
    tableobj.rows[2].cells[1].innerText = roof;//data.roof; //roof
    tableobj.rows[3].cells[1].innerText = vip;//data.vip; //vip
    tableobj.rows[4].cells[1].innerText = total;//data.total; //total
    tableobj.rows[5].cells[1].innerText = 7*terraces + 10*basic + 19*roof + 35*vip + "€"
    tableobj.rows[6].cells[1].innerText = 0.5*parseFloat(terraces) + 0.7*parseFloat(basic) + parseFloat(roof) + 2.5*parseFloat(vip) + "€"
	console.log('calling fans');
	fansHTTPGet(teamId);
	//$("#progress").hide();
}

var fansHTTPGet = function (teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","fans"],["version", "1.3"],["teamId",teamId]];
	console.log('calling fans again');
	if(teamId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){fansParseGet(xml, teamId);});
	}
};

var fansParseGet = function(xml,teamId){
	console.log(xml);
	var fanMood = htlivesight.Util.Parse("FanMood", xml);
	console.log(' fanMood = '+ fanMood);
	var members = htlivesight.Util.Parse("Members", xml);
	console.log(' members = '+ members);
	$("#fansmood-value").val(fanMood);
	$("#fans").val(members).focus().blur();
	var percent = ""+(parseInt(fanMood)/11)*100 + "%";
	console.log(percent);
	$("#slider-fansmood > div > div").css("left", percent);
	//replacing fans matches list with matchesArchive
	matchesArchiveHTTPGet(teamId);
	//parsing matches:
	/*var matches = xml.getElementsByTagName("Match");
	var matchesId = [];
	for(i = 0; i < matches.length; i++){
		var homeTeamId = htlivesight.Util.Parse("HomeTeamID", matches[i]);
		if(homeTeamId == teamId){
			var matchId = htlivesight.Util.Parse("MatchID", matches[i]);
			//call matchdetails to add stats to last matches
			matchesId.push(matchId);
			console.log("matchId = " + matchId);
			
		}
	}
	matchDetailsHTTPGet(matchesId);*/
	//setTimeout(function(){ $('#lastMatches').DataTable({searching: false,paging: false}); $("#progress").hide();}, 3000);
}

var matchDetailsHTTPGet = function (matchesId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var matchId = matchesId.shift();//check if shift is better
	var parameters = [["file","matchdetails"],["version", "3.0"],["matchID",matchId],["sourceSystem","hattrick"]];
	console.log('calling matchdetails again');
	if(matchId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){matchDetailsParseGet(xml, matchId, matchesId);});
	}
};

var matchDetailsParseGet = function(xml, matchId, matchesId){
	console.log(xml);
	var weatherString = ["../img/rain22.png","../img/overcast22.png","../img/few_clouds22.png","../img/sun22.png"];
	var match = {};
	
	var AwayTeamName = htlivesight.Util.Parse("AwayTeamName", xml);
	var Date = htlivesight.Util.Parse("MatchDate", xml).split(" ")[0];
	var weatherID = htlivesight.Util.Parse("WeatherID", xml);
	match.matchType = htlivesight.Util.Parse("MatchType", xml);
	match.cupLevel = htlivesight.Util.Parse("CupLevel", xml);
	match.cupLevelIndex = htlivesight.Util.Parse("CupLevelIndex", xml);
	var img = getMatchTypeImage(match);
	
	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
	var terraces = parseInt(tableobj.rows[0].cells[1].innerText); //terraces
    var basic = parseInt(tableobj.rows[1].cells[1].innerText);//basic
    var roof = parseInt(tableobj.rows[2].cells[1].innerText);//roof
    var vip = parseInt(tableobj.rows[3].cells[1].innerText);//vip
    var total = parseInt(tableobj.rows[4].cells[1].innerText);//total
    
	var soldTerraces = parseInt(htlivesight.Util.Parse("SoldTerraces", xml));
	var soldBasic = parseInt(htlivesight.Util.Parse("SoldBasic", xml)); //basic
    var soldRoof = parseInt(htlivesight.Util.Parse("SoldRoof", xml));//roof
    var soldVip = parseInt(htlivesight.Util.Parse("SoldVIP", xml));//vip
    var soldTotal = parseInt(htlivesight.Util.Parse("SoldTotal", xml));; //total
	
	var soldTerracesPercent = " ("+(parseInt((soldTerraces/terraces)*10000)/100).toFixed(2)+"%)";
	var soldBasicPercent = " ("+(parseInt((soldBasic/basic)*10000)/100).toFixed(2)+"%)"; //basic
    var soldRoofPercent = " ("+(parseInt((soldRoof/roof)*10000)/100).toFixed(2)+"%)";//roof
    var soldVipPercent = " ("+(parseInt((soldVip/vip)*10000)/100).toFixed(2)+"%)";//vip
    var soldTotalPercent = " ("+(parseInt((soldTotal/total)*10000)/100).toFixed(2)+"%)"; //total

	$("#lastMatches > tbody").append("<tr><td>"+Date+"</td><td>"+AwayTeamName+"</td><td><img src='"+weatherString[weatherID]+"'></td><td><img src='"+img+"'</td><td style='text-align:right'>"+soldTerraces+"</td><td>"+soldTerracesPercent+"</td><td style='text-align:right'>"+soldBasic+"</td><td>"+soldBasicPercent+"</td><td style='text-align:right'>"+soldRoof+"</td><td>"+soldRoofPercent+"</td><td style='text-align:right'>"+soldVip+"</td><td>"+soldVipPercent+"</td><td style='text-align:right'>"+soldTotal+"</td><td>"+soldTotalPercent+"</td>");
	if(matchesId.length >0){
		matchDetailsHTTPGet(matchesId);
	}else{
		//$('#lastMatches').DataTable({searching: false,paging: false}); 
		$("#progress").hide();
	}
	
};

var matchesArchiveHTTPGet = function (teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","matchesarchive"],["version", "1.4"],["teamId",teamId]];
	console.log('calling matchesarchive');
	if(teamId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){matchesArchiveParseGet(xml, teamId);});
	}
};

var matchesArchiveParseGet = function(xml,teamId){
	console.log(xml);
	var matches = xml.getElementsByTagName("Match");
	var matchesId = [];
	for(i = 0; i < matches.length; i++){
		var homeTeamId = htlivesight.Util.Parse("HomeTeamID", matches[i]);
		var matchType = htlivesight.Util.Parse("MatchType", matches[i]);
		if(homeTeamId == teamId &&(matchType == 1 || matchType == 2 || matchType == 3 || matchType == 7)){
			var matchId = htlivesight.Util.Parse("MatchID", matches[i]);
			//call matchdetails to add stats to last matches
			matchesId.push(matchId);
			console.log("matchId = " + matchId);
			
		}
	}
	matchDetailsHTTPGet(matchesId);
	//setTimeout(function(){ $('#lastMatches').DataTable({searching: false,paging: false}); $("#progress").hide();}, 3000);
}



$(document).ready(function() {
	$('.button-collapse').sideNav({
		menuWidth : 340,
		activationWidth : 70,
		edge : 'right'
	});
	$('.collapsible').collapsible();
	$('ul.tabs').tabs();

	htlivesight.generateFromSeed();
	htlivesight.prefs=htlivesight.Preferences.get();
	htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
	htlivesight.loadXml(htlivesight.url, function(xml, status){
		if(status != 200){return}
		var data=xml.getElementsByTagName("Htlivesight");
		htlivesight.data=data;
		managerCompendiumHTTPGet();
	});
});

var managerCompendiumHTTPGet = function () {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","managercompendium"],["version", "1.3"]];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){managerCompendiumParseGet(xml);});
};

var managerCompendiumParseGet = function(xml){
	console.log(xml);
	var teams = xml.getElementsByTagName("Team");
	for(i = 0; i < teams.length; i++){
		var arenaName = htlivesight.Util.Parse("ArenaName", teams[i]);
		var arenaId = htlivesight.Util.Parse("ArenaId", teams[i]);
		var teamId = htlivesight.Util.Parse("TeamId", teams[i]);
		$('#arenas').append('<option value="'+arenaId+'" teamId="'+teamId+'">'+arenaName+'</option>');
	}
};
//

$('#my-form-1').on('submit', function() {
	if(!parseInt($("#fans").val())){
		alert("No fan members!");
	}
	fancalc();
	return false;
});

$('#my-form-2').on('submit', function() {
	if(parseFloat($("#basper").val()) + parseFloat($("#vipper").val()) + parseFloat($("#terper").val()) + parseFloat($("#roofper").val()) != 100){
		alert("Total is not 100%!" );
	}else if(!parseInt($("#arenasize").val())){
		alert("No arena size!" );
	}
	sizecalc();
	return false;
});

//

var names = [ 'murderous', 'furious', 'angry', 'irritated', 'disappointed',
		'calm', 'content', 'satisfied', 'delirious', 'high on life',
		'dancing in the streets', 'Sending love poems to you' ];

$('#slider-fansmood').noUiSlider({
	connect : 'lower',
	start : [ $("#fansmood-value").val() ],
	step : 1,
	range : {
		'min' : [ 0 ],
		'max' : [ 11 ]
	},
	format : wNumb({
		decimals : 0
	})
});

$('#slider-fansmood').Link('lower').to($('#fansmood-value'));

$("#slider-fansmood").Link().to($("#fansmood"), function(value) {
	$(this).html(names[value]);
});


getMatchTypeImage = function (match) {
	var img;
	switch (match.matchType) {

	case "1": // League match
	    img = "../img/matchLeague.png";//htlivesight.Image.matchType.league;
	    break;
	    
	case "2": // Qualification match
	    img = "../img/matchQualification.png";//htlivesight.Image.matchType.qualification;
	    break;
	    
	case "3": // Cup match
		switch (match.cupLevel) {
		case "1": //National Cup
			img = "../img/matchCup.png";//htlivesight.Image.matchType.cup;
			break;
			
		case "2": //Challenger Cup
			switch (match.cupLevelIndex){
			case "1": //Emerald
				img = "../img/matchCupEmerald.png";//htlivesight.Image.matchType.cupEmerald;
				break;
				
			case "2": //Ruby
				img = "../img/matchCupRuby.png";//htlivesight.Image.matchType.cupRuby;
				break;
				
			case "3": //Sapphire
				img = "../img/matchCupSapphire.png";//htlivesight.Image.matchType.cupSapphire;
				break;
			};
			break;
			
		case "3": //Consolation Cup
			img = "../img/matchCupConsolation.png";//htlivesight.Image.matchType.cupConsolation;
			break;	
		}
		break;
	
	default: 
	    img = htlivesight.Image.transparent;
		break;
	}
	return img;
}

//old on select stadium
/* 
   function getValue(value)  {
       $("#progress").show();

       $.getJSON('/_jquerydownloaddata', 
       {'name':'arena','team':value.value}
       ,

       function(data) {

          $('#slider-fansmood').val(data.fansmood);
          $('#fans').val(data.fans);
          $('#fans').focus();
          
          var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
          tableobj.rows[0].cells[1].innerText = data.realterraces;
          tableobj.rows[1].cells[1].innerText = data.realbasic;
          tableobj.rows[2].cells[1].innerText = data.realroof;
          tableobj.rows[3].cells[1].innerText = data.realvip;
          tableobj.rows[4].cells[1].innerText = data.realtotal;
          tableobj.rows[5].cells[1].innerText = 7*data.realterraces + 10*data.realbasic + 19*data.realroof + 35*data.realvip + "€"
          tableobj.rows[6].cells[1].innerText = 0.5*data.realterraces + 0.7*data.realbasic + data.realroof + 2.5*data.realvip + "€"

          $("#progress").hide();

       });

      return false;

     };*/
