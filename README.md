# Photo Studio Website

This is a simple, static website for a photo studio. It includes the following pages:

*   **index.html**: The main landing page.
*   **about.html**: Information about the studio.
*   **services.html**: A description of the services offered.
*   **gallery.html**: A gallery of photos.
*   **contact.html**: A contact form and information.

The website is built with HTML, CSS, and JavaScript.

# Adding New Photos to the Gallery

This guide explains how to add new photos to the site's gallery. Follow these steps every time you have new photos to upload.

## 1. Folder Structure

All gallery photos live inside the `images/` folder. There are two kinds of folders:

```
images/
├── raw/              ← unprocessed, full-size originals go here first
│   ├── maternity/
│   ├── newborn/
│   ├── cakesmash/
│   └── 6months/
├── maternity/         ← final, resized .webp photos the site actually uses
├── newborn/
├── cakesmash/
└── 6months/
```

**Never drop a photo straight into `images/maternity/`, `images/newborn/`, etc.** Those folders are for finished, resized `.webp` files only, produced by the script in Step 3. Original photos always start in the matching subfolder under `images/raw/`.

## 2. File Naming (for the raw original)

Name your original file simply before placing it in `images/raw/<category>/`:

```
01.jpg
02.jpg
03.jpg
04.jpg
```

- Don't use spaces, capital letters, or special characters in filenames (e.g. `IMG_0234 FINAL.JPG` will cause problems — rename it to `04.jpg` first).
- If a category already has `01.jpg` through `03.jpg` in its final folder, your new photo continues the sequence: `04.jpg`.
- The original can be `.jpg`, `.jpeg`, or `.png` straight off the camera/editing software — the resize script converts it to `.webp` for you.

## 3. Resize and Convert with `resize_image.py`

This script processes **an entire category folder at once** — so if you've added several new raw photos to the same category, you only need to run it once, not once per photo.

1. Place all your renamed originals in the matching raw folder, e.g. `images/raw/newborn/04.jpg`, `images/raw/newborn/05.jpg`, etc.
2. From the project's root folder, run the script with the category name as the argument:

   ```
   python resize_image.py newborn
   ```

   Valid category names are: `maternity`, `newborn`, `cakesmash`, `6months`.

3. The script converts every `.jpg`, `.jpeg`, and `.png` file sitting in `images/raw/newborn/` into a resized `.webp` file in `images/newborn/`, and prints a line for each one it processes, e.g.:

   ```
   Optimized: 04.jpg -> 04.webp
   Optimized: 05.jpg -> 05.webp

   Done. 2 photo(s) converted into ./images/newborn
   ```

4. Confirm your new `.webp` file(s) now appear in the final folder (`images/newborn/` in this example), not just the raw one.

   > Note: the script re-processes every file in the raw folder each time it runs, including ones you've already converted before. This is harmless — it just re-saves the same result — but it means the "Optimized" list you see may include photos beyond just the one you just added.

## 4. Add the Photo File

1. Double-check the finished `.webp` file is in the correct category folder under `images/` (not `images/raw/`).
2. Commit and push both the raw original **and** the finished `.webp` file to the repository (keeping the raw version means you can re-run the resize script later if settings change, without needing to re-source the photo).

## 5. Update the Gallery Manifest

The gallery page reads from a file called `images/gallery-manifest.json`, which lists every photo the site should display. After adding a new photo, this file needs to be regenerated so the new photo actually shows up.

**Run this command from the project's root folder:**

```
node scripts/generate-gallery.js
```

This scans all four folders and rewrites `gallery-manifest.json` automatically — you don't need to edit that file by hand.

You should see output confirming what was found, for example:

```
Gallery manifest generated: {
  maternity: [ '01.jpg', '02.jpg', '03.jpg' ],
  newborn: [ '01.jpg', '02.jpg', '03.jpg', '04.jpg' ],
  cakesmash: [ '01.jpg', '02.jpg', '03.jpg' ],
  '6months': [ '01.jpg', '02.jpg', '03.jpg' ]
}
```

Confirm your new photo appears in the list for the correct category.

## 6. Commit and Deploy

Commit the raw original, the finished `.webp` file, and the updated `gallery-manifest.json` together, then push:

```
git add images/raw/newborn/04.jpg images/newborn/04.webp images/gallery-manifest.json
git commit -m "Add new newborn gallery photo"
git push
```

Once pushed, the live site will update automatically (Vercel redeploys on every push to the main branch). Give it a minute, then check the Gallery page and confirm the new photo appears under the right filter tab.

## Quick Checklist

- [ ] Original(s) renamed with lowercase letters/numbers only (e.g. `04.jpg`)
- [ ] Original(s) placed in `images/raw/<category>/`
- [ ] Ran `python resize_image.py <category>` (e.g. `python resize_image.py newborn`)
- [ ] Confirmed the resized `.webp` file(s) appear in `images/<category>/`
- [ ] Ran `node scripts/generate-gallery.js`
- [ ] Confirmed the photo appears in the manifest output
- [ ] Committed the raw original, the `.webp` file, and the updated manifest
- [ ] Pushed and verified on the live site

## Troubleshooting

**Photo isn't showing up on the live site:**
- Did you run `python resize_image.py <category>` after adding the raw file? The site only reads from the final `.webp` files, never from `images/raw/`.
- Did you run the `generate-gallery.js` script *after* the `.webp` file was created? If you skip this step, the site won't know the new photo exists.
- Check the filename for typos, capital letters, or spaces.
- Make sure the raw file was placed in one of the four exact category folders listed in Step 1.
- Check that `gallery-manifest.json` was committed and pushed along with the photo — if only the image was pushed, the manifest is out of date and the site won't see the new file.

**Photo shows up in the wrong category:**
- It was placed in the wrong raw subfolder. Move it to the correct one, re-run `python resize_image.py <correct category>`, then re-run the manifest script.

**`resize_image.py` gives an error when run:**
- Make sure you're running the command from the project's root folder (the same folder that contains `resize_image.py`, `images/`, and `scripts/`), not from inside a subfolder.
- Make sure you included a category name as the argument (e.g. `python resize_image.py maternity`) — running the script with no argument, or an invalid category name, will print a usage message and exit without processing anything.
- Confirm Python and Pillow are installed. If you're not sure, run `pip install Pillow` (or `pip install -r requirements.txt` if that file exists in the project).

**`generate-gallery.js` gives an error when run:**
- Make sure you're running the command from the project's root folder.
- Confirm Node.js is installed on your machine.

**`generate-gallery.js` gives an error when run:**
- Make sure you're running the command from the project's root folder.
- Confirm Node.js is installed on your machine.