/**
 * api-proxy.js
 * Contains function to get authorization and XML data from Hattrick
 */

if (!htlivesight) var htlivesight = {};

htlivesight.ApiProxy = {


	consumerKey   : "vALLKFL56ChUPnJhUAUzPs",
	consumerSecret: "B2HURg3LZJy9XObgPbAnPiSytbm1Bv49IW9cwCeuYfO",

	signatureMethod : "HMAC-SHA1",
	requestTokenUrl : "https://chpp.hattrick.org/oauth/request_token.ashx",
	authorizeUrl : "https://chpp.hattrick.org/oauth/authorize.aspx",
	accessTokenUrl : "https://chpp.hattrick.org/oauth/access_token.ashx",
	resourceUrl : "http://chpp.hattrick.org/chppxml.ashx",

	/**
	 * authorized: verify if HTLS is already authorized.
	 * returning a boolean result of the expression which verify if both token and
	 * tokensecret are saved.
	 */
	
	authorized : function(teamId) { 
		return htlivesight.ApiProxy.getAccessToken(teamId)
			&& htlivesight.ApiProxy.getAccessTokenSecret(teamId);
	},

	
	/**
	 * authorize: get authorization for HTLS
	 * Open a new tab and after user gets the auth code it open a form to get and save it.
	 * After that it close the chpp page and restart.
	 */	
	
	authorize : function(doc) {
		var firstTime = true;
		var teamId =""+document.getElementById("teamId").value;// get teamId from initial form
		var accessor = {
			consumerSecret : htlivesight.ApiProxy.consumerSecret,
			tokenSecret : null
		};
		var msg = {
			action : htlivesight.ApiProxy.requestTokenUrl,
			method : "get",
			parameters : [
				["oauth_consumer_key", htlivesight.ApiProxy.consumerKey],
				["oauth_signature_method", htlivesight.ApiProxy.signatureMethod],
				["oauth_signature", ""],
				["oauth_timestamp", ""],
				["oauth_nonce", ""],
				["oauth_callback", "oob"] // no callback
			]
		};
		htlivesight.OAuth.setTimestampAndNonce(msg);
		htlivesight.OAuth.SignatureMethod.sign(msg, accessor);
		var requestTokenUrl = htlivesight.OAuth.addToURL(htlivesight.ApiProxy.requestTokenUrl, msg.parameters);
		dump("Requesting token at: " + requestTokenUrl + "\n");
		htlivesight.load(requestTokenUrl, function(text, status) {
				if (status != 200) {
					// failed to fetch link
					alert("status: "+ status);
					return;
				}
				var requestToken = text.split(/&/)[0].split(/=/)[1];
				var requestTokenSecret = text.split(/&/)[1].split(/=/)[1];
				
				// internationalization: get local file content.
			//	var strbundle = document.getElementById("stringsauthorize");
				// new localization begin
	//			alert("before prefs (authorize)");
				  prefs=htlivesight.Preferences.get();
			//		alert("prefs.language.locale= "+ prefs.language.locale);
					url = htlivesightEnv.contentPath+"locale/"+ prefs.language.locale +".xml";
			//		alert("url"+ url);


				languageXML = htlivesight.loadXml(url);

				data=languageXML.getElementsByTagName("Htlivesight");

				// new localization end
				
				// get introduction message
				var introduction=/*strbundle.getString("introduction")*/htlivesight.Util.Parse("Introduction",data[0]);
				// show it
				alert(introduction);

				// open a new tab of the chpp page to get the authorization code
				chppPage=window.open(htlivesight.ApiProxy.authorizeUrl + "?" + text );
				
				// when clicking on this tab continue
				window.addEventListener("focus", function(ev) {
					
					//ask the auth code to user and get it only once
					if (firstTime){
						firstTime=false;				
						var insert=/*strbundle.getString("insert")*/htlivesight.Util.Parse("Insert",data[0]);
						var oauthVerifier = prompt(insert,"");
						
					};
					var accessor = {
						consumerSecret : htlivesight.ApiProxy.consumerSecret,
						tokenSecret : requestTokenSecret
					};
					var msg = {
						action : htlivesight.ApiProxy.accessTokenUrl,
						method : "get",
						parameters : [
							["oauth_consumer_key", htlivesight.ApiProxy.consumerKey],
							["oauth_token", requestToken],
							["oauth_signature_method", htlivesight.ApiProxy.signatureMethod],
							["oauth_signature", ""],
							["oauth_timestamp", ""],
							["oauth_nonce", ""],
							["oauth_verifier", oauthVerifier]
						]
					};
					htlivesight.OAuth.setTimestampAndNonce(msg);
					htlivesight.OAuth.SignatureMethod.sign(msg, accessor);
					var query = htlivesight.OAuth.formEncode(msg.parameters);
					var accessTokenUrl = htlivesight.ApiProxy.accessTokenUrl + "?" + query;
					dump("Requesting access token at: " + accessTokenUrl + "\n");
					
					htlivesight.load(accessTokenUrl, function(text) {
						
						try{// added because of error not influent to the target of the function
							var accessToken = text.split(/&/)[0].split(/=/)[1];
							var accessTokenSecret = text.split(/&/)[1].split(/=/)[1];
						
							// save access Token
							htlivesight.ApiProxy.setAccessToken(accessToken,teamId);

							// save access Token Secret
							htlivesight.ApiProxy.setAccessTokenSecret(accessTokenSecret,teamId);

							//internationalization: get string for ending authorization
							var ending=/*strbundle.getString("ending")*/htlivesight.Util.Parse("Ending",data[0]);;
						
							// showing ending message
							alert(ending);
						
							chppPage.close();// close CHPP pages
							document.location.reload();//reload HTLS
						}catch(e){};
						}, true);
				}, false);

			}, true);
	},

	
	/**
	 * retrieve: get XML file for HTLS.
	 * It not authorized redirect to authorize, else get XML file from chpp.
	 * It shows error messages and update the server status in the right click menu
	 */	
	
	retrieve : function(doc, parameters, callback) {
		dump("ApiProxy: attempting to retrieve: " + parameters + "…\n");
	//	var strbundle = document.getElementById("stringsauthorize");
		// adding new localization file
	//	console.log("before prefs retrieve");
		  prefs=htlivesight.Preferences.get();
	//	  console.log("prefs.language.locale= "+ prefs.language.locale);
			url = htlivesightEnv.contentPath+"locale/"+ prefs.language.locale +".xml";
	//		console.log("url"+ url);

		languageXML = htlivesight.loadXml(url);

		data=languageXML.getElementsByTagName("Htlivesight");
		// end adding new localization files
		
		var teamId = document.getElementById("teamId").value;
	//	console.log("teamId "+ teamId);
		if (!htlivesight.ApiProxy.authorized(teamId)) { // if not authorized...
			dump("ApiProxy: unauthorized.\n");
		//	console.log("ApiProxy: unauthorized.\n")
			htlivesight.ApiProxy.authorize(doc); // ...get authorization
			callback(null);
			return;
		}
		var accessor = {
			consumerSecret : htlivesight.ApiProxy.consumerSecret,
			tokenSecret : htlivesight.ApiProxy.getAccessTokenSecret(teamId)
		};
		var msg = {
			action : htlivesight.ApiProxy.resourceUrl,
			method : "get",
			parameters : parameters
		};
		htlivesight.OAuth.setParameters(msg, [
			["oauth_consumer_key", htlivesight.ApiProxy.consumerKey],
			["oauth_token", htlivesight.ApiProxy.getAccessToken(teamId)],
			["oauth_signature_method", htlivesight.ApiProxy.signatureMethod],
			["oauth_signature", ""],
			["oauth_timestamp", ""],
			["oauth_nonce", ""],
		]);
		htlivesight.OAuth.setTimestampAndNonce(msg);
		htlivesight.OAuth.SignatureMethod.sign(msg, accessor);
		var url = htlivesight.OAuth.addToURL(htlivesight.ApiProxy.resourceUrl, msg.parameters);
		dump("Fetching XML data from " + url + "\n");
	//	console.log("Fetching XML data from " + url + "\n");
		htlivesight.loadXml(url, function(x, status) {
	//		console.log("status "+ status);
			switch (status){
			
			case 0:	// error: not connected to internet
						var serverOFF=/*strbundle.getString("serverOFF")*/htlivesight.Util.Parse("ServerOFF",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error0=/*strbundle.getString("error0")*/htlivesight.Util.Parse("Error0",data[0]);//i13n: get local string
						alert(error0);//show local error message
						callback(null);
						break;
			
			case 200: // no error
						var serverON=/*strbundle.getString("serverON");*/htlivesight.Util.Parse("ServerON",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverON);//update server status in menu
						callback(x);
						break;

			case 401: // error: not authorized	
					//	dump("ApiProxy: error 401, unauthorized. Arguments: " + parameters + ".\n");
						var error401=/*strbundle.getString("error401")*/htlivesight.Util.Parse("Error401",data[0]); //i13n: get local string
						alert(error401);// show local error message
						htlivesight.ApiProxy.invalidateAccessToken(teamId);//delete access token
						var serverOFF=/*strbundle.getString("serverOFF")*/htlivesight.Util.Parse("ServerOFF",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF); //update server status in menu
						htlivesight.ApiProxy.authorize(doc);// start authorize
						callback(null);
						break;
		
			
			case 404: // error: requested resource not found
						var serverOFF=/*strbundle.getString("serverOFF")*/htlivesight.Util.Parse("ServerOFF",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error404=/*strbundle.getString("error404")*/htlivesight.Util.Parse("Error404",data[0]);//i13n: get local string
						alert(error404);//show local error message
						htlivesight.Live.safeLiveVersionEnabled=true;
						callback(null);
						break;
						
									
			case 500:	// error: not connected to internet
						var serverOFF=/*strbundle.getString("serverOFF")*/htlivesight.Util.Parse("ServerOFF",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error500=/*strbundle.getString("error500")*/htlivesight.Util.Parse("Error500",data[0]);//i13n: get local string
						alert(error500);//show local error message
						htlivesight.Live.safeLiveVersionEnabled=true;
						callback(null);
						break;
						
			case 503:	// error: not connected to internet
						var serverOFF=/*strbundle.getString("serverOFF")*/htlivesight.Util.Parse("ServerOFF",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error503=/*strbundle.getString("error503")*/htlivesight.Util.Parse("Error503",data[0]);//i13n: get local string
						alert(error503);//show local error message
						htlivesight.Live.safeLiveVersionEnabled=true;
						callback(null);
						break;
						
			default	:	// all the others errors.
				//		dump("ApiProxy: error " + status + ". Arguments: " + parameters + "\n");
						var serverOFF=/*strbundle.getString("serverOFF")*/htlivesight.Util.Parse("ServerOFF",data[0]);//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF); //update server status in menu
						var error=/*strbundle.getString("error")*/htlivesight.Util.Parse("Error",data[0]);//i13n: get local string
						alert(error+":"+status);//show local error message
						htlivesight.Live.safeLiveVersionEnabled=true;
						callback(null);
			
						}
		}, true);
	},

	invalidateAccessToken : function(teamId) { // cancel access token and access token secret
		htlivesight.ApiProxy.setAccessToken("",teamId);
		htlivesight.ApiProxy.setAccessTokenSecret("",teamId);
	},

	getAccessToken : function(teamId) { // load access token 
		return htlivesightPrefs.getString("oauth." + teamId + ".accessToken");
	},

	setAccessToken : function(token,teamId) { // save access token
		htlivesightPrefs.setString("oauth." + teamId + ".accessToken", token);
	},

	getAccessTokenSecret : function(teamId) { // load access token secret
		return htlivesightPrefs.getString("oauth." + teamId + ".accessTokenSecret");
	},

	setAccessTokenSecret : function(secret,teamId) { // save access token secret
	htlivesightPrefs.setString("oauth." + teamId + ".accessTokenSecret", secret);
	},
};
