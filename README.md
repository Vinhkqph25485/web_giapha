# React + TypeScript + Vite - Web Gia Phả

This project provides a web application for managing family genealogy (Gia Phả) using React, TypeScript, and Vite.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To run the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

#### Standard Build

To build the application for production:

```bash
npm run build
```

This will create a `dist` folder with the production build.

#### Build with ZIP Archive

To build the application and create a ZIP file for easy deployment:

```bash
npm run build:zip
```

This process will:
1. Build the React application (ignoring TypeScript errors)
2. Create a ZIP file named `web_giapha_build.zip` in the project root directory

### Deployment

After creating the ZIP file:
1. Copy the `web_giapha_build.zip` file to your server
2. Unzip the file on your server
3. Serve the files using a web server like Apache, Nginx, or any static file server

## Technology Stack

This application is built using:

- React 19
- TypeScript
- Vite
- Ant Design
- TinyMCE for rich text editing
- React Query
- React Router DOM v7

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
