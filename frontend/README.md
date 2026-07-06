# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
frontend
├─ .env
├─ .qodo
│  ├─ agents
│  └─ workflows
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ fonts
│  │  │  ├─ Duplet-Bold.woff
│  │  │  ├─ Duplet-Extrabold.woff
│  │  │  ├─ Duplet-Light.woff
│  │  │  ├─ Duplet-Regular.woff
│  │  │  ├─ Duplet-Semibold.woff
│  │  │  └─ Duplet-Thin.woff
│  │  ├─ lottie
│  │  │  └─ 404.json
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ ActionButton.jsx
│  │  ├─ FormBuilderModal.jsx
│  │  ├─ HeaderWithSearch.jsx
│  │  ├─ RoleProtectedRoute.jsx
│  │  └─ table.jsx
│  ├─ config
│  ├─ constants
│  │  ├─ colors.js
│  │  ├─ forms
│  │  │  └─ tableHeader.js
│  │  ├─ masterHeaders.js
│  │  └─ sidebar.config.js
│  ├─ hooks
│  ├─ index.css
│  ├─ layouts
│  │  ├─ AppLayout.jsx
│  │  ├─ AppShellLayout.jsx
│  │  ├─ Layout.jsx
│  │  └─ MainLayout.jsx
│  ├─ lib
│  │  └─ queryClient.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ auth
│  │  │  ├─ LoginPage.jsx
│  │  │  └─ VerifyOtpPage.jsx
│  │  ├─ dashboard
│  │  │  └─ DashboardPage.jsx
│  │  ├─ leave
│  │  │  ├─ ApplyLeavePage.jsx
│  │  │  ├─ ApproveLeavePage.jsx
│  │  │  └─ LeaveApprovalModal.jsx
│  │  ├─ master
│  │  │  ├─ HodPage.jsx
│  │  │  ├─ StaffPage.jsx
│  │  │  └─ StudentPage.jsx
│  │  ├─ notfound
│  │  │  └─ NotFoundPage.jsx
│  │  └─ profile
│  │     └─ Profile.jsx
│  ├─ routes
│  │  └─ Routing.jsx
│  ├─ schemas
│  │  └─ auth.schema.js
│  ├─ services
│  │  ├─ api
│  │  │  └─ axios.js
│  │  ├─ auth
│  │  │  └─ auth.service.js
│  │  ├─ leave
│  │  │  └─ leave.service.js
│  │  └─ master
│  │     ├─ master.service.js
│  │     └─ staff.service.js
│  ├─ store
│  │  └─ auth.store.js
│  ├─ theme
│  │  └─ theme.js
│  └─ utils
│     └─ encryption.js
└─ vite.config.js

```