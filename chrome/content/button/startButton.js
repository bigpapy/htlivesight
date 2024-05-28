//button listener for opera based on webkit

chrome.action.onClicked.addListener(function(){
  chrome.tabs.create({url: "/content/htlivesight.html"});
});

