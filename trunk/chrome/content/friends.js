﻿if (!htlivesight) var htlivesight = {};htlivesight.Friends = {		ID: 0,		NAME: 1,		YOUTH: 2,		STRICT: true,		list: new Array(),		nameList: new Array(),		autoFriendCount: 0,		serialize: function(friendsList) {			var friendsStr="";			for (var i=0; i<friendsList.length; i++) {				if (i!=0) {					friendsStr += "|";				}				friendsStr += (friendsList[i]); 			}			return friendsStr;		},		deserialize: function(friendsStr) {			var friends = new Array();			if (friendsStr != "") {				var a = friendsStr.split("|");				for (var i=0; i<a.length; i++) {					var friend = a[i].split("=");					friends[i] = new htlivesight.Friends.Friend(							friend[this.ID],							decodeURIComponent(friend[this.NAME]),							(friend[this.YOUTH]?friend[this.YOUTH]:"False"));				}			}			return friends;		},		get: function(teamId) {			try {				htlivesight.Friends.list = htlivesight.Friends.deserialize(htlivesight.Preferences.friends.get());			} catch(e) {alert("friends get: "+e);			}			var img;			img = document.getElementById("imgup_friend");			img.addEventListener('click',  htlivesight.Click.moveUpFriend, true);			img=document.getElementById("imgdown_friend");			img.addEventListener('click',  htlivesight.Click.moveDownFriend, true);			var btn;			btn = document.getElementById("btnfriend_remove");			btn.addEventListener("click", htlivesight.Click.removeFriend, true);			btn = document.getElementById("btnfriend_addmatch");			btn.addEventListener("click", htlivesight.Click.addFriendMatch, true);		},		save: function() {			var friendsStr = htlivesight.Friends.serialize(htlivesight.Friends.list);			htlivesight.Preferences.friends.save(friendsStr);		},		start: function() {			htlivesight.Friends.listbox.start();			htlivesight.Friends.get();			htlivesight.Friends.listbox.fill();		},		addLive: function() {			if (!htlivesight.prefs.matches.friends.get) return;			htlivesight.Friends.autoFriendCount = htlivesight.Friends.list.length;			for(var i=0,len=htlivesight.Friends.list.length; i<len; i++) {				htlivesight.Matches.HTTPGetByTeam(htlivesight.Friends.list[i].id, (htlivesight.Friends.list[i].youth==="True")?"youth":"hattrick", false);			}		},		add: function(teamId, youth) {			if ((youth=="Youth")||(youth=="youth")||(youth=="True")){youth="True";}			else{ youth="False";} 			if (htlivesight.Friends.isFriend(teamId, youth, !htlivesight.Friends.STRICT)) {				return;			};			var i=htlivesight.Friends.list.push(new htlivesight.Friends.Friend(teamId, htlivesight.Teams.list["_"+teamId+"_"+youth].name, youth))-1;			htlivesight.Friends.save();			htlivesight.Friends.listbox.element.options[htlivesight.Friends.list.length-1] = new Option(htlivesight.Teams.list["_"+teamId+"_"+youth].name, teamId);			htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);		},		update: function(id, name) {			var friend;			for (var i=0; i<htlivesight.Friends.list.length; i++) {				friend = htlivesight.Friends.list[i];				if(id==friend.id && friend.id==friend.name) {					htlivesight.Friends.list[i].name=name;					htlivesight.Friends.listbox.update();				}			}		},		remove: function() {			htlivesight.Friends.listbox.remove();			htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW); 		},		addMatch: function(byButtonPressed) {			if (!htlivesight.LogIn.login) return;			var TeamId=htlivesight.Friends.listbox.getSelectedTeamId();			var youth=htlivesight.Friends.listbox.getSelectedYouth();			if (TeamId>0) {				htlivesight.Matches.HTTPGetByTeam(TeamId, youth, byButtonPressed);			}		},		moveUp: function() {			htlivesight.Friends.listbox.moveUp();		},		moveDown: function(teamId) {			htlivesight.Friends.listbox.moveDown();		},		listbox: {			element: null,			start: function() {				htlivesight.Friends.listbox.element = document.getElementById("listbox_friends");			},			swap: function(i1, i2){				var list, item1, item2, tmpLabel, tmpValue; 				list = htlivesight.Friends.listbox.element;				item1 = htlivesight.Friends.listbox.element.options[i1];				item2 = htlivesight.Friends.listbox.element.options[i2];				tmpLabel=item1.label; tmpValue=item1.innerHTML;				item1.label=item2.label; item1.innerHTML=item2.innerHTML;				item2.label=tmpLabel; item2.innerHTML=tmpValue;			},			update: function() {				var i,item;				for (i=0; i<htlivesight.Friends.list.length; i++) {					item = htlivesight.Friends.listbox.element.getItemAtIndex(i);					if(item) item.label=htlivesight.Friends.list[i].name;				};			},			fill: function() {				var i;				for (i=0; i<htlivesight.Friends.list.length; i++) {					htlivesight.Friends.listbox.element.options[i] = new Option(htlivesight.Friends.list[i].name, htlivesight.Friends.list[i].id);				}			},			remove: function() {				var list = htlivesight.Friends.listbox.element;				var index = list.selectedIndex;				htlivesight.Friends.list.splice(index, 1);				var item=list.remove(index);				htlivesight.Friends.save();			},			moveUp: function() {				var list = htlivesight.Friends.listbox.element;				var index = list.selectedIndex;				if (index<=0) return;				htlivesight.Friends.listbox.swap(index, index-1);				htlivesight.Friends.list.swap(index, index-1);				list.selectedIndex = index-1;				htlivesight.Friends.save();			},			moveDown: function() {				var list = htlivesight.Friends.listbox.element;				var index = list.selectedIndex;				if (index<0 || !(index+1<htlivesight.Friends.list.length)) return;				htlivesight.Friends.listbox.swap(index, index+1);				htlivesight.Friends.list.swap(index, index+1);				list.selectedIndex = index+1;				htlivesight.Friends.save();			},			getSelectedTeamId: function() {				var list = htlivesight.Friends.listbox.element;				var index = list.selectedIndex;				if (index<0) return -1;				return htlivesight.Friends.list[index].id;			},			getSelectedYouth: function() {				var list = htlivesight.Friends.listbox.element;				var index = list.selectedIndex;				if (index<0) return "False";				return htlivesight.Friends.list[index].youth;			}		}};htlivesight.Friends.isFriend = function(teamId, youth, strict) {	var i = htlivesight.Friends.list.length;	var isF = false;	if ((youth=="Youth")||(youth=="youth")||(youth=="True")){youth="True";}	else youth="False";	while (i--) {		if (htlivesight.Friends.list[i].id == teamId &&				htlivesight.Friends.list[i].youth == youth) {			isF = true;			break;		}	}	return (isF || (!strict && teamId==htlivesight.Teams.myTeam.id && youth == "False")||(!strict && (htlivesight.Teams.mySecondTeam && teamId==htlivesight.Teams.mySecondTeam.id) && youth == "False"));};htlivesight.Friends.Friend = function(id, name, youth) {	this.id = id;	this.name = name ? name : id;	this.youth = youth;};htlivesight.Friends.Friend.prototype.toString = function() {	return this.id+"="+encodeURIComponent(this.name)+"="+this.youth;};