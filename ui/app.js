(async function () {
  const mdPath = "../DEPLOYMENT-PLAN.md";
  try {
    const res = await fetch(mdPath);
    if (!res.ok)
      throw new Error("Failed to fetch " + mdPath + ": " + res.status);
    const md = await res.text();

    // parse checkbox states from source markdown (order matters)
    const checkboxRegex = /^[-*]\s\[([ xX])\]\s/gm;
    const matches = [...md.matchAll(checkboxRegex)];
    const sourceChecked = matches.map((m) => m[1].toLowerCase() === "x");

    // render markdown
    const html = marked.parse(md, { gfm: true });
    const content = document.getElementById("content");
    content.innerHTML = html;

    // Create interactive checkboxes replacing disabled ones
    const inputs = content.querySelectorAll("input[type=checkbox]");
    inputs.forEach((input, i) => {
      input.disabled = false;
      input.id = "cb-" + i;
      const key = "deployment-plan-cb-" + i;
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        input.checked = stored === "true";
      } else {
        input.checked = !!sourceChecked[i];
      }
      input.addEventListener("change", (e) => {
        localStorage.setItem(key, e.target.checked);
      });
    });

    // build a small table of contents
    const toc = document.getElementById("toc");
    const headings = content.querySelectorAll("h1, h2, h3");
    headings.forEach((h) => {
      const id = h.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-");
      h.id = id;
      const a = document.createElement("a");
      a.href = "#" + id;
      a.textContent = h.tagName + " — " + h.textContent;
      a.className = "toc-link";
      toc.appendChild(a);
    });

    // Clear saved checklist
    document.getElementById("clear-checks").addEventListener("click", () => {
      if (!confirm("Clear saved checklist state?")) return;
      inputs.forEach((_, i) =>
        localStorage.removeItem("deployment-plan-cb-" + i),
      );
      inputs.forEach((input, i) => (input.checked = !!sourceChecked[i]));
      alert("Saved checklist cleared.");
    });
  } catch (err) {
    document.getElementById("content").textContent =
      "Error loading deployment plan: " + err.message;
    console.error(err);
  }
})();
