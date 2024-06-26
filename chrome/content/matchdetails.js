/* ----------------------------------------------------------------
 * Get match by team id data
 * ---------------------------------------------------------------- */
htlivesight.matchDetails=  {
};
htlivesight.matchDetails.arena = function(id, name, weatherId, sold ) {
	this.id = id;
	this.name = name;
	this.weatherId = weatherId;
	this.sold = sold;
};
htlivesight.matchDetails.myArena = function(total, terraces, basic, roof, vip, name) {
	this.total = total;
	this.terraces = terraces;
	this.basic = basic;
	this.roof = roof;
	this.vip = vip;
	this.name = name;
};
htlivesight.matchDetails.view= function(){

	for (var key in htlivesight.Match.List) {
		var match=htlivesight.Match.List[key];
		var popup_home = document.getElementById("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");
		var popup_away = document.getElementById("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");
		var popup_rating_home = document.getElementById("home_team_name_"+match.id+"_"+match.sourceSystem+"_ratings");
		var popup_rating_away = document.getElementById("away_team_name_"+match.id+"_"+match.sourceSystem+"_ratings");
		if (match.isFinish === true && match.isRatingLoaded !== true && popup_home != null && popup_away != null){
			try{
				htlivesight.matchDetails.HTTPGet(match, key);
				//var popup=document.getElementById("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");
				var l1 = document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem);
				//l1.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");
				//l1.href="";
				l1.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
				l1.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
				l1.setAttribute("title", htlivesight.Util.Parse("StatisticTip", htlivesight.data[0]));
				//l1.style.textDecoration = 'underline';
				l1.setAttribute('class','underlined');
				l1.style.cursor="pointer";
				l1.addEventListener("click",function(){htlivesight.DOM.statisticspopup(this.id);});
				$( "#home_team_name_" + match.id + "_" + match.sourceSystem).effect("pulsate","swing", 400);
				//popup=document.getElementById("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");
				var l2 = document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem);
				//l1.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");
				l2.addEventListener("click",function(){htlivesight.DOM.statisticspopup(this.id);});
				l2.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
				l2.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
				l2.setAttribute("title", htlivesight.Util.Parse("StatisticTip", htlivesight.data[0]));
				l2.setAttribute('class','underlined');
				l2.style.cursor="pointer";
				$( "#away_team_name_" + match.id + "_" + match.sourceSystem).effect("pulsate","swing", 400);
				////
				if(popup_rating_home){
					var l3 = document.getElementById("home_team_goals_" + match.id + "_" + match.sourceSystem);
					l3.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
					l3.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
					l3.setAttribute("title", "Click to see home rating");
					l3.setAttribute('class','underlined');
					l3.style.cursor="pointer";
					l3.addEventListener("click",function(){htlivesight.DOM.ratingpopup(this.id);});	
				}
				if(popup_rating_away){
					var l4 = document.getElementById("away_team_goals_" + match.id + "_" + match.sourceSystem);
					l4.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
					l4.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
					l4.setAttribute("title", "Click to see away ratings");
					l4.setAttribute('class','underlined');
					l4.style.cursor="pointer";
					l4.addEventListener("click",function(){htlivesight.DOM.ratingpopup(this.id);});	
				}
				
				////
				$( "#home_team_name_" + match.id + "_" + match.sourceSystem).effect("pulsate","swing", 400);
				
				////
				htlivesight.Match.List[key].isRatingLoaded= true;
			}catch(e){console.log("htlivesight.matchDetails.view "+e);};
		}else if(!match.matchType){
			htlivesight.matchDetails.HTTPGet(match, key);
		};
	};
};
htlivesight.matchDetails.HTTPGet = function (match, key) {
	var parameters=[["file","matchdetails"],
	                ["version", "2.9"],
	                ["matchEvents","false"],
	                ["matchID",match.id],
	                ["sourceSystem",match.sourceSystem],
	                ];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchDetails.ParseGet(xml, match, key);});
};
htlivesight.matchDetails.HTTPGetArena = function (arenaID, teamID) {
	var parameters=[["file","arenadetails"],
	                ["version", "1.5"],
	                ["arenaID", ""+arenaID]];
	//console.log("arenaID=" + arenaID);
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchDetails.ParseGetArenaDetails(xml,arenaID, teamID);});
};
htlivesight.matchDetails.ParseGetArenaDetails= function(xml,arenaID, teamID){
	try {
		var name = htlivesight.Util.Parse("ArenaName", xml);
		var total = htlivesight.Util.Parse("Total", xml); //
		var terraces = htlivesight.Util.Parse("Terraces", xml);
		var basic = htlivesight.Util.Parse("Basic", xml);
		var roof = htlivesight.Util.Parse("Roof", xml);
		var vip = htlivesight.Util.Parse("VIP", xml);

		if(teamID == htlivesight.Teams.myTeam.id){
		  htlivesight.myFirstTeamArena = new htlivesight.matchDetails.myArena(total, terraces, basic, roof, vip, name);
		  localStorage['extensions.Htlivesight.data.myFirstTeamArena'] = JSON.stringify(htlivesight.myFirstTeamArena);
		  htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_STADIUM2);
		}
		if(htlivesight.Teams.mySecondTeam && (teamID == htlivesight.Teams.mySecondTeam.id)){
		  htlivesight.mySecondTeamArena = new htlivesight.matchDetails.myArena(total, terraces, basic, roof, vip, name);
		  localStorage['extensions.Htlivesight.data.mySecondTeamArena'] = JSON.stringify(htlivesight.mySecondTeamArena);
		  htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_STADIUM3);
		}
		if(htlivesight.Teams.myThirdTeam && (teamID == htlivesight.Teams.myThirdTeam.id)){
			  htlivesight.myThirdTeamArena = new htlivesight.matchDetails.myArena(total, terraces, basic, roof, vip, name);
			  localStorage['extensions.Htlivesight.data.myThirdTeamArena'] = JSON.stringify(htlivesight.myThirdTeamArena);
			  htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);
		}
	}catch(e){
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);
		alert("matchDetails.ParseGetArenaDetails: "+e);};
};
htlivesight.matchDetails.ParseGet = function(xml, match, key) {
	try {
		var matchType = htlivesight.Util.Parse("MatchType", xml);
		var cupLevel = htlivesight.Util.Parse("CupLevel", xml);
		var cupLevelIndex = htlivesight.Util.Parse("CupLevelIndex", xml);
		var matchContextId = htlivesight.Util.Parse("MatchContextId", xml);
		htlivesight.Match.List[key].matchType = matchType;
		htlivesight.Match.List[key].cupLevel = cupLevel;
		htlivesight.Match.List[key].cupLevelIndex = cupLevelIndex;
		htlivesight.Match.List[key].matchContextId = matchContextId;
		//setting match type image in the top left corner of the match window
		htlivesight.Match.setMatchTypeImage(match); 
		if(!match.isFinish || $("#home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics tr.end_match_ratings").length > 0) return;
		
		var arenaDetails = xml.getElementsByTagName("Arena")[0]; //
		var homeDetails = xml.getElementsByTagName("HomeTeam")[0];
		var awayDetails = xml.getElementsByTagName("AwayTeam")[0];
		var popup=document.getElementById("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");
		htlivesight.matchDetails.parseRatings(homeDetails, awayDetails, popup, key);
		if(match.sourceSystem.toLowerCase() != "youth") htlivesight.matchDetails.parseSold(arenaDetails, popup, match);
		var popup=document.getElementById("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics");
		htlivesight.matchDetails.parseRatings(awayDetails, homeDetails, popup, key);

	} catch(e) {
		console.log("Parse htlivesight.MatchDetails: " + e);
		htlivesight.Match.List[key].isRatingLoaded= false;
	};
};
htlivesight.matchDetails.parseRatings = function(xml, xmlOpp, popup, key) {
	try{
		var fragment = document.createDocumentFragment();
		var team = new Object();
		var TacticType= htlivesight.Util.Parse("TacticType", xml);
		team.tacticType = htlivesight.matchDetails.parserTacticType(htlivesight.Util.Parse("TacticType", xml));
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TacticType",htlivesight.data[0]), team.tacticType, fragment);
		team.tacticSkill = ""+(parseInt(htlivesight.Util.Parse("TacticSkill", xml))-1);
		var textRating=htlivesight.matchDetails.parserMainSkill(team.tacticSkill);
		if (TacticType == "0") textRating ="";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TacticSkill",htlivesight.data[0]), textRating, fragment);
		team.ratingMidfield = htlivesight.Util.Parse("RatingMidfield", xml);
		team.ratingMidfieldOpp = htlivesight.Util.Parse("RatingMidfield", xmlOpp);
		var rate = Math.round(parseInt(team.ratingMidfield)/(parseInt(team.ratingMidfield)+ parseInt(team.ratingMidfieldOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingMidfield)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Midfield",htlivesight.data[0]), textRating, fragment);
		team.ratingRightDef = htlivesight.Util.Parse("RatingRightDef", xml);
		team.ratingLeftAttOpp = htlivesight.Util.Parse("RatingLeftAtt", xmlOpp);
		rate = Math.round(parseInt(team.ratingRightDef)/(parseInt(team.ratingRightDef)+ parseInt(team.ratingLeftAttOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingRightDef)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("RightDefence",htlivesight.data[0]), textRating, fragment);
		team.ratingMidDef = htlivesight.Util.Parse("RatingMidDef", xml);
		team.ratingMidAttOpp = htlivesight.Util.Parse("RatingMidAtt", xmlOpp);
		rate = Math.round(parseInt(team.ratingMidDef)/(parseInt(team.ratingMidDef)+ parseInt(team.ratingMidAttOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingMidDef)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("MiddleDefence",htlivesight.data[0]), textRating, fragment);
		team.ratingLeftDef = htlivesight.Util.Parse("RatingLeftDef", xml);
		team.ratingRightAttOpp = htlivesight.Util.Parse("RatingRightAtt", xmlOpp);
		rate = Math.round(parseInt(team.ratingLeftDef)/(parseInt(team.ratingLeftDef)+ parseInt(team.ratingRightAttOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingLeftDef)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("LeftDefence",htlivesight.data[0]), textRating, fragment);
		team.ratingRightAtt = htlivesight.Util.Parse("RatingRightAtt", xml);
		team.ratingLeftDefOpp = htlivesight.Util.Parse("RatingLeftDef", xmlOpp);
		rate = Math.round(parseInt(team.ratingRightAtt)/(parseInt(team.ratingRightAtt)+ parseInt(team.ratingLeftDefOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingRightAtt)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("RightAttack",htlivesight.data[0]), textRating, fragment);
		team.ratingMidAtt = htlivesight.Util.Parse("RatingMidAtt", xml);
		team.ratingMidDefOpp = htlivesight.Util.Parse("RatingMidDef", xmlOpp);
		rate = Math.round(parseInt(team.ratingMidAtt)/(parseInt(team.ratingMidAtt)+ parseInt(team.ratingMidDefOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingMidAtt)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("MiddleAttack",htlivesight.data[0]), textRating, fragment);
		team.ratingLeftAtt = htlivesight.Util.Parse("RatingLeftAtt", xml);
		team.ratingRightDefOpp = htlivesight.Util.Parse("RatingRightDef", xmlOpp);
		rate = Math.round(parseInt(team.ratingLeftAtt)/(parseInt(team.ratingLeftAtt)+ parseInt(team.ratingRightDefOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingLeftAtt)+" "+ rate + "%";
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("LeftAttack",htlivesight.data[0]), textRating, fragment);
		team.teamAttitude = htlivesight.matchDetails.parserTacticAttitude(htlivesight.Util.Parse("TeamAttitude", xml));
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TeamAttitude",htlivesight.data[0]), team.teamAttitude, fragment);
		team.ratingIndirectSetPiecesDef = htlivesight.Util.Parse("RatingIndirectSetPiecesDef", xml);
		team.ratingIndirectSetPiecesAttOpp = htlivesight.Util.Parse("RatingIndirectSetPiecesAtt", xmlOpp);
		rate = Math.round(parseInt(team.ratingIndirectSetPiecesDef)/(parseInt(team.ratingIndirectSetPiecesDef)+ parseInt(team.ratingIndirectSetPiecesAttOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingIndirectSetPiecesDef)+" "+ rate + "%";
		if (!isNaN(rate)) htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("IndirectSetPiecesDefence",htlivesight.data[0]), textRating, fragment);
		team.ratingIndirectSetPiecesAtt = htlivesight.Util.Parse("RatingIndirectSetPiecesAtt", xml);
		team.ratingIndirectSetPiecesDefOpp = htlivesight.Util.Parse("RatingIndirectSetPiecesDef", xmlOpp);
		rate = Math.round(parseInt(team.ratingIndirectSetPiecesAtt)/(parseInt(team.ratingIndirectSetPiecesAtt)+ parseInt(team.ratingIndirectSetPiecesDefOpp))*100);
		textRating=htlivesight.matchDetails.parserRating(team.ratingIndirectSetPiecesAtt)+" "+ rate + "%";
		if (!isNaN(rate)) htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("IndirectSetPiecesAttack",htlivesight.data[0]), textRating, fragment);
		
		team.ratingDef=parseInt(team.ratingRightDef)+parseInt(team.ratingMidDef)+parseInt(team.ratingLeftDef);
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("DefHatStats",htlivesight.data[0]), team.ratingDef, fragment);
		
		team.ratingMid=3*team.ratingMidfield;
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("MidHatStats",htlivesight.data[0]), team.ratingMid, fragment);
		
		team.ratingAtt=parseInt(team.ratingRightAtt)+parseInt(team.ratingMidAtt)+parseInt(team.ratingLeftAtt);
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("AttHatStats",htlivesight.data[0]), team.ratingAtt, fragment);
		
		team.rating=team.ratingDef+team.ratingMid+team.ratingAtt;
		htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("TotHatStats",htlivesight.data[0]), team.rating, fragment);
		
		team.loddarstatsDef=2*(team.ratingRightDef)/((team.ratingRightDef)+80)+2*(team.ratingMidDef)/((team.ratingMidDef)+80)+2*(team.ratingLeftDef)/((team.ratingLeftDef)+80);
		team.loddarstatsAtt=2*(team.ratingRightAtt)/((team.ratingRightAtt)+80)+2*(team.ratingMidAtt)/((team.ratingMidAtt)+80)+2*(team.ratingLeftAtt)/((team.ratingLeftAtt)+80);
		team.loddarstatsMid=2*(team.ratingMidfield)/((team.ratingMidfield)+80);
		team.loddarstats=team.loddarstatsMid*(team.loddarstatsAtt+team.loddarstatsDef);
		match = htlivesight.Match.List[key];
		popup.appendChild(fragment);
		if(!htlivesight.Match.List[key].home.ratings){
			htlivesight.Match.List[key].home.ratings = team;
			htlivesight.DOM.createRatingElement("home_team_formation_"+match.id+"_"+match.sourceSystem+"_table", match);
		}else if(!htlivesight.Match.List[key].away.ratings){
			htlivesight.Match.List[key].away.ratings = team;
			htlivesight.DOM.createRatingElement("away_team_formation_"+match.id+"_"+match.sourceSystem+"_table", match);
		}

		
	}catch(e){
		console.log("htlivesight.matchDetails.parseRatings= "+e);
		htlivesight.Match.List[key].isRatingLoaded= false;
	}
};
htlivesight.matchDetails.parseSold = function(xml, popup, match){
	try{
		var arena = new Object();
		arena.id = htlivesight.Util.Parse("ArenaID", xml);
		//console.log(arena.id);
		arena.soldTotal = htlivesight.Util.Parse("SoldTotal", xml);
		arena.soldTerraces = htlivesight.Util.Parse("SoldTerraces", xml);
		arena.soldBasic = htlivesight.Util.Parse("SoldBasic", xml);
		arena.soldRoof = htlivesight.Util.Parse("SoldRoof", xml);
		arena.soldVIP = htlivesight.Util.Parse("SoldVIP", xml);
		if ((arena.soldTotal!= null) && (arena.soldTerraces!= null)){
		    var soldTotalPercent = 0;
			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){
				soldTotalPercent= Math.round(parseInt(arena.soldTotal)/(parseInt(htlivesight.myFirstTeamArena.total))*1000)/10;
			  arena.soldTotal= arena.soldTotal+" / "+ htlivesight.myFirstTeamArena.total + "  " + soldTotalPercent + "%";
			}
			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){
			    	soldTotalPercent= Math.round(parseInt(arena.soldTotal)/(parseInt(htlivesight.mySecondTeamArena.total))*1000)/10;
				arena.soldTotal= arena.soldTotal+" / "+ htlivesight.mySecondTeamArena.total + "  " + soldTotalPercent + "%";
				}
			if (htlivesight.Teams.myThirdTeam && match.isHomeTeam(htlivesight.Teams.myThirdTeam.id) && (arena.id == htlivesight.Teams.myThirdTeam.arenaID)){
		    	soldTotalPercent= Math.round(parseInt(arena.soldTotal)/(parseInt(htlivesight.myThirdTeamArena.total))*1000)/10;
			arena.soldTotal= arena.soldTotal+" / "+ htlivesight.myThirdTeamArena.total + "  " + soldTotalPercent + "%";
			}
			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Total",htlivesight.data[0]), arena.soldTotal, popup);
		}
		if (arena.soldTerraces!= null){
		    var soldTerracesPercent = 0;
			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){
				soldTerracesPercent= Math.round(parseInt(arena.soldTerraces)/parseInt(htlivesight.myFirstTeamArena.terraces)*1000)/10;
				arena.soldTerraces= arena.soldTerraces+" / "+ htlivesight.myFirstTeamArena.terraces + "  " + soldTerracesPercent + "%";
			}
			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){
				soldTerracesPercent= Math.round(parseInt(arena.soldTerraces)/parseInt(htlivesight.mySecondTeamArena.terraces)*1000)/10;
				arena.soldTerraces= arena.soldTerraces+" / "+ htlivesight.mySecondTeamArena.terraces + "  " + soldTerracesPercent + "%";
			}
			if (htlivesight.Teams.myThirdTeam && match.isHomeTeam(htlivesight.Teams.myThirdTeam.id) && (arena.id == htlivesight.Teams.myThirdTeam.arenaID)){
				soldTerracesPercent= Math.round(parseInt(arena.soldTerraces)/parseInt(htlivesight.myThirdTeamArena.terraces)*1000)/10;
				arena.soldTerraces= arena.soldTerraces+" / "+ htlivesight.myThirdTeamArena.terraces + "  " + soldTerracesPercent + "%";
			}
			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Terraces",htlivesight.data[0]), arena.soldTerraces, popup);
		}
		if (arena.soldBasic!= null){
		    var soldBasicPercent = 0;
			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){
				soldBasicPercent= Math.round(parseInt(arena.soldBasic)/parseInt(htlivesight.myFirstTeamArena.basic)*1000)/10;
				arena.soldBasic= arena.soldBasic+" / "+ htlivesight.myFirstTeamArena.basic + "  " + soldBasicPercent + "%";
			}
			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){
				soldBasicPercent= Math.round(parseInt(arena.soldBasic)/parseInt(htlivesight.mySecondTeamArena.basic)*1000)/10;
				arena.soldBasic= arena.soldBasic+" / "+ htlivesight.mySecondTeamArena.basic + "  " + soldBasicPercent + "%";
			}
			if (htlivesight.Teams.myThirdTeam && match.isHomeTeam(htlivesight.Teams.myThirdTeam.id) && (arena.id == htlivesight.Teams.myThirdTeam.arenaID)){
				soldBasicPercent= Math.round(parseInt(arena.soldBasic)/parseInt(htlivesight.myThirdTeamArena.basic)*1000)/10;
				arena.soldBasic= arena.soldBasic+" / "+ htlivesight.myThirdTeamArena.basic + "  " + soldBasicPercent + "%";
			}
			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Basic",htlivesight.data[0]), arena.soldBasic, popup);
		}
		if (arena.soldRoof!= null){
		    var soldRoofPercent = 0;
			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){
				soldRoofPercent= Math.round(parseInt(arena.soldRoof)/parseInt(htlivesight.myFirstTeamArena.roof)*1000)/10;
				arena.soldRoof= arena.soldRoof+" / "+ htlivesight.myFirstTeamArena.roof + "  " + soldRoofPercent + "%";
			}
			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){
				soldRoofPercent= Math.round(parseInt(arena.soldRoof)/parseInt(htlivesight.mySecondTeamArena.roof)*1000)/10;
				arena.soldRoof= arena.soldRoof+" / "+ htlivesight.mySecondTeamArena.roof + "  " + soldRoofPercent + "%";
			}
			if (htlivesight.Teams.myThirdTeam && match.isHomeTeam(htlivesight.Teams.myThirdTeam.id) && (arena.id == htlivesight.Teams.myThirdTeam.arenaID)){
				soldRoofPercent= Math.round(parseInt(arena.soldRoof)/parseInt(htlivesight.myThirdTeamArena.roof)*1000)/10;
				arena.soldRoof= arena.soldRoof+" / "+ htlivesight.myThirdTeamArena.roof + "  " + soldRoofPercent + "%";
			}
			htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("Roof",htlivesight.data[0]), arena.soldRoof, popup);
		}
		if (arena.soldVIP!= null){
		    var soldVIPPercent= 0;
			if (match.isHomeTeam(htlivesight.Teams.myTeam.id)&&(arena.id == htlivesight.Teams.myTeam.arenaID)){
				soldVIPPercent= Math.round(parseInt(arena.soldVIP)/parseInt(htlivesight.myFirstTeamArena.vip)*1000)/10;
				arena.soldVIP= arena.soldVIP+" / "+ htlivesight.myFirstTeamArena.vip + "  " + soldVIPPercent + "%";
			}
			if (htlivesight.Teams.mySecondTeam && match.isHomeTeam(htlivesight.Teams.mySecondTeam.id) && (arena.id == htlivesight.Teams.mySecondTeam.arenaID)){
				soldVIPPercent= Math.round(parseInt(arena.soldVIP)/parseInt(htlivesight.mySecondTeamArena.vip)*1000)/10;
				arena.soldVIP= arena.soldVIP+" / "+ htlivesight.mySecondTeamArena.vip + "  " + soldVIPPercent + "%";
			}
			if (htlivesight.Teams.myThirdTeam && match.isHomeTeam(htlivesight.Teams.myThirdTeam.id) && (arena.id == htlivesight.Teams.myThirdTeam.arenaID)){
				soldVIPPercent= Math.round(parseInt(arena.soldVIP)/parseInt(htlivesight.myThirdTeamArena.vip)*1000)/10;
				arena.soldVIP= arena.soldVIP+" / "+ htlivesight.myThirdTeamArena.vip + "  " + soldVIPPercent + "%";
			}
			if (!isNaN(soldVIPPercent)) htlivesight.matchDetails.addToPopup(htlivesight.Util.Parse("VIP",htlivesight.data[0]), arena.soldVIP, popup);
		}
		return arena;
	}catch(e){console.log(e);}
};
htlivesight.matchDetails.addToPopup = function(rating, value, popup){
	try{
  	var hbox = document.createElement("tr");
  	hbox.setAttribute("class", "end_match_ratings");
	  label = document.createElement("td");
  	label.textContent=""+rating;
	  label_number = document.createElement("td");
  	label_number.textContent=""+value;
	  hbox.appendChild(label);
  	hbox.appendChild(label_number);
	  popup.appendChild(hbox);
	}catch(e){console.log(e);}
};

htlivesight.matchDetails.parserTacticType = function(tactic) {
	switch (tactic) {
	case "0": return htlivesight.Util.Parse("Normal",htlivesight.data[0]);
	break;

	case "1": return htlivesight.Util.Parse("TacticPressing",htlivesight.data[0]);
	break;

	case "2": return htlivesight.Util.Parse("TacticCA",htlivesight.data[0]);
	break;

	case "3": return htlivesight.Util.Parse("TacticAIM",htlivesight.data[0]);
	break;

	case "4": return htlivesight.Util.Parse("TacticAOW",htlivesight.data[0]);
	break;

	case "7": return htlivesight.Util.Parse("TacticPlayCreative",htlivesight.data[0]);
	break;

	case "8": return htlivesight.Util.Parse("TacticLongShots",htlivesight.data[0]);
	break;

	default: return "";
	};
};

htlivesight.matchDetails.parserTacticAttitude = function(attitude) {
	switch (attitude) {
	case "-1": return htlivesight.Util.Parse("PIC",htlivesight.data[0]);
	break;

	case "0": return htlivesight.Util.Parse("Normal",htlivesight.data[0]);
	break;

	case "1": return htlivesight.Util.Parse("MOTS",htlivesight.data[0]);
	break;

	default: return "";
	};
};

htlivesight.matchDetails.parserRating = function(value) {
	var mainSkill=""+ Math.floor((parseInt(value)-1)/4);
	var subSkill=""+ (parseInt(value)-1)%4;
	return htlivesight.matchDetails.parserMainSkill(mainSkill) +" "+ htlivesight.matchDetails.parserSubSkill(subSkill);
};

htlivesight.matchDetails.parserSubSkill = function(subSkill) {	
	switch (subSkill) {
	case "0": return htlivesight.Util.Parse("VeryLow",htlivesight.data[0]);
	break;

	case "1": return htlivesight.Util.Parse("Low",htlivesight.data[0]);
	break;

	case "2": return htlivesight.Util.Parse("High",htlivesight.data[0]);
	break;

	case "3": return htlivesight.Util.Parse("VeryHigh",htlivesight.data[0]);
	break;

	default: return subSkill;
	};
};

htlivesight.matchDetails.parserMainSkill = function(mainSkill) {

	switch (mainSkill) {
	case "-1": return "-";
	break;

	case "0": return htlivesight.Util.Parse("Disastrous",htlivesight.data[0]);
	break;

	case "1": return htlivesight.Util.Parse("Wretched",htlivesight.data[0]);
	break;

	case "2": return htlivesight.Util.Parse("Poor",htlivesight.data[0]);
	break;

	case "3": return htlivesight.Util.Parse("Weak",htlivesight.data[0]);
	break;

	case "4": return htlivesight.Util.Parse("Inadequate",htlivesight.data[0]);
	break;

	case "5": return htlivesight.Util.Parse("Passable",htlivesight.data[0]);
	break;

	case "6": return htlivesight.Util.Parse("Solid",htlivesight.data[0]);
	break;

	case "7": return htlivesight.Util.Parse("Excellent",htlivesight.data[0]);
	break;

	case "8": return htlivesight.Util.Parse("Formidable",htlivesight.data[0]);
	break;

	case "9": return htlivesight.Util.Parse("Outstanding",htlivesight.data[0]);
	break;

	case "10": return htlivesight.Util.Parse("Brilliant",htlivesight.data[0]);
	break;

	case "11": return htlivesight.Util.Parse("Magnificent",htlivesight.data[0]);
	break;

	case "12": return htlivesight.Util.Parse("WorldClass",htlivesight.data[0]);
	break;

	case "13": return htlivesight.Util.Parse("Supernatural",htlivesight.data[0]);
	break;

	case "14": return htlivesight.Util.Parse("Titanic",htlivesight.data[0]);
	break;

	case "15": return htlivesight.Util.Parse("ExtraTerrestrial",htlivesight.data[0]);
	break;

	case "16": return htlivesight.Util.Parse("Mythical",htlivesight.data[0]);
	break;

	case "17": return htlivesight.Util.Parse("Magical",htlivesight.data[0]);
	break;

	case "18": return htlivesight.Util.Parse("Utopian",htlivesight.data[0]);
	break;

	case "19": return htlivesight.Util.Parse("Divine",htlivesight.data[0]);
	break;

	default: return '' + (parseInt(mainSkill) + 1);
	};
};
htlivesight.matchDetails.parseMatchId = function(xml) {
	return parseInt(htlivesight.Util.Parse("MatchID", xml), 10);
};
htlivesight.matchDetails.parseArena = function(xml) {
	return new htlivesight.matchDetails.arena(
			htlivesight.matchDetails.parseArenaId(xml),
			htlivesight.matchDetails.parseArenaName(xml),
			null, null
	);
};
htlivesight.matchDetails.parseArenaId = function (xml) {
	return parseInt(htlivesight.Util.Parse("ArenaID", xml), 10);
};
htlivesight.matchDetails.parseArenaName = function (xml) {
	return htlivesight.Util.Parse("ArenaName", xml);
};
htlivesight.matchDetails.parseWeatherId = function (xml) {
	return parseInt(htlivesight.Util.Parse("WeatherID", xml),10);
};
htlivesight.matchDetails.parseSoldTotal = function (xml) {
	return htlivesight.Util.Parse("SoldTotal", xml);
};
htlivesight.matchDetails.getAllScorers = function(matchIdList, scorers, teamKind){
	console.log('scorers: calling HTTP2Get');
	htlivesight.matchDetails.HTTP2Get(matchIdList, scorers, teamKind);
};

htlivesight.matchDetails.HTTP2Get = function (matchIdList, scorers, teamKind) {
	console.log('scorers: '+matchIdList);
	let matchid = matchIdList.pop();
	console.log('scorers: match id:' + matchid);
	var parameters=[["file","matchdetails"],
	                ["version", "2.9"],
	                ["matchEvents","false"],
	                ["matchID",matchid],
	                ["sourceSystem",'hattrick'],
	                ];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchDetails.ParseScorerGet(xml, matchIdList, scorers, teamKind);});
};

htlivesight.matchDetails.ParseScorerGet = function(xml, matchIdList, scorers, teamKind) {
	try {
		console.log('scorers:getting goals');
		let goals = xml.getElementsByTagName("Goal");
		console.log(goals);
		for(let i = 0; i<goals.length;i++){
			let ScorerPlayerID = htlivesight.Util.Parse("ScorerPlayerID", goals[i]);
			let ScorerPlayerName = htlivesight.Util.Parse("ScorerPlayerName", goals[i]);
			let ScorerTeamID = htlivesight.Util.Parse("ScorerTeamID", goals[i]);
			console.log('scorer:'+ ScorerPlayerName);
			if(scorers[ScorerPlayerID]){
				scorers[ScorerPlayerID].goals += 1;
			}else{
				scorers[ScorerPlayerID] = {};
				scorers[ScorerPlayerID].goals = 1;
				scorers[ScorerPlayerID].name = ScorerPlayerName;
				scorers[ScorerPlayerID].teamId = ScorerTeamID;
			}
		}
		console.log(scorers);
		if(matchIdList.length > 0){
			htlivesight.matchDetails.HTTP2Get(matchIdList, scorers, teamKind);
		}else{
			if(teamKind=="myFirstTeam"){
				htlivesight.League.Scorers = scorers;
				let scorerList = [];
				keys = Object.keys(scorers);
				for(let key in keys){
					scorerList.push(scorers[keys[key]]);
				}
				scorerList.sort(function(a,b){return b.goals-a.goals});//inverse because top scorer should be on top
				htlivesight.League.ScorersList = scorerList;
				for(let i=0;i<5;i++){
					$("#leaguescorertable_"+(i+1)+"_name").text(scorerList[i].name +" ("+htlivesight.League.teams[scorerList[i].teamId].name +")" );
					$("#leaguescorertable_"+(i+1)+"_goals").text(scorerList[i].goals);
				}
				$("#winbox_leaguescorertable").show();
			}else if(teamKind=="mySecondTeam"){
				htlivesight.League.Scorers2 = scorers;
				let scorerList = [];
				keys = Object.keys(scorers);
				for(let key in keys){
					scorerList.push(scorers[keys[key]]);
				}
				scorerList.sort(function(a,b){return b.goals-a.goals});//inverse because top scorer should be on top
				htlivesight.League.ScorersList2 = scorerList;
				for(let i=0;i<5;i++){
					$("#leaguescorertable_"+(i+1)+"_name_bis").text(scorerList[i].name +" ("+htlivesight.League.teams2[scorerList[i].teamId].name +")" );
					$("#leaguescorertable_"+(i+1)+"_goals_bis").text(scorerList[i].goals);
				}
				$("#winbox_leaguescorertable_bis").show();
			}else if(teamKind=="myThirdTeam"){
				htlivesight.League.Scorers3 = scorers;
				let scorerList = [];
				keys = Object.keys(scorers);
				for(let key in keys){
					scorerList.push(scorers[keys[key]]);
				}
				scorerList.sort(function(a,b){return b.goals-a.goals});//inverse because top scorer should be on top
				htlivesight.League.ScorersList3 = scorerList;
				for(let i=0;i<5;i++){
					$("#leaguescorertable_"+(i+1)+"_name_ter").text(scorerList[i].name +" ("+htlivesight.League.teams3[scorerList[i].teamId].name +")" );
					$("#leaguescorertable_"+(i+1)+"_goals_ter").text(scorerList[i].goals);
				}
				$("#winbox_leaguescorertable_ter").show();
			}
		}
	} catch(e) {
		console.log("Parse htlivesight.MatchDetails.ParseScorerGet: " + e);
		htlivesight.Match.List[key].isRatingLoaded= false;
	};
}