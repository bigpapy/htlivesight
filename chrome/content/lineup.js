htlivesight.LineUp = {};

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
 */

htlivesight.LineUp.ParseLineUpFromXml= function (xml){
	
	//lineUp contains players name and index is the position (RoleId-100)
	var lineUp = new Array(14);// because there are 14 position: 1 keeper, 5 defenders,5 midfields, 3 scorers.

	for (var index=0; index<lineUp.length; index++) // initializing with empty positions
	{
		lineUp[index]=new Object();
		lineUp[index].name="          "; 
		lineUp[index].behaviourInt="0"; 
		lineUp[index].id="0";
		lineUp[index].behaviourString=" ";
	}

	lineUp[0].update=1;

	for (var i=0; i<11; i++) // analyzing 11 players of the lineup in xml
	{
		try{
			var index= parseInt(xml.getElementsByTagName("RoleID")[i].textContent)-100; // get position

			lineUp[index].name= xml.getElementsByTagName("PlayerName")[i].textContent; // get name
		
			lineUp[index].behaviourInt= xml.getElementsByTagName("Behaviour")[i].textContent; // get individual order
		
			lineUp[index].id= xml.getElementsByTagName("PlayerID")[i].textContent; // get  playerId.
			
		}catch(e){lineUp[0].update=0;}
		
	};
	return lineUp;
};

htlivesight.LineUp.BehaviourFromIntToString= function (player, index){
	switch (player.behaviourInt) { // choosing arrow relative to the individual order
		
		case "0": player.behaviourString=" ";//Normal
			break;
				
		case "1": player.behaviourString="▼ ";//Offensive
			break;
				
		case "2": player.behaviourString="▲ ";//Defensive
			break;
				
		case "3": //Towards middle
				
	   	  switch (""+index) // switching position (because middle can be left/right depending on position).
	   	  {
	   		case "1": // Right back
	    			
	   		case "2": player.behaviourString="▶ "; //Right central defender
	   			break;
	    			
	   		case "4": //Left central defender
	    			
	   		case "5": player.behaviourString="◀ "; //Left back
	   			break;
	    			
	   		case "6": //Right winger
	    			
	   		case "7": player.behaviourString="▶ ";  //Right inner midfield
	   			break;
	    			
	   		case "9":  //Left inner midfield
	    			
	   		case "10": player.behaviourString="◀ ";  // Left winger
		   		break;				// no forwards because they can't be to middle!!
	   	  }
	   		break;
	    		
		case "4": //Towards wing
				
	   	  switch (""+index) // switching position (because wing can be left/right depending on position).
	   	  {
	   		case "2": player.behaviourString="◀ "; // Right central defender
	   			break;
	    			
	   		case "4": player.behaviourString="▶ "; // Left central defender
	   			break;
	    			
	   		case "7": player.behaviourString="◀ "; // Right inner midfield
	   			break;
	    			
	   		case "9": player.behaviourString="▶ "; // Left inner midfield
	   			break;
	    			
	   		case "11": player.behaviourString="◀ "; // Right forward
	   			break;
	    			
	   		case "13": player.behaviourString="▶ "; // Left forward
	   			break;
	   	  }
	   	  break;
	}

	return player;

};

//convert lineup array into string	
htlivesight.LineUp.FromArrayToString= function (lineUp){	
	
	var stringLineUp=": "; // because createLineupElement split event text with ":" and takes 2° part.
	
	for (var index=0; index<lineUp.length; index++) // building the lineup string
	{
		lineUp[index]=htlivesight.LineUp.BehaviourFromIntToString(lineUp[index], index);

		stringLineUp+=lineUp[index].behaviourString+lineUp[index].name+" "; // adding individual order and player name  
		
		if ((index == 0) || (index==5) || (index==10)) 
		{
			stringLineUp+=" - "; // after keeper, defenders and midfields add a minus to separate them
		}
		else
			{
			if (index!=lineUp.length-1) stringLineUp+=", "; // add a coma to separate players (except last one)
			}
	}

	return stringLineUp; //returning lineup.
};

// used by sent off event and injury without replacement
htlivesight.LineUp.RemovePlayerFromLineUp= function (lineUp,playerId){
//	alert("lineUp.length="+lineUp.length);
	for (var index=0; index<lineUp.length; index++) // building the lineup string
	{
	//	console.log("removeplayer: lineUp[index].id="+lineUp[index].id);
	//	console.log("removeplayer: playerId="+playerId);
//		alert("lineUp["+index+"].id= "+lineUp[index].id+" playerId= "+playerId);
		if (parseInt(lineUp[index].id)==parseInt(playerId)) 
		{
		//	alert("found player!");
	//		console.log("removeplayer: player id found! Removing");
			lineUp[index].id= "0";
			
			lineUp[index].name= "                   "; // delete name
			
			lineUp[index].behaviourInt= "0"; // delete individual order int
			
			lineUp[index].behaviourString= " "; // delete individual order string 
			
			return lineUp;
		};
	};
//	alert("player not found! Id of player not found is: "+ playerId+ "");
	return lineUp;
	
};

// got schema from lineup (3-5-2, 3-4-3 etc).
htlivesight.LineUp.FormationFromLineUp= function (lineUp){
	var formation="";
	var counterLine=0;
	for (var index=1; index<lineUp.length; index++) // building the lineup string
	{
		if (lineUp[index].id!=0) counterLine++; // add each player to schema
		
		if ((index==5) || (index==10)) 
		{
			formation+=counterLine+"-"; // after defenders and midfields add a minus to separate them

			counterLine=0;
		}
		
	}
	formation+=counterLine;

	return formation; 
};

// got substitutions from xml
htlivesight.LineUp.ParseSubstitutions= function (xml){
	
	var substitutions= new Array();
	
	try{ // because substitutions aren't always present in the XML files.
		
	
	var substitutionXml= xml.getElementsByTagName("Substitution");
//	console.log("Substitution length (num of subs)="+substitutionXml.length);
	for (var index=0; index<substitutionXml.length; index++) // initializing with empty positions
	{
		substitutions[index]=new Object();
		
//		console.log("getting TeamID of the substitution...");
		substitutions[index].teamID= substitutionXml[index].getElementsByTagName("TeamID")[0].textContent; 
//		console.log("TeamId="+substitutions[index].teamID);

//		console.log("getting subjectPlayerID of the substitution...");
		substitutions[index].subjectPlayerID= substitutionXml[index].getElementsByTagName("SubjectPlayerID")[0].textContent; 
//		console.log("subjectPlayerID="+substitutions[index].subjectPlayerID);
		
//		console.log("getting objectPlayerID of the substitution...");
		substitutions[index].objectPlayerID= substitutionXml[index].getElementsByTagName("ObjectPlayerID")[0].textContent; 
//		console.log("objectPlayerID="+substitutions[index].objectPlayerID);

//		console.log("getting orderType of the substitution...");
		substitutions[index].orderType= substitutionXml[index].getElementsByTagName("OrderType")[0].textContent; 
//		console.log("orderType="+substitutions[index].orderType);
	
//		console.log("getting newPositionId of the substitution...");
		substitutions[index].newPositionId= parseInt(substitutionXml[index].getElementsByTagName("NewPositionId")[0].textContent); 
//		console.log("newPositionId="+substitutions[index].newPositionId);
		
//		console.log("getting newPositionBehaviour of the substitution...");
		substitutions[index].newPositionBehaviour= substitutionXml[index].getElementsByTagName("NewPositionBehaviour")[0].textContent; 
//		console.log("newPositionBehaviour="+substitutions[index].newPositionBehaviour);
		
//		console.log("getting matchMinute of the substitution...");
		substitutions[index].matchMinute= substitutionXml[index].getElementsByTagName("MatchMinute")[0].textContent;
//		console.log("MatchMinute="+substitutions[index].MatchMinute);
	}
	
	}catch(e){console.log("error parsing substitution:"+e);};
	
	return substitutions;
	
};

// used to update lineup with injuries event.
htlivesight.LineUp.InjurySubstitution= function(lineUp,subjectPlayer,objectPlayer){
	
	for (var index=0; index<lineUp.length; index++) 
	{
		if (lineUp[index].id==subjectPlayer.id) //find injured player
		{
			lineUp[index].id= objectPlayer.id; // and changing with entering one.
			
			lineUp[index].name= objectPlayer.name; 
			
			return lineUp;
		};
	};
	
};

htlivesight.LineUp.SubstitutionPlayerInLineUp= function(lineUp,subjectPlayer,objectPlayer){

	// removing player exiting
	lineUp= htlivesight.LineUp.RemovePlayerFromLineUp(lineUp,subjectPlayer.id);
//	console.log("objectPlayer.positionId="+objectPlayer.positionId);
	var index=parseInt(objectPlayer.positionId)-100;// inserting position of entering player
//	console.log("index="+index);
	lineUp[index]= new Object;
	lineUp[index].id=objectPlayer.id;// inserting other data...
//	console.log("passed id of new player!");

	lineUp[index].name= objectPlayer.name;
//	console.log("passed name of new player!");
	lineUp[index].behaviourInt= objectPlayer.behaviourInt;
//	console.log("passed individual order of the new player");
	return lineUp;

};

htlivesight.LineUp.SubstitutionEvent= function(event, match){

				try{ // added because of errors with substitutions. to be removed when fixed.
//					console.log("Function: SubstitutionEvent: action: beginning. Let's see if there is any error here. ;)");
                var subjectPlayer= new Object();

                var objectPlayer= new Object();
                
                var found= false; // this variable is used to fix delaly of the subs info against subs event.

                subjectPlayer.id= event.subjectPlayerId;
 //               console.log("Function: SubstitutionEvent: action: got subjectPlayer:id="+subjectPlayer.id);

                objectPlayer.id= event.objectPlayerId;
//                console.log("Function: SubstitutionEvent: action: got objectPlayer:id="+objectPlayer.id);
//                console.log("Function: SubstitutionEvent: action: looking for sub info...");
                for (var index=0; index < match.substitutions.length; index++){
                	
 //               	console.log("index="+index);
//                	console.log("match.substitutions[index].subjectPlayerID="+match.substitutions[index].subjectPlayerID);
//                	console.log("subjectPlayer.id="+subjectPlayer.id);
//                	console.log("match.substitutions[index].objectPlayerID="+match.substitutions[index].objectPlayerID);
//                	console.log("objectPlayer.id="+objectPlayer.id);
//                	console.log("match.substitutions[index].matchMinute="+match.substitutions[index].matchMinute);
//                	console.log("event.minute="+event.minute);
                	
                	if(subjectPlayer.id==match.substitutions[index].subjectPlayerID &&
                			objectPlayer.id==match.substitutions[index].objectPlayerID &&
                			event.minute==match.substitutions[index].matchMinute){
//                		console.log("Function: SubstitutionEvent: action: sub found! getting data...");
                		objectPlayer.positionId=parseInt(match.substitutions[index].newPositionId);
//                		console.log("Function: SubstitutionEvent: action: got new position="+objectPlayer.positionId);
                        objectPlayer.behaviourInt=match.substitutions[index].newPositionBehaviour;
//                        console.log("Function: SubstitutionEvent: action: got new behaviour="+objectPlayer.behaviourInt);
                        found= true;
                	};
     
                };

//                console.log("Function: SubstitutionEvent: Did you see position and behaviour number above? If not this is bad!!!");
                subjectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.subjectPlayerId);
//                console.log("Function: SubstitutionEvent: action: got subjectPlayer.name="+subjectPlayer.name);
                objectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.objectPlayerId);
//                console.log("Function: SubstitutionEvent: action: got objectPlayer.name="+objectPlayer.name);
                
                if ((subjectPlayer.name== undefined)||(objectPlayer.name== undefined)){
                	for (var index=0; index < lineUp.length; index++){
                    	if ((lineUp[index].id==subjectPlayer.id)&&(subjectPlayer.name== undefined)){
                    		subjectPlayer.name=lineUp[index].name;
                    	}
                    	if ((lineUp[index].id==objectPlayer.id)&&(objectPlayer.name== undefined)){
                    		objectPlayer.name=lineUp[index].name;
                    	}
                	}
                }
                
                var lineUp;

                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
              	    lineUp=match.home.lineUp;
              	  else
              		lineUp=match.away.lineUp;
                
//                console.log("Function: SubstitutionEvent: action: got lineup (I can't show the value!)");
                
                if (found){
                	
                	lineUp=htlivesight.LineUp.SubstitutionPlayerInLineUp(lineUp,subjectPlayer,objectPlayer);
                	
                	
                }else{
                	
                	lineUp=htlivesight.LineUp.InjurySubstitution(lineUp,subjectPlayer,objectPlayer);
                	
                }
                
//                console.log("Function: SubstitutionEvent: action: lineup updated with subs!");
                var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp);
//                console.log("Function: SubstitutionEvent: action: converting lineup to string (now I can show it!)="+stringLineUp);
                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
              	  var side="home";
                else
              	  var side="away";
              //TODO: restore next line when CHPP unsynch will be fixed.
                $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
                event.lineupElement = htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(stringLineUp),event);
              //  $("#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem).css({'background-color':'#88ff88'}).animate({'background-color':'#000000'},1000);
                $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
//                console.log("Function: SubstitutionEvent: action: passed value to show on right click!");
                match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)
 //               console.log("Function: SubstitutionEvent: action: calculated new formation="+match.getSideById(event.subjectTeamId).formation);
                lineUp[0].update++;
//                console.log("Function: SubstitutionEvent: action: updating counter change="+lineUp[0].update++);
                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
            	    match.home.lineUp= lineUp;
            	  else
            		match.away.lineUp= lineUp;
 //               console.log("Function: SubstitutionEvent: action: end. It seems there isn't any big error here.");
				}catch(e){console.log("WARNING!!! This is an error, please copy last log message and the following error:"+e);}
};

htlivesight.LineUp.SwapEvent= function(event, match){
	

    var subjectPlayer= new Object();

    var objectPlayer= new Object();

    subjectPlayer.id= event.subjectPlayerId;
    
    objectPlayer.id= event.objectPlayerId;


    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	   var lineUp=match.home.lineUp;
    if (match.isAwayTeam(event.subjectTeamId))
  	   var lineUp=match.away.lineUp;
    
 //   if (lineUp== undefined) alert("subjectTeamId is uncorrect! SubjectTeamId="+event.subjectTeamId);
           
    subjectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.subjectPlayerId);


    objectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.objectPlayerId);
    
    if ((subjectPlayer.name== undefined)||(objectPlayer.name== undefined)){
    	for (var index=0; index < lineUp.length; index++){
        	if ((lineUp[index].id==subjectPlayer.id)&&(subjectPlayer.name== undefined)){
        		subjectPlayer.name=lineUp[index].name;
        	}
        	if ((lineUp[index].id==objectPlayer.id)&&(objectPlayer.name== undefined)){
        		objectPlayer.name=lineUp[index].name;
        	}
    	}
    }
    
//    if ((subjectPlayer.name== undefined)||(objectPlayer.name== undefined)||(subjectPlayer.id==undefined)||(objectPlayer.id==undefined)){
//    alert("subjectPlayer id="+subjectPlayer.id+"\n subject player name="+subjectPlayer.name+"\n objectPlayer id="+objectPlayer.id+"\n object player name="+objectPlayer.name);
//    }
    for (var index=0; index < lineUp.length; index++){
    	if (lineUp[index].id==subjectPlayer.id){
    		lineUp[index].name=objectPlayer.name;

    		}
    	if (lineUp[index].id==objectPlayer.id){
    		lineUp[index].name=subjectPlayer.name;

    	}
    }

    for (var index=0; index < lineUp.length; index++){
    	if (lineUp[index].name==subjectPlayer.name){
    		lineUp[index].id=subjectPlayer.id;
    	}
    	if (lineUp[index].name==objectPlayer.name){
    		lineUp[index].id=objectPlayer.id;
    	}
    }

    
    var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp);

    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	  var side="home";
    else
  	  var side="away";
  //TODO: restore next line when CHPP unsynch will be fixed.
    $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
    event.lineupElement = htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(stringLineUp),event);
   // $("#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem).css({'background-color':'#88ff88'}).animate({'background-color':'#000000'},1000);
    $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
    lineUp[0].update++;
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	    match.home.lineUp= lineUp;
	  else
		match.away.lineUp= lineUp;

};


htlivesight.LineUp.IndividualOrderEvent= function(event, match){
				try{
//					console.log("Function: IndividualOrderEvent: action: beginning. Let's see if there is any error here. ;)");
                var subjectPlayer= new Object();

                var objectPlayer= new Object();
                
                var found= false; // this variable is used to fix delaly of the individual order info against individual order event.

                subjectPlayer.id= event.subjectPlayerId;

 //               console.log("Function: IndividualOrderEvent: action: got subjectPlayer:id="+subjectPlayer.id);
                
                objectPlayer.id= event.subjectPlayerId;
                
//                console.log("Function: IndividualOrderEvent: action: got objectPlayer:id="+objectPlayer.id);
                
//                console.log("Function: IndividualOrderEvent: action: looking for order info...");
                
                for (var index=0; index < match.substitutions.length; index++){
                
 //               	console.log("index="+index);
               	
 //               	console.log("match.substitutions[index].subjectPlayerID="+match.substitutions[index].subjectPlayerID);
                	
 //               	console.log("subjectPlayer.id="+subjectPlayer.id);
                	
 //               	console.log("match.substitutions[index].objectPlayerID="+match.substitutions[index].objectPlayerID);
                	
 //               	console.log("objectPlayer.id="+objectPlayer.id);
                	
//                	console.log("match.substitutions[index].matchMinute="+match.substitutions[index].matchMinute);
                	
//                	console.log("event.minute="+event.minute);
                	
                	if(subjectPlayer.id==match.substitutions[index].subjectPlayerID &&
                	
                			objectPlayer.id==match.substitutions[index].objectPlayerID &&
                			
                			event.minute==match.substitutions[index].matchMinute){
//                		console.log("Function: IndividualOrderEvent: action: order found! getting data...");
                		
                		objectPlayer.positionId=parseInt(match.substitutions[index].newPositionId);
                	
 //               		console.log("Function: IndividualOrderEvent: action: got new position="+objectPlayer.positionId);
                		
                		objectPlayer.behaviourInt=match.substitutions[index].newPositionBehaviour;
                		
//                		console.log("Function: IndividualOrderEvent: action: got new behaviour="+objectPlayer.behaviourInt);
                		
                		found= true;
                	};
     
                };
    

//                console.log("Function: IndividualOrderEvent: Did you see position and behaviour number above? If not this is bad!!!");
                
                var lineUp;

                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
              	
                	lineUp=match.home.lineUp;
              	  
                else
              	
                	lineUp=match.away.lineUp;

 //               console.log("Function: IndividualOrderEvent: action: got lineup (I can't show the value!)");
                
 //               console.log("Function: IndividualOrderEvent: action: looking for player name...");
                
                for (var index=0; index<lineUp.length; index++) // building the lineup string
            	{
            		if (lineUp[index].id==subjectPlayer.id) 
            		{
            			objectPlayer.name=lineUp[index].name;
            	
 //           			console.log("Function: IndividualOrderEvent: action: name found! It's "+ objectPlayer.name);
            			
            			break;
            		}
            	}

 //               console.log("Function: IndividualOrderEvent: Did you see player name above? If not this is bad!!!");
                
                subjectPlayer.name= objectPlayer.name;
                
 //               console.log("Function: IndividualOrderEvent: action: got subjectPlayer.name="+subjectPlayer.name);
                
                if (found){
                	
                	lineUp=htlivesight.LineUp.SubstitutionPlayerInLineUp(lineUp,subjectPlayer,objectPlayer);
                	
                }else{
                	
                //	lineUp=htlivesight.LineUp.InjurySubstitution(lineUp,subjectPlayer,objectPlayer);
                	
                }

//                console.log("Function: IndividualOrderEvent: action: lineup updated with orders!");
                
                var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp);
                
 //               console.log("Function: IndividualOrderEvent: action: converting lineup to string (now I can show it!)="+stringLineUp);
                
                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
              	
                	var side="home";
                
                else
              	
                	var side="away";
              //TODO: restore next line when CHPP unsynch will be fixed.
                $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
                event.lineupElement = htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(stringLineUp),event);
               // $("#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem).css({'background-color':'#88ff88'}).animate({'background-color':'#000000'},1000);
                $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
//                console.log("Function: IndividualOrderEvent: action: passed value to show on right click!");
                
                match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)
                
//                console.log("Function: IndividualOrderEvent: action: calculated new formation="+match.getSideById(event.subjectTeamId).formation);
                
                lineUp[0].update++;
                
//                console.log("Function: IndividualOrderEvent: action: updating counter change="+lineUp[0].update++);
                
                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
            	
                	match.home.lineUp= lineUp;
            	  else
            		match.away.lineUp= lineUp;
                
//                console.log("Function: IndividualOrderEvent: action: end. It seems there isn't any big error here.");
				
				}catch(e){console.log("WARNING!!! This is an error, please copy last log message and the following error:"+e);}

	
};

htlivesight.LineUp.SentOffEvent= function(event, match){
	

    
    var lineUp;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	    lineUp=match.home.lineUp;
  	  else
  		lineUp=match.away.lineUp;
    
    lineUp=htlivesight.LineUp.RemovePlayerFromLineUp(lineUp,event.subjectPlayerId);
    
    var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp);
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
    	  var side="home";
      else
    	  var side="away";
  //  alert("Side= "+side+" subjectTeamId="+event.subjectTeamId+" subjectPlayerId="+event.subjectPlayerId);
   //TODO: restore next line when CHPP unsynch will be fixed.  
    $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
      event.lineupElement = htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(stringLineUp), event);
     // $("#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem).css({'background-color':'#88ff88'}).animate({'background-color':'#000000'},1000);
      $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
      
    match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)

    lineUp[0].update++;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	    match.home.lineUp= lineUp;
	  else
		match.away.lineUp= lineUp;
    
};


htlivesight.LineUp.InjuryWithReplaceEvent= function(event, match){

	var subjectPlayer= new Object();
    
    var objectPlayer= new Object();
    
    subjectPlayer.id= event.subjectPlayerId;
    
    objectPlayer.id= event.objectPlayerId;
    
    subjectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.subjectPlayerId);
    
    objectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.objectPlayerId);
    
    var lineUp;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	    lineUp=match.home.lineUp;
  	  else
  		lineUp=match.away.lineUp;
    
    lineUp=htlivesight.LineUp.InjurySubstitution(lineUp,subjectPlayer,objectPlayer);
    
    var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp);
 
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	  var side="home";
    else
  	  var side="away";
    //TODO: restore next line when CHPP unsynch will be fixed.  
    $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
    event.lineupElement = htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(stringLineUp),event);
   // $("#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem).css({'background-color':'#88ff88'}).animate({'background-color':'#000000'},1000);
    $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
    
    match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)

    lineUp[0].update++;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	    match.home.lineUp= lineUp;
	  else
		match.away.lineUp= lineUp;
	
};


htlivesight.LineUp.LineUpEvent= function(event, match){
	
	  var lineUp;
      
      if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
    	    lineUp=match.home.lineUp;
    	  else
    		lineUp=match.away.lineUp;
    	//passing lineup to rightclick function on schema text in the header of the match.
      var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp);
      return stringLineUp;
	
};

htlivesight.LineUp.MissingKeeperEvent= function(event, match){

	var objectPlayer= new Object();
	
	objectPlayer.id= event.objectPlayerId; // get player id moving to goal
	
	objectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.objectPlayerId); //got player name from event text
	
	var lineUp;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	    lineUp=match.home.lineUp;
  	  else
  		lineUp=match.away.lineUp;


    htlivesight.LineUp.RemovePlayerFromLineUp(lineUp,objectPlayer.id); //moving player from field...
    
    lineUp[0].name= objectPlayer.name; // ... to goal
    lineUp[0].id= objectPlayer.id;
    lineUp[0].behaviourInt= 0;
    
var stringLineUp=htlivesight.LineUp.FromArrayToString(lineUp); // create lineup string
    
if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	  var side="home";
  else
	  var side="away";
//TODO: restore next line when CHPP unsynch will be fixed.
$( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs("destroy");
  event.lineupElement = htlivesight.DOM.createLineupElement(side+"_team_formation_"+match.id+"_"+match.sourceSystem+"_table", htlivesight.Events.translate.parseLineup(stringLineUp),event);
  //$("#"+side+"_team_formation_"+match.id+"_"+match.sourceSystem).css({'background-color':'#88ff88'}).animate({'background-color':'#000000'},1000);
  $( "#"+side+"_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
  
    match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)

    lineUp[0].update++; // increase counter modification event.
    
    if (match.isHomeTeam(event.subjectTeamId)) // updating home/away lineup
	    match.home.lineUp= lineUp;
	  else
		match.away.lineUp= lineUp;
};