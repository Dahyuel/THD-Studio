# THD Studio

A cinematic, scroll-driven portfolio website for THD Studio — an architecture, interior design, and execution practice based in Cairo, Egypt.

The site presents studio projects through a full-screen video hero, an animated masonry gallery with interactive project modals, a scroll-revealed about section, and a contact section with social links. It is built as a single-page React application with Vite.

---

## Features

- **Video Hero** — Auto-advancing fullscreen video slides with desktop/mobile sources, custom subtitles, and manual prev/next controls.
- **Scroll-Driven About** — Word-by-word opacity reveal tied to scroll progress, plus animated service cards with iconography.
- **Interactive Masonry Gallery** — Dynamic column layout that reflows by viewport width. Images render in grayscale and reveal full color in a circle that follows the cursor.
- **Project Modal** — Full-screen lightbox with image/video carousel, thumbnail strip, keyboard (`Escape`) support, and body-scroll locking.
- **Hover Tooltips** — Project metadata appears after a short dwell time on a gallery item.
- **Staggered Menu** — GSAP-powered slide-in navigation panel with layered entrance animation, cycling label text, and an animated toggle icon.
- **Adaptive Theme** — Navigation and logo colors switch automatically between dark and light based on which section is in view.
- **Preloader** — Animated percentage counter that holds until the hero video is ready, then slides away.
- **Category Filtering** — Gallery filters projects by `Interior Design`, `Architecture`, or `Execution`.
- **Responsive Layout** — Fluid typography and layout adapt from mobile to large desktop.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/) |
| WebGL | [OGL](https://github.com/oframe/ogl) |
| Linting | ESLint (flat config) |
| Fonts | Poppins (Google Fonts) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd THD-Studio-main

# Install dependencies
npm install
```

---

## Usage

### Development

Start the Vite dev server with hot module replacement:

```bash
npm run dev
```

The site will be available at the URL printed in the terminal (typically `http://localhost:5173`).

### Production build

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### All scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project Structure

```
THD-Studio-main/
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind theme and content paths
├── postcss.config.js         # PostCSS plugins
├── eslint.config.js          # ESLint flat config
├── package.json
├── public/                   # Static assets served at the site root
│   ├── All Projects/         # Project media, grouped by discipline
│   │   ├── Architecture Data/
│   │   ├── Execution Data/
│   │   └── Interior Design/
│   ├── *.mp4                 # Hero background videos
│   ├── modifiedlogo.png      # Logo used in nav and contact
│   └── icon.png              # Favicon
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component and layout orchestration
    ├── Hero.jsx              # Video slideshow hero
    ├── About.jsx             # About section and service cards
    ├── Gallery.jsx           # Category filtering + gallery state
    ├── Masonry.jsx           # Animated masonry grid
    ├── ProjectModal.jsx      # Project lightbox + hover tooltip
    ├── Contact.jsx           # Contact details and social links
    ├── Footer.jsx            # Footer navigation and CTA
    ├── StaggeredMenu.jsx     # Animated slide-in navigation
    ├── Preloader.jsx         # Loading screen
    ├── projectsData.js       # Project data source
    └── *.css                 # Component and global styles
```

---

## Adding Projects

Project content is defined in `src/projectsData.js`. Each entry follows this shape:

```js
{
  id: '1',
  title: 'Project Name',
  location: 'City, Country',
  category: 'Architecture',      // 'Architecture' | 'Execution' | 'Interior Design'
  description: 'Short description.',
  tags: ['Tag One', 'Tag Two'],
  img: '/All Projects/Architecture Data/Project/Cover.webp',
  images: [
    '/All Projects/Architecture Data/Project/Cover.webp',
    '/All Projects/Architecture Data/Project/Detail.mp4'
  ],
  height: 380                    // Base tile height for the masonry layout
}
```

To add a project:

1. Place the media under the appropriate folder in `public/All Projects/`.
2. Append a new object to the `galleryItems` array in `src/projectsData.js`.
3. Reference media paths relative to the site root (starting with `/`).

Images and videos are supported in the modal — files ending in `.mp4` or `.webm` render as video.

---

## Architecture Notes

- **Animation split** — Framer Motion handles declarative, scroll-linked and in-view animations. GSAP drives imperative timeline work such as the masonry layout transitions and the staggered menu.
- **Performance-conscious masonry** — Mouse position is written directly to CSS custom properties to avoid React re-renders. Grid items lazy-load their images once they come within 400px of the viewport, and only the first batch of images is preloaded before the grid animates in.
- **Theme adaptation** — `App.jsx` tracks scroll position against the About and Contact sections and passes a `theme` value down to the navigation so colors stay legible over both black and yellow backgrounds.
- **No routing library** — The site is a single page; navigation uses anchor links with smooth scrolling.

---

## Browser Support

The site targets modern evergreen browsers. It relies on `ResizeObserver`, CSS custom properties, `matchMedia`, and native video playback.

---

## Acknowledgments

- Powered by [NileByte](https://nilebyte.info/).
- Fonts served via [Google Fonts](https://fonts.google.com/).
- Built with [Vite](https://vite.dev/) and [React](https://react.dev/).
