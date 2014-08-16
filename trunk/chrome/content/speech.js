htlivesight.Speech={
		eventList :[],
		speeching: false,
		lang: "",
		tts: null,
		add: function(event) {
			if (!event || !event.text) return;
			this.eventList.push(event);
		},
		eventspeeching: function(){
		    var length, text, text1, event, msg;
		    if (this.lang === ""){this.lang = this.language();}
		    console.log(this.lang);
		    length = htlivesight.Speech.eventList.length;
		    if (length === 0){ return; }
		    if (!this.tts) {this.tts = new GoogleTTS(this.lang);}
		    var match = htlivesight.Speech.eventList[0].match;
		    while(!htlivesight.Match.List[ "_" + match.id + "_" + match.sourceSystem].window.speech || document.getElementById("live_" + match.id + "_" + match.sourceSystem).hidden === true ){
			htlivesight.Speech.eventList.shift();
			if(htlivesight.Speech.eventList.length < 1){return;}
			match = htlivesight.Speech.eventList[0].match;
		    }
//		    if(htlivesight.platform === "Chrome" && chrome && chrome.tts){
//		    chrome.tts.isSpeaking(function(speaking){
//		    console.log("into not speaking: ");
//		    event = htlivesight.Speech.eventList.shift();
//		    text = event.text;
//		    text = htlivesight.Util.CleanText(text);
//		    text = text.replace(/\(\d{2,3}\)\s*/,"");
//		    if (text.length > 250){
//		    text = htlivesight.Speech.splittingEvent(text);
//		    text1 = text.slice(0,199);
//		    event.text = text.slice(200);
//		    htlivesight.Speech.eventList.unshift(event);
//		    text = text1;
//		    console.log("text splitted!! lenght = " + text.length);
//		    }				

//		    chrome.tts.speak(text, {'lang': htlivesight.Speech.lang, 'rate': 1.1, 'enqueue': true},function() {
//		    htlivesight.Speech.eventspeeching();
//		    if (chrome.runtime.lastError) {
//		    console.log('Error: ' + chrome.runtime.lastError.message);
//		    }
//		    });
//		    });
		    if('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window && this.isChrome()){ // if HTML5 TTS is supported use it
			event = htlivesight.Speech.eventList.shift();
			text = htlivesight.Speech.getCleanText(event);
			if(!text){return;}
			if (text.length > 220){	// it seems that text over 220 chars will freeze HTML5 TTS on Google Chrome
			    text = htlivesight.Speech.splittingEvent(text);
			    text1 = text.slice(0,199);
			    event.text = text.slice(200);
			    htlivesight.Speech.eventList.unshift(event);
			    text = text1;
			}
			msg = new SpeechSynthesisUtterance(text);
			msg.lang = htlivesight.Speech.lang;
			if(htlivesight.platform !== "Safari"){msg.rate = 1.1;}
			msg.volume = $( "#volume_slider" ).slider( "value" )/100;
			if(msg.onerror){
			    msg.onerror = function(e){ console.log("Error in HTML5 Text to speech: "+e); };
			};
			msg.onend = function(e){console.log("[htlivesight:Trace] Event speeched with HTML5 TTS"); };
			console.log("[htlivesight:Trace] Event to speech with HTML5 TTS: "+text);
			window.speechSynthesis.speak(msg);
			htlivesight.Speech.eventspeeching();
		    }else{	// otherwise use Google TTS library.
			if(!htlivesight.Speech.speeching){
			    event = htlivesight.Speech.eventList.shift();
			    text = htlivesight.Speech.getCleanText(event);
			    if(!text){return;}
			    htlivesight.Speech.speeching = true;
			    console.log("Event to speech with google-TTS: " + text);
			    this.tts.play(this.splittingEvent(text), '',function(err){
				if(err){
				    console.log("Event to speech with google-TTS error: "+ err);
				}else{
				    console.log("[htlivesight:Trace] Event speeched");
				}
				htlivesight.Speech.speeching = false;
				htlivesight.Speech.eventspeeching();
			    });
			};
		    };
		},
		getCleanText: function(event){
		    var text;
		    //event = htlivesight.Speech.eventList.shift();
		    if(!event){ return ""; };
		    text = event.text;
		    text = htlivesight.Util.CleanText(text);
		    text = text.replace(/\(\d{2,3}\)\s*/,"");
		    return text;
		},		// link for languages: https://code.google.com/p/jgoogletexttospeech/
		isChrome: function(){
		    for (i in window.navigator.plugins) {
			    if (window.navigator.plugins[i].name === "Chrome PDF Viewer") {
			        return true;
			    }
			}
		    return false
		},
		language: function(){
			//console.log(htlivesight.prefs.language.locale);
			switch (htlivesight.prefs.language.locale) {
			case "A-I/ara":
				return "AR";	//Arabic
				break;
			case "A-I/aze":
				return "AZ";	//Azerbaijani
				break;
			case "A-I/bel":
				return "BE";	//Belarusian
				break;
			case "A-I/bos":
				return "BS";	//Bosnian
				break;
			case "A-I/bul":
				return "BG";	//Bulgarian
				break;
			case "A-I/cat":
				return "CA";	//Catalan
				break;
			case "A-I/ces":
				return "CS";	//Czech
				break;
			case "A-I/dan":
				return "DA";	//Danish
				break;
			case "A-I/ell":
				return "EL";	//Greek
				break;
			case "A-I/en": 
				return "EN";	//English
				break;
			case "A-I/en-US": 
				return "EN";	//English
				break;
			case "A-I/est":		
				return "ET";	//Estonian
				break;
			case "A-I/eus":
				return "EU";	//Basque
				break;
			case "A-I/fas":
				return "FA";	//Persian
				break;
			case "A-I/fin":
				return "FI";	//Finnish
				break;
			case "A-I/fra": 
				return "FR";	//French
				break;
			case "A-I/fry":
				return "FY";  //Frisian
				break;
			case "A-I/fur":
				return "IT";	//Furlan
				break;
			case "A-I/ger":
				return "DE";	//German
				break;
			case "A-I/glg":
				return "GL";	//Galician
				break;
			case "A-I/heb":
				return "IW";	//Hebrew
				break;
			case "A-I/hrv":
				return "HR";	//Croatian
				break;
			case "A-I/hun":
				return "HU";	//Hungarian
				break;
			case "A-I/ind":
				return "ID";	//Indonesian
				break;
			case "A-I/isl":
				return "IS";	//Icelandic
				break;
			case "A-I/ita": 
				return "it-IT";	//Italian
				break;
			case "J-Z/jpn":
				return "JA";	//Japanese
				break;
			case "J-Z/kat":
				return "KA";	//Georgian
				break;
			case "J-Z/kor":
				return "KO";	//Korean
				break;
			case "J-Z/lav":
				return "LV";	//Latvian
				break;
			case "J-Z/lit":
				return "LT";	//Lithuanian
				break;
			case "J-Z/ltz":
				return "FR";	//Luxembourgish
				break;
			case "J-Z/mkd":
				return "MK";	//Macedonian
				break;
			case "J-Z/mlt":
				return "MT";	//Maltese
				break;
			case "J-Z/nld":
				return "NL";	//Dutch
				break;
			case "J-Z/nno":
				return "NN";	//Norwegian (Nynorsk)
				break;
			case "J-Z/nob":
				return "NB";	//Norwegian
				break;
			case "J-Z/pol":
				return "PL";	//Polish
				break;
			case "J-Z/por-br":
				return "pt-BR";	//Portuguese (Brazil)
				break;
			case "J-Z/por":
				return "pt-PT";	//Portuguese (Portugal)
				break;
			case "J-Z/ron":
				return "RO";	//Romanian
				break;
			case "J-Z/rus":
				return "RU";	//Russian
				break;
			case "J-Z/slk":
				return "SK";	//Slovak
				break;
			case "J-Z/slv":
				return "SL";	//Slovenian
				break;
			case "J-Z/spa-ca":
				return "ES";	//Spanish
				break;
			case "J-Z/spa-su":
				return "ES";	//Spanish
				break;
			case "J-Z/spa":
				return "ES";	//Spanish
				break;
			case "J-Z/sqi":
				return "SQ";	//Albanian
				break;
			case "J-Z/srp":
				return "SR";	//Serbian	
				break;
			case "J-Z/swe":
				return "SV";	//Swedish
				break;
			case "J-Z/tur":
				return "TR";	//Turkish	
				break;
			case "J-Z/ukr":
				return "UK";	//Ukrainian
				break;
			case "J-Z/vie":
				return "VI";	//Vietnamese
				break;
			case "J-Z/vls":
				return "NL";	//Vlaams
				break;
			case "J-Z/zho":
				return "zh-CN";	//Chinese (Simplified)
				break;

				// TODO add all the other languages.
			default: return "EN";
			break;
			}

		},
		/*SPlittingEvent(text): it split the text in subprhases shorter than 100 chars without cutting words,
		 * after they are extended to 100 chars adding spaces and in the end they are joined together.
		 * This is because of googleTTS which splits strings in substrings of 100 chars without respecting words. adding spaces
		 * in the text avoid the cutting of words, respecting them
		 * The text with added spaces is returned.
		 */
		splittingEvent: function(text){
			var textSplitted = [];
			var subtext, lastSpacePosition, subphrase;
			while(text.length > 100){
				subtext = text.slice(0,99);
				lastSpacePosition = subtext.lastIndexOf(" ");
				subphrase = text.slice(0,lastSpacePosition);
				while (subphrase.length < 100){
					subphrase = subphrase + " ";
				}
				textSplitted.push(subphrase);
				text = text.slice(lastSpacePosition+1);
			}
			textSplitted.push(text);
			return textSplitted.join("");
		}
};