htlivesight.matchLineup=  {
};
htlivesight.matchLineup.view= function(){
	for (var key in htlivesight.Match.List) {
		var match=htlivesight.Match.List[key];
		if (match.isFinish==true && match.areStarsLoaded!=true){
			try{
				htlivesight.matchLineup.HTTPGet(match, match.home.team.id, "home");
				htlivesight.matchLineup.HTTPGet(match, match.away.team.id, "away");
				htlivesight.Match.List[key].areStarsLoaded= true;
			}catch(e){alert(e);}
		};
	};
};
htlivesight.matchLineup.HTTPGet = function (match,teamId, side) {
	var parameters=[["file","matchlineup"],
	                ["version", "1.8"],
	                ["teamID", teamId],
	                ["matchID", match.id],
	                ["sourceSystem",match.sourceSystem],
	                ];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.matchLineup.ParseGet(xml,match, side);});
};
htlivesight.matchLineup.ParseGet = function(xml, match, side) {
	try {
		var lineup = xml.getElementsByTagName("Lineup")[0]; //
		var playerNodes = lineup.getElementsByTagName("Player");
		htlivesight.matchLineup.addRatingTab(match, side, lineup);
		for(var j = 0, len = playerNodes.length; j< len ;j++){
			var ratingString = "";
			try{
				var ratingStarsEnd = playerNodes[j].getElementsByTagName("RatingStarsEndOfMatch")[0].textContent;
				ratingStarsEnd = parseFloat(ratingStarsEnd);
				ratingString = " ★:" + ratingStarsEnd;
			}catch(e){ratingStarsEnd = "";/*console.log("ratingStarsEnd error:"+e);*/}
			try{
				var ratingStars = playerNodes[j].getElementsByTagName("RatingStars")[0].textContent;
				ratingStars = parseFloat(ratingStars);
				ratingString += "✩:"+ ratingStars;
			}catch(e){var ratingStars ="";/*console.log("ratingStars error:"+e);*/}

			//var ratingString = " ★:" + ratingStarsEnd + "☆:"+ ratingStars;
			var playerID = playerNodes[j].getElementsByTagName("PlayerID")[0].textContent;
			//var html_id = "away_team_formation_441883848_hattrick_table";
			var selector = "#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table table:last ."+playerID;
			if(match.sourceSystem=="youth"){
				selector+="_youth";
			}
			$(selector).each(function() {
				if(!$(this).hasClass("withRating")){
					if(!$(this).hasClass("withSpecialty")){
						$(this).append('<br/><div></div>');
						if(match.sourceSystem.toLowerCase()=='youth'){
							htlivesight.matchLineup.YouthStar(this, ratingStars);
						}else{
							htlivesight.matchLineup.SeniorStar(this, ratingStars, ratingStarsEnd);
						}
					}
					$(this).addClass("withRating withSpecialty");
				}
			});
		}

	} catch(e) {
		console.log("Parse htlivesight.MatchLineup: " + e);
	};
};

htlivesight.matchLineup.addRatingTab= function(match, side, xml){
	try{
	var teamId, youth;
	if(side=="home"){
		teamId = match.home.team.id;
	}else{
		teamId = match.away.team.id;
	}
	if(match.sourceSystem.toLowerCase() == "youth"){
		youth = true;
	}else{
		youth = false;
	}

	var lineUp = htlivesight.matchLineup.ParseLineUpFromXml(xml,teamId,youth);
	var stringLineUp = htlivesight.matchLineup.FromArrayToString(lineUp);
	var event = {};
	event.minute = "★";
	htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(htlivesight.Util.CleanText(stringLineUp)),event);
	$( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
	$( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
	}catch(e){alert(e);}
};
/**
 * This function (ParseLineUp) extract lineup from live.xml and build a string similar to 
 * event 21 (lineup in events.js) in order to use createLineupElement which works with 
 * lineup string extracted from event 21 text showing lineup from keeper (up) to scorers (down).
 * 
 *  MatchRoleID      								MatchBehaviourID
 *  Value	Description								Value	Description
 *   100	Keeper 										0	Normal
 *   101	Right back 									1	Offensive
 *   102	Right central defender 						2	Defensive
 *   103	Middle central defender						3	Towards middle
 *   104	Left central defender						4	Towards wing
 *   105	Left back
 *   106	Right winger
 *   107	Right inner midfield
 *   108	Middle inner midfield
 *   109	Left inner midfield
 *   110	Left winger
 *   111	Right forward
 *   112	Middle forward
 *   113	Left forward
 *   114-118 Reserves
 */
htlivesight.matchLineup.ParseLineUpFromXml= function(xml,teamId,youth){

	//lineUp contains players name and index is the position (RoleId-100)
	var lineUp = new Array(19);// because there are 19 position: 1 keeper, 5 defenders,5 midfields, 3 scorers, 5 bench warmers.
	for (var index=0; index<lineUp.length; index++) // initializing with empty positions
	{
		lineUp[index]=new Object();
		lineUp[index].name="          "; 
		lineUp[index].behaviourInt="0"; 
		lineUp[index].id="0";
		lineUp[index].behaviourString=" ";
		lineUp[index].youth=youth;
	}
	lineUp[0].update=1;

	try{
		if (xml.getElementsByTagName("PlayerID").length==0) throw "empty";
		for (var i=0, len=xml.getElementsByTagName("PlayerID").length; i<len; i++) // analyzing 11 players of the lineup in xml
		{
			if(xml.getElementsByTagName("RoleID")[i]){
				var index= parseInt(xml.getElementsByTagName("RoleID")[i].textContent)-100; // get position
			}else{index= -81;}
			if(index==-81 || index==-80 || index==-79){
				for(var k=14; k<19; k++){
					if(lineUp[k].id == "0"){
						var playerName= xml.getElementsByTagName("FirstName")[i].textContent+" "+xml.getElementsByTagName("LastName")[i].textContent; // get name
						lineUp[k].name = playerName.replace(/,/g,"");
						var playerId= xml.getElementsByTagName("PlayerID")[i].textContent; // get  playerId.
						lineUp[k].id=playerId;
						lineUp[k].youth=youth;
						break;
					}
				}
				continue;
			}
			if(index>=0){
  			var playerName= xml.getElementsByTagName("FirstName")[i].textContent+" "+xml.getElementsByTagName("LastName")[i].textContent; // get name
	  		lineUp[index].name = playerName.replace(/,/g,"");

		  	lineUp[index].behaviourInt= xml.getElementsByTagName("Behaviour")[i].textContent; // get individual order
			 
	  		var playerId= xml.getElementsByTagName("PlayerID")[i].textContent; // get  playerId.
		  	lineUp[index].id=playerId;
			  lineUp[index].youth=youth;
			}
			if(typeof htlivesight.Player.List["_"+playerId+"_"+youth] === "undefined"/*!htlivesight.Player.List.hasOwnProperty("_"+playerId+"_"+youth)*/){
				var player = new htlivesight.Player(playerId, playerName, "", "",teamId,youth);
				htlivesight.Player.List["_"+playerId+"_"+youth] = player;
			}
		};

	}catch(e){lineUp[0].update=0;console.log("htlivesight.LineUp.ParseLineUpFromXml: "+e);}
	return lineUp;
};

htlivesight.matchLineup.FromArrayToString= function (lineUp){	
	var stringLineUp=": "; // because createLineupElement split event text with ":" and takes 2° part.
	for (var index=0; index<lineUp.length; index++) // building the lineup string
	{
		lineUp[index]=htlivesight.LineUp.BehaviourFromIntToString(lineUp[index], index);
		stringLineUp+=lineUp[index].behaviourString+lineUp[index].name+" "+"#"+lineUp[index].id+"#"+lineUp[index].youth; // adding individual order and player name  
		if ((index == 0) || (index==5) || (index==10) || (index==13)) 
		{
			stringLineUp+=" - "; // after keeper, defenders and midfields add a minus to separate them
		}
		else
		{
			if (index!=lineUp.length-1) stringLineUp+=", "; // add a coma to separate players (except last one)
		}
	}
	return stringLineUp+" "; //returning lineup.
};

htlivesight.matchLineup.YouthStar = function(that, ratingStars){

	while(ratingStars>=5){
	  $("div", that).append('<image src="'+htlivesight.Image.star.big_blue+'"</image>');
	  ratingStars-=5;
	}
	while(ratingStars>=1){
	  $("div", that).append('<image src="'+htlivesight.Image.star.blue+'"</image>');
	  ratingStars-=1;
	}
	if(ratingStars>0) $("div", that).append('<image src="'+htlivesight.Image.star.half_blue+'"</image>');

};

htlivesight.matchLineup.SeniorStar = function(that, ratingStars, ratingStarsEnd){
	if(ratingStarsEnd == 0) ratingStarsEnd = ratingStars;
	if(ratingStars >= ratingStarsEnd){
		while(ratingStarsEnd>=5){
		  $("div", that).append('<image src="'+htlivesight.Image.star.big_yellow+'"</image>');
		  ratingStarsEnd-=5;
		  ratingStars-=5;
		}
		while(ratingStarsEnd>=1){
		  $("div", that).append('<image src="'+htlivesight.Image.star.yellow+'"</image>');
		  ratingStarsEnd-=1;
		  ratingStars-=1;
		}
		if(ratingStarsEnd>0 && ratingStars<1){
			$("div", that).append('<image src="'+htlivesight.Image.star.half_yellow+'"</image>');
		  ratingStarsEnd-=0.5;
		  ratingStars-=0.5;
		}else if(ratingStarsEnd>0 && ratingStars>=1){
			$("div", that).append('<image src="'+htlivesight.Image.star.yellow_to_brown+'"</image>');
		  ratingStarsEnd-=0.5;
		  ratingStars-=1;
		}
		while(ratingStars>=1){
		  $("div", that).append('<image src="'+htlivesight.Image.star.brown+'"</image>');
		  ratingStars-=1;
		}
		if(ratingStars>0) $("div", that).append('<image src="'+htlivesight.Image.star.half_brown+'"</image>');
		
	}else{
		while(ratingStars>=5){
		  $("div", that).append('<image src="'+htlivesight.Image.star.big_yellow+'"</image>');
		  ratingStars-=5;
		  ratingStarsEnd-=5;
		}
		while(ratingStars>=1){
		  $("div", that).append('<image src="'+htlivesight.Image.star.yellow+'"</image>');
		  ratingStars-=1;
		  ratingStarsEnd-=1;
		}
		if(ratingStars>0 && ratingStarsEnd<1){
			$("div", that).append('<image src="'+htlivesight.Image.star.half_yellow+'"</image>');
		  ratingStars-=0.5;
		  ratingStarsEnd-=0.5;
		}else if(ratingStars>0 && ratingStarsEnd>=1){
			$("div", that).append('<image src="'+htlivesight.Image.star.yellow_to_red+'"</image>');
		  ratingStars-=0.5;
		  ratingStarsEnd-=1;
		}
		while(ratingStarsEnd>=1){
		  $("div", that).append('<image src="'+htlivesight.Image.star.red+'"</image>');
		  ratingStarsEnd-=1;
		}
		if(ratingStarsEnd>0) $("div", that).append('<image src="'+htlivesight.Image.star.half_red+'"</image>');
	}
};