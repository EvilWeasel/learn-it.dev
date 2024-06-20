import { ActionError, defineAction } from "astro:actions";
import { PUBLIC_APP_BASE_URL } from "astro:env/server";

export const server = {
  login: defineAction({
    handler: async (_, { locals, cookies, redirect }) => {
      console.log("login action");
      const authData = await locals.pb
        .collection("users")
        .authWithOAuth2({ provider: "github" });

      if (!authData)
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Provider not found",
        });
      return authData;
    },
  }),
  logout: defineAction({
    handler: async (_, { locals, redirect }) => {
      await locals.pb.authStore.clear();
      return redirect("/", 303);
    },
  }),
};
