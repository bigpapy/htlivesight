﻿if (!htlivesight) var htlivesight = {};htlivesight.Friends = {  ID: 0,  NAME: 1,  YOUTH: 2,  STRICT: true,  list: new Array(),  nameList: new Array(),  autoFriendCount: 0,  serialize: function(friendsList) {    var friendsStr="";    for (var i=0; i<friendsList.length; i++) {      if (i!=0) {        friendsStr += "|";      }      friendsStr += (friendsList[i]);     }    return friendsStr;  },  deserialize: function(friendsStr) {    var friends = new Array();    if (friendsStr != "") {      var a = friendsStr.split("|");      for (var i=0; i<a.length; i++) {        var friend = a[i].split("=");        friends[i] = new htlivesight.Friends.Friend(                                friend[this.ID],                                decodeURIComponent(friend[this.NAME]),				(friend[this.YOUTH]?friend[this.YOUTH]:"False"));      }    }    return friends;      },  get: function(teamId) {    try {    	htlivesight.Friends.list = htlivesight.Friends.deserialize(htlivesight.Preferences.friends.get());    } catch(e) {alert("friends get: "+e);    } //   var strings = document.getElementById("strings");    var img;//    console.log("friend:1");    img = document.getElementById("imgup_friend");  //  console.log(img);    //img.setAttribute("src", htlivesight.Image.friend.move.DOWN);    //console.log(htlivesight.Image.friend.move.DOWN); //   console.log("friend:2");   // img.setAttribute("tooltiptext", /*strings.getString("tooltip.friend.move_up")*/htlivesight.Util.Parse("TooltipFriendMoveUp",htlivesight.data[0])); //   console.log("friend:3");    img.addEventListener('click',  htlivesight.Click.moveUpFriend, true);     //   console.log("friend:4");    img=document.getElementById("imgdown_friend");   // console.log(img);    //img.setAttribute("src", htlivesight.Image.friend.move.UP);  //  console.log("friend:5");  //  img.setAttribute("tooltiptext", /*strings.getString("tooltip.friend.move_down")*/htlivesight.Util.Parse("TooltipFriendMoveDown",htlivesight.data[0])); //   console.log("friend:6");    img.addEventListener('click',  htlivesight.Click.moveDownFriend, true);     //   console.log("friend:7");    var btn; //   console.log("friend:8");    btn = document.getElementById("btnfriend_remove");//    console.log("friend:9");    btn.addEventListener("click", htlivesight.Click.removeFriend, true); //   console.log("friend:10");    btn = document.getElementById("btnfriend_addmatch"); //   console.log("friend:11");    btn.addEventListener("click", htlivesight.Click.addFriendMatch, true);//    console.log("friend:12");  },  save: function() {    var friendsStr = htlivesight.Friends.serialize(htlivesight.Friends.list);    htlivesight.Preferences.friends.save(friendsStr);  },  start: function() {//	  alert("friends1");	  htlivesight.Friends.listbox.start(); //   alert("friends2");	  htlivesight.Friends.get(); //   alert("friends3");	  htlivesight.Friends.listbox.fill(); //   alert("friends4");  },  addLive: function() {    //var i;    if (!htlivesight.prefs.matches.friends.get) return;    htlivesight.Friends.autoFriendCount = htlivesight.Friends.list.length;    for(var i=0; i<htlivesight.Friends.list.length; i++) {      htlivesight.Matches.HTTPGetByTeam(htlivesight.Friends.list[i].id, (htlivesight.Friends.list[i].youth)?"youth":"hattrick");    }  },  add: function(teamId, youth) {    if (htlivesight.Friends.isFriend(teamId, youth, !htlivesight.Friends.STRICT)) { //     var strings = document.getElementById("strings");  //    alert(htlivesight.Teams.list["_"+teamId+"_"+youth].name + ": " + /*strings.getString("message.already_friend")*/htlivesight.Util.Parse("MessageAlreadyFriend",data[0]));      return;    };    var i=htlivesight.Friends.list.push(new htlivesight.Friends.Friend(teamId, htlivesight.Teams.list["_"+teamId+"_"+youth].name, youth))-1;    htlivesight.Friends.save();   // htlivesight.Friends.listbox.element.appendItem(htlivesight.Friends.list[i].name, htlivesight.Friends.list[i].id);   // var select = document.getElementById("example-select");    htlivesight.Friends.listbox.element.options[htlivesight.Friends.list.length-1] = new Option(htlivesight.Teams.list["_"+teamId+"_"+youth].name, teamId);  // this recall (equal to relive) is done to get friend name from bold to normal in short box	  htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);      },  update: function(id, name) {    var friend;    for (var i=0; i<htlivesight.Friends.list.length; i++) {      friend = htlivesight.Friends.list[i];      if(id==friend.id && friend.id==friend.name) {    	  htlivesight.Friends.list[i].name=name;    	  htlivesight.Friends.listbox.update();      }    }  },  remove: function() {	  htlivesight.Friends.listbox.remove();	  	  // this recall (equal to relive) is done to get friend name from bold to normal in short box	  htlivesight.Live.ParseLive(htlivesight.liveXml, htlivesight.Live.VIEW);   },  addMatch: function() {    if (!htlivesight.LogIn.login) return;    var TeamId=htlivesight.Friends.listbox.getSelectedTeamId();    var youth=htlivesight.Friends.listbox.getSelectedYouth();    if (TeamId>0) {      htlivesight.Matches.HTTPGetByTeam(TeamId, (youth=="True")?"youth":"hattrick");    }  },  moveUp: function() {	  htlivesight.Friends.listbox.moveUp();  },  moveDown: function(teamId) {	  htlivesight.Friends.listbox.moveDown();  },  listbox: {    element: null,    start: function() {    	htlivesight.Friends.listbox.element = document.getElementById("listbox_friends");    },    swap: function(i1, i2){ //   	console.log("swap1");      var list, item1, item2, tmpLabel, tmpValue; //      console.log("swap2");      list = htlivesight.Friends.listbox.element; //     console.log("swap3");      //item1 = list.getItemAtIndex(i1);            item1 = htlivesight.Friends.listbox.element.options[i1]; //     console.log("swap4");      //item2 = list.getItemAtIndex(i2);      item2 = htlivesight.Friends.listbox.element.options[i2]; //     console.log("swap5");      tmpLabel=item1.label; tmpValue=item1.innerHTML; //     console.log("swap6");      item1.label=item2.label; item1.innerHTML=item2.innerHTML;  //    console.log("swap7");      item2.label=tmpLabel; item2.innerHTML=tmpValue;    },    update: function() {      var i/*, it*/;      for (i=0; i<htlivesight.Friends.list.length; i++) {        item = htlivesight.Friends.listbox.element.getItemAtIndex(i);        if(item) item.label=htlivesight.Friends.list[i].name;      };    },    fill: function() {      var i; //     alert("htlivesight.Friends.list.length:"+htlivesight.Friends.list.length);      for (i=0; i<htlivesight.Friends.list.length; i++) {   // 	  alert("fill!");    	 // htlivesight.Friends.listbox.element.appendItem(htlivesight.DOM.getTextContent(htlivesight.Friends.list[i].name), htlivesight.Friends.list[i].id);    	  htlivesight.Friends.listbox.element.options[i] = new Option(htlivesight.Friends.list[i].name, htlivesight.Friends.list[i].id);      }    },    remove: function() {   // 	alert("remove1");      var list = htlivesight.Friends.listbox.element;  //    alert("remove2");      var index = list.selectedIndex; //     alert("remove3");      htlivesight.Friends.list.splice(index, 1);  //    alert("remove4");     // var item=list.removeItemAt(index);      var item=list.remove(index);  //    alert("remove5");      htlivesight.Friends.save();  //    alert("remove6:end");    },    moveUp: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex; //     console.log("moveup1");      if (index<=0) return; //     console.log("moveup2");      htlivesight.Friends.listbox.swap(index, index-1); //     console.log("moveup3");      htlivesight.Friends.list.swap(index, index-1); //     console.log("moveup4");      list.selectedIndex = index-1; //     console.log("moveup5");      htlivesight.Friends.save(); //     console.log("moveup6");    },    moveDown: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex; //     console.log("movedown1");      if (index<0 || !(index+1<htlivesight.Friends.list.length)) return; //     console.log("movedown2");      htlivesight.Friends.listbox.swap(index, index+1);  //    console.log("movedown3");      htlivesight.Friends.list.swap(index, index+1);  //    console.log("movedown4");      list.selectedIndex = index+1; //     console.log("movedown5");      htlivesight.Friends.save(); //     console.log("movedown6");    },    getSelectedTeamId: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      if (index<0) return -1;      return htlivesight.Friends.list[index].id;    },    getSelectedYouth: function() {      var list = htlivesight.Friends.listbox.element;      var index = list.selectedIndex;      if (index<0) return "False";      return htlivesight.Friends.list[index].youth;    }  }};htlivesight.Friends.isFriend = function(teamId, youth, strict) {  var i = htlivesight.Friends.list.length;  var isF = false;    if ((youth=="youth")||(youth=="True")){youth="True";}  else youth="False";  while (i--) {    if (htlivesight.Friends.list[i].id == teamId &&    		htlivesight.Friends.list[i].youth == youth) {      isF = true;      break;    }  }  return (isF || (!strict && teamId==htlivesight.Teams.myTeam.id && youth == "False"));};    htlivesight.Friends.Friend = function(id, name, youth) {  this.id = id;  this.name = name ? name : id;  this.youth = youth;};htlivesight.Friends.Friend.prototype.toString = function() {  return this.id+"="+encodeURIComponent(this.name)+"="+this.youth;};