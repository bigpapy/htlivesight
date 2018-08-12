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
			var teamName,my,at,teamID,title;
			var matchId=id.replace(/(home|away)_team_formation/,"");
			var side=id.substr(0,4);
			var match = htlivesight.Match.List[matchId];
			if (side=="home")
			{
				teamName=htlivesight.Util.CleanText(match.home.team.name);
				my="right top";
				at="right bottom";
				teamID=match.home.team.id;
			}else if (side=="away"){
				teamName=htlivesight.Util.CleanText(match.away.team.name);
				my="left top";
				at="left bottom";
				teamID=match.away.team.id;
			}// add link to youth team too.
			if(htlivesight.Team.IsNationalTeam(teamID)){
				title = "<a href='https://www.hattrick.org/goto.ashx?path=/Club/NationalTeam/NationalTeam.aspx?teamId="+teamID+"' target='_blank'>"+teamName+"</a>";
			}else if(match.sourceSystem.toLowerCase() != 'youth'){
				title = "<a href='https://www.hattrick.org/goto.ashx?path=/Club/?TeamID="+teamID+"' target='_blank'>"+teamName+"</a>";
			}else{
				title = "<a href='https://www.hattrick.org/goto.ashx?path=/Club/Youth/?YouthTeamID="+teamID+"' target='_blank' >"+teamName+"</a>";
			}
			$("#"+id+"_table").dialog({ autoOpen: true, show: "fold", hide: "fold", width: 700, height: 510, title: title, classes: {"ui-dialog": "formationbg"} , position: {my: my, at: at, of: $('#'+id), collision: 'fit' }});
			$("span:contains(" + title + ")").html(title);
			return false;
		},

		statisticspopup:function(id){
			matchId=id.replace(/(home|away)_team_name/,"");
			var side=id.substr(0,4);
			var match = htlivesight.Match.List[matchId];
			if (side=="home")
			{
				var teamName= htlivesight.Util.CleanText(match.home.team.name);
				var my="right top";
			  var at="right bottom";
			  var teamID=match.home.team.id;
			}else if (side=="away"){
				var teamName= htlivesight.Util.CleanText(match.away.team.name);
				var my="left top";
			  var at="left bottom";
			  var teamID=match.away.team.id;
			}
			if(htlivesight.Team.IsNationalTeam(teamID)){
					var title = "<a href='https://www.hattrick.org/goto.ashx?path=/Club/NationalTeam/NationalTeam.aspx?teamId="+teamID+"' target='_blank'>"+teamName+"</a>";
			}else if(match.sourceSystem.toLowerCase() != 'youth'){
				var title = "<a href='https://www.hattrick.org/goto.ashx?path=/Club/?TeamID="+teamID+"' target='_blank'>"+teamName+"</a>";
			}else{
				var title = "<a href='https://www.hattrick.org/goto.ashx?path=/Club/Youth/?YouthTeamID="+teamID+"' target='_blank'>"+teamName+"</a>";
			}
			// fix to avoid link as a text in stats dialog title header
			//title = teamName;
			$("#"+id+"_statistics").dialog({ autoOpen: true, width: 350, height: 220, title: title, position: {my: my, at: at, of: $('#'+id), collision: 'fit' } });
			$("span:contains(" + title + ")").html(title);
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
		toggleSound: function(matchId, sourceSystem) {
			var sound = !htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.mute;
			var img = document.getElementById("sound_" + matchId + "_" + sourceSystem);
			htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.mute = sound;
			img.setAttribute("src", sound ? htlivesight.Image.window.sound.OFF : htlivesight.Image.window.sound.ON);
		},
		
		toggleSpeech: function(matchId, sourceSystem) {
		    //console.log("speech toggle!");
			var speech = !htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.speech;
			var img = document.getElementById("speech_" + matchId + "_" + sourceSystem);
			htlivesight.Match.List["_"+matchId+"_"+sourceSystem].window.speech = speech;
			img.setAttribute("src", speech ? htlivesight.Image.window.speech.ON : htlivesight.Image.window.speech.OFF);
		},

		toggleLink: function(matchId, sourceSystem) {
			try{ // added by bigpapy to debug from XUL to HTML
			/*	var htServer=htlivesight.Settings.preferences.general.hattrickServer;
				if (!htServer){ 
					var no_htserver=htlivesight.Util.Parse("NoHTServer",htlivesight.data[0]);
					alert(no_htserver);
					htServer="www";
				};*/
				//var matchLink="http://" + htServer + ".hattrick.org/Club/Matches/Match.aspx?matchID=" + matchId;
					var matchLink="https://www.hattrick.org/goto.ashx?path=/Club/Matches/Match.aspx?matchID=" + matchId;
				if (sourceSystem=="Hattrick"||sourceSystem=="False"){ 
					matchLink=matchLink+"&SourceSystem=Hattrick";
				}else if (sourceSystem=="youth"||sourceSystem=="Youth"||sourceSystem=="True"){
					matchLink=matchLink+"%26SourceSystem=Youth";
				}else if(sourceSystem=="htointegrated"||sourceSystem=="HTOIntegrated"){ matchLink=matchLink+"%26SourceSystem=HTOIntegrated";};
				var matchpage=window.open(matchLink);
			}catch(e){alert("toggleLInk: "+e);}// added by bigpapy to debug from XUL to HTML
		},

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
					box.className = "live_match_shown";
					img.setAttribute("src", htlivesight.Image.live.ON);
					htlivesight.DOM.window.repaint(matchId, sourceSystem);
					htlivesight.DOM.setHeaderColor();
					//if (document.getElementById("headerBarColorCheck").checked){
					//	$('.ui-accordion-header').css('background-image','none');
					//	$('.ui-accordion-header').css('background-color','#'+htlivesight.prefs.colors.headerBarColorCode);
					//}
				} else {      
					box.hidden = true;
					img.setAttribute("src", htlivesight.Image.live.OFF);
					var curr=box;
					var next=curr.nextSibling;
					while (next !== null && next.hidden === false) {
						curr=next;
						next=curr.nextSibling;
					}
					box.parentNode.insertBefore(box, next);
					htlivesight.DOM.closeMatchRelatedWindows(matchId + "_" + sourceSystem);
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
				htlivesight.Match.List["_" + matchId + "_" + sourceSystem].live = false;
				htlivesight.liveCount--;
				document.getElementById("short_" + matchId + "_" + sourceSystem).hidden = true;
				htlivesight.DOM.window.set(matchId, sourceSystem, htlivesight.DOM.mode.minimize);
			}catch(e){alert("deleteView: "+e);}// added by bigpapy to debug from XUL to HTML
		},
		
		createLineupElement: function(id, lineup, event) {
			try{// added by bigpapy to debug from XUL to HTML		  
				var label, hbox, ul;
				var mainDiv= document.getElementById(id);
				if (mainDiv === null){
					mainDiv= document.createElement("div");
					mainDiv.setAttribute("id", id);
					mainDiv.style.display='none';
					mainDiv.style.marginLeft="auto";
					mainDiv.style.marginRight="auto";
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
				var index;
				if (event.minute=="0") index=1;
				else index= ul.getElementsByTagName("li").length;
				a.setAttribute("href","#"+id+"-"+index);
				var img = new Image();
				if(event.minute == '★'){
					//a.textContent=event.minute;
					img.setAttribute("src", htlivesight.Image.star.yellow);
					img.setAttribute("class", "image_star_tab");
				}else{
					a.textContent=event.minute+"'";
					if(htlivesight.prefs.personalization.oldIcons && event.type.imageSrcOld){
						img.setAttribute("src", event.type.imageSrcOld);
					}else{
						img.setAttribute("src", event.type.imageSrc);
					}
					img.setAttribute("class", "image_tab");
				}
				a.appendChild(img);
				li_.appendChild(a);
				var popup = document.createElement("table");
				popup.cellSpacing="25px";
				popup.cellPadding="2px";
				popup.width="97%";
				popup.style.padding="0px";
				popup.style.marginLeft="auto";
				popup.style.marginRight="auto";
				mainDiv.appendChild(popup);
				popup.setAttribute("id", id+"-"+index);
				popup.style.textAlign="center";
				var i, j;
				for(i=0, len1=lineup.length; i<len1; i++) {
					hbox = document.createElement("tr");
					hbox.style.marginLeft="auto";
					hbox.style.marginRight="auto";
					popup.appendChild(hbox);
					for(j=0, len2=lineup[i].length; j<len2; j++) {
						label = document.createElement("td");
						label.setAttribute('class','formationplayer');
						label.width="130";
						label.height="30";
						if (i===0 && j===0){
							label_empty = document.createElement("td");

							if(event.minute!="★"){
								img = new Image();
								img.setAttribute("src", htlivesight.Image.copy);
								img.setAttribute("id", "copy_to_clipboard_icon");
								img.setAttribute("title", htlivesight.Util.Parse("TooltipCopyLineUp",htlivesight.data[0]));
								img.addEventListener("click", function(e){htlivesight.LineUp.toClipboard(lineup, id, event.minute,e);});

								label_empty.appendChild(img);
							}
							hbox.appendChild(label_empty);
							label_empty1 = document.createElement("td");
							hbox.appendChild(label_empty1);
						}
						if (i==3 && j==0){
							label_empty = document.createElement("td");
							hbox.appendChild(label_empty);
						}
						var playerInfo = lineup[i][j].split("#");// split name and individual order (0) from player id (1) and youth (2)
						var linkPlayer = document.createElement("a");
						linkPlayer.addEventListener("click", function(){htlivesight.Click.openPlayerLink(this);},true);
						//linkPlayer.setAttribute("target","_blank");
						//linkPlayer.setAttribute("href","#");
						linkPlayer.setAttribute("style", "text-decoration: none; color: white !important");
						linkPlayer.addEventListener("mouseover", function(){this.setAttribute("style", "text-decoration:underline;color: white !important");});
						linkPlayer.addEventListener("mouseout", function(){this.setAttribute("style", "text-decoration:none;color: white !important");});
						linkPlayer.textContent= htlivesight.DOM.getTextContent(playerInfo[0]);
						label.appendChild(linkPlayer);
						if(playerInfo[2].toLowerCase()=="true"){
						linkPlayer.setAttribute('class',playerInfo[1]+"_youth underlined");
						}else{
							linkPlayer.setAttribute('class',playerInfo[1]+" underlined");
						}
						hbox.appendChild(label);
					}
				};
				return popup;
			}catch(e){alert("createLineupElement: "+e);}// added by bigpapy to debug from XUL to HTML
		},

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
				var occasion=match.getSideById(event.subjectTeamId).occasion;
				var goals=match.getSideById(event.subjectTeamId).goals;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("Goals",htlivesight.data[0]);
				label_number = document.createElement("td");
				label_number.textContent=goals+" / "+occasion;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				popup.appendChild(hbox);
				var free_kick=match.getSideById(event.subjectTeamId).free_kick;
				var free_kick_goal=match.getSideById(event.subjectTeamId).free_kick_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("FreeKicks",htlivesight.data[0]);
				label_number = document.createElement("td");
				label_number.textContent=free_kick_goal+" / "+free_kick;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var penalty=match.getSideById(event.subjectTeamId).penalty;
				var penalty_goal=match.getSideById(event.subjectTeamId).penalty_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("TimePenalties",htlivesight.data[0]);
				label_number = document.createElement("td");
				label_number.textContent=penalty_goal+" / "+penalty;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var left=match.getSideById(event.subjectTeamId).left;
				var left_goal=match.getSideById(event.subjectTeamId).left_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.capitalize(htlivesight.Util.Parse("EventSideLeft",htlivesight.data[0]));
				label_number = document.createElement("td");
				label_number.textContent=left_goal+" / "+left;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var center=match.getSideById(event.subjectTeamId).center;
				var center_goal=match.getSideById(event.subjectTeamId).center_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.capitalize(htlivesight.Util.Parse("EventSideCenter",htlivesight.data[0]));
				label_number = document.createElement("td");
				label_number.textContent=center_goal+" / "+center;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var right=match.getSideById(event.subjectTeamId).right;
				var right_goal=match.getSideById(event.subjectTeamId).right_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.capitalize(htlivesight.Util.Parse("EventSideRight",htlivesight.data[0]));
				label_number = document.createElement("td");
				label_number.textContent=right_goal+" / "+right;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				
				hbox = document.createElement("tr");
				var long_shot=match.getSideById(event.subjectTeamId).long_shot;
				var long_shot_goal=match.getSideById(event.subjectTeamId).long_shot_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.capitalize(htlivesight.Util.Parse("LongShot",htlivesight.data[0]));
				label_number = document.createElement("td");
				label_number.textContent=long_shot_goal+" / "+long_shot;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var special=match.getSideById(event.subjectTeamId).special_event;
				var special_goal=match.getSideById(event.subjectTeamId).special_event_goal;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("SpecialEvent",htlivesight.data[0]);;
				label_number = document.createElement("td");
				label_number.textContent=special_goal+" / "+special;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var yellow=match.getSideById(event.subjectTeamId).yellow;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("YellowCards",htlivesight.data[0]);
				label_number = document.createElement("td");
				label_number.textContent=yellow;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var red=match.getSideById(event.subjectTeamId).red;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("RedCards",htlivesight.data[0]);
				label_number = document.createElement("td");
				label_number.textContent=red;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var injured=match.getSideById(event.subjectTeamId).injured;
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("Injuries",htlivesight.data[0]);
				label_number = document.createElement("td");
				label_number.textContent=injured;
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				var possession1=match.getSideById(event.subjectTeamId).possession_1;
				var possession2=match.getSideById(event.subjectTeamId).possession_2;
				label = document.createElement("td");
				label.textContent=label.textContent=htlivesight.Util.Parse("BallPosses",htlivesight.data[0])+" "+htlivesight.Util.decapitalize(htlivesight.Util.Parse("TimeFirstHalf",htlivesight.data[0]));
				label_number = document.createElement("td");
				label_number.textContent=+possession1+"%";
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				hbox = document.createElement("tr");
				label = document.createElement("td");
				label.textContent=htlivesight.Util.Parse("BallPosses",htlivesight.data[0])+" "+htlivesight.Util.decapitalize(htlivesight.Util.Parse("TimeSecondHalf",htlivesight.data[0]));
				label_number = document.createElement("td");
				label_number.textContent=+possession2+"%";
				hbox.appendChild(label);
				hbox.appendChild(label_number);
				popup.appendChild(hbox);
				return popup;
				}catch(e){alert("createStatisticElement: "+e);}
		},

		createAddTeamToFriendsPopup: function(team) {
			try{ // added by bigpapy to debug from XUL to HTML
				var popupset = document.getElementById("popup_set");
				var popup = document.createElement("popup");
				popup.setAttribute("id", "add_team_" +team.id);
				popup.setAttribute("class", "friendpopup");
				popupset.appendChild(popup);
				var menuitem = document.createElement("menuitem");
				popup.appendChild(menuitem);
				menuitem.setAttribute("label", htlivesight.Util.Parse("MenuAddFriend",htlivesight.data[0]) + ": " + team.name);  
				menuitem.setAttribute("image", htlivesight.Image.friend.add.ON);
				menuitem.setAttribute("class", "menuitem-iconic");
				menuitem.addEventListener("command", function(){htlivesight.Click.addTeamToFriendsList(team.id,team.youth);},false);
				return popup;
			}catch(e){alert("createAddTeamToFriendsPopup: "+e);}// added by bigpapy to debug from XUL to HTML
		},
		
		addServerToPopup: function(server) {
			document.getElementById("ServerStatus").textContent=server;
		},
		createTextElement: function (text, doClean) {
			try{//added by bigpapy to debug from XUL to HTML
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
				//console.log("event.text= "+event.text);
				var cleanedText = htlivesight.Util.cleanTags(event.text);
				//console.log("cleanedText= "+cleanedText);
				var prefs = htlivesight.prefs;
				
				//fix for sponsors in best player choice (event 041)
			//	if (!(event.key.A == 0 && event.key.BC == 41)){
				  cleanedText= htlivesight.Util.CleanText2(cleanedText);
			//	}
				// end fix for sponsors in best player choice (event 041)
				/* fix for single quote in sponsor href begin*/
				//  cleanedText= cleanedText.replace("='/","=\"/");
				//  cleanedText= cleanedText.replace("'&gt;","\">");
				  cleanedText = cleanedText.replace(/<a href=('|")\/Goto.ashx\?path=(((?!Club\/Players).)*)<\/a>/,"");
				  /* fix for single quote in sponsor href end*/  
			//	console.log("cleanedText2= "+cleanedText);
				  
				var resultDoc = htlivesight.DOM.parser.parseFromString("<root>" + cleanedText + "</root>","text/xml");
				//console.log(resultDoc);
				var nodeList = resultDoc.documentElement.childNodes;
				var retElement = document.createElement("td");
				retElement.setAttribute("class", "event_text");
				var newElement;
				for (var i=0; i<nodeList.length; i++) {
					var child = nodeList.item(i);
					if (child.nodeName == "#text") {
						newElement = document.createTextNode(child.textContent);		    
					} else if (child.nodeName == "a") {
						/** log used to build links*/
				//		console.log(child);
						var href = child.getAttribute("href");
					//	console.log("href = "+href);
					//	hrefArray = href.split("=");
					//	console.log(hrefArray[1]);
					//linkArray = stringa.split("\"");
					//	console.log("linkArray[1] = "+linkArray[1]);
						var classPostfix = "";
						var playerId = "";
						if (href.indexOf("playerId") >= 0){
							classPostfix = " withSpecialty";
							playerId=href.match(/\d+/);
						}else if (href.indexOf("YouthPlayerID") >= 0){
							classPostfix = "_youth withSpecialty";
							playerId=href.match(/\d+/);
						}
						newElement = document.createElementNS("http://www.w3.org/1999/xhtml", "em");
						newElement.addEventListener("click", function(href){ return function(e){window.open("https://www.hattrick.org/goto.ashx?path="+href);};}(href),true);
						newElement.addEventListener("mouseover", function(){htlivesight.DOM.ShowLink(this);});
						newElement.addEventListener("mouseout", function(){htlivesight.DOM.HideLink(this);});
						newElement.setAttribute("class", "player_name"+ " "+playerId+classPostfix);
						newElement.appendChild(document.createTextNode((child.firstChild?child.firstChild.textContent:"???")));//??? appears when player name is missing, it allows to open player link for a quick check
					} else {
					//	console.log(child);
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
	var livebox, hbox, vbox, child;//, divcontainer;

	try{ //added by bigpapy to debug from xul to html
		livebox = document.getElementById("live_box");
		//divcontainer = document.createElement("div");
		//livebox.appendChild(divcontainer);
		hbox = document.createElement("div");
		hbox.className = "live_match_hidden";
		hbox.hidden=true;
		//divcontainer.appendChild(hbox);
		livebox.appendChild(hbox);
		hbox.setAttribute("id", "live_" + match.id + "_" + match.sourceSystem);
  	child = htlivesight.DOM.CreateElementGroupboxLiveMatch(match);
		hbox.appendChild(child);
		//$( "#live_" + match.id + "_" + match.sourceSystem).resizable({containment: "#live_box",handles: "e"}).parent().draggable({snap: "#live_box, table", snapTolerance: 10, cancel: ".ev_rows, .placardrow, .iconzone" });
	}catch(e){alert("CreateElementGroupboxLiveMatch: "+e);}// added by bigpapy to debug from XML to HTML
};

htlivesight.DOM.CreateElementGroupboxLiveMatch=function(match) {
	var box, header, events;
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
	var label;
	try {
		if (match.arena.name) {
			label = document.getElementById("arena_name_" + match.id + "_" + match.sourceSystem).textContent = match.arena.name;
			label = document.getElementById("weather_image_" + match.id + "_" + match.sourceSystem);
		}else{
			if(match.date) document.getElementById("arena_name_" + match.id + "_" + match.sourceSystem).textContent = htlivesight.Time.shortDateString(match.date);
		}
		if (match.weather.image) {
			label = document.getElementById("weather_image_" + match.id + "_" + match.sourceSystem);
			label.setAttribute("src", match.weather.image);
			label.setAttribute("class", "weather_image");
		}
		if (match.arena.attendance) {
			document.getElementById("arena_attendance_" + match.id + "_" + match.sourceSystem).textContent = match.arena.attendance;
		}
		if (match.home.tactic) {
			document.getElementById("home_team_tactic_" + match.id + "_" + match.sourceSystem).textContent = match.home.tactic;
		}
		if (match.home.formation) {
			document.getElementById("home_team_formation_" + match.id + "_" + match.sourceSystem).textContent = match.home.formation;
		}
		if (match.away.formation) {
			document.getElementById("away_team_formation_" + match.id + "_" + match.sourceSystem).textContent = match.away.formation;
		}
		if (match.away.tactic) {
			document.getElementById("away_team_tactic_" + match.id + "_" + match.sourceSystem).textContent = match.away.tactic;
		}
		if (htlivesight.prefs.matches.scorers) {
			label = document.getElementById("home_team_scorers1_" + match.id + "_" + match.sourceSystem);  
			var label2 = document.getElementById("home_team_scorers2_" + match.id + "_" + match.sourceSystem);
			var label3 = document.getElementById("away_team_scorers2_" + match.id + "_" + match.sourceSystem);
			var scoreText, numplayer, player;
			if (match.home.scorers) {
				scorerText = [];
				scorerText[0] = "";
				scorerText[1] = "";
				var line = 0;
				numplayer = 1;
				for(player in match.home.scorers) {
					if ((match.home.scorers[player].name==="")||(typeof match.home.scorers[player].mins===undefined)){continue; } // to filter empty name or undefined minutes
					scorerText[line] += match.home.scorers[player].name + match.home.scorers[player].mins + ") ";
					if (numplayer++ == 3)
						line++;
				}
				//console.log(scorerText[0]);
				label.textContent= htlivesight.DOM.getTextContent(scorerText[0]);
				if (numplayer > 4) {
					label2.textContent= htlivesight.DOM.getTextContent(scorerText[1]);
					label2.setAttribute("style", "display:block");
					label3.setAttribute("style", "display:block");
				}
			}
			label = document.getElementById("away_team_scorers1_" + match.id + "_" + match.sourceSystem);  
			if (match.away.scorers) {
				scorerText = [];
				scorerText[0] = "";
				scorerText[1] = "";
				var line = 0;
				numplayer = 1;
				for(player in match.away.scorers) {
					if ((match.away.scorers[player].name==="")||(typeof match.away.scorers[player].mins===undefined)){continue; } // to filter empty name or undefined minutes
					scorerText[line] += match.away.scorers[player].name + match.away.scorers[player].mins + ") ";
					if (numplayer++ == 3)
						line++;
				}
				label.textContent= htlivesight.DOM.getTextContent(scorerText[0]);
				if (numplayer > 4) {
					label3.textContent= htlivesight.DOM.getTextContent(scorerText[1]);
					label2.setAttribute("style", "display:block");
					label3.setAttribute("style", "display:block");
				}
			}
		}
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
				label.textContent= htlivesight.DOM.getTextContent(bookedText[0]);
				if (numplayer > 4) {
					label2.textContent= htlivesight.DOM.getTextContent(bookedText[1]);
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
				label.textContent= htlivesight.DOM.getTextContent(bookedText[0]);
				if (numplayer > 4) {
					label3.textContent= htlivesight.DOM.getTextContent(bookedText[1]);
					label3.setAttribute("style", "display:block");
					label2.setAttribute("style", "display:block");
				}
			}
		}
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
				label.textContent= htlivesight.DOM.getTextContent(sent_offText[0]);
				if (numplayer > 4) {
					label2.textContent= htlivesight.DOM.getTextContent(sent_offText[1]);
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
				label.textContent= htlivesight.DOM.getTextContent(sent_offText[0]);
				if (numplayer > 4) {
					label3.textContent= htlivesight.DOM.getTextContent(sent_offText[1]);
					label3.setAttribute("style", "display:block");
					label2.setAttribute("style", "display:block");
				}
			}
		}
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
				label.textContent= htlivesight.DOM.getTextContent(injuredText[0]);
				if (numplayer > 4) {
					label2.textContent= htlivesight.DOM.getTextContent(injuredText[1]);
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
				label.textContent= htlivesight.DOM.getTextContent(injuredText[0]);
				if (numplayer > 4) {
					label3.textContent= htlivesight.DOM.getTextContent(injuredText[1]);
					label3.setAttribute("style", "display:block");
					label2.setAttribute("style", "display:block");
				}
			}
		}
		document.getElementById("time_" + match.id + "_" + match.sourceSystem).textContent = match.timeElapsed;    
		document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem).textContent = htlivesight.Util.CleanText(match.home.team.name);
		document.getElementById("home_team_goals_" + match.id + "_" + match.sourceSystem).textContent = match.home.goals;
		document.getElementById("away_team_goals_" + match.id + "_" + match.sourceSystem).textContent = match.away.goals;
		document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem).textContent = htlivesight.Util.CleanText(match.away.team.name);
	} catch(e) {
		alert("DOM.UpdateLiveHeader\n" + e);
	}
};

/* --- Create Header -------------------------- */
htlivesight.DOM.createElementBoxLiveMatchHeader = function(match) {
	var header, tbody, placardbox, box, hbox, vbox, label, link, temp, img, logo;
	try{ //added by bigpapy to debug from xul to html
		header = document.createElement("thead");
		header.setAttribute("class", "box_header animation");
		header.setAttribute("id", "box_header_"+match.id + "_" + match.sourceSystem);
		hbox = document.createElement("tr");
		header.appendChild(hbox);
		hbox.setAttribute("class", "box_header_header ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top");
		var hboxL = document.createElement("td");
		hboxL.setAttribute("class", "line1header");
		hbox.appendChild(hboxL);
		hboxL.setAttribute("align", "left");
		
		
		
		label = document.createElement("span");
		hboxL.appendChild(label);
		label.setAttribute("id", "arena_name_" + match.id + "_" + match.sourceSystem);
		label.setAttribute("class", "arena_name");
		img = document.createElement("img");
		hboxL.appendChild(img);
		img.setAttribute("src", htlivesight.Image.transparent);
		img.setAttribute("id", "weather_image_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("class", "weather_image");  
		label = document.createElement("span");
		hboxL.appendChild(label);
		label.setAttribute("id", "arena_attendance_" + match.id + "_" + match.sourceSystem);
		label.setAttribute("class", "arena_attendance");
		
		img = document.createElement("img");
		hboxL.appendChild(img);
		img.setAttribute("src", htlivesight.Image.transparent);
		img.setAttribute("id", "match_type_image_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("class", "weather_image");
		img.setAttribute("title", htlivesight.Time.shortDateString(match.date));

		var hboxM = document.createElement("td");
		hboxM.setAttribute("class", "chronoheader");
		hbox.appendChild(hboxM);
		label = document.createElement("span");
		label.setAttribute("id", "time_" + match.id + "_" + match.sourceSystem);
		hboxM.appendChild(label);
		var hboxR = document.createElement("td");
		hboxR.setAttribute("class", "iconzone");
		hbox.appendChild(hboxR);
		box = hboxR;
		
		img = document.createElement("img");
		box.appendChild(img);
		img.setAttribute("class", "match_button speech");
		img.setAttribute("src", htlivesight.Image.window.speech.OFF);
		img.setAttribute("id", "speech_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowSpeech",htlivesight.data[0]));
		//img.style.visibility = 'hidden';
		img.addEventListener('click',  htlivesight.Click.speech, true);
		
		img = document.createElement("img");
		box.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.sound.ON);
		img.setAttribute("id", "sound_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowSound",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.sound, true);
		img = document.createElement("img");
		box.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.link.OFF);
		img.setAttribute("id", "link_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowLink",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.link, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		img = document.createElement("img");
		box.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.info.ON);
		img.setAttribute("id", "tip_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowInfo",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.tip, true);
		img = document.createElement("img");
		hboxR.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.maximize.OFF);
		img.setAttribute("id", "maximize_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMaximize",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.window, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		img = document.createElement("img");
		hboxR.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.minimize.ON);
		img.setAttribute("id", "minimize_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMinimize",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.window, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		img = document.createElement("img");
		hboxR.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.shade.OFF);
		img.setAttribute("id", "shade_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowShade",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.window, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		img = document.createElement("img");
		hboxR.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.close.OFF);
		img.setAttribute("id", "close_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowClose",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.window, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		img = document.createElement("img");
		hboxR.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.up.OFF);
		img.setAttribute("id", "moveup_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMoveUp",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.moveUp, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		img = document.createElement("img");
		hboxR.appendChild(img);
		img.setAttribute("class", "match_button");
		img.setAttribute("src", htlivesight.Image.window.down.OFF);
		img.setAttribute("id", "movedown_" + match.id + "_" + match.sourceSystem);
		img.setAttribute("title",htlivesight.Util.Parse("TooltipWindowMoveDown",htlivesight.data[0]));
		img.addEventListener('click',  htlivesight.Click.moveDown, true);
		img.addEventListener('mouseover',  htlivesight.Click.over, true);
		img.addEventListener('mouseout',  htlivesight.Click.out, true);
		var placardrow = document.createElement("tr");
		placardrow.align="center";
		placardrow.setAttribute("class", "placardrow");
		header.appendChild(placardrow);
		placardbox = document.createElement("td");
		placardbox.colSpan ="3";
		placardrow.appendChild(placardbox);
		placardbox.setAttribute("id", "placardbox_"+match.id + "_" + match.sourceSystem);
		vbox = document.createElement("table");
		vbox.width="100%";
		placardbox.appendChild(vbox);
		hbox = document.createElement("tr");
		vbox.appendChild(hbox);
		leftbox = document.createElement("td");
		leftbox.setAttribute("align", "right");
		hbox.appendChild(leftbox);
		leftbox.setAttribute("width", "47%");
		var homebox = document.createElement("table"), hometr = document.createElement("tr");
		leftbox.appendChild(homebox);
		homebox.appendChild(hometr);
		homebox.setAttribute("class", "team_home");
		box = document.createElement("td");
		hometr.appendChild(box);
		box.setAttribute("id", "header_home_team_notify_" + match.id + "_" + match.sourceSystem);
		box.setAttribute("class", "header_notify");
		label = document.createElement("td");
		hometr.appendChild(label);
		label.setAttribute("id", "home_team_tactic_" + match.id + "_" + match.sourceSystem);
		label.setAttribute("class", "tactic");
		label = document.createElement("td");
		hometr.appendChild(label);
		label.setAttribute("class", "formation");
		link = document.createElement("a");
		//link.href="#home_team_formation_" + match.id + "_" + match.sourceSystem;
		link.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
		link.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
		link.setAttribute("style", "text-decoration: none");
		label.appendChild(link);
		link.setAttribute("id", "home_team_formation_" + match.id + "_" + match.sourceSystem);
		link.setAttribute("title", htlivesight.Util.Parse("SchemaTip", htlivesight.data[0]));
		link.addEventListener("click",function(){htlivesight.DOM.formationpopup(this.id);});//TODO: move formationpopup to Click file
		$( "#"+"home_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
		//link.style.textDecoration = 'underline';
		link.setAttribute('class','underlined');
		label = document.createElement("td");
		hometr.appendChild(label);
		link = document.createElement("a");
		label.appendChild(link);
		link.setAttribute("id", "home_team_name_" + match.id + "_" + match.sourceSystem);
	//	link.href="#";
	//	link.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
	//	link.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
		link.setAttribute("style", "text-decoration: none");
	//	link.setAttribute("title", htlivesight.Util.Parse("StatisticTip", htlivesight.data[0]));
	//	link.addEventListener("click",function(){htlivesight.DOM.statisticspopup(this.id);});
		label.setAttribute("class", "team_name");
		// adding logo to home team in matchwindow
		logo = document.createElement("td");
		hometr.appendChild(logo);
		img = document.createElement("img");
		//img.setAttribute("height", "28px");
		img.setAttribute("class", "header_team_logo headerteamlogo_"+match.home.team.id + "_" + (match.sourceSystem=="youth"?"True":"False"));
		img.addEventListener("click",function(){htlivesight.Click.openTeamLink(match.home.team.id, match.sourceSystem);});
		logo.appendChild(img);
		// end adding logo to hoema team in matchwindow
		
		if (htlivesight.prefs.matches.scorers) {  
			hbox1 = document.createElement("tr"); //bigpapy add to fix it
			hbox1.setAttribute("class", "scorers");
			vbox.appendChild(hbox1);
			box1 = document.createElement("td");
			box1.setAttribute("align", "right");
			box1.setAttribute("width", "47%");
			box1.setAttribute("class", "scorers_home");
			hbox1.appendChild(box1);
			label = document.createElement("span");
			box1.appendChild(label);
			label.setAttribute("id", "home_team_scorers1_" + match.id + "_" + match.sourceSystem);
			label.setAttribute("class", "scinheader");
			label.textContent= " ";
			hbox2 = document.createElement("tr"); //bigpapy add to fix it
			hbox2.setAttribute("class", "scorers");
			vbox.appendChild(hbox2);
			box21 = document.createElement("td");
			box21.setAttribute("align", "right");
			box21.setAttribute("width", "47%");
			box21.setAttribute("class", "scorers_home");
			hbox2.appendChild(box21);
			label = document.createElement("span");
			box21.appendChild(label);
			label.setAttribute("id", "home_team_scorers2_" + match.id + "_" + match.sourceSystem);
			label.setAttribute("class", "scinheader");
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		if (htlivesight.prefs.matches.booked) {

			hbox3 = document.createElement("tr"); //bigpapy add to fix it
			hbox3.setAttribute("class", "scorers");
			vbox.appendChild(hbox3);
			box31 = document.createElement("td");
			box31.setAttribute("align", "right");
			box31.setAttribute("width", "47%");
			box31.setAttribute("class", "scorers_home");
			hbox3.appendChild(box31);
			label = document.createElement("span");
			label.setAttribute("class", "ycinheader");
			box31.appendChild(label);
			label.setAttribute("id", "home_team_booked1_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			hbox4 = document.createElement("tr"); //bigpapy add to fix it
			hbox4.setAttribute("class", "scorers");
			vbox.appendChild(hbox4);
			box41 = document.createElement("td");
			box41.setAttribute("align", "right");
			box41.setAttribute("width", "47%");
			box41.setAttribute("class", "scorers_home");
			hbox4.appendChild(box41);
			label = document.createElement("span");
			box41.setAttribute("class", "ycinheader");
			box41.appendChild(label);
			label.setAttribute("id", "home_team_booked2_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		if (htlivesight.prefs.matches.sentOff) {
			hbox5 = document.createElement("tr"); //bigpapy add to fix it
			hbox5.setAttribute("class", "sent_off");
			vbox.appendChild(hbox5);
			box51 = document.createElement("td");
			box51.setAttribute("align", "right");
			box51.setAttribute("width", "47%");
			box51.setAttribute("class", "sent_off_home");
			hbox5.appendChild(box51);
			label = document.createElement("span");
			label.setAttribute("class", "rcinheader");
			box51.appendChild(label);
			label.setAttribute("id", "home_team_sent_off1_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			hbox6 = document.createElement("tr"); //bigpapy add to fix it
			hbox6.setAttribute("class", "sent_off");
			vbox.appendChild(hbox6);
			box61 = document.createElement("td");
			box61.setAttribute("align", "right");
			box61.setAttribute("width", "47%");
			box61.setAttribute("class", "sent_off_home");
			hbox6.appendChild(box61);
			label = document.createElement("span");
			box61.setAttribute("class", "rcinheader");
			box61.appendChild(label);
			label.setAttribute("id", "home_team_sent_off2_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		if (htlivesight.prefs.matches.injured) {
			hbox7 = document.createElement("tr"); //bigpapy add to fix it
			hbox7.setAttribute("class", "injured");
			vbox.appendChild(hbox7);
			box71 = document.createElement("td");
			box71.setAttribute("align", "right");
			box71.setAttribute("width", "47%");
			box71.setAttribute("class", "injured_home");
			hbox7.appendChild(box71);
			label = document.createElement("span");
			label.setAttribute("class", "injinheader");
			box71.appendChild(label);
			label.setAttribute("id", "home_team_injured1_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			hbox8 = document.createElement("tr"); //bigpapy add to fix it
			hbox8.setAttribute("class", "injured");
			vbox.appendChild(hbox8);
			box81 = document.createElement("td");
			box81.setAttribute("align", "right");
			box81.setAttribute("width", "47%");
			box81.setAttribute("class", "injured_home");
			hbox8.appendChild(box81);
			label = document.createElement("span");
			box81.setAttribute("class", "injinheader");
			box81.appendChild(label);
			label.setAttribute("id", "home_team_injured2_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		box = document.createElement("td");//bigpapy add to fix it
		box.setAttribute("width", "6%");
		hbox.appendChild(box);
		box.setAttribute("class", "big_score");
		box.setAttribute("align", "center");
		label = document.createElement("span");
		box.appendChild(label);
		label.setAttribute("id", "home_team_goals_" + match.id + "_" + match.sourceSystem);
		label = document.createElement("span");
		box.appendChild(label);
		label.textContent= ":";
		label = document.createElement("span");
		box.appendChild(label);
		label.setAttribute("id", "away_team_goals_" + match.id + "_" + match.sourceSystem);
		rightbox = document.createElement("td"); //bigpapy add to fix it
		rightbox.setAttribute("align", "left");
		hbox.appendChild(rightbox);
		rightbox.setAttribute("width", "47%");
		var awaybox = document.createElement("table"), awaytr = document.createElement("tr");
		rightbox.appendChild(awaybox);
		awaybox.appendChild(awaytr);
		awaybox.setAttribute("class", "team_away");
		
		// adding logo to away team in matchwindow
		logo = document.createElement("td");
		awaytr.appendChild(logo);
		img = document.createElement("img");
		//img.setAttribute("height", "28px");
		img.setAttribute("class", "header_team_logo headerteamlogo_"+match.away.team.id + "_" + (match.sourceSystem=="youth"?"True":"False"));
		img.addEventListener("click",function(){htlivesight.Click.openTeamLink(match.away.team.id, match.sourceSystem);});
		logo.appendChild(img);
		
		// end adding logo to away team in matchwindow
		
		label = document.createElement("td");
		awaytr.appendChild(label);
		label.setAttribute("class", "team_name");
		link = document.createElement("a");
		label.appendChild(link);
		link.setAttribute("id", "away_team_name_" + match.id + "_" + match.sourceSystem);
		link.setAttribute("style", "text-decoration: none");
//		link.setAttribute("title", htlivesight.Util.Parse("StatisticTip", htlivesight.data[0]));
//		link.addEventListener('click', function(){htlivesight.DOM.statisticspopup(this.id);});
		if (!htlivesight.prefs.matches.scorers  && !htlivesight.prefs.matches.booked && !htlivesight.prefs.matches.sentOff && !htlivesight.prefs.matches.injured) {
		}
		label = document.createElement("td");
		awaytr.appendChild(label);
		label.setAttribute("class", "formation");
		link = document.createElement("a");
		label.appendChild(link);
		//link.href="#";
		link.addEventListener("mouseover",function(){htlivesight.DOM.ShowLink(this);});
		link.addEventListener("mouseout",function(){htlivesight.DOM.HideLink(this);});
		link.setAttribute("style", "text-decoration: none");
		link.setAttribute("id", "away_team_formation_" + match.id + "_" + match.sourceSystem);
		link.setAttribute( "title", htlivesight.Util.Parse( "SchemaTip", htlivesight.data[0] ) );
		link.addEventListener('click',function(){htlivesight.DOM.formationpopup(this.id);});
		$( "#"+"away_team_formation_" + match.id + "_" + match.sourceSystem+"_table").tabs();
		//link.style.textDecoration = 'underline';
		link.setAttribute('class','underlined');
		label = document.createElement("td");
		awaytr.appendChild(label);
		label.setAttribute("id", "away_team_tactic_" + match.id + "_" + match.sourceSystem);
		label.setAttribute("class", "tactic");
		box = document.createElement("td");
		awaytr.appendChild(box);
		box.setAttribute("id", "header_away_team_notify_" + match.id + "_" + match.sourceSystem);
		box.setAttribute("class", "header_notify");
		if (htlivesight.prefs.matches.scorers) {
			box2 = document.createElement("td");  
			hbox1.appendChild(box2);
			box2.setAttribute("width", "6%");
			box2.setAttribute("align", "center");
			box3 = document.createElement("td");
			box3.setAttribute("align", "left");
			box3.setAttribute("width", "47%");
			box3.setAttribute("class", "scorers_away");
			hbox1.appendChild(box3);
			label = document.createElement("span");
			box3.appendChild(label);
			label.setAttribute("id", "away_team_scorers1_" + match.id + "_" + match.sourceSystem);
			label.setAttribute("class", "scinheader");
			label.textContent= " ";
			box22 = document.createElement("td");
			box22.setAttribute("width", "6%");
			box22.setAttribute("align", "center");
			hbox2.appendChild(box22);
			box23 = document.createElement("td");
			box23.setAttribute("align", "left");
			box23.setAttribute("width", "47%");
			box23.setAttribute("class", "scorers_away");
			hbox2.appendChild(box23);
			label = document.createElement("span");
			box23.appendChild(label);
			label.setAttribute("id", "away_team_scorers2_" + match.id + "_" + match.sourceSystem);
			label.setAttribute("class", "scinheader");
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		if (htlivesight.prefs.matches.booked) {
			box32 = document.createElement("td");  
			hbox3.appendChild(box32);
			box32.setAttribute("width", "6%");
			box33 = document.createElement("td");
			box33.setAttribute("align", "left");
			box33.setAttribute("width", "47%");
			box33.setAttribute("class", "booked_away");
			hbox3.appendChild(box33);
			label = document.createElement("span");
			label.setAttribute("class", "ycinheader");
			box33.appendChild(label);
			label.setAttribute("id", "away_team_booked1_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			box42 = document.createElement("td");
			box42.setAttribute("width", "6%");
			hbox4.appendChild(box42);
			box43 = document.createElement("td");
			box43.setAttribute("align", "left");
			box43.setAttribute("width", "47%");
			box43.setAttribute("class", "booked_away");
			hbox4.appendChild(box43);
			label = document.createElement("span");
			box43.setAttribute("class", "ycinheader");
			box43.appendChild(label);
			label.setAttribute("id", "away_team_booked2_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		if (htlivesight.prefs.matches.sentOff) {
			box52 = document.createElement("td");  
			hbox5.appendChild(box52);
			box52.setAttribute("width", "6%");
			box53 = document.createElement("td");
			box53.setAttribute("align", "left");
			box53.setAttribute("width", "47%");
			box53.setAttribute("class", "sent_off_away");
			hbox5.appendChild(box53);
			label = document.createElement("span");
			label.setAttribute("class", "rcinheader");
			box53.appendChild(label);
			label.setAttribute("id", "away_team_sent_off1_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			box62 = document.createElement("td");
			box62.setAttribute("width", "6%");
			hbox6.appendChild(box62);
			box63 = document.createElement("td");
			box63.setAttribute("align", "left");
			box63.setAttribute("width", "47%");
			box63.setAttribute("class", "sent_off_away");
			hbox6.appendChild(box63);
			label = document.createElement("span");
			box63.setAttribute("class", "rcinheader");
			box63.appendChild(label);
			label.setAttribute("id", "away_team_sent_off2_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			label.setAttribute("style", "display:none");
		}
		if (htlivesight.prefs.matches.injured) {
			box72 = document.createElement("td");  
			hbox7.appendChild(box72);
			box72.setAttribute("width", "6%");
			box73 = document.createElement("td");
			box73.setAttribute("align", "left");
			box73.setAttribute("width", "47%");
			box73.setAttribute("class", "injured_away");
			hbox7.appendChild(box73);
			label = document.createElement("span");
			label.setAttribute("class", "injinheader");
			box73.appendChild(label);
			label.setAttribute("id", "away_team_injured1_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			box82 = document.createElement("td");
			box82.setAttribute("width", "6%");
			hbox8.appendChild(box82);
			box83 = document.createElement("td");
			box83.setAttribute("align", "left");
			box83.setAttribute("width", "47%");
			box83.setAttribute("class", "injured_away");
			hbox8.appendChild(box83);
			label = document.createElement("span");
			box83.setAttribute("class", "injinheader");
			box83.appendChild(label);
			label.setAttribute("id", "away_team_injured2_" + match.id + "_" + match.sourceSystem);
			label.textContent= " ";
			label.setAttribute("style", "display:none");
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
					if (!lastrow) lastrow =  rows.firstChild;
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
		var row, l, img, t, empty_img;
		var prefs=htlivesight.prefs;
		row = document.createElement("tr");
		if (!match.isHomeTeam(event.subjectTeamId) && !match.isAwayTeam(event.subjectTeamId)){
			if (prefs.colors.neutralColorCheck)
				row.style.backgroundColor= "#" + prefs.colors.neutralColorCode;
			if (prefs.colors.neutralTextColorCheck)
				row.style.color= "#" + prefs.colors.neutralTextColorCode;
		}
		if (prefs.colors.textColorCheck)
			row.style.color= "#" + prefs.colors.textColorCode;
		if (match.isHomeTeam(event.subjectTeamId) || match.isAwayTeam(event.subjectTeamId)) {
			var isF;
			isF = htlivesight.Friends.isFriend(event.subjectTeamId, match.sourceSystem, !htlivesight.Friends.STRICT);
			var isHome = match.isHomeTeam(event.subjectTeamId);
			if (isF && isHome) {
				row.setAttribute("class", "friend_home");
				if (prefs.colors.friendHomeColorCheck)
					row.style.backgroundColor= "#" + prefs.colors.friendHomeColorCode;
				if (prefs.colors.friendHomeTextColorCheck)
					row.style.color= "#" + prefs.colors.friendHomeTextColorCode;
			} else if(isF && !isHome) {
				row.setAttribute("class", "friend_away");
				if (prefs.colors.friendAwayColorCheck)
					row.style.backgroundColor= "#" + prefs.colors.friendAwayColorCode;
				if (prefs.colors.friendAwayTextColorCheck)
					row.style.color= "#" + prefs.colors.friendAwayTextColorCode;
			} else if(!isF && isHome) {
				row.setAttribute("class", "foe_home");
				if (prefs.colors.foeHomeColorCheck)
					row.style.backgroundColor= "#" + prefs.colors.foeHomeColorCode;
				if (prefs.colors.foeHomeTextColorCheck)
					row.style.color= "#" + prefs.colors.foeHomeTextColorCode;
			} else if(!isF && !isHome) {
				row.setAttribute("class", "foe_away");
				if (prefs.colors.foeAwayColorCheck)
					row.style.backgroundColor= "#" + prefs.colors.foeAwayColorCode;
				if (prefs.colors.foeAwayTextColorCheck)
					row.style.color= "#" + prefs.colors.foeAwayTextColorCode;
			}
		}
		else {
			row.setAttribute("class", "info_row");
		}
		try{
			if(""+event.key.A + event.key.BC=="041") {
				if (match.home.team.id==event.subjectTeamId) {
					//var l1 = document.getElementById("home_team_name_" + match.id + "_" + match.sourceSystem);
					htlivesight.DOM.createStatisticElement("home_team_name_"+match.id+"_"+match.sourceSystem+"_statistics", match, event);
					//l1.addEventListener('click',function(){htlivesight.DOM.statisticspopup(this.id);});
					//l1.setAttribute("contextmenu", "home_team_statistics_"+match.id+"_"+match.sourceSystem);
				}else /*if(match.away.team.id==event.subjectTeamId)*/{
	
					//var l2 = document.getElementById("away_team_name_" + match.id + "_" + match.sourceSystem);    	          
					htlivesight.DOM.createStatisticElement("away_team_name_"+match.id+"_"+match.sourceSystem+"_statistics", match, event);
					//l2.addEventListener('click',function(){htlivesight.DOM.statisticspopup(this.id);});
					//l2.setAttribute("contextmenu", "away_team_statistics_"+match.id+"_"+match.sourceSystem);
				};
			}; }catch(e){alert("errore stats:"+e);}


			if(event.lineupElement) {
				if (match.home.team.id==event.subjectTeamId) {
					l = document.getElementById("home_team_formation_"+match.id + "_" + match.sourceSystem);
				} else {
					l = document.getElementById("away_team_formation_"+match.id + "_" + match.sourceSystem);
				}
				l.setAttribute("contextmenu", event.lineupElement.id);
			};
			l = document.createElement("td");
			l.setAttribute("class","event_minute");
			row.appendChild(l);
			l.textContent= event.minute;
			l = document.createElement("td");
			l1 = document.createElement("td");
			row.appendChild(l);
			row.appendChild(l1);
			img = document.createElement("img");
			img.addEventListener("click", function(e){htlivesight.Events.toClipboard(event, e);});
			empty_img = document.createElement("img");
			l.setAttribute("class","event_icon");
			l1.setAttribute("class","event_icon");
			if(event.key.BC == "25" && (event.key.A == "1" || event.key.A == "2")){ //own goal should switch icon position
				if(match.isHomeTeam(event.subjectTeamId)){
					l.appendChild(empty_img);
					l1.appendChild(img);
				}else{
					l.appendChild(img);
					l1.appendChild(empty_img);					
				}				
			}else if (match.isHomeTeam(event.subjectTeamId)|| event.subjectTeamId == 0){
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
			img.setAttribute("title", event.key.txt  + ((htlivesight.Events.eventMap[event.key.ABC] != null) ? (" " + htlivesight.Events.eventMap[event.key.ABC]) : ""));
			t = htlivesight.DOM.createTextEventElement(event);
			row.appendChild(t);
			return row;
	} catch(e) {
		alert("DOM.CreateElementRowLiveEvent\n" + e);
	}
	return null; 
};
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
};

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
		l.innerHTM="123";
		row.appendChild(l);
		l = document.createElement("label");
		l.innerHTM="456";
		row.appendChild(l);
		l = document.createElement("label");
		l.innerHTM="789";
		row.appendChild(l);
		l = document.createElement("label");
		l.innerHTM="0ab";
		row.appendChild(l);
		return row;
	}catch(e){alert("CreateElementRowHighlightEvent: "+e);} // added by bigpapy to debug from xul to html
};
/* -----------------------------------------------------------
 * Right Box
 * ----------------------------------------------------------- */
htlivesight.DOM.UpdateElementBoxLeagueTable=function(league) {
	var matchLeagueStarted;
	try{ // added by bigpapy to debug from XUL to HTML
		if (htlivesight.League.currentRound == undefined) return;
		if (htlivesight.Time.hattrickTime > htlivesight.League.currentRound.date) {matchLeagueStarted = true; 
		}
		else {matchLeagueStarted = false;
		}
		for(var matchid in htlivesight.Match.List){
			var myMatch = htlivesight.Match.List[matchid];
			if(htlivesight.Util.isInArray(league.currentRound.id, myMatch.id)//league.currentRound.id.has(myMatch.id) 
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
					}
					else if(myMatch.home.realGoals < myMatch.away.realGoals){
						htlivesight.League.teams[awayId].points -= 3;
					}
					else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
						htlivesight.League.teams[homeId].points -= 1;
						htlivesight.League.teams[awayId].points -= 1;
					}
				};
  //			if((htlivesight.Time.hattrickTime-htlivesight.League.currentRound.date)>6300000){
  		if(htlivesight.League.currentRound.number == htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches){
				htlivesight.League.teams[homeId].liveGoalsFor = htlivesight.League.teams[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				htlivesight.League.teams[homeId].liveGoalsAgainst = htlivesight.League.teams[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.League.teams[awayId].liveGoalsFor = htlivesight.League.teams[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.League.teams[awayId].liveGoalsAgainst = htlivesight.League.teams[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				}else{// if relive start during the match table loaded isn't updated to actual round
					/*start: new part added to fix wrong number of goals*/
					htlivesight.League.teams[homeId].liveGoalsFor = htlivesight.League.teams[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
					htlivesight.League.teams[homeId].liveGoalsAgainst = htlivesight.League.teams[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
					htlivesight.League.teams[awayId].liveGoalsFor = htlivesight.League.teams[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
					htlivesight.League.teams[awayId].liveGoalsAgainst = htlivesight.League.teams[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
					/*end: new part added to fix wrong number of goals*/
				}
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
			htlivesight.Util.RemoveClass(document.getElementById("leaguetable_"+j+""),['league_title','league_promote','league_demote','league_qualify','league_own']);
		}
		document.getElementById("LeagueLiveTable").textContent = htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0])+" ("+league.levelUnitName+")";
		if(league.level == 1){
			//title holder
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_title');
		}
		else if(league.level <= 6 || league.level % 2 == 0){
			//#1 promotes
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
		}
		else{
			//#1 AND #2 promote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote');
		}
		
		if(league.level > 6 && league.level % 2 == 0){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote_qualify');
		}
		if(league.level > 6 && league.level % 2 == 1){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_3"),'league_promote_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_4"),'league_promote_qualify');
		}
		
		if(league.level != league.maxLevel){
			//#7 AND #8 demote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_7"),'league_demote');
			$("#leaguetable_8 td").addClass('league_demote');
			//htlivesight.Util.AddClass(document.getElementById("leaguetable_8"),'league_demote');
		}
		if(/*league.level < 6 &&*/ league.level != league.maxLevel){
			//#5 AND #6 need to qualify
			htlivesight.Util.AddClass(document.getElementById("leaguetable_5"),'league_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_6"),'league_qualify');
		}
		for(var i in htlivesight.League.teams){
			if(htlivesight.League.teams[i].livePosition >= 1 && htlivesight.League.teams[i].livePosition <= 8){
				if(i == htlivesight.Teams.myTeam.id){
					htlivesight.Util.AddClass(document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition),'league_own');
				}
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_name").textContent = htlivesight.DOM.getTextContent(htlivesight.League.teams[i].name);
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_change").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.League.teams[i].change);
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_matches").textContent = htlivesight.League.teams[i].liveMatches;
			  var goalsFor = htlivesight.League.teams[i].liveGoalsFor;
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals_for").textContent = goalsFor;
			  var goalsAgainst = htlivesight.League.teams[i].liveGoalsAgainst;
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals_against").textContent = goalsAgainst;
				//var goals = htlivesight.League.teams[i].liveGoalsFor+"-"+htlivesight.League.teams[i].liveGoalsAgainst;
				//document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals").textContent = goals;
				var diff = htlivesight.League.teams[i].liveGoalsFor - htlivesight.League.teams[i].liveGoalsAgainst;
				if(diff >= 0) diff = "+"+diff;
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goaldif").textContent = diff;
				document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_points").textContent = htlivesight.League.teams[i].livePoints;
			}
		}
	}catch(e){
		if(htlivesight.League.teams3.length == 0){ // no table available hiding live table
			document.getElementById("winbox_leaguetable").setAttribute("style", "display:none");
			noty({type: 'warning', maxVisible: 1, text: "HATTRICK CHPP Data error! Missing info about league table of your first team"});
			if(document.getElementById("league_grid_rows").innerHTML.replace(/\s/g, '').length == 0){
				document.getElementById("winboxcontent_leaguematches").setAttribute("style", "display:none");
				document.getElementById("LeagueMatches").setAttribute("style", "display:none");
				document.getElementById("h3LeagueMatches").setAttribute("style", "display:none");				
			}
		}else{
			alert("UpdateElementBoxLeagueTable: "+e);
		}// added by bigpapy to debug from XUL to HTML			
	}
};


htlivesight.DOM.UpdateElementBoxLeagueTable2=function(league) {
	var matchLeagueStarted;
	try{ // added by bigpapy to debug from XUL to HTML
		if (htlivesight.League.currentRound2 == undefined) return;
		if (htlivesight.Time.hattrickTime > htlivesight.League.currentRound2.date) {matchLeagueStarted = true; 
		}
		else {matchLeagueStarted = false;
		}
		for(var matchid in htlivesight.Match.List){
			var myMatch = htlivesight.Match.List[matchid];
			if(htlivesight.Util.isInArray(league.currentRound2.id, myMatch.id)//league.currentRound2.id.has(myMatch.id) 
					&& htlivesight.League.currentRound2.number > htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id]
					&& htlivesight.showLeague2
					&& htlivesight.League.teams2[myMatch.home.team.id]
					&& htlivesight.League.teams2[myMatch.away.team.id]){
				var homeId = myMatch.home.team.id;
				var awayId = myMatch.away.team.id;
				if (matchLeagueStarted){// if match started take the current round leauge
					htlivesight.League.teams2[homeId].liveMatches = htlivesight.League.currentRound2.number;
					htlivesight.League.teams2[awayId].liveMatches = htlivesight.League.currentRound2.number;
				} else {// if not take the last current round league
					htlivesight.League.teams2[homeId].liveMatches = htlivesight.League.currentRound2.number-1;
					htlivesight.League.teams2[awayId].liveMatches = htlivesight.League.currentRound2.number-1;
				};
				// if HTLS works in relive mode and last round is ended and lastRound wasn't removed from table remove it from table.
				if((htlivesight.prefs.other.reLive && (htlivesight.League.currentRound2.number == htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id].matches)) && (!htlivesight.Live.removedLastRoundFromTable2)){
					if(myMatch.home.realGoals > myMatch.away.realGoals){
						htlivesight.League.teams2[homeId].points -=  3;
					}
					else if(myMatch.home.realGoals < myMatch.away.realGoals){
						htlivesight.League.teams2[awayId].points -= 3;
					}
					else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
						htlivesight.League.teams2[homeId].points -= 1;
						htlivesight.League.teams2[awayId].points -= 1;
					}
				};
  //			if((htlivesight.Time.hattrickTime-htlivesight.League.currentRound.date)>6300000){
  		if(htlivesight.League.currentRound2.number == htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id].matches){
				htlivesight.League.teams2[homeId].liveGoalsFor = htlivesight.League.teams2[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				htlivesight.League.teams2[homeId].liveGoalsAgainst = htlivesight.League.teams2[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.League.teams2[awayId].liveGoalsFor = htlivesight.League.teams2[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.League.teams2[awayId].liveGoalsAgainst = htlivesight.League.teams2[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				}else{// if relive start during the match table loaded isn't updated to actual round
					/*start: new part added to fix wrong number of goals*/
					htlivesight.League.teams2[homeId].liveGoalsFor = htlivesight.League.teams2[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
					htlivesight.League.teams2[homeId].liveGoalsAgainst = htlivesight.League.teams2[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
					htlivesight.League.teams2[awayId].liveGoalsFor = htlivesight.League.teams2[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
					htlivesight.League.teams2[awayId].liveGoalsAgainst = htlivesight.League.teams2[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
					/*end: new part added to fix wrong number of goals*/
				}
				if(myMatch.home.goals > myMatch.away.goals){
					htlivesight.League.teams2[homeId].livePoints = htlivesight.League.teams2[homeId].points + 3;
					htlivesight.League.teams2[awayId].livePoints = htlivesight.League.teams2[awayId].points;
				}
				else if(myMatch.home.goals < myMatch.away.goals){
					htlivesight.League.teams2[awayId].livePoints = htlivesight.League.teams2[awayId].points + 3;
					htlivesight.League.teams2[homeId].livePoints = htlivesight.League.teams2[homeId].points;
				}
				else if (matchLeagueStarted){// add one point only if matches are started
					htlivesight.League.teams2[homeId].livePoints = htlivesight.League.teams2[homeId].points + 1;
					htlivesight.League.teams2[awayId].livePoints = htlivesight.League.teams2[awayId].points + 1;
				}
			}
		}
		htlivesight.League.sortTable2();
		for(var id in htlivesight.League.teams2){
			// restoring relive table position to last round and not actual one deleting it and getting position after first call of the function
			if((htlivesight.prefs.other.reLive && (htlivesight.League.currentRound2.number == htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id].matches)) && (!htlivesight.Live.removedLastRoundFromTable2)){
				htlivesight.League.teams2[id].position=htlivesight.League.teams2[id].livePosition;
			};
			// end part of restoring relive table position to last round and not actual one deleting it and getting position after first call of the function.
			if(htlivesight.League.teams2[id].livePosition > htlivesight.League.teams2[id].position) htlivesight.League.teams2[id].change = "down.gif";
			else if(htlivesight.League.teams2[id].livePosition < htlivesight.League.teams2[id].position) htlivesight.League.teams2[id].change = "up.gif" +
			"";
			else htlivesight.League.teams2[id].change = "equal.gif";
		}
		for(var j=1; j<=8; j++){
			htlivesight.Util.RemoveClass(document.getElementById("leaguetable_"+j+"Bis"),['league_title','league_promote','league_demote','league_qualify','league_own']);
		}
		document.getElementById("LeagueLiveTableBis").textContent = htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0])+" ("+league.levelUnitName2+")";
		if(league.level2 == 1){
			//title holder
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1Bis"),'league_title');
		}
		else if(league.level2 <= 6 || league.level2 % 2 == 0){
			//#1 promotes
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1Bis"),'league_promote');			
		}
		else{
			//#1 AND #2 promote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1Bis"),'league_promote');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2Bis"),'league_promote');
		}
		if(league.level2 > 6 && league.level2 % 2 == 0){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2Bis"),'league_promote_qualify');
		}
		if(league.level2 > 6 && league.level2 % 2 == 1){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_3Bis"),'league_promote_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_4Bis"),'league_promote_qualify');
		}
		if(league.level2 != league.maxLevel2){
			//#7 AND #8 demote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_7Bis"),'league_demote');
			$("#leaguetable_8Bis td").addClass('league_demote');
			//htlivesight.Util.AddClass(document.getElementById("leaguetable_8Bis"),'league_demote');
		}
		if(/*league.level2 < 6 &&*/ league.level2 != league.maxLevel2){
			//#5 AND #6 need to qualify
			htlivesight.Util.AddClass(document.getElementById("leaguetable_5Bis"),'league_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_6Bis"),'league_qualify');
		}
		for(var i in htlivesight.League.teams2){
			if(htlivesight.League.teams2[i].livePosition >= 1 && htlivesight.League.teams2[i].livePosition <= 8){
				if(i == htlivesight.Teams.mySecondTeam.id){
					htlivesight.Util.AddClass(document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"Bis"),'league_own');
				}
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_nameBis").textContent = htlivesight.DOM.getTextContent(htlivesight.League.teams2[i].name);
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_changeBis").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.League.teams2[i].change);
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_matchesBis").textContent = htlivesight.League.teams2[i].liveMatches;
				var goalsFor = htlivesight.League.teams2[i].liveGoalsFor;
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_goals_forBis").textContent = goalsFor;
				var goalsAgainst = htlivesight.League.teams2[i].liveGoalsAgainst;
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_goals_againstBis").textContent = goalsAgainst;
				//var goals = htlivesight.League.teams2[i].liveGoalsFor+"-"+htlivesight.League.teams2[i].liveGoalsAgainst;
				//document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_goalsBis").textContent = goals;
				var diff = htlivesight.League.teams2[i].liveGoalsFor - htlivesight.League.teams2[i].liveGoalsAgainst;
				if(diff >= 0) diff = "+"+diff;
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_goaldifBis").textContent = diff;
				document.getElementById("leaguetable_"+htlivesight.League.teams2[i].livePosition+"_pointsBis").textContent = htlivesight.League.teams2[i].livePoints;
			}
		}
	}catch(e){
		if(htlivesight.League.teams3.length == 0){ // no table available hiding live table
			document.getElementById("winbox_leaguetableBis").setAttribute("style", "display:none");
			noty({type: 'warning', maxVisible: 1, text: "HATTRICK CHPP Data error! Missing info about league table of your second team"});
			if(document.getElementById("league_grid_rowsBis").innerHTML.replace(/\s/g, '').length == 0){
				document.getElementById("winboxcontent_leaguematchesBis").setAttribute("style", "display:none");
				document.getElementById("LeagueMatchesBis").setAttribute("style", "display:none");
				document.getElementById("h3LeagueMatchesBis").setAttribute("style", "display:none");				
			}
		}else{
			alert("UpdateElementBoxLeagueTable2: "+e);
		}// added by bigpapy to debug from XUL to HTML	
	}// added by bigpapy to debug from XUL to HTML
};


htlivesight.DOM.UpdateElementBoxLeagueTable3=function(league) {
	var matchLeagueStarted;
	try{ // added by bigpapy to debug from XUL to HTML
		if (htlivesight.League.currentRound3 == undefined) return;
		if (htlivesight.Time.hattrickTime > htlivesight.League.currentRound3.date) {matchLeagueStarted = true; 
		}
		else {matchLeagueStarted = false;
		}
		for(var matchid in htlivesight.Match.List){
			var myMatch = htlivesight.Match.List[matchid];
			if(htlivesight.Util.isInArray(league.currentRound3.id, myMatch.id)//league.currentRound3.id.has(myMatch.id) 
					&& htlivesight.League.currentRound3.number > htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id]
					&& htlivesight.showLeague3
					&& htlivesight.League.teams3[myMatch.home.team.id]
					&& htlivesight.League.teams3[myMatch.away.team.id]){
				var homeId = myMatch.home.team.id;
				var awayId = myMatch.away.team.id;
				if (matchLeagueStarted){// if match started take the current round leauge
					htlivesight.League.teams3[homeId].liveMatches = htlivesight.League.currentRound3.number;
					htlivesight.League.teams3[awayId].liveMatches = htlivesight.League.currentRound3.number;
				} else {// if not take the last current round league
					htlivesight.League.teams3[homeId].liveMatches = htlivesight.League.currentRound3.number-1;
					htlivesight.League.teams3[awayId].liveMatches = htlivesight.League.currentRound3.number-1;
				};
				// if HTLS works in relive mode and last round is ended and lastRound wasn't removed from table remove it from table.
				if((htlivesight.prefs.other.reLive && (htlivesight.League.currentRound3.number == htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id].matches)) && (!htlivesight.Live.removedLastRoundFromTable3)){
					if(myMatch.home.realGoals > myMatch.away.realGoals){
						htlivesight.League.teams3[homeId].points -=  3;
					}
					else if(myMatch.home.realGoals < myMatch.away.realGoals){
						htlivesight.League.teams3[awayId].points -= 3;
					}
					else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
						htlivesight.League.teams3[homeId].points -= 1;
						htlivesight.League.teams3[awayId].points -= 1;
					}
				};
  //			if((htlivesight.Time.hattrickTime-htlivesight.League.currentRound.date)>6300000){
  		if(htlivesight.League.currentRound3.number == htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id].matches){
				htlivesight.League.teams3[homeId].liveGoalsFor = htlivesight.League.teams3[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				htlivesight.League.teams3[homeId].liveGoalsAgainst = htlivesight.League.teams3[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.League.teams3[awayId].liveGoalsFor = htlivesight.League.teams3[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.League.teams3[awayId].liveGoalsAgainst = htlivesight.League.teams3[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				}else{// if relive start during the match table loaded isn't updated to actual round
					/*start: new part added to fix wrong number of goals*/
					htlivesight.League.teams3[homeId].liveGoalsFor = htlivesight.League.teams3[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
					htlivesight.League.teams3[homeId].liveGoalsAgainst = htlivesight.League.teams3[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
					htlivesight.League.teams3[awayId].liveGoalsFor = htlivesight.League.teams3[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
					htlivesight.League.teams3[awayId].liveGoalsAgainst = htlivesight.League.teams3[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
					/*end: new part added to fix wrong number of goals*/
				}
				if(myMatch.home.goals > myMatch.away.goals){
					htlivesight.League.teams3[homeId].livePoints = htlivesight.League.teams3[homeId].points + 3;
					htlivesight.League.teams3[awayId].livePoints = htlivesight.League.teams3[awayId].points;
				}
				else if(myMatch.home.goals < myMatch.away.goals){
					htlivesight.League.teams3[awayId].livePoints = htlivesight.League.teams3[awayId].points + 3;
					htlivesight.League.teams3[homeId].livePoints = htlivesight.League.teams3[homeId].points;
				}
				else if (matchLeagueStarted){// add one point only if matches are started
					htlivesight.League.teams3[homeId].livePoints = htlivesight.League.teams3[homeId].points + 1;
					htlivesight.League.teams3[awayId].livePoints = htlivesight.League.teams3[awayId].points + 1;
				}
			}
		}
		htlivesight.League.sortTable3();
		for(var id in htlivesight.League.teams3){
			// restoring relive table position to last round and not actual one deleting it and getting position after first call of the function
			if((htlivesight.prefs.other.reLive && (htlivesight.League.currentRound3.number == htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id].matches)) && (!htlivesight.Live.removedLastRoundFromTable3)){
				htlivesight.League.teams3[id].position=htlivesight.League.teams3[id].livePosition;
			};
			// end part of restoring relive table position to last round and not actual one deleting it and getting position after first call of the function.
			if(htlivesight.League.teams3[id].livePosition > htlivesight.League.teams3[id].position) htlivesight.League.teams3[id].change = "down.gif";
			else if(htlivesight.League.teams3[id].livePosition < htlivesight.League.teams3[id].position) htlivesight.League.teams3[id].change = "up.gif" +
			"";
			else htlivesight.League.teams3[id].change = "equal.gif";
		}
		for(var j=1; j<=8; j++){
			htlivesight.Util.RemoveClass(document.getElementById("leaguetable_"+j+"Ter"),['league_title','league_promote','league_demote','league_qualify','league_own']);
		}
		document.getElementById("LeagueLiveTableTer").textContent = htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0])+" ("+league.levelUnitName3+")";
		if(league.level3 == 1){
			//title holder
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1Ter"),'league_title');
		}
		else if(league.level3 <= 6 || league.level3 % 2 == 0){
			//#1 promotes
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1Ter"),'league_promote');			
		}
		else{
			//#1 AND #2 promote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1Ter"),'league_promote');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2Ter"),'league_promote');
		}
		if(league.level3 > 6 && league.level3 % 2 == 0){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2Ter"),'league_promote_qualify');
		}
		if(league.level3 > 6 && league.level3 % 2 == 1){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_3Ter"),'league_promote_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_4Ter"),'league_promote_qualify');
		}
		if(league.level3 != league.maxLevel3){
			//#7 AND #8 demote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_7Ter"),'league_demote');
			$("#leaguetable_8Ter td").addClass('league_demote');
			//htlivesight.Util.AddClass(document.getElementById("leaguetable_8Bis"),'league_demote');
		}
		if(/*league.level2 < 6 &&*/ league.level3 != league.maxLevel3){
			//#5 AND #6 need to qualify
			htlivesight.Util.AddClass(document.getElementById("leaguetable_5Ter"),'league_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_6Ter"),'league_qualify');
		}
		for(var i in htlivesight.League.teams3){
			if(htlivesight.League.teams3[i].livePosition >= 1 && htlivesight.League.teams3[i].livePosition <= 8){
				if(i == htlivesight.Teams.myThirdTeam.id){
					htlivesight.Util.AddClass(document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"Ter"),'league_own');
				}
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_nameTer").textContent = htlivesight.DOM.getTextContent(htlivesight.League.teams3[i].name);
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_changeTer").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.League.teams3[i].change);
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_matchesTer").textContent = htlivesight.League.teams3[i].liveMatches;
				var goalsFor = htlivesight.League.teams3[i].liveGoalsFor;
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_goals_forTer").textContent = goalsFor;
				var goalsAgainst = htlivesight.League.teams3[i].liveGoalsAgainst;
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_goals_againstTer").textContent = goalsAgainst;
				//var goals = htlivesight.League.teams3[i].liveGoalsFor+"-"+htlivesight.League.teams3[i].liveGoalsAgainst;
				//document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_goalsTer").textContent = goals;
				var diff = htlivesight.League.teams3[i].liveGoalsFor - htlivesight.League.teams3[i].liveGoalsAgainst;
				if(diff >= 0) diff = "+"+diff;
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_goaldifTer").textContent = diff;
				document.getElementById("leaguetable_"+htlivesight.League.teams3[i].livePosition+"_pointsTer").textContent = htlivesight.League.teams3[i].livePoints;
			}
		}
	}catch(e){
		if(htlivesight.League.teams3.length == 0){ // no table available hiding live table
			document.getElementById("winbox_leaguetableTer").setAttribute("style", "display:none");
			noty({type: 'warning', maxVisible: 1, text: "HATTRICK CHPP Data error! Missing info about league table of your third team"});
			if(document.getElementById("league_grid_rowsTer").innerHTML.replace(/\s/g, '').length == 0){
				document.getElementById("winboxcontent_leaguematchesTer").setAttribute("style", "display:none");
				document.getElementById("LeagueMatchesTer").setAttribute("style", "display:none");
				document.getElementById("h3LeagueMatchesTer").setAttribute("style", "display:none");				
			}
		}else{
			alert("UpdateElementBoxLeagueTable3: "+e);
		}// added by bigpapy to debug from XUL to HTML			
	}

};


htlivesight.DOM.UpdateElementBoxYouthLeagueTable=function(league) { 
	var matchLeagueStarted;
	try{ // added by bigpapy to debug from XUL to HTML
		if (htlivesight.YouthLeague.currentRound == undefined) return;
		if (htlivesight.Time.hattrickTime > htlivesight.YouthLeague.currentRound.date) {matchLeagueStarted = true; 
		}
		else {matchLeagueStarted = false;
		}
		for(var matchid in htlivesight.Match.List){
			var myMatch = htlivesight.Match.List[matchid];
			if(htlivesight.Util.isInArray(league.currentRound.id, myMatch.id)//league.currentRound.id.has(myMatch.id) 
					&& htlivesight.YouthLeague.currentRound.number > htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId]
					&& htlivesight.showYouthLeague
					&& htlivesight.YouthLeague.teams[myMatch.home.team.id]
					&& htlivesight.YouthLeague.teams[myMatch.away.team.id]){
				var homeId = myMatch.home.team.id;
				var awayId = myMatch.away.team.id;
				if (matchLeagueStarted){// if match started take the current round leauge
					htlivesight.YouthLeague.teams[homeId].liveMatches = htlivesight.YouthLeague.currentRound.number;
					htlivesight.YouthLeague.teams[awayId].liveMatches = htlivesight.YouthLeague.currentRound.number;
				} else {// if not take the last current round league
					htlivesight.YouthLeague.teams[homeId].liveMatches = htlivesight.YouthLeague.currentRound.number-1;
					htlivesight.YouthLeague.teams[awayId].liveMatches = htlivesight.YouthLeague.currentRound.number-1;
				};
				// if HTLS works in relive mode and last round is ended and lastRound wasn't removed from table remove it from table.
				if((htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound.number == htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId].matches)) && (!htlivesight.Live.removedLastRoundFromYouthTable)){
					if(myMatch.home.realGoals > myMatch.away.realGoals){
						htlivesight.YouthLeague.teams[homeId].points -=  3;
					}
					else if(myMatch.home.realGoals < myMatch.away.realGoals){
						htlivesight.YouthLeague.teams[awayId].points -= 3;
					}
					else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
						htlivesight.YouthLeague.teams[homeId].points -= 1;
						htlivesight.YouthLeague.teams[awayId].points -= 1;
					}
				};
  //			if((htlivesight.Time.hattrickTime-htlivesight.League.currentRound.date)>6300000){
  		if(htlivesight.YouthLeague.currentRound.number == htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId].matches){
				htlivesight.YouthLeague.teams[homeId].liveGoalsFor = htlivesight.YouthLeague.teams[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				htlivesight.YouthLeague.teams[homeId].liveGoalsAgainst = htlivesight.YouthLeague.teams[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.YouthLeague.teams[awayId].liveGoalsFor = htlivesight.YouthLeague.teams[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.YouthLeague.teams[awayId].liveGoalsAgainst = htlivesight.YouthLeague.teams[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				}else{// if relive start during the match table loaded isn't updated to actual round
					/*start: new part added to fix wrong number of goals*/
					htlivesight.YouthLeague.teams[homeId].liveGoalsFor = htlivesight.YouthLeague.teams[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
					htlivesight.YouthLeague.teams[homeId].liveGoalsAgainst = htlivesight.YouthLeague.teams[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
					htlivesight.YouthLeague.teams[awayId].liveGoalsFor = htlivesight.YouthLeague.teams[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
					htlivesight.YouthLeague.teams[awayId].liveGoalsAgainst = htlivesight.YouthLeague.teams[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
					/*end: new part added to fix wrong number of goals*/
				}
				if(myMatch.home.goals > myMatch.away.goals){
					htlivesight.YouthLeague.teams[homeId].livePoints = htlivesight.YouthLeague.teams[homeId].points + 3;
					htlivesight.YouthLeague.teams[awayId].livePoints = htlivesight.YouthLeague.teams[awayId].points;
				}
				else if(myMatch.home.goals < myMatch.away.goals){
					htlivesight.YouthLeague.teams[awayId].livePoints = htlivesight.YouthLeague.teams[awayId].points + 3;
					htlivesight.YouthLeague.teams[homeId].livePoints = htlivesight.YouthLeague.teams[homeId].points;
				}
				else if (matchLeagueStarted){// add one point only if matches are started
					htlivesight.YouthLeague.teams[homeId].livePoints = htlivesight.YouthLeague.teams[homeId].points + 1;
					htlivesight.YouthLeague.teams[awayId].livePoints = htlivesight.YouthLeague.teams[awayId].points + 1;
				}
			}
		}
		htlivesight.YouthLeague.sortTable();
		for(var id in htlivesight.YouthLeague.teams){
			// restoring relive table position to last round and not actual one deleting it and getting position after first call of the function
			if((htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound.number == htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId].matches)) && (!htlivesight.Live.removedLastRoundFromYouthTable)){
				htlivesight.YouthLeague.teams[id].position=htlivesight.YouthLeague.teams[id].livePosition;
			};
			// end part of restoring relive table position to last round and not actual one deleting it and getting position after first call of the function.
			if(htlivesight.YouthLeague.teams[id].livePosition > htlivesight.YouthLeague.teams[id].position) htlivesight.YouthLeague.teams[id].change = "down.gif";
			else if(htlivesight.YouthLeague.teams[id].livePosition < htlivesight.YouthLeague.teams[id].position) htlivesight.YouthLeague.teams[id].change = "up.gif" +
			"";
			else htlivesight.YouthLeague.teams[id].change = "equal.gif";
		}
		for(var j=1; j<=16; j++){
			htlivesight.Util.RemoveClass(document.getElementById("youthleaguetable_"+j+""),['league_title','league_promote','league_demote','league_qualify','league_own']);
		}
		document.getElementById("YouthLeagueLiveTable").textContent = htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0])+" ("+league.youthLeagueName+")";
		/*if(league.level == 1){
			//title holder
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_title');
		}
		else if(league.level <= 6 || league.level % 2 == 0){
			//#1 promotes
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
		}
		else{
			//#1 AND #2 promote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote');
		}
		
		if(league.level > 6 && league.level % 2 == 0){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote_qualify');
		}
		if(league.level > 6 && league.level % 2 == 1){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_3"),'league_promote_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_4"),'league_promote_qualify');
		}
		
		if(league.level != league.maxLevel){
			//#7 AND #8 demote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_7"),'league_demote');
			$("#leaguetable_8 td").addClass('league_demote');
			//htlivesight.Util.AddClass(document.getElementById("leaguetable_8"),'league_demote');
		}*/
		//if(/*league.level < 6 &&*/ league.level != league.maxLevel){
			//#5 AND #6 need to qualify
		//	htlivesight.Util.AddClass(document.getElementById("leaguetable_5"),'league_qualify');
		//	htlivesight.Util.AddClass(document.getElementById("leaguetable_6"),'league_qualify');
		//}
		for(var i in htlivesight.YouthLeague.teams){
			if(htlivesight.YouthLeague.teams[i].livePosition >= 1 && htlivesight.YouthLeague.teams[i].livePosition <= 16){
				if(!$("#youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition).is(":visible")){
					$("#youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition).show();
				}
				if(i == htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId){
					htlivesight.Util.AddClass(document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition),'league_own');
				}
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_name").textContent = htlivesight.DOM.getTextContent(htlivesight.YouthLeague.teams[i].name);
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_change").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.YouthLeague.teams[i].change);
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_matches").textContent = htlivesight.YouthLeague.teams[i].liveMatches;
			  var goalsFor = htlivesight.YouthLeague.teams[i].liveGoalsFor;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_goals_for").textContent = goalsFor;
			  var goalsAgainst = htlivesight.YouthLeague.teams[i].liveGoalsAgainst;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_goals_against").textContent = goalsAgainst;
				//var goals = htlivesight.League.teams[i].liveGoalsFor+"-"+htlivesight.League.teams[i].liveGoalsAgainst;
				//document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals").textContent = goals;
				var diff = htlivesight.YouthLeague.teams[i].liveGoalsFor - htlivesight.YouthLeague.teams[i].liveGoalsAgainst;
				if(diff >= 0) diff = "+"+diff;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_goaldif").textContent = diff;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams[i].livePosition+"_points").textContent = htlivesight.YouthLeague.teams[i].livePoints;
			}
		}
	}catch(e){
		document.getElementById("winbox_youthleaguetable").setAttribute("style", "display:none");
		console.log(e)
		}// added by bigpapy to debug from XUL to HTML
};

htlivesight.DOM.UpdateElementBoxYouthLeagueTable2=function(league) { 
	var matchLeagueStarted;
	try{ // added by bigpapy to debug from XUL to HTML
		if (htlivesight.YouthLeague.currentRound2 == undefined) return;
		if (htlivesight.Time.hattrickTime > htlivesight.YouthLeague.currentRound2.date) {matchLeagueStarted = true; 
		}
		else {matchLeagueStarted = false;
		}
		for(var matchid in htlivesight.Match.List){
			var myMatch = htlivesight.Match.List[matchid];
			if(htlivesight.Util.isInArray(league.currentRound2.id, myMatch.id)//league.currentRound.id.has(myMatch.id) 
					&& htlivesight.YouthLeague.currentRound2.number > htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId]
					&& htlivesight.showYouthLeague2
					&& htlivesight.YouthLeague.teams2[myMatch.home.team.id]
					&& htlivesight.YouthLeague.teams2[myMatch.away.team.id]){
				var homeId = myMatch.home.team.id;
				var awayId = myMatch.away.team.id;
				if (matchLeagueStarted){// if match started take the current round leauge
					htlivesight.YouthLeague.teams2[homeId].liveMatches = htlivesight.YouthLeague.currentRound2.number;
					htlivesight.YouthLeague.teams2[awayId].liveMatches = htlivesight.YouthLeague.currentRound2.number;
				} else {// if not take the last current round league
					htlivesight.YouthLeague.teams2[homeId].liveMatches = htlivesight.YouthLeague.currentRound2.number-1;
					htlivesight.YouthLeague.teams2[awayId].liveMatches = htlivesight.YouthLeague.currentRound2.number-1;
				};
				// if HTLS works in relive mode and last round is ended and lastRound wasn't removed from table remove it from table.
				if((htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound2.number == htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId].matches)) && (!htlivesight.Live.removedLastRoundFromYouthTable2)){
					if(myMatch.home.realGoals > myMatch.away.realGoals){
						htlivesight.YouthLeague.teams2[homeId].points -=  3;
					}
					else if(myMatch.home.realGoals < myMatch.away.realGoals){
						htlivesight.YouthLeague.teams2[awayId].points -= 3;
					}
					else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
						htlivesight.YouthLeague.teams2[homeId].points -= 1;
						htlivesight.YouthLeague.teams2[awayId].points -= 1;
					}
				};
  //			if((htlivesight.Time.hattrickTime-htlivesight.League.currentRound.date)>6300000){
  		if(htlivesight.YouthLeague.currentRound2.number == htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId].matches){
				htlivesight.YouthLeague.teams2[homeId].liveGoalsFor = htlivesight.YouthLeague.teams2[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				htlivesight.YouthLeague.teams2[homeId].liveGoalsAgainst = htlivesight.YouthLeague.teams2[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.YouthLeague.teams2[awayId].liveGoalsFor = htlivesight.YouthLeague.teams2[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.YouthLeague.teams2[awayId].liveGoalsAgainst = htlivesight.YouthLeague.teams2[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				}else{// if relive start during the match table loaded isn't updated to actual round
					/*start: new part added to fix wrong number of goals*/
					htlivesight.YouthLeague.teams2[homeId].liveGoalsFor = htlivesight.YouthLeague.teams2[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
					htlivesight.YouthLeague.teams2[homeId].liveGoalsAgainst = htlivesight.YouthLeague.teams2[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
					htlivesight.YouthLeague.teams2[awayId].liveGoalsFor = htlivesight.YouthLeague.teams2[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
					htlivesight.YouthLeague.teams2[awayId].liveGoalsAgainst = htlivesight.YouthLeague.teams2[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
					/*end: new part added to fix wrong number of goals*/
				}
				if(myMatch.home.goals > myMatch.away.goals){
					htlivesight.YouthLeague.teams2[homeId].livePoints = htlivesight.YouthLeague.teams2[homeId].points + 3;
					htlivesight.YouthLeague.teams2[awayId].livePoints = htlivesight.YouthLeague.teams2[awayId].points;
				}
				else if(myMatch.home.goals < myMatch.away.goals){
					htlivesight.YouthLeague.teams2[awayId].livePoints = htlivesight.YouthLeague.teams2[awayId].points + 3;
					htlivesight.YouthLeague.teams2[homeId].livePoints = htlivesight.YouthLeague.teams2[homeId].points;
				}
				else if (matchLeagueStarted){// add one point only if matches are started
					htlivesight.YouthLeague.teams2[homeId].livePoints = htlivesight.YouthLeague.teams2[homeId].points + 1;
					htlivesight.YouthLeague.teams2[awayId].livePoints = htlivesight.YouthLeague.teams2[awayId].points + 1;
				}
			}
		}
		htlivesight.YouthLeague.sortTable2();
		for(var id in htlivesight.YouthLeague.teams2){
			// restoring relive table position to last round and not actual one deleting it and getting position after first call of the function
			if((htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound2.number == htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId].matches)) && (!htlivesight.Live.removedLastRoundFromYouthTable2)){
				htlivesight.YouthLeague.teams2[id].position=htlivesight.YouthLeague.teams2[id].livePosition;
			};
			// end part of restoring relive table position to last round and not actual one deleting it and getting position after first call of the function.
			if(htlivesight.YouthLeague.teams2[id].livePosition > htlivesight.YouthLeague.teams2[id].position) htlivesight.YouthLeague.teams2[id].change = "down.gif";
			else if(htlivesight.YouthLeague.teams2[id].livePosition < htlivesight.YouthLeague.teams2[id].position) htlivesight.YouthLeague.teams2[id].change = "up.gif" +
			"";
			else htlivesight.YouthLeague.teams2[id].change = "equal.gif";
		}
		for(var j=1; j<=16; j++){
			htlivesight.Util.RemoveClass(document.getElementById("youthleaguetable_"+j+"Bis"),['league_title','league_promote','league_demote','league_qualify','league_own']);
		}
		document.getElementById("YouthLeagueLiveTableBis").textContent = htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0])+" ("+league.youthLeagueName2+")";
		/*if(league.level == 1){
			//title holder
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_title');
		}
		else if(league.level <= 6 || league.level % 2 == 0){
			//#1 promotes
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
		}
		else{
			//#1 AND #2 promote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote');
		}
		
		if(league.level > 6 && league.level % 2 == 0){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote_qualify');
		}
		if(league.level > 6 && league.level % 2 == 1){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_3"),'league_promote_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_4"),'league_promote_qualify');
		}
		
		if(league.level != league.maxLevel){
			//#7 AND #8 demote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_7"),'league_demote');
			$("#leaguetable_8 td").addClass('league_demote');
			//htlivesight.Util.AddClass(document.getElementById("leaguetable_8"),'league_demote');
		}*/
		//if(/*league.level < 6 &&*/ league.level != league.maxLevel){
			//#5 AND #6 need to qualify
		//	htlivesight.Util.AddClass(document.getElementById("leaguetable_5"),'league_qualify');
		//	htlivesight.Util.AddClass(document.getElementById("leaguetable_6"),'league_qualify');
		//}
		for(var i in htlivesight.YouthLeague.teams2){
			if(htlivesight.YouthLeague.teams2[i].livePosition >= 1 && htlivesight.YouthLeague.teams2[i].livePosition <= 16){
				if(!$("#youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"Bis").is(":visible")){
					$("#youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"Bis").show();
				}
				if(i == htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId){
					htlivesight.Util.AddClass(document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"Bis"),'league_own');
				}
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_nameBis").textContent = htlivesight.DOM.getTextContent(htlivesight.YouthLeague.teams2[i].name);
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_changeBis").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.YouthLeague.teams2[i].change);
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_matchesBis").textContent = htlivesight.YouthLeague.teams2[i].liveMatches;
			  var goalsFor = htlivesight.YouthLeague.teams2[i].liveGoalsFor;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_goals_forBis").textContent = goalsFor;
			  var goalsAgainst = htlivesight.YouthLeague.teams2[i].liveGoalsAgainst;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_goals_againstBis").textContent = goalsAgainst;
				//var goals = htlivesight.League.teams[i].liveGoalsFor+"-"+htlivesight.League.teams[i].liveGoalsAgainst;
				//document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals").textContent = goals;
				var diff = htlivesight.YouthLeague.teams2[i].liveGoalsFor - htlivesight.YouthLeague.teams2[i].liveGoalsAgainst;
				if(diff >= 0) diff = "+"+diff;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_goaldifBis").textContent = diff;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams2[i].livePosition+"_pointsBis").textContent = htlivesight.YouthLeague.teams2[i].livePoints;
			}
		}
	}catch(e){document.getElementById("winbox_youthLeaguetableBis").setAttribute("style", "display:none");
		console.log(e);
	}// added by bigpapy to debug from XUL to HTML
};


htlivesight.DOM.UpdateElementBoxYouthLeagueTable3=function(league) { 
	var matchLeagueStarted;
	try{ // added by bigpapy to debug from XUL to HTML
		if (htlivesight.YouthLeague.currentRound3 == undefined) return;
		if (htlivesight.Time.hattrickTime > htlivesight.YouthLeague.currentRound3.date) {matchLeagueStarted = true; 
		}
		else {matchLeagueStarted = false;
		}
		for(var matchid in htlivesight.Match.List){
			var myMatch = htlivesight.Match.List[matchid];
			if(htlivesight.Util.isInArray(league.currentRound3.id, myMatch.id)//league.currentRound.id.has(myMatch.id) 
					&& htlivesight.YouthLeague.currentRound3.number > htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId]
					&& htlivesight.showYouthLeague3
					&& htlivesight.YouthLeague.teams3[myMatch.home.team.id]
					&& htlivesight.YouthLeague.teams3[myMatch.away.team.id]){
				var homeId = myMatch.home.team.id;
				var awayId = myMatch.away.team.id;
				if (matchLeagueStarted){// if match started take the current round leauge
					htlivesight.YouthLeague.teams3[homeId].liveMatches = htlivesight.YouthLeague.currentRound3.number;
					htlivesight.YouthLeague.teams3[awayId].liveMatches = htlivesight.YouthLeague.currentRound3.number;
				} else {// if not take the last current round league
					htlivesight.YouthLeague.teams3[homeId].liveMatches = htlivesight.YouthLeague.currentRound3.number-1;
					htlivesight.YouthLeague.teams3[awayId].liveMatches = htlivesight.YouthLeague.currentRound3.number-1;
				};
				// if HTLS works in relive mode and last round is ended and lastRound wasn't removed from table remove it from table.
				if((htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound3.number == htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId].matches)) && (!htlivesight.Live.removedLastRoundFromYouthTable3)){
					if(myMatch.home.realGoals > myMatch.away.realGoals){
						htlivesight.YouthLeague.teams3[homeId].points -=  3;
					}
					else if(myMatch.home.realGoals < myMatch.away.realGoals){
						htlivesight.YouthLeague.teams3[awayId].points -= 3;
					}
					else if (myMatch.home.realGoals == myMatch.away.realGoals){// add one point only if matches are started
						htlivesight.YouthLeague.teams3[homeId].points -= 1;
						htlivesight.YouthLeague.teams3[awayId].points -= 1;
					}
				};
  //			if((htlivesight.Time.hattrickTime-htlivesight.League.currentRound.date)>6300000){
  		if(htlivesight.YouthLeague.currentRound3.number == htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId].matches){
				htlivesight.YouthLeague.teams3[homeId].liveGoalsFor = htlivesight.YouthLeague.teams3[homeId].goalsFor + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				htlivesight.YouthLeague.teams3[homeId].liveGoalsAgainst = htlivesight.YouthLeague.teams3[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.YouthLeague.teams3[awayId].liveGoalsFor = htlivesight.YouthLeague.teams3[awayId].goalsFor + parseInt(myMatch.away.goals, 10)- parseInt(myMatch.away.realGoals, 10);
				htlivesight.YouthLeague.teams3[awayId].liveGoalsAgainst = htlivesight.YouthLeague.teams3[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10)- parseInt(myMatch.home.realGoals, 10);
				}else{// if relive start during the match table loaded isn't updated to actual round
					/*start: new part added to fix wrong number of goals*/
					htlivesight.YouthLeague.teams3[homeId].liveGoalsFor = htlivesight.YouthLeague.teams3[homeId].goalsFor + parseInt(myMatch.home.goals, 10);
					htlivesight.YouthLeague.teams3[homeId].liveGoalsAgainst = htlivesight.YouthLeague.teams3[homeId].goalsAgainst + parseInt(myMatch.away.goals, 10);
					htlivesight.YouthLeague.teams3[awayId].liveGoalsFor = htlivesight.YouthLeague.teams3[awayId].goalsFor + parseInt(myMatch.away.goals, 10);
					htlivesight.YouthLeague.teams3[awayId].liveGoalsAgainst = htlivesight.YouthLeague.teams3[awayId].goalsAgainst + parseInt(myMatch.home.goals, 10);
					/*end: new part added to fix wrong number of goals*/
				}
				if(myMatch.home.goals > myMatch.away.goals){
					htlivesight.YouthLeague.teams3[homeId].livePoints = htlivesight.YouthLeague.teams3[homeId].points + 3;
					htlivesight.YouthLeague.teams3[awayId].livePoints = htlivesight.YouthLeague.teams3[awayId].points;
				}
				else if(myMatch.home.goals < myMatch.away.goals){
					htlivesight.YouthLeague.teams3[awayId].livePoints = htlivesight.YouthLeague.teams3[awayId].points + 3;
					htlivesight.YouthLeague.teams3[homeId].livePoints = htlivesight.YouthLeague.teams3[homeId].points;
				}
				else if (matchLeagueStarted){// add one point only if matches are started
					htlivesight.YouthLeague.teams3[homeId].livePoints = htlivesight.YouthLeague.teams3[homeId].points + 1;
					htlivesight.YouthLeague.teams3[awayId].livePoints = htlivesight.YouthLeague.teams3[awayId].points + 1;
				}
			}
		}
		htlivesight.YouthLeague.sortTable3();
		for(var id in htlivesight.YouthLeague.teams3){
			// restoring relive table position to last round and not actual one deleting it and getting position after first call of the function
			if((htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound3.number == htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId].matches)) && (!htlivesight.Live.removedLastRoundFromYouthTable3)){
				htlivesight.YouthLeague.teams3[id].position=htlivesight.YouthLeague.teams3[id].livePosition;
			};
			// end part of restoring relive table position to last round and not actual one deleting it and getting position after first call of the function.
			if(htlivesight.YouthLeague.teams3[id].livePosition > htlivesight.YouthLeague.teams3[id].position) htlivesight.YouthLeague.teams3[id].change = "down.gif";
			else if(htlivesight.YouthLeague.teams3[id].livePosition < htlivesight.YouthLeague.teams3[id].position) htlivesight.YouthLeague.teams3[id].change = "up.gif" +
			"";
			else htlivesight.YouthLeague.teams3[id].change = "equal.gif";
		}
		for(var j=1; j<=16; j++){
			htlivesight.Util.RemoveClass(document.getElementById("youthleaguetable_"+j+"Ter"),['league_title','league_promote','league_demote','league_qualify','league_own']);
		}
		document.getElementById("YouthLeagueLiveTableTer").textContent = htlivesight.Util.Parse("LeagueLiveTable",htlivesight.data[0])+" ("+league.youthLeagueName3+")";
		/*if(league.level == 1){
			//title holder
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_title');
		}
		else if(league.level <= 6 || league.level % 2 == 0){
			//#1 promotes
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
		}
		else{
			//#1 AND #2 promote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_1"),'league_promote');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote');
		}
		
		if(league.level > 6 && league.level % 2 == 0){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_2"),'league_promote_qualify');
		}
		if(league.level > 6 && league.level % 2 == 1){
			htlivesight.Util.AddClass(document.getElementById("leaguetable_3"),'league_promote_qualify');
			htlivesight.Util.AddClass(document.getElementById("leaguetable_4"),'league_promote_qualify');
		}
		
		if(league.level != league.maxLevel){
			//#7 AND #8 demote
			htlivesight.Util.AddClass(document.getElementById("leaguetable_7"),'league_demote');
			$("#leaguetable_8 td").addClass('league_demote');
			//htlivesight.Util.AddClass(document.getElementById("leaguetable_8"),'league_demote');
		}*/
		//if(/*league.level < 6 &&*/ league.level != league.maxLevel){
			//#5 AND #6 need to qualify
		//	htlivesight.Util.AddClass(document.getElementById("leaguetable_5"),'league_qualify');
		//	htlivesight.Util.AddClass(document.getElementById("leaguetable_6"),'league_qualify');
		//}
		for(var i in htlivesight.YouthLeague.teams3){
			if(htlivesight.YouthLeague.teams3[i].livePosition >= 1 && htlivesight.YouthLeague.teams3[i].livePosition <= 16){
				if(!$("#youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"Ter").is(":visible")){
					$("#youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"Ter").show();
				}
				if(i == htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId){
					htlivesight.Util.AddClass(document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"Ter"),'league_own');
				}
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_nameTer").textContent = htlivesight.DOM.getTextContent(htlivesight.YouthLeague.teams3[i].name);
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_changeTer").setAttribute("src",htlivesight.constants.IMG_PATH + htlivesight.YouthLeague.teams3[i].change);
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_matchesTer").textContent = htlivesight.YouthLeague.teams3[i].liveMatches;
			  var goalsFor = htlivesight.YouthLeague.teams3[i].liveGoalsFor;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_goals_forTer").textContent = goalsFor;
			  var goalsAgainst = htlivesight.YouthLeague.teams3[i].liveGoalsAgainst;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_goals_againstTer").textContent = goalsAgainst;
				//var goals = htlivesight.League.teams[i].liveGoalsFor+"-"+htlivesight.League.teams[i].liveGoalsAgainst;
				//document.getElementById("leaguetable_"+htlivesight.League.teams[i].livePosition+"_goals").textContent = goals;
				var diff = htlivesight.YouthLeague.teams3[i].liveGoalsFor - htlivesight.YouthLeague.teams3[i].liveGoalsAgainst;
				if(diff >= 0) diff = "+"+diff;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_goaldifTer").textContent = diff;
				document.getElementById("youthleaguetable_"+htlivesight.YouthLeague.teams3[i].livePosition+"_pointsTer").textContent = htlivesight.YouthLeague.teams3[i].livePoints;
			}
		}
	}catch(e){document.getElementById("winbox_youthLeaguetableTer").setAttribute("style", "display:none");
		console.log(e);
	}// added by bigpapy to debug from XUL to HTML
};



//End
htlivesight.DOM.UpdateElementBoxLeague=function(league) {
	try{ // added by bigpapy to debug from xul to html
		if (league.currentRound == undefined) return;
		document.getElementById("winbox_leaguematches").style.display="block";
		var number = htlivesight.Util.Parse("LeagueRound",htlivesight.data[0]) + " " + league.currentRound.number;
		var date = htlivesight.Time.formatDate(league.currentRound.date);
		document.getElementById("league_round_number").textContent = number;
		document.getElementById("league_round_date").textContent = htlivesight.Time.shortDateString(date);
	}catch(e){alert("UpdateElementBoxLeague : "+e);} // added by bigpapy to debug from xul to html
};


htlivesight.DOM.UpdateElementBoxLeague2=function(league) {
	try{ // added by bigpapy to debug from xul to html
		if (league.currentRound2 == undefined) return;
		document.getElementById("winbox_leaguematchesBis").style.display="block";
		var number = htlivesight.Util.Parse("LeagueRound",htlivesight.data[0]) + " " + league.currentRound2.number;
		var date = htlivesight.Time.formatDate(league.currentRound2.date);
		document.getElementById("league_round_numberBis").textContent = number;
		document.getElementById("league_round_dateBis").textContent = htlivesight.Time.shortDateString(date);
	}catch(e){alert("UpdateElementBoxLeague2 : "+e);} // added by bigpapy to debug from xul to html
};

htlivesight.DOM.UpdateElementBoxLeague3=function(league) {
	try{ // added by bigpapy to debug from xul to html
		if (league.currentRound3 == undefined) return;
		document.getElementById("winbox_leaguematchesTer").style.display="block";
		var number = htlivesight.Util.Parse("LeagueRound",htlivesight.data[0]) + " " + league.currentRound3.number;
		var date = htlivesight.Time.formatDate(league.currentRound3.date);
		document.getElementById("league_round_numberTer").textContent = number;
		document.getElementById("league_round_dateTer").textContent = htlivesight.Time.shortDateString(date);
	}catch(e){alert("UpdateElementBoxLeague3 : "+e);} // added by bigpapy to debug from xul to html
};

htlivesight.DOM.UpdateElementBoxYouthLeague=function(league) {
	try{ // added by bigpapy to debug from xul to html
		if (league.currentRound == undefined) return;
		document.getElementById("winbox_youthleaguematches").style.display="block";
		var number = htlivesight.Util.Parse("LeagueRound",htlivesight.data[0]) + " " + league.currentRound.number;
		var date = htlivesight.Time.formatDate(league.currentRound.date);
		document.getElementById("youthleague_round_number").textContent = number;
		document.getElementById("youthleague_round_date").textContent = htlivesight.Time.shortDateString(date);
	}catch(e){alert("UpdateElementBoxYouthLeague : "+e);} // added by bigpapy to debug from xul to html
};

htlivesight.DOM.UpdateElementBoxYouthLeague2=function(league) {
	try{ // added by bigpapy to debug from xul to html
		if (league.currentRound2 == undefined) return;
		document.getElementById("winbox_youthleaguematchesBis").style.display="block";
		var number = htlivesight.Util.Parse("LeagueRound",htlivesight.data[0]) + " " + league.currentRound2.number;
		var date = htlivesight.Time.formatDate(league.currentRound2.date);
		document.getElementById("youthleague_round_numberBis").textContent = number;
		document.getElementById("youthleague_round_dateBis").textContent = htlivesight.Time.shortDateString(date);
	}catch(e){console.log(e);alert("UpdateElementBoxYouthLeague2 : "+e);} // added by bigpapy to debug from xul to html
};

htlivesight.DOM.UpdateElementBoxYouthLeague3=function(league) {
	try{ // added by bigpapy to debug from xul to html
		if (league.currentRound3 == undefined) return;
		document.getElementById("winbox_youthleaguematchesTer").style.display="block";
		var number = htlivesight.Util.Parse("LeagueRound",htlivesight.data[0]) + " " + league.currentRound3.number;
		var date = htlivesight.Time.formatDate(league.currentRound3.date);
		document.getElementById("youthleague_round_numberTer").textContent = number;
		document.getElementById("youthleague_round_dateTer").textContent = htlivesight.Time.shortDateString(date);
	}catch(e){console.log(e);alert("UpdateElementBoxYouthLeague3 : "+e);} // added by bigpapy to debug from xul to html
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
		var elem, label;
		elem = document.getElementById("short_" + match.id + "_" + match.sourceSystem);
		if (!elem) { 
			elem = htlivesight.DOM.CreateElementRowShortGame(match);
			if ((htlivesight.League.currentRound!= undefined)&&(htlivesight.Util.isInArray(htlivesight.League.currentRound.id, match.id)/*htlivesight.League.currentRound.id.has(match.id)*/ && htlivesight.showLeague)) {
				if (match.getTeamById(htlivesight.Teams.myTeam.id)) {
					htlivesight.Util.AddClass(elem,"myLeagueMatch");
				}
				document.getElementById("league_grid_rows").appendChild(elem);
			} else if ((htlivesight.League.currentRound2!= undefined)&&(htlivesight.Util.isInArray(htlivesight.League.currentRound2.id, match.id)/*htlivesight.League.currentRound2.id.has(match.id)*/ && htlivesight.showLeague2)) {
				if (!(typeof htlivesight.Teams.mySecondTeam === "undefined") && match.getTeamById(htlivesight.Teams.mySecondTeam.id)) {
					htlivesight.Util.AddClass(elem,"mySecondLeagueMatch");
				}
				document.getElementById("league_grid_rowsBis").appendChild(elem);
			} else if ((htlivesight.League.currentRound3!= undefined)&&(htlivesight.Util.isInArray(htlivesight.League.currentRound3.id, match.id)/*htlivesight.League.currentRound2.id.has(match.id)*/ && htlivesight.showLeague3)) {
				if (!(typeof htlivesight.Teams.myThirdTeam === "undefined") && match.getTeamById(htlivesight.Teams.myThirdTeam.id)) {
					htlivesight.Util.AddClass(elem,"myThirdLeagueMatch");
				}
				document.getElementById("league_grid_rowsTer").appendChild(elem);
			} else if ((htlivesight.YouthLeague.currentRound!= undefined)&&(htlivesight.Util.isInArray(htlivesight.YouthLeague.currentRound.id, match.id)/*htlivesight.League.currentRound2.id.has(match.id)*/ && htlivesight.showYouthLeague)) {
				if (!(typeof (htlivesight.ManagerCompendium.data.youthTeams[0] === "undefined") && match.getTeamById(htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId))) {
					htlivesight.Util.AddClass(elem,"myYouthLeagueMatch");
				}
				document.getElementById("youthleague_grid_rows").appendChild(elem);
			} else if ((htlivesight.YouthLeague.currentRound2!= undefined)&&(htlivesight.Util.isInArray(htlivesight.YouthLeague.currentRound2.id, match.id)/*htlivesight.League.currentRound2.id.has(match.id)*/ && htlivesight.showYouthLeague2)) {
			if (!(typeof (htlivesight.ManagerCompendium.data.youthTeams[1] === "undefined") && match.getTeamById(htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId))) {
				htlivesight.Util.AddClass(elem,"mySecondYouthLeagueMatch");
			}
			document.getElementById("youthleague_grid_rowsBis").appendChild(elem);
			} else if ((htlivesight.YouthLeague.currentRound3!= undefined)&&(htlivesight.Util.isInArray(htlivesight.YouthLeague.currentRound3.id, match.id)/*htlivesight.League.currentRound2.id.has(match.id)*/ && htlivesight.showYouthLeague3)) {
				if (!(typeof (htlivesight.ManagerCompendium.data.youthTeams[2] === "undefined") && match.getTeamById(htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId))) {
					htlivesight.Util.AddClass(elem,"myThirdYouthLeagueMatch");
				}
				document.getElementById("youthleague_grid_rowsTer").appendChild(elem);
				}	else {
				//console.log('not in youthLeague3: htlivesight.YouthLeague.currentRound3 = ' + htlivesight.YouthLeague.currentRound3 + ' htlivesight.Util.isInArray(' + htlivesight.YouthLeague.currentRound3.id + ', '+ match.id +') = ' + htlivesight.Util.isInArray(htlivesight.YouthLeague.currentRound3.id, match.id) + ' htlivesight.showYouthLeague3 = ' + htlivesight.showYouthLeague3);
				document.getElementById("other_grid_rows").appendChild(elem);
			}

		} else {

		}

		if(htlivesight.Util.HasClass(elem,"myLeagueMatch")) {
			document.getElementById("league_round_time").textContent = match.timeElapsed;
			if((htlivesight.League.currentRound!= undefined && htlivesight.League.teams[htlivesight.Teams.myTeam.id] != undefined)&&(htlivesight.League.currentRound.number > htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches)){
				htlivesight.DOM.UpdateElementBoxLeagueTable(htlivesight.League);
			}
			if(htlivesight.prefs.other.reLive && (htlivesight.League.currentRound!= undefined && htlivesight.League.teams[htlivesight.Teams.myTeam.id] != undefined) && (htlivesight.League.currentRound.number == htlivesight.League.teams[htlivesight.Teams.myTeam.id].matches)){
				htlivesight.DOM.UpdateElementBoxLeagueTable(htlivesight.League);
				if(!htlivesight.Live.removedLastRoundFromTable)  htlivesight.Live.removedLastRoundFromTable=true;
			}
		}
		
		if(htlivesight.Util.HasClass(elem,"mySecondLeagueMatch")) {
			document.getElementById("league_round_timeBis").textContent = match.timeElapsed;
			if((htlivesight.League.currentRound2!= undefined && htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id] != undefined)&&(htlivesight.League.currentRound2.number > htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id].matches)){
				htlivesight.DOM.UpdateElementBoxLeagueTable2(htlivesight.League);
			}
			if(htlivesight.prefs.other.reLive && (htlivesight.League.currentRound2!= undefined && htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id] != undefined) &&(htlivesight.League.currentRound2.number == htlivesight.League.teams2[htlivesight.Teams.mySecondTeam.id].matches)){
				htlivesight.DOM.UpdateElementBoxLeagueTable2(htlivesight.League);
				if(!htlivesight.Live.removedLastRoundFromTable2)  htlivesight.Live.removedLastRoundFromTable2=true;
			}
		}
		
		if(htlivesight.Util.HasClass(elem,"myThirdLeagueMatch")) {
			document.getElementById("league_round_timeTer").textContent = match.timeElapsed;

			if((htlivesight.League.currentRound3!= undefined && htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id] != undefined)&&(htlivesight.League.currentRound3.number > htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id].matches)){
				htlivesight.DOM.UpdateElementBoxLeagueTable3(htlivesight.League);
			}
			if(htlivesight.prefs.other.reLive && (htlivesight.League.currentRound3!= undefined && htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id] != undefined) && (htlivesight.League.currentRound3.number == htlivesight.League.teams3[htlivesight.Teams.myThirdTeam.id].matches)){
				htlivesight.DOM.UpdateElementBoxLeagueTable3(htlivesight.League);
				if(!htlivesight.Live.removedLastRoundFromTable3)  htlivesight.Live.removedLastRoundFromTable3=true;
			}
		}
		
		if(htlivesight.Util.HasClass(elem,"myYouthLeagueMatch")) { 
			document.getElementById("youthleague_round_time").textContent = match.timeElapsed;
			if((htlivesight.YouthLeague.currentRound!= undefined && htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId] != undefined)&&(htlivesight.YouthLeague.currentRound.number > htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId].matches)){
				htlivesight.DOM.UpdateElementBoxYouthLeagueTable(htlivesight.YouthLeague);
			}
			if(htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound!= undefined && htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId] != undefined) &&(htlivesight.YouthLeague.currentRound.number == htlivesight.YouthLeague.teams[htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId].matches)){
				htlivesight.DOM.UpdateElementBoxYouthLeagueTable(htlivesight.YouthLeague);
				if(!htlivesight.Live.removedLastRoundFromYouthTable)  htlivesight.Live.removedLastRoundFromYouthTable=true;
			}
		}
		
		if(htlivesight.Util.HasClass(elem,"mySecondYouthLeagueMatch")) { 
		document.getElementById("youthleague_round_timeBis").textContent = match.timeElapsed;
		if((htlivesight.YouthLeague.currentRound2!= undefined && htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId] != undefined)&&(htlivesight.YouthLeague.currentRound2.number > htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId].matches)){
			htlivesight.DOM.UpdateElementBoxYouthLeagueTable2(htlivesight.YouthLeague);
		}
		if(htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound2!= undefined && htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId] != undefined) &&(htlivesight.YouthLeague.currentRound2.number == htlivesight.YouthLeague.teams2[htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId].matches)){
			htlivesight.DOM.UpdateElementBoxYouthLeagueTable2(htlivesight.YouthLeague);
			if(!htlivesight.Live.removedLastRoundFromYouthTable2)  htlivesight.Live.removedLastRoundFromYouthTable2=true;
		}
	}
		
		
		if(htlivesight.Util.HasClass(elem,"myThirdYouthLeagueMatch")) { 
			document.getElementById("youthleague_round_timeTer").textContent = match.timeElapsed;
			if((htlivesight.YouthLeague.currentRound3!= undefined  && htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId] != undefined)&&(htlivesight.YouthLeague.currentRound3.number > htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId].matches)){
				htlivesight.DOM.UpdateElementBoxYouthLeagueTable3(htlivesight.YouthLeague);
			}
			if(htlivesight.prefs.other.reLive && (htlivesight.YouthLeague.currentRound3!= undefined  && htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId] != undefined) && (htlivesight.YouthLeague.currentRound3.number == htlivesight.YouthLeague.teams3[htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId].matches)){
				htlivesight.DOM.UpdateElementBoxYouthLeagueTable3(htlivesight.YouthLeague);
				if(!htlivesight.Live.removedLastRoundFromYouthTable3)  htlivesight.Live.removedLastRoundFromYouthTable3=true;
			}
		}
		
		
		var teamName=document.getElementById("short_home_name_" + match.id + "_" + match.sourceSystem);
		teamName.textContent = htlivesight.DOM.getTextContent(match.home.team.name);
		if(htlivesight.Friends.isFriend(match.home.team.id,match.sourceSystem)){
			if(htlivesight.Teams.mySecondTeam &&(match.home.team.id == htlivesight.Teams.mySecondTeam.id)) htlivesight.Util.AddClass(teamName,'short_own'); 
			else
				htlivesight.Util.AddClass(teamName,'short_friend');
			teamName.setAttribute("title","");
		}else{
			htlivesight.Util.RemoveClass(teamName,['short_own','short_friend']);//reset styling
			teamName.setAttribute("title", htlivesight.Util.Parse("addFriend",htlivesight.data[0]));
			teamName.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.home.team.id,match.sourceSystem);},false);
		}
		document.getElementById("short_home_goals_" + match.id + "_" + match.sourceSystem).textContent = match.home.goals;
		document.getElementById("separator_" + match.id + "_" + match.sourceSystem).textContent = ":";
		document.getElementById("short_away_goals_" + match.id + "_" + match.sourceSystem).textContent = match.away.goals;
		teamName=document.getElementById("short_away_name_" + match.id + "_" + match.sourceSystem);
		teamName.textContent = htlivesight.DOM.getTextContent(match.away.team.name);
		if(htlivesight.Friends.isFriend(match.away.team.id,match.sourceSystem)){
			if(htlivesight.Teams.mySecondTeam && match.away.team.id == htlivesight.Teams.mySecondTeam.id) htlivesight.Util.AddClass(teamName,'short_own'); 
			else
				htlivesight.Util.AddClass(teamName,'short_friend');
			teamName.setAttribute("title","");
		}else{
			htlivesight.Util.RemoveClass(teamName,['short_own','short_friend']);//reset styling
			teamName.setAttribute("title", htlivesight.Util.Parse("addFriend",htlivesight.data[0]));
			teamName.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.away.team.id,match.sourceSystem);},false);
		}
	} catch(e) {
		console.log("UpdateShortBox(): " + e);console.log(e);
		alert("UpdateShortBox(): " + e); //added by bigpapy to debug from XUL to HTML
		
	}
};

htlivesight.DOM.CreateElementRowShortGame=function(match) {
	var row, cell, /*vbox,*/ image;
	try{ //added by bigpapy to debug from XUL to HTML
		row = document.createElement("tr");
		row.setAttribute("id", "short_" + match.id + "_" + match.sourceSystem);
		row.setAttribute("class", "match_row");
		
		// add match type image place start
		cell = document.createElement("td");
		image = document.createElement("img");
		image.setAttribute("id", "short_match_type_image_" + match.id + "_" + match.sourceSystem);
		image.setAttribute("src", htlivesight.Image.transparent);
		image.setAttribute("style", "cursor:pointer");
		image.setAttribute("title",htlivesight.Util.Parse("TooltipWindowLink",htlivesight.data[0]));
		image.addEventListener('click',  htlivesight.Click.link, true);
		cell.appendChild(image);
		row.appendChild(cell);
		
		
		cell = document.createElement("td");
		cell.setAttribute("id", "short_home_name_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "hometeam_league");
		htlivesight.Util.RemoveClass(cell,['short_own','short_friend']);//reset styling
		if(htlivesight.Friends.isFriend(match.home.team.id,match.sourceSystem)){
			if(match.home.team.id == htlivesight.Teams.myTeam.id || (htlivesight.Teams.mySecondTeam && match.home.team.id == htlivesight.Teams.mySecondTeam.id) || (htlivesight.Teams.myThirdTeam && match.home.team.id == htlivesight.Teams.myThirdTeam.id)) htlivesight.Util.AddClass(cell,'short_own'); 
			else
				htlivesight.Util.AddClass(cell,'short_friend');
		}else{
			cell.setAttribute("title","click on the team to add to friends list");
			cell.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.home.team.id,match.sourceSystem);},false); 
		}
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("id", "short_home_goals_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "homescore_league");
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("id", "separator_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "separator_league");
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("id", "short_away_goals_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "awayscore_league");
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("id", "short_away_name_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "awayteam_league");
		htlivesight.Util.RemoveClass(cell,['short_own','short_friend']);//reset styling
		if(htlivesight.Friends.isFriend(match.away.team.id,match.sourceSystem)){
			if(match.away.team.id == htlivesight.Teams.myTeam.id || (htlivesight.Teams.mySecondTeam && match.away.team.id == htlivesight.Teams.mySecondTeam.id) || (htlivesight.Teams.myThirdTeam && match.away.team.id == htlivesight.Teams.myThirdTeam.id)) htlivesight.Util.AddClass(cell,'short_own'); 
			else
				htlivesight.Util.AddClass(cell,'short_friend');
		}else{
			cell.setAttribute("title","click on the team to add to friends list");
			cell.addEventListener("click", function(){htlivesight.Click.addTeamToFriendsList(match.away.team.id,match.sourceSystem);},false);  
		}
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("id", "imageadd_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "add_league");
		image = document.createElement("img");
		image.setAttribute("id", "short_liveimage_" + match.id + "_" + match.sourceSystem);
		image.setAttribute("src", htlivesight.Image.live.OFF);
		image.setAttribute("match_id", match.id + "_" + match.sourceSystem);
		image.addEventListener('click',  htlivesight.Click.ToggleMatch, true);
		cell.appendChild(image);
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.setAttribute("id", "imagedel_" + match.id + "_" + match.sourceSystem);
		cell.setAttribute("class", "remove_league");
		image = document.createElement("img");
		image.setAttribute("id", "short_liveclose_" + match.id + "_" + match.sourceSystem);
		image.setAttribute("src", htlivesight.Image.shortBox.CLOSE);
		image.setAttribute("match_id", match.id + "_" + match.sourceSystem);
		image.addEventListener('click',  htlivesight.Click.DeleteMatch, true);
		cell.appendChild(image);
		row.appendChild(cell);
		return row;
	}catch(e){alert("htlivesight.DOM.CreateElementRowShortGame: "+e);}//added by bigpapy to debug from XUL to HTML
};
htlivesight.DOM.ShowLink=function(element) {
	element.setAttribute("style", "text-decoration:underline;");
},
htlivesight.DOM.HideLink=function(element) {
	element.setAttribute("style", "text-decoration:none");
};
htlivesight.DOM.closeMatchRelatedWindows=function(id){
	if ($("#home_team_formation_"+id+"_table").dialog("instance")  && $("#home_team_formation_"+id+"_table").dialog("isOpen")){
		$("#home_team_formation_"+id+"_table").dialog("close");
	};
	if ($("#away_team_formation_"+id+"_table").dialog("instance") && $("#away_team_formation_"+id+"_table").dialog("isOpen")){
	  $("#away_team_formation_"+id+"_table").dialog("close");
	};
	if ($("#home_team_name_"+id+"_statistics").dialog("instance") && $("#home_team_name_"+id+"_statistics").dialog("isOpen")){
	  $("#home_team_name_"+id+"_statistics").dialog("close");
	};
	if ($("#away_team_name_"+id+"_statistics").dialog("instance") && $("#away_team_name_"+id+"_statistics").dialog("isOpen")){
  $("#away_team_name_"+id+"_statistics").dialog("close");
	};
};
htlivesight.DOM.setHeaderColor=function(){
  if (document.getElementById("headerBarColorCheck").checked){
	  $('.ui-accordion-header').css('background-image','none');
	  $('.ui-accordion-header, #label_headerBarColorCode, #label_headerBarTextColorCode').css('background-color','#'+htlivesight.prefs.colors.headerBarColorCode);
  }
  if (document.getElementById("headerBarTextColorCheck").checked){
	  //$('.ui-accordion-header').css('background-image','none');
	  $('.ui-accordion-header, .ui-accordion-header span, .ui-accordion-header a , #label_headerBarColorCode, #label_headerBarTextColorCode').css('color','#'+htlivesight.prefs.colors.headerBarTextColorCode);
  }
};
//TODO: Move it to a Logo files or Image, this file is too big!
htlivesight.DOM.addTeamLogo=function(){
	// getting logo URI
	try{
		for (teamIndex in htlivesight.Teams.list){
			var teamId = teamIndex.split("_");
			var teamIdNumber = parseInt(teamId[1]);

			if(htlivesight.Teams.list[teamIndex].logoURL === undefined){
				if(teamId[2] == 'True'){htlivesight.Teams.list[teamIndex].logoURL = htlivesight.Image.window.link.ON;} 
				if(teamIdNumber >= 3000 && teamIdNumber <= 3261){
					htlivesight.Teams.list[teamIndex].logoURL = htlivesight.Image.getFlagPathFromTeamId(teamId[1]);
				}else{
					htlivesight.Team.HTTPGetMyData(teamId[1], null);	
				}

			}else{
				var url = htlivesight.Teams.list[teamIndex].logoURL;
				if(!htlivesight.Teams.list[teamIndex].logoURL.startsWith("http") && !htlivesight.Teams.list[teamIndex].logoURL.includes("/content/img/")){
					url = "http:" + url;
				}
				$(".headerteamlogo"+teamIndex).attr('src', url);
			}
		}
	}catch(e){console.log("looping teams list error:"+e);}	
}
// next line to be removed!
/*htlivesight.DOM.OtherShortBox = function(){
	var otherMatchList = $("#other_grid_rows > tr");
	$("#other_grid_rows > tr").each(function( index ) {
		//console.log( index + ": " + $( this ).text() );
		var match = htlivesight.Match.List[$(this).attr('id').replace("short","")];
		$(this).remove();
		htlivesight.DOM.UpdateShortBox(match);
		});
}*/
