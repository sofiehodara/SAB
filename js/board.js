function loadBoard() {
  const grid = document.getElementById("board-grid");
  const empty = document.getElementById("board-empty");

  try {
    const dataEl = document.getElementById("board-data");
    const members = JSON.parse(dataEl.textContent);

    if (!Array.isArray(members) || members.length === 0) {
      empty.hidden = false;
      return;
    }

    grid.innerHTML = members.map((m) => {
      if (m.placeholder) {
        return `
          <div class="board-card">
            <div class="board-photo-wrap board-photo-wrap--placeholder"></div>
            <div class="board-placeholder-text">Student Advisor</div>
          </div>
        `;
      }
      const photo = m.photo || "images/placeholder-avatar.svg";
      const name = escapeHtml(m.name || "");
      const type = escapeHtml(m.memberType || "");
      const pronouns = escapeHtml(m.pronouns || "");
      const major = escapeHtml(m.major || "");
      const minor = escapeHtml(m.minor || "");
      const researchArea = escapeHtml(m.researchArea || "");
      const typeClass = /faculty/i.test(type)
        ? "board-type--faculty"
        : /student/i.test(type)
        ? "board-type--student"
        : "";

      return `
        <div class="board-card">
          <div class="board-photo-wrap ${typeClass}">
            <img src="${photo}" alt="${name}" loading="lazy"
                 onerror="this.onerror=null;this.src='images/placeholder-avatar.svg';">
          </div>
          <div class="board-type ${typeClass}">${type}</div>
          <div class="board-name">${name}</div>
          ${pronouns ? `<div class="board-pronouns">${pronouns}</div>` : ""}
          ${major ? `<div class="board-major">Major: ${major}</div>` : ""}
          ${minor ? `<div class="board-minor">Minor: ${minor}</div>` : ""}
          ${researchArea ? `<div class="board-research">Research: ${researchArea}</div>` : ""}
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error(err);
    empty.hidden = false;
    empty.textContent = "Board members will appear here soon.";
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

loadBoard();