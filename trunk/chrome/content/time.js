
 htlivesight.Time = {
  SECOND: 0,
  MINUTE: 0,
  HOUR: 0,
  DAY: 0,
  hattrickTime: 0,
  hattrickDiffTime: 0,
  reLiveStartTime: 0,
  reLiveMinute: 0,
  whistleTime: 0,
  noWhistleTime: 60000,
  start: function(hattrickTime) {
    var now = new Date();
    htlivesight.Time.hattrickTime = hattrickTime;
    htlivesight.Time.hattrickDiffTime = hattrickTime - now /*+ now.getTimezoneOffset()*60000*/;
  //  alert(htlivesight.Time.hattrickDiffTime);
  //  alert("Timediff: "+Time.hattrickDiffTime);
//    Time.reLiveStartTime = Time.hattrickTime - Time.hattrickDiffTime; // re live by bigpapy
  },
  formatDate: function(date) {
    return date.toLocaleString();
  },
  parseFetchDate: function (response) {
   //   return Time.parseDate(Util.Parse("<FetchedDate>(.*?)</FetchedDate>", response));
	  return htlivesight.Time.parseDate(htlivesight.Util.Parse("FetchedDate", response));
  },
  parseDate: function(str) {
    // str is a date string in the form "yyyy-mm-dd hh:mm:ss" (Ex: "2005-12-03 22:00:00")
    // if hh:mm:ss is 00:00:00, it is ommited
    var reg1 = new RegExp(/(\d*)-(\d*)-(\d*).*/);
    var reg2 = new RegExp(/.*? (\d*):(\d*):(\d*)/);
    var f;
    var date = new Date();
    
 //   var a, b, c;
  
    f = reg1.exec(str);
    date.setFullYear(parseInt(f[1], 10));
    date.setMonth(parseInt(f[2], 10)-1, parseInt(f[3], 10));
  
    f = reg2.exec(str);
    if (f) {
      date.setHours(parseInt(f[1], 10));
      date.setMinutes(parseInt(f[2], 10));
      date.setSeconds(parseInt(f[3], 10));
    } else {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    return date;
  },
  getMatchTime: function(match) {
  /** ----------------------------------
   * Match time sequence
   * -----------------
   * 00:00 start game (play whistle_start)
   * 00:45 end half one
   * 01:00 start half 2 (play whistle_start)
   * 01:45 end half 2.
   * - extra time
   * 1:45 start extratime
   * 2:15 end extratime (or by first goal)
   * - penalties
   * 2:15 start penalty
   * 2:25 end penalty (earliest)
   * 2:59 end penalty (latest)
   * each penalty = 1 minute
   * max penalties = 44 
   */
   
 //   var strings = document.getElementById("strings");
 //   var reLive = htlivesight.prefs.other.reLive;// re live by bigpapy
 //   alert("Time.reLiveStartTime: "+ Time.reLiveStartTime);// re live by bigpapy.

    if (match.isFinish) {
    	// next event time (next update):
    	// if match is finished next update will be as late as possible.
    	match.nextEventTime=new Date();
   // 	console.log("match.nextEventTime= "+match.nextEventTime);
    	match.nextEventTime.setDate(match.nextEventTime.getDate()+7);
  //  	console.log("match.nextEventTime= "+match.nextEventTime);
        // end next event time (next update).
      return /*strings.getString("time.finish")*/htlivesight.Util.Parse("TimeFinish",data[0]);
    };
  
    var startTime = match.date;
    //if(htlivesight.prefs.other.reLive)
  //  if (htlivesight.prefs.other.reLive && startTime<Time.reLiveStartTime) startTime = Time.reLiveStartTime;
    
    var time = htlivesight.Time.hattrickTime - startTime; // time difference in miliseconds
    var now = new Date();
    noWhistleTime=htlivesight.Time.noWhistleTime;
 //   if(htlivesight.prefs.other.reLive) time=match.event.list["_"+match.event.list.last].minute*1000;
      
    if (time<0) {
      var seconds = Math.round(Math.abs(time)/1000); // time to go in seconds
      var minutes = Math.round(seconds/60); // time to go in minutes
      var hours = Math.round(minutes/60); // time to go in hours
      var days = Math.round(hours/24); // time to go in days
  // next event time (next update):
      // if match isn't started next update will be at match start.
      match.nextEventTime= new Date(match.date);
       
      if (days > 1) 
        return /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + days + " " + /*strings.getString("time.days")*/htlivesight.Util.Parse("TimeDays",data[0]); 
      if (days > 0) 
        return /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + days + " " + /*strings.getString("time.day")*/htlivesight.Util.Parse("TimeDay",data[0]); 
      if (hours > 1)
        return /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + hours + " " + /*strings.getString("time.hours")*/htlivesight.Util.Parse("TimeHours",data[0]); 
      if (hours > 0)
        return /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + hours + " " + /*strings.getString("time.hour")*/htlivesight.Util.Parse("TimeHour",data[0]); 
      if (minutes > 1)
        return /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + minutes + " " + /*strings.getString("time.minutes")*/htlivesight.Util.Parse("TimeMinutes",data[0]); 
      return /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + minutes + " " + /*strings.getString("time.minute")*/htlivesight.Util.Parse("TimeMinute",data[0]); 
    };
      
    var seconds = Math.round(time/1000); // time elapsed in seconds
    var minutes = Math.round(seconds/60); // time elapsed in minutes
   
    var m = minutes; // first half
    
    // re live time added by bigpapy
  
   if(htlivesight.prefs.other.reLive){
 //   	var realTime = Time.hattrickTime - match.date;
 //   	var realMinute = Math.round(realTime/60000);
    	//bigpapy: added that quantity because at fast speed it is too short.
    	noWhistleTime=htlivesight.Time.noWhistleTime/htlivesight.prefs.other.reLiveSpeed+htlivesight.prefs.other.reLiveSpeed*100;
 //   	m=Math.round((Time.hattrickTime - Time.reLiveStartTime)/60000)*htlivesight.prefs.other.reLiveSpeed;
   // 	m= Time.reLiveMinute
    //	alert("Time.reLiveMinute="+Time.reLiveMinute+" m="+m);
    	if(htlivesight.prefs.other.reLiveByEvent){
    		try{
    		//	alert("Time! match.reLiveByEventEnd="+match.reLiveByEventEnd);
    			if (match.reLiveByEventEnd){
    				htlivesight.Time.reLiveMinute=Number.MAX_VALUE;
    			//	alert("Time! match.reLiveByEventEnd="+match.reLiveByEventEnd);
    			}else {
    				htlivesight.Time.reLiveMinute= match.event.list["_"+match.event.list.last].minute;
    			//	alert("relive by event end!");
    			}
    			
    		}catch(e){
    		//	alert("error time!:"+ e );
    		}
    	//	if (Time.reLiveMinute > 45 ) Time.reLiveMinute+=15;
    	}
    //	alert("m="+m+" Time.reLiveMinute="+Time.reLiveMinute);
    	if (m>htlivesight.Time.reLiveMinute && m>0)	m=htlivesight.Time.reLiveMinute;
 //   	alert("noWhistleTime="+noWhistleTime+" Time.noWhistleTime"+Time.noWhistleTime
  //  			+" Time.whistleTime="+Time.whistleTime);
    
    	
    	
   //    	alert("m="+m);
            
    };

    // re live time end adding by bigpapy
    // sounds of beginning first half and second half. (added by bigpapy)
    if((m==0 || m==60)&&((now-htlivesight.Time.whistleTime)>noWhistleTime)){
    	 if (htlivesight.prefs.personalization.whistleTime &&
    			 htlivesight.prefs.notification.sound &&
    			 !htlivesight.Match.List["_"+match.id+"_"+match.youth].window.mute) {
    		 try{
    	        if (!htlivesight.prefs.notification.soundOnlyOpened
    	        || document.getElementById("live_"+match.id+"_"+match.youth).hidden==false) {
    	        	htlivesight.Sound.sample.beginning.play();
    	        	htlivesight.Time.whistleTime=0+now;
    	        	}
    	        }catch(e){}
    	 }
    } // sounds of beginning first half and second half (end). (added by bigpapy)
 //   alert("before return");
    if(m <= 45) return "" + m + /*strings.getString("time.min")*/htlivesight.Util.Parse("TimeMin",data[0]) + " " + /*strings.getString("time.first_half")*/htlivesight.Util.Parse("TimeFirstHalf",data[0]);
    if(!(htlivesight.prefs.other.reLive && htlivesight.prefs.other.reLiveByEvent && m==htlivesight.Time.reLiveMinute) && m < 59) return /*strings.getString("time.half_time")*/htlivesight.Util.Parse("TimeHalfTime",data[0]) + ". " + /*strings.getString("time.second_half")*/htlivesight.Util.Parse("TimeSecondHalf",data[0]) + " "+ /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + (60-m) + " " + /*strings.getString("time.minutes")*/htlivesight.Util.Parse("TimeMinutes",data[0]);
    if(!(htlivesight.prefs.other.reLive && htlivesight.prefs.other.reLiveByEvent && m==htlivesight.Time.reLiveMinute) && m == 59) return /*strings.getString("time.half_time")*/htlivesight.Util.Parse("TimeHalfTime",data[0]) + ". " + /*strings.getString("time.second_half")*/htlivesight.Util.Parse("TimeSecondHalf",data[0]) + " "+ /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",data[0]) + " " + (60-m) + " " + /*strings.getString("time.minute")*/htlivesight.Util.Parse("TimeMinute",data[0]);
    if(!(htlivesight.prefs.other.reLive && htlivesight.prefs.other.reLiveByEvent && m==htlivesight.Time.reLiveMinute)) m = m-15; // second half
    if(m <= 90) return "" + m + /*strings.getString("time.min")*/htlivesight.Util.Parse("TimeMin",data[0]) + " " + /*strings.getString("time.second_half")*/htlivesight.Util.Parse("TimeSecondHalf",data[0]);
    // extra time
    if(m <= 120) return "" + m + /*strings.getString("time.min")*/htlivesight.Util.Parse("TimeMin",data[0]) + " " + /*strings.getString("time.extra_time")*/htlivesight.Util.Parse("TimeExtraTime",data[0]);
    return /*strings.getString("time.penalties")*/htlivesight.Util.Parse("TimePenalties",data[0]);
  }
};

htlivesight.Time.SECOND=1000;
htlivesight.Time.MINUTE=htlivesight.Time.SECOND*60;
htlivesight.Time.HOUR=htlivesight.Time.MINUTE*60;
htlivesight.Time.DAY=htlivesight.Time.HOUR*24;



