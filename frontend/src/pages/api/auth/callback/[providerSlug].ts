import { type GithubAuthMeta } from "@/lib/github-auth.interface";
import type { APIRoute } from "astro";
import { PUBLIC_APP_BASE_URL } from "astro:env/server";

export const GET: APIRoute = async ({
  locals,
  cookies,
  url,
  redirect,
  request,
}) => {
  console.log("GET /api/auth/callback/[provider]");
  const provider = cookies.get("provider")?.json();
  const code = url.searchParams.get("code");
  console.log(provider, code);
  if (!provider) return new Response("Provider not found", { status: 400 });

  if (!code) return new Response("Code not found", { status: 400 });

  if (provider.state !== url.searchParams.get("state"))
    return new Response("Invalid state", { status: 400 });
  let response = new Response(null, {
    status: 303,
    headers: {
      Location: "/",
    },
  });
  try {
    const result = await locals.pb
      .collection("users")
      .authWithOAuth2Code(
        provider.name,
        code,
        provider.codeVerifier,
        PUBLIC_APP_BASE_URL + "/api/auth/callback/github"
      );
    response.headers.set(
      "Set-Cookie",
      locals.pb.authStore.exportToCookie({ sameSite: "Lax" })
    );
    const userId = locals.pb.authStore.model!.id;
    console.log("auth successfull, meta is:");
    const meta = result.meta as GithubAuthMeta;
    console.log(meta);
    if (meta.avatarUrl) {
      // fetch avatar and store it in user profile
      const avatar = await fetch(meta.avatarUrl);
      const avatarBuffer = await avatar.arrayBuffer();
      // add file to form data
      const formData = new FormData();
      formData.append("avatar", new Blob([avatarBuffer]), "avatar.jpg");
      formData.append("name", meta.username)
      // upload avatar
      await locals.pb.collection("users").update(userId, formData);
    }
  } catch (error) {
    console.error(error);
    return redirect("/", 303);
  }

  return response;
};
