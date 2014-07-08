//button listener for opera based on webkit

chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.create({url: "/content/htlivesight.html"});
});