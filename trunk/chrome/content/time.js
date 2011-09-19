var Time = {
  SECOND: 0,
  MINUTE: 0,
  HOUR: 0,
  DAY: 0,
  hattrickTime: 0,
  hattrickDiffTime: 0,
  start: function(hattrickTime) {
    var now = new Date();
    Time.hattrickTime = hattrickTime;
    Time.hattrickDiffTime = hattrickTime - now;
  },
  formatDate: function(date) {
    return date.toLocaleString();
  },
  parseFetchDate: function (response) {
   //   return Time.parseDate(Util.Parse("<FetchedDate>(.*?)</FetchedDate>", response));
	  return Time.parseDate(Util.Parse("FetchedDate", response));
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
   
    var strings = document.getElementById("strings");
    if (match.isFinish) {
      return strings.getString("time.finish");
    };
  
    var startTime = match.date;
    var time = Time.hattrickTime - startTime; // time difference in miliseconds
  
    if (time<0) {
      var seconds = Math.round(Math.abs(time)/1000); // time to go in seconds
      var minutes = Math.round(seconds/60); // time to go in minutes
      var hours = Math.round(minutes/60); // time to go in hours
      var days = Math.round(hours/24); // time to go in days
  
      if (days > 1) 
        return strings.getString("time.starts_in") + " " + days + " " + strings.getString("time.days"); 
      if (days > 0) 
        return strings.getString("time.starts_in") + " " + days + " " + strings.getString("time.day"); 
      if (hours > 1)
        return strings.getString("time.starts_in") + " " + hours + " " + strings.getString("time.hours"); 
      if (hours > 0)
        return strings.getString("time.starts_in") + " " + hours + " " + strings.getString("time.hour"); 
      if (minutes > 1)
        return strings.getString("time.starts_in") + " " + minutes + " " + strings.getString("time.minutes"); 
      return strings.getString("time.starts_in") + " " + minutes + " " + strings.getString("time.minute"); 
    };
      
    var seconds = Math.round(time/1000); // time elapsed in seconds
    var minutes = Math.round(seconds/60); // time elapsed in minutes
   
    var m = minutes; // first half
    // sounds of beginning first half and second half. (added by bigpapy)
    if(m==0 || m==60){
    	 if (htlivesight.prefs.notification.sound) {
    	        if (!htlivesight.prefs.notification.soundOnlyOpened
    	            || document.getElementById("live_"+match.id+"_"+match.youth).hidden==false) {
    	        	htlivesight.Sound.sample.beginning.play();
    	        }
    	 }
    } // sounds of beginning first half and second half (end). (added by bigpapy)
    if(m <= 45) return "" + m + strings.getString("time.min") + " " + strings.getString("time.first_half");
    if(m < 59) return strings.getString("time.half_time") + ". " + strings.getString("time.second_half") + " "+ strings.getString("time.starts_in") + " " + (60-m) + " " + strings.getString("time.minutes");
    if(m == 59) return strings.getString("time.half_time") + ". " + strings.getString("time.second_half") + " "+ strings.getString("time.starts_in") + " " + (60-m) + " " + strings.getString("time.minute");
    m = minutes-15; // second half
    if(m <= 90) return "" + m + strings.getString("time.min") + " " + strings.getString("time.second_half");
    // extra time
    if(m <= 120) return "" + m + strings.getString("time.min") + " " + strings.getString("time.extra_time");
    return strings.getString("time.penalties");
  }
};

Time.SECOND=1000;
Time.MINUTE=Time.SECOND*60;
Time.HOUR=Time.MINUTE*60;
Time.DAY=Time.HOUR*24;



