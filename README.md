# 418 Alder Lane

An interactive death scene investigation for **CJ 496: Death Investigation, Week 1**.

Students play a medicolegal death investigator called to an unattended death. Every step follows the National Institute of Justice guide *Death Investigation: A Guide for the Scene Investigator* (2011 technical update), and the scoring uses the Week 1 lesson's Five Components, Geberth's 10 most common errors, the Five Contaminators, the evidence types, Locard's principle, chain of custody, the CSI effect, media rules and death certificates.

It is a plain website: one HTML page, one stylesheet, three JavaScript files. There is no server, database, account system or build step, so it can be hosted **for free on GitHub Pages**.

---

## What's in this folder

```
death-scene-game/
├── index.html        ← the page students open
├── css/style.css     ← the look (colors, fonts, layout)
├── js/content.js     ← ALL the text: story, questions, answers, scoring, facts
├── js/art.js         ← the drawings (floor plan, site plan, body chart, timeline)
├── js/engine.js      ← the game logic (you shouldn't need to touch this)
└── README.md         ← this guide
```

`INSTRUCTOR-NOTES.md` (the answer key) sits **outside** this folder on purpose. Don't upload it to GitHub, because GitHub Pages sites are public.

---

## Step 1: Try it on your own computer

1. Open the `death-scene-game` folder.
2. Double-click `index.html`. It opens in your web browser and runs as it will online.
3. Play the case once all the way through (about 30–40 minutes).

> Progress saves in the browser. To start fresh, open **Field Manual → Restart the case**.

---

## Step 2: Make a free GitHub account

1. Go to <https://github.com/signup>.
2. Sign up with your email. Pick a username carefully: it becomes part of the web address students will use. For example, the username `profsmith-cj` gives `https://profsmith-cj.github.io/...`.
3. Verify your email address.

The free plan is all you need.

---

## Step 3: Create a repository (a project folder on GitHub)

1. Signed in to GitHub, click the **+** at the top right and choose **New repository**.
2. **Repository name:** something short with no spaces, such as `alder-lane`. This becomes the end of the web address.
3. Choose **Public**. Free GitHub Pages sites must be public.
4. Check **Add a README file**.
5. Click **Create repository**.

---

## Step 4: Upload the game files

You can do this entirely in the browser.

1. In your new repository, click **Add file → Upload files**.
2. Open the `death-scene-game` folder on your computer and **select everything inside it**: `index.html`, `README.md`, and the `css` and `js` folders. Drag them all onto the GitHub upload page.
   - Drag the *contents* of the folder, not the folder itself. `index.html` must end up at the top level of the repository, not inside a `death-scene-game` subfolder.
   - If your browser won't let you drag folders, upload `index.html` first. Then, for each folder, click **Add file → Create new file**, type `css/style.css` as the name (the slash creates the folder), and paste in the file's contents. Do the same for the three files in `js/`.
3. If GitHub asks whether to replace the existing `README.md`, say yes.
4. Scroll down and click **Commit changes**.

Check the repository's main page. You should see `index.html`, `README.md`, `css/` and `js/`.

---

## Step 5: Turn on GitHub Pages

1. In the repository, click **Settings** (the gear tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
5. Wait 1–2 minutes and refresh. A box appears at the top: **"Your site is live at https://YOUR-USERNAME.github.io/alder-lane/"**.
6. Click it, play the first screen, and check that everything looks the way it did on your computer.

That link is what you give students. It's free, has no ads, needs no student login, and works on Chrome, Edge, Firefox, Safari, iPads and phones.

---

## Step 6: Give it to students

Choose one:

- **Post the link** in your LMS (Canvas, Blackboard, D2L or Moodle) as a "Web Link" or "External URL" item in Week 1.
- **Embed it in an LMS page.** In the page editor, switch to the HTML view and paste:

  ```html
  <iframe src="https://YOUR-USERNAME.github.io/alder-lane/" width="100%" height="900" style="border:0" title="418 Alder Lane"></iframe>
  ```

  Also include a plain link above it. Some students will prefer the game full-screen, and some LMS settings block embedded frames.

Student instructions you can paste:

> Play **418 Alder Lane** at [link]. Enter your full name on the first screen. Take your time: progress saves in your browser, so you can stop and come back on the same computer. When you reach **Your case review**, answer both reflection questions, then click **Copy my results** and paste the text into the Week 1 assignment submission. You can also click **Print or save as PDF** and upload the PDF.

---

## Step 7 (optional): Collect results automatically with a Google Form

Without this step, students submit by pasting their results or uploading a PDF, which works in every LMS. If you'd rather have every result land in one spreadsheet:

1. Create a Google Form with three **Paragraph** or **Short answer** questions: *Name*, *Score*, *Results*.
2. Click the **⋮** menu → **Get pre-filled link**. Type `NAME`, `SCORE`, `RESULTS` into the three fields and click **Get link → Copy link**.
3. The link looks like this:
   `https://docs.google.com/forms/d/e/1FAIpQL.../viewform?usp=pp_url&entry.123456=NAME&entry.234567=SCORE&entry.345678=RESULTS`
4. Open `js/content.js` and find `googleForm: null`. Replace it with your link's pieces:

   ```js
   googleForm: {
     url: "https://docs.google.com/forms/d/e/1FAIpQL.../viewform",
     nameField: "entry.123456",
     scoreField: "entry.234567",
     summaryField: "entry.345678"
   }
   ```

5. Upload the changed `content.js` to GitHub (Step 8). A **Submit to instructor** button now appears on the case review screen. It opens the form already filled in, and the student just presses Submit.

> Honest limitation: because this is a free static site, a determined student could edit their score in their own browser before submitting. For Week 1 participation credit this is usually fine. The reflection answers are the part worth grading closely.

---

## Step 8: Change the content

All the words are in `js/content.js`, in plain English between quotation marks. You can edit it right on GitHub:

1. Open the repository and click `js` → `content.js`.
2. Click the **pencil icon** (Edit this file).
3. Make your changes and click **Commit changes**. The live site updates within about a minute. Refresh the page; you may need **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac) to skip your browser's cache.

Things you can safely change:

| You want to… | Find this in `content.js` | Change |
|---|---|---|
| Rename the course or week | `const COURSE = {` | `title`, `week` |
| Reword a question or its feedback | the question's `prompt`, `text` or `feedback` | the words inside the quotes |
| Change which answer is correct | the option with `correct: true` | move `correct: true` to another option |
| Make a mistake cost more or less | `score: { sense: -10 }` | the number (keep the minus sign) |
| Tie a mistake to a Geberth error | `flag: { err: 4, ... }` | the error number 1–10 |
| Add a reflection question | the `reflections:` list in the last phase | add `{ id: "r3", prompt: "..." }` |
| Add a Real-World File card | the `FACTS` list | copy an entry, give it a new name, then list that name in a phase's `facts: [...]` |
| Edit the Field Manual | the `MANUAL` list at the bottom | the `html` text |

Rules that keep it working:

- Keep every quotation mark, comma and bracket. If a sentence needs a double quote inside it, write `\"`. In text wrapped in backticks (`` ` ``), you can use either kind of quote freely.
- After editing, play the changed part once. If the page goes blank, the most likely cause is a missing comma or quote near your change. Press **F12** and open the **Console** tab: it names the line number.
- Keep a backup. GitHub saves every version under **History**, so you can always go back.

### Scoring, in plain terms

Each student starts with 100 in each of the Five Components: Teamwork, Documentation, Preservation, Common Sense and Flexibility. Mistakes subtract points. The overall score is the average of the five.

| Overall | Rank shown |
|---|---|
| 90–100 | Field-ready |
| 80–89 | Solid investigator |
| 70–79 | Needs supervision |
| below 70 | Shadow a senior investigator |

Flexibility is only scored in a few spots in this case. If you'd like it to count more, add `flex` penalties to options where a student failed to adapt, such as `score: { flex: -5 }`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| The live site shows a 404 | Wait two minutes after turning Pages on. Check that `index.html` is at the top level of the repository, not inside a subfolder. The file name must be all lowercase. |
| The page loads, but with no styling | The `css` folder didn't upload, or it was renamed. The path must be exactly `css/style.css`. |
| Blank page | A typo in `content.js`. Press F12, open Console, and look at the line it names. |
| A student lost their progress | Progress is saved per browser. Private or incognito windows and "clear browsing data" erase it. They can replay; it takes about 35 minutes. |
| You updated a file, but students see the old version | GitHub takes about a minute. Students can hard-refresh (Ctrl+F5). |

---

## Sources used in the game

- National Institute of Justice, *Death Investigation: A Guide for the Scene Investigator*, Technical Update, 2011 (NCJ 234457): <https://www.ojp.gov/pdffiles1/nij/234457.pdf>
- National Research Council, *Strengthening Forensic Science in the United States: A Path Forward*, 2009: <https://nap.nationalacademies.org/catalog/12589>
- Bureau of Justice Statistics, *Medical Examiners and Coroners' Offices, 2004*: <https://bjs.ojp.gov/library/publications/medical-examiners-and-coroners-offices-2004>
- CDC, Coroner and Medical Examiner Laws: <https://www.cdc.gov/phlp/php/coroner/index.html>
- Smithsonian, "Murder Is Her Hobby" (Nutshell Studies): <https://torch.si.edu/2017/10/murder-is-her-hobby-crime-in-a-nutshell>
- Office of Justice Programs, NamUs: <https://www.ojp.gov/files/archives/blogs/2021/justice-department-fights-missing>
- CDC/NCHS, *Physicians' Handbook on Medical Certification of Death*
- Week 1 lesson, CJ 496: Introduction to Death Investigation

The case, people, address and county are fictional.
