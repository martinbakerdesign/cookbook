import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess(),
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      firestore: path.resolve(__dirname, "./src/firestore"),
      store: path.resolve(__dirname, "./src/store"),
      components: path.resolve(__dirname, "./src/components"),
      routes: path.resolve(__dirname, "./src/routes"),
      styles: path.resolve(__dirname, "./src/styles"),
      utils: path.resolve(__dirname, "./src/utils"),
      data: path.resolve(__dirname, "./src/data"),
      schemas: path.resolve(__dirname, "./src/schemas"),
    },
  },
});
