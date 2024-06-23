import type { APIContext, APIRoute } from "astro";

export const PATCH: APIRoute = async ({
  locals,
  params,
  request,
  redirect,
}: APIContext) => {
  let body;
  try {
    const pb = locals.pb;
    const articleId = params.articleId as string;
    body = await request.json();
    await pb.collection("posts").update(articleId, body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("api/article/[articleId]/index.ts:PATCH", error);
    console.error("body was:", body);
    return redirect("/dashboard");
  }
};
