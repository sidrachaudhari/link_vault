import { getLinks, saveLink } from "../core/storage.js";

/**
 * Loads and renders all saved links
 */
async function loadLinks() {
  const links = await getLinks();
  const container = document.getElementById("links");

  container.innerHTML = "";

  const entries = Object.entries(links);

  /**
   * Empty state (important for UX)
   */
  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; color:#9aa3b2; font-size:12px; padding:10px;">
        No links saved yet
      </div>
    `;
    return;
  }

  /**
   * Render each saved link
   */
  entries.forEach(([name, data]) => {
    const div = document.createElement("div");
    div.className = "link";

    div.innerHTML = `
      <span>${name}</span>
      <div class="actions">
        <button class="copy" data-url="${data.url}">Copy</button>
        <button class="delete" data-name="${name}">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}

/**
 * Add new link
 */
document.getElementById("addBtn").onclick = async () => {
  const name = document.getElementById("name").value.trim();
  const url = document.getElementById("url").value.trim();

  if (!name || !url) {
    alert("Enter name and URL");
    return;
  }

  await saveLink(name, url);

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("url").value = "";

  loadLinks();
};

/**
 * Handle copy + delete actions
 */
document.addEventListener("click", (e) => {

  // COPY
  if (e.target.classList.contains("copy")) {
    navigator.clipboard.writeText(e.target.dataset.url);
  }


  // DELETE
    if (e.target.classList.contains("delete")) {
    const name = e.target.dataset.name;

    chrome.storage.sync.get(["quick_links"], (result) => {
        const data = result.quick_links || {};

        delete data[name];

        chrome.storage.sync.set({ quick_links: data }, () => {
        loadLinks(); // refresh UI
        });
    });
    }
//   // INSERT INTO ACTIVE TAB
//   if (e.target.classList.contains("insert")) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

//       if (!tabs[0]) return;

//       chrome.tabs.sendMessage(tabs[0].id, {
//         action: "insert",
//         text: e.target.dataset.url
//       });
//     });
//   }
});



/**
 * Initial load
 */
loadLinks();
