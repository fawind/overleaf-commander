document.getElementById('open-shortcuts').addEventListener('click', (event) => {
  event.preventDefault();
  chrome.tabs.create({url: "chrome://extensions/shortcuts"});
});
