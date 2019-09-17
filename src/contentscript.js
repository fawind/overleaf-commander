const script = document.createElement('script');
script.src = chrome.extension.getURL('app.js');
(document.head||document.documentElement).appendChild(script);
console.log('Script injected');
