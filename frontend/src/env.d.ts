/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    pb: import("pocketbase").default;
  }
}
