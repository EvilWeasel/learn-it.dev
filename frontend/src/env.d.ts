/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    verified: boolean;
  }

  interface Post {
    title: string;
    description: string;
    content: string;
    image: File;
    author: string;
  }

  interface Locals {
    pb: import("pocketbase").default;
  }
}
