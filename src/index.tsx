import { serve } from "bun";
import index from "./index.html";
import { join } from "path";

const server = serve({
  routes: {
    // Serve static files from assets directory
    "/assets/*": async (req) => {
      const url = new URL(req.url);
      const assetPath = url.pathname.slice("/assets/".length);
      const filePath = join(import.meta.dir, "assets", assetPath);

      if (process.env.NODE_ENV !== "production") {
        console.log(
          `[Asset Request] URL: ${url.pathname}, FilePath: ${filePath}`,
        );
      }

      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[Asset Warning] File not found: ${filePath}`);
        }
      }
      return new Response("Not Found", { status: 404 });
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Disable browser HMR to avoid the "Failed to load bundled module" bug with CSS.
    // Server will still restart and page will reload via bun --hot.
    hmr: false,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
