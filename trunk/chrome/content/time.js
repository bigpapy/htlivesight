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
			htlivesight.Time.hattrickDiffTime = hattrickTime - now;
		},
		formatDate: function(date) {
			return date.toLocaleString();
		},
		shortDateString: function(date){
			var dateString = date.toLocaleString();
			var datePart = dateString.split(":");
			return datePart[0]+":"+datePart[1];
		},
		parseFetchDate: function (response) {
			return htlivesight.Time.parseDate(htlivesight.Util.Parse("FetchedDate", response));
		},
		parseDate: function(str) {
			var reg1 = new RegExp(/(\d*)-(\d*)-(\d*).*/);
			var reg2 = new RegExp(/.*? (\d*):(\d*):(\d*)/);
			var f;
			var date = new Date();
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
			if (match.isFinish) {
				match.nextEventTime=new Date();
				match.nextEventTime.setDate(match.nextEventTime.getDate()+7);
				return htlivesight.Util.Parse("TimeFinish",htlivesight.data[0]);
			};
			var startTime = match.date;
			var time = htlivesight.Time.hattrickTime - startTime; // time difference in miliseconds
			var now = new Date();
			var noWhistleTime=htlivesight.Time.noWhistleTime;
			if (time<0) {
				var seconds = Math.round(Math.abs(time)/1000); // time to go in seconds
				var minutes = Math.round(seconds/60); // time to go in minutes
				var hours = Math.round(minutes/60); // time to go in hours
				var days = Math.round(hours/24); // time to go in days
				// next event time (next update):
				// if match isn't started next update will be at match start.
				match.nextEventTime= new Date(match.date);
				if (days > 1) 
					return htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + days + " " + htlivesight.Util.Parse("TimeDays",htlivesight.data[0]); 
				if (days > 0) 
					return htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + days + " " + htlivesight.Util.Parse("TimeDay",htlivesight.data[0]); 
				if (hours > 1)
					return htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + hours + " " + htlivesight.Util.Parse("TimeHours",htlivesight.data[0]); 
				if (hours > 0)
					return htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + hours + " " + htlivesight.Util.Parse("TimeHour",htlivesight.data[0]); 
				if (minutes > 1)
					return htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + minutes + " " + htlivesight.Util.Parse("TimeMinutes",htlivesight.data[0]); 
				return htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + minutes + " " + htlivesight.Util.Parse("TimeMinute",htlivesight.data[0]); 
			};
			var seconds = Math.round(time/1000); // time elapsed in seconds
			var minutes = Math.round(seconds/60); // time elapsed in minutes
			var m = minutes; // first half
			if(htlivesight.prefs.other.reLive){
				noWhistleTime=htlivesight.Time.noWhistleTime/htlivesight.prefs.other.reLiveSpeed+htlivesight.prefs.other.reLiveSpeed*100;
				if(htlivesight.prefs.other.reLiveByEvent){
					try{
						if (match.reLiveByEventEnd){
							htlivesight.Time.reLiveMinute=Number.MAX_VALUE;
						}else {
							htlivesight.Time.reLiveMinute= match.event.list["_"+match.event.list.last].minute;
						}
					}catch(e){
						//	alert("error time!:"+ e );
					}
				}
				if (m>htlivesight.Time.reLiveMinute && m>0)	m=htlivesight.Time.reLiveMinute;
			};
			// sounds of beginning first half and second half. (added by bigpapy)
			//var temp= now-htlivesight.Time.whistleTime;
			//console.log("now - htlivesight.Time.whistleTime = "+temp+ " htlivesight.Time.whistleTime = "+htlivesight.Time.whistleTime+" noWhistleTime = " + noWhistleTime);	
			if((m==0 || m==60)&&((now-htlivesight.Time.whistleTime)> Math.max(noWhistleTime,60000)) && (htlivesight.Live.relivePlay||!htlivesight.Live.whistleBeginFirstHalfPlayed||!htlivesight.prefs.other.reLive)){
				//console.log("beginning half time: passed first if");
				if (htlivesight.prefs.personalization.whistleTime &&
						htlivesight.prefs.notification.sound &&
						!htlivesight.Match.List["_"+match.id+"_"+match.sourceSystem].window.mute) {
					//console.log("beginning half time: passed second if");
					try{
						if (!htlivesight.prefs.notification.soundOnlyOpened
								|| document.getElementById("live_"+match.id+"_"+match.sourceSystem).hidden==false) {
							//console.log("beginning half time: passed third if");
							htlivesight.Sound.sample.beginning.play();
							htlivesight.Time.whistleTime=0-(0-now);
							htlivesight.Live.whistleBeginFirstHalfPlayed=true;
						}
					}catch(e){}
				}
			} // sounds of beginning first half and second half (end). (added by bigpapy)
			if(m <= 45) return "" + m +htlivesight.Util.Parse("TimeMin",htlivesight.data[0]) + " " + htlivesight.Util.Parse("TimeFirstHalf",htlivesight.data[0]);
			if(!(htlivesight.prefs.other.reLive && htlivesight.prefs.other.reLiveByEvent && m==htlivesight.Time.reLiveMinute) && m < 59) return htlivesight.Util.Parse("TimeHalfTime",htlivesight.data[0]) + ". " + /*strings.getString("time.second_half")*/htlivesight.Util.Parse("TimeSecondHalf",htlivesight.data[0]) + " "+ /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + (60-m) + " " +htlivesight.Util.Parse("TimeMinutes",htlivesight.data[0]);
			if(!(htlivesight.prefs.other.reLive && htlivesight.prefs.other.reLiveByEvent && m==htlivesight.Time.reLiveMinute) && m == 59) return /*strings.getString("time.half_time")*/htlivesight.Util.Parse("TimeHalfTime",htlivesight.data[0]) + ". " + /*strings.getString("time.second_half")*/htlivesight.Util.Parse("TimeSecondHalf",htlivesight.data[0]) + " "+ /*strings.getString("time.starts_in")*/htlivesight.Util.Parse("TimeStartsIn",htlivesight.data[0]) + " " + (60-m) + " " + htlivesight.Util.Parse("TimeMinute",htlivesight.data[0]);
			if(!(htlivesight.prefs.other.reLive && htlivesight.prefs.other.reLiveByEvent && m==htlivesight.Time.reLiveMinute)) m = m-15; // second half
			if(m <= 90) return "" + m + htlivesight.Util.Parse("TimeMin",htlivesight.data[0]) + " " + htlivesight.Util.Parse("TimeSecondHalf",htlivesight.data[0]);
			// extra time
			if(m <= 120) return "" + m + htlivesight.Util.Parse("TimeMin",htlivesight.data[0]) + " " + htlivesight.Util.Parse("TimeExtraTime",htlivesight.data[0]);
			return htlivesight.Util.Parse("TimePenalties",htlivesight.data[0]);
		}
};
htlivesight.Time.SECOND=1000;
htlivesight.Time.MINUTE=htlivesight.Time.SECOND*60;
htlivesight.Time.HOUR=htlivesight.Time.MINUTE*60;
htlivesight.Time.DAY=htlivesight.Time.HOUR*24;