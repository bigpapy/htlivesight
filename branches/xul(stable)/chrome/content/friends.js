﻿if (!htlivesight) var htlivesight = {};htlivesight.Friends = {  ID: 0,  NAME: 1,  YOUTH: 2,  STRICT: true,  list: new Array(),  nameList: new Array(),  autoFriendCount: 0,  serialize: function(friendsList) {    var friendsStr="";    for (var i=0; i<friendsList.length; i++) {      if (i!=0) {        friendsStr += "|";      }      friendsStr += (friendsList[i]);     }    return friendsStr;  },  deserialize: function(friendsStr) {    var friends = new Array();    if (friendsStr != "") {      var a = friendsStr.split("|");      for (var i=0; i<a.length; i++) {        var friend = a[i].split("=");        friends[i] = new htlivesight.Friends.Friend(                                friend[this.ID],                                decodeURIComponent(friend[this.NAME]),				(friend[this.YOUTH]?friend[this.YOUTH]:"False"));      }    }    return friends;      },  get: function(teamId) {    try {    	htlivesight.Friends.list = htlivesight.Friends.deserialize(htlivesight.Preferences.friends.get());    } catch(e) {    } //   var strings = document.getElementById("strings");    var img;    img = document.getElementById("imgup_friend");    img.setAttribute("tooltiptext", /*strings.getString("tooltip.friend.move_up")*/htlivesight.Util.Parse("TooltipFriendMoveUp",htlivesight.data[0]));    img.addEventListener('click',  htlivesight.Click.moveUpFriend, true);        img=document.getElementById("imgdown_friend");    img.setAttribute("tooltiptext", /*strings.getString("tooltip.friend.move_down")*/htlivesight.Util.Parse("TooltipFriendMoveDown",htlivesight.data[0]));    img.addEventListener('click',  htlivesight.Click.moveDownFriend, true);        var btn;    btn = document.getElementById("btnfriend_remove");    btn.addEventListener("command", htlivesight.Click.removeFriend, true);    btn = document.getElementById("btnfriend_addmatch");    btn.addEventListener("command", htlivesight.Click.addFriendMatch, true);  },  save: function() {    var friendsStr = htlivesight.Friends.serialize(htlivesight.Friends.list);    htlivesight.Preferences.friends.save(friendsStr);  },  start: function() {//	  alert("friends1");	  htlivesight.Friends.listbox.start(); //   alert("friends2");	  htlivesight.Friends.get(); //   alert("friends3");	  htlivesight.Friends.listbox.fill(); //   alert("friends4");  },  addLive: function() {    //var i;    if (!htlivesight.prefs.matches.friends.get) return;    htlivesight.Friends.autoFriendCount = htlivesight.Friends.list.length;    for(var i=0; i<htlivesight.Friends.list.length; i++) {      htlivesight.Matches.HTTPGetByTeam(htlivesight.Friends.list[i].id, htlivesight.Friends.list[i].youth);    }  },  add: function(teamId, youth) {//	  alert("1");    if (htlivesight.Friends.isFriend(teamId, youth, !htlivesight.Friends.STRICT)) {  //  	alert("2"); //     var strings = document.getElementById("strings"); //   	alert("3");      alert(htlivesight.Teams.list["_"+teamId+"_"+youth].name + ": " + /*strings.getString("message.already_friend")*/htlivesight.Util.Parse("MessageAlreadyFriend",data[0])); //     alert("4");      return;    }; //   alert("5");    var i=htlivesight.Friends.list.push(new htlivesight.Friends.Friend(teamId, htlivesight.Teams.list["_"+teamId+"_"+youth].name, youth))-1; //   alert("6");    htlivesight.Friends.save(); //   alert("7");    htlivesight.Friends.listbox.element.appendItem(htlivesight.Friends.list[i].name, htlivesight.Friends.list[i].id); //   alert("8");  },  update: function(id, name) {    var friend;    for (var i=0; i<htlivesight.Friends.list.length; i++) {      friend = htlivesight.Friends.list[i];      if(id==friend.id && friend.id==friend.name) {    	  htlivesight.Friends.list[i].name=name;    	  htlivesight.Friends.listbox.update();      }    }  },  remove: function() {	  htlivesight.Friends.listbox.remove();  },  addMatch: function() {    if (!htlivesight.LogIn.login) return;    var TeamId=htlivesight.Friends.listbox.getSelectedTeamId();    var youth=htlivesight.Friends.listbox.getSelectedYouth();    if (TeamId>0) {      htlivesight.Matches.HTTPGetByTeam(TeamId, youth);    }  },  moveUp: function() {	  htlivesight.Friends.listbox.moveUp();  },  moveDown: function(teamId) {	  htlivesight.Friends.listbox.moveDown();  },  listbox: {    element: null,    start: function() {    	htlivesight.Friends.listbox.element = document.getElementById("listbox_friends");    },    swap: function(i1, i2){      var list, item1, item2, tmpLabel, tmpValue;       list = htlivesight.Friends.listbox.element;      item1 = list.getItemAtIndex(i1);      item2 = list.getItemAtIndex(i2);      tmpLabel=item1.label; tmpValue=item1.value;      item1.label=item2.label; item1.value=item2.value;      item2.label=tmpLabel; item2.value=tmpValue;    },    update: function() {      var i/*, it*/;      for (i=0; i<htlivesight.Friends.list.length; i++) {        item = htlivesight.Friends.listbox.element.getItemAtIndex(i);        if(item) item.label=htlivesight.Friends.list[i].name;      };    },    fill: function() {      var i;      for (i=0; i<htlivesight.Friends.list.length; i++) {    	  htlivesight.Friends.listbox.element.appendItem(htlivesight.DOM.getTextContent(htlivesight.Friends.list[i].name), htlivesight.Friends.list[i].id);      }    },    remove: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      htlivesight.Friends.list.splice(index, 1);      var item=list.removeItemAt(index);      htlivesight.Friends.save();    },    moveUp: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      if (index<=0) return;      htlivesight.Friends.listbox.swap(index, index-1);      htlivesight.Friends.list.swap(index, index-1);      list.selectedIndex = index-1;      htlivesight.Friends.save();    },    moveDown: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      if (index<0 || !(index+1<htlivesight.Friends.list.length)) return;      htlivesight.Friends.listbox.swap(index, index+1);      htlivesight.Friends.list.swap(index, index+1);      list.selectedIndex = index+1;      htlivesight.Friends.save();    },    getSelectedTeamId: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      if (index<0) return -1;      return htlivesight.Friends.list[index].id;    },    getSelectedYouth: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      if (index<0) return "False";      return htlivesight.Friends.list[index].youth;    }  }};htlivesight.Friends.isFriend = function(teamId, youth, strict) {  var i = htlivesight.Friends.list.length;  var isF = false;  while (i--) {    if (htlivesight.Friends.list[i].id == teamId &&    		htlivesight.Friends.list[i].youth == youth) {      isF = true;      break;    }  }  return (isF || (!strict && teamId==htlivesight.Teams.myTeam.id && youth == "False"));};    htlivesight.Friends.Friend = function(id, name, youth) {  this.id = id;  this.name = name ? name : id;  this.youth = youth;};htlivesight.Friends.Friend.prototype.toString = function() {  return this.id+"="+encodeURIComponent(this.name)+"="+this.youth;};