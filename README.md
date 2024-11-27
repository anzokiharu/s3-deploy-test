# Astro-Template

Astro-Template is a template built with Astro, TypeScript🧑‍🚀

## 🪐 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── assets/
│   │   ├── scripts/
│   │   └── style/
│   ├── components/
│   │   └── Header.astro
│   ├── layouts/
│   │   ├── StructureData
│   │   │   ├── CompanyData.astro
│   │   │   ├── BreadcrumbList.astro
│   │   │   └── WebData.astro
│   │   ├── Base.astro
│   │   └── metadata.json
│   ├── pages/
│   │    └── index.astro
│   ├── types/
│   └── utils/
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

### 📁 Directory

- `src/`: This is the source directory where all the source code.
  - `public/`: This directory contains all static assets plus images.
    - `images/`: This directory contains all the image files.
  - `assets/`: This directory contains all the static assets.
    - `scripts/`: This directory contains JavaScript files used across the code.
    - `style/`: This directory contains the style files used across the code.
  - `components/`: This directory contains the component files.  
    ex.) Header, Footer, Navigation
  - `layouts/`: This directory contains layout components and metadata.
    - `StructureData/`: This directory contains components related to the structured data.
  - `pages/`: This directory contains the page files.
  - `types/`: This directory contains the TypeScript type definition files.
  - `utils/`: This directory contains utility functions scripts used across the code.
- `astro.config.mjs`: This is the configuration file for the Astro.

## 🚀 Getting Started

### 📦 Dependencies

- astro 4.0+
- node v20+

### 👉 Development Command

```
npm run dev
```

### 👉 Build Command

```
npm run build
```

### 👉 Preview Command

Preview the production build in local environment.  
You must run `npm run build` beforehand.

```
npm run preview
```
