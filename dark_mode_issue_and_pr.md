# GitHub Issue & PR Descriptions: Luxury Dark Mode Theme System (`GoEazy Dark™`)

Use these pre-formatted descriptions when creating the GitHub Issue and Pull Request for this feature.

---

## 📌 1. GitHub Issue Description

```markdown
### 🌙 Feature Request: Luxury Dark Mode Theme System (`GoEazy Dark™`)

#### **User Problem / Feature Objective**
Users searching for PG rooms and student housing late at night experience eye strain when browsing bright white interfaces. Adding a high-contrast, persistent Dark Mode theme will significantly improve user experience, accessibility, and visual aesthetics.

#### **Proposed Solution & Requirements**
- [x] **Tailwind Class Configuration**: Configure Tailwind CSS to enable class-based dark mode (`darkMode: 'class'`).
- [x] **Persistent Theme State Engine**: Implement a global `ThemeContext` provider (`useTheme` hook) that persists theme preference in `localStorage` under `goeazy_theme` and auto-detects `prefers-color-scheme` system defaults.
- [x] **Interactive Theme Toggle**: Add an animated Sun/Moon toggle button in the main `Navbar` for instant theme switching.
- [x] **Luxury Dark Theme Palette**: Apply high-contrast dark palette styling (`slate-900`/`slate-950` backgrounds, `slate-100` headings, `slate-400` metadata text) combined with GoEazy's signature Persian Red accent (`#CA3433`).
- [x] **Component Integration**: Update core layout containers, property cards, navigation bars, and search interfaces for smooth dark mode rendering.

#### **Acceptance Criteria**
- [x] Clicking the Sun/Moon toggle in the Navbar immediately switches between Light and Dark themes without page reload.
- [x] Selected theme persists across page refreshes and navigation sessions.
- [x] Zero layout shift or flashing during theme changes.
- [x] `npx vite build` completes with 0 errors or broken references.
```

---

## 🚀 2. GitHub Pull Request (PR) Description

```markdown
## 🎨 feat: implement Luxury Dark Mode Theme System (GoEazy Dark™)

### 📌 Summary of Changes
This PR introduces **GoEazy Dark™**, a persistent, high-contrast Dark Mode theme system engineered for high-performance UX and late-night browsing comfort.

---

### 🔑 Key Implementations & Enhancements

#### 1. ⚙️ **Tailwind Engine & Theme Context**
- **Tailwind Config**: Enabled `darkMode: 'class'` in `tailwind.config.js`.
- **Theme Engine (`src/context/ThemeContext.jsx`)**: Built a lightweight `ThemeProvider` and `useTheme` hook that toggles the `.dark` class on `document.documentElement` and stores preferences in `localStorage` under `goeazy_theme`.
- **System Theme Auto-Detection**: Auto-detects `window.matchMedia('(prefers-color-scheme: dark)')` for first-time visitors.

#### 2. 🎛️ **Interactive Navbar Toggle Control**
- Added an animated **Sun / Moon** icon toggle button in `Navbar.jsx` with smooth hover states, micro-interactions, and tooltips (`Switch to Dark Mode` / `Switch to Light Mode`).

#### 3. 💎 **Luxury Dark Aesthetics & Component Styling**
- **App Layout (`Layout.jsx`)**: Applied `dark:bg-slate-950 dark:text-slate-100` smooth transition styling across the primary app container.
- **Property Discovery (`PropertyCard.jsx`)**: Styled card containers (`dark:bg-slate-900 dark:border-slate-800`), titles (`dark:text-white`), ratings, compare buttons, and price indicators for crisp contrast.
- **App Root (`App.jsx`)**: Wrapped the router inside `ThemeProvider` for universal context access.

---

### 🧪 Testing & Verification

- [x] **Manual Theme Toggle Test**: Verified seamless switching between light and dark themes via the Navbar toggle button.
- [x] **Persistence Test**: Verified that selected theme choices persist across reloads and tab closes.
- [x] **Production Build**: Verified clean execution of `npx vite build` (built in 2.38s with 0 errors).

---

### 📷 Screenshot / Visual Walkthrough
> *The theme toggle resides in the upper right header next to notifications and messages. Toggling automatically transitions all cards, headers, and backgrounds to GoEazy's dark slate palette.*
```
