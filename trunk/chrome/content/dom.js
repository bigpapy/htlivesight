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
  parser: new DOMParser(),
  parse: function(xml) {
    return htlivesight.DOM.parser.parseFromString(xml, "text/xml").documentElement;
  },
  window: {
    set: function(matchId, youth, setmode) {
      with (htlivesight.DOM.mode) {
	      var img_file, img = htlivesight.Image.window;
	      
	      if (setmode == close) {
	        htlivesight.DOM.toggleView(matchId, youth);
	        return;
	      }
	        
	      Match.List["_"+matchId+"_"+youth].window.mode = setmode;
	
	      img_file = (setmode == shade ? img.shade.on : img.shade.off); 
	      document.getElementById("shade_" + matchId + "_" + youth).setAttribute("src",img_file);
	      
	      img_file = (setmode==minimize ? img.minimize.on : img.minimize.off);
	      document.getElementById("minimize_" + matchId + "_" + youth).setAttribute("src", img_file);
	  
	      img_file = (setmode==maximize ? img.maximize.on : img.maximize.off);
	      document.getElementById("maximize_" + matchId + "_" + youth).setAttribute("src", img_file);
	//      alert("htlivesight.DOM.window.set");
	      htlivesight.DOM.window.repaint(matchId, youth);
      }
    },
    repaint: function(matchId, youth) {
      var match = Match.List["_"+matchId+"_"+youth];
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
    
      
        elem = document.getElementById("ev_row_"+matchId+"_"+youth+"_"+index);
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
         	  
        elem = document.getElementById("ev_row_"+matchId+"_"+youth+"_"+index);
        if (elem != null)
          elem.hidden=true;
        
        index--;
        }
    }
  },
  
 /*
  deleteLiveEvents: function(match) {
	  alert("DeleteLiveEvents_-1");
try {
	alert("DeleteLiveEvents_0");
	var i, ev, evList;
    var row, rows;
    alert("DeleteLiveEvents_1");
    rows = document.getElementById("ev_rows_" + match.id + "_" + match.youth);
    alert("DeleteLiveEvents_2");
    evList = match.event.list;
    alert("DeleteLiveEvents_3");
	for (i=0; i <= evList.last; i++) {
		ev = evList["_"+i];
		row = CreateElementRowLiveEvent(match, ev);
		row.setAttribute("id", "ev_row_"+match.id + "_" + match.youth+"_"+i );
		alert("prima di rows.removeChild");
		rows.removeChild(row);
		alert("dopo di rows.removeChild");
	}
	htlivesight.DOM.window.repaint(match.id,match.youth);
/*    var i, ev, evList;
    var row, rows;
    rows = document.getElementById("ev_rows_" + match.id + "_" + match.youth);
      evList = match.event.list;
 //   alert("match.window.topDown: "+match.window.topDown);
    if (match.window.topDown){
    	for (i=evList.first; i <= evList.last; i++) {
    		// for (i=evList.last; i >= evList.first; i--) { //reverse order	
    		ev = evList["_"+i];
    		if (ev && ev.text != "") {
    			row = CreateElementRowLiveEvent(match, ev);
    			row.setAttribute("id", "ev_row_"+match.id + "_" + match.youth+"_"+i );
    			rows.appendChild(row);
    			match.event.dom.join(row);
    		}
    	}
    }else {
    	for (i=evList.last; i >= evList.first; i--) { //reverse order	
    		ev = evList["_"+i];
    		if (ev && ev.text != "") {
    			row = CreateElementRowLiveEvent(match, ev);
    			row.setAttribute("id", "ev_row_"+match.id + "_" + match.youth+"_"+i );
    			rows.appendChild(row);
    			match.event.dom.join(row);
    		}
    	}
    };
    evList.first = evList.last+1;
  } catch(e) {
    alert("DOM.DeleteLiveEvents\n" + e);
  }


  }, */
  
  toggleTip: function(matchId, youth) {
    var tip = !Match.List["_"+matchId+"_"+youth].window.tip;
    var img = document.getElementById("tip_" + matchId + "_" + youth);
    
    Match.List["_"+matchId+"_"+youth].window.tip = tip;
    img.setAttribute("src", tip ? htlivesight.Image.window.info.on : htlivesight.Image.window.info.off);
    
    htlivesight.DOM.window.repaint(matchId, youth);
  },
//added by bigpapy: open new page on tab about match
  toggleSound: function(matchId, youth) {
	  var sound = !Match.List["_"+matchId+"_"+youth].window.mute;
	  var img = document.getElementById("sound_" + matchId + "_" + youth);
//	  var match = Match.List["_"+matchId+"_"+youth];
	  Match.List["_"+matchId+"_"+youth].window.mute = sound;
	  img.setAttribute("src", sound ? htlivesight.Image.window.sound.off : htlivesight.Image.window.sound.on);
//	  alert("prima di delete");
//	  htlivesight.DOM.window.deleteLiveEvents(match);
//	  alert("dopo di delete e prima di update");
//	  htlivesight.DOM.UpdateLiveEvents(match);
//	  alert("topDown= "+ topDown);
  },
  // (end)added by bigpapy: open new page on tab about match
  
  // added by bigpapy: open new page on tab about match
  toggleLink: function(matchId, youth) {
	  var htServer=htlivesight.prefs.general.hattrickServer;
	  if (!htServer){ 
		  var strbundle = document.getElementById("stringsauthorize");// internationalization: get local file content.
       	  var no_htserver=strbundle.getString("no_htserver");
       	  alert(no_htserver);
       	  htServer="www";
      };
	  var matchLink="http://" + htServer + ".hattrick.org/Club/Matches/Match.aspx?matchID=" + matchId;
	  if (youth=="True"){ matchLink=matchLink+"&isYouth=True";};
	  matchpage=window.open(matchLink);
	  },
	  // (end)added by bigpapy: open new page on tab about match
	  
  toggleView: function(matchId, youth) {
    var box = document.getElementById("live_" + matchId + "_" + youth);
    var show = box.hidden;
    var img = document.getElementById("short_liveimage_" + matchId + "_" + youth);

    if (show) {
      var curr=box;
      var prev=curr.previousSibling;
      while (prev != null && prev.hidden == true) {
        curr=prev;
        prev=curr.previousSibling;
      }
      box.parentNode.insertBefore(box, curr);
      
      box.hidden = false;
      //img.setAttribute("src", htlivesight.Image.live.on);
      img.setAttribute("class", "imgwinboxshade");
      htlivesight.DOM.window.repaint(matchId, youth);
    } else {      
      box.hidden = true;
      //img.setAttribute("src", htlivesight.Image.live.off);
      img.setAttribute("class", "imgwinboxopen");

      var curr=box;
      var next=curr.nextSibling;
      while (next != null && next.hidden == false) {
        curr=next;
        next=curr.nextSibling;
      }
      box.parentNode.insertBefore(box, next);
    }
  },
  deleteView: function(matchId, youth) {
    Live.HTTPDeleteMatch(matchId, youth);
    var box = document.getElementById("live_" + matchId + "_" + youth);
    var img = document.getElementById("short_liveimage_" + matchId + "_" + youth);
    
    box.hidden = true;
    img.setAttribute("class", "imgwinboxopen");
    Match.List["_" + matchId + "_" + youth].live = false;
    htlivesight.liveCount--;

    document.getElementById("short_" + matchId + "_" + youth).hidden = true;
    htlivesight.DOM.window.set(matchId, youth, htlivesight.DOM.mode.minimize);
  },
  createLineupElement: function(id, lineup) {
    var label, hbox;
    var popupset = document.getElementById("popup_set");
    var popup = document.createElement("popup");
    popupset.appendChild(popup);
    popup.setAttribute("id", id);
	popup.setAttribute("class", "formationpopup");

    var i, j;
    for(i=0; i<lineup.length; i++) {
      hbox = document.createElement("hbox");
      hbox.setAttribute("pack", "center");
      popup.appendChild(hbox);
      for(j=0; j<lineup[i].length; j++) {
        label = document.createElement("label");
        label.setAttribute("value", htlivesight.DOM.getTextContent(lineup[i][j]));
        label.setAttribute("class", "border");
        hbox.appendChild(label);
      }
    };
    return popup;
  },
  createAddTeamToFriendsPopup: function(team) {
    var strings = document.getElementById("strings");
    var popupset = document.getElementById("popup_set");
    var popup = document.createElement("popup");
    popup.setAttribute("id", "add_team_" +team.id);
	popup.setAttribute("class", "friendpopup");
    popupset.appendChild(popup);
    var menuitem = document.createElement("menuitem");
    popup.appendChild(menuitem);
    menuitem.setAttribute("label", strings.getString("menu.add_friend") + ": " + team.name);  
    menuitem.setAttribute("image", htlivesight.Image.friend.add.on);
    menuitem.setAttribute("class", "menuitem-iconic");
    menuitem.setAttribute("oncommand", "htlivesight.Click.addTeamToFriendsList("+team.id+",'"+team.youth+"')");  
    return popup;
  },
  addServerToPopup: function(server) {
    var strings = document.getElementById("strings");
    var serverString = document.getElementById("server");
  //  serverString.setAttribute("label", strings.getString("menu.server") + " " + server.substring(7));
    serverString.setAttribute("label", strings.getString("menu.server") + " " + server);
  },
  createTextElement: function (text, doClean) {
    //var d = document.createElementNS('http://www.w3.org/1999/xhtml', 'html:div');    
    var resultDoc = htlivesight.DOM.parser.parseFromString("<label>" + (doClean ? Util.CleanText(text) : text)+ "</label>","text/xml");
    var d = resultDoc.documentElement;  
    return d.firstChild;
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
  	var cleanedText = Util.cleanTags(event.text);
    var resultDoc = htlivesight.DOM.parser.parseFromString("<root>" + cleanedText + "</root>","text/xml");
    var nodeList = resultDoc.documentElement.childNodes;
    
    var retElement = document.createElement("description");
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
		}
    return retElement;
  }
};

/* -----------------------------------------------------------
 * Update Live Match
 * ----------------------------------------------------------- */

 
htlivesight.DOM.UpdateLiveMatch = function(match) {
  try {
    htlivesight.DOM.UpdateLiveBox(match);
    htlivesight.DOM.UpdateShortBox(match);
    htlivesight.DOM.window.repaint(match.id, match.youth);
  } catch(e) {
    alert("DOM.UpdateLiveMatch\n" + e);
  }
};

/* -----------------------------------------------------------
 * Live Box
 * ----------------------------------------------------------- */
htlivesight.DOM.UpdateLiveBox = function(match) {
  try {
    var box = document.getElementById("live_" + match.id + "_" + match.youth);
    if (!box) CreateElementLiveBox(match);
    UpdateLiveHeader(match);
    UpdateLiveEvents(match);
  } catch(e) {
    alert("DOM.UpdateLiveBox\n" + e);
  }

};
function CreateElementLiveBox(match) {
  var livebox, hbox, vbox, child;

  livebox = document.getElementById("live_box");
  hbox = document.createElement("hbox");
  //hbox.collapsed=true;
  hbox.hidden=true;
  
  livebox.appendChild(hbox);
  hbox.setAttribute("id", "live_" + match.id + "_" + match.youth);

  vbox = document.createElement("vbox");
  hbox.appendChild(vbox);
  vbox.setAttribute("flex", "1");
  child = CreateElementGroupboxLiveMatch(match);
  vbox.appendChild(child);
}

function CreateElementGroupboxLiveMatch(match) {
  var box, /*caption,*/ header, events;
  
  //box = document.createElement("groupbox");
  //caption = document.createElement("caption");
  //caption.setAttribute("label", "Live Match");
  //box.appendChild(caption);

  box = document.createElement("vbox");
  box.setAttribute("class", "live_match");
  

  header = htlivesight.DOM.createElementBoxLiveMatchHeader(match);
  box.appendChild(header);

  events = CreateElementGridLiveMatchEvents(match);
  box.appendChild(events);

  return box;
}

/* -----------------------------------------------------------
 * Header
 * ----------------------------------------------------------- */

/* --- update header -------- */
function UpdateLiveHeader(match) {
  var label/*, attr*/;
 // var headerElement = document.getElementById("box_header_"+match.id + "_" + match.youth);
  
  try {
	  
    if (match.arena.name) {
      label = document.getElementById("arena_name_" + match.id + "_" + match.youth);
      label.setAttribute("value", htlivesight.DOM.getTextContent(match.arena.name));
    }
    
    if (match.weather.image) {
      label = document.getElementById("weather_image_" + match.id + "_" + match.youth);
      label.setAttribute("src", match.weather.image);
    }

    if (match.arena.attendance) {
      label = document.getElementById("arena_attendance_" + match.id + "_" + match.youth);
      label.setAttribute("value", match.arena.attendance);
    }
    
    if (match.home.tactic) {
      label = document.getElementById("home_team_tactic_" + match.id + "_" + match.youth);
      label.setAttribute("value", match.home.tactic);
    }
    
    if (match.home.formation) {
      label = document.getElementById("home_team_formation_" + match.id + "_" + match.youth);
      label.setAttribute("value", match.home.formation);
    }

    if (match.away.formation) {
      label = document.getElementById("away_team_formation_" + match.id + "_" + match.youth);
      label.setAttribute("value", match.away.formation);
    }

    if (match.away.tactic) {
      label = document.getElementById("away_team_tactic_" + match.id + "_" + match.youth);
      label.setAttribute("value", match.away.tactic);
    }

    if (htlivesight.prefs.matches.scorers) {
      label = document.getElementById("home_team_scorers1_" + match.id + "_" + match.youth);  
      var label2 = document.getElementById("home_team_scorers2_" + match.id + "_" + match.youth);
      var label3 = document.getElementById("away_team_scorers2_" + match.id + "_" + match.youth);
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
        label.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[0]));
        if (numplayer > 4) {
          label2.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[1]));
          label2.setAttribute("hidden", "false");
          label3.setAttribute("hidden", "false");
        }
      }
  
      label = document.getElementById("away_team_scorers1_" + match.id + "_" + match.youth);  
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
        label.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[0]));
        if (numplayer > 4) {
          label3.setAttribute("value", htlivesight.DOM.getTextContent(scorerText[1]));
          label3.setAttribute("hidden", "false");
          label2.setAttribute("hidden", "false");
        }
      }
    }
        
    label = document.getElementById("time_" + match.id + "_" + match.youth);
    label.setAttribute("value", match.timeElapsed);

    label = document.getElementById("home_team_name_" + match.id + "_" + match.youth);
    label.setAttribute("value", htlivesight.DOM.getTextContent(match.home.team.name));

    label = document.getElementById("home_team_goals_" + match.id + "_" + match.youth);
    label.setAttribute("value", match.home.goals);
  
    label = document.getElementById("away_team_goals_" + match.id + "_" + match.youth);
    label.setAttribute("value", match.away.goals);

    label = document.getElementById("away_team_name_" + match.id + "_" + match.youth);
    label.setAttribute("value", htlivesight.DOM.getTextContent(match.away.team.name));

  } catch(e) {
    alert("DOM.UpdateLiveHeader\n" + e);
  }
};

/* --- Create Header -------------------------- */
htlivesight.DOM.createElementBoxLiveMatchHeader = function(match) {
  var header, placardbox, box, hbox, vbox, label, /*spacer,*/img;
  var strings = document.getElementById("strings");
  header = document.createElement("vbox");
  header.setAttribute("class", "box_header");
  header.setAttribute("id", "box_header_"+match.id + "_" + match.youth);
  header.setAttribute("flex", "1");

  // first row:  header header
  hbox = document.createElement("hbox");
  header.appendChild(hbox);
  hbox.setAttribute("align", "center");
  hbox.setAttribute("class", "box_header_header");

  var hboxL = document.createElement("hbox");
  hbox.appendChild(hboxL);
  hboxL.setAttribute("flex", "1");
  hboxL.setAttribute("align", "left");
  
  label = document.createElement("label");
  hboxL.appendChild(label);
  label.setAttribute("id", "arena_name_" + match.id + "_" + match.youth);
  img = document.createElement("image");
  hboxL.appendChild(img);
  img.setAttribute("src", htlivesight.Image.transparent);
  img.setAttribute("id", "weather_image_" + match.id + "_" + match.youth);
  label = document.createElement("label");
  hboxL.appendChild(label);
  label.setAttribute("id", "arena_attendance_" + match.id + "_" + match.youth);
  label = document.createElement("label");
  hboxL.appendChild(label);
  label.setAttribute("id", "weather_text_" + match.id + "_" + match.youth);

  var hboxM = document.createElement("hbox");
  hbox.appendChild(hboxM);
  hboxM.setAttribute("flex", "1");
  hboxM.setAttribute("align", "center");
  
  label = document.createElement("label");
  label.setAttribute("id", "time_" + match.id + "_" + match.youth);
  hboxM.appendChild(label);
 
  var hboxR = document.createElement("hbox");
  hbox.appendChild(hboxR);
  hboxR.setAttribute("flex", "1");
  hboxR.setAttribute("align", "right");

  box = document.createElement("hbox");
  hboxR.appendChild(box);
  box.setAttribute("align", "center");
  box.setAttribute("style", "margin-right: 20px;");
  
// new added by bigpapy: sound button on header
  img = document.createElement("image");
  box.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.sound.on);
  img.setAttribute("id", "sound_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.sound"));
  img.addEventListener('click',  htlivesight.Click.sound, true);
//new end adding by bigpapy
  
//added by bigpapy: link button on header
  img = document.createElement("image");
  box.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.link.off);
  img.setAttribute("id", "link_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.link"));
  img.addEventListener('click',  htlivesight.Click.link, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);
// end adding by bigpapy  
  img = document.createElement("image");
  box.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.info.on);
  img.setAttribute("id", "tip_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.info"));
  img.addEventListener('click',  htlivesight.Click.tip, true);

  img = document.createElement("image");
  hboxR.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.maximize.off);
  img.setAttribute("id", "maximize_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.maximize"));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);
  
  img = document.createElement("image");
  hboxR.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.minimize.on);
  img.setAttribute("id", "minimize_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.minimize"));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("image");
  hboxR.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.shade.off);
  img.setAttribute("id", "shade_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.shade"));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("image");
  hboxR.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.close.off);
  img.setAttribute("id", "close_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.close"));
  img.addEventListener('click',  htlivesight.Click.window, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("image");
  hboxR.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.up.off);
  img.setAttribute("id", "moveup_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.move_up"));
  img.addEventListener('click',  htlivesight.Click.moveUp, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  img = document.createElement("image");
  hboxR.appendChild(img);
  img.setAttribute("src", htlivesight.Image.window.down.off);
  img.setAttribute("id", "movedown_" + match.id + "_" + match.youth);
  img.setAttribute("tooltiptext", strings.getString("tooltip.window.move_down"));
  img.addEventListener('click',  htlivesight.Click.moveDown, true);
  img.addEventListener('mouseover',  htlivesight.Click.over, true);
  img.addEventListener('mouseout',  htlivesight.Click.out, true);

  // second row:  header body
  placardbox = document.createElement("hbox");
  header.appendChild(placardbox);
  placardbox.setAttribute("align", "center");
  placardbox.setAttribute("pack", "center");
  placardbox.setAttribute("id", "placardbox_"+match.id + "_" + match.youth);
  placardbox.setAttribute("flex", "1");

  // home team
  vbox = document.createElement("vbox");
  vbox.setAttribute("align", "end");
  vbox.setAttribute("flex", "1");
  placardbox.appendChild(vbox);
  
  hbox = document.createElement("hbox");
  hbox.setAttribute("align", "center");
  vbox.appendChild(hbox);

  box = document.createElement("hbox");
  hbox.appendChild(box);
  box.setAttribute("id", "header_home_team_notify_" + match.id + "_" + match.youth);
  box.setAttribute("class", "header_notify");

  if (!htlivesight.prefs.matches.scorers) {
    label = document.createElement("label");
    hbox.appendChild(label);
    label.setAttribute("id", "home_team_name_" + match.id + "_" + match.youth);
    label.setAttribute("class", "team_name");
    
    hbox = document.createElement("hbox");
    vbox.appendChild(hbox);
  }
  
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "home_team_tactic_" + match.id + "_" + match.youth);
  label.setAttribute("class", "tactic");
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "home_team_formation_" + match.id + "_" + match.youth);
  label.setAttribute("class", "formation");

  if (htlivesight.prefs.matches.scorers) {  
    label = document.createElement("label");
    hbox.appendChild(label);
    label.setAttribute("id", "home_team_name_" + match.id + "_" + match.youth);
    label.setAttribute("class", "team_name");

    label = document.createElement("description");
    vbox.appendChild(label);
    label.setAttribute("id", "home_team_scorers1_" + match.id + "_" + match.youth);
    label.setAttribute("class", "tactic");
    label.setAttribute("value", " ");
    label = document.createElement("description");
    vbox.appendChild(label);
    label.setAttribute("id", "home_team_scorers2_" + match.id + "_" + match.youth);
    label.setAttribute("class", "tactic");
    label.setAttribute("value", " ");
    label.setAttribute("hidden", "true");
  }

  // score
  hbox = document.createElement("hbox");
  placardbox.appendChild(hbox);
  hbox.setAttribute("class", "big_score");
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "home_team_goals_" + match.id + "_" + match.youth);
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("value", ":");
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "away_team_goals_" + match.id + "_" + match.youth);

  // away team
  
  vbox = document.createElement("vbox");
  vbox.setAttribute("flex", "1");
  placardbox.appendChild(vbox);
  
  hbox = document.createElement("hbox");
  vbox.appendChild(hbox);
  
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "away_team_name_" + match.id + "_" + match.youth);
  label.setAttribute("class", "team_name");
  
  if (!htlivesight.prefs.matches.scorers) {
    hbox = document.createElement("hbox");
    vbox.appendChild(hbox);
  }
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "away_team_formation_" + match.id + "_" + match.youth);
  label.setAttribute("class", "formation");
  label = document.createElement("label");
  hbox.appendChild(label);
  label.setAttribute("id", "away_team_tactic_" + match.id + "_" + match.youth);
  label.setAttribute("class", "tactic");

  box = document.createElement("hbox");
  hbox.appendChild(box);
  box.setAttribute("id", "header_away_team_notify_" + match.id + "_" + match.youth);
  box.setAttribute("class", "header_notify");

  if (htlivesight.prefs.matches.scorers) {
    label = document.createElement("description");
    vbox.appendChild(label);
    label.setAttribute("id", "away_team_scorers1_" + match.id + "_" + match.youth);
    label.setAttribute("class", "tactic");
    label.setAttribute("value", " ");
    label = document.createElement("description");
    vbox.appendChild(label);
    label.setAttribute("id", "away_team_scorers2_" + match.id + "_" + match.youth);
    label.setAttribute("class", "tactic");
    label.setAttribute("value", " ");
    label.setAttribute("hidden", "true");
  }

  return header;
};

/** -----------------------------------------------------------
 * Events
 * ----------------------------------------------------------- */

/* --- update events ---------------------------------------- */
function UpdateLiveEvents(match) {
  try {
    var i, ev, evList;
    var row, rows, lastrow;
    rows = document.getElementById("ev_rows_" + match.id + "_" + match.youth);
    evList = match.event.list;
    for (i=evList.first; i <= evList.last; i++) { 	
    	ev = evList["_"+i];
    	if (ev && ev.text != "") {
    		row = CreateElementRowLiveEvent(match, ev);
    		row.setAttribute("id", "ev_row_"+match.id + "_" + match.youth+"_"+i );
    		if (htlivesight.prefs.other.bottomUp){ // reverse order
    			if (!lastrow) lastrow=document.getElementById("ev_row_"+match.id + "_" + match.youth+"_"+(i-1));// last event
    			if (!lastrow) lastrow=document.getElementById("ev_row_"+match.id + "_" + match.youth+"_"+(i-3));// last event (before two "")
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
function CreateElementGridLiveMatchEvents(match) {
  try {
    var grid, cols, col, rows/*, row*/;
  
    grid = document.createElement("grid");
    grid.setAttribute("class", "live_events");  
  
    cols = document.createElement("columns");
    grid.appendChild(cols);
    col = document.createElement("column");
    cols.appendChild(col);
    col = document.createElement("column");
    cols.appendChild(col);
    col = document.createElement("column");
    cols.appendChild(col);
    col.setAttribute("flex", "1");
  
    rows = document.createElement("rows");
    grid.appendChild(rows);
    rows.setAttribute("id", "ev_rows_" + match.id + "_" + match.youth);
    return grid;
  } catch(e) {
    alert("DOM.CreateElementGridLiveMatchEvents\n" + e);
  }
  return null;
}

/* --- create event row ---------------------------- */
function CreateElementRowLiveEvent(match, event) {
  try {
    var row, l, img, t/*, b*/;
    row = document.createElement("row");
    if (event.subjectTeamId != 0) {
      var isF;
      isF = Friends.isFriend(event.subjectTeamId, match.youth, !Friends.STRICT);
      var isHome = match.isHomeTeam(event.subjectTeamId);
      if (isF && isHome) {
        row.setAttribute("class", "friend_home");
      } else if(isF && !isHome) {
        row.setAttribute("class", "friend_away");
      } else if(!isF && isHome) {
        row.setAttribute("class", "foe_home");
      } else if(!isF && !isHome) {
        row.setAttribute("class", "foe_away");
      }
    }

    if(event.lineupElement) {
      if (match.home.team.id==event.subjectTeamId) {
        l = document.getElementById("home_team_formation_"+match.id + "_" + match.youth);
      } else {
        l = document.getElementById("away_team_formation_"+match.id + "_" + match.youth);
      }
      //l.setAttribute("tooltip", event.lineupElement.id);
      // TODO
      l.setAttribute("contextmenu", event.lineupElement.id);
    };
  
    l = document.createElement("label");
    row.appendChild(l);
    l.setAttribute("value", event.minute);
  
    l = document.createElement("label");
    row.appendChild(l);
    img = document.createElement("image");
    l.appendChild(img);
    img.setAttribute("src", event.type.imageSrc);


    //l = document.createElement("label");
    //row.appendChild(l);
    //l.setAttribute("value","Telmo Costa");
		
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

function CreateElementGroupboxHighlights(gameId) {
  var groupbox, caption, grid;
  groupbox = document.createElement("groupbox");
  groupbox.setAttribute("class", "highlights");
  caption = document.createElement("caption");
  caption.setAttribute("label", "Highlights");
  groupbox.appendChild(caption);
  grid = CreateElementGridHighlights(gameId);
  groupbox.appendChild(grid);

  return groupbox;
}

function CreateElementGridHighlights(gameId) {
  var grid, cols, col, rows, row;
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

  row = CreateElementRowHighlightEvent();
  rows.appendChild(row);

  return grid;
}

function CreateElementRowHighlightEvent(event) {
  var row, l;
  row = document.createElement("row");
  l = document.createElement("label");
  l.setAttribute("value", "123");
  row.appendChild(l);
  l = document.createElement("label");
  l.setAttribute("value", "456");
  row.appendChild(l);
  l = document.createElement("label");
  l.setAttribute("value", "789");
  row.appendChild(l);
  l = document.createElement("label");
  l.setAttribute("value", "0ab");
  row.appendChild(l);
  return row;
}

/* -----------------------------------------------------------
 * Right Box
 * ----------------------------------------------------------- */

// Gonzo
function UpdateElementBoxLeagueTable(league) {
  var strings = document.getElementById("strings");
  if (Time.hattrickTime > League.currentRound.date) {matchLeagueStarted = true; 
	//alert("matchLeagueStarted: "+ matchLeagueStarted + " Time.hattrickTime:"+ Time.hattrickTime + " League.currentRound.date: " + League.currentRound.date);
}
else {matchLeagueStarted = false;
//alert("matchLeagueStarted: "+ matchLeagueStarted + " Time.hattrickTime:"+ Time.hattrickTime + " League.currentRound.date: " + League.currentRound.date);
}
  for(var matchid in Match.List){
    var myMatch = Match.List[matchid];
    if(league.currentRound.id.has(myMatch.id) 
        && League.currentRound.number > League.teams[Teams.myTeam.id]
        && htlivesight.showLeague
        && League.teams[myMatch.home.team.id]
        && League.teams[myMatch.away.team.id]){
      var homeId = myMatch.home.team.id;
      var awayId = myMatch.away.team.id;
      if (matchLeagueStarted){// if match started take the current round leauge
      League.teams[homeId].liveMatches = League.currentRound.number;
      League.teams[awayId].liveMatches = League.currentRound.number;
      } else {// if not take the last current round league
          League.teams[homeId].liveMatches = League.currentRound.number-1;
          League.teams[awayId].liveMatches = League.currentRound.number-1;
      };
      League.teams[homeId].liveGoalsFor = League.teams[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
      League.teams[homeId].liveGoalsAgainst = League.teams[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
      League.teams[awayId].liveGoalsFor = League.teams[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
      League.teams[awayId].liveGoalsAgainst = League.teams[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
      if(myMatch.home.goals > myMatch.away.goals){
        League.teams[homeId].livePoints = League.teams[homeId].points + 3;
        League.teams[awayId].livePoints = League.teams[awayId].points;
      }
      else if(myMatch.home.goals < myMatch.away.goals){
        League.teams[awayId].livePoints = League.teams[awayId].points + 3;
        League.teams[homeId].livePoints = League.teams[homeId].points;
      }
      else if (matchLeagueStarted){// add one point only if matches are started
        League.teams[homeId].livePoints = League.teams[homeId].points + 1;
        League.teams[awayId].livePoints = League.teams[awayId].points + 1;
      }
    }
  }
  League.sortTable();
  for(var id in League.teams){
    if(League.teams[id].livePosition > League.teams[id].position) League.teams[id].change = "leaguetable_down";
    else if(League.teams[id].livePosition < League.teams[id].position) League.teams[id].change = "leaguetable_up";
    else League.teams[id].change = "leaguetable_equal";
  }
  for(var j=1; j<=8; j++){
    document.getElementById("leaguetable_"+j).setAttribute("style", "");
  }
  document.getElementById("leaguetable_name").setAttribute("value", strings.getString("league.live_table")+" ("+league.levelUnitName+")");
  if(league.level == 1){
    document.getElementById("leaguetable_1").setAttribute("style", "background-color: #dfd;");
  }
  else if(league.level <= 6 || league.level % 2 == 0){
    document.getElementById("leaguetable_1").setAttribute("style", "background-color: #dfd; border-bottom-width: 1px; border-bottom-color: black;");
  }
  else{
    document.getElementById("leaguetable_1").setAttribute("style", "background-color: #dfd;");
    document.getElementById("leaguetable_2").setAttribute("style", "background-color: #dfd; border-bottom-width: 1px; border-bottom-color: black;");
  }
  if(league.level != league.maxLevel){
    document.getElementById("leaguetable_7").setAttribute("style", "background-color: #fdd; border-top-width: 1px; border-top-color: black;");
    document.getElementById("leaguetable_8").setAttribute("style", "background-color: #fdd;");
  }
  if(league.level < 6){
    document.getElementById("leaguetable_5").setAttribute("style", "background-color: #ffb;");
    document.getElementById("leaguetable_6").setAttribute("style", "background-color: #ffb;");
  }
  for(var i in League.teams){
    if(League.teams[i].livePosition >= 1 && League.teams[i].livePosition <= 8){
      if(i == Teams.myTeam.id){
        document.getElementById("leaguetable_"+League.teams[i].livePosition).setAttribute("style", document.getElementById("leaguetable_"+League.teams[i].livePosition).getAttribute("style")+" font-weight: bold;");
      }
      document.getElementById("leaguetable_"+League.teams[i].livePosition+"_name").setAttribute("value", htlivesight.DOM.getTextContent(League.teams[i].name));
      document.getElementById("leaguetable_"+League.teams[i].livePosition+"_change").setAttribute("class", League.teams[i].change);
      document.getElementById("leaguetable_"+League.teams[i].livePosition+"_matches").setAttribute("value", League.teams[i].liveMatches);
      var goals = League.teams[i].liveGoalsFor+"-"+League.teams[i].liveGoalsAgainst;
      document.getElementById("leaguetable_"+League.teams[i].livePosition+"_goals").setAttribute("value", goals);
      var diff = League.teams[i].liveGoalsFor - League.teams[i].liveGoalsAgainst;
      if(diff >= 0) diff = "+"+diff;
      document.getElementById("leaguetable_"+League.teams[i].livePosition+"_goaldif").setAttribute("value", diff);
      document.getElementById("leaguetable_"+League.teams[i].livePosition+"_points").setAttribute("value", League.teams[i].livePoints);
    }
  }
};
// End

function UpdateElementBoxLeague(league) {
  var strings = document.getElementById("strings");
  document.getElementById("winbox_leaguematches").collapsed=false;
  var number = strings.getString("league.round") + " " + league.currentRound.number;
  var date = Time.formatDate(league.currentRound.date);

  document.getElementById("league_round_number").setAttribute("value", number);
  document.getElementById("league_round_date").setAttribute("value", date);
  document.getElementById("league_round_time").setAttribute("value", "");

};


function CreateElementRowLeagueGame(gameId) {
  var rows, row;
  
  rows = document.getElementById("league_grid_rows");
  row = CreateElementRowShortGame(gameId);
  rows.appendChild(row);

}

htlivesight.DOM.UpdateShortBox = function(match) {
  try {
    var elem, label/*, a*/;
    
    elem = document.getElementById("short_" + match.id + "_" + match.youth);
    if (!elem) {
      elem = CreateElementRowShortGame(match);
      if (League.currentRound.id.has(match.id) && htlivesight.showLeague) {
        if (match.getTeamById(Teams.myTeam.id)) {
          elem.setAttribute("myLeagueMatch", "true");
        }
        document.getElementById("league_grid_rows").appendChild(elem);
      } else {
        document.getElementById("other_grid_rows").appendChild(elem);
      }
    } else {
    }
  
    if(elem.getAttribute("myLeagueMatch") == "true") {
      label = document.getElementById("league_round_time");
      label.setAttribute("value", match.timeElapsed);
      // Gonzo
      if(League.currentRound.number > League.teams[Teams.myTeam.id].matches){
        UpdateElementBoxLeagueTable(League);
      }
      // End
    }
  
    document.getElementById("short_home_goals_" + match.id + "_" + match.youth).setAttribute("value", match.home.goals);
    document.getElementById("short_away_goals_" + match.id + "_" + match.youth).setAttribute("value", match.away.goals);
  } catch(e) {
 //   alert("UpdateShortBox(): " + e);
 dump("UpdateShortBox(): " + e);
  }
};


function CreateElementRowShortGame(match) {
  var row, l, hbox, /*vbox,*/ image;

  row = document.createElement("row");
  row.setAttribute("id", "short_" + match.id + "_" + match.youth);
  row.setAttribute("align", "center");

  hbox = document.createElement("hbox");
  row.appendChild(hbox);
  hbox.setAttribute("pack", "end");
  l = document.createElement("label");
  hbox.appendChild(l);
  l.setAttribute("value", htlivesight.DOM.getTextContent(match.home.team.name));
  l.setAttribute("contextmenu", match.home.team.addTeamToFriendsPopup.getAttribute("id"));
  l.setAttribute("id", "short_home_name_" + match.id + "_" + match.youth);

  l = document.createElement("label");
  row.appendChild(l);
  l.setAttribute("value", match.home.goals);
  l.setAttribute("id", "short_home_goals_" + match.id + "_" + match.youth);

  l = document.createElement("label");
  row.appendChild(l);
  l.setAttribute("value", ":");
  l.setAttribute("class", "score_separator");

  l = document.createElement("label");
  row.appendChild(l);
  l.setAttribute("value", match.away.goals);
  l.setAttribute("id", "short_away_goals_" + match.id + "_" + match.youth);

  l = document.createElement("label");
  row.appendChild(l);
  l.setAttribute("value", htlivesight.DOM.getTextContent(match.away.team.name));
  //l.appendChild(createTextElement(match.away.team.name));
  l.setAttribute("contextmenu", match.away.team.addTeamToFriendsPopup.getAttribute("id"));
  l.setAttribute("id", "short_away_name_" + match.id + "_" + match.youth);

  image = document.createElement("image");
  row.appendChild(image);
  image.setAttribute("id", "short_liveimage_" + match.id + "_" + match.youth);
  //image.setAttribute("src", htlivesight.Image.live.off);
  image.setAttribute("class", "imgwinboxopen");
  image.setAttribute("match_id", match.id + "_" + match.youth);
  image.addEventListener('click',  htlivesight.Click.ToggleMatch, true);

  image = document.createElement("image");
  row.appendChild(image);
  image.setAttribute("id", "short_liveclose_" + match.id + "_" + match.youth);
  image.setAttribute("class", "imgwinboxclose");
  image.setAttribute("match_id", match.id + "_" + match.youth);
  image.addEventListener('click',  htlivesight.Click.DeleteMatch, true);
  
  return row;
}







