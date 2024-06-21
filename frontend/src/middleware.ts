import { defineMiddleware, sequence } from "astro:middleware";
import { getSecret } from "astro:env/server";
import PocketBase from "pocketbase";

export const pbURL = getSecret("PB_URL");
// protect any route that does not start with "/login" for example ("/login/demo" is also not protected)
const unprotectedRoutes = ["/blogs", "/api", "/_actions"];

const authproviderRoutes = [
  "/api/auth/callback",
  "github.com",
  "google.com",
  "facebook.com",
  "twitter.com",
  "microsoft.com",
  "apple.com",
  "linkedin.com",
  "twitch.tv",
  "spotify.com",
  "discord.com",
  "slack.com",
  "gitlab.com",
];

export const authentication = defineMiddleware(
  async ({ locals, request, cookies, url }, next) => {
    console.info("authentication_middleware");
    if (!pbURL) throw new Error("PB_URL is not defined");
    const pb = new PocketBase(pbURL);
    console.info("PocketBase instance created");
    locals.pb = pb;
    locals.pb.autoCancellation(false);
    if (authproviderRoutes.some((route) => url.pathname.startsWith(route))) {
      console.error("no auth-provider found");
      return next();
    }
    locals.pb.authStore.loadFromCookie(request.headers.get("cookie") || "");
    try {
      locals.pb.authStore.isValid &&
        (await locals.pb.collection("users").authRefresh());
    } catch (error) {
      console.info("Failed to refresh auth token", error);
      locals.pb.authStore.clear();
    }
    const response = await next();
    response.headers.append(
      "Set-Cookie",
      locals.pb.authStore.exportToCookie({ sameSite: "Lax" }),
    );
    return response;
  },
);
export const authorization = defineMiddleware(
  async ({ locals, request, redirect, url }, next) => {
    console.log("authorization_middleware");
    const url_parsed = new URL(request.url);
    // log the origin
    if (authproviderRoutes.some((route) => url.pathname.startsWith(route))) {
      return next();
    }
    const routeIsRoot = url_parsed.pathname === "/";
    const routeIsProtected =
      !unprotectedRoutes.some((route) =>
        url_parsed.pathname.startsWith(route),
      ) && !routeIsRoot;
    let isLoggedIn = false;
    if (routeIsProtected && !routeIsRoot) {
      isLoggedIn = await locals.pb.authStore.isValid;
      if (!isLoggedIn) {
        // show toast suggesting to login with github button
        console.warn("User is not logged in");
        return redirect("/");
      }
    }
    const response = await next();
    return response;
  },
);

export const onRequest = sequence(authentication, authorization);
