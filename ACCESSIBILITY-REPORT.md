# Accessibility Implementation Report

Portfolio: Benjie Agravante | Files changed: `index.html`, `style.css`, `script.js`
Your design, colors, personal info and project text were kept. Only accessibility fixes were made.

## Audit: problems found before changing anything

**Perceivable**
- The main photo and all 5 project images had empty `alt=""`.
- Icon-only links (GitHub, LinkedIn, email, phone) had no text for screen readers.
- Footer links used `blue` on a near-black background (very low contrast).
- "Contact Me" button used white text on an orange/red gradient (about 2.6:1, below 4.5:1).
- Body text was `justify`-aligned (uneven spacing is hard to read). Base font was 60% (about 9.6px).
- "Welcome to my Portfolio" was an `<h3>` directly after the `<h1>` (skipped heading level).
- Poppins was never loaded, and several CSS errors broke the layout (`minmax (350px` with a space, `rgba(0 0 0 0.3)`, `03s`, empty `margin-bottom:`).

**Operable**
- The menu icon was an `<i>`, so keyboard users could not open the mobile menu.
- No skip link, no visible focus style, and many effects were hover-only.
- "Review Project" was a `<div>`, and "Hire Me", "Read More", GitHub and LinkedIn were links to `#`.
- "Contacts" button pointed to `#contact`, but the real id is `#contacts`.
- Hover zoom of 1.5x on buttons, and no reduced-motion support.

**Understandable**
- Footer "FAQ" link pointed to a section that does not exist.
- Two different phone formats were used (`0951...` and `+63 951...`).
- Heading read as "ContactMe" (missing space). External links opened new tabs with no warning.

**Robust**
- No `<main>`. Project cards were `<div>`s. `projects-box` and `contact-container` were never closed.
- Generic page title and no meta description.

## A. Perceivable

| Change | File | Why | Example |
|---|---|---|---|
| Meaningful alt text on photo and projects; decorative duplicate photo in About keeps `alt=""` | index.html | Screen reader users get the image's purpose; decorative images are skipped | `<img src="my-photo.jpg" alt="Portrait of Benjie Agravante">` |
| Icons hidden from screen readers and links given names | index.html | Icon fonts are read as nothing or noise | `<a href="mailto:..." aria-label="Send me an email"><i class="bx bx-envelope" aria-hidden="true"></i></a>` |
| Contrast fixes: footer links to white (19:1), "Contact Me" text to black (5.4 to 7.7:1) | style.css | Meets 4.5:1 for normal text | `.gradient-btn { color: #000; }` |
| Left-aligned text, base font 62.5% (10px) with rem sizes, Poppins loaded with fallbacks | style.css, index.html | Easier reading, scales with user settings | `html { font-size: 62.5%; }` |
| Heading order fixed (h1, then h2 sections, h3 projects) | index.html | Clear outline for assistive tech | `<p class="home-tagline">Welcome to my Portfolio</p>` |
| Extra breakpoint for phones (600px), fixed broken grid | style.css | Content stays usable on small screens | `grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));` |
| No flashing content (none was found) | style.css | Avoids seizure triggers | n/a |

## B. Operable

| Change | File | Why | Example |
|---|---|---|---|
| Menu icon is now a real `<button>` placed before the nav in the DOM | index.html | Keyboard focusable; Tab goes straight into the opened menu | `<button type="button" id="menu-icon" aria-expanded="false" aria-controls="primary-nav">` |
| Escape closes the menu and returns focus to the button; menu closes when a link is chosen | script.js | No keyboard trap, predictable behavior | `if (e.key === 'Escape') setMenu(false, true);` |
| Skip link | index.html, style.css | Lets keyboard users skip the header | `<a class="skip-link" href="#main">Skip to main content</a>` |
| Visible focus ring (white outline plus black ring) and focus versions of hover effects | style.css | Works on both dark and orange backgrounds | `a:focus-visible, button:focus-visible { outline: 3px solid #fff; }` |
| Targets at least 44px (menu button, nav links) | style.css | Easier tapping | `.navbar a { min-height: 44px; }` |
| `prefers-reduced-motion` support, hover zoom reduced from 1.5x to 1.05x | style.css | Respects motion settings | `@media (prefers-reduced-motion: reduce) { ... }` |
| Actions use buttons/links correctly; "Contact Me" is now an anchor to `#contacts` | index.html | Native keyboard behavior | `<a href="#contacts" class="gradient-btn">Contact Me</a>` |

## C. Understandable

| Change | File | Why | Example |
|---|---|---|---|
| Dead and placeholder links replaced (GitHub/LinkedIn real URLs, Hire Me opens email, Read More now "See My Projects", `#contact` fixed to `#contacts`, FAQ removed) | index.html | Links do what their text says | `<a href="#contacts" class="btn">Contacts</a>` |
| New-tab links announced | index.html | No surprise windows | `<span class="sr-only"> (opens in a new tab)</span>` |
| "Review Project" buttons get a hidden number so each is unique | index.html | Links make sense out of context | `Review Project<span class="sr-only"> 1</span>` |
| Phone number made consistent; "Contact Me" heading spacing fixed | index.html | Consistent, clear information | `tel:+639516130398` |
| Forms | n/a | The portfolio has no form, so label and error-message rules do not apply. Contact is by links. | n/a |

## D. Robust

| Change | File | Why | Example |
|---|---|---|---|
| `<main>`, `<article>` project cards, labelled `<nav>` elements | index.html | Landmarks for screen reader navigation | `<nav class="navbar" id="primary-nav" aria-label="Main">` |
| Unclosed `<div>`s fixed; checked no duplicate IDs and all `#` links have targets | index.html | Valid structure | Verified with a parser script |
| Native elements first; ARIA only for menu state and icon names | index.html, script.js | Correct state for assistive tech | `menuButton.setAttribute('aria-expanded', String(open));` |
| Descriptive page title and meta description; `rel="noopener noreferrer"` on new-tab links | index.html | Better identification and safety | `<title>Benjie Agravante \| Computer Science Student Portfolio</title>` |

## Final checklist

**Cleanup:** removed unused CSS (`.contact-btn`, `nav ul`, `.footer-links a.underline`), removed `cursor: pointer` from non-clickable boxes, made footer links underlined, and made `<main>` focusable so the skip link works in every browser.

**Extra note:** `MyPortfolio.html`, `MyPortfolio.css` and `Myportfolio.js` in your folder are old copies that `index.html` does not use. They still contain the original accessibility problems, so delete them or do not publish them.

**Implemented and checked by script:** HTML tags balanced, no duplicate IDs, all `#` links point to existing IDs, contrast ratios for the main text/button color pairs (computed), alt attributes present on all images.

**Needs manual testing (not verified automatically):**
- [ ] Keyboard-only walkthrough on desktop and mobile width (Tab, Shift+Tab, Enter, Escape).
- [ ] Screen reader test (NVDA on Windows or VoiceOver on Mac/iPhone, TalkBack on Android).
- [x] Project image alt text was written after viewing each screenshot. Re-read them if you replace any image.
- [ ] Contrast of hover states, text over photos, and the hover color on the Contact heading.
- [ ] 200% zoom and 320px width with no content cut off.
- [ ] Replace placeholder `href="#projects"` on "Review Project" buttons with each project's real link or file.
- [ ] Run an automated tool (WAVE, Lighthouse, axe DevTools) and fix what it reports.

I am not claiming this site is fully WCAG-conformant. That needs the manual tests above.

## How to test locally

1. Put the three files with your images (`nemsu-logo.jpg`, `my-photo.jpg`, `project1-5.png`) in one folder.
2. Open the folder in VS Code and run Live Server (or open `index.html` in a browser). You need internet for Poppins and the icon font.
3. **Keyboard:** press Tab from the top. The first stop should be "Skip to main content". Check that every link and button shows a clear outline, and that the order makes sense. Press Enter on links.
4. **Mobile menu:** make the window narrower than 1285px (or press F12 then the device icon). Tab to the menu button, press Enter, then Tab through links. Press Escape: the menu closes and focus returns to the button.
5. **Responsive:** test 320px, 768px and 1440px widths. There should be no sideways scrolling.
6. **Zoom:** press Ctrl and + until 200%. Content should still be readable.
7. **Lighthouse:** F12, Lighthouse tab, choose Accessibility, run it. Aim to fix every listed issue.
8. **WAVE:** install the WAVE browser extension, click it, and review errors and contrast results.
9. **Screen reader:** turn on NVDA or VoiceOver and listen to the headings, links and images.
10. **Reduced motion:** turn on "Reduce motion" in your operating system and confirm hover zooms and smooth scrolling stop.
