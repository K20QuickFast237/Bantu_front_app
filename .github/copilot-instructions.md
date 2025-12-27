# Copilot guidance for Bantu_front_app

Purpose
- Help AI coding agents be immediately productive in this Vite + React frontend.

Big picture
- Frontend: React (React 19) app built with Vite. Dev server: `npm run dev` (port 3000).
- Styling: Tailwind CSS + `tw-animate-css` plugin; prefer utility-first classes in components.
- Routing: `react-router-dom` with protected routes via `src/routes/PrivateRoutes.jsx`.
- Auth & API: single Axios instance at [src/services/api.jsx](src/services/api.jsx) talking to a Laravel backend. Authentication token is stored in `sessionStorage` and injected by an interceptor.

Key integration points (explicit files)
- API client: [src/services/api.jsx](src/services/api.jsx) — baseURL is currently hardcoded to `https://app.bantulink.tech/api`.
- Auth flow: `AuthProvider` (`src/context/AuthContext.jsx`) — exposes `login(user, token)`, `logout()`, `refreshAuth()` and uses `sessionStorage` for the token. Client code checks `isAuthenticated` from `useAuth()`.
- Realtime: `src/services/echo.js` — config for `laravel-echo` + `pusher-js`. Required env vars: `VITE_BROADCAST_CONNECTION`, `VITE_REVERB_APP_KEY`, `VITE_REVERB_HOST`, `VITE_REVERB_PORT`.
- i18n: `src/i18n.jsx` — default language `fr`; resources live under `src/locales/{en,fr}/translation.json`.
- Path alias: `@` => `src` configured in [vite.config.js](vite.config.js) and [jsconfig.json](jsconfig.json).

Developer workflows
- Start dev server: `npm run dev` (Vite on port 3000).
- Build: `npm run build` and preview: `npm run preview`.
- Lint: `npm run lint` (ESLint config in repo root).

Project conventions & patterns
- File extensions: `.jsx` for React components; some utility files may use `.js`.
- Component layout: shared UI components in `src/components/ui`, feature components in `src/components/app`, pages in `src/pages`.
- Services: put API calls in `src/services/*.jsx` or `.js` and use the central `api` axios instance.
- Context & hooks: global state lives in `src/context/*` and helper hooks in `src/hooks/*` (use `useAuth()` to read auth state).
- Translations: prefer using `react-i18next` keys from `src/locales/*` rather than inline strings.

Concrete examples from the codebase
- Authenticated request header is set via interceptor in [src/services/api.jsx](src/services/api.jsx).
- To refresh user on app load the app calls `refreshAuth()` inside `AuthProvider` which GETs `/user` (see [src/context/AuthContext.jsx](src/context/AuthContext.jsx)).
- Echo authorizer posts to `/broadcasting/auth` using the same `api` client (see [src/services/echo.js](src/services/echo.js)).

Fast tips for AI agents
- Do not change the auth storage mechanism without updating `AuthProvider` and `api` interceptor.
- Prefer small, focused changes: the frontend relies on specific backend endpoints (`/login`, `/register`, `/user`, `/logout`, `/broadcasting/auth`).
- If adding new environment-dependent URLs, prefer adding `VITE_API_BASE_URL` and replacing the hardcoded URL in [src/services/api.jsx](src/services/api.jsx).
- Keep UI changes consistent with Tailwind utility classes and existing component patterns in `src/components`.

What not to do
- Don't assume tests exist; there is no test harness currently.
- Avoid refactoring the auth flow broadly (e.g., switching storage) without running the app and coordinating with backend expectations.

Next steps I can do
- Replace hardcoded API baseURL with `VITE_API_BASE_URL` and update docs if you want.
- Add sample `.env.example` listing required `VITE_*` variables.

Please review and tell me which areas you'd like expanded or changed.
