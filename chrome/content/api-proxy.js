/**
 * api-proxy.js: Get authorization and XML data from Hattrick CHPP
 */

htlivesight.ApiProxy = {
	consumerKey : "vALLKFL56ChUPnJhUAUzPs",
	consumerSecret : "",
	signatureMethod : "HMAC-SHA1",
	requestTokenUrl : "https://chpp.hattrick.org/oauth/request_token.ashx",
	authorizeUrl : "https://chpp.hattrick.org/oauth/authorize.aspx",
	accessTokenUrl : "https://chpp.hattrick.org/oauth/access_token.ashx",
	resourceUrl : "http://chpp.hattrick.org/chppxml.ashx",

	/**
	 * authorized: verify if HTLS is already authorized.
	 * returning a boolean result of the expression which verify if both token and
	 * tokenSecret are saved.
	 */

	authorized : function(teamId) { 
	    return htlivesight.ApiProxy.getAccessToken(teamId)	&& htlivesight.ApiProxy.getAccessTokenSecret(teamId);
	},

	/**
	 * authorize: get authorization for HTLS.
	 * It opens a new tab and after user gets the auth code it opens a form to get and save it.
	 * After that it closes the chpp page and restarts.
	 */	

	authorize : function(doc) {
	    var firstTime = true;
	    var teamId =""+document.getElementById("teamId").value;
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
	    OAuth.setTimestampAndNonce(msg);
	    OAuth.SignatureMethod.sign(msg, accessor);
	    var requestTokenUrl = OAuth.addToURL(htlivesight.ApiProxy.requestTokenUrl, msg.parameters);
	    htlivesight.load(requestTokenUrl, function(text, status) {
		if (status != 200) { // failed to fetch link
		    alert("status: "+ status);
		    return;
		}
		var requestToken = text.split(/&/)[0].split(/=/)[1];
		var requestTokenSecret = text.split(/&/)[1].split(/=/)[1];
		var l10nData=htlivesight.data;
		var introduction=htlivesight.Util.Parse("Introduction",l10nData[0]);
		var chppPage="";
		alert(introduction);
		if (htlivesight.platform == "Chrome") {
		    chrome.tabs.create({url: htlivesight.ApiProxy.authorizeUrl + "?" + text});
		    //var chppPage=???;
		}else	if (htlivesight.platform == "Safari"){
		    //try{
		    //alert("1");
		    //var chppPage = safari.application.activeBrowserWindow.openTab(); // Open a new tab  
		    chppPage = safari.self.tab.dispatchMessage('openUrlInNewTab', htlivesight.ApiProxy.authorizeUrl + "?" + text);
		    //alert("2");
		    //chppPage.url = htlivesight.ApiProxy.authorizeUrl + "?" + text; // Set tab 
		    //alert("3");
		    //}catch(e){alert(e);}
		}else{
		    chppPage=window.open(htlivesight.ApiProxy.authorizeUrl + "?" + text);
		}
		// add a delay because it doesn't give time in chrome to open chpp authorization page.
		setTimeout(function(){
		    // when clicking on this tab continue
		    window.addEventListener("focus", function(ev) {
			//ask the auth code to user and get it only once
			if (firstTime){
			    firstTime=false;				
			    var insert=htlivesight.Util.Parse("Insert",l10nData[0]);
			    var oauthVerifier = prompt(insert,"");
			}
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
			OAuth.setTimestampAndNonce(msg);
			OAuth.SignatureMethod.sign(msg, accessor);
			var query = OAuth.formEncode(msg.parameters);
			var accessTokenUrl = htlivesight.ApiProxy.accessTokenUrl + "?" + query;
			htlivesight.load(accessTokenUrl, function(text) {
			    try{// added because of error not influent to the target of the function
				var accessToken = text.split(/&/)[0].split(/=/)[1];
				var accessTokenSecret = text.split(/&/)[1].split(/=/)[1];
				htlivesight.ApiProxy.setAccessToken(accessToken,teamId);
				htlivesight.ApiProxy.setAccessTokenSecret(accessTokenSecret,teamId);
				var ending=htlivesight.Util.Parse("Ending",l10nData[0]);
				alert(ending);
				chppPage.close();// close CHPP pages
				document.location.reload();//reload HTLS
			    }catch(e){}
			}, true);
		    }, false);
		},1000); // delay to set event listener (1s)
	    }, true);
	},

	/**
	 * retrieve: get XML file for HTLS.
	 * If not authorized redirect to authorize, else get XML file from chpp.
	 * It shows error messages and update the server status in the right click menu
	 */	

	retrieve : function(doc, parameters, callback) {
	    var serverOFF;
	    var l10nData= htlivesight.data;
	    var teamId = document.getElementById("teamId").value;
	    if (!htlivesight.ApiProxy.authorized(teamId)) { // if not authorized...
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
	    OAuth.setParameters(msg, [
                                                 ["oauth_consumer_key", htlivesight.ApiProxy.consumerKey],
                                                 ["oauth_token", htlivesight.ApiProxy.getAccessToken(teamId)],
                                                 ["oauth_signature_method", htlivesight.ApiProxy.signatureMethod],
                                                 ["oauth_signature", ""],
                                                 ["oauth_timestamp", ""],
                                                 ["oauth_nonce", ""],
                                                 ]);
	    OAuth.setTimestampAndNonce(msg);
	    OAuth.SignatureMethod.sign(msg, accessor);
	    var url = OAuth.addToURL(htlivesight.ApiProxy.resourceUrl, msg.parameters);
	    htlivesight.loadXml(url, function(x, status) {
		switch (status){

		case 0:	// error: not connected to internet
		    serverOFF=htlivesight.Util.Parse("ServerOFF",l10nData[0]);
		    htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
		    var error0=htlivesight.Util.Parse("Error0",l10nData[0]);
		    alert(error0);
		    callback(null);
		    break;

		case 200: // no error
		    var serverON=htlivesight.Util.Parse("ServerON",l10nData[0]);
		    htlivesight.DOM.addServerToPopup(serverON);//update server status in menu
		    //console.log("live updating="+htlivesight.Live.updating)
		    //console.log(parameters);
		    callback(x);
		    break;

		case 401: // error: not authorized	
		    var error401=htlivesight.Util.Parse("Error401",l10nData[0]);
		    alert(error401);
		    htlivesight.ApiProxy.invalidateAccessToken(teamId);//delete access token
		    serverOFF=htlivesight.Util.Parse("ServerOFF",l10nData[0]);
		    htlivesight.DOM.addServerToPopup(serverOFF); //update server status in menu
		    htlivesight.ApiProxy.authorize(doc);// start authorize
		    callback(null);
		    break;

		case 404: // error: requested resource not found
		    serverOFF=htlivesight.Util.Parse("ServerOFF",l10nData[0]);
		    htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
		    var error404=htlivesight.Util.Parse("Error404",l10nData[0]);
		    //console.log(parameters);
		    //console.log("live updating="+htlivesight.Live.updating);
		    //console.log(htlivesight.Live.lastShownIndexes);
		    alert(error404);//show local error message
		    htlivesight.Live.safeLiveVersionEnabled=true;
		    callback(null);
		    break;

		case 500:	// error: not connected to internet
		    serverOFF=htlivesight.Util.Parse("ServerOFF",l10nData[0]);
		    htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
		    var error500=htlivesight.Util.Parse("Error500",l10nData[0]);
		    alert(error500);
		    htlivesight.Live.safeLiveVersionEnabled=true;
		    callback(null);
		    break;

		case 503:	// error: not connected to internet
		    serverOFF=htlivesight.Util.Parse("ServerOFF",l10nData[0]);
		    htlivesight.DOM.addServerToPopup(serverOFF);//update server status in menu
		    var error503=htlivesight.Util.Parse("Error503",l10nData[0]);
		    alert(error503);
		    htlivesight.Live.safeLiveVersionEnabled=true;
		    callback(null);
		    break;

		default	:	// all the others errors.
		    serverOFF=htlivesight.Util.Parse("ServerOFF",l10nData[0]);
		htlivesight.DOM.addServerToPopup(serverOFF); //update server status in menu
		var error=htlivesight.Util.Parse("Error",l10nData[0]);
		alert(error+":"+status);
		htlivesight.Live.safeLiveVersionEnabled=true;
		callback(null);
		}
	    }, true);
	},

	invalidateAccessToken : function(teamId) {
	    htlivesight.ApiProxy.setAccessToken("",teamId);
	    htlivesight.ApiProxy.setAccessTokenSecret("",teamId);
	},

	getAccessToken : function(teamId) {
		var accessToken = htlivesightPrefs.getString("oauth." + teamId + ".accessToken");
		//console.log(accessToken)
		if (accessToken){
			htlivesightPrefs.setString("oauth." + teamId + ".t1", htlivesight.encrypt(accessToken));
			//delete window.localStorage["oauth." + teamId + ".accessToken"];
			htlivesightPrefs.delKey("oauth." + teamId + ".accessToken");
			//console.log("into if: "+ accessToken);
			return accessToken;
		}
		//console.log("decrypted: "+ htlivesight.decrypt(htlivesightPrefs.getString("oauth." + teamId + ".t1")));
		return htlivesight.decrypt(htlivesightPrefs.getString("oauth." + teamId + ".t1"));

	    //return htlivesightPrefs.getString("oauth." + teamId + ".accessToken");
	},

	setAccessToken : function(token,teamId) {
	    //htlivesightPrefs.setString("oauth." + teamId + ".accessToken", token);
	    htlivesightPrefs.setString("oauth." + teamId + ".t1", htlivesight.encrypt(token));
	},

	getAccessTokenSecret : function(teamId) {
		var accessTokenSecret = htlivesightPrefs.getString("oauth." + teamId + ".accessTokenSecret");
		if (accessTokenSecret){
			htlivesightPrefs.setString("oauth." + teamId + ".t2", htlivesight.encrypt(accessTokenSecret));
			//delete window.localStorage["oauth." + teamId + ".accessTokenSecret"];
			htlivesightPrefs.delKey("oauth." + teamId + ".accessTokenSecret");
			return accessTokenSecret
		}
		//console.log(htlivesight.decrypt(htlivesightPrefs.getString("oauth." + teamId + ".t2")));
		return htlivesight.decrypt(htlivesightPrefs.getString("oauth." + teamId + ".t2"));
	    //return htlivesightPrefs.getString("oauth." + teamId + ".accessTokenSecret");
	},

	setAccessTokenSecret : function(secret,teamId) {
	    //htlivesightPrefs.setString("oauth." + teamId + ".accessTokenSecret", secret);
		htlivesightPrefs.setString("oauth." + teamId + ".t2", htlivesight.encrypt(secret));
	},
};
