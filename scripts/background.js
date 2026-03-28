/**
 * =========================================
 * CONTEXT MENU SETUP
 * =========================================
 * Creates a right-click menu option inside editable fields
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "insertLink",
    title: "Insert Quick Link",
    contexts: ["editable"] // only show in input/textarea fields
  });
});

/**
 * =========================================
 * CONTEXT MENU CLICK HANDLER
 * =========================================
 * Handles insertion when user clicks the menu item
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "insertLink") {

    /**
     * For now, insert a default or test link
     * (later you can make this dynamic)
     */
    const textToInsert = "https://example.com";

    if (!tab?.id) return;

    chrome.tabs.sendMessage(tab.id, {
      action: "insert",
      text: textToInsert
    });
  }
});
