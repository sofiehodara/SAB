// Edit the line below to update the "next meeting" banner shown
// at the top of every page. Just change the text in quotes and save.
const NEXT_MEETING_TEXT = "Next meeting: TBD";

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("meeting-banner");
  if (el) el.textContent = NEXT_MEETING_TEXT;
});
