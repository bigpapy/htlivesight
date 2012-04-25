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
		lineUp[index].name="                   "; 
		lineUp[index].behaviourInt=0; 
		lineUp[index].id=0;
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

	
htlivesight.Live.FromArrayToString= function (lineUp){	
	var stringLineUp=": "; // because createLineupElement split event text with ":" and takes 2° part.
	for (var index=0; index<lineUp.length; index++) // building the lineup string
	{
		lineUp[index]=htlivesight.LineUp.BehaviourFromIntToString(lineUp[index], index);
//		stringLineUp+=lineUp[index]; // adding player name and individual order
		stringLineUp+=lineUp[index].behaviourString+lineUp[index].name+" "; // adding player name and individual order
		
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

htlivesight.LineUp.RemovePlayerFromLineUp= function (lineUp,playerId){
	
	for (var index=0; index<lineUp.length; index++) // building the lineup string
	{
		if (lineUp[index].id==playerId) 
		{
			lineUp[index].id= 0;
			
			lineUp[index].name= "                   "; // delete name
			
			lineUp[index].behaviourInt= 0; // delete individual order int
			
			lineUp[index].behaviourString= " "; // delete individual order string 
			
			return lineUp;
		};
	};
	
};

htlivesight.LineUp.FormationFromLineUp= function (lineUp){
	var formation="";
	var counterLine=0;
	for (var index=1; index<lineUp.length; index++) // building the lineup string
	{
		if (lineUp[index].id!=0) counterLine++;
		
		if ((index==5) || (index==10)) 
		{
			formation+=counterLine+"-"; // after defenders and midfields add a minus to separate them
			counterLine=0;
		}
		
	}
	formation+=counterLine;

	return formation; 
};

htlivesight.LineUp.ParseSubstitutions= function (xml){
	
	var substitutions= new Array();
	
	try{ // because substitutions aren't always present in the XML files.
		
	
	var substitutionXml= xml.getElementsByTagName("Substitution");
	
	for (var index=0; index<substitutionXml.length; index++) // initializing with empty positions
	{
		substitutions[index]=new Object();
		
		substitutions[index].teamID= substitutionXml[index].getElementsByTagName("TeamID")[0].textContent; 

		
		substitutions[index].subjectPlayerID= substitutionXml[index].getElementsByTagName("SubjectPlayerID")[0].textContent; 

		
		substitutions[index].objectPlayerID= substitutionXml[index].getElementsByTagName("ObjectPlayerID")[0].textContent; 
		
		substitutions[index].orderType= substitutionXml[index].getElementsByTagName("OrderType")[0].textContent; 
		
		substitutions[index].newPositionId= parseInt(substitutionXml[index].getElementsByTagName("NewPositionId")[0].textContent); 
		
		substitutions[index].newPositionBehaviour= substitutionXml[index].getElementsByTagName("NewPositionBehaviour")[0].textContent; 
		
		substitutions[index].matchMinute= substitutionXml[index].getElementsByTagName("MatchMinute")[0].textContent; 
	}
	
	}catch(e){};
	
	return substitutions;
	
};

htlivesight.LineUp.InjurySubstitution= function(lineUp,subjectPlayer,objectPlayer){
	
	for (var index=0; index<lineUp.length; index++) 
	{
		if (lineUp[index].id==subjectPlayer.id) 
		{
			lineUp[index].id= objectPlayer.id;
			
			lineUp[index].name= objectPlayer.name; 
			
			return lineUp;
		};
	};
	
};

htlivesight.LineUp.SubstitutionPlayerInLineUp= function(lineUp,subjectPlayer,objectPlayer){

	// removing player exiting
	lineUp= htlivesight.LineUp.RemovePlayerFromLineUp(lineUp,subjectPlayer.id);

	var index=parseInt(objectPlayer.positionId)-100;// inserting position of entering player

	lineUp[index].id=objectPlayer.id;// inserting other data...

	lineUp[index].name= objectPlayer.name;

	lineUp[index].behaviourInt= objectPlayer.behaviourInt;
		
	return lineUp;

};

htlivesight.LineUp.SubstitutionEvent= function(event, match){
	
	// added by bigpapy to update lineup: start
    //TODO
                var subjectPlayer= new Object();

                var objectPlayer= new Object();

                subjectPlayer.id= event.subjectPlayerId;

                objectPlayer.id= event.objectPlayerId;
 
                for (var index=0; index < match.substitutions.length; index++){
                	
                	if(subjectPlayer.id==match.substitutions[index].subjectPlayerID &&
                			objectPlayer.id==match.substitutions[index].objectPlayerID &&
                			event.minute==match.substitutions[index].matchMinute){

                		objectPlayer.positionId=parseInt(match.substitutions[index].newPositionId);

                        objectPlayer.behaviourInt=match.substitutions[index].newPositionBehaviour;

                	};
     
                };
         
                subjectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.subjectPlayerId);

                objectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.objectPlayerId);

                var lineUp;

                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
              	    lineUp=match.home.lineUp;
              	  else
              		lineUp=match.away.lineUp;

                lineUp=htlivesight.LineUp.SubstitutionPlayerInLineUp(lineUp,subjectPlayer,objectPlayer);

                var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);

                event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, htlivesight.Events.translate.parseLineup(stringLineUp));

                match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)

                lineUp[0].update++;
                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
            	    match.home.lineUp= lineUp;
            	  else
            		match.away.lineUp= lineUp;

    // added by bigpapy to update lineup: end

};

htlivesight.LineUp.SwapEvent= function(event, match){
	
	 // bigpapy implementation swapping in lineup (begin):
    var subjectPlayer= new Object();

    var objectPlayer= new Object();

    subjectPlayer.id= event.subjectPlayerId;


    objectPlayer.id= event.objectPlayerId;


    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	    lineUp=match.home.lineUp;
  	  else
  		lineUp=match.away.lineUp;
           
    subjectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.subjectPlayerId);


    objectPlayer.name= htlivesight.Events.translate.parseScorer(event.text, event.objectPlayerId);


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

    
    var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);

    event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, htlivesight.Events.translate.parseLineup(stringLineUp));
    lineUp[0].update++;
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	    match.home.lineUp= lineUp;
	  else
		match.away.lineUp= lineUp;

 // bigpapy implementation swapping in lineup (end):
};

htlivesight.LineUp.IndividualOrderEvent= function(event, match){

	// added by bigpapy to update lineup: start
    //TODO
                var subjectPlayer= new Object();

                var objectPlayer= new Object();

                subjectPlayer.id= event.subjectPlayerId;

                objectPlayer.id= event.subjectPlayerId;

                for (var index=0; index < match.substitutions.length; index++){
                	
                	if(subjectPlayer.id==match.substitutions[index].subjectPlayerID &&
                			objectPlayer.id==match.substitutions[index].objectPlayerID &&
                			event.minute==match.substitutions[index].matchMinute){

                		objectPlayer.positionId=parseInt(match.substitutions[index].newPositionId);

                		objectPlayer.behaviourInt=match.substitutions[index].newPositionBehaviour;

                	};
     
                };

                var lineUp;

                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
              	    lineUp=match.home.lineUp;
              	  else
              		lineUp=match.away.lineUp;
                
                
                for (var index=0; index<lineUp.length; index++) // building the lineup string
            	{
            		if (lineUp[index].id==subjectPlayer.id) 
            		{
            			objectPlayer.name=lineUp[index].name; // delete name
            			break;
            		}
            	}
                subjectPlayer.name= objectPlayer.name;
                
                

                lineUp=htlivesight.LineUp.SubstitutionPlayerInLineUp(lineUp,subjectPlayer,objectPlayer);

                var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);

                event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, htlivesight.Events.translate.parseLineup(stringLineUp));

                match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)

                lineUp[0].update++;
                if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
            	    match.home.lineUp= lineUp;
            	  else
            		match.away.lineUp= lineUp;

    // added by bigpapy to update lineup: end
	
};

htlivesight.LineUp.SentOffEvent= function(event, match){
	
	// part added by bigpapy
    
    var lineUp;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	    lineUp=match.home.lineUp;
  	  else
  		lineUp=match.away.lineUp;
    
    lineUp=htlivesight.LineUp.RemovePlayerFromLineUp(lineUp,event.subjectPlayerId);
    
    var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);
    
    event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, htlivesight.Events.translate.parseLineup(stringLineUp));
    
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
//    event.special.txt = event.special.txt + ", eventkey:91 ";
    
    var lineUp;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
  	    lineUp=match.home.lineUp;
  	  else
  		lineUp=match.away.lineUp;
    
    lineUp=htlivesight.LineUp.InjurySubstitution(lineUp,subjectPlayer,objectPlayer);
    
    var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);
    
    event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, htlivesight.Events.translate.parseLineup(stringLineUp));
    
    match.getSideById(event.subjectTeamId).formation = htlivesight.LineUp.FormationFromLineUp(lineUp); // updating formation (3-5-2, 4-4-2 etc.)

    lineUp[0].update++;
    
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	    match.home.lineUp= lineUp;
	  else
		match.away.lineUp= lineUp;
	
};

htlivesight.LineUp.InjuryWithoutReplaceEvent= function(event, match){
	
	 /** Here injured is to be considered as a sent off player!!*/
    if (match.isHomeTeam(event.subjectTeamId)) // choosing home/away lineup
	    lineUp=match.home.lineUp;
	  else
		lineUp=match.away.lineUp;
  
  lineUp=htlivesight.LineUp.RemovePlayerFromLineUp(lineUp,event.subjectPlayerId);
  
  var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);
  
  event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, htlivesight.Events.translate.parseLineup(stringLineUp));
  
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
      var stringLineUp=htlivesight.Live.FromArrayToString(lineUp);
      return stringLineUp;
	
};
