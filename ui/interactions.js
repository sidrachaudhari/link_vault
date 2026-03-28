/**
 * Handles UI interactions like clicks
 */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    navigator.clipboard.writeText(e.target.dataset.url);
  }

  if (e.target.classList.contains("insert")) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "insert",
        text: e.target.dataset.url
      });
    });
  }
});