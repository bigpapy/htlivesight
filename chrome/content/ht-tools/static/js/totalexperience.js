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


function totalexperiencecalc(){

        var sumAttr1 = null;
        var bestProductName = null;
        var maxScorePart = null;

        $('input:checkbox:checked').each(function() {
          var experience = parseInt($(this).attr('experience'));
          sumAttr1 += experience;
        });

        $('input:checkbox:checked').each(function() {
            var experience = parseInt($(this).attr('experience'));
            var leadership = parseInt($(this).attr('leadership'));
            var currentScorePart = (sumAttr1 + experience) / 12 * (1 - (7 - leadership)/ 20);
            if(currentScorePart > maxScorePart) {
              maxScorePart = currentScorePart;
              bestProductName = $(this).attr('playername');
            }
        });

        var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
        tableobj.rows[0].cells[0].innerText = Math.round(maxScorePart * 100) / 100;
        tableobj.rows[0].cells[1].innerText = bestProductName;  

        return false;
}
////
$(document).ready(function(){
	$('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
	$('.collapsible').collapsible();
	$('ul.tabs').tabs();
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
});
////
$('#my-form-1').on('submit', function () {
    totalexperiencecalc();
    return false;
});
////

 ////
var httpGet = function (teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","players"],["version", "2.4"],["teamID",teamId]];
	if(teamId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){parseGet(xml,teamId);});
	}
};
var parseGet = function(xml,teamId){
	console.log(xml);
	var players = xml.getElementsByTagName("Player");
	for(i = 0; i < players.length; i++){
		console.log(i);
		console.log(players[i]);
		var playerName = htlivesight.Util.Parse("FirstName", players[i])+ " " + htlivesight.Util.Parse("LastName", players[i]);
		var playerID = htlivesight.Util.Parse("PlayerID", players[i]);
		var experience = htlivesight.Util.Parse("Experience", players[i]);
		var leadership = htlivesight.Util.Parse("Leadership", players[i]);
		$('#players').append('<input type="checkbox" id="'+playerID+'" name="'+playerID+'" experience="'+experience+'" leadership="'+leadership+'" playername="'+playerName+'"><label for="'+playerID+'">' + playerName + '</label><br>');
	}
	$("#progress").hide();
}