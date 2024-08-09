//svelte.config.js
import path from "path";
const config = {
  kit: {
    target: "#svelte",
    // add from here, plus the import path from 'path'
    vite: {
      resolve: {
        alias: {
          // these are the aliases and paths to them
          assets: path.resolve("./src/assets"),
          components: path.resolve("./src/components"),
          constants: path.resolve("./src/constants"),
          data: path.resolve("./src/data"),
          firestore: path.resolve("./src/firestore"),
          routes: path.resolve("./src/routes"),
          schemas: path.resolve("./src/schemas"),
          store: path.resolve("./src/store"),
          styles: path.resolve("./src/styles"),
          types: path.resolve("./src/types"),
          utils: path.resolve("./src/lib/utils"),
        },
      },
    },
  },
};
export default config;
