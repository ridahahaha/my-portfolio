# Rida Nawaz Personal Portfolio

An original, hand-written HTML5 and Bootstrap 5.3.8 portfolio. No portfolio template or website builder is used.

## Local preview

Open `index.html` in a browser. Bootstrap loads from its official documented jsDelivr CDN. Matching, unchanged local fallback files in `vendor/` allow preview when the CDN is unavailable. All profile/project images are local. No installation is required.

## Contents

- Responsive Bootstrap navbar; Home, About, Education, Skills, Projects and Contact sections.
- Education table, six sample learning skills, buttons, badges, cards, alerts and Bootstrap utilities.
- Three working local projects: Action Desk, Budget Book, Idea Notebook.
- External `style.css`, hover states, transitions, transforms, media queries and reduced-motion support.
- `script.js` handles a local contact-message preview. Nothing is emailed, uploaded or stored by the contact form.
- `demos.js` implements the task planner, expense ledger and searchable notes.
- Actual project screenshots in `images/`; homepage evidence is kept locally.

## Personal details and cartoon character

The name, University of Lahore and Computer Science student context were supplied by the user. Goals and interests were drafted for the portfolio. The profile image is a cute AI-generated fictional 3D human cartoon character, not a real photograph of this student or a random person taken from the internet. Academic dates, semester and results are not specified. The contact email remains a clearly labelled placeholder to replace before publishing. No past job, certification, client result or grade is invented.

The projects are working learning demos created with this portfolio. Study their code and make them your own; do not claim an earlier external work history.

## Demo behaviour

The planner supports adding tasks, priority, filtering, completion and deletion. The expense ledger supports positive amounts, categories, totals and deletion. These two demos save only in local browser storage when available; there is an in-memory fallback if storage is blocked. The notebook filters and searches study notes. Browser storage is separated by portfolio initials. Use sample information only. There is no backend, account, payment or online contact delivery.

## Repository and deployment

Source repository: https://github.com/ridahahaha/my-portfolio

The source is published in descriptive commits covering the portfolio, images, Bootstrap fallback assets and project demos. Vercel deployment and domain setup are separate steps and have not been completed. The contact email is still a placeholder and the contact form is a local demo.

## Understanding the code

`container` sets readable page width; `row` and `col-md-6` create responsive columns. `navbar-expand-lg` and the Bootstrap bundle provide the collapsing menu. Cards group projects, badges label skills, alerts identify sample content, and utilities such as `text-center`, `mt-4`, `p-3`, `bg-dark` and `shadow` provide reusable styling. Custom CSS supplies the individual visual identity. The form uses native input validation plus a local preview handler. User input is displayed with `textContent`.

## Assets and sources

- Bootstrap CDN and licence: https://getbootstrap.com/docs/5.3/getting-started/download/ (MIT; vendor file headers retained).
- Cartoon character: AI-generated using the built-in image generation tool; see `IMAGE-SOURCES.md`.
- Project screenshots are captured from the included, working demos.
- No third-party portfolio template is used.

## Repository contents

The repository contains source, images, project demos, vendor fallback files, README and image-source notes. Local `.gitignore` rules exclude secrets, editor settings, dependencies, archives and temporary files. `.gitignore` is itself included. Do not upload browser test scripts, local caches or unrelated files.


## Standalone folder

This directory is independent: all images, project demos, scripts, styles and Bootstrap fallback assets are inside it. It does not depend on a sibling portfolio or a shared parent website. This folder is the source for the student's `my-portfolio` repository. Deployment remains a separate step.


## Character animation

The character asset is a still transparent PNG, animated in the page with CSS `character-float` keyframes. The pause/play button can stop or resume the movement. Users requesting reduced motion get a still character. This is a stylized cartoon character, not a photograph.
