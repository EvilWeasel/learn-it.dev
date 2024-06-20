import type { APIContext, APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, redirect }: APIContext) => {
  await locals.pb.authStore.clear();
  return redirect("/", 303);
};
