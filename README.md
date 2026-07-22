# Student Advisory Board website

A static site: Home, Board Members, Meeting Notes, and Apply — ready for GitHub Pages, no build step required.

## Put it on GitHub Pages

1. Create a new repo on GitHub (e.g. `sab-site`).
2. Upload all the files/folders in this project to the repo (drag-and-drop works fine in the GitHub web UI, or `git push` if you're comfortable with the command line).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source: Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
5. GitHub gives you a URL like `https://<your-username>.github.io/sab-site/` within a minute or two.

Any time you edit a file and commit it, the live site updates automatically (usually within a minute).

## Next meeting banner

There's a slim red banner right under the nav on every page that says "Next meeting: TBD." Unlike the rest of the header (which is repeated in each file), this banner's text lives in **one shared file** — `js/meeting-banner.js` — so you only ever need to update it in a single place and it updates on all four pages automatically.

To update it, open `js/meeting-banner.js` and change the text on this line:

```js
const NEXT_MEETING_TEXT = "Next meeting: TBD";
```

For example:

```js
const NEXT_MEETING_TEXT = "Next meeting: Thurs, Sept 18 · 5:00 PM · Ryder Hall 231";
```

Save, and every page picks up the new text — no need to touch `index.html`, `apply.html`, `board.html`, or `meeting-notes.html` at all.

## Northeastern / CAMD logo

The official Northeastern "N" monogram (red, from the university brand kit) is already in place at `images/camd-logo.svg`, shown in the nav on every page next to "SAB." If you ever need to swap it for a different version (e.g. the full wordmark, a black version, etc.), replace that file — keep the same filename, or update the `src` in the `<img>` tag across all four `.html` files to match a new one. A PNG version is also included at `images/camd-logo.png` in case you need a raster fallback for some other use.

## Adding a board member

Board members live in **`board.html`** itself, inside a clearly marked block near the bottom of the file (look for `id="board-data"`). This keeps things working whether you're opening the file directly on your computer or hosting it on GitHub Pages — no server required either way.

To add someone:

1. **Add their photo.** Go to the `images/board/` folder in the repo → **Add file → Upload files** → drop in their photo (e.g. `jane-doe.jpg`). Any reasonably square, decent-resolution photo works — the site automatically crops it into a circle, so you don't need to pre-crop anything. (Alternatively, if their photo already lives online — a staff directory, a CDN — you can just paste that full `https://...` URL instead of uploading anything.)
2. **Add their entry.** Open `board.html`, find the `<script id="board-data" type="application/json">` block, and add a new `{ }` entry, separated by a comma from the one before it:

```json
{
  "name": "Jane Doe",
  "memberType": "Advisor",
  "majorMinor": "Design, minor in Games",
  "photo": "images/board/jane-doe.jpg"
}
```

- `memberType` is whatever label fits (e.g. "Advisor", "Chair", "Faculty Liaison").
- `photo` should match the exact filename you uploaded — or a full external URL, as above.
3. Save and reload the page. The Board Members grid updates immediately — no rebuild, no server needed.

**Open seats:** entries like `{ "placeholder": true }` render as a plain gray circle labeled "Student Advisor" — a visual placeholder for a seat that hasn't been filled yet. To fill one, replace it with a normal entry (name/memberType/majorMinor/photo) as shown above.

**JSON formatting gotchas:** each entry needs commas between fields and between entries, but no comma after the very last entry in the list. If the Board page ever shows a "Board members will appear here soon" message unexpectedly, it usually means there's a stray or missing comma in that block — a free tool like [jsonlint.com](https://jsonlint.com) will point out exactly where (paste just the `[ ... ]` array part).

## Meeting Notes doc

The Meeting Notes page embeds your Google Doc directly. Two things to keep in mind:

- **Sharing setting matters.** For the embed to be visible to site visitors, the Doc's sharing setting needs to be at least "Anyone with the link → Viewer." (Settings → Share, top right of the Doc.) If it's restricted to specific people, visitors will see an access-denied box in the embed instead of the notes.
- If you ever swap in a different Doc, update the `src` URL in `meeting-notes.html` — replace the ID in the URL with the new Doc's ID (the long string in its URL), and make sure `/preview` stays at the end.

## Testing locally

No server needed anymore — board member data now lives directly inside `board.html`, so every page (including Board Members) works correctly when you just double-click `index.html` and open it in your browser. If you ever add other JSON-fetching features later, keep in mind that browsers block `fetch()` of local files opened via `file://`, which is why we moved away from that approach.

## File map

```
index.html            Home page
apply.html             Apply / how to get involved
board.html             Board Members grid — edit the board-data block near the bottom to add/remove members
meeting-notes.html     Embedded Google Doc
css/style.css          All styling
js/board.js            Reads the board-data block in board.html and renders member cards
js/meeting-banner.js    ← edit this one file to update the "next meeting" banner on all pages
images/board/          ← upload member photos here
images/placeholder-avatar.svg   Fallback shown if a photo is missing
```
