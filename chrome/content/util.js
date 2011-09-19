function Util() {};
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

Util.cleanTags = function(text) {
  var t = text;
  //t = t.replace(/&amp;/g, "&");  // replacing &amp; breaks DOMParser
  t = t.replace(/&lt;/g, "<");
  t = t.replace(/&gt;/g, ">");
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/&nbsp;/g, "");
  t = t.replace(/<br>/gi, "<br />");
  t = t.replace(/<A /gi, "<a ");
  t = t.replace(/A>/gi, "a>");
  //t = t.replace(/<.*?>/g,""); // remove tags
  return t;
};

Util.CleanText = function(text) {
  var t = text;
  t = t.replace(/&amp;/g, "&");
  t = t.replace(/&lt;/g, "<");
  t = t.replace(/&gt;/g, ">");
  t = t.replace(/&quot;/g, '"');
  t = t.replace(/&nbsp;/g, "");
  t = t.replace(/<.*?>/g,""); // remove tags    return t;
};// Function added by bigpapy
Util.RemoveSpecialChar = function(text) {	  var t = text;	  t = t.replace("&amp;#192;","À");	  t = t.replace("&amp;#193;","Á");	  t = t.replace("&amp;#194;","Â");	  t = t.replace("&amp;#195;","Ã");	  t = t.replace("&amp;#196;","Ä");	  t = t.replace("&amp;#197;","Å");	  t = t.replace("&amp;#198;","Æ");	  t = t.replace("&amp;#199;","Ç");	  t = t.replace("&amp;#200;","È");	  t = t.replace("&amp;#201;","É");	  t = t.replace("&amp;#202;","Ê");	  t = t.replace("&amp;#203;","Ë");	  t = t.replace("&amp;#204;","Ì");	  t = t.replace("&amp;#205;","Í");	  t = t.replace("&amp;#206;","Î");	  t = t.replace("&amp;#207;","Ï");	  t = t.replace("&amp;#208;","Ð");	  t = t.replace("&amp;#209;","Ñ");	  t = t.replace("&amp;#210;","Ò");	  t = t.replace("&amp;#211;","Ó");	  t = t.replace("&amp;#212;","Ô");	  t = t.replace("&amp;#213;","Õ");	  t = t.replace("&amp;#214;","Ö");	  t = t.replace("&amp;#215;","×");	  t = t.replace("&amp;#216;","Ø");	  t = t.replace("&amp;#217;","Ù");	  t = t.replace("&amp;#218;","Ú");	  t = t.replace("&amp;#219;","Û");	  t = t.replace("&amp;#220;","Ü");	  t = t.replace("&amp;#221;","Ý");	  t = t.replace("&amp;#222;","Þ");	  t = t.replace("&amp;#223;","ß");	  t = t.replace("&amp;#224;","à");	  t = t.replace("&amp;#225;","á");	  t = t.replace("&amp;#226;","â");	  t = t.replace("&amp;#227;","ã");	  t = t.replace("&amp;#228;","ä");	  t = t.replace("&amp;#229;","å");	  t = t.replace("&amp;#230;","æ");	  t = t.replace("&amp;#231;","ç");	  t = t.replace("&amp;#232;","è");	  t = t.replace("&amp;#233;","é");	  t = t.replace("&amp;#234;","ê");	  t = t.replace("&amp;#235;","ë");	  t = t.replace("&amp;#236;","ì");	  t = t.replace("&amp;#237;","í");	  t = t.replace("&amp;#238;","î");	  t = t.replace("&amp;#239;","ï");	  t = t.replace("&amp;#240;","ð");	  t = t.replace("&amp;#241;","ñ");	  t = t.replace("&amp;#242;","ò");	  t = t.replace("&amp;#243;","ó");	  t = t.replace("&amp;#244;","ô");	  t = t.replace("&amp;#245;","õ");	  t = t.replace("&amp;#246;","ö");	  t = t.replace("&amp;#247;","÷");	  t = t.replace("&amp;#248;","ø");	  t = t.replace("&amp;#249;","ù");	  t = t.replace("&amp;#250;","ú");	  t = t.replace("&amp;#251;","û");	  t = t.replace("&amp;#252;","ü");	  t = t.replace("&amp;#253;","ý");	  t = t.replace("&amp;#254;","þ");	  t = t.replace("&amp;#255;","ÿ");	//  alert ("scorer: " + t)	  return t;	};	// Function added by bigpapy
	Util.RemoveAmpersand = function(text) {		  var t = text;		  t = t.replace("&", "&amp;");		  return t;	};
/* ---------------------------------------------------
 * Parse functions
 * --------------------------------------------------- */
	// Function modified by bigpapy
Util.Parse = function (regStr, xml) {  try {  	  found = xml.getElementsByTagName(regStr)[0].textContent;    if (found) {      	return Util.RemoveAmpersand(found);    }  } catch(e) {	  dump("Util.Parse error: " + e);  }  return null;};
/* ---------------------------------------------------
 * Other functions
 * --------------------------------------------------- */


