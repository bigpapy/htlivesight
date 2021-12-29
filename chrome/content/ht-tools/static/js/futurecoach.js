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


var futurecoach = function(exptolow) {
	var experience = parseInt(document.getElementById('experience-value').value);
    var leadership = parseInt(document.getElementById('leadership-value').value);
    var coachlevel = parseInt(document.getElementById('coachlevel-value').value);

	var passable = [-1,-1,281000,235000,200000,175000,156000,139000,127000,116000,105000,100000,91000,87000,81000,77000,73000];
    var solid = [-1,-1,-1,794000,675000,592000,527000,472000,430000,394000,364000,337000,308000,296000,276000,262000,248000];
    var excellent = [-1,-1,-1,-1,4800000,4210000,3750000,3356000,3096000,2806000,2593000,2400000,2191000,2105000,1967000,1867000,1764000];

    var leader3 = [79600,268700,4000000];
    var leader4 = [182800,617100,4388400];
    var leader5 = [329700,1112900,7914600];
    var leader6 = [521000,1758500,12505200];
    var leader7 = [757100,2555500,18172500];

    if (coachlevel === 6) {
        var cost = passable[experience-4]
    } else if (coachlevel === 7) {
        var cost = solid[experience-4]
    } else if (coachlevel === 8) {
        var cost = excellent[experience-4]
    }

    if (leadership === 3) {
        var saving = leader3[coachlevel-6]-cost
    } else if (leadership === 4) {
        var saving = leader4[coachlevel-6]-cost
    } else if (leadership === 5) {
        var saving = leader5[coachlevel-6]-cost
    } else if (leadership === 6) {
        var saving = leader6[coachlevel-6]-cost
    } else if (leadership === 7) {
        var saving = leader7[coachlevel-6]-cost
    }

    if (cost === -1) {
        toast(exptolow, 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
        return;
    } else {
        var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
        tableobj.rows[0].cells[0].innerText = cost + "€";
        tableobj.rows[0].cells[1].innerText = saving + "€";
    }
}

// put futurecoach.html inline js here:


$(document).ready(function() {
	$('.button-collapse').sideNav({
		menuWidth : 340,
		activationWidth : 70,
		edge : 'right'
	});
	$('.collapsible').collapsible();
	$('ul.tabs').tabs();
	////
	$('#teams').change(function getValue()  {
		$("#progress").show();
		$('#players').empty();
		var teamId = $( "#teams option:selected" ).val();
		httpGet(teamId);
	});
	htlivesight.generateFromSeed();
	htlivesight.prefs=htlivesight.Preferences.get();
	htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
	htlivesight.loadXml(htlivesight.url, function(xml, status){
	if(status != 200){return}
	var data=xml.getElementsByTagName("Htlivesight");
	htlivesight.data=data;
	htlivesight.ManagerCompendium.HTTPGetMyData();
	});
	$('#players').change(function(){
		$('#slider-experience').val($("#players option:selected").attr("experience"));
		$('#slider-leadership').val($("#players option:selected").attr("leadership"));
	})
	////
});

var httpGet = function (teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","players"],["version", "2.4"],["teamID",teamId]];
	if(teamId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){parseGet(xml,teamId);});
	}
};

var parseGet = function(xml,teamId){
	console.log(xml);
	var limitDate = new Date();
	limitDate.setDate(limitDate.getDate() - 16*7);
	var players = xml.getElementsByTagName("Player");
	$('#players').append('<option value="" disabled selected>choose your player</option>');
	for(i = 0; i < players.length; i++){
		var playerName = htlivesight.Util.Parse("FirstName", players[i])+ " " + htlivesight.Util.Parse("LastName", players[i]);
		var playerID = htlivesight.Util.Parse("PlayerID", players[i]);
		var experience = htlivesight.Util.Parse("Experience", players[i]);
		if(experience < 6) continue;
		var leadership = htlivesight.Util.Parse("Leadership", players[i]);
		if(leadership < 3) continue;
		var transferListed = htlivesight.Util.Parse("TransferListed", players[i]);
		if(transferListed == '1') continue;
		var arrivalDate = Date.parse(htlivesight.Util.Parse("ArrivalDate", players[i]));
		if(arrivalDate > limitDate) continue;
		var trainerSkill = htlivesight.Util.Parse("TrainerSkill", players[i]);
		if(parseInt(trainerSkill) > 0) continue;
		$('#players').append('<option value="'+playerID+'" experience="'+experience+'" leadership="'+leadership+'">' + playerName + '</option><br>');
	}
	$("#progress").hide();
	$("#playersDiv").show();
}

//
$('#my-form-1').on('submit', function() {
	var exptolow = "Experience is too low!";
	futurecoach(exptolow);
	return false;
});

//

var names = [ 'non-existent', 'disastrous', 'wretched', 'poor', 'weak',
		'inadequate', 'passable', 'solid', 'excellent', 'formidable',
		'outstanding', 'brilliant', 'magnificent', 'world class',
		'supernatural', 'titanic', 'extra-terrestrial', 'mythical', 'magical',
		'utopian', 'divine' ];

$('#slider-experience').noUiSlider({
	connect : 'lower',
	start : [ $("#experience-value").val() ],
	step : 1,
	range : {
		'min' : [ 4 ],
		'max' : [ 20 ]
	},
	format : wNumb({
		decimals : 0
	})
});

$('#slider-experience').Link('lower').to($('#experience-value'));

$("#slider-experience").Link().to($("#experience"), function(value) {
	$(this).html(names[value]);
});

$('#slider-leadership').noUiSlider({
	connect : 'lower',
	start : [ $("#leadership-value").val() ],
	step : 1,
	range : {
		'min' : [ 3 ],
		'max' : [ 7 ]
	},
	format : wNumb({
		decimals : 0
	})
});

$('#slider-leadership').Link('lower').to($('#leadership-value'));

$("#slider-leadership").Link().to($("#leadership"), function(value) {
	$(this).html(names[value]);
});

$('#slider-coachlevel').noUiSlider({
	connect : 'lower',
	start : [ $("#coachlevel-value").val() ],
	step : 1,
	range : {
		'min' : [ 6 ],
		'max' : [ 8 ]
	},
	format : wNumb({
		decimals : 0
	})
});

$('#slider-coachlevel').Link('lower').to($('#coachlevel-value'));

$("#slider-coachlevel").Link().to($("#coachlevel"), function(value) {
	$(this).html(names[value]);
});

//

function getValue(value) {
	$("#progress").show();

	$.getJSON('/_jquerydownloaddata', {
		'name' : 'futurecoach',
		'team' : value.value
	},

	function(data) {

		$('#slider-experience').val(data.experience);
		$('#slider-leadership').val(data.leadership);

		$("#progress").hide();

	});

	return false;

};

