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


var basic_wage_for_skill = function(keeper,defending,playmaking,winger,passing,scoring) {
    
    if ( keeper < 14.27697) {
        keeper = Math.max((((Math.exp(((Math.max(keeper,1)-1)*0.352008))*130.8)+84.18)-250),0)
    } else {
        keeper = (((Math.exp(((Math.max(keeper,1)-1)*0.247734))*635)-11818.37)-250)
    }

    defending = Math.pow(Math.max(defending,1)-1,6.4)*0.00083;
    if ( defending > 20000 ) {
        defending = defending - (0.2*(defending-20000))
    }
            
    playmaking = Math.pow(Math.max(playmaking,1)-1,6.4)*0.00104
    if ( playmaking > 20000 ) {
        playmaking = playmaking - (0.2*(playmaking-20000)) 
    }
            
    winger = Math.pow(Math.max(winger,1)-1,6.4)*0.000525
    if ( winger > 20000 ) {
        winger = winger - (0.2*(winger-20000))    
    }
            
    passing = Math.pow(Math.max(passing,1)-1,6.4)*0.000595
    if ( passing > 20000 ) {
        passing = passing - (0.2*(passing-20000))
    }
     
    scoring = Math.pow(Math.max(scoring,1)-1,6.4)*0.000935
    if ( scoring > 20000 ) {
        scoring = scoring - (0.2*(scoring-20000))
    }
    
    return [keeper,defending,playmaking,winger,passing,scoring]
}

var sum = function(array) {
    var count=0;
    for (var i=array.length; i--;) {
        count+=array[i];
    }
    
    return count
}
        

var maxofdictionary = function(dic) {
    mainskill_n = "Keeper";
    mainskill_l = dic["Keeper"];

    for ( i in dic ) {
        if ( dic[i] > mainskill_l ) {
            mainskill_n = i;
            mainskill_l = dic[i]
        }
    }

    return mainskill_n
}

var subskillcalc = function() {

    wage = parseInt(document.getElementById('wage').value);
    age = parseInt(document.getElementById('age-value').value);

    keeper = parseInt(document.getElementById('keeper-value').value);
    defending = parseInt(document.getElementById('defending-value').value);
    playmaking = parseInt(document.getElementById('playmaking-value').value);
    passing = parseInt(document.getElementById('passing-value').value);
    winger = parseInt(document.getElementById('winger-value').value);
    scoring = parseInt(document.getElementById('scoring-value').value);
    setpieces = parseInt(document.getElementById('setpieces-value').value);

    skills = {"Keeper":keeper,"Defender":defending,"Playmaker":playmaking,"Passer":passing,"Winger":winger,"Scorer":scoring}

    mainskill = maxofdictionary(skills)

    var w = basic_wage_for_skill(keeper,defending,playmaking,winger,passing,scoring);
    var keeper_w = w[0];
    var defending_w = w[1];
    var playmaking_w = w[2];
    var winger_w = w[3];
    var passing_w = w[4];
    var scoring_w = w[5];

    wages = [keeper_w,defending_w,playmaking_w,winger_w,passing_w,scoring_w]

    if ( age > 28 ){
        main_wage = ((((wage-250)*10.0)/Math.max(1,(38-age)))/(1+(0.05*Math.max((setpieces-1),0))/19.0))-(sum(wages)/2.0)+Math.max(wages)/2.0
    } else {
        main_wage = (wage - 250)/((1+(0.05*Math.max((setpieces-1),0))/19.0)) - (sum([keeper_w,defending_w,playmaking_w,winger_w,passing_w,scoring_w])/2.0)+Math.max(keeper_w,defending_w,playmaking_w,winger_w,passing_w,scoring_w)/2.0
    }
       
    if ( mainskill === "Keeper" ) {
        if ( main_wage > 20000 ) {
            sublevel = (Math.log((((main_wage+250)+1818.37)/635.0))/0.247734)+1
        } else {
            sublevel = (Math.log((((main_wage+250)-84.18)/130.8))/0.352008)+1
        }
    }
    if ( mainskill === "Defender" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.00083),(1/6.4))+1)
    }
    if ( mainskill === "Playmaker" ){
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.00104),(1/6.4))+1)
    }
    if ( mainskill === "Scorer" ){
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.000935),(1/6.4))+1)
    }
    if ( mainskill === "Winger" ){
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.000525),(1/6.4))+1)
    }
    if ( mainskill == "Passer" ) {
        sublevel = (Math.pow(((Math.min(main_wage,20000)+Math.max(((main_wage-20000)/0.8),0))/0.000605),(1/6.4))+1)
    }

    

    var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
    tableobj.rows[0].cells[0].innerHTML = mainskill;
    tableobj.rows[0].cells[1].innerHTML = sublevel.toFixed(2);
}

// put subskill.html inline js here:


$(document).ready(function(){
  $('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
  $('.collapsible').collapsible();
  $('ul.tabs').tabs();
});

//

$('#my-form').on('submit', function () {
subskillcalc();
var tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
if ( tableobj.rows[0].cells[0].innerHTML !== "" ) {
  var mainskill = tableobj.rows[0].cells[0].innerHTML;
  //var skills = {{htlang["skills"]|tojson|safe}};
  var keeper = parseInt(document.getElementById('keeper-value').value);
  var defending = parseInt(document.getElementById('defending-value').value);
  var playmaking = parseInt(document.getElementById('playmaking-value').value);
  var passing = parseInt(document.getElementById('passing-value').value);
  var winger = parseInt(document.getElementById('winger-value').value);
  var scoring = parseInt(document.getElementById('scoring-value').value);
  var setpieces = parseInt(document.getElementById('setpieces-value').value);
  var skills = {"Keeper": keeper,"Defender":defending,"Playmaker":playmaking,"Passer":passing,"Winger":winger,"Scorer":scoring}
  tableobj.rows[0].cells[0].innerHTML = skills[mainskill];
}
return false;
});

//

var names = ['non-existent','disastrous','wretched','poor','weak','inadequate','passable','solid','excellent','formidable','outstanding','brilliant','magnificent','world class','supernatural','titanic','extra-terrestrial','mythical','magical','utopian','divine'];


$('#slider-age').noUiSlider({
connect: 'lower',
start: [ $('age-value').val() ],
step: 1,
range: {
'min': [  17 ],
'max': [ 38 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-age').Link('lower').to($('#age-value'));  

$('#slider-keeper').noUiSlider({
connect: 'lower',
start: [ $('keeper-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-keeper').Link('lower').to($('#keeper-value'));

$('#slider-defending').noUiSlider({
connect: 'lower',
start: [ $('defending-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-defending').Link('lower').to($('#defending-value'));

$('#slider-playmaking').noUiSlider({
connect: 'lower',
start: [ $('playmaking-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-playmaking').Link('lower').to($('#playmaking-value'));

$('#slider-winger').noUiSlider({
connect: 'lower',
start: [ $('winger-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-winger').Link('lower').to($('#winger-value')); 

$('#slider-passing').noUiSlider({
connect: 'lower',
start: [ $('passing-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-passing').Link('lower').to($('#passing-value')); 

$('#slider-scoring').noUiSlider({
connect: 'lower',
start: [ $('scoring-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-scoring').Link('lower').to($('#scoring-value')); 

$('#slider-setpieces').noUiSlider({
connect: 'lower',
start: [ $('setpieces-value').val()  ],
step: 1,
range: {
'min': [  0 ],
'max': [ 20 ]
},
format: wNumb({
decimals: 0
})
});    

$('#slider-setpieces').Link('lower').to($('#setpieces-value')); 


$( "#slider-keeper" ).Link().to($( "#keeperval" ), function ( value ) {
$(this).html(names[value]);
});

$( "#slider-defending" ).Link().to($( "#defendingval" ), function ( value ) {
$(this).html(names[value]);
});

$( "#slider-playmaking" ).Link().to($( "#playmakingval" ), function ( value ) {
$(this).html(names[value]);
});

$( "#slider-winger" ).Link().to($( "#wingerval" ), function ( value ) {
$(this).html(names[value]);
});

$( "#slider-passing" ).Link().to($( "#passingval" ), function ( value ) {
$(this).html(names[value]);
});

$( "#slider-scoring" ).Link().to($( "#scoringval" ), function ( value ) {
$(this).html(names[value]);
});

$( "#slider-setpieces" ).Link().to($( "#setpiecesval" ), function ( value ) {
$(this).html(names[value]);
});

//

   function getValue(value)  {
       $("#progress").show();

       $.getJSON('/_jquerydownloaddata', 
       {'name':'subskill','team':value.value}
       ,

       function(data) {

          $('#slider-age').val(data.age);
          
          $('#slider-keeper').val(data.keeper);

          $('#slider-defending').val(data.defending);

          $('#slider-playmaking').val(data.playmaking);
          
          $('#slider-winger').val(data.winger);

          $('#slider-passing').val(data.passing);

          $('#slider-scoring').val(data.scoring);
          
          $('#slider-setpieces').val(data.setpieces);

          $('#wage').val(data.wage);
          $('#wage').focus();

          $("#progress").hide();

       });

      return false

     };
