import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      include: {
        mdi: ["*"],
      },
    }),
    react(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  experimental: {
    actions: true,
    env: {
      schema: {
        PUBLIC_APP_BASE_URL: envField.string({
          context: "server",
          access: "public",
          default: "http://localhost:4321",
        }),
        PB_URL: envField.string({
          context: "server",
          access: "secret",
          default: "localhost:8080",
        }),
      },
    },
  },
});
