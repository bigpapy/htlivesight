// function Util() {//};
/* ---------------------------------------------------
 * Array functions
 * --------------------------------------------------- */
Array.prototype.has = function (value) {
	var i=this.length;
  while(i--) {
		if (this[i] == value) {
			return true;
		}
	}
	return false;
};
Array.prototype.swap = function (i1, i2) {
	var tmp=this[i1];
  this[i1]=this[i2];
  this[i2]=tmp;
};

/* ---------------------------------------------------
 * String functions
 * --------------------------------------------------- */
htlivesight.Util = {
cleanTags : function(text) {
  var t = text;
 /* Util.temp = Util.temp.replace(/&amp;/g, "&");  // replacing &amp; breaks DOMParser*/
  t = t.replace(/&lt;/g, "<");
  t = t.replace(/&gt;/g, ">");
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/&nbsp;/g, "");
  t = t.replace(/<br>/gi, "<br />");
  t = t.replace(/<A /gi, "<a ");
  t = t.replace(/A>/gi, "a>");
  /*Util.temp = Util.temp.replace(/<.*?>/g,""); // remove tags*/
  return t;
},

CleanText : function(text) {
  var t = text;
  t = t.replace(/&amp;/g, "&");
  t = t.replace(/&lt;/g, "<");
  t = t.replace(/&gt;/g, ">");
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/&nbsp;/g, "");
  t = t.replace(/<.*?>/g,""); // remove tags    return t;
},// new adding by bigpapyCleanText2 : function(text) {	  var t = text;//	  t = t.replace(/&amp;/g, "&");//	  t = t.replace(/&lt;/g, "<");//	  t = t.replace(/&gt;/g, ">");//	  t = t.replace(/&quot;/g, '"');//	  t = t.replace(/&nbsp;/g, "");	  //	  t = t.replace(/<</g,"< <");	  //	  t = t.replace(/>>/g, "> >");//	  t = t.replace(/<\S.*?>/g,""); // remove tags	  	  t = t.replace(/>/g , "&gt;");	  	  t = t.replace(/</g , "&lt;");	        t = t.replace(/&lt;a href/g , "<a href");            t = t.replace(/&lt;\/a&gt;/g , "</a>");	  	  t = t.replace(/"&gt;/g , "\">");	  	  t = t.replace(/&lt;br\s\/&gt;/g, "<br />");	  	  t = t.replace(/&amp;nbsp;/g,' ');	//  console.log(t);	  	  return t;	},// end new adding by bigpapy// Function added by bigpapy
RemoveSpecialChar : function(text) {	  var t = text;	  t = t.replace(/&amp;#192;/g,"À");	  t = t.replace(/&amp;#193;/g,"Á");	  t = t.replace(/&amp;#194;/g,"Â");	  t = t.replace(/&amp;#195;/g,"Ã");	  t = t.replace(/&amp;#196;/g,"Ä");	  t = t.replace(/&amp;#197;/g,"Å");	  t = t.replace(/&amp;#198;/g,"Æ");	  t = t.replace(/&amp;#199;/g,"Ç");	  t = t.replace(/&amp;#200;/g,"È");	  t = t.replace(/&amp;#201;/g,"É");	  t = t.replace(/&amp;#202;/g,"Ê");	  t = t.replace(/&amp;#203;/g,"Ë");	  t = t.replace(/&amp;#204;/g,"Ì");	  t = t.replace(/&amp;#205;/g,"Í");	  t = t.replace(/&amp;#206;/g,"Î");	  t = t.replace(/&amp;#207;/g,"Ï");	  t = t.replace(/&amp;#208;/g,"Ð");	  t = t.replace(/&amp;#209;/g,"Ñ");	  t = t.replace(/&amp;#210;/g,"Ò");	  t = t.replace(/&amp;#211;/g,"Ó");	  t = t.replace(/&amp;#212;/g,"Ô");	  t = t.replace(/&amp;#213;/g,"Õ");	  t = t.replace(/&amp;#214;/g,"Ö");	  t = t.replace(/&amp;#215;/g,"×");	  t = t.replace(/&amp;#216;/g,"Ø");	  t = t.replace(/&amp;#217;/g,"Ù");	  t = t.replace(/&amp;#218;/g,"Ú");	  t = t.replace(/&amp;#219;/g,"Û");	  t = t.replace(/&amp;#220;/g,"Ü");	  t = t.replace(/&amp;#221;/g,"Ý");	  t = t.replace(/&amp;#222;/g,"Þ");	  t = t.replace(/&amp;#223;/g,"ß");	  t = t.replace(/&amp;#224;/g,"à");	  t = t.replace(/&amp;#225;/g,"á");	  t = t.replace(/&amp;#226;/g,"â");	  t = t.replace(/&amp;#227;/g,"ã");	  t = t.replace(/&amp;#228;/g,"ä");	  t = t.replace(/&amp;#229;/g,"å");	  t = t.replace(/&amp;#230;/g,"æ");	  t = t.replace(/&amp;#231;/g,"ç");	  t = t.replace(/&amp;#232;/g,"è");	  t = t.replace(/&amp;#233;/g,"é");	  t = t.replace(/&amp;#234;/g,"ê");	  t = t.replace(/&amp;#235;/g,"ë");	  t = t.replace(/&amp;#236;/g,"ì");	  t = t.replace(/&amp;#237;/g,"í");	  t = t.replace(/&amp;#238;/g,"î");	  t = t.replace(/&amp;#239;/g,"ï");	  t = t.replace(/&amp;#240;/g,"ð");	  t = t.replace(/&amp;#241;/g,"ñ");	  t = t.replace(/&amp;#242;/g,"ò");	  t = t.replace(/&amp;#243;/g,"ó");	  t = t.replace(/&amp;#244;/g,"ô");	  t = t.replace(/&amp;#245;/g,"õ");	  t = t.replace(/&amp;#246;/g,"ö");	  t = t.replace(/&amp;#247;/g,"÷");	  t = t.replace(/&amp;#248;/g,"ø");	  t = t.replace(/&amp;#249;/g,"ù");	  t = t.replace(/&amp;#250;/g,"ú");	  t = t.replace(/&amp;#251;/g,"û");	  t = t.replace(/&amp;#252;/g,"ü");	  t = t.replace(/&amp;#253;/g,"ý");	  t = t.replace(/&amp;#254;/g,"þ");	  t = t.replace(/&amp;#255;/g,"ÿ");	  t = t.replace(/&amp;quot;/g,'"');	//  alert ("scorer: " + t)	  return t;	},	// Function added by bigpapy
RemoveAmpersand : function(text) {		  var t = text;		  t = t.replace(/&/g, "&amp;");		  t = t.replace(/</g, "&lt;");		  t = t.replace(/>/g, "&gt;");		  return t;	},		/* ---------------------------------------------------
 * Parse functions
 * --------------------------------------------------- */
	// Function modified by bigpapy
Parse : function (regStr, xml) {  try {  	  found = xml.getElementsByTagName(regStr)[0].textContent;    if (found) {      	return htlivesight.Util.RemoveAmpersand(found);    }  } catch(e) {	 // console.log("Util.Parse error: "+regStr+" = " + e);  }  return null;},};
/* ---------------------------------------------------
 * Other functions
 * --------------------------------------------------- */