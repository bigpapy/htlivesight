if (!htlivesight) var htlivesight = {};

htlivesight.WorldDetails = {};

htlivesight.WorldDetails.getWorldDetails = function () {
	var parameters=[["file","worlddetails"],
	                ["version", "1.8"]];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.WorldDetails.ParseGet(xml);});
};

htlivesight.WorldDetails.ParseGet = function(xml) {
	let leagues = [];
	let weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	if (xml) {
		leaguesNode = xml.getElementsByTagName("League");
		for(let i = 0; i< leaguesNode.length; i++){
			leagues[i] = {};
			leagues[i].country = htlivesight.Util.Parse("LeagueName", leaguesNode[i]);
			leagues[i].training = htlivesight.Util.Parse("TrainingDate", leaguesNode[i]);
			leagues[i].economy = htlivesight.Util.Parse("EconomyDate", leaguesNode[i]);
			leagues[i].series = htlivesight.Util.Parse("SeriesMatchDate", leaguesNode[i]);
			leagues[i].cup = htlivesight.Util.Parse("CupMatchDate", leaguesNode[i]);
			$('#resultstable > tbody:last-child').append('<tr><td>'+leagues[i].country+'</td>'+
															'<td data-sort="'+leagues[i].training+'">' + weekday[new Date(leagues[i].training).getDay()] + ' ' +leagues[i].training.split(" ")[1].slice(0,-3) + '</td>'+
															'<td data-sort="'+leagues[i].economy+'">' + weekday[new Date(leagues[i].economy).getDay()] + ' ' +leagues[i].economy.split(" ")[1].slice(0,-3) + '</td>'+
															'<td data-sort="'+leagues[i].series+'">' + weekday[new Date(leagues[i].series).getDay()] + ' ' +leagues[i].series.split(" ")[1].slice(0,-3) + '</td>'+
															'<td data-sort="'+leagues[i].cup+'">' + weekday[new Date(leagues[i].cup).getDay()] + ' ' +leagues[i].cup.split(" ")[1].slice(0,-3) + '</td>'+
															'</tr>');
		}
		
	}
	$('#resultstable').DataTable({paging: false});
	//return leagues;
}

$(document).ready(function(){
	  $('.button-collapse').sideNav({menuWidth: 340, activationWidth: 70, edge: 'right'});
	  $('.collapsible').collapsible();
	  $('ul.tabs').tabs();
	  htlivesight.generateFromSeed();
	  htlivesight.prefs=htlivesight.Preferences.get();
	  htlivesight.url=htlivesightEnv.contentPath+"locale/"+ htlivesight.prefs.language.locale +".xml";
      htlivesight.loadXml(htlivesight.url, function(xml, status){
		if(status != 200){return}
		var data=xml.getElementsByTagName("Htlivesight");
		htlivesight.data=data;
	    htlivesight.WorldDetails.getWorldDetails();
	 });
	});

