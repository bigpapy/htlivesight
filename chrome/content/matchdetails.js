/* ---------------------------------------------------------------- * Get match by team id data * ---------------------------------------------------------------- */htlivesight.matchDetails=  {};htlivesight.matchDetails.arena = function(id, name, weatherId, sold ) {	this.id = id;	this.name = name;	this.weatherId = weatherId;	this.sold = sold;};
htlivesight.matchDetails.myArena = function(total, terraces, basic, roof, vip) {	this.total = total;	this.terraces = terraces;	this.basic = basic;	this.roof = roof;	this.vip = vip;};htlivesight.matchDetails.view= function(){	for (var key in htlivesight.Match.List) {		var match=htlivesight.Match.List[key];		if (match.isFinish === true && match.isRatingLoaded !== true){			try{				htlivesight.matchDetails.HTTPGet(match);				//var popup=document.getElementById("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");				var l1 = document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem);				//l1.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");				l1.addEventListener("onclick",function(){htlivesight.DOM.statisticspopup(this.id);});				//l1.href="";				l1.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});				l1.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});				l1.setAttribute("title", htlivesight.Util.Parse("StatisticTip", htlivesight.data[0]));				//l1.style.textDecoration = 'underline';				l1.setAttribute('class','underlined');				l1.style.cursor="pointer";				$( "#home_team_name_" + match.id + "_" + match.sourceSystem).effect("pulsate","swing", 400);				//popup=document.getElementById("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");				var l1 = document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem);				//l1.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");				l1.addEventListener("onclick",function(){htlivesight.DOM.statisticspopup(this.id);});				l1.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});				l1.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});				l1.setAttribute("title", htlivesight.Util.Parse("StatisticTip", htlivesight.data[0]));				l1.setAttribute('class','underlined');				l1.style.cursor="pointer";				$( "#away_team_name_" + match.id + "_" + match.sourceSystem).effect("pulsate","swing", 400);				htlivesight.Match.List[key].isRatingLoaded= true;			}catch(e){console.log("htlivesight.matchDetails.view "+e);};		};	};};htlivesight.matchDetails.HTTPGet = function (match) {	var parameters=[["file","matchdetails"],	                ["version", "2.3"],	                ["matchEvents","false"],	                ["matchID",match.id],	                ["sourceSystem",match.sourceSystem],	                ];	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchDetails.ParseGet(xml,match);});};htlivesight.matchDetails.HTTPGetArena = function (arenaID, teamID) {	var parameters=[["file","arenadetails"],	                ["version", "1.5"],	                ["arenaID", ""+arenaID]];	//console.log("arenaID=" + arenaID);	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchDetails.ParseGetArenaDetails(xml,arenaID, teamID);});};htlivesight.matchDetails.ParseGetArenaDetails= function(xml,arenaID, teamID){	try {		var total = htlivesight.Util.Parse("Total", xml); //		var terraces = htlivesight.Util.Parse("Terraces", xml);		var basic = htlivesight.Util.Parse("Basic", xml);		var roof = htlivesight.Util.Parse("Roof", xml);		var vip = htlivesight.Util.Parse("VIP", xml);		if(teamID == htlivesight.Teams.myTeam.id){		  htlivesight.myFirstTeamArena = new htlivesight.matchDetails.myArena(total, terraces, basic, roof, vip);		  htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_STADIUM2);		}		if(htlivesight.Teams.mySecondTeam && (teamID == htlivesight.Teams.mySecondTeam.id)){		  htlivesight.mySecondTeamArena = new htlivesight.matchDetails.myArena(total, terraces, basic, roof, vip);		  htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);		}	}catch(e){		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);		alert("matchDetails.ParseGetArenaDetails: "+e);};};
htlivesight.matchDetails.ParseGet = function(xml, match) {	try {		var arenaDetails = xml.getElementsByTagName("Arena")[0]; //		var homeDetails = xml.getElementsByTagName("HomeTeam")[0];		var awayDetails = xml.getElementsByTagName("AwayTeam")[0];		var popup=document.getElementById("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");		htlivesight.matchDetails.parseRatings(homeDetails, awayDetails, popup);		if(match.sourceSystem.toLowerCase() != "youth") htlivesight.matchDetails.parseSold(arenaDetails, popup, match);		var popup=document.getElementById("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");		htlivesight.matchDetails.parseRatings(awayDetails, homeDetails, popup);	} catch(e) {		console.log("Parse htlivesight.MatchDetails: " + e);	};};htlivesight.matchDetails.parseRatings = function(xml, xmlOpp, popup) {	try{		var fragment = document.createDocumentFragment();		var team = new Object();		var TacticType= htlivesight.Util.Parse("TacticType", xml);		team.tacticType = htlivesight.matchDetails.parserTacticType(htlivesight.Util.Parse("TacticType", xml));		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TacticType",htlivesight.data[0]), team.tacticType, fragment);		team.tacticSkill = ""+(parseInt(htlivesight.Util.Parse("TacticSkill", xml))-1);		var textRating=htlivesight.matchDetails.parserMainSkill(team.tacticSkill);		if (TacticType == "0") textRating ="";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TacticSkill",htlivesight.data[0]), textRating, fragment);		team.ratingMidfield = htlivesight.Util.Parse("RatingMidfield", xml);		team.ratingMidfieldOpp = htlivesight.Util.Parse("RatingMidfield", xmlOpp);		var rate = Math.round(parseInt(team.ratingMidfield)/(parseInt(team.ratingMidfield)+ parseInt(team.ratingMidfieldOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingMidfield)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Midfield",htlivesight.data[0]), textRating, fragment);		team.ratingRightDef = htlivesight.Util.Parse("RatingRightDef", xml);		team.ratingLeftAttOpp = htlivesight.Util.Parse("RatingLeftAtt", xmlOpp);		rate = Math.round(parseInt(team.ratingRightDef)/(parseInt(team.ratingRightDef)+ parseInt(team.ratingLeftAttOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingRightDef)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("RightDefence",htlivesight.data[0]), textRating, fragment);		team.ratingMidDef = htlivesight.Util.Parse("RatingMidDef", xml);		team.ratingMidAttOpp = htlivesight.Util.Parse("RatingMidAtt", xmlOpp);		rate = Math.round(parseInt(team.ratingMidDef)/(parseInt(team.ratingMidDef)+ parseInt(team.ratingMidAttOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingMidDef)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("MiddleDefence",htlivesight.data[0]), textRating, fragment);		team.ratingLeftDef = htlivesight.Util.Parse("RatingLeftDef", xml);		team.ratingRightAttOpp = htlivesight.Util.Parse("RatingRightAtt", xmlOpp);		rate = Math.round(parseInt(team.ratingLeftDef)/(parseInt(team.ratingLeftDef)+ parseInt(team.ratingRightAttOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingLeftDef)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("LeftDefence",htlivesight.data[0]), textRating, fragment);		team.ratingRightAtt = htlivesight.Util.Parse("RatingRightAtt", xml);		team.ratingLeftDefOpp = htlivesight.Util.Parse("RatingLeftDef", xmlOpp);		rate = Math.round(parseInt(team.ratingRightAtt)/(parseInt(team.ratingRightAtt)+ parseInt(team.ratingLeftDefOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingRightAtt)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("RightAttack",htlivesight.data[0]), textRating, fragment);		team.ratingMidAtt = htlivesight.Util.Parse("RatingMidAtt", xml);		team.ratingMidDefOpp = htlivesight.Util.Parse("RatingMidDef", xmlOpp);		rate = Math.round(parseInt(team.ratingMidAtt)/(parseInt(team.ratingMidAtt)+ parseInt(team.ratingMidDefOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingMidAtt)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("MiddleAttack",htlivesight.data[0]), textRating, fragment);		team.ratingLeftAtt = htlivesight.Util.Parse("RatingLeftAtt", xml);		team.ratingRightDefOpp = htlivesight.Util.Parse("RatingRightDef", xmlOpp);		rate = Math.round(parseInt(team.ratingLeftAtt)/(parseInt(team.ratingLeftAtt)+ parseInt(team.ratingRightDefOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingLeftAtt)+" "+ rate + "%";		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("LeftAttack",htlivesight.data[0]), textRating, fragment);		team.teamAttitude = htlivesight.matchDetails.parserTacticAttitude(htlivesight.Util.Parse("TeamAttitude", xml));		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TeamAttitude",htlivesight.data[0]), team.teamAttitude, fragment);		team.ratingIndirectSetPiecesDef = htlivesight.Util.Parse("RatingIndirectSetPiecesDef", xml);		team.ratingIndirectSetPiecesAttOpp = htlivesight.Util.Parse("RatingIndirectSetPiecesAtt", xmlOpp);		rate = Math.round(parseInt(team.ratingIndirectSetPiecesDef)/(parseInt(team.ratingIndirectSetPiecesDef)+ parseInt(team.ratingIndirectSetPiecesAttOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingIndirectSetPiecesDef)+" "+ rate + "%";		if (!isNaN(rate)) htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("IndirectSetPiecesDefence",htlivesight.data[0]), textRating, fragment);		team.ratingIndirectSetPiecesAtt = htlivesight.Util.Parse("RatingIndirectSetPiecesAtt", xml);		team.ratingIndirectSetPiecesDefOpp = htlivesight.Util.Parse("RatingIndirectSetPiecesDef", xmlOpp);		rate = Math.round(parseInt(team.ratingIndirectSetPiecesAtt)/(parseInt(team.ratingIndirectSetPiecesAtt)+ parseInt(team.ratingIndirectSetPiecesDefOpp))*100);		textRating=htlivesight.matchDetails.parserRating(team.ratingIndirectSetPiecesAtt)+" "+ rate + "%";		if (!isNaN(rate)) htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("IndirectSetPiecesAttack",htlivesight.data[0]), textRating, fragment);				team.ratingDef=parseInt(team.ratingRightDef)+parseInt(team.ratingMidDef)+parseInt(team.ratingLeftDef);		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("DefHatStats",htlivesight.data[0]), team.ratingDef, fragment);				team.ratingMid=3*team.ratingMidfield;		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("MidHatStats",htlivesight.data[0]), team.ratingMid, fragment);				team.ratingAtt=parseInt(team.ratingRightAtt)+parseInt(team.ratingMidAtt)+parseInt(team.ratingLeftAtt);		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("AttHatStats",htlivesight.data[0]), team.ratingAtt, fragment);				team.rating=team.ratingDef+team.ratingMid+team.ratingAtt;		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TotHatStats",htlivesight.data[0]), team.rating, fragment);				team.loddarstatsDef=2*(team.ratingRightDef)/((team.ratingRightDef)+80)+2*(team.ratingMidDef)/((team.ratingMidDef)+80)+2*(team.ratingLeftDef)/((team.ratingLeftDef)+80);		team.loddarstatsAtt=2*(team.ratingRightAtt)/((team.ratingRightAtt)+80)+2*(team.ratingMidAtt)/((team.ratingMidAtt)+80)+2*(team.ratingLeftAtt)/((team.ratingLeftAtt)+80);		team.loddarstatsMid=2*(team.ratingMidfield)/((team.ratingMidfield)+80);		team.loddarstats=team.loddarstatsMid*(team.loddarstatsAtt+team.loddarstatsDef);		popup.appendChild(fragment);			}catch(e){console.log("htlivesight.matchDetails.parseRatings= "+e);}};htlivesight.matchDetails.parseSold = function(xml, popup, match){	try{		var arena = new Object();		arena.id = htlivesight.Util.Parse("ArenaID", xml);		//console.log(arena.id);		arena.soldTotal = htlivesight.Util.Parse("SoldTotal", xml);		arena.soldTerraces = htlivesight.Util.Parse("SoldTerraces", xml);		arena.soldBasic = htlivesight.Util.Parse("SoldBasic", xml);		arena.soldRoof = htlivesight.Util.Parse("SoldRoof", xml);		arena.soldVIP = htlivesight.Util.Parse("SoldVIP", xml);		if ((arena.soldTotal!= null) && (arena.soldTerraces!= null)){		    var soldTotalPercent = 0;			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){				soldTotalPercent= Math.round(parseInt(arena.soldTotal)/(parseInt(htlivesight.myFirstTeamArena.total))*1000)/10;			  arena.soldTotal= arena.soldTotal+" / "+ htlivesight.myFirstTeamArena.total + "  " + soldTotalPercent + "%";			}			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){			    	soldTotalPercent= Math.round(parseInt(arena.soldTotal)/(parseInt(htlivesight.mySecondTeamArena.total))*1000)/10;				arena.soldTotal= arena.soldTotal+" / "+ htlivesight.mySecondTeamArena.total + "  " + soldTotalPercent + "%";				}			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Total",htlivesight.data[0]), arena.soldTotal, popup);		}		if (arena.soldTerraces!= null){		    var soldTerracesPercent = 0;			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){				soldTerracesPercent= Math.round(parseInt(arena.soldTerraces)/parseInt(htlivesight.myFirstTeamArena.terraces)*1000)/10;				arena.soldTerraces= arena.soldTerraces+" / "+ htlivesight.myFirstTeamArena.terraces + "  " + soldTerracesPercent + "%";			}			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){				soldTerracesPercent= Math.round(parseInt(arena.soldTerraces)/parseInt(htlivesight.mySecondTeamArena.terraces)*1000)/10;				arena.soldTerraces= arena.soldTerraces+" / "+ htlivesight.mySecondTeamArena.terraces + "  " + soldTerracesPercent + "%";			}			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Terraces",htlivesight.data[0]), arena.soldTerraces, popup);		}		if (arena.soldBasic!= null){		    var soldBasicPercent = 0;			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){				soldBasicPercent= Math.round(parseInt(arena.soldBasic)/parseInt(htlivesight.myFirstTeamArena.basic)*1000)/10;				arena.soldBasic= arena.soldBasic+" / "+ htlivesight.myFirstTeamArena.basic + "  " + soldBasicPercent + "%";			}			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){				soldBasicPercent= Math.round(parseInt(arena.soldBasic)/parseInt(htlivesight.mySecondTeamArena.basic)*1000)/10;				arena.soldBasic= arena.soldBasic+" / "+ htlivesight.mySecondTeamArena.basic + "  " + soldBasicPercent + "%";			}			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Basic",htlivesight.data[0]), arena.soldBasic, popup);		}		if (arena.soldRoof!= null){		    var soldRoofPercent = 0;			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){				soldRoofPercent= Math.round(parseInt(arena.soldRoof)/parseInt(htlivesight.myFirstTeamArena.roof)*1000)/10;				arena.soldRoof= arena.soldRoof+" / "+ htlivesight.myFirstTeamArena.roof + "  " + soldRoofPercent + "%";			}			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){				soldRoofPercent= Math.round(parseInt(arena.soldRoof)/parseInt(htlivesight.mySecondTeamArena.roof)*1000)/10;				arena.soldRoof= arena.soldRoof+" / "+ htlivesight.mySecondTeamArena.roof + "  " + soldRoofPercent + "%";			}			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Roof",htlivesight.data[0]), arena.soldRoof, popup);		}		if (arena.soldVIP!= null){		    var soldVIPPercent= 0;			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){				soldVIPPercent= Math.round(parseInt(arena.soldVIP)/parseInt(htlivesight.myFirstTeamArena.vip)*1000)/10;				arena.soldVIP= arena.soldVIP+" / "+ htlivesight.myFirstTeamArena.vip + "  " + soldVIPPercent + "%";			}			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){				soldVIPPercent= Math.round(parseInt(arena.soldVIP)/parseInt(htlivesight.mySecondTeamArena.vip)*1000)/10;				arena.soldVIP= arena.soldVIP+" / "+ htlivesight.mySecondTeamArena.vip + "  " + soldVIPPercent + "%";			}			if (!isNaN(soldVIPPercent)) htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("VIP",htlivesight.data[0]), arena.soldVIP, popup);		}		return arena;	}catch(e){console.log(e);}};htlivesight.matchDetails.addToPopup = function(rating, value, popup){	try{  	var hbox = document.createElement("tr");	  label = document.createElement("td");  	label.textContent=""+rating;	  label_number = document.createElement("td");  	label_number.textContent=""+value;	  hbox.appendChild(label);  	hbox.appendChild(label_number);	  popup.appendChild(hbox);	}catch(e){console.log(e);}};htlivesight.matchDetails.parserTacticType = function(tactic) {	switch (tactic) {	case "0": return htlivesight.Util.Parse("Normal",htlivesight.data[0]);	break;	case "1": return htlivesight.Util.Parse("TacticPressing",htlivesight.data[0]);	break;	case "2": return htlivesight.Util.Parse("TacticCA",htlivesight.data[0]);	break;	case "3": return htlivesight.Util.Parse("TacticAIM",htlivesight.data[0]);	break;	case "4": return htlivesight.Util.Parse("TacticAOW",htlivesight.data[0]);	break;	case "7": return htlivesight.Util.Parse("TacticPlayCreative",htlivesight.data[0]);	break;	case "8": return htlivesight.Util.Parse("TacticLongShots",htlivesight.data[0]);	break;	default: return "";	};};htlivesight.matchDetails.parserTacticAttitude = function(attitude) {	switch (attitude) {	case "-1": return htlivesight.Util.Parse("PIC",htlivesight.data[0]);	break;	case "0": return htlivesight.Util.Parse("Normal",htlivesight.data[0]);	break;	case "1": return htlivesight.Util.Parse("MOTS",htlivesight.data[0]);	break;	default: return "";	};};htlivesight.matchDetails.parserRating = function(value) {	var mainSkill=""+ Math.floor((parseInt(value)-1)/4);	var subSkill=""+ (parseInt(value)-1)%4;	return htlivesight.matchDetails.parserMainSkill(mainSkill) +" "+ htlivesight.matchDetails.parserSubSkill(subSkill);};htlivesight.matchDetails.parserSubSkill = function(subSkill) {		switch (subSkill) {	case "0": return htlivesight.Util.Parse("VeryLow",htlivesight.data[0]);	break;	case "1": return htlivesight.Util.Parse("Low",htlivesight.data[0]);	break;	case "2": return htlivesight.Util.Parse("High",htlivesight.data[0]);	break;	case "3": return htlivesight.Util.Parse("VeryHigh",htlivesight.data[0]);	break;	default: return subSkill;	};};htlivesight.matchDetails.parserMainSkill = function(mainSkill) {	switch (mainSkill) {	case "-1": return "-";	break;	case "0": return htlivesight.Util.Parse("Disastrous",htlivesight.data[0]);	break;	case "1": return htlivesight.Util.Parse("Wretched",htlivesight.data[0]);	break;	case "2": return htlivesight.Util.Parse("Poor",htlivesight.data[0]);	break;	case "3": return htlivesight.Util.Parse("Weak",htlivesight.data[0]);	break;	case "4": return htlivesight.Util.Parse("Inadequate",htlivesight.data[0]);	break;	case "5": return htlivesight.Util.Parse("Passable",htlivesight.data[0]);	break;	case "6": return htlivesight.Util.Parse("Solid",htlivesight.data[0]);	break;	case "7": return htlivesight.Util.Parse("Excellent",htlivesight.data[0]);	break;	case "8": return htlivesight.Util.Parse("Formidable",htlivesight.data[0]);	break;	case "9": return htlivesight.Util.Parse("Outstanding",htlivesight.data[0]);	break;	case "10": return htlivesight.Util.Parse("Brilliant",htlivesight.data[0]);	break;	case "11": return htlivesight.Util.Parse("Magnificent",htlivesight.data[0]);	break;	case "12": return htlivesight.Util.Parse("WorldClass",htlivesight.data[0]);	break;	case "13": return htlivesight.Util.Parse("Supernatural",htlivesight.data[0]);	break;	case "14": return htlivesight.Util.Parse("Titanic",htlivesight.data[0]);	break;	case "15": return htlivesight.Util.Parse("ExtraTerrestrial",htlivesight.data[0]);	break;	case "16": return htlivesight.Util.Parse("Mythical",htlivesight.data[0]);	break;	case "17": return htlivesight.Util.Parse("Magical",htlivesight.data[0]);	break;	case "18": return htlivesight.Util.Parse("Utopian",htlivesight.data[0]);	break;	case "19": return htlivesight.Util.Parse("Divine",htlivesight.data[0]);	break;	default: return mainSkill;	};};htlivesight.matchDetails.parseMatchId = function(xml) {	return parseInt(htlivesight.Util.Parse("MatchID", xml), 10);
};htlivesight.matchDetails.parseArena = function(xml) {	return new htlivesight.matchDetails.arena(			htlivesight.matchDetails.parseArenaId(xml),			htlivesight.matchDetails.parseArenaName(xml),			null, null	);};htlivesight.matchDetails.parseArenaId = function (xml) {	return parseInt(htlivesight.Util.Parse("ArenaID", xml), 10);
};htlivesight.matchDetails.parseArenaName = function (xml) {	return htlivesight.Util.Parse("ArenaName", xml);};htlivesight.matchDetails.parseWeatherId = function (xml) {	return parseInt(htlivesight.Util.Parse("WeatherID", xml),10);
};htlivesight.matchDetails.parseSoldTotal = function (xml) {	return htlivesight.Util.Parse("SoldTotal", xml);};