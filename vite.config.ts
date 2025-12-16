import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@components",

        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@scenes",

        replacement: fileURLToPath(new URL("./src/scenes", import.meta.url)),
      },
      {
        find: "@contexts",

        replacement: fileURLToPath(new URL("./src/contexts", import.meta.url)),
      },
      {
        find: "@hooks",

        replacement: fileURLToPath(new URL("./src/hooks", import.meta.url)),
      },
      {
        find: "@providers",

        replacement: fileURLToPath(new URL("./src/providers", import.meta.url)),
      },
    ],
  },
  plugins: [react(), tailwindcss()],
  server: { port: 4000 },
});
