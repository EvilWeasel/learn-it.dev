import type { APIContext, APIRoute } from "astro";
import { PUBLIC_APP_BASE_URL } from "astro:env/server";

export const GET: APIRoute = async ({
  locals,
  cookies,
  redirect,
  request,
}: APIContext) => {
  console.log("GET /api/auth/login");
  const provider = (
    await locals.pb.collection("users").listAuthMethods()
  ).authProviders.find((p) => p.name === "github");

  if (!provider) {
    return new Response("Provider not found", { status: 400 });
  }
  console.log("provider working", provider);
  /* cookies.set("provider-obj", JSON.stringify(provider), {
    httpOnly: true,
    path: "/api/auth/callback/github",
  }); */
  return new Response(null, {
    status: 303,
    headers: {
      Location:
        provider.authUrl +
        PUBLIC_APP_BASE_URL +
        `/api/auth/callback/${provider.name}`,
      "Set-Cookie": `provider=${JSON.stringify(
        provider
      )}; Path=/api/auth/callback/${provider.name}; HttpOnly`,
    },
  });

  /*   return redirect(
    provider.authUrl +
      PUBLIC_APP_BASE_URL +
      `/api/auth/callback/${provider.name}`,
    303
  ); */
};
