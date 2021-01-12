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


	var trainingcalc = function(strtotalweeks, chooseaskill) {

		//coefficients arrays

		var skillvalues = {
			'GK': 0.335,
			'Def': 0.206,
			'DefPos': 0.094,
			'Cross': 0.315,
			'Cross 50%': 0.1575,
			'WingAtt': 0.219,
			'PM': 0.22,
			'PM 50%': 0.11,
			'Sco': 0.218,
			'Shoot': 0.097,
			"Pass": 0.237,
			'ThPass': 0.178,
			"SP": 0.941,
			"SP 25%": 1.183
		};
		var agekoef = [1, 0.982, 0.963, 0.946, 0.928, 0.911, 0.894, 0.877, 0.861, 0.845, 0.830, 0.814, 0.799, 0.784, 0.770, 0.756, 0.742, 0.728];
		//var assistkoef = [0.66, 0.692, 0.724, 0.756, 0.788, 0.82, 0.852, 0.884, 0.916, 0.948, 0.98, 1.012, 1.044, 1.076, 1.108, 1.14];
		var assistkoef = [0.660, 0.695, 0.730, 0.765, 0.800, 0.835, 0.870, 0.905, 0.940, 0.975, 1.010];
		var coachkoef = [0, 0, 0, 0, 0.774, 0.867, 0.9430, 1, 1.045];
		var agetable = [0.000, 16.000, 31.704, 47.117, 62.246, 77.094, 91.668, 105.972, 120.012, 133.791, 147.316, 160.591, 173.620, 186.408, 198.960, 211.279, 223.370, 235.238];

		//retrieve inputs from HTML form and parse them as integers
		var years = parseInt(document.getElementById('years-value').value);
		var days = parseInt(document.getElementById('days-value').value);
		var skilllevel = parseInt(document.getElementById('skilllevel-value').value);
		var subskill = parseInt(document.getElementById('subskill-value').value);
		var coachlevel = parseInt(document.getElementById('coachlevel-value').value);
		var assistants = parseInt(document.getElementById('assistantslevel-value').value);
		var intensity = parseInt(document.getElementById('trainingintensity-value').value);
		var stamina = parseInt(document.getElementById('staminashare-value').value);
		var dropdown = document.getElementById('skill');
		var skill = dropdown.options[dropdown.selectedIndex].value;
		if (skill === "") {
			toast("No skill selected!", 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
			return;
		}

		//set personal parameters through coefficients
		var coachK = coachkoef[coachlevel];
		var assistK = assistkoef[assistants];
		var intensK = intensity / 100.0;
		var staminaK = (100 - stamina) / 100.0;
		var trainK = skillvalues[skill];
		var totalK = coachK * assistK * intensK * staminaK * trainK;

		//initialize parameters
		var level = skilllevel;
		var sublevel = subskill / 100;
		var years0 = agetable[years - 17];
		var years1 = agetable[years - 16];
		var age0 = (days / 112) * (years1 - years0) + years0;
		var skill0lost = Math.pow(6.0896 * totalK, 1 / 0.72);
		var ageee = years * 1 + days / 112;
		var shtraf = 0;
		var oldweek = years * 112 + days * 1;
		var drop = 0;
		var age1 = years * 1 + days / 112;
		var age1old = 0;
		var ageold = 0;

		//start calculation
		var results = [];
		var startpoint = skilllevel + 1;
		for (lev = startpoint; lev < 21; lev++) {
			if (lev < 9) {
				xxx1 = (Math.pow(lev, 1.72) - 1) * (1 / 6.0896 / 1.72);
			} else {
				xxx1 = 2.45426 + (1 / 4.7371 / 1.96) * Math.pow(lev - 5, 1.96);
			}

			if (level < 9) {
				yyy1 = (Math.pow(level + sublevel, 1.72) - 1) * (1 / 6.0896 / 1.72);
			} else {
				yyy1 = 2.45426 + Math.pow(level + sublevel - 5, 1.96) * (1 / 4.7371 / 1.96);
			}

			xxx = (xxx1 - yyy1) / totalK + age0;

			for (i = 17; i < 35; i++) {
				if (xxx <= agetable[i - 17]) {
					break
				}
			}

			agge = i - 1;
			stolH = agetable[agge - 17];
			stolI = agetable[agge - 16];
			ageeeold = ageee;
			ageee = agge + (xxx - stolH) / (stolI - stolH);

			if (lev > (level + sublevel + 1)) {
				sh = 1;
				shtrafx = 1 / 16 - ageee + ageeeold;
				if (shtrafx > 0) {
					shtraf = shtraf + shtrafx;
				}
			} else {
				sh = 2;
				shtrafx = (1 / 16 - ageee + years * 1 + days / 112) * (lev - (level + sublevel));
				if (shtrafx > 0) {
					shtraf = shtraf + shtrafx;
				}
			}
			if (lev > 15) {
				drop = Math.pow(lev, 7.5) * 8 / Math.pow(10, 12);
			} else {
				drop = 0;
			}

			if (lev <= 15) {
				age1 = ageee;
			}

			if (lev > 15) {
				age1 = age1 + (ageee - ageeeold) / (1 - drop * (ageee - ageeeold) * 16);
			}

			resyears = Math.floor(age1 + shtraf + 0.0089);
			resdays = Math.floor((age1 + shtraf - resyears + 0.0089) * 112);
			weekss = ((resyears * 112 + resdays) - (oldweek)) / 7;
			oldweek = resyears * 112 + resdays;

			if (resdays < 10) {
				resdays = '0' + resdays;
			}
			if (resyears > 31) {
				break;
			}


			results.push([lev, weekss.toFixed(1), resyears + "." + resdays]);
		}

		//create table with results
		$("#resultstable tbody tr").remove();
		var table = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
		var totalweeks = 0;
		for (i = 0; i < results.length; i++) {

			totalweeks += parseFloat(results[i][1]);
			var tr = document.createElement('tr');
			tr.setAttribute("class", "tooltipped");
			tr.setAttribute("data-position", "top");
			tr.setAttribute("data-tooltip", strtotalweeks+": " + totalweeks.toFixed(1));

			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');

			var text1 = document.createTextNode(results[i][0]);
			var text2 = document.createTextNode(results[i][1]);
			var text3 = document.createTextNode(results[i][2]);

			td1.appendChild(text1);
			td2.appendChild(text2);
			td3.appendChild(text3);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);

			table.appendChild(tr);
		}

		$('.tooltipped').tooltip();
	}

	// put training.html js inline here:

	$(document).ready(function(){
	  $('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
	  $('.collapsible').collapsible();
	  $('ul.tabs').tabs();
	});

	//

	$('#my-form').on('submit', function () {
	var totalweeks = "{{pagestr['totalweeks']|safe}}";
		var chooseaskill = $("#skill").val();
	trainingcalc(totalweeks, chooseaskill);
	return false;
	});

	//

	var names = ['non-existent','disastrous','wretched','poor','weak','inadequate','passable','solid','excellent','formidable','outstanding','brilliant','magnificent','world class','supernatural','titanic','extra-terrestrial','mythical','magical','utopian','divine'];


	$('#slider-years').noUiSlider({
	connect: 'lower',
	start: [ $("#years-value").val() ],
	step: 1,
	range: {
	'min': [  17 ],
	'max': [ 30 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-years').Link('lower').to($('#years-value'));  

	$('#slider-days').noUiSlider({
	connect: 'lower',
	start: [ $("#days-value").val() ],
	step: 1,
	range: {
	'min': [  0],
	'max': [ 111 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-days').Link('lower').to($('#days-value'));  

	$('#slider-skilllevel').noUiSlider({
	connect: 'lower',
	start: [ $("#skilllevel-value").val() ],
	step: 1,
	range: {
	'min': [  1 ],
	'max': [ 20 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-skilllevel').Link('lower').to($('#skilllevel-value'));  

	$('#slider-subskill').noUiSlider({
	connect: 'lower',
	start: [ $("#subskill-value").val() ],
	step: 1,
	range: {
	'min': [  0 ],
	'max': [ 100 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-subskill').Link('lower').to($('#subskill-value'));  

	$('#slider-coachlevel').noUiSlider({
	connect: 'lower',
	start: [ $("#coachlevel-value").val() ],
	step: 1,
	range: {
	'min': [  4 ],
	'max': [ 8 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-coachlevel').Link('lower').to($('#coachlevel-value'));


	$('#slider-assistants').noUiSlider({
	connect: 'lower',
	start: [ $("#assistantslevel-value").val()  ],
	step: 1,
	range: {
	'min': [  0 ],
	'max': [ 10 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-assistants').Link('lower').to($('#assistantslevel-value'));  

	$('#slider-intensity').noUiSlider({
	connect: 'lower',
	start: [ $("#trainingintensity-value").val()  ],
	step: 1,
	range: {
	'min': [  1 ],
	'max': [ 100 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-intensity').Link('lower').to($('#trainingintensity-value'));  

	$('#slider-stamina').noUiSlider({
	connect: 'lower',
	start: [ $("#staminashare-value").val()  ],
	step: 1,
	range: {
	'min': [ 10],
	'max': [ 100 ]
	},
	format: wNumb({
	decimals: 0
	})
	});    

	$('#slider-stamina').Link('lower').to($('#staminashare-value'));  


	$( "#slider-skilllevel" ).Link().to($( "#skilllevelval" ), function ( value ) {
	$(this).html(names[value]);
	});

	$( "#slider-coachlevel" ).Link().to($( "#coachlevelval" ), function ( value ) {
	$(this).html(names[value]);
	});


