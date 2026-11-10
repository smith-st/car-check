// Точка входу Cloudflare Worker.
// Статичні файли сайту віддає Cloudflare сам (див. "assets" у wrangler.jsonc);
// сюди потрапляють лише запити, для яких файлу немає, — тобто /api/*.
import { onRequestPost, onRequest } from "../functions/api/analyze.js";
export { RateLimiter } from "./limiter.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/analyze") {
      const context = { request, env, ctx };
      try {
        return await (request.method === "POST" ? onRequestPost(context) : onRequest(context));
      } catch (e) {
        // Будь-яка непередбачена помилка — зрозуміла JSON-відповідь замість сторінки помилки Cloudflare
        console.log("Unhandled error", e && e.stack || e);
        return new Response(JSON.stringify({ error: "На сервері сталася помилка. Спробуйте ще раз за хвилину.", reason: "server_error" }),
          { status: 500, headers: { "content-type": "application/json; charset=utf-8" } });
      }
    }
    return env.ASSETS.fetch(request);
  }
};
