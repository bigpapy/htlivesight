/** * click.js: contains functions regarding clicks on htlivesight.html elements. */ htlivesight.Click = {/*		Test: function (event) {			try {				var url = Components.classes["@mozilla.org/network/standard-url;1"].createInstance();				url = url.QueryInterface(Components.interfaces.nsIURL);				url.spec = htlivesightEnv.contentPath+"sound/wav.wav";				var sample = Components.classes["@mozilla.org/sound;1"].createInstance( );				sample = sample.QueryInterface(Components.interfaces.nsISound);				sample.play(url);				alert("Test!!");			} catch(e) {				htlivesight.Log.warn("Click.Test:" + e);			}		},*/
		AddMatch: function (event) {			var matchId = parseInt(document.getElementById("boxaddmatch").value, 10);			var sourceSystem= document.getElementById("sourceSystem").value;			if (matchId) {				htlivesight.AddLiveMatch(matchId, sourceSystem);			}		},				Login: function (event) {			htlivesight.Login.teamId = document.getElementById("teamId").value;    			if (htlivesight.Login.teamId == ""){				return;			};			htlivesight.getRecommendedServer();			$('#login-dialog').dialog("close"); 		},
		Logout: function (event) {			htlivesight.Logout();		},
		AddMatchByTeam: function (event) {			var teamId = parseInt(document.getElementById("boxaddmatch").value, 10);			var sourceSystem = document.getElementById("sourceSystem").value;			var youth="False";			if ((sourceSystem=="youth")||(sourceSystem=="Youth")){youth="True";}			if(teamId) {				htlivesight.Matches.HTTPGetByTeam(teamId, youth);			}		},
		ClearLog: function() {			var logElement = document.getElementById("logbox");			logElement.setAttribute("value", "");		},
		window: function() {			var id=this.getAttribute("id").split("_");			htlivesight.DOM.window.set(id[1], id[2], htlivesight.DOM.mode[id[0]]);		},
		moveDown: function() {			var id=this.getAttribute("id").split("_");			var window=document.getElementById("live_"+id[1]+"_"+id[2]);			var next=window.nextSibling;			if (next != null && next.hidden == false)				next = next.nextSibling;			window.parentNode.insertBefore(window, next);			this.setAttribute("src", htlivesight.Image.window.down.OFF);		},
		moveUp: function() {			var id=this.getAttribute("id").split("_");			var window=document.getElementById("live_"+id[1]+"_"+id[2]);			var prev=window.previousSibling;			window.parentNode.insertBefore(window, prev);			this.setAttribute("src", htlivesight.Image.window.up.OFF);		},
		over: function() {			var id=this.getAttribute("id").split("_");			var windowmode=htlivesight.Match.List["_"+id[1]+"_"+id[2]].window.mode;			var mode = htlivesight.DOM.mode[id[0]];			if (mode == windowmode) return;			switch (mode) {			case htlivesight.DOM.mode.close:				this.setAttribute("src", htlivesight.Image.window.close.ON);				break;
			case htlivesight.DOM.mode.shade:				this.setAttribute("src", htlivesight.Image.window.shade.ON);				break;
			case htlivesight.DOM.mode.minimize:				this.setAttribute("src", htlivesight.Image.window.minimize.ON);				break;
			case htlivesight.DOM.mode.maximize:				this.setAttribute("src", htlivesight.Image.window.maximize.ON);				break;
			case htlivesight.DOM.mode.moveup:				this.setAttribute("src", htlivesight.Image.window.up.ON);				break;
			case htlivesight.DOM.mode.movedown:				this.setAttribute("src", htlivesight.Image.window.down.ON);				break;
			case htlivesight.DOM.mode.link:				this.setAttribute("src", htlivesight.Image.window.link.ON);				break;			}		},
		out: function() {			var id=this.getAttribute("id").split("_");			var windowmode=htlivesight.Match.List["_"+id[1]+"_"+id[2]].window.mode;			var mode = htlivesight.DOM.mode[id[0]];			if (mode == windowmode) return;			switch (mode) {			case htlivesight.DOM.mode.close:				this.setAttribute("src", htlivesight.Image.window.close.OFF);				break;
			case htlivesight.DOM.mode.shade:				this.setAttribute("src", htlivesight.Image.window.shade.OFF);				break;
			case htlivesight.DOM.mode.minimize:				this.setAttribute("src", htlivesight.Image.window.minimize.OFF);				break;
			case htlivesight.DOM.mode.maximize:				this.setAttribute("src", htlivesight.Image.window.maximize.OFF);				break;
			case htlivesight.DOM.mode.moveup:				this.setAttribute("src", htlivesight.Image.window.up.OFF);				break;
			case htlivesight.DOM.mode.movedown:				this.setAttribute("src", htlivesight.Image.window.down.OFF);				break;			case htlivesight.DOM.mode.link:				this.setAttribute("src", htlivesight.Image.window.link.OFF);				break;			}		},		tip: function() {			var id=this.getAttribute("id").split("_");			htlivesight.DOM.toggleTip(id[1], id[2]);		},
		link: function() {			var id=this.getAttribute("id").split("_");			htlivesight.DOM.toggleLink(id[1], id[2]);		},		sound: function() {			var id=this.getAttribute("id").split("_");			htlivesight.DOM.toggleSound(id[1], id[2]);		},  		ToggleMatch: function() {			var id = this.getAttribute("id").split("_");			htlivesight.DOM.toggleView(id[2], id[3]);		},
		DeleteMatch: function() {			var id = this.getAttribute("id").split("_");			htlivesight.DOM.deleteView(id[2], id[3]);		},
		addTeamToFriendsList: function(teamId, youth) {			htlivesight.Friends.add(teamId, youth);		},
		AddButtonListeners: function() {			var elem;			elem = document.getElementById("buttonAddTeam");			elem.addEventListener('command', htlivesight.Click.AddMatchByTeam, true);
			elem = document.getElementById("buttonAddMatch");			elem.addEventListener('command', htlivesight.Click.AddMatch, true);			elem = document.getElementById("button_login");			elem.addEventListener('command', htlivesight.Click.Login, true);		},
		winboxOpen: function() {			var name=this.id.split("_")[1];			htlivesight.winboxOpenByName(name);		},
		winboxShade: function() {			var name=this.id.split("_")[1];			htlivesight.winboxShadeByName(name);		},
		loginClose: function() {			document.getElementById('login-dialog').dialog = true;		},
		removeFriend: function() {			htlivesight.Friends.remove();		},
		addFriendMatch: function() {			htlivesight.Friends.addMatch();		},
		moveUpFriend: function() {			htlivesight.Friends.moveUp();		},
		moveDownFriend: function() {			htlivesight.Friends.moveDown();		}};