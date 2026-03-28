/**
 * Listens for messages from popup
 */
chrome.runtime.onMessage.addListener((msg) => {

  if (msg.action === "insert") {

    const el = document.activeElement;

    /**
     * Ensure we are targeting a valid input field
     */
    if (!el) return;

    const isInput =
      el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA";

    if (!isInput) return;

    /**
     * Insert text at cursor position (not just append)
     */
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;

    const original = el.value;

    el.value =
      original.substring(0, start) +
      msg.text +
      original.substring(end);

    /**
     * Move cursor to end of inserted text
     */
    const newCursor = start + msg.text.length;
    el.setSelectionRange(newCursor, newCursor);

    /**
     * Trigger input event (important for React / modern apps)
     */
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
});