/**
 * Inject application into local page. This is required to interact with the
 * page javascript. Note that the "app.js" script needs to be listed as a
 * "web_accessible_resources" in the extension manifest.
 * See: https://stackoverflow.com/a/9517879/3388748
 */
const script = document.createElement('script');
script.src = chrome.extension.getURL('app.js');
(document.head || document.documentElement).appendChild(script);

/**
 * Listen to chrome commands and forward them to the browser application.
 */
chrome.runtime.onMessage.addListener(message => {
  window.postMessage(message, "*");
});
