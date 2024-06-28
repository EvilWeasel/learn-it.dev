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

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    console.log(image);

    const post = await pb
      .collection("posts")
      .update(articleId, { title, description, image });
    let postWithImageUrl = {
      ...post,
      image: pb.files.getUrl(post, post.image),
    };
    console.log("Updated post:", postWithImageUrl);
    return new Response(JSON.stringify(postWithImageUrl), { status: 200 });
  } catch (error) {
    console.error("api/article/[articleId]/index.ts:PATCH", error);
    return redirect("/dashboard");
  }
};
