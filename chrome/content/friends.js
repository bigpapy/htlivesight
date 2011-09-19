var Friends = {
  ID: 0,
  NAME: 1,
  YOUTH: 2,
  STRICT: true,
  list: new Array(),
  nameList: new Array(),
  autoFriendCount: 0,
  serialize: function(friendsList) {
    var friendsStr="";
    for (var i=0; i<friendsList.length; i++) {
      if (i!=0) {
        friendsStr += "|";
      }
      friendsStr += (friendsList[i]); 
    }
    return friendsStr;
  },
  deserialize: function(friendsStr) {
    var friends = new Array();
    if (friendsStr != "") {
      var a = friendsStr.split("|");
      for (var i=0; i<a.length; i++) {
        var friend = a[i].split("=");
        friends[i] = new Friends.Friend(
                                friend[this.ID],
                                decodeURIComponent(friend[this.NAME]),
				(friend[this.YOUTH]?friend[this.YOUTH]:"False"));
      }
    }
    return friends;
    
  },
  get: function(teamId) {
    try {
      Friends.list = Friends.deserialize(htlivesight.Preferences.friends.get());
    } catch(e) {
    }
    var strings = document.getElementById("strings");
    var img;
    img = document.getElementById("imgup_friend");
    img.setAttribute("tooltiptext", strings.getString("tooltip.friend.move_up"));
    img.addEventListener('click',  htlivesight.Click.moveUpFriend, true);
    
    img=document.getElementById("imgdown_friend");
    img.setAttribute("tooltiptext", strings.getString("tooltip.friend.move_down"));
    img.addEventListener('click',  htlivesight.Click.moveDownFriend, true);
    
    var btn;
    btn = document.getElementById("btnfriend_remove");
    btn.addEventListener("command", htlivesight.Click.removeFriend, true);

    btn = document.getElementById("btnfriend_addmatch");
    btn.addEventListener("command", htlivesight.Click.addFriendMatch, true);

  },
  save: function() {
    var friendsStr = Friends.serialize(Friends.list);
    htlivesight.Preferences.friends.save(friendsStr);
  },
  start: function() {
    Friends.listbox.start();
    Friends.get();
    Friends.listbox.fill();
  },
  addLive: function() {
    //var i;
    if (!htlivesight.prefs.matches.friends.get) return;
    Friends.autoFriendCount = Friends.list.length;
    for(var i=0; i<Friends.list.length; i++) {
      Matches.HTTPGetByTeam(Friends.list[i].id, Friends.list[i].youth);
    }
  },
  add: function(teamId, youth) {
    if (Friends.isFriend(teamId, youth, !Friends.STRICT)) {
      var strings = document.getElementById("strings");
      alert(Teams.list["_"+teamId+"_"+youth].name + ": " + strings.getString("message.already_friend"));
      return;
    };
    var i=Friends.list.push(new Friends.Friend(teamId, Teams.list["_"+teamId+"_"+youth].name, youth))-1;
    Friends.save();
    Friends.listbox.element.appendItem(Friends.list[i].name, Friends.list[i].id);
  },
  update: function(id, name) {
    var friend;
    for (var i=0; i<Friends.list.length; i++) {
      friend = Friends.list[i];
      if(id==friend.id && friend.id==friend.name) {
        Friends.list[i].name=name;
        Friends.listbox.update();
      }
    }
  },
  remove: function() {
    Friends.listbox.remove();
  },
  addMatch: function() {
    if (!Login.login) return;
    var TeamId=Friends.listbox.getSelectedTeamId();
    var youth=Friends.listbox.getSelectedYouth();
    if (TeamId>0) {
      Matches.HTTPGetByTeam(TeamId, youth);
    }
  },
  moveUp: function() {
    Friends.listbox.moveUp();
  },
  moveDown: function(teamId) {
    Friends.listbox.moveDown();
  },
  listbox: {
    element: null,
    start: function() {
      Friends.listbox.element = document.getElementById("listbox_friends");
    },
    swap: function(i1, i2){
      var list, item1, item2, tmpLabel, tmpValue; 
      list = Friends.listbox.element;
      item1 = list.getItemAtIndex(i1);
      item2 = list.getItemAtIndex(i2);
      tmpLabel=item1.label; tmpValue=item1.value;
      item1.label=item2.label; item1.value=item2.value;
      item2.label=tmpLabel; item2.value=tmpValue;
    },
    update: function() {
      var i/*, it*/;
      for (i=0; i<Friends.list.length; i++) {
        item = Friends.listbox.element.getItemAtIndex(i);
        if(item) item.label=Friends.list[i].name;
      };
    },
    fill: function() {
      var i;
      for (i=0; i<Friends.list.length; i++) {
        Friends.listbox.element.appendItem(htlivesight.DOM.getTextContent(Friends.list[i].name), Friends.list[i].id);
      }
    },
    remove: function() {
      var list = Friends.listbox.element;
      var index = list.selectedIndex;
      Friends.list.splice(index, 1);
      var item=list.removeItemAt(index);
      Friends.save();
    },
    moveUp: function() {
      var list = Friends.listbox.element;
      var index = list.selectedIndex;
      if (index<=0) return;
      Friends.listbox.swap(index, index-1);
      Friends.list.swap(index, index-1);
      list.selectedIndex = index-1;
      Friends.save();
    },
    moveDown: function() {
      var list = Friends.listbox.element;
      var index = list.selectedIndex;
      if (index<0 || !(index+1<Friends.list.length)) return;
      Friends.listbox.swap(index, index+1);
      Friends.list.swap(index, index+1);
      list.selectedIndex = index+1;
      Friends.save();
    },
    getSelectedTeamId: function() {
      var list = Friends.listbox.element;
      var index = list.selectedIndex;
      if (index<0) return -1;
      return Friends.list[index].id;
    },
    getSelectedYouth: function() {
      var list = Friends.listbox.element;
      var index = list.selectedIndex;
      if (index<0) return "False";
      return Friends.list[index].youth;
    }
  }
};


Friends.isFriend = function(teamId, youth, strict) {
  var i = Friends.list.length;
  var isF = false;
  while (i--) {
    if (Friends.list[i].id == teamId &&
        Friends.list[i].youth == youth) {
      isF = true;
      break;
    }
  }
  return (isF || (!strict && teamId==Teams.myTeam.id && youth == "False"));
};
    
Friends.Friend = function(id, name, youth) {
  this.id = id;
  this.name = name ? name : id;
  this.youth = youth;
};

Friends.Friend.prototype.toString = function() {
  return this.id+"="+encodeURIComponent(this.name)+"="+this.youth;
};




