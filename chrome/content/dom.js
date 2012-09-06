/* Common elements */
htlivesight.DOM = {
  mode: {
    close:0,
    shade:1,
    minimize:2,
    maximize:3,
    moveup:4,
    movedown:5
  },
  formationpopup:function(id){
	  //	alert("opening popup= "+id+"_table");

	  //"home_team_formation_" + match.id + "_" + match.sourceSystem
	  matchId=id.replace(/(home|away)_team_formation/,"");
	  var side=id.substr(0,4);
	  var match = htlivesight.Match.List[matchId];
	  if (side=="home")
	  {
		  teamName=match.home.team.name;
	  }else if (side=="away"){
		  teamName=match.away.team.name;
	  }

	  $("#"+id+"_table").dialog({ autoOpen: true, show: "fold", hide: "fold", width: 700, height: 330, title: teamName, dialogClass: "formationbg" });
	  //	$("#"+id+"_table").dialog('open');
	  //	alert("popup opened!");
	  return false;
  },

  statisticspopup:function(id){
	  //	alert("opening popup= "+id+"_table");

	  //"home_team_formation_" + match.id + "_" + match.sourceSystem
	  matchId=id.replace(/(home|away)_team_name/,"");
	  var side=id.substr(0,4);
	  var match = htlivesight.Match.List[matchId];
	  if (side=="home")
	  {
		  teamName=match.home.team.name;
	  }else if (side=="away"){
		  teamName=match.away.team.name;
	  }

	  $("#"+id+"_statistics").dialog({ autoOpen: true, width: 350, height: 220, title: teamName });
	  //	$("#"+id+"_table").dialog('open');
	  //	alert("popup opened!");
	  return false;
  },
				
  parser: new DOMParser(),
  parse: function(xml) {
    return htlivesight.DOM.parser.parseFromString(xml, "text/xml").documentElement;
  },
  window: {
    set: function(matchId, sourceSystem, setmode) {
      with (htlivesight.DOM.mode) {
	      var img_file, img = htlivesight.Image.window;
	      
	      if (setmode == close) {
	        htlivesight.DOM.toggleView(matchId, sourceSystem);
	        return;
	      }
	        
	      htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.mode = setmode;
	
	      img_file = (setmode == shade ? img.shade.ON : img.shade.OFF); 
	      document.getElementById("shade_" + matchId + "_" + sourceSystem).setAttribute("src",img_file);
	      
	      img_file = (setmode==minimize ? img.minimize.ON : img.minimize.OFF);
	      document.getElementById("minimize_" + matchId + "_" + sourceSystem).setAttribute("src", img_file);
	  
	      img_file = (setmode==maximize ? img.maximize.ON : img.maximize.OFF);
	      document.getElementById("maximize_" + matchId + "_" + sourceSystem).setAttribute("src", img_file);
	//      alert("htlivesight.DOM.window.set");
	      htlivesight.DOM.window.repaint(matchId, sourceSystem);
      }
    },
    repaint: function(matchId, sourceSystem) {
      var match = htlivesight.Match.List["_"+matchId+"_"+sourceSystem];
      var event;
      var elem;
      var first, last;
      
      var yetToShow=0, index=match.event.list.last;
      first = match.event.list.first;
  //    alert("Repaint:first="+ match.event.list.first);
      last = match.event.list.last;
          
      switch (match.window.mode) {
        case htlivesight.DOM.mode.shade : 
          yetToShow = -1;
          break;
        case htlivesight.DOM.mode.minimize : 
          yetToShow = htlivesight.prefs.matches.windowSize - 1;
          break;
        case htlivesight.DOM.mode.maximize :
          yetToShow = last;
          break;
      }
      
     while (yetToShow>=0 && index>=0) {
    
      
        elem = document.getElementById("ev_row_"+matchId+"_"+sourceSystem+"_"+index);
        event = match.event.list["_"+index];
        if (elem == null || event == null) {
        	
         index--;	
    
          
          continue;
        }
        if (event.isInfo() && !match.window.tip) {
          elem.hidden=true;
          
          index--;
                   
          continue;
        }
        elem.hidden=false;
        index--;
                
        yetToShow--;
    }

      while (index>=0) {
         	  
        elem = document.getElementById("ev_row_"+matchId+"_"+sourceSystem+"_"+index);
        if (elem != null)
          elem.hidden=true;
        
        index--;
        }
    }
  },
  
  toggleTip: function(matchId, sourceSystem) {
    var tip = !htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.tip;
    var img = document.getElementById("tip_" + matchId + "_" + sourceSystem);
    
    htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.tip = tip;
    img.setAttribute("src", tip ? htlivesight.Image.window.info.ON : htlivesight.Image.window.info.OFF);
    
    htlivesight.DOM.window.repaint(matchId, sourceSystem);
  },
//added by bigpapy: open new page on tab about match
  toggleSound: function(matchId, sourceSystem) {
	  var sound = !htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.mute;
	  var img = document.getElementById("sound_" + matchId + "_" + sourceSystem);
//	  var match = Match.List["_"+matchId+"_"+sourceSystem];
	  htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.mute = sound;
	  img.setAttribute("src", sound ? htlivesight.Image.window.sound.OFF : htlivesight.Image.window.sound.ON);
//	  alert("prima di delete");
//	  htlivesight.DOM.window.deleteLiveEvents(match);
//	  alert("dopo di delete e prima di update");
//	  htlivesight.DOM.UpdateLiveEvents(match);
//	  alert("topDown= "+ topDown);
  },
  // (end)added by bigpapy: open new page on tab about match
  
  // added by bigpapy: open new page on tab about match
  toggleLink: function(matchId, sourceSystem) {
	  try{ // added by bigpapy to debug from XUL to HTML
	  var htServer=htlivesight.prefs.general.hattrickServer;
	  if (!htServer){ 
	//	  var strbundle = document.getElementById("stringsauthorize");// internationalization: get local file content.
       	  var no_htserver=/*strbundle.getString("no_htserver")*/htlivesight.Util.Parse("NoHTServer",data[0]);
       	  alert(no_htserver);
       	  htServer="www";
      };
	  var matchLink="http://" + htServer + ".hattrick.org/Club/Matches/Match.aspx?matchID=" + matchId;
	  if (sourceSystem=="youth"||sourceSystem=="True"){ matchLink=matchLink+"&SourceSystem=Youth";};
	  if(htlivesight.Match.List["_"+matchId+"_"+sourceSystem].arena.name==null){ matchLink=matchLink+"&SourceSystem=HTOIntegrated";};
	 var matchpage=window.open(matchLink);
  }catch(e){alert("toggleView: "+e);}// added by bigpapy to debug from XUL to HTML
	  },
	  // (end)added by bigpapy: open new page on tab about match
	  
  toggleView: function(matchId, sourceSystem) {
	  try{ // added by bigpapy to debug from XUL to HTML
    var box = document.getElementById("live_" + matchId + "_" + sourceSystem);
    var show = box.hidden;
    var img = document.getElementById("short_liveimage_" + matchId + "_" + sourceSystem);

    if (show) {
      var curr=box;
      var prev=curr.previousSibling;
      while (prev != null && prev.hidden == true) {
        curr=prev;
        prev=curr.previousSibling;
      }
      box.parentNode.insertBefore(box, curr);
      
      box.hidden = false;
      img.setAttribute("src", htlivesight.Image.live.ON);
   //   img.setAttribute("class", "imgwinboxshade");
      htlivesight.DOM.window.repaint(matchId, sourceSystem);
    } else {      
      box.hidden = true;
      img.setAttribute("src", htlivesight.Image.live.OFF);
  //    img.setAttribute("class", "imgwinboxopen");

      var curr=box;
      var next=curr.nextSibling;
      while (next != null && next.hidden == false) {
        curr=next;
        next=curr.nextSibling;
      }
      box.parentNode.insertBefore(box, next);
    }
	  }catch(e){alert("toggleView: "+e);}// added by bigpapy to debug from XUL to HTML
  },
  deleteView: function(matchId, sourceSystem) {
	  try{
    htlivesight.Live.HTTPDeleteMatch(matchId, sourceSystem);
    var box = document.getElementById("live_" + matchId + "_" + sourceSystem);
    var img = document.getElementById("short_liveimage_" + matchId + "_" + sourceSystem);
    
    box.hidden = true;
    img.setAttribute("src", htlivesight.Image.live.OFF);
   // img.setAttribute("class", "imgwinboxopen");
    htlivesight.Match.List["_" + matchId + "_" + sourceSystem].live = false;
    htlivesight.liveCount--;

    document.getElementById("short_" + matchId + "_" + sourceSystem).hidden = true;
    htlivesight.DOM.window.set(matchId, sourceSystem, htlivesight.DOM.mode.minimize);
  }catch(e){alert("deleteView: "+e);}// added by bigpapy to debug from XUL to HTML
  },
  createLineupElement: function(id, lineup, event) {
	  try{// added by bigpapy to debug from XUL to HTML		  
    var label, hbox, ul;
    
  //  $( "#"+id ).tabs();

    
    
    
    var mainDiv= document.getElementById(id);
    

    if (mainDiv == null){
    	mainDiv= document.createElement("div");
    	mainDiv.setAttribute("id", id);
    	mainDiv.style.display='none';
    	var popupset = document.getElementById("live_box");
    	popupset.appendChild(mainDiv);
    	ul = document.createElement("ul");
    	mainDiv.appendChild(ul);
    }else{
    	ul = mainDiv.getElementsByTagName("ul")[0];	
    }
    var li_ = document.createElement("li");
    ul.appendChild(li_);
    var a = document.createElement("a");
    if (event.minute=="0") var index=1;
    else index= ul.getElementsByTagName("li").length;
    
    a.setAttribute("href","#"+id+"-"+index);
    a.innerHTML=event.minute+"'";
    li_.appendChild(a);    

    var popup = document.createElement("table");
    popup.cellSpacing="15px";
    popup.cellPadding="5px";
    popup.width="640px";
//    if (document.getElementById(id) != null){
//    	var element_to_remove= document.getElementById(id);
 //     popupset.removeChild(element_to_remove);
 //   }
    mainDiv.appendChild(popup);
    popup.setAttribute("id", id+"-"+index);
  //  popup.setAttribute("class", "formationpopup");
	popup.style.textAlign="center";
//	popup.style.display='none';
	//var popuptext = document.createElement("span");
	//popup.appendChild(popuptext);
	//if (true) popuptext.innerHTML=lineup;return;
	var lineupText="";
    var i, j;
    //alert(""+lineup);
    for(i=0; i<lineup.length; i++) {
      hbox = document.createElement("tr");
      hbox.setAttribute("pack", "center");
	  //hbox.setAttribute('class','formationrow');
      popup.appendChild(hbox);
      for(j=0; j<lineup[i].length; j++) {
        label = document.createElement("td");
        //label.style.background="#919090";
		label.setAttribute('class','formationplayer');
        
        label.width="20%";
        label.height="30";
    //	  if (htlivesight.DOM.getTextContent(lineup[i][j]).match("     ")){
    //		  lineupText=lineupText + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    //	  }
    //	  lineupText=lineupText +  htlivesight.DOM.getTextContent(lineup[i][j])+ "&nbsp;&nbsp;&nbsp;&nbsp;";
    	//  console.log(lineup[i][j]);
        if (i==0 && j==0){
        	label_empty = document.createElement("td");
        	hbox.appendChild(label_empty);
        	label_empty1 = document.createElement("td");
        	hbox.appendChild(label_empty1);
        }
        if (i==3 && j==0){
        	label_empty = document.createElement("td");
        	hbox.appendChild(label_empty);
        }
        label.innerHTML= htlivesight.DOM.getTextContent(lineup[i][j]);
     //   label.setAttribute("class", "player_block");
     //   label.setAttribute("class", "border");
        hbox.appendChild(label);
      }
    //  lineupText+="<br>";
    };
    //lineupText=lineup;
    //alert(lineupText)
   // popuptext.innerHTML= lineupText; return
    return popup;
  }catch(e){alert("createLineupElement: "+e);}// added by bigpapy to debug from XUL to HTML
  },
  
  // function added by bigpapy to have statistic left clicking on team name
  createStatisticElement: function(id, match, event) {
	  try{
	    var label, hbox;
	    var popupset = document.getElementById("live_box");
	    var popup = document.createElement("table");
	    popupset.appendChild(popup);
	    popup.setAttribute("id", id);
		popup.setAttribute("class", "formationpopup");
		popup.style.display = 'none';
	
		
        hbox = document.createElement("tr");
	    //    hbox.setAttribute("pack", "center");
	   //     label = document.createElement("label");
        var occasion=match.getSideById(event.subjectTeamId).occasion;
        var goals=match.getSideById(event.subjectTeamId).goals;
        label = document.createElement("td");
      	label.innerHTML=htlivesight.Util.Parse("Goals",data[0]);
      	label_number = document.createElement("td");
      	label_number.innerHTML=goals+" / "+occasion;
        hbox.appendChild(label);
        hbox.appendChild(label_number);
        popup.appendChild(hbox);
		// creating row (bigpapy)
		hbox = document.createElement("tr");
	  //    hbox.setAttribute("pack", "center");
	      popup.appendChild(hbox);
	      // adding element title to the row (bigpapy)
	      	      
	        var free_kick=match.getSideById(event.subjectTeamId).free_kick;
	        var free_kick_goal=match.getSideById(event.subjectTeamId).free_kick_goal;
	      	label = document.createElement("td");
	      	label.innerHTML=htlivesight.Util.Parse("FreeKicks",data[0]);;
	      	label_number = document.createElement("td");
	      	label_number.innerHTML=free_kick_goal+" / "+free_kick;
	        hbox.appendChild(label);
	        hbox.appendChild(label_number);
	        popup.appendChild(hbox);
	//TODO        
	        hbox = document.createElement("tr");
	  //      hbox.setAttribute("pack", "center");
	   //     label = document.createElement("label");
	        var penalty=match.getSideById(event.subjectTeamId).penalty;
	        var penalty_goal=match.getSideById(event.subjectTeamId).penalty_goal;
	      	label = document.createElement("td");
	      	label.innerHTML=htlivesight.Util.Parse("TimePenalties",data[0]);
	      	label_number = document.createElement("td");
	      	label_number.innerHTML=penalty_goal+" / "+penalty;
	        hbox.appendChild(label);
	        hbox.appendChild(label_number);
	        popup.appendChild(hbox);
	        
	        hbox = document.createElement("tr");
	   //     hbox.setAttribute("pack", "center");
	   //     label = document.createElement("label");
	        var left=match.getSideById(event.subjectTeamId).left;
	        var left_goal=match.getSideById(event.subjectTeamId).left_goal;
	        label = document.createElement("td");
	      	label.innerHTML=htlivesight.Util.capitalize(htlivesight.Util.Parse("EventSideLeft",data[0]));
	      	label_number = document.createElement("td");
	      	label_number.innerHTML=left_goal+" / "+left;
	        hbox.appendChild(label);
	        hbox.appendChild(label_number);
	        popup.appendChild(hbox);
	        
	        hbox = document.createElement("tr");
	   //     hbox.setAttribute("pack", "center");
	   //     label = document.createElement("label");
	        var center=match.getSideById(event.subjectTeamId).center;
	        var center_goal=match.getSideById(event.subjectTeamId).center_goal;
	        label = document.createElement("td");
	      	label.innerHTML=htlivesight.Util.capitalize(htlivesight.Util.Parse("EventSideCenter",data[0]));
	      	label_number = document.createElement("td");
	      	label_number.innerHTML=center_goal+" / "+center;
	        hbox.appendChild(label);
	        hbox.appendChild(label_number);
	        popup.appendChild(hbox);
	        
	        hbox = document.createElement("tr");
	    //    hbox.setAttribute("pack", "center");
	   //     label = document.createElement("label");
	        var right=match.getSideById(event.subjectTeamId).right;
	        var right_goal=match.getSideById(event.subjectTeamId).right_goal;
	        label = document.createElement("td");
	      	label.innerHTML=htlivesight.Util.capitalize(htlivesight.Util.Parse("EventSideRight",data[0]));
	      	label_number = document.createElement("td");
	      	label_number.innerHTML=right_goal+" / "+right;
	        hbox.appendChild(label);
	        hbox.appendChild(label_number);
	        popup.appendChild(hbox);
	        
	        hbox = document.createElement("tr");
		    //    hbox.setAttribute("pack", "center");
		   //     label = document.createElement("label");
		        var special=match.getSideById(event.subjectTeamId).special_event;
		        var special_goal=match.getSideById(event.subjectTeamId).special_event_goal;
		        label = document.createElement("td");
		      	label.innerHTML=htlivesight.Util.Parse("SpecialEvent",data[0]);;
		      	label_number = document.createElement("td");
		      	label_number.innerHTML=special_goal+" / "+special;
		        hbox.appendChild(label);
		        hbox.appendChild(label_number);
		        popup.appendChild(hbox);
	        
			   hbox = document.createElement("tr");
				    //    hbox.setAttribute("pack", "center");
				   //     label = document.createElement("label");
				   var yellow=match.getSideById(event.subjectTeamId).yellow;
				   label = document.createElement("td");
			       label.innerHTML=htlivesight.Util.Parse("YellowCards",data[0]);
			       label_number = document.createElement("td");
			      	label_number.innerHTML=yellow;
			        hbox.appendChild(label);
			        hbox.appendChild(label_number);
			        popup.appendChild(hbox);
				        
			  hbox = document.createElement("tr");
					    //    hbox.setAttribute("pack", "center");
					   //     label = document.createElement("label");
				   var red=match.getSideById(event.subjectTeamId).red;
				   label = document.createElement("td");
			       label.innerHTML=htlivesight.Util.Parse("RedCards",data[0]);
			       label_number = document.createElement("td");
			      	label_number.innerHTML=red;
			        hbox.appendChild(label);
			        hbox.appendChild(label_number);
			        popup.appendChild(hbox);
				    //    hbox.setAttribute("pack", "center");
				   //     label = document.createElement("label");
			        hbox = document.createElement("tr");
			   var injured=match.getSideById(event.subjectTeamId).injured;
			   label = document.createElement("td");
		       label.innerHTML=htlivesight.Util.Parse("Injuries",data[0]);
		       label_number = document.createElement("td");
		      	label_number.innerHTML=injured;
		        hbox.appendChild(label);
		        hbox.appendChild(label_number);
		        popup.appendChild(hbox);
	        
			   hbox = document.createElement("tr");
			    //    hbox.setAttribute("pack", "center");
			   //     label = document.createElement("label");
		   var possession1=match.getSideById(event.subjectTeamId).possession_1;
		   var possession2=match.getSideById(event.subjectTeamId).possession_2;
		   label = document.createElement("td");
	       label.innerHTML=label.innerHTML=htlivesight.Util.Parse("BallPosses",data[0])+" "+htlivesight.Util.decapitalize(htlivesight.Util.Parse("TimeSecondHalf",data[0]));
	       label_number = document.createElement("td");
	      	label_number.innerHTML=+possession1+"%";
	        hbox.appendChild(label);
	        hbox.appendChild(label_number);
	        popup.appendChild(hbox);
	        
	        hbox = document.createElement("tr");
	        label = document.createElement("td");
		       label.innerHTML=htlivesight.Util.Parse("BallPosses",data[0])+" "+htlivesight.Util.decapitalize(htlivesight.Util.Parse("TimeFirstHalf",data[0]));
		        label_number = document.createElement("td");
		      	label_number.innerHTML=+possession2+"%";
		        hbox.appendChild(label);
		        hbox.appendChild(label_number);
		        popup.appendChild(hbox);
			   
	        return popup;}catch(e){alert("createStatisticElement: "+e)}

	  },
  
  createAddTeamToFriendsPopup: function(team) {
 //   var strings = document.getElementById("strings");
	  try{ // added by bigpapy to debug from XUL to HTML
    var popupset = document.getElementById("popup_set");
    var popup = document.createElement("popup");
    popup.setAttribute("id", "add_team_" +team.id);
	popup.setAttribute("class", "friendpopup");
    popupset.appendChild(popup);
    var menuitem = document.createElement("menuitem");
    popup.appendChild(menuitem);
    menuitem.setAttribute("label", /*strings.getString("menu.add_friend")*/htlivesight.Util.Parse("MenuAddFriend",data[0]) + ": " + team.name);  
    menuitem.setAttribute("image", htlivesight.Image.friend.add.ON);
    menuitem.setAttribute("class", "menuitem-iconic");
//    menuitem.setAttribute("oncommand", "htlivesight.Click.addTeamToFriendsList("+team.id+",'"+team.youth+"')");
    menuitem.addEventListener("command", function(){htlivesight.Click.addTeamToFriendsList(team.id,team.youth);},false);
    return popup;
	  }catch(e){alert("createAddTeamToFriendsPopup: "+e);}// added by bigpapy to debug from XUL to HTML
  },
  addServerToPopup: function(server) {
 //   var strings = document.getElementById("strings");
//	  alert("server Pop up value before");
	  document.getElementById("ServerStatus").innerHTML=server;
//	  alert("server Pop up value after");
 //   var serverString = document.getElementById("server");
  //  serverString.setAttribute("label", strings.getString("menu.server") + " " + server.substring(7));
 //   serverString.setAttribute("label", /*strings.getString("menu.server")*/htlivesight.Util.Parse("MenuServer",data[0]) + " " + server);
  },
  createTextElement: function (text, doClean) {
	  try{//added by bigpapy to debug from XUL to HTML
    //var d = document.createElementNS('http://www.w3.org/1999/xhtml', 'html:div');    
    var resultDoc = htlivesight.DOM.parser.parseFromString("<span>" + (doClean ? htlivesight.Util.CleanText(text) : text)+ "</span>","text/xml");
    var d = resultDoc.documentElement;  
    return d.firstChild;
	  }catch(e){alert("createTextElement :"+e);} //added by bigpapy to debug from XUL to HTML
  },
  getTextContent: function (text, doClean) {
    try {
      var content = htlivesight.DOM.createTextElement(text, doClean).textContent;
      return content;
    } catch(e) {
        htlivesight.Log.debug("DOM.getTextContent. " + e);
    }
    return null;
  },
  createTextEventElement: function(event) {
	  try{ // added by bigpapy to debug from XUL to HTML
	var cleanedText = htlivesight.Util.cleanTags(event.text);
//	alert("Util.cleanTags(cleanedText) = "+ cleanedText);
//	console.log(cleanedText);
	cleanedText= htlivesight.Util.CleanText2(cleanedText);//added by bigpapy
//	console.log(cleanedText);
  	
    var resultDoc = htlivesight.DOM.parser.parseFromString("<root>" + cleanedText + "</root>","text/xml");
    var nodeList = resultDoc.documentElement.childNodes;
    
    var retElement = document.createElement("td");
    retElement.setAttribute("class", "event_text");
    
		var newElement;
		for (var i=0; i<nodeList.length; i++) {
			var child = nodeList.item(i);
			if (child.nodeName == "#text") {
		    newElement = document.createTextNode(child.textContent);		    
			} else if (child.nodeName == "a") {
			  newElement = document.createElementNS("http://www.w3.org/1999/xhtml", "em");
		    newElement.setAttribute("class", "player_name");
		    newElement.appendChild(document.createTextNode(child.firstChild.textContent));		    
			} else {
				newElement = null;
			}
			if (newElement) retElement.appendChild(newElement);
		}

		if (event.special) {
			newElement = document.createElementNS("http://www.w3.org/1999/xhtml", "em");
		  newElement.setAttribute("class", "special_event");
		  newElement.appendChild(document.createTextNode(" ["+event.special.txt+"]"));		    
			retElement.appendChild(newElement);
		    if (prefs.colors.seTextColorCheck)
		    	newElement.style.color= "#" + prefs.colors.seTextColorCode;
		}
    return retElement;
  }catch(e){alert("createTextEventElement: "+e);}// added by bigpapy to debug from XUL to HTML
  }

};

/* -----------------------------------------------------------
 * Update Live Match
 * ----------------------------------------------------------- */

 
htlivesight.DOM.UpdateLiveMatch = function(match) {
  try {
    htlivesight.DOM.UpdateLiveBox(match);
    htlivesight.DOM.UpdateShortBox(match);
    htlivesight.DOM.window.repaint(match.id, match.sourceSystem);
  } catch(e) {
    alert("DOM.UpdateLiveMatch\n" + e);
  }
};

/* -----------------------------------------------------------
 * Live Box
 * ----------------------------------------------------------- */
htlivesight.DOM.UpdateLiveBox = function(match) {
  try {
    var box = document.getElementById("live_" + match.id + "_" + match.sourceSystem);
    if (!box) htlivesight.DOM.CreateElementLiveBox(match);
    htlivesight.DOM.UpdateLiveHeader(match);
    htlivesight.DOM.UpdateLiveEvents(match);
  } catch(e) {
    alert("DOM.UpdateLiveBox\n" + e);
  }

};
 htlivesight.DOM.CreateElementLiveBox= function(match) {
  var livebox, hbox, vbox, child;
  
try{ //added by bigpapy to debug from xul to html

  livebox = document.getElementById("live_box");
  //hbox = document.createElement("hbox");
  hbox = document.createElement("div");
  //hbox.collapsed=true;
  hbox.hidden=true;
  
  livebox.appendChild(hbox);
  hbox.setAttribute("id", "live_" + match.id + "_" + match.sourceSystem);

  //vbox = document.createElement("vbox");
  
  //vbox = document.createElement("table");
  //hbox.appendChild(vbox);
  
  //vbox.setAttribute("flex", "1");
  child = htlivesight.DOM.CreateElementGroupboxLiveMatch(match);
  //vbox.appendChild(child);
  hbox.appendChild(child);
 }catch(e){alert("CreateElementGroupboxLiveMatch: ")+e;}// added by bigpapy to debug from XML to HTML
};

 htlivesight.DOM.CreateElementGroupboxLiveMatch=function(match) {
  var box, /*caption,*/ header, events;
  
  //box = document.createElement("groupbox");
  //caption = document.createElement("caption");
  //caption.setAttribute("label", "Live Match");
  //box.appendChild(caption);
  try{ // added by bigpapy to debug from XUL to HTML
  box = document.createElement("table");
  box.setAttribute("class", "live_match matchheader ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active");
  

  header = htlivesight.DOM.createElementBoxLiveMatchHeader(match);
  box.appendChild(header);

  events = htlivesight.DOM.CreateElementGridLiveMatchEvents(match);
  box.appendChild(events);

  return box;
 }catch(e){alert("CreateElementGroupboxLiveMatch: ")+e;}// added by bigpapy to debug from XML to HTML
};

/* -----------------------------------------------------------
 * Header
 * ----------------------------------------------------------- */

/* --- update header -------- */
 htlivesight.DOM.UpdateLiveHeader= function(match) {
  var label/*, attr*/;
 // var headerElement = document.getElementById("box_header_"+match.id + "_" + match.sourceSystem);
  
  try {
	
    if (match.arena.name) {
      document.getElementById("arena_name_" + match.id + "_" + match.sourceSystem).innerHTML = match.arena.name;
     // label = document.getElementById("arena_name_" + match.id + "_" + match.sourceSystem);
     // label.setAttribute("value", htlivesight.DOM.getTextContent(match.arena.name));
    }
    
    if (match.weather.image) {
      label = document.getElementById("weather_image_" + match.id + "_" + match.sourceSystem);
      label.setAttribute("src", match.weather.image);
	  label.setAttribute("class", "weather_image");
    }

    if (match.arena.attendance) {
      document.getElementById("arena_attendance_" + match.id + "_" + match.sourceSystem).innerHTML = match.arena.attendance;
    }
    
    if (match.home.tactic) {
    	document.getElementById("home_team_tactic_" + match.id + "_" + match.sourceSystem).innerHTML = match.home.tactic;
    //  label = document.getElementById("home_team_tactic_" + match.id + "_" + match.sourceSystem);
    //  label.setAttribute("value", match.home.tactic);
    }
    
    if (match.home.formation) {
    	document.getElementById("home_team_formation_" + match.id + "_" + match.sourceSystem).innerHTML = match.home.formation;
		//label = document.getElementById("home_team_formation_" + match.id + "_" + match.sourceSystem);
		  
    //  label = document.getElementById("home_team_formation_" + match.id + "_" + match.sourceSystem);
    //  label.setAttribute("value", match.home.formation);
    }

    if (match.away.formation) {
      document.getElementById("away_team_formation_" + match.id + "_" + match.sourceSystem).innerHTML = match.away.formation;
   //   label = document.getElementById("away_team_formation_" + match.id + "_" + match.sourceSystem);
   //   label.setAttribute("value", match.away.formation);
    }

    if (match.away.tactic) {
      document.getElementById("away_team_tactic_" + match.id + "_" + match.sourceSystem).innerHTML = match.away.tactic;
   //   label = document.getElementById("away_team_tactic_" + match.id + "_" + match.sourceSystem);
   //   label.setAttribute("value", match.away.tactic);
    }

    if (htlivesight.prefs.matches.scorers) {
      label = document.getElementById("home_team_scorers1_" + match.id + "_" + match.sourceSystem);  
      var label2 = document.getElementById("home_team_scorers2_" + match.id + "_" + match.sourceSystem);
      var label3 = document.getElementById("away_team_scorers2_" + match.id + "_" + match.sourceSystem);
      if (match.home.scorers) {
        var scorerText = new Array;
        scorerText[0] = "";
        scorerText[1] = "";
        var line = 0;
        var numplayer = 1;
        for(var player in match.home.scorers) {
          scorerText[line] += match.home.scorers[player].name + match.home.scorers[player].mins + ") ";
          if (numplayer++ == 3)
            line++;
        }
     //   label.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[0]));
        label.innerHTML= htlivesight.DOM.getTextContent(scorerText[0]);
        if (numplayer > 4) {
          //label2.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[1]));
          label2.innerHTML= htlivesight.DOM.getTextContent(scorerText[1]);
          //label2.setAttribute("hidden", "false");
          label2.setAttribute("style", "display:block");
          //label3.setAttribute("hidden", "false");
          label3.setAttribute("style", "display:block");
        }
      }
  
      label = document.getElementById("away_team_scorers1_" + match.id + "_" + match.sourceSystem);  
      if (match.away.scorers) {
        var scorerText = new Array;
        scorerText[0] = "";
        scorerText[1] = "";
        var line = 0;
        var numplayer = 1;
        for(var player in match.away.scorers) {
          scorerText[line] += match.away.scorers[player].name + match.away.scorers[player].mins + ") ";
          if (numplayer++ == 3)
            line++;
        }
       // label.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[0]));
        label.innerHTML= htlivesight.DOM.getTextContent(scorerText[0]);
        if (numplayer > 4) {
          // label3.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[1]));
        	label3.innerHTML= htlivesight.DOM.getTextContent(scorerText[1]);
          //label3.setAttribute("hidden", "false");
        	label2.setAttribute("style", "display:block");
          //label2.setAttribute("hidden", "false");
        	label3.setAttribute("style", "display:block");
        }
      }
    }
    
    
    
    
 // part added by bigpapy to show booked players (begin)
 
 	    if (htlivesight.prefs.matches.booked) {
  
 	      label = document.getElementById("home_team_booked1_" + match.id + "_" + match.sourceSystem);
 
 	      var label2 = document.getElementById("home_team_booked2_" + match.id + "_" + match.sourceSystem);
  
 	      var label3 = document.getElementById("away_team_booked2_" + match.id + "_" + match.sourceSystem);
   
 	      if (match.home.booked) {
  
 	        var bookedText = new Array;
 
 	        bookedText[0] = "";
  
 	        bookedText[1] = "";
  
 	        var line = 0;
 
 	        var numplayer = 1;
 
  	        for(var player in match.home.booked) {
   
 	        	if (match.home.booked[player].name!= undefined && match.home.booked[player].mins!= undefined)
 
 	          bookedText[line] += match.home.booked[player].name + match.home.booked[player].mins + ") ";
 
 	          if (numplayer++ == 3)

 	            line++;
  
 	        }
 
 	        label.innerHTML= htlivesight.DOM.getTextContent(bookedText[0]);
  
 	        if (numplayer > 4) {
  
 	          label2.innerHTML= htlivesight.DOM.getTextContent(bookedText[1]);
 
  	          label2.setAttribute("style", "display:block");

 	          label3.setAttribute("style", "display:block");

 	        }
   
 	      }
 
 	      label = document.getElementById("away_team_booked1_" + match.id + "_" + match.sourceSystem);

 	      if (match.away.booked) {
 
 	        var bookedText = new Array;
  
 	        bookedText[0] = "";
 
 	        bookedText[1] = "";

 	        var line = 0;
 
 	        var numplayer = 1;

 	        for(var player in match.away.booked) {

 	        	if (match.away.booked[player].name!= undefined && match.away.booked[player].mins!= undefined)
 
 	          bookedText[line] += match.away.booked[player].name + match.away.booked[player].mins + ") ";

 	          if (numplayer++ == 3)
 
 	            line++;
  
 	        }
  
 	        label.innerHTML= htlivesight.DOM.getTextContent(bookedText[0]);

 	        if (numplayer > 4) {
 
 	          label3.innerHTML= htlivesight.DOM.getTextContent(bookedText[1]);

 	          label3.setAttribute("style", "display:block");
 
 	          label2.setAttribute("style", "display:block");

 	        }
 
 	      }
 	    }
  	   // part added by bigpapy to show booked players (end)
  	      // part added by bigpapy to show sent_off players (begin)
 	    if (htlivesight.prefs.matches.sentOff) {
 	    	
  	      label = document.getElementById("home_team_sent_off1_" + match.id + "_" + match.sourceSystem);
  	      
  	      var label2 = document.getElementById("home_team_sent_off2_" + match.id + "_" + match.sourceSystem);
  
 	      var label3 = document.getElementById("away_team_sent_off2_" + match.id + "_" + match.sourceSystem);
 
 	      if (match.home.sent_off) {
 
 	        var sent_offText = new Array;
 
 	        sent_offText[0] = "";
 
 	        sent_offText[1] = "";
 	        
 	        var line = 0;
 	        
 	        var numplayer = 1;
 
 	        for(var player in match.home.sent_off) {

 	        	if (match.home.sent_off[player].name!= undefined && match.home.sent_off[player].mins!= undefined)

 	        		sent_offText[line] += match.home.sent_off[player].name + match.home.sent_off[player].mins + ") ";
 
 	          if (numplayer++ == 3)
  
 	            line++;
 	        }

 	        label.innerHTML= htlivesight.DOM.getTextContent(sent_offText[0]);
 	        
	        if (numplayer > 4) {
 
 	          label2.innerHTML= htlivesight.DOM.getTextContent(sent_offText[1]);
 
 	          label2.setAttribute("style", "display:block");
  
 	          label3.setAttribute("style", "display:block");
 
 	        }
 	      }

 	      label = document.getElementById("away_team_sent_off1_" + match.id + "_" + match.sourceSystem);
 
 	      if (match.away.sent_off) {
 
 	        var sent_offText = new Array;
 
 	        sent_offText[0] = "";
 	        
 	        sent_offText[1] = "";
 	        
  	        var line = 0;
  	        
 	        var numplayer = 1;
 	        
 	        for(var player in match.away.sent_off) {
 	        	
  	        	if (match.away.sent_off[player].name!= undefined && match.away.sent_off[player].mins!= undefined)

  	        		sent_offText[line] += match.away.sent_off[player].name + match.away.sent_off[player].mins + ") ";

  	        	if (numplayer++ == 3)
  	            line++;
 	        }
 	        label.innerHTML= htlivesight.DOM.getTextContent(sent_offText[0]);
 	        
 	        if (numplayer > 4) {
 	        	
 	          label3.innerHTML= htlivesight.DOM.getTextContent(sent_offText[1]);
 	          
  	          label3.setAttribute("style", "display:block");
  	          
 	          label2.setAttribute("style", "display:block");

 	        }
 	      }
 	    }
 	   // part added by bigpapy to show sent_off players (end)

	      // part added by bigpapy to show injured players (begin)
 	    if (htlivesight.prefs.matches.injured) {
 	    	
  	      label = document.getElementById("home_team_injured1_" + match.id + "_" + match.sourceSystem);
  	      
  	      var label2 = document.getElementById("home_team_injured2_" + match.id + "_" + match.sourceSystem);
  
 	      var label3 = document.getElementById("away_team_injured2_" + match.id + "_" + match.sourceSystem);
 
 	      if (match.home.injuries) {
 
 	        var injuredText = new Array;
 
 	        injuredText[0] = "";
 
 	        injuredText[1] = "";
 	        
 	        var line = 0;
 	        
 	        var numplayer = 1;
 
 	        for(var player in match.home.injuries) {

 	        	if (match.home.injuries[player].name!= undefined && match.home.injuries[player].mins!= undefined)

 	        		injuredText[line] += match.home.injuries[player].name + match.home.injuries[player].mins + ") ";
 
 	          if (numplayer++ == 3)
  
 	            line++;
 	        }

 	        label.innerHTML= htlivesight.DOM.getTextContent(injuredText[0]);
 	        
	        if (numplayer > 4) {
 
 	          label2.innerHTML= htlivesight.DOM.getTextContent(injuredText[1]);
 
 	          label2.setAttribute("style", "display:block");
  
 	          label3.setAttribute("style", "display:block");
 
 	        }
 	      }

 	      label = document.getElementById("away_team_injured1_" + match.id + "_" + match.sourceSystem);
 
 	      if (match.away.injuries) {
 
 	        var injuredText = new Array;
 
 	        injuredText[0] = "";
 	        
 	        injuredText[1] = "";
 	        
  	        var line = 0;
  	        
 	        var numplayer = 1;
 	        
 	        for(var player in match.away.injuries) {
 	        	
  	        	if (match.away.injuries[player].name!= undefined && match.away.injuries[player].mins!= undefined)

  	        		injuredText[line] += match.away.injuries[player].name + match.away.injuries[player].mins + ") ";

  	        	if (numplayer++ == 3)
  	            line++;
 	        }
 	        label.innerHTML= htlivesight.DOM.getTextContent(injuredText[0]);
 	        
 	        if (numplayer > 4) {
 	        	
 	          label3.innerHTML= htlivesight.DOM.getTextContent(injuredText[1]);
 	          
  	          label3.setAttribute("style", "display:block");
  	          
 	          label2.setAttribute("style", "display:block");

 	        }
 	      }
 	    }
 	   // part added by bigpapy to show injured players (end)
    
    
    
    document.getElementById("time_" + match.id + "_" + match.sourceSystem).innerHTML = match.timeElapsed;    
  //  label = document.getElementById("time_" + match.id + "_" + match.sourceSystem);
  //  label.setAttribute("value", match.timeElapsed);

    document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem).innerHTML = match.home.team.name;
 //   label = document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem);
 //   label.setAttribute("value", htlivesight.DOM.getTextContent(match.home.team.name));

    document.getElementById("home_team_goals_" + match.id + "_" + match.sourceSystem).innerHTML = match.home.goals;
 //   label = document.getElementById("home_team_goals_" + match.id + "_" + match.sourceSystem);
 //   label.setAttribute("value", match.home.goals);

    document.getElementById("away_team_goals_" + match.id + "_" + match.sourceSystem).innerHTML = match.away.goals;
 //   label = document.getElementById("away_team_goals_" + match.id + "_" + match.sourceSystem);
 //   label.setAttribute("value", match.away.goals);

    document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem).innerHTML =match.away.team.name;
 //   label = document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem);
 //   label.setAttribute("value", htlivesight.DOM.getTextContent(match.away.team.name));

  } catch(e) {
    alert("DOM.UpdateLiveHeader\n" + e);
  }
};

/* --- Create Header -------------------------- */
htlivesight.DOM.createElementBoxLiveMatchHeader = function(match) {
  var header, tbody, placardbox, box, hbox, vbox, label, link, temp,/*spacer,*/img;
//  var strings = document.getElementById("strings");
  //header = document.createElement("vbox");
  try{ //added by bigpapy to debug from xul to html
  header = document.createElement("thead");
  header.setAttribute("class", "box_header animation");
  header.setAttribute("id", "box_header_"+match.id + "_" + match.sourceSystem);
  //header.setAttribute("flex", "1");

  // first row:  header header
  //hbox = document.createElement("hbox");
  hbox = document.createElement("tr");
  header.appendChild(hbox);
  //hbox.setAttribute("align", "center");
  hbox.setAttribute("class", "box_header_header ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top");

  //var hboxL = document.createElement("hbox");
  var hboxL = document.createElement("td");
  hboxL.setAttribute("class", "line1header");
  hbox.appendChild(hboxL);
  //hboxL.setAttribute("flex", "1");
  hboxL.setAttribute("align", "left");
  
  label = document.createElement("span"); //label = document.createElement("label");
  hboxL.appendChild(label);
  label.setAttribute("id", "arena_name_" + match.id + "_" + match.sourceSystem);
	label.setAttribute("class", "arena_name");
  img = document.createElement("img");
  hboxL.appendChild(img);
  img.setAttribute("src", htlivesight.Image.transparent);
  img.setAttribute("id", "weather_image_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("class", "weather_image");  
  label = document.createElement("span"); //label = document.createElement("label");
  hboxL.appendChild(label);
  label.setAttribute("id", "arena_attendance_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "arena_attendance");
  label = document.createElement("span");
	hboxL.appendChild(label);
  label.setAttribute("id", "weather_text_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "weather_text");

  //var hboxM = document.createElement("hbox");
  var hboxM = document.createElement("td");
  hboxM.setAttribute("class", "chronoheader");
  hbox.appendChild(hboxM);
  //hboxM.setAttribute("flex", "1");
  //hboxM.setAttribute("align", "center");
  
  label = document.createElement("span");
  label.setAttribute("id", "time_" + match.id + "_" + match.sourceSystem);
  hboxM.appendChild(label);
 
  //var hboxR = document.createElement("hbox");
  var hboxR = document.createElement("td");
  hboxR.setAttribute("class", "iconzone");
  hbox.appendChild(hboxR);
  //hboxR.setAttribute("flex", "1");
  //hboxR.setAttribute("align", "right");

  box = hboxR; //document.createElement("td");
  //box.setAttribute("style", "display:inline");
  //hboxR.appendChild(box);
  //box.setAttribute("align", "center");
  //box.setAttribute("style", "margin-right: 20px;");
  
// new added by bigpapy: sound button on header
  img = document.createElement("img");
  box.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.sound.ON);
  img.setAttribute("id", "sound_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowSound",data[0]));
//  img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.sound")*/htlivesight.Util.Parse("TooltipWindowSound",data[0]));
  img.addEventListener('click',  htlivesight.Click.sound, true);
//new end adding by bigpapy
  
//added by bigpapy: link button on header
  img = document.createElement("img");
  box.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.link.OFF);
  img.setAttribute("id", "link_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowLink",data[0]));
 // img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.link")*/htlivesight.Util.Parse("TooltipWindowLink",data[0]));
  img.addEventListener('click',  htlivesight.Click.link, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);
// end adding by bigpapy  
  img = document.createElement("img");
  box.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.info.ON);
  img.setAttribute("id", "tip_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowInfo",data[0]));
 // img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.info")*/htlivesight.Util.Parse("TooltipWindowInfo",data[0]));
  img.addEventListener('click',  htlivesight.Click.tip, true);

  img = document.createElement("img");
  hboxR.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.maximize.OFF);
  img.setAttribute("id", "maximize_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMaximize",data[0]));
 // img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.maximize")*/htlivesight.Util.Parse("TooltipWindowMaximize",data[0]));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);
  
  img = document.createElement("img");
  hboxR.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.minimize.ON);
  img.setAttribute("id", "minimize_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMinimize",data[0]));
 // img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.minimize")*/htlivesight.Util.Parse("TooltipWindowMinimize",data[0]));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("img");
  hboxR.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.shade.OFF);
  img.setAttribute("id", "shade_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowShade",data[0]));
//  img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.shade")*/htlivesight.Util.Parse("TooltipWindowShade",data[0]));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("img");
  hboxR.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.close.OFF);
  img.setAttribute("id", "close_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowClose",data[0]));
  //img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.close")*/htlivesight.Util.Parse("TooltipWindowClose",data[0]));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("img");
  hboxR.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.up.OFF);
  img.setAttribute("id", "moveup_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMoveUp",data[0]));
  //img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.move_up")*/htlivesight.Util.Parse("TooltipWindowMoveUp",data[0]));
  img.addEventListener('click',  htlivesight.Click.moveUp, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("img");
  hboxR.appendChild(img);
  img.setAttribute("class", "match_button");
  img.setAttribute("src", htlivesight.Image.window.down.OFF);
  img.setAttribute("id", "movedown_" + match.id + "_" + match.sourceSystem);
  img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMoveDown",data[0]));
  //img.setAttribute("tooltiptext", /*strings.getString("tooltip.window.move_down")*/htlivesight.Util.Parse("TooltipWindowMoveDown",data[0]));
  img.addEventListener('click',  htlivesight.Click.moveDown, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  // second row:  header body
  var placardrow = document.createElement("tr");
  placardrow.align="center";
  placardrow.setAttribute("class", "placardrow");
  header.appendChild(placardrow);
  //placardbox = document.createElement("hbox");
  placardbox = document.createElement("td");
  
  placardbox.colSpan ="3";

  placardrow.appendChild(placardbox);
  //placardbox.setAttribute("pack", "center");
  placardbox.setAttribute("id", "placardbox_"+match.id + "_" + match.sourceSystem);
  //placardbox.setAttribute("flex", "1");

  // home team
  //vbox = document.createElement("vbox");
  vbox = document.createElement("table");
  vbox.width="100%";
  //vbox.setAttribute("flex", "1");
  placardbox.appendChild(vbox);
  
  //hbox = document.createElement("hbox");
  hbox = document.createElement("tr"); //bigpapy add to fix it
  vbox.appendChild(hbox);
  
  leftbox = document.createElement("td"); //bigpapy add to fix it
  leftbox.setAttribute("align", "right");
  hbox.appendChild(leftbox);
  leftbox.setAttribute("width", "47%");

  var homebox = document.createElement("table"), hometr = document.createElement("tr");
  leftbox.appendChild(homebox);
  homebox.appendChild(hometr);
  homebox.setAttribute("class", "team_home");

  //box = document.createElement("hbox");
  // one
  box = document.createElement("td");//box = document.createElement("label"); bigpapy add to fix it
  hometr.appendChild(box);
  box.setAttribute("id", "header_home_team_notify_" + match.id + "_" + match.sourceSystem);
  box.setAttribute("class", "header_notify");
  
  
  label = document.createElement("td");//label = document.createElement("label");
  hometr.appendChild(label);
  label.setAttribute("id", "home_team_tactic_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "tactic");
  label = document.createElement("td");//label = document.createElement("label");
  hometr.appendChild(label);
  //label.setAttribute("id", "home_team_formation_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "formation");
  link = document.createElement("a");
	label.appendChild(link);
	//link.setAttribute("href", "#");
	link.setAttribute("id", "home_team_formation_" + match.id + "_" + match.sourceSystem);
	
	link.setAttribute("title", htlivesight.Util.Parse("SchemaTip", data[0]));
	//var argumentLineup= "htlivesight.DOM.formationpopup("+"ev_"+match.id+"_"+match.sourceSystem+"_home"+");";
	//link.addEventListener("click",htlivesight.DOM.formationpopup(argumentLineup));
	link.setAttribute("onclick","htlivesight.DOM.formationpopup(this.id)");
    $( "#"+"home_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();

	
	//$( "#"+"home_team_formation_"+match.id+"_"+match.sourceSystem+"_table" ).dialog( "option", "title", match.home.team.name );
	//$("#"+"home_team_formation_"+match.id+"_"+match.sourceSystem+"_table").dialog({ title: match.home.team.name });

  //two!
 // if (!htlivesight.prefs.matches.scorers) {
	    label = document.createElement("td");//label = document.createElement("label");
	    //leftbox.appendChild(label);
	    hometr.appendChild(label);
	 //   label.setAttribute("id", "home_team_name_" + match.id + "_" + match.sourceSystem);
	    link = document.createElement("a");
		label.appendChild(link);
		//link.setAttribute("href", "#");
		link.setAttribute("id", "home_team_name_" + match.id + "_" + match.sourceSystem);
		link.setAttribute("title", htlivesight.Util.Parse("StatisticTip", data[0]));
		//var argumentLineup= "htlivesight.DOM.formationpopup("+"ev_"+match.id+"_"+match.sourceSystem+"_home"+");";
		//link.addEventListener("click",htlivesight.DOM.formationpopup(argumentLineup));
		link.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id)");
	    //label.style.fontSize="xx-large";
	    
	 //   label.style.verticalAlign= "top";
	    label.setAttribute("class", "team_name");

	    //hbox = document.createElement("hbox");
	//    hbox = document.createElement("tr"); //bigpapy add to fix it
	//    vbox.appendChild(hbox);
//	  }
  
  if (htlivesight.prefs.matches.scorers) {  
//    label = document.createElement("label");
//    hbox.appendChild(label);
//    label.setAttribute("id", "home_team_name_" + match.id + "_" + match.sourceSystem);
//    label.setAttribute("class", "team_name");

	hbox1 = document.createElement("tr"); //bigpapy add to fix it
	hbox1.setAttribute("class", "scorers");
	vbox.appendChild(hbox1);
	
	box1 = document.createElement("td");
	//box1.colSpan ="3";
	box1.setAttribute("align", "right");
	box1.setAttribute("width", "47%");
	box1.setAttribute("class", "scorers_home");
	hbox1.appendChild(box1);
	  
    label = document.createElement("span");
    box1.appendChild(label);
    label.setAttribute("id", "home_team_scorers1_" + match.id + "_" + match.sourceSystem);
	label.setAttribute("class", "scinheader");
    //label.setAttribute("class", "tactic");
    
    //label.setAttribute("value", " ");
    label.innerHTML= " ";
    
    hbox2 = document.createElement("tr"); //bigpapy add to fix it
	hbox2.setAttribute("class", "scorers");
	vbox.appendChild(hbox2);
	
	box21 = document.createElement("td");
	//box1.colSpan ="3";
	box21.setAttribute("align", "right");
	box21.setAttribute("width", "47%");
	box21.setAttribute("class", "scorers_home");
	hbox2.appendChild(box21);
    
    label = document.createElement("span");
    box21.appendChild(label);
    label.setAttribute("id", "home_team_scorers2_" + match.id + "_" + match.sourceSystem);
	label.setAttribute("class", "scinheader");
    //label.setAttribute("class", "tactic");
    //label.setAttribute("value", " ");
    label.innerHTML= " ";
    label.setAttribute("style", "display:none");
  }

  
  
  
  
  
//new part added by bigpapy (booked): begin
 	  if (htlivesight.prefs.matches.booked) {

 		 hbox3 = document.createElement("tr"); //bigpapy add to fix it
 		hbox3.setAttribute("class", "scorers");
 		vbox.appendChild(hbox3);
 		
 		box31 = document.createElement("td");
 		//box1.colSpan ="3";
 		box31.setAttribute("align", "right");
 		box31.setAttribute("width", "47%");
 		box31.setAttribute("class", "scorers_home");
 		hbox3.appendChild(box31);
 		  
 	    label = document.createElement("span");
		label.setAttribute("class", "ycinheader");
 	    box31.appendChild(label);
 	    label.setAttribute("id", "home_team_booked1_" + match.id + "_" + match.sourceSystem);
 	    //label.setAttribute("class", "tactic");
 	    
 	    //label.setAttribute("value", " ");
 	    label.innerHTML= " ";
 	    
 	    hbox4 = document.createElement("tr"); //bigpapy add to fix it
 		hbox4.setAttribute("class", "scorers");
 		vbox.appendChild(hbox4);
 		
 		box41 = document.createElement("td");
 		//box1.colSpan ="3";
 		box41.setAttribute("align", "right");
 		box41.setAttribute("width", "47%");
 		box41.setAttribute("class", "scorers_home");
 		hbox4.appendChild(box41);
 	    
 	    label = document.createElement("span");
 	    box41.setAttribute("class", "ycinheader");
 	    box41.appendChild(label);
 	    label.setAttribute("id", "home_team_booked2_" + match.id + "_" + match.sourceSystem);
 	    //label.setAttribute("class", "tactic");
 	    //label.setAttribute("value", " ");
 	    label.innerHTML= " ";
 	    label.setAttribute("style", "display:none");
	  }

	 // new part added by bigpapy (booked): end

	 // new part added by bigpapy (sent off): begin

	  if (htlivesight.prefs.matches.sentOff) {

		  hbox5 = document.createElement("tr"); //bigpapy add to fix it
			hbox5.setAttribute("class", "sent_off");
			vbox.appendChild(hbox5);
			
			box51 = document.createElement("td");
			//box1.colSpan ="3";
			box51.setAttribute("align", "right");
			box51.setAttribute("width", "47%");
			box51.setAttribute("class", "sent_off_home");
			hbox5.appendChild(box51);
			  
		    label = document.createElement("span");
			label.setAttribute("class", "rcinheader");
		    box51.appendChild(label);
		    label.setAttribute("id", "home_team_sent_off1_" + match.id + "_" + match.sourceSystem);
		    //label.setAttribute("class", "tactic");
		    
		    //label.setAttribute("value", " ");
		    label.innerHTML= " ";
		    
		    hbox6 = document.createElement("tr"); //bigpapy add to fix it
			hbox6.setAttribute("class", "sent_off");
			vbox.appendChild(hbox6);
			
			box61 = document.createElement("td");
			//box1.colSpan ="3";
			box61.setAttribute("align", "right");
			box61.setAttribute("width", "47%");
			box61.setAttribute("class", "sent_off_home");
			hbox6.appendChild(box61);
		    
		    label = document.createElement("span");
		    box61.setAttribute("class", "rcinheader");
		    box61.appendChild(label);
		    label.setAttribute("id", "home_team_sent_off2_" + match.id + "_" + match.sourceSystem);
		    //label.setAttribute("class", "tactic");
		    //label.setAttribute("value", " ");
		    label.innerHTML= " ";
		    label.setAttribute("style", "display:none");
	 // new part added by bigpapy (sent_off): end

	  }
  
	// new part added by bigpapy (injured): begin
	  
	  if (htlivesight.prefs.matches.injured) {

		  hbox7 = document.createElement("tr"); //bigpapy add to fix it
			hbox7.setAttribute("class", "injured");
			vbox.appendChild(hbox7);
			
			box71 = document.createElement("td");
			//box1.colSpan ="3";
			box71.setAttribute("align", "right");
			box71.setAttribute("width", "47%");
			box71.setAttribute("class", "injured_home");
			hbox7.appendChild(box71);
			  
		    label = document.createElement("span");
			label.setAttribute("class", "injinheader");
		    box71.appendChild(label);
		    label.setAttribute("id", "home_team_injured1_" + match.id + "_" + match.sourceSystem);
		    //label.setAttribute("class", "tactic");
		    
		    //label.setAttribute("value", " ");
		    label.innerHTML= " ";
		    
		    hbox8 = document.createElement("tr"); //bigpapy add to fix it
			hbox8.setAttribute("class", "injured");
			vbox.appendChild(hbox8);
			
			box81 = document.createElement("td");
			//box1.colSpan ="3";
			box81.setAttribute("align", "right");
			box81.setAttribute("width", "47%");
			box81.setAttribute("class", "injured_home");
			hbox8.appendChild(box81);
		    
		    label = document.createElement("span");
		    box81.setAttribute("class", "injinheader");
		    box81.appendChild(label);
		    label.setAttribute("id", "home_team_injured2_" + match.id + "_" + match.sourceSystem);
		    //label.setAttribute("class", "tactic");
		    //label.setAttribute("value", " ");
		    label.innerHTML= " ";
		    label.setAttribute("style", "display:none");
	 // new part added by bigpapy (injured): end

	  }
  
  
  
  
  // score
  //hbox = document.createElement("hbox");
  box = document.createElement("td");//bigpapy add to fix it
  box.setAttribute("width", "6%");
  hbox.appendChild(box);
  box.setAttribute("class", "big_score");
  box.setAttribute("align", "center");

  
  label = document.createElement("span");
  //label.style.fontSize="xx-large";
  box.appendChild(label);
  label.setAttribute("id", "home_team_goals_" + match.id + "_" + match.sourceSystem);
  label = document.createElement("span");
  //label.style.fontSize="xx-large";
  box.appendChild(label);
  //label.setAttribute("value", ":");
  label.innerHTML= ":";
  label = document.createElement("span");
  
  box.appendChild(label);
  label.setAttribute("id", "away_team_goals_" + match.id + "_" + match.sourceSystem);
  //label.style.fontSize="xx-large";

  // away team
  
  //vbox = document.createElement("vbox");
//  vbox = document.createElement("table");//bigpapy: added to fix html
//  vbox.setAttribute("flex", "1");
//  placardbox.appendChild(vbox);
  
  //hbox = document.createElement("hbox");
//  hbox = document.createElement("tr"); //bigpapy: added to fix html
//  vbox.appendChild(hbox);

  rightbox = document.createElement("td"); //bigpapy add to fix it
  rightbox.setAttribute("align", "left");
  //rightbox.rowSpan= "1";
  hbox.appendChild(rightbox);
  rightbox.setAttribute("width", "47%");
 
  var awaybox = document.createElement("table"), awaytr = document.createElement("tr");
  rightbox.appendChild(awaybox);
  awaybox.appendChild(awaytr);
  awaybox.setAttribute("class", "team_away"); 
  
  label = document.createElement("td");//label = document.createElement("label");
  awaytr.appendChild(label);
//  label.setAttribute("id", "away_team_name_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "team_name");
  link = document.createElement("a");
  
	label.appendChild(link);
	//link.setAttribute("href", "#");
	link.setAttribute("id", "away_team_name_" + match.id + "_" + match.sourceSystem);

	link.setAttribute("title", htlivesight.Util.Parse("StatisticTip", data[0]));
	//var argumentLineup= "htlivesight.DOM.formationpopup("+"ev_"+match.id+"_"+match.sourceSystem+"_home"+");";
	//link.addEventListener("click",htlivesight.DOM.formationpopup(argumentLineup));
	link.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");
  //label.style.fontSize="xx-large";
  
  if (!htlivesight.prefs.matches.scorers  && !htlivesight.prefs.matches.booked && !htlivesight.prefs.matches.sentOff && !htlivesight.prefs.matches.injured) {
    //hbox = document.createElement("hbox");
 //   hbox = document.createElement("tr");//bigpapy: added to fix html
 //   vbox.appendChild(hbox);
  }
  label = document.createElement("td");//label = document.createElement("label");
  awaytr.appendChild(label);
  //label.setAttribute("id", "away_team_formation_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "formation");
	link = document.createElement("a");
	label.appendChild(link);
	//link.setAttribute("href", "#");
	link.setAttribute("id", "away_team_formation_" + match.id + "_" + match.sourceSystem);
	link.setAttribute( "title", htlivesight.Util.Parse( "SchemaTip", data[0] ) );
	link.setAttribute("onclick","htlivesight.DOM.formationpopup(this.id);");
	
    $( "#"+"away_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
	//	$("#"+"away_team_formation_"+match.id+"_"+match.sourceSystem+"_table").dialog({ autoOpen: true, width: 480, height: 110 });
  label = document.createElement("td");//label = document.createElement("label");
  awaytr.appendChild(label);
  label.setAttribute("id", "away_team_tactic_" + match.id + "_" + match.sourceSystem);
  label.setAttribute("class", "tactic");
  	
  //box = document.createElement("hbox");
  box = document.createElement("td");//box = document.createElement("label"); bigpapy: added to fix html
  awaytr.appendChild(box);
  box.setAttribute("id", "header_away_team_notify_" + match.id + "_" + match.sourceSystem);
  box.setAttribute("class", "header_notify");

  if (htlivesight.prefs.matches.scorers) {
	
	box2 = document.createElement("td");  
	hbox1.appendChild(box2);
	box2.setAttribute("width", "6%");
	box2.setAttribute("align", "center");
	
	box3 = document.createElement("td");
	//box3.colSpan ="3";
	box3.setAttribute("align", "left");
	//box3.setAttribute("valign", "bottom");
	box3.setAttribute("width", "47%");
	box3.setAttribute("class", "scorers_away");
	hbox1.appendChild(box3);
	  
    label = document.createElement("span");
    box3.appendChild(label);
    label.setAttribute("id", "away_team_scorers1_" + match.id + "_" + match.sourceSystem);
	label.setAttribute("class", "scinheader");
    //label.setAttribute("class", "tactic");
    label.innerHTML= " ";
    //label.setAttribute("value", " ");
    
    box22 = document.createElement("td");
	//box1.colSpan ="3";
	box22.setAttribute("width", "6%");
	box22.setAttribute("align", "center");
	hbox2.appendChild(box22);
	
	box23 = document.createElement("td");
	//box1.colSpan ="3";
	box23.setAttribute("align", "left");
	box23.setAttribute("width", "47%");
	box23.setAttribute("class", "scorers_away");
	hbox2.appendChild(box23);
    
    label = document.createElement("span");
    box23.appendChild(label);
    label.setAttribute("id", "away_team_scorers2_" + match.id + "_" + match.sourceSystem);
	label.setAttribute("class", "scinheader");
    //label.setAttribute("class", "tactic");
    //label.setAttribute("value", " ");
    label.innerHTML= " ";
    label.setAttribute("style", "display:none");
  }
  
//new part added by bigpapy (booked): begin
	  if (htlivesight.prefs.matches.booked) {

		  box32 = document.createElement("td");  
			hbox3.appendChild(box32);
			box32.setAttribute("width", "6%");
			
			box33 = document.createElement("td");
			//box3.colSpan ="3";
			box33.setAttribute("align", "left");
			//box3.setAttribute("valign", "bottom");
			box33.setAttribute("width", "47%");
			box33.setAttribute("class", "booked_away");
			hbox3.appendChild(box33);
			  
		    label = document.createElement("span");
		    label.setAttribute("class", "ycinheader");
		    box33.appendChild(label);
		    label.setAttribute("id", "away_team_booked1_" + match.id + "_" + match.sourceSystem);
		    //label.setAttribute("class", "tactic");
		    label.innerHTML= " ";
		    //label.setAttribute("value", " ");
		    
		    box42 = document.createElement("td");
			//box1.colSpan ="3";
			box42.setAttribute("width", "6%");
			hbox4.appendChild(box42);
			
			box43 = document.createElement("td");
			//box1.colSpan ="3";
			box43.setAttribute("align", "left");
			box43.setAttribute("width", "47%");
			box43.setAttribute("class", "booked_away");
			hbox4.appendChild(box43);
		    
		    label = document.createElement("span");
		    box43.setAttribute("class", "ycinheader");
		    box43.appendChild(label);
		    label.setAttribute("id", "away_team_booked2_" + match.id + "_" + match.sourceSystem);
		    //label.setAttribute("class", "tactic");
		    //label.setAttribute("value", " ");
		    label.innerHTML= " ";
		    label.setAttribute("style", "display:none");
    
  }

 // new part added by bigpapy (booked): end

 // new part added by bigpapy (sent off): begin

  if (htlivesight.prefs.matches.sentOff) {
	  
	  box52 = document.createElement("td");  
		hbox5.appendChild(box52);
		box52.setAttribute("width", "6%");
		
		box53 = document.createElement("td");
		//box3.colSpan ="3";
		box53.setAttribute("align", "left");
		//box3.setAttribute("valign", "bottom");
		box53.setAttribute("width", "47%");
		box53.setAttribute("class", "sent_off_away");
		hbox5.appendChild(box53);
		  
	    label = document.createElement("span");
	    label.setAttribute("class", "rcinheader");
	    box53.appendChild(label);
	    label.setAttribute("id", "away_team_sent_off1_" + match.id + "_" + match.sourceSystem);
	    //label.setAttribute("class", "tactic");
	    label.innerHTML= " ";
	    //label.setAttribute("value", " ");
	    
	    box62 = document.createElement("td");
		//box1.colSpan ="3";
		box62.setAttribute("width", "6%");
		hbox6.appendChild(box62);
		
		box63 = document.createElement("td");
		//box1.colSpan ="3";
		box63.setAttribute("align", "left");
		box63.setAttribute("width", "47%");
		box63.setAttribute("class", "sent_off_away");
		hbox6.appendChild(box63);
	    
	    label = document.createElement("span");
	    box63.setAttribute("class", "rcinheader");
	    box63.appendChild(label);
	    label.setAttribute("id", "away_team_sent_off2_" + match.id + "_" + match.sourceSystem);
	    //label.setAttribute("class", "tactic");
	    //label.setAttribute("value", " ");
	    label.innerHTML= " ";
	    label.setAttribute("style", "display:none");

 // new part added by bigpapy (sent_off): end

  }
  
  // new part added by bigpapy (injured): begin

  if (htlivesight.prefs.matches.injured) {
	  
	  box72 = document.createElement("td");  
		hbox7.appendChild(box72);
		box72.setAttribute("width", "6%");
		
		box73 = document.createElement("td");
		//box3.colSpan ="3";
		box73.setAttribute("align", "left");
		//box3.setAttribute("valign", "bottom");
		box73.setAttribute("width", "47%");
		box73.setAttribute("class", "injured_away");
		hbox7.appendChild(box73);
		  
	    label = document.createElement("span");
	    label.setAttribute("class", "injinheader");
	    box73.appendChild(label);
	    label.setAttribute("id", "away_team_injured1_" + match.id + "_" + match.sourceSystem);
	    //label.setAttribute("class", "tactic");
	    label.innerHTML= " ";
	    //label.setAttribute("value", " ");
	    
	    box82 = document.createElement("td");
		//box1.colSpan ="3";
		box82.setAttribute("width", "6%");
		hbox8.appendChild(box82);
		
		box83 = document.createElement("td");
		//box1.colSpan ="3";
		box83.setAttribute("align", "left");
		box83.setAttribute("width", "47%");
		box83.setAttribute("class", "injured_away");
		hbox8.appendChild(box83);
	    
	    label = document.createElement("span");
	    box83.setAttribute("class", "injinheader");
	    box83.appendChild(label);
	    label.setAttribute("id", "away_team_injured2_" + match.id + "_" + match.sourceSystem);
	    //label.setAttribute("class", "tactic");
	    //label.setAttribute("value", " ");
	    label.innerHTML= " ";
	    label.setAttribute("style", "display:none");

 // new part added by bigpapy (injured): end

  }


  return header;
}catch(e){alert("createElementBoxLiveMatchHeader: "+e);}// added by bigpapy to debug from xul to html
};

/** -----------------------------------------------------------
 * Events
 * ----------------------------------------------------------- */

/* --- update events ---------------------------------------- */
 htlivesight.DOM.UpdateLiveEvents=function(match) {
  try {
    var i, ev, evList;
    var row, rows, lastrow;
    rows = document.getElementById("ev_rows_" + match.id + "_" + match.sourceSystem);
    evList = match.event.list;
    for (i=evList.first; i <= evList.last; i++) { 	
    	ev = evList["_"+i];
    	if (ev && ev.text != "" && !(document.getElementById("ev_row_"+match.id + "_" + match.sourceSystem+"_"+(i)))) {
    		row = htlivesight.DOM.CreateElementRowLiveEvent(match, ev);
    		row.setAttribute("id", "ev_row_"+match.id + "_" + match.sourceSystem+"_"+i );
    		if (htlivesight.prefs.other.bottomUp){ // reverse order
    			var countBack=0;
 				if (!lastrow) lastrow=document.getElementById("ev_row_"+match.id + "_" + match.sourceSystem+"_"+(i));// last event
    			if (!lastrow) lastrow=document.getElementById("ev_row_"+match.id + "_" + match.sourceSystem+"_"+(i-1));// last event
    			if (!lastrow) lastrow=document.getElementById("ev_row_"+match.id + "_" + match.sourceSystem+"_"+(i-2));// last event
    			if (!lastrow) lastrow=document.getElementById("ev_row_"+match.id + "_" + match.sourceSystem+"_"+(i-3));// last event (before two "")*/
       			rows.insertBefore(row,lastrow);// inserting new row at the top of the list
       			lastrow=row; // top row is the last one
    		}else{
    			rows.appendChild(row);// insert at the bottom of the list.
    		}	
    		match.event.dom.join(row);
    	}
    };
  evList.first = evList.last+1;
  } catch(e) {
    alert("DOM.UpdateLiveEvents\n" + e);
  }
};

/* --- create grid ---------------------------- */
 htlivesight.DOM.CreateElementGridLiveMatchEvents= function(match) {
  try {
    var grid, gridtd, cols, col, rows/*, row*/;
  
  	grid = document.createElement("tr");
    gridtd = document.createElement("td");
    grid.appendChild(gridtd);
    gridtd.colSpan="3";
    gridtd.setAttribute("class", "live_events");  
  
/*    cols = document.createElement("columns");
    gridtd.appendChild(cols);
    col = document.createElement("column");
    cols.appendChild(col);
    col = document.createElement("column");
    cols.appendChild(col);
    col = document.createElement("column");
    cols.appendChild(col);
    col.setAttribute("flex", "1");*/
  
    rows = document.createElement("table");    
    rows.width="100%";
    gridtd.appendChild(rows);
    rows.setAttribute("id", "ev_rows_" + match.id + "_" + match.sourceSystem);
    rows.setAttribute("class", "ev_rows");
    return grid;
  } catch(e) {
    alert("DOM.CreateElementGridLiveMatchEvents\n" + e);
  }
  return null;
};

/* --- create event row ---------------------------- */
 htlivesight.DOM.CreateElementRowLiveEvent= function(match, event) {
  try {
    var row, l, img, t, empty_img/*, b*/;
    row = document.createElement("tr");

    if (event.subjectTeamId == 0){
    	if (prefs.colors.neutralColorCheck)
    		row.style.backgroundColor= "#" + prefs.colors.neutralColorCode;
    }
    if (prefs.colors.textColorCheck)
        row.style.color= "#" + prefs.colors.textColorCode;
    
     if (event.subjectTeamId != 0) {
      var isF;
      isF = htlivesight.Friends.isFriend(event.subjectTeamId, match.sourceSystem, !htlivesight.Friends.STRICT);
      var isHome = match.isHomeTeam(event.subjectTeamId);
      if (isF && isHome) {
        row.setAttribute("class", "friend_home");
        if (prefs.colors.friendHomeColorCheck)
        row.style.backgroundColor= "#" + prefs.colors.friendHomeColorCode;
 //       row.style.backgroundColor="#023702";//verde #4C994C
       // row.style.color="#000"; 
      } else if(isF && !isHome) {
        row.setAttribute("class", "friend_away");
        if (prefs.colors.friendAwayColorCheck)
            row.style.backgroundColor= "#" + prefs.colors.friendAwayColorCode;
 //       row.style.backgroundColor="#920606"; //rosso #D92626 
        //row.style.color="#000";
      } else if(!isF && isHome) {
        row.setAttribute("class", "foe_home");
        if (prefs.colors.foeHomeColorCheck)
            row.style.backgroundColor= "#" + prefs.colors.foeHomeColorCode;
 //       row.style.backgroundColor="#0B2D73"; //celeste #0972A6 #0B5173
        //row.style.color="#000"; #0F92D5
      } else if(!isF && !isHome) {
        row.setAttribute("class", "foe_away");
        if (prefs.colors.foeAwayColorCheck)
            row.style.backgroundColor= "#" + prefs.colors.foeAwayColorCode;
       //row.style.backgroundColor="#7F3070"; 
//        row.style.backgroundColor="#660754"; //viola #B00D91
        //row.style.color="#000";
      }
    }
    else {
      row.setAttribute("class", "info_row");
    }

     try{
    	    if(""+event.key.A + event.key.BC=="041") {
    	        if (match.home.team.id==event.subjectTeamId) {
    	          l1 = document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem);
    	          htlivesight.DOM.createStatisticElement("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics", match, event);
    	          l1.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");
    	          l1.setAttribute("contextmenu", "home_team_statistics_"+match.id+"_"+match.sourceSystem);
    	        } else {
    	          l1 = document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem);    	          
    	          htlivesight.DOM.createStatisticElement("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics", match, event);
    	          l1.setAttribute("onclick","htlivesight.DOM.statisticspopup(this.id);");
    	          l1.setAttribute("contextmenu", "away_team_statistics_"+match.id+"_"+match.sourceSystem);
    	        };
    	    }; }catch(e){alert("errore stats:"+e);}
     
     
    if(event.lineupElement) {
      if (match.home.team.id==event.subjectTeamId) {
        l = document.getElementById("home_team_formation_"+match.id + "_" + match.sourceSystem);
      } else {
        l = document.getElementById("away_team_formation_"+match.id + "_" + match.sourceSystem);
      }
      //l.setAttribute("tooltip", event.lineupElement.id);
      // TODO
      l.setAttribute("contextmenu", event.lineupElement.id);
    };
  
    l = document.createElement("td");
    l.setAttribute("class","event_minute");
    row.appendChild(l);
/*    l.setAttribute("value", event.minute); */
  /*  if (event.minute < 10) l.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+event.minute;
    else if (event.minute <100) l.innerHTML="&#160;&#160;"+event.minute;
    	else l.innerHTML= event.minute;*/
  l.innerHTML= event.minute;
  
    l = document.createElement("td");
    l1 = document.createElement("td");
    row.appendChild(l);
    row.appendChild(l1);
    img = document.createElement("img");
    empty_img = document.createElement("img");
    l.setAttribute("class","event_icon");
    l1.setAttribute("class","event_icon");
    if (match.isHomeTeam(event.subjectTeamId)|| event.subjectTeamId == 0){
    	l.appendChild(img);
    	l1.appendChild(empty_img);}
    else{
    	l.appendChild(empty_img);
    	l1.appendChild(img);
    }
	empty_img.setAttribute("src", htlivesight.Image.transparent);
    if(htlivesight.prefs.personalization.oldIcons && event.type.imageSrcOld){
    	img.setAttribute("src", event.type.imageSrcOld);

    }else{
    	img.setAttribute("src", event.type.imageSrc);
    }
    //img.setAttribute("src", event.type.imageSrc);

    t = htlivesight.DOM.createTextEventElement(event);
    row.appendChild(t);
    
		/*
    l = document.createElement("label");
    row.appendChild(l);
    l.setAttribute("class", "event_text");
    
    //t=document.createTextNode(Util.CleanText(event.text));
    //return d.childNodes.item(0);    
    //l.appendChild(t);

		var childs = t.childNodes;
		for (var ii = 0; ii<childs.length; ii++) {
			
    	l.appendChild(childs.item(ii));
		}
		
//htlivesight.Log.debug(childs.);
    */
    return row;
  } catch(e) {
    alert("DOM.CreateElementRowLiveEvent\n" + e);
  }
  return null; 
}


/* -----------------------------------------------------------
 * Live Match Highlights
 * ----------------------------------------------------------- */

 htlivesight.DOM.CreateElementGroupboxHighlights=function(gameId) {
  var groupbox, caption, grid;
  groupbox = document.createElement("groupbox");
  groupbox.setAttribute("class", "highlights");
  caption = document.createElement("caption");
  caption.setAttribute("label", "Highlights");
  groupbox.appendChild(caption);
  grid = htlivesight.DOM.CreateElementGridHighlights(gameId);
  groupbox.appendChild(grid);

  return groupbox;
}

 htlivesight.DOM.CreateElementGridHighlights=function(gameId) {
  var grid, cols, col, rows, row;
  try{ // added by bigpapy to debug from xul to html
  grid = document.createElement("grid");
  cols = document.createElement("columns");
  col = document.createElement("column");
  cols.appendChild(col);
  col = document.createElement("column");
  cols.appendChild(col);
  col = document.createElement("column");
  cols.appendChild(col);
  col = document.createElement("column");
  col.setAttribute("flex", "1");
  cols.appendChild(col);
  grid.appendChild(cols);
  rows = document.createElement("rows");
  rows.setAttribute("id", "hl_rows_" + gameId);
  grid.appendChild(rows);

  row = htlivesight.DOM.CreateElementRowHighlightEvent();
  rows.appendChild(row);

  return grid;
  }catch(e){alert("CreateElementGridHighlights: "+e);}// added by bigpapy to debug from xul to html
};

 htlivesight.DOM.CreateElementRowHighlightEvent=function(event) {
  var row, l;
  try{ // added by bigpapy to debug from xul to html
  row = document.createElement("row");
  l = document.createElement("label");
  // l.setAttribute("value", "123");
  l.innerHTM="123";
  row.appendChild(l);
  l = document.createElement("label");
  //l.setAttribute("value", "456");
  l.innerHTM="456";
  row.appendChild(l);
  l = document.createElement("label");
//  l.setAttribute("value", "789");
  l.innerHTM="789";
  row.appendChild(l);
  l = document.createElement("label");
 // l.setAttribute("value", "0ab");
  l.innerHTM="0ab";
  row.appendChild(l);
  return row;
  }catch(e){alert("CreateElementRowHighlightEvent: "+e);} // added by bigpapy to debug from xul to html
};

/* -----------------------------------------------------------
 * Right Box
 * ----------------------------------------------------------- */

// Gonzo
 htlivesight.DOM.UpdateElementBoxLeagueTable=function(league) {
	 var matchLeagueStarted;
	 try{ // added by bigpapy to debug from XUL to HTML
//  var strings = document.getElementById("strings");
		 if (htlivesight.League.currentRound == undefined) return;
  if (htlivesight.Time.hattrickTime > htlivesight.League.currentRound.date) {matchLeagueStarted = true; 
	//alert("matchLeagueStarted: "+ matchLeagueStarted + " Time.hattrickTime:"+ Time.hattrickTime + " League.currentRound.date: " + League.currentRound.date);
}
else {matchLeagueStarted = false;
//alert("matchLeagueStarted: "+ matchLeagueStarted + " Time.hattrickTime:"+ Time.hattrickTime + " League.currentRound.date: " + League.currentRound.date);
}
  for(var matchid in htlivesight.Match.List){
    var myMatch = htlivesight.Match.List[matchid];
    if(league.currentRound.id.has(myMatch.id) 
        && htlivesight.League.currentRound.number > htlivesight.League.teams[htlivesight.Teams.myTeam.id]
        && htlivesight.showLeague
        && htlivesight.League.teams[myMatch.home.team.id]
        && htlivesight.League.teams[myMatch.away.team.id]){
      var homeId = myMatch.home.team.id;
      var awayId = myMatch.away.team.id;
      if (matchLeagueStarted){// if match started take the current round leauge
      htlivesight.League.teams[homeId].liveMatches = htlivesight.League.currentRound.number;
      htlivesight.League.teams[awayId].liveMatches = htlivesight.League.currentRound.number;
      } else {// if not take the last current round league
          htlivesight.League.teams[homeId].liveMatches = htlivesight.League.currentRound.number-1;
          htlivesight.League.teams[awayId].liveMatches = htlivesight.League.currentRound.number-1;
      };
      
      
   // if HTLS works in relive mode and last round is ended and lastRound wasn't removed from table remove it from table.
      if((htlivesight.prefs.other.reLive && (htlivesight.League.currentRound.number == htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches)) && (!htlivesight.Live.removedLastRoundFromTable)){
    	  if(myMatch.home.realGoals > myMatch.away.realGoals){
    		  htlivesight.League.teams[homeId].points -=  3;
//    	      htlivesight.League.teams[awayId].livePoints = htlivesight.League.teams[awayId].points;
    	  }
    	  else if(myMatch.home.realGoals < myMatch.away.realGoals){
    		  htlivesight.League.teams[awayId].points -= 3;
//            htlivesight.League.teams[homeId].livePoints = htlivesight.League.teams[homeId].points;
    	  }
    	  else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
    		  htlivesight.League.teams[homeId].points -= 1;
    		  htlivesight.League.teams[awayId].points -= 1;
    	  }
      };
            
      htlivesight.League.teams[homeId].liveGoalsFor = htlivesight.League.teams[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
      htlivesight.League.teams[homeId].liveGoalsAgainst = htlivesight.League.teams[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
      htlivesight.League.teams[awayId].liveGoalsFor = htlivesight.League.teams[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
      htlivesight.League.teams[awayId].liveGoalsAgainst = htlivesight.League.teams[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
      if(myMatch.home.goals > myMatch.away.goals){
        htlivesight.League.teams[homeId].livePoints = htlivesight.League.teams[homeId].points + 3;
        htlivesight.League.teams[awayId].livePoints = htlivesight.League.teams[awayId].points;
      }
      else if(myMatch.home.goals < myMatch.away.goals){
        htlivesight.League.teams[awayId].livePoints = htlivesight.League.teams[awayId].points + 3;
        htlivesight.League.teams[homeId].livePoints = htlivesight.League.teams[homeId].points;
      }
      else if (matchLeagueStarted){// add one point only if matches are started
        htlivesight.League.teams[homeId].livePoints = htlivesight.League.teams[homeId].points + 1;
        htlivesight.League.teams[awayId].livePoints = htlivesight.League.teams[awayId].points + 1;
      }
    }
  }
  htlivesight.League.sortTable();
  for(var id in htlivesight.League.teams){
	  
	  
	// restoring relive table position to last round and not actual one deleting it and getting position after first call of the function
	  if((htlivesight.prefs.other.reLive && (htlivesight.League.currentRound.number == htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches)) && (!htlivesight.Live.removedLastRoundFromTable)){
		  htlivesight.League.teams[id].position=htlivesight.League.teams[id].livePosition;
	  };
	// end part of restoring relive table position to last round and not actual one deleting it and getting position after first call of the function.
	  
	  
    if(htlivesight.League.teams[id].livePosition > htlivesight.League.teams[id].position) htlivesight.League.teams[id].change = "down.gif";
    else if(htlivesight.League.teams[id].livePosition < htlivesight.League.teams[id].position) htlivesight.League.teams[id].change = "up.gif" +
    		"";
    else htlivesight.League.teams[id].change = "equal.gif";
  }
  for(var j=1; j<=8; j++){
    //document.getElementById("leaguetable_"+j).setAttribute("style", "");
    htlivesight.Util.RemoveClass(document.getElementById("leaguetable_"+j+""),['league_title','league_promote','league_demote','league_qualify','league_own']);
  }
  //document.getElementById("contentbody_leaguetable"/*"leaguetable_name"*/).setAttribute("value", /*strings.getString("league.live_table")*/htlivesight.Util.Parse("LeagueLiveTable",data[0])+" ("+league.levelUnitName+")");
  document.getElementById("LeagueLiveTable"/*"leaguetable_name"*/).innerHTML = htlivesight.Util.Parse("LeagueLiveTable",data[0])+" ("+league.levelUnitName+")";
  if(league.level == 1){
    //document.getElementById("leaguetable_1").setAttribute("style", "background-color: #023702;");
    //title holder
    htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_title');
  }
  else if(league.level <= 6 || league.level % 2 == 0){
    //document.getElementById("leaguetable_1").setAttribute("style", "background-color: #023702; border-bottom-width: 1px; border-bottom-color: black;");
    //#1 promotes
    htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
  }
  else{
    //document.getElementById("leaguetable_1").setAttribute("style", "background-color: #023702;");
    //document.getElementById("leaguetable_2").setAttribute("style", "background-color: #023702; border-bottom-width: 1px; border-bottom-color: black;");
    //#1 AND #2 promote
    htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
    htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote');
  }
  if(league.level != league.maxLevel){
    //document.getElementById("leaguetable_7").setAttribute("style", "background-color: #750606; border-top-width: 1px; border-top-color: black;");
    //document.getElementById("leaguetable_8").setAttribute("style", "background-color: #750606;");
    //#7 AND #8 demote
    htlivesight.Util.AddClass(document.getElementById("leaguetable_7"),'league_demote');
    htlivesight.Util.AddClass(document.getElementById("leaguetable_8"),'league_demote');
  }
  if(league.level < 6){
    //document.getElementById("leaguetable_5").setAttribute("style", "background-color: #757006;");
    //document.getElementById("leaguetable_6").setAttribute("style", "background-color: #757006;");
    //#5 AND #8 need to qualify
    htlivesight.Util.AddClass(document.getElementById("leaguetable_5"),'league_qualify');
    htlivesight.Util.AddClass(document.getElementById("leaguetable_6"),'league_qualify');
  }
  for(var i in htlivesight.League.teams){
    if(htlivesight.League.teams[i].livePosition >= 1 && htlivesight.League.teams[i].livePosition <= 8){
      if(i == htlivesight.Teams.myTeam.id){
        //document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition).setAttribute("style", document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition).getAttribute("style")+" font-weight: bold;");
        htlivesight.Util.AddClass(document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition),'league_own');
      }
      document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_name").innerHTML = htlivesight.DOM.getTextContent(htlivesight.League.teams[i].name);
      //document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_change").setAttribute("class", htlivesight.League.teams[i].change);
      document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_change").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.League.teams[i].change);
      document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_matches").innerHTML = htlivesight.League.teams[i].liveMatches;
      var goals = htlivesight.League.teams[i].liveGoalsFor+"-"+htlivesight.League.teams[i].liveGoalsAgainst;
      document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals").innerHTML = goals;
      var diff = htlivesight.League.teams[i].liveGoalsFor - htlivesight.League.teams[i].liveGoalsAgainst;
      if(diff >= 0) diff = "+"+diff;
      document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goaldif").innerHTML = diff;
      document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_points").innerHTML = htlivesight.League.teams[i].livePoints;
    }
  }
	 }catch(e){alert("UpdateElementBoxLeagueTable: "+e);}// added by bigpapy to debug from XUL to HTML
};
// End

 htlivesight.DOM.UpdateElementBoxLeague=function(league) {
//  var strings = document.getElementById("strings");
	 try{ // added by bigpapy to debug from xul to html
		 if (league.currentRound == undefined) return;
  document.getElementById("winbox_leaguematches").style.display="block";
  var number = /*strings.getString("league.round")*/htlivesight.Util.Parse("LeagueRound",data[0]) + " " + league.currentRound.number;
  var date = htlivesight.Time.formatDate(league.currentRound.date);

  //document.getElementById("league_round_number").setAttribute("value", number);
  //document.getElementById("league_round_date").setAttribute("value", date);
  //document.getElementById("league_round_time").setAttribute("value", "");
  document.getElementById("league_round_number").innerHTML = number;
  document.getElementById("league_round_date").innerHTML = date;
	 }catch(e){alert("UpdateElementBoxLeague : "+e);} // added by bigpapy to debug from xul to html
};


 htlivesight.DOM.CreateElementRowLeagueGame=function(gameId) {
  var rows, row;
  try{ //added by bigpapy to debug from XUL to HTML
  rows = document.getElementById("league_grid_rows");
  row = htlivesight.DOM.CreateElementRowShortGame(gameId);
  rows.appendChild(row);
  }catch(e){alert("htlivesight.DOM.CreateElementRowLeagueGame: "+e);}

};

htlivesight.DOM.UpdateShortBox = function(match) {
  try {
    var elem, label/*, a*/;
    
    elem = document.getElementById("short_" + match.id + "_" + match.sourceSystem);
    if (!elem) {
      elem = htlivesight.DOM.CreateElementRowShortGame(match);
      if ((htlivesight.League.currentRound!= undefined)&&(htlivesight.League.currentRound.id.has(match.id) && htlivesight.showLeague)) {
        if (match.getTeamById(htlivesight.Teams.myTeam.id)) {
          htlivesight.Util.AddClass(elem,"myLeagueMatch");
        }
        document.getElementById("league_grid_rows").appendChild(elem);
      } else {
        document.getElementById("other_grid_rows").appendChild(elem);
      }
    } else {
    }
  
    if(htlivesight.Util.HasClass(elem,"myLeagueMatch")) {
      //label = document.getElementById("league_round_time");
      //label.setAttribute("value", match.timeElapsed);
      document.getElementById("league_round_time").innerHTML = match.timeElapsed;
	  
	  // Gonzo
      if((htlivesight.League.currentRound!= undefined)&&(htlivesight.League.currentRound.number > htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches)){
        htlivesight.DOM.UpdateElementBoxLeagueTable(htlivesight.League);
      }
      // End
      
   // added by bigpapy in order to have relive table updated.
      if(htlivesight.prefs.other.reLive && (htlivesight.League.currentRound.number == htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches)){
    	  htlivesight.DOM.UpdateElementBoxLeagueTable(htlivesight.League);
    	  if(!htlivesight.Live.removedLastRoundFromTable)  htlivesight.Live.removedLastRoundFromTable=true;
      }
   // end adding by bigpapy in order to have relive table updated.
  
    }
  
    //document.getElementById("short_home_goals_" + match.id + "_" + match.sourceSystem).setAttribute("value", match.home.goals);
	//document.getElementById("short_away_goals_" + match.id + "_" + match.sourceSystem).setAttribute("value", match.away.goals);
  var teamName=document.getElementById("short_home_name_" + match.id + "_" + match.sourceSystem);
  teamName.innerHTML = htlivesight.DOM.getTextContent(match.home.team.shortName);
  if(htlivesight.Friends.isFriend(match.home.team.id,match.sourceSystem)){
  	  if(match.home.team.id == htlivesight.Teams.myTeam.id) htlivesight.Util.AddClass(teamName,'short_own'); 
  	  else
	  htlivesight.Util.AddClass(teamName,'short_friend');
	  teamName.setAttribute("title","");
  }else{
	  htlivesight.Util.RemoveClass(teamName,['short_own','short_friend']);//reset styling
	  teamName.setAttribute("title","click on the team to add to friends list");
	  teamName.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.home.team.id,match.sourceSystem);},false);

  }
  
  document.getElementById("short_home_goals_" + match.id + "_" + match.sourceSystem).innerHTML = match.home.goals;
  document.getElementById("separator_" + match.id + "_" + match.sourceSystem).innerHTML = ":";
  document.getElementById("short_away_goals_" + match.id + "_" + match.sourceSystem).innerHTML = match.away.goals;
  teamName=document.getElementById("short_away_name_" + match.id + "_" + match.sourceSystem);
  teamName.innerHTML = htlivesight.DOM.getTextContent(match.away.team.shortName);
  if(htlivesight.Friends.isFriend(match.away.team.id,match.sourceSystem)){
  	  if(match.away.team.id == htlivesight.Teams.myTeam.id) htlivesight.Util.AddClass(teamName,'short_own'); 
  	  else
	  htlivesight.Util.AddClass(teamName,'short_friend');
	  teamName.setAttribute("title","");
  }else{
	  htlivesight.Util.RemoveClass(teamName,['short_own','short_friend']);//reset styling
	  teamName.setAttribute("title","click on the team to add to friends list");
	  teamName.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.away.team.id,match.sourceSystem);},false);

  }
  
 } catch(e) {
    alert("UpdateShortBox(): " + e); //added by bigpapy to debug from XUL to HTML
	  console.log("UpdateShortBox(): " + e);
  }
};


 htlivesight.DOM.CreateElementRowShortGame=function(match) {
  var row, cell, /*vbox,*/ image;
  
try{ //added by bigpapy to debug from XUL to HTML
  row = document.createElement("tr");
  row.setAttribute("id", "short_" + match.id + "_" + match.sourceSystem);
  row.setAttribute("class", "match_row");
  
 // console.log(row);
  
  
  cell = document.createElement("td");
  cell.setAttribute("id", "short_home_name_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "hometeam_league");
  
  //document.getElementById("short_home_name_" + match.id + "_" + match.sourceSystem).innerHTML = htlivesight.DOM.getTextContent(match.home.team.shortName);
  htlivesight.Util.RemoveClass(cell,['short_own','short_friend']);//reset styling
  if(htlivesight.Friends.isFriend(match.home.team.id,match.sourceSystem)){
  	  if(match.home.team.id == htlivesight.Teams.myTeam.id) htlivesight.Util.AddClass(cell,'short_own'); 
  	  else
  	  htlivesight.Util.AddClass(cell,'short_friend');
  }else{
	  cell.setAttribute("title","click on the team to add to friends list");
	  cell.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.home.team.id,match.sourceSystem);},false); 
  }
	
//	console.log(cell);
  row.appendChild(cell);
  
  
  cell = document.createElement("td");
  cell.setAttribute("id", "short_home_goals_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "homescore_league");
  //document.getElementById("short_home_goals_" + match.id + "_" + match.sourceSystem).innerHTML = match.home.goals;
  
//	console.log(cell);
  row.appendChild(cell);
  
  
  cell = document.createElement("td");
  cell.setAttribute("id", "separator_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "separator_league");
  //document.getElementById("separator_" + match.id + "_" + match.sourceSystem).innerHTML = ":";
  
//	console.log(cell);
  row.appendChild(cell);


  cell = document.createElement("td");
  cell.setAttribute("id", "short_away_goals_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "awayscore_league");
  //document.getElementById("short_away_goals_" + match.id + "_" + match.sourceSystem).innerHTML = match.away.goals;
  
//	console.log(cell);
  row.appendChild(cell);


  cell = document.createElement("td");
  cell.setAttribute("id", "short_away_name_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "awayteam_league");
  
  //document.getElementById("short_away_name_" + match.id + "_" + match.sourceSystem).innerHTML = htlivesight.DOM.getTextContent(match.away.team.shortName);
  htlivesight.Util.RemoveClass(cell,['short_own','short_friend']);//reset styling
  if(htlivesight.Friends.isFriend(match.away.team.id,match.sourceSystem)){
  	  if(match.away.team.id == htlivesight.Teams.myTeam.id) htlivesight.Util.AddClass(cell,'short_own'); 
  	  else
	  htlivesight.Util.AddClass(cell,'short_friend');
  }else{
	  cell.setAttribute("title","click on the team to add to friends list");
	  cell.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.away.team.id,match.sourceSystem);},false);  
  }
	
//	console.log(cell);
  row.appendChild(cell);


  cell = document.createElement("td");
  cell.setAttribute("id", "imageadd_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "add_league");
  image = document.createElement("img");
  image.setAttribute("id", "short_liveimage_" + match.id + "_" + match.sourceSystem);
//  image.setAttribute("class", "imgwinboxopen");
  image.setAttribute("src", htlivesight.Image.live.OFF);
  image.setAttribute("match_id", match.id + "_" + match.sourceSystem);
  image.addEventListener('click',  htlivesight.Click.ToggleMatch, true);
  
  cell.appendChild(image);
  row.appendChild(cell);
  //row.appendChild(image);
  

  cell = document.createElement("td");
  cell.setAttribute("id", "imagedel_" + match.id + "_" + match.sourceSystem);
  cell.setAttribute("class", "remove_league");
  image = document.createElement("img");
  image.setAttribute("id", "short_liveclose_" + match.id + "_" + match.sourceSystem);
// image.setAttribute("class", "imgwinboxclose");
  image.setAttribute("src", htlivesight.Image.shortBox.CLOSE);
  image.setAttribute("match_id", match.id + "_" + match.sourceSystem);
  image.addEventListener('click',  htlivesight.Click.DeleteMatch, true);
  
  cell.appendChild(image);
  row.appendChild(cell);
  
  return row;
}catch(e){alert("htlivesight.DOM.CreateElementRowShortGame: "+e);}//added by bigpapy to debug from XUL to HTML
};
