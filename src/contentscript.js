const script = document.createElement('script');
script.src = chrome.extension.getURL('app.js');
(document.head || document.documentElement).appendChild(script);

// Listen to chrome commands and forward them to the browser application.
chrome.runtime.onMessage.addListener(message => {
  window.postMessage(message, "*");
});
