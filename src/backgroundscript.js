/**
 * Forward Chrome command events (keyboard shortcuts) to content script through message passing.
 * See: https://developer.chrome.com/extensions/messaging
 */
chrome.commands.onCommand.addListener(command => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    if (tabs.length > 0 && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {command});
    }
  });
});
