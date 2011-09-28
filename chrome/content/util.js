function Util() {
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
  t = t.replace(/<.*?>/g,""); // remove tags
};
Util.RemoveSpecialChar = function(text) {
	Util.RemoveAmpersand = function(text) {
/* ---------------------------------------------------
 * Parse functions
 * --------------------------------------------------- */

Util.Parse = function (regStr, xml) {
/* ---------------------------------------------------
 * Other functions
 * --------------------------------------------------- */

