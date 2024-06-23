# Learn-It.dev

This is my personal take on what a modern Learn-Management-System (LMS) is supposed to feel like.

There are many LMS-Solutions out there. However, most of them don't offer too much interactivity, gamification, curated documents and progress tracking, that actually is fun. I want to change that.

The goal is to create a LMS, that adheres to the following principles:

- Learning should always be fun
- Brain is great for critical thinking and not good for storing information
- Students need to feel like they are on a save and curated learning-journey, that actually get's them results
- Understanding concepts is great, being able to build is much more valuable
- Learning should be open, information should be free, respect is mandatory

## First Steps

At the moment, we are building the core-functionality of this project live on Stream on Twitch.tv and in our Discord-Community over at
todo: link

Come over, if you want to hang out or participate. 😁

## Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── article/
│   │   │   └── [articleId]/
│   │   ├── course/
│   │   │   └── [courseId]/
│   │   └── auth/
│   ├── components/
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── blogs/
│       ├── courses/
│       ├── dashboard/
│       │   └── index.astro
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
