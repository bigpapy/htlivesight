document.addEventListener('DOMContentLoaded', function () {
//document.querySelector('button').addEventListener('click', clickHandler); /***** example ****//
//	document.getElementsByTagName("body")[0].addEventListener('resize',function(){htlivesight.dynresize();});

	/** tab 1 */
	document.getElementById("dark_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(2);});
	document.getElementById("light_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(3);});
	document.getElementById("livefox_theme").addEventListener('click',function(){htlivesight.Settings.click.switch_style(4);});

	document.getElementById("openin_tab").addEventListener('click',function(){htlivesight.Settings.click.radopenin(true);;});
	document.getElementById("openin_window").addEventListener('click',function(){htlivesight.Settings.click.radopenin(false);});
//	<input type="radio" id="openin_tab" name="radio" checked="checked" /><label for="openin_tab" id="label_openin_tab" onclick="htlivesight.Settings.click.radopenin(true);">In a new tab</label>
//	<input type="radio" id="openin_window" name="radio" /><label for="openin_window" id="label_openin_window" onclick="htlivesight.Settings.click.radopenin(false);">In a new window</label>
});