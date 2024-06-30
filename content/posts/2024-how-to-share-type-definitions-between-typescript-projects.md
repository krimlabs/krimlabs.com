---
publishedOn: 2024-06-30T14:59:00.000Z
title: How to Share Type Definitions Between TypeScript Projects
subTitle: An alternative approach to Project References, aliasing and Shared Repos
featured: false
heroImg: /img/content/posts/share-types.png
slug: share-types-between-projects
tags:
  - typescript
relatedSlugs:
  - card-ui-resources-list
  - clj-learn-once-run-anywhere
  - handle-js-data-structures-with-map-reduce
author: shivekkhurana
---

In modern web development, ensuring consistency between the backend and frontend is crucial, especially when dealing with TypeScript types. Sharing these types between the backend and frontend can streamline your development process, reduce errors, and improve overall maintainability. This guide outlines an effective technique to share TypeScript types between your backend and frontend projects using `rsync` and `nodemon`.

## Problem

When developing a web application, both the frontend and backend often need to use the same data types. Duplicating type definitions across both projects can lead to inconsistencies and additional maintenance overhead. A better approach is to have a single source of truth for these types and automatically share them between projects.

## Solution

We'll use `rsync` to copy type definition files (`.types.ts`) from one project to another and `nodemon` to watch for changes and trigger the copy process automatically.

## Step-by-Step Implementation

### 1. Project Structure

Assume you have two separate projects: one for the frontend (`ui.project`) and one for the backend (`api.project`). Both projects have a `src/domain` directory containing the TypeScript files and type definition files.

```
/api.project
└── /src
    └── /domain
        ├── auth.ts
        └── auth.types.ts
/ui.project
└── /src
    └── /domain
        ├── auth.ts
        └── auth.types.ts
```

For this article, we are going to use `bun` runtime. We'll also need `nodemon`, `rsync` and `npm-run-all`:

```bash
bun add nodemon npm-run-all
```

Most UNIX like systems have `rsync` built in.

### 2. Frontend Configuration

In the `package.json` of your frontend project, add the following scripts:

```json
{
  "scripts": {
    "dev:copy-types-to-api": "rsync -av --include='*/' --include='*.types.ts' --exclude='*' src/domain ../api.project/ui.types",
    "dev:watch:copy-types-to-api": "bun nodemon --quiet --watch src/domain --ext ts --exec bun dev:copy-types-to-api",
    "dev:start": "vite",
    "dev": "bun run-p dev:start dev:watch:copy-types-to-api"
  }
}
```

### 3. Backend Configuration

In the package.json of your backend project, add the following scripts:

```json
{
  "scripts": {
    "dev:start": "bun src/server.ts",
    "dev:copy-types-to-ui": "rsync -av --include='*/' --include='*.types.ts' --exclude='*' src/domain ../ui.project/api.types",
    "dev:watch:copy-types-to-ui": "bun nodemon --quiet --watch src/domain --ext ts --exec bun dev:copy-types-to-ui",
    "dev": "bun run-p dev:start dev:watch:copy-types-to-ui"
  }
}
```

### 4. Adding Import Aliases

To make it easy to import the shared types in both projects, you can set up import aliases in your TypeScript configuration files (tsconfig.json). This allows you to import types using a consistent and clear path, regardless of where they originated.

**In the Frontend Project**
Update your tsconfig.json to include an alias for the types copied from the backend:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@api-types/*": ["api.types/*"]
    }
  }
}
```

You can now import types from the backend in your frontend code like this:

```ts
import { AuthType } from '@api-types/auth.types';
```

**In the Backend Project**

Similarly, update the tsconfig.json in your backend project to include an alias for the types copied from the frontend:

```json
Copy code
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ui-types/*": ["ui.types/*"]
    }
  }
}
```

Now you can import types from the frontend in your backend code like this:

```typescript
import { AuthType } from '@ui-types/auth.types';
```

## How It Works

- Copying Types: The `dev:copy-types-to-api` script in the frontend project and the `dev:copy-types-to-ui` script in the backend project use `rsync` to copy `*.types.ts` files from one project to the corresponding directory in the other project.
- Watching for Changes: The `dev:watch:copy-types-to-api` and `dev:watch:copy-types-to-ui` scripts use `nodemon` to watch for changes in the `src/domain` directory. When changes are detected, the respective copy script is executed.
- Running Both Processes: The `dev` script in both projects runs the development server (`dev:start`) and the watch process simultaneously using `run-p`. `run-p` is a part of `npm-run-all` package.

## Conclusion

By adding import aliases in your tsconfig.json, you simplify the import statements and make your code more readable. This, combined with the automated type sharing setup, ensures a smooth and efficient development process with consistent type definitions across your frontend and backend projects.
