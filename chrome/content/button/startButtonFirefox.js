//button listener for firefox

chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.create({url: "/content/htlivesight.html"});
});
