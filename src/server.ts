import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import App from "./app";
import { createElement } from "react";
import { renderToReadableStream } from "react-dom/server";

await Bun.build({
  entrypoints: ["./src/client.tsx"],
  outdir: "./public",
});

const app = new Elysia()
  .use(staticPlugin())
  .get("/favicon.ico", async (req) => {
    return new Response(null, {});
  })
  .get("*", async (req) => {
    const app = createElement(App, { data: req.params["*"] });

    const stream = await renderToReadableStream(app, {
      bootstrapScripts: ["/public/client.js"],
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
