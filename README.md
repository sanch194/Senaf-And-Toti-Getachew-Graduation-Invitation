# S&T Graduation Invitation — Setup Guide
## Website
1. Install Node 18+. In VS Code: File > Open Folder > `st-graduation`, then Terminal:
   `npm install` then `npm run dev` -> http://localhost:3000
2. MUSIC: put your audio at **`public/music.mp3`** (exact name). It loops automatically and starts on the first tap of the envelope. Use an MP3 under ~5 MB.
3. PHOTOS: `public/images/senaf.jpg` and `public/images/toti.jpg` (replace to change).
4. TEXT/TRANSLATIONS: all wording lives in the `T` object at the top of `app/page.js`.
5. COLORS: `:root` variables at the top of `app/globals.css` (`--bur` is the burgundy).
6. DEPLOY: push to GitHub, import the repo in vercel.com, click Deploy.
## Brochures (`brochures/`)
- `brochure-amharic-english.html` and `brochure-english-oromoo.html`
- Open in Chrome > Ctrl/Cmd+P > Destination "Save as PDF" > Paper A4, Margins "None", enable "Background graphics".
- Keep the folder structure (they load photos from `../public/images`). Internet needed once for Google Fonts.
## Please check
The invitation message is newly written (I had no access to your earlier one) — paste your original into `T` and the brochures. Have a native speaker proofread the Amharic and Afaan Oromoo.
