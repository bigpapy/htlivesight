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
////
$(document).ready(function(){
    $('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
    $('.collapsible').collapsible();
    $('ul.tabs').tabs();
	$('#addformation').click(addformation);
	$('#resetformation').click(resetformation);
	
	$('#teams').change(function getValue()  {
		$("#progress").show();
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
	
	$('#my-form-1').on('submit', function () {
		formationexperiencecalc();
		return false;
	});
});
////
var httpGet = function (teamId) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters = [["file","training"],["version", "2.2"],["teamId",teamId]];
	if(teamId){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){parseGet(xml,teamId);});
	}
};
var parseGet = function(xml,teamId){
	console.log(xml);
	var team = xml.getElementsByTagName("Team");
	var _442 = htlivesight.Util.Parse("Experience442", team[0]);
	var _433 = htlivesight.Util.Parse("Experience433", team[0]);
	var _451 = htlivesight.Util.Parse("Experience451", team[0]);
	var _352 = htlivesight.Util.Parse("Experience352", team[0]);
	var _532 = htlivesight.Util.Parse("Experience532", team[0]);
	var _343 = htlivesight.Util.Parse("Experience343", team[0]);
	var _541 = htlivesight.Util.Parse("Experience541", team[0]);
	var _523 = htlivesight.Util.Parse("Experience523", team[0]);
	var _550 = htlivesight.Util.Parse("Experience550", team[0]);
	var _253 = htlivesight.Util.Parse("Experience253", team[0]);
	$('#progressbar4-4-2').attr('value',_442).css('width', (parseInt(_442)/10)*100+'%').text(_442 + "/10");
	$('#progressbar4-3-3').attr('value',_433).css('width', (parseInt(_433)/10)*100+'%').text(_433 + "/10");
	$('#progressbar4-5-1').attr('value',_451).css('width', (parseInt(_451)/10)*100+'%').text(_451 + "/10");
	$('#progressbar3-5-2').attr('value',_352).css('width', (parseInt(_352)/10)*100+'%').text(_352 + "/10");
	$('#progressbar5-3-2').attr('value',_532).css('width', (parseInt(_532)/10)*100+'%').text(_532 + "/10");
	$('#progressbar3-4-3').attr('value',_343).css('width', (parseInt(_343)/10)*100+'%').text(_343 + "/10");
	$('#progressbar5-4-1').attr('value',_541).css('width', (parseInt(_541)/10)*100+'%').text(_541 + "/10");
	$('#progressbar5-2-3').attr('value',_523).css('width', (parseInt(_523)/10)*100+'%').text(_523 + "/10");
	$('#progressbar5-5-0').attr('value',_550).css('width', (parseInt(_550)/10)*100+'%').text(_550 + "/10");
	$('#progressbar2-5-3').attr('value',_253).css('width', (parseInt(_253)/10)*100+'%').text(_253 + "/10");
	$("#progress").hide();
	
}
////
function addformation(){
    var form = $('#addform :selected').text();
    var lvl = $('#addlevel').val();

    if ( lvl > 10.3 ) {
    	lvl = "10.3";
    } else if ( lvl < 3 ) {
    	lvl = "3";
    }

    var bar = document.getElementById('progressbar'+(form));
    bar.innerText = lvl.concat("/10");

    var m = lvl*10;
    var width = m + "%";
    
    bar.setAttribute("style","width:".concat(width));
    
    bar.setAttribute( "value", lvl );
}

function resetformation() {
	var lines = ["5-5-0", "5-4-1", "5-3-2", "5-2-3", "4-5-1", "4-4-2", "4-3-3", "3-5-2", "3-4-3", "2-5-3"];
	
	for (var i=0; i < lines.length; i++) {
		var bar = document.getElementById('progressbar'+lines[i]);
    	bar.innerText = "3/10";

   
    	bar.setAttribute("style","width: 30%");
    
    	bar.setAttribute( "value", "3" );
	}

    $('#teams')[0].selectedIndex = 0;;
}

function formationexperiencecalc() {
	var minutes = document.getElementsByName("minutes");
	var formations = document.getElementsByName("formation");

	var lines = ["5-5-0", "5-4-1", "5-3-2", "5-2-3", "4-5-1", "4-4-2", "4-3-3", "3-5-2", "3-4-3", "2-5-3"];
	result = {};

	for (var i=0; i < lines.length; i++) {
		var bar = document.getElementById('progressbar'+lines[i]);
		result[lines[i]] = parseFloat(bar.getAttribute( "value" ));

	}
	
	minut = [];
	for ( i = 0; i < minutes.length; i++ ){
		if ( minutes[i].value ) {
			v = minutes[i].value;
		} else {
			v = 0;
		}
		minut.push(parseInt(v));
	}

	formation = [];
	for ( j = 0; j < formations.length; j++ ){
		formation.push(formations[j].options[formations[j].selectedIndex].text);
	}


	if ( minut[3] === 0 && minut[4] === 0 && minut[5] === 0 ) {
        week = 0;
	}
    else if ( minut[6] === 0 && minut[7] === 0 && minut[8] === 0 ) {
        week = 1;
    }
    else if ( minut[9] === 0 && minut[10] === 0 && minut[11] === 0 ) {
        week = 2
    }
    else {
        week = 3;
    }

    var flag = 0;
    var end = minut.slice(0, week*3+3);

    for ( i = 0; i < end.length; i++ ) {

        if ( result[formation[i]] > 8 ) { 
            result[formation[i]] += minut[i]*1.35/90
        }

        else if ( (result[formation[i]] + minut[i]*2.7/90) > 8 && result[formation[i]] < 8 ) {
            x = (8-result[formation[i]])*90/2.7
            result[formation[i]] += x*2.7/90
            result[formation[i]] += (minut[i]-x)*1.35/90
        }
        else {
            result[formation[i]] += minut[i]*2.7/90
        }

        for ( var j in result ) {
            if ( result[j] < 3.5 ) {
                result[j] = 3
            }
            else if ( result[j] > 10.3 ) {
                result[j] = 10.3
            }
        }
      
        if ( flag === 2 || flag === 5 || flag === 8 || flag === 11 ) {
             for ( var j in result ) {
                if ( result[j] ===  3 ) {
                    continue;
                }
                else if ( result[j] < 8 ) {
                    result[j] -= 0.3
                }
                else {
                    result[j] -= 0.15
       			}		
       		}
    	}
        flag += 1

	}

	for (var i=0; i < lines.length; i++) {
		var bar = document.getElementById('progressbar'+lines[i]);
		lvl = result[lines[i]];

		bar.innerText = lvl.toFixed(1) + "/10";

    	var m = lvl*10;
    	var width = m + "%";
    
    	bar.setAttribute("style","width:".concat(width));
    
    	bar.setAttribute( "value", lvl );

	}
    
};