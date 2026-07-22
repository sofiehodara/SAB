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
      const major = escapeHtml(m.majorMinor || "");
      return `
        <div class="board-card">
          <div class="board-photo-wrap">
            <img src="${photo}" alt="${name}" loading="lazy"
                 onerror="this.onerror=null;this.src='images/placeholder-avatar.svg';">
          </div>
          <div class="board-type">${type}</div>
          <div class="board-name">${name}</div>
          <div class="board-major">${major}</div>
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
