const NEXT_MEETING_TEXT = "JOIN THE STUDENT ADVISORY BOARD TODAY";
const REPEAT_COUNT = 4; // how many times the phrase repeats in the loop

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("meeting-banner");
  if (!el) return;
  const spans = Array(REPEAT_COUNT).fill(`<span>${NEXT_MEETING_TEXT}</span>`).join("");
  el.innerHTML = `<div class="meeting-banner-track">${spans}</div>`;
});
