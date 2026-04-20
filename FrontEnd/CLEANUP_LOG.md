# Cleanup Log

Date: 2026-04-18

## Pass 1 (safe removals)
- Removed `FrontEnd/node_modules/`
- Removed `FrontEnd/dist/`
- Removed all `.DS_Store` files under project root

## Pass 2 (optional prototype cleanup)
- Removed `FrontEnd/Inspo/`
- Removed legacy static HTML pages:
  - `FrontEnd/static-html/index.html`
  - `FrontEnd/static-html/landing.html`
  - `FrontEnd/static-html/login.html`
  - `FrontEnd/static-html/signup.html`
  - `FrontEnd/static-html/onboarding.html`
  - `FrontEnd/static-html/dashboard.html`
- Removed `FrontEnd/static-html/css/main.css`
- Removed `FrontEnd/static-html/js/`
- Kept `FrontEnd/static-html/css/styles.css` because it is still imported by `FrontEnd/src/main.jsx`
