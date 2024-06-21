import type { APIContext, APIRoute } from "astro";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  image: File;
  author: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export const POST: APIRoute = async ({
  locals,
  request,
  redirect,
}: APIContext) => {
  try {
    const model = locals.pb.authStore.model as User;

    if (!model) throw new Error("Unauthorized");

    const data = {
      title: "untitled",
      description: "beschreibung",
      content: "",
      author: model.id,
    };

    const record = await locals.pb.collection("posts").create<Post>(data);
    return redirect(`/dashboard/article/${record.id}`);
  } catch (error) {
    console.error("api/article/index.ts:POST", error);
  }
  return redirect(`/dashboard/`);
};
