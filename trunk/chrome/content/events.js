function Events() {};Event.type = function(id, imageSrc, text, mysound, opsound, frsound, opfrsound, otsound, color) {  this.id = id; //  this.imageSrc = imageSrc; //  this.text = text; // text for slider  this.mysound = mysound; // mysound for slider (my team)  this.opsound = opsound; // opsound for slider (opponent my team)  this.frsound = frsound; // frsound for slider (friend team)    this.opfrsound = opfrsound; // frsound for slider (opponent friend team)    this.otsound = otsound; // frsound for slider (other team)  this.color = color;  //htlivesight.Log.info("id:" + this.id + " image:"+this.imageSrc + " text:"+this.text + " sound:"+this.sound+" color:" + this.color);};Events.type = {  GOAL: new Event.type(10, htlivesight.Image.event.goal, "event.goal", htlivesight.Sound.sample.mygoal, htlivesight.Sound.sample.opgoal, htlivesight.Sound.sample.frgoal, htlivesight.Sound.sample.opfrgoal, htlivesight.Sound.sample.otgoal, htlivesight.Notify.color.green),  PENALTY_GOAL: new Event.type(15, htlivesight.Image.event.penalty_goal, "event.penalty_goal", htlivesight.Sound.sample.mygoal, htlivesight.Sound.sample.opgoal, htlivesight.Sound.sample.frgoal, htlivesight.Sound.sample.opfrgoal, htlivesight.Sound.sample.otgoal, htlivesight.Notify.color.green),  PENALTY_MISS: new Event.type(16, htlivesight.Image.event.penalty_miss, "event.penalty_miss", htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Notify.color.red),  INJURY: new Event.type(20, htlivesight.Image.event.injury, "event.injury", htlivesight.Sound.sample.myboo, htlivesight.Sound.sample.opboo, htlivesight.Sound.sample.opboo, htlivesight.Sound.sample.opboo, htlivesight.Sound.sample.opboo, htlivesight.Notify.color.red),  RED: new Event.type(30, htlivesight.Image.event.red, "event.red", htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Notify.color.red),  YELLOW2: new Event.type(40, htlivesight.Image.event.yellow2, "event.yellow2", htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Notify.color.red),  BRUISED: new Event.type(50, htlivesight.Image.event.bruised, null, null, null, null, null, null, htlivesight.Notify.color.orange),  YELLOW: new Event.type(60, htlivesight.Image.event.yellow, null, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Sound.sample.whistle, htlivesight.Notify.color.yellow),  MISS: new Event.type(70, htlivesight.Image.event.miss, null, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Sound.sample.miss, htlivesight.Notify.color.grey),  SUN: new Event.type(80, htlivesight.Image.event.sun, null, htlivesight.Sound.sample.sun, htlivesight.Sound.sample.sun, htlivesight.Sound.sample.sun, htlivesight.Sound.sample.sun, htlivesight.Sound.sample.sun),  FEW_CLOUDS: new Event.type(90, htlivesight.Image.event.few_clouds, null, htlivesight.Sound.sample.few_clouds, htlivesight.Sound.sample.few_clouds, htlivesight.Sound.sample.few_clouds, htlivesight.Sound.sample.few_clouds, htlivesight.Sound.sample.few_clouds),  OVERCAST: new Event.type(100, htlivesight.Image.event.overcast, null, htlivesight.Sound.sample.overcast, htlivesight.Sound.sample.overcast, htlivesight.Sound.sample.overcast, htlivesight.Sound.sample.overcast, htlivesight.Sound.sample.overcast),  RAIN: new Event.type(110, htlivesight.Image.event.rain, null, htlivesight.Sound.sample.rain, htlivesight.Sound.sample.rain, htlivesight.Sound.sample.rain, htlivesight.Sound.sample.rain, htlivesight.Sound.sample.rain),  HATTRICK: new Event.type(120, htlivesight.Image.event.hattrick, null, htlivesight.Sound.sample.tarzan, null, htlivesight.Sound.sample.tarzan, null, htlivesight.Sound.sample.tarzan),  PRESSING: new Event.type(130, htlivesight.Image.event.pressing),  SUB: new Event.type(140, htlivesight.Image.event.substitute),  SWAP: new Event.type(150, htlivesight.Image.event.swap),    END_MATCH: new Event.type(160, htlivesight.Image.event.info, null, htlivesight.Sound.sample.end, htlivesight.Sound.sample.end, htlivesight.Sound.sample.end, htlivesight.Sound.sample.end, htlivesight.Sound.sample.end),  END_HALF: new Event.type(170, htlivesight.Image.event.info, null, htlivesight.Sound.sample.end_half, htlivesight.Sound.sample.end_half, htlivesight.Sound.sample.end_half, htlivesight.Sound.sample.end_half, htlivesight.Sound.sample.end_half),    BEGINNING: new Event.type(180, htlivesight.Image.transparent, null, htlivesight.Sound.sample.beginning, htlivesight.Sound.sample.beginning, htlivesight.Sound.sample.beginning, htlivesight.Sound.sample.beginning, htlivesight.Sound.sample.beginning),    INFO: new Event.type(200, htlivesight.Image.event.info),    NONE: new Event.type(1000, htlivesight.Image.transparent)};Event.special = function(txt, img) {	this.txt = txt;	this.imgSrc = img;};function Event (i, m, sp, st, op, k, t) {  var zeroLead = function(key) {    var zeros = ["000", "00", "0", ""];    var id = key.split("_")[0];    return zeros[id.length]+id;  };    var keyId = zeroLead(k);    this.index = i;  this.minute = m;  this.subjectPlayerId = sp;  this.subjectTeamId = st;  this.objectPlayerId = op;  this.key = {    txt: k,    ABC: keyId,    A: keyId[0],    B: keyId[1],    C: keyId[2],    AB: keyId[0]+keyId[1],    BC: keyId[1]+keyId[2]  };  this.match = null,  this.text = t;  this.type = Events.type.NONE;	this.special = null;};Event.prototype.isInfo = function() {  return (    this.type == Events.type.INFO   /* || (this.minute == 0 &&         (this.type == Events.type.SUN         || this.type == Events.type.FEW_CLOUDS         || this.type == Events.type.OVERCAST         || this.type == Events.type.RAIN         )        ) */ // this part block weather sound in the beginning  );};/* ---------------------------------------------------------------- * commun Parse functions * ---------------------------------------------------------------- */Events.ParseList = function(xml,minutes) {  var regStr = "(<Event\\s(?:.*?)</Event>)";//  var regExp;  var event/*, index*/;//  var found;  var events = new Object();  try {    var first=Number.MAX_VALUE, last=0;    regExp = new RegExp(regStr, "g");        var eventsNode = xml.getElementsByTagName("Event");    //	alert("eventsNode.length" + eventsNode.length); /*   if(htlivesight.prefs.other.reLiveByEvent){    	eventNumberStop=minutes;    	if (eventNumberStop<=last) eventNumberStop=last+1;    	if (eventNumberStop <= eventsNode.length){    		eventNode = eventsNode[eventNumberStop];    		event = Events.ParseEvent(eventNode,j);    		minutes = event.minute;    	}    }*/    if(htlivesight.prefs.other.reLiveByEvent && htlivesight.prefs.other.reLive){    	maxEvent=minutes;    	jumpevent=0;//minutes=0;    //	Time.reLiveMinute=Number.MAX_VALUE;  //  	alert("minutes="+minutes+" eventsNode.length="+eventsNode.length);    	for(var j=0;j<= Math.min((maxEvent+jumpevent), eventsNode.length-1)/*eventsNode.length*/ ;j++){    		eventNode = eventsNode[j];    		event = Events.ParseEvent(eventNode,j);    		minutes=event.minute;    		if ((j+1)<eventsNode.length){    			eventNode = eventsNode[j+1];    			nextEvent = Events.ParseEvent(eventNode,j+1);    			Time.reLiveMinute=0;    			endEventList=false    		//	if (event.minute>=0) jumpevent=4;    		//	alert("event.minute: " + event.minute +"nextEvent.minute: "+ nextEvent.minute);    			if (event.minute==nextEvent.minute) {    				jumpevent++;    	//			alert ("jumpevent: " + jumpevent);    			}    		}else{    			Time.reLiveMinute=Number.MAX_VALUE;    	//		alert("events! Time.reLiveMinute="+Time.reLiveMinute);    			};    	//	minutes=event.minute;    	/*	if (j<=(maxEvent+jumpevent)){ */    			first = Math.min(first, event.index);        	  	last = Math.max(last, event.index);        	  	events["_" + event.index] = event;        	/*};*/    		    	};	//  	alert("first="+first+"last="+last);    	    }else for(var j=0;j< eventsNode.length ;j++){    	eventNode = eventsNode[j];    //   for(;found = regExp.exec(xml);) { //     event = Events.ParseEvent(found[1]);      event = Events.ParseEvent(eventNode,j);       //     alert("Relive: "+htlivesight.prefs.other.reLive+ //   		  " event.minute: "+ event.minute + //   		  " elapsedTime: " + minutes); //     alert ("event.minute: "+ event.minute+" minutes: "+ minutes);            if ((htlivesight.prefs.other.reLive) && (event.minute > minutes)){      }else{    	  	first = Math.min(first, event.index);    	  	last = Math.max(last, event.index);    	  	events["_" + event.index] = event; //   	  	alert ("event.minute: "+ event.minute+" minutes: "+ minutes //   	  			+ " first: "+first+" last: "+ last);     }    }    	  	events.first = first;    	  	events.last = last;  } catch(e) {    alert("Events.ParseList() : " + e);  }  return events;};Events.ParseEvent = function(xml,j) {  try {    return new Event(  /*    Events.ParseIndex(xml),*/j,      Events.ParseMinute(xml),      Events.ParseSubjectPlayerId(xml),      Events.ParseSubjectTeamId(xml),      Events.ParseObjectPlayerId(xml),      Events.ParseKey(xml),      Events.ParseText(xml)    );      } catch(e) {    alert("Event.ParseEvent : " + e);  }  return null;};Events.ParseIndex = function (xml) { // var indexStr = Util.Parse("<Event \\s*?Index=\"(.*?)\"\\s*?>", xml); // bigpapy: da controllare bene cosa fa.		var indexStr = Util.Parse("Event", xml);	return parseInt(indexStr, 10);};Events.ParseMinute = function (xml) { // return Util.Parse("<Minute>(.*?)</Minute>", xml);  return Util.Parse("Minute", xml);};Events.ParseSubjectPlayerId = function (xml) { // return Util.Parse("<SubjectPlayerID>(.*?)</SubjectPlayerID>", xml);  return Util.Parse("SubjectPlayerID", xml);};Events.ParseObjectPlayerId = function (xml) {//  return Util.Parse("<ObjectPlayerID>(.*?)</ObjectPlayerID>", xml);  return Util.Parse("ObjectPlayerID", xml);};Events.ParseSubjectTeamId = function (xml) { // return Util.Parse("<SubjectTeamID>(.*?)</SubjectTeamID>", xml);  return Util.Parse("SubjectTeamID", xml);};Events.ParseKey = function (xml) { // return Util.Parse("<EventKey>(.*?)</EventKey>", xml);  return Util.Parse("EventKey", xml);};/**************************************************************** * This function extract event text from xml file. There are some * event which has a "" content (from 550_0 to 550_9) so return * function will give back "" ****************************************************************/Events.ParseText = function (xml) { // return Util.Parse("<EventText>(.*?)</EventText>", xml);		if (Util.Parse("EventText", xml) == null) return "";  return Util.Parse("EventText", xml);}; /** --------------------------------------------  * - translates the type of event.  * --------------------------------------------  * - if it is an information event, adds that information to the match  * - (weather, team formation, etc)  * -   * - otherwise, sets actionEvent flag to true;   * --------------------------------------------  */Events.translate = function (match, event) { // var team;  event.match = match;   // alert(event.text);    if (htlivesight.prefs.other.printEventKey && event.text!="")   	{	  event.text= "(" + event.key.A + event.key.BC + ") " + event.text;  	};  switch (event.key.A) {    case "0": //match information/statistics      switch (event.key.BC) {      	case "11": // formation          event.type=Events.type.BEGINNING;          break;                          case "20": // formation          event.type=Events.type.INFO;          match.getSideById(event.subjectTeamId).formation = Events.translate.parseFormation(event.text);          break;        case "21": // lineup          team = match.getTeamById(event.subjectTeamId);          event.type=Events.type.INFO;          event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, Events.translate.parseLineup(Util.CleanText(event.text)));          break;       // added by bigpapy           case "22": // info missing lineup (no lineup info)            team = match.getTeamById(event.subjectTeamId);            event.type=Events.type.INFO;       //     event.lineupElement = htlivesight.DOM.createLineupElement("ev_"+match.id+"_"+match.youth+"_"+event.index, Events.translate.parseLineup(Util.CleanText(event.text)));            break;        case "25": // derby          event.type=Events.type.INFO;          break;        case "26": // neutral ground          event.type=Events.type.INFO;          break;        case "27": // away team plays home          event.type=Events.type.INFO;          break;        case "30": // weather rain          event.type=Events.type.RAIN;          match.weather.image = htlivesight.Image.weather.rain;          match.arena.attendance = event.objectPlayerId;                    match.arena.name = Events.translate.addArena(event.text); //bigpapy          break;        case "31": // heavy clouds          event.type=Events.type.OVERCAST;          match.weather.image = htlivesight.Image.weather.overcast;          match.arena.attendance  = event.objectPlayerId;                    match.arena.name = Events.translate.addArena(event.text); //bigpapy          break;        case "32": // low clouds          event.type=Events.type.FEW_CLOUDS;          match.weather.image = htlivesight.Image.weather.few_clouds;          match.arena.attendance  = event.objectPlayerId;                    match.arena.name = Events.translate.addArena(event.text); // bigpapy          break;        case "33": // sun          event.type=Events.type.SUN;          match.weather.image = htlivesight.Image.weather.sun;          match.arena.attendance  = event.objectPlayerId;                    match.arena.name = Events.translate.addArena(event.text);//bigpapy          break;        case "40": // possession rate          // subjectTeamId: team id          // objectPlayerId: rate          event.type=Events.type.INFO;          break;        case "41": // best player          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.INFO;          break;        case "42": // worst player          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.INFO;          break;        case "45": // halftime          event.type=Events.type.END_HALF;          break;        case "46": // hat-trick          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.HATTRICK;                    break;        case "47": // ball possession 50-50          event.type=Events.type.INFO;          break;        case "55":        case "56": // Panalty time: score          event.type=Events.type.PENALTY_GOAL;          Events.translate.addScorers(event);          break;        case "57": // Panalty time: nervous and scores          event.type=Events.type.PENALTY_GOAL;          Events.translate.addScorers(event);          break;        case "58": // Panalty time: nervous and miss          event.type=Events.type.PENALTY_MISS;          break;        case "59": // Panalty time: goalkeeper gets ball          event.type=Events.type.PENALTY_MISS;          break;        case "60": // over-confidence          event.type=Events.type.INFO;                	  event.special =  new Event.special(strings.getString("underestimation"));          break;        case "61": // low formation experience          event.type=Events.type.INFO;                    event.special =  new Event.special(strings.getString("organization.breaks"));          break;        case "62": // pull back to defende lead        	          event.type=Events.type.INFO;                    event.special =  new Event.special(strings.getString("pullback"));          break;        case "63": // half time briefing - organization up (after over-confidence)          event.type=Events.type.INFO;                    event.special =  new Event.special(strings.getString("underestimation.remove"));          break;        case "64": // half time briefing - organization up (?)          event.type=Events.type.INFO;                    event.special =  new Event.special(strings.getString("reorganize"));          break;        case "65": // low team experience - organization down          event.type=Events.type.INFO;          event.special =  new Event.special(strings.getString("nerves.important.thrilling.game"));          break;        case "66": // low team experience - organization down            event.type=Events.type.INFO;            event.special =  new Event.special(strings.getString("underestimation.reduce_double"));            break;                    case "67": // low team experience - organization down            event.type=Events.type.INFO;            event.special =  new Event.special(strings.getString("underestimation.reduce_once"));            break;                  case "68": // pressing successful          event.type=Events.type.PRESSING;          break;        case "70": // extra time start          event.type=Events.type.INFO;          break;        case "71": // extra time over. draw. penalties           event.type=Events.type.INFO;          break;        case "72": // extra time over. one team win           event.type=Events.type.INFO;          // subjectTeamId: wining team id          break;                  case "80": // new captain             event.type=Events.type.INFO;            // subjectTeamId: wining team id            break;        case "90": // injury. buised. continues playing           // subjectPlayerId: buised player id          // subjectTeamId: team id          event.type=Events.type.BRUISED;                    event.special =  new Event.special(strings.getString("bruised"));                //    event.special.txt = event.special.txt + ", eventkey:90 ";          break;        case "91": // injury. buised. get off           // subjectPlayerId: injured id          // subjectTeamId: team id          // objectPlayerId: replacement player id          event.type=Events.type.INJURY;                    event.special =  new Event.special(strings.getString("moderately.injuried"));      //    event.special.txt = event.special.txt + ", eventkey:91 ";                    break;        case "92": // injury. heavy. get out           // subjectPlayerId: injured id          // subjectTeamId: team id          // objectPlayerId: replacement player id          event.type=Events.type.INJURY;                    event.special =  new Event.special(strings.getString("badly.injuried"));       //   event.special.txt = event.special.txt + ", eventkey:92 ";                    break;        case "93": // injury. heavy. no substitution          // subjectPlayerId: injured id          // subjectTeamId: team id          event.type=Events.type.INJURY;          event.special =  new Event.special(strings.getString("injuried"));                //    event.special.txt = event.special.txt + ", eventkey:93 ";                    break;        case "94": // bruised but keeps playing after medical aid.          // subjectPlayerId: injured id          // subjectTeamId: team id          event.type=Events.type.BRUISED;                    event.special =  new Event.special(strings.getString("bruised"));      //    event.special.txt = event.special.txt + ", eventkey:94 ";                    break;        case "95": // injury          // subjectPlayerId: injured id          // subjectTeamId: team id          // objectPlayerId: replacement player id          event.type=Events.type.INJURY;                    event.special =  new Event.special(strings.getString("injuried"));     //     event.special.txt = event.special.txt + ", eventkey:95 ";                    break;        case "96": // injury. no substitution          // subjectPlayerId: injured id          // subjectTeamId: team id          event.type=Events.type.INJURY;                    event.special =  new Event.special(strings.getString("injuried"));    //      event.special.txt = event.special.txt + ", eventkey:96 ";                    break;                  case "97": // missing keeper            event.type=Events.type.INFO;            break;        default:          break;      }      break;    case "1": // goal    case "2": // missed goal			if (event.key.A == 1) {      	event.type=Events.type.GOAL;      	Events.translate.addScorers(event); 			} else {      	event.type=Events.type.MISS;			}      switch (event.key.BC) {        case "05": // Unpredictable (create pass, other player finishes)        	event.special =  new Event.special(strings.getString("event.special.unpredictable.long_pass"));        	break;        case "06": // Unpredictable (intercept pass, finishes himself)        	event.special =  new Event.special(strings.getString("event.special.unpredictable.scores_on_his_own"));        	break;        case "07": // Long Shot (scores)        	event.special =  new Event.special(strings.getString("event.special.long_shot"));        //	event.special.txt = event.special.txt + ", eventkey:"+event.key.A+"07";        	        	break;        case "08": // Unpredictable (get the ball from opponent, finishes himself)        	event.special =  new Event.special(strings.getString("event.special.unpredictable.special_action"));        	break;        case "09": // Unpredictable (give the ball to opponent, opponent finishes)        	event.special =  new Event.special(strings.getString("event.special.unpredictable.mistake"));        	break;        	        case "15": // Quick Attacker (scores himself)        	event.special =  new Event.special(strings.getString("event.special.quick.scores_after_rush"));        	break;        case "16": // (passes to other attacker, other attacker finishes)        	event.special =  new Event.special(strings.getString("event.special.quick.assist"));        	break;        case "17": // Low Stamina (give the ball to opponent, opponent finishes)        	event.special =  new Event.special(strings.getString("event.special.low_stamina"));        	break;        case "18": // Corner (scores)        	event.special =  new Event.special(strings.getString("event.special.corner_kick"));        	break;        case "19": // Corner+Header (scores)        	event.special =  new Event.special(strings.getString("event.special.corner_kick"));        	event.special.txt = event.special.txt + ", " + strings.getString("event.special.head");        	break;        case "25": // Unpredictable, own goal conclusion         	event.special =  new Event.special(strings.getString("event.special.unpredictable.own_goal"));        	break;        	        case "35": // Experienced Attacker (finishes himself)        	event.special =  new Event.special(strings.getString("experienced.forward"));        	break;        case "36": // Low Experience (opponent scores)        	event.special =  new Event.special(strings.getString("event.special.low_experience"));        	break;        case "37": // Cross Pass (create pass, other player finishes)        	if (event.key.A == 1) event.special =  new Event.special(strings.getString("winger.head"));        	else event.special =  new Event.special(strings.getString("event.special.winger"));        	        	break;        case "38": // Exceptional Passing (create pass, other player finishes)        	event.special =  new Event.special(strings.getString("event.special.winger"));        	break;        case "39": // Technical Attacker vs Head Defender (finishes himself)        	event.special =  new Event.special(strings.getString("event.special.technical"));        	break;	case "85": // Indirect Free Kick	case "86":		event.special =  new Event.special(strings.getString("event.special.indirect"));		break;		    case "87": // long shots        // subjectTeamId: team id       // event.type=Events.type.INFO;                event.special =  new Event.special(strings.getString("long.shot"));                match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.long_shots");              //  event.special.txt = event.special.txt + ", eventkey:"+event.key.A+"87";        break;	case "88":		event.special =  new Event.special(strings.getString("event.special.long_shot_defended"));			//	event.special.txt = event.special.txt + ", eventkey:"+event.key.A+"88";		break;			case "89":		event.special =  new Event.special(strings.getString("event.special.quick_vs_quick"));		break;              }            /*  				switch (event.key.B) {				case "0": // away leads, home redude				case "1": // away leads, home evens				case "2": // draw, home leads				case "3": // home leads, home increase				case "4": // counter-attack				case "5": // home leads, away redude				case "6": // home leads, away evens				case "7": // draw, away leads				case "8": // away leads, away increase					break;			}			*/						switch (event.key.C) {				case "0" : // Free Kick        	event.special =  new Event.special(strings.getString("event.side.free_kick"));					break;								case "1" : // Center        	event.special =  new Event.special(strings.getString("event.side.center"));					break;								case "2" : // Left        	event.special =  new Event.special(strings.getString("event.side.left"));					break;								case "3" : // Right        	event.special =  new Event.special(strings.getString("event.side.right"));					break;								case "4" : // Penalty        	event.special =  new Event.special(strings.getString("event.side.penalty"));					break;			}				    if (event.key.B == "4" || event.key.BC == "86") { // Counter-Attack	      	event.special.txt = (strings.getString("event.special.counter_attack")	     				+ ", " + event.special.txt);	    }			break;			    case "3": // special tactics      //event.isInfo = true;      switch (event.key.BC) {        case "01": // Rain & technical - performance down        	        	event.type=Events.type.RAIN;        	        	event.special =  new Event.special(strings.getString("meteo.special.technical.rain"));        	break;        	        case "02": // Rain & powerful - performance up        	        	event.type=Events.type.RAIN;        	        	event.special =  new Event.special(strings.getString("meteo.special.powerful.rain"));        	break;        	        case "05": // Rain & quick - performance down        	        	event.type=Events.type.RAIN;        	        	event.special =  new Event.special(strings.getString("meteo.special.quick.rain"));        	break;              case "03": // Sun & technical - performance up        	        	event.type=Events.type.SUN;        	        	event.special =  new Event.special(strings.getString("meteo.special.technical.sun"));        	break;        	        case "04": // Sun & powerful - performance down        	        	event.type=Events.type.SUN;        	        	event.special =  new Event.special(strings.getString("meteo.special.powerful.sun"));        	        	break;        case "06": // Sun & quick - performance down        	        	event.type=Events.type.SUN;        	        	event.special =  new Event.special(strings.getString("meteo.special.quick.sun"));          break;              case "31": // pressing          // subjectTeamId: team id          event.type=Events.type.INFO;                    match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.pressing");          break;        case "32": // counter-attack          // subjectTeamId: team id          event.type=Events.type.INFO;                    match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.counter_attack");          break;        case "33": // attack in the middle          // subjectTeamId: team id          event.type=Events.type.INFO;          match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.aim");          break;        case "34": // attack on wings          // subjectTeamId: team id          event.type=Events.type.INFO;          match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.aow");          break;        case "35": // play creatively          // subjectTeamId: team id          event.type=Events.type.INFO;                    match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.play_creative");          break;        case "36": // long shots          // subjectTeamId: team id          event.type=Events.type.INFO;                    match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.long_shots");          break;                  case "43": // attack in the middle            // subjectTeamId: team id            event.type=Events.type.INFO;                        match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.aim");                        event.special =  new Event.special(strings.getString("tactic.aim"));            break;                    case "44": // attack on wings //add by bigpapy            // subjectTeamId: team id            event.type=Events.type.INFO;                                               match.getSideById(event.subjectTeamId).tactic = strings.getString("tactic.aow");            event.special =  new Event.special(strings.getString("tactic.aow"));                        break;                  case "50": // substitution            event.type=Events.type.SUB;            break;        case "51": // substitution          event.type=Events.type.SUB;          break;                  case "52": // substitution            event.type=Events.type.SUB;            break;                  case "60": // tactic change            event.type=Events.type.INFO;            break;        case "61": // tactic change          event.type=Events.type.INFO;          break;                  case "62": // tactic change            event.type=Events.type.INFO;            break;        case "70": // tactic change: swap position            event.type=Events.type.SWAP;            break;        case "71": // tactic change: swap position          event.type=Events.type.SWAP;          break;                  case "72": // tactic change: swap position            event.type=Events.type.SWAP;            break;                                default:          break;      };      break;    case "4": // nothing      break;    case "5": // cards & match over      switch (event.key.BC) {            case "00": // walkover - draw          event.type=Events.type.INFO;          break;        case "01": // walkover - home team wins          event.type=Events.type.INFO;          break;        case "02": // walkover - away team wins          event.type=Events.type.INFO;          break;                  case "03": // Both teams break game (2 players remaining)             event.type=Events.type.INFO;            break;               case "04": // Home team breaks game (2 players remaining)             event.type=Events.type.INFO;            break;        case "05": // Away team breaks game (2 players remaining)             event.type=Events.type.INFO;            break;                    case "10": // booking - first booking (aggressivity)          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.YELLOW;                    event.special =  new Event.special(strings.getString("yellow.nasty_play"));          break;        case "11": // booking - first booking (honesty)          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.YELLOW;                    event.special =  new Event.special(strings.getString("yellow.cheating"));          break;        case "12": // booking - second booking (aggressivity)          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.YELLOW2;          event.special =  new Event.special(strings.getString("yellow.nasty_play"));                    break;        case "13": // booking - second booking (honesty)          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.YELLOW2;                    event.special =  new Event.special(strings.getString("yellow.cheating"));          break;        case "14": // booking - sent off          // subjectPlayerId: player id          // subjectTeamId: team id          event.type=Events.type.RED;          break;        case "50": // indirect free kick rating?          event.type=Events.type.INFO;          break;        case "99": // end of match          event.type=Events.type.END_MATCH;          match.isFinish = true;          break;        default:          break;      };      break;    default:      break;  };  //event.text = "(" + event.key.txt + ") " + event.text;};/*************************************************************** * This function extract formation (4-4-2 3-5-2 etc using * regular expression in the eventtext of a particular event. ***************************************************************/Events.translate.parseFormation = function(txt) {	try{		var found=txt.match(/\d\-\d\-\d/);//		alert("dentro Events.translate.addArena3"+ found[1]);		if (found) {return found;}		else return "";		}		catch(e){dump("Events.translate.parseFormation error:"+ e );};	}; Events.translate.parseLineup = function(txt) {  var lineup = new Array();  try {    var l = txt.split(": ")[1];    var i;    var zones=l.split(" - ");    for(i=0; i<zones.length; i++) {      lineup[lineup.length] = zones[i].split(", ");    }    i = lineup.length-1;    var j = lineup[i].length-1;    lineup[i][j] = lineup[i][j].substring(0, lineup[i][j].length-1);  }  catch (e) {    // Argh, Magyar has some special translation of the lineup.  }  return lineup;};/************************************************************* * This function extract the arena name from event text. It * search for text between "> and </a>. ************************************************************/Events.translate.addArena = function(eventTxt){		try{	var found=eventTxt.match(/">(.+?)<\/a>/);//	alert("dentro Events.translate.addArena3"+ found[1]);	if (found) {return found[1];};	}	catch(e){dump("Events.translate.addArena error:"+ e );};}; Events.translate.addScorers = function(event) {  var team = event.match.getSideById(event.subjectTeamId);    if (team.scorers == null)     team.scorers = new Object();  if (team.scorers[event.subjectPlayerId] == null ) {    team.scorers[event.subjectPlayerId] =      new Scorer(Events.translate.parseScorer(event.text, event.subjectPlayerId), " (");  } else {    team.scorers[event.subjectPlayerId].mins += ",";  }  team.scorers[event.subjectPlayerId].mins += event.minute;};/*-----------------------------------------------------------------------------------------* This function try to solve the problem of finding the scorer player first and last name*------------------------------------------------------------------------------------------*/Events.translate.parseScorer = function(txt, id) {//	alert("Events.translate.parseScorer = function(txt, id) txt: " + txt + "id: "+id);		//split the text of the event in more strings every time it finds a "	var arrayTxtSplitted = txt.split(/"/);		// select the id of the player subject and return the name (two string forward)	for (var j=0;j<arrayTxtSplitted.length;j++){				subArrayTxtSplitted = arrayTxtSplitted[j].split(/=/);				if (subArrayTxtSplitted[(subArrayTxtSplitted.length-1)]==id) { 					return Util.RemoveSpecialChar(arrayTxtSplitted[j+2]);					}		}	 // return Util.ParseTxt("Id=" + id + "[^>]*?&gt;(.*?)&lt;", txt);//	return Util.ParseTxt("Id=" + id + "\" title=\"[^\"]*\" alt=\"[^\"]*\"&gt;(.*?)&lt;", txt);};function Scorer(name, mins) {  this.name = name;  this.mins = mins;};