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

Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/(base ? log(base) : 1);
  };
})();

var trainingintensity = function() {

	var TIbefore = parseFloat(document.getElementById('TIbefore').value);
    var TSbefore = parseFloat(document.getElementById('TSbefore').value);
    var TIafter = parseFloat(document.getElementById('TIafter').value);
    var TSafter = parseFloat(document.getElementById('TSafter').value);

	if (document.getElementById('TIradio').checked) {

		TSafter = (TSbefore * Math.pow(1.2, Math.log(TIafter / TIbefore, 0.7))).toFixed(2);

		if (TSafter > 10) {
			TSafter = 10;
		}

	} else if (document.getElementById('TSradio').checked) {
		
		TIafter = Math.floor(TIbefore * Math.pow(TSafter / TSbefore, Math.log(0.7,1.2)));
	}


	var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    tableobj.rows[0].cells[1].innerHTML = TIbefore +"%";
    tableobj.rows[1].cells[1].innerHTML = TSbefore;
    tableobj.rows[2].cells[1].innerHTML = TIafter +"%";
    tableobj.rows[3].cells[1].innerHTML = TSafter;

}

// put trainingintensity.html inline js here

$(document).ready(function(){
    $('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
    $('.collapsible').collapsible();
    $('ul.tabs').tabs();
  });

$('#my-form-1').on('submit', function () {
    trainingintensity();
    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    TSbefore = parseInt(tableobj.rows[1].cells[1].innerHTML).toString();
    TSafter = parseInt(tableobj.rows[3].cells[1].innerHTML).toString();
    //var spirit = jQuery.parseJSON({{htlang['spirit']|safe|tojson}});
	var spirit = ['like the Cold War','murderous','furious','irritated','composed','calm','content','satisfied','delirious','walking on clouds','Paradise on Earth!'];

    tableobj.rows[1].cells[1].innerHTML = tableobj.rows[1].cells[1].innerHTML + " (" + spirit[TSbefore] + ")";
    tableobj.rows[3].cells[1].innerHTML = tableobj.rows[3].cells[1].innerHTML + " (" + spirit[TSafter] + ")";
    return false;
});