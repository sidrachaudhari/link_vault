export function renderLinks(links, onSelect) {
  const container = document.getElementById("links");
  const countEl = document.getElementById("count");

  const entries = Object.entries(links);
  countEl.textContent = entries.length;

  container.innerHTML = "";

  entries.forEach(([name, data]) => {
    const el = document.createElement("div");
    el.className = "link-pill";
    el.textContent = name;

    el.onclick = () => {
      // Highlight selected
      document.querySelectorAll(".link-pill").forEach(e => e.classList.remove("active"));
      el.classList.add("active");

      onSelect(data.url);
    };

    container.appendChild(el);
  });
}