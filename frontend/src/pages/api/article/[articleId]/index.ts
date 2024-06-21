import type { APIContext, APIRoute } from "astro";

export const PATCH: APIRoute = async ({
  locals,
  params,
  request,
  redirect,
}: APIContext) => {
  try {
    const pb = locals.pb;
    const articleId = params.articleId as string;
    const { content } = await request.json();
    await pb.collection("posts").update(articleId, { content })
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("api/article/[articleId]/index.ts:PATCH", error);
    return redirect("/dashboard");
  }
};
