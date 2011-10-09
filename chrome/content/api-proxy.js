/**
 * api-proxy.js
 * Contains function to get authorization and XML data from Hattrick
 */

if (!Htlivesight) var Htlivesight = {};

Htlivesight.ApiProxy = {


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
		return Htlivesight.ApiProxy.getAccessToken(teamId)
			&& Htlivesight.ApiProxy.getAccessTokenSecret(teamId);
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
			consumerSecret : Htlivesight.ApiProxy.consumerSecret,
			tokenSecret : null
		};
		var msg = {
			action : Htlivesight.ApiProxy.requestTokenUrl,
			method : "get",
			parameters : [
				["oauth_consumer_key", Htlivesight.ApiProxy.consumerKey],
				["oauth_signature_method", Htlivesight.ApiProxy.signatureMethod],
				["oauth_signature", ""],
				["oauth_timestamp", ""],
				["oauth_nonce", ""],
				["oauth_callback", "oob"] // no callback
			]
		};
		Htlivesight.OAuth.setTimestampAndNonce(msg);
		Htlivesight.OAuth.SignatureMethod.sign(msg, accessor);
		var requestTokenUrl = Htlivesight.OAuth.addToURL(Htlivesight.ApiProxy.requestTokenUrl, msg.parameters);
		dump("Requesting token at: " + requestTokenUrl + "\n");
		Htlivesight.load(requestTokenUrl, function(text, status) {
				if (status != 200) {
					// failed to fetch link
					alert("status: "+ status);
					return;
				}
				var requestToken = text.split(/&/)[0].split(/=/)[1];
				var requestTokenSecret = text.split(/&/)[1].split(/=/)[1];
				
				// internationalization: get local file content.
				var strbundle = document.getElementById("stringsauthorize");
				// get introduction message
				var introduction=strbundle.getString("introduction");
				// show it
				alert(introduction);

				// open a new tab of the chpp page to get the authorization code
				chppPage=window.open(Htlivesight.ApiProxy.authorizeUrl + "?" + text );
				
				// when clicking on this tab continue
				window.addEventListener("focus", function(ev) {
					
					//ask the auth code to user and get it only once
					if (firstTime){				
						var insert=strbundle.getString("insert");
						var oauthVerifier = prompt(insert,"");
						firstTime=false;
					};
					var accessor = {
						consumerSecret : Htlivesight.ApiProxy.consumerSecret,
						tokenSecret : requestTokenSecret
					};
					var msg = {
						action : Htlivesight.ApiProxy.accessTokenUrl,
						method : "get",
						parameters : [
							["oauth_consumer_key", Htlivesight.ApiProxy.consumerKey],
							["oauth_token", requestToken],
							["oauth_signature_method", Htlivesight.ApiProxy.signatureMethod],
							["oauth_signature", ""],
							["oauth_timestamp", ""],
							["oauth_nonce", ""],
							["oauth_verifier", oauthVerifier]
						]
					};
					Htlivesight.OAuth.setTimestampAndNonce(msg);
					Htlivesight.OAuth.SignatureMethod.sign(msg, accessor);
					var query = Htlivesight.OAuth.formEncode(msg.parameters);
					var accessTokenUrl = Htlivesight.ApiProxy.accessTokenUrl + "?" + query;
					dump("Requesting access token at: " + accessTokenUrl + "\n");
					Htlivesight.load(accessTokenUrl, function(text) {
						var accessToken = text.split(/&/)[0].split(/=/)[1];
						var accessTokenSecret = text.split(/&/)[1].split(/=/)[1];
						
						// save access Token
						Htlivesight.ApiProxy.setAccessToken(accessToken,teamId);

						// save access Token Secret
						Htlivesight.ApiProxy.setAccessTokenSecret(accessTokenSecret,teamId);

						//internationalization: get string for ending authorization
						var ending=strbundle.getString("ending");
						
						// showing ending message
						alert(ending);
						
						chppPage.close();// close CHPP pages
						document.location.reload();//reload HTLS
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
		var strbundle = document.getElementById("stringsauthorize");
		var teamId = document.getElementById("teamId").value;
		if (!Htlivesight.ApiProxy.authorized(teamId)) { // if not authorized...
			dump("ApiProxy: unauthorized.\n");
			Htlivesight.ApiProxy.authorize(doc); // ...get authorization
			callback(null);
			return;
		}
		var accessor = {
			consumerSecret : Htlivesight.ApiProxy.consumerSecret,
			tokenSecret : Htlivesight.ApiProxy.getAccessTokenSecret(teamId)
		};
		var msg = {
			action : Htlivesight.ApiProxy.resourceUrl,
			method : "get",
			parameters : parameters
		};
		Htlivesight.OAuth.setParameters(msg, [
			["oauth_consumer_key", Htlivesight.ApiProxy.consumerKey],
			["oauth_token", Htlivesight.ApiProxy.getAccessToken(teamId)],
			["oauth_signature_method", Htlivesight.ApiProxy.signatureMethod],
			["oauth_signature", ""],
			["oauth_timestamp", ""],
			["oauth_nonce", ""],
		]);
		Htlivesight.OAuth.setTimestampAndNonce(msg);
		Htlivesight.OAuth.SignatureMethod.sign(msg, accessor);
		var url = Htlivesight.OAuth.addToURL(Htlivesight.ApiProxy.resourceUrl, msg.parameters);
		dump("Fetching XML data from " + url + "\n");
		Htlivesight.loadXml(url, function(x, status) {
			switch (status){
			
			case 0:	// error: not connected to internet
						var serverOFF=strbundle.getString("serverOFF");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error0=strbundle.getString("error0");//i13n: get local string
						alert(error0);//show local error message
						callback(null);
						break;
			
			case 200: // no error
						var serverON=strbundle.getString("serverON");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverON);//update server status in menu
						callback(x);
						break;

			case 401: // error: not authorized	
						dump("ApiProxy: error 401, unauthorized. Arguments: " + parameters + ".\n");
						var error401=strbundle.getString("error401"); //i13n: get local string
						alert(error401);// show local error message
						Htlivesight.ApiProxy.invalidateAccessToken(teamId);//delete access token
						var serverOFF=strbundle.getString("serverOFF");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF); //update server status in menu
						Htlivesight.ApiProxy.authorize(doc);// start authorize
						callback(null);
						break;
		
			
			case 404: // error: requested resource not found
						var serverOFF=strbundle.getString("serverOFF");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error404=strbundle.getString("error404");//i13n: get local string
						alert(error404);//show local error message
						callback(null);
						break;
						
									
			case 500:	// error: not connected to internet
						var serverOFF=strbundle.getString("serverOFF");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error500=strbundle.getString("error500");//i13n: get local string
						alert(error500);//show local error message
						callback(null);
						break;
						
			case 503:	// error: not connected to internet
						var serverOFF=strbundle.getString("serverOFF");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
						var error503=strbundle.getString("error503");//i13n: get local string
						alert(error503);//show local error message
						callback(null);
						break;
						
			default	:	// all the others errors.
						dump("ApiProxy: error " + status + ". Arguments: " + parameters + "\n");
						var serverOFF=strbundle.getString("serverOFF");//i13n: get local string
						htlivesight.DOM.addServerToPopup(serverOFF); //update server status in menu
						var error=strbundle.getString("error");//i13n: get local string
						alert(error+":"+status);//show local error message
						callback(null);
			
						}
		}, true);
	},

	invalidateAccessToken : function(teamId) { // cancel access token and access token secret
		Htlivesight.ApiProxy.setAccessToken("",teamId);
		Htlivesight.ApiProxy.setAccessTokenSecret("",teamId);
	},

	getAccessToken : function(teamId) { // load access token 
		return HtlivesightPrefs.getString("oauth." + teamId + ".accessToken");
	},

	setAccessToken : function(token,teamId) { // save access token
		HtlivesightPrefs.setString("oauth." + teamId + ".accessToken", token);
	},

	getAccessTokenSecret : function(teamId) { // load access token secret
		return HtlivesightPrefs.getString("oauth." + teamId + ".accessTokenSecret");
	},

	setAccessTokenSecret : function(secret,teamId) { // save access token secret
	HtlivesightPrefs.setString("oauth." + teamId + ".accessTokenSecret", secret);
	},
};
