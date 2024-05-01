# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Build Tool - Vite

- We use Vite for building as it supports speedy HRM

## Authentication - Auth0

- We use Auth0 to allow authentication in the application. You can find two buttons namely `<Auth0LoginButton />` and `<Auth0LogoutButton />` for the same
- For new projects, you will have to login to the auth0 dashboard - https://manage.auth0.com/dashboard and configure a new project.
- Go to Settings under your project and copy the `domain` and `Client Id` values into `.env` file.
- Add the callback, redirect and allowed origins urls. For development, http://localhost:<port> works fine

## CSS Framework - Tailwind

- We use tailwind to do css as it provides smooth utility classes
- Start by defining theme values in `tailwind.config.js`

## Formatter - Prettier

- We use the Prettier extension to format the source code on `save`
